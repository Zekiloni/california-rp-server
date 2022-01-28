import { numberPlate, vehicleComponent } from '@interfaces/vehicle.interfaces';
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, AllowNull, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';
import { Messages } from '../globals/constants';
import { entityData, GlobalDimension, NotifyType, vehicleData } from '../globals/enums';
import { generateNumber, generateString } from '../utils';
import Business from './properties/business.model';


let TemporaryVehicles = [];

@Table
export class vehicles extends Model {

   static objects = new Map<number, VehicleMp>();
   
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @AllowNull(false)
   @Column
   model: string;

   @AllowNull(false)
   @Column
   entity: vehicleData.Entity;

   @AllowNull(false)
   @Column
   owner: number;

   @AllowNull(false)
   @Column
   locked: boolean;

   @AllowNull(false)
   @Column(DataType.JSON)
   numberPlate: numberPlate;

   @AllowNull(false)
   @Column
   fuel: number;

   @AllowNull(false)
   @Column
   dirt: number;

   @AllowNull(false)
   @Column
   mileage: number;

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('color')); }
   })   
   color: RGB[]

   @Default([])
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('components')); }
   })     
   components: vehicleComponent[]

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('parking')); }
   })       
   parking: Vector3Mp;

   @AllowNull(false)
   @Column
   parked: boolean;

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('position')); }
   })  
   position: Vector3Mp;

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('rotation')); }
   })  
   rotation: Vector3Mp;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object (): VehicleMp { 
      return vehicles.objects.get(this.id)!;
   }

   set object (vehicle: VehicleMp) { 
      vehicles.objects.set(this.id, vehicle);
   }

   @AfterCreate
   static async creating (vehicle: vehicles) {  }

   @AfterDestroy
   static async destroying (vehicle: vehicles, options: any) {
      if (vehicle.object) { 
         vehicle.object.destroy();
      }
   }

   static async new (model: string, entity: any, owner: number, position: Vector3Mp, rotation: number) {
      const Vehicle = await vehicles.create({
         Model: model,
         Entity: entity,
         Owner: owner,
         Position: position,
         Rotation: rotation,
         Fuel: 100
      });
      return Vehicle;
   }

   static async newTemporary (model: string, position: Vector3Mp, rotation: Vector3Mp, color: number[], plate: string, dimension = GlobalDimension) {
      const [primary, secondary] = color;

      const vehicle = mp.vehicles.new(mp.joaat(model), position, {
         heading: rotation.z, alpha: 255, locked: false,
         numberPlate: plate, dimension: dimension, engine: false
      });

      vehicle.setColor(primary, secondary);

      vehicle.setVariable('Mileage', 0.0);
      vehicle.setVariable('Fuel', 100.0);
      vehicle.setVariable('Admin', true);

      TemporaryVehicles.push(vehicle);
      return vehicle;
   };


   static vehicleInstance (vehicle: VehicleMp) {
      vehicles.findOne({ where: { id: vehicle.getVariable(entityData.DATABASE) } }).then(vehicles => { 
         return vehicle;
      });
   };

   static getNearest (position: Vector3Mp, radius: number) {
      let Result = null;
      mp.vehicles.forEachInRange(position, radius, (Vehicle) => {
         if (Vehicle) {
            Result = Vehicle;
            return;
         }
      });
      return Result;
   }

   async newParking (position: Vector3Mp, rotation: Vector3Mp, garage?: any) {
      if (this.object) {
         this.position = position;
         this.rotation = rotation;

         this.object.position = position;
         this.object.rotation = rotation;

         await this.save();
      }
   };

   setDimension (i: number) {
      this.object.dimension = i;
   }

   spawn () {
      if (this.object) return;

      const { position, rotation, numberPlate, locked, color } = this;
      const [ primary, secondary ] = color;
      
      const vehicle = mp.vehicles.new(mp.joaat(this.model), new mp.Vector3(position.x, position.y, position.z), {
         heading: this.rotation.z,
         numberPlate: numberPlate.plate,
         color: [primary, secondary],
         alpha: 255,
         locked: locked,
         engine: false,
         dimension: GlobalDimension
      });


      vehicle.setVariable(entityData.DATABASE, this.id);

      vehicle.setVariable(entityData.FUEL, this.fuel);
      vehicle.setVariable(entityData.MILEAGE, this.mileage);
      vehicle.setVariable(entityData.DIRT, this.dirt);
      vehicle.setVariable(entityData.TRUNK, false);
      vehicle.setVariable(entityData.HOOD, false);
      vehicle.setVariable(entityData.WINDOWS, [false, false, false, false]);
      
      this.object = vehicle;
   }

   respawn () {
      if (this.object) {
         this.object.position = this.parking;
         this.object.rotation = this.rotation;
      }
   }

   async paint (primary: RGB, secondary: RGB) {
      this.color = [primary, secondary];
      if (this.object) this.object.setColorRGB(primary[0], primary[1], primary[2], secondary[0], secondary[1], secondary[2]);
      await this.save();
   }

   async lock (player: PlayerMp) {
      const character = player.Character;

      switch (this.entity) {
         case vehicleData.Entity.PLAYER: {
            // if (this.Owner != Character.id) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, NotifyType.ERROR, 6);

            this.object.locked = !this.object.locked;
            this.locked = this.object.locked;
            await this.save();

            break;
         }

         case vehicleData.Entity.BUSINESS: {
            Business.findOne(({ where: { owner: this.owner } })).then(business => {

            });

            break;
         }

         case vehicleData.Entity.FACTION: {
            if (this.owner != character.faction) return player.sendNotification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, NotifyType.ERROR, 6);

            this.object.locked = !this.object.locked;
            this.locked = this.object.locked;
            await this.save();

            break;
         }
      }
   }

   async generateNumberPlate (expiringDays: number = 30) {
      let currentData = Date.now();
      
      const numberPlate: numberPlate = { 
         plate: this.id.toString() + generateString(3) + generateNumber(0, 900).toString(),
         issued: currentData,
         expiring: currentData + (expiringDays * 84000) 
      };

      this.numberPlate = numberPlate;
      this.object.numberPlate = numberPlate.plate;
      await this.save();
   }

   async updateData (fuel: number, mileage: number, position?: Vector3Mp) {
      this.fuel = fuel;
      this.object.setVariable('Fuel', this.fuel);
      this.dirt = mileage;
      this.object.setVariable('Dirt', this.dirt);
      
      this.position = position!;
      await this.save();
   }

   window (i: number) {
      let windows = this.object.getVariable(entityData.WINDOWS);
      windows[i] = !windows[i];
      this.object.setVariable(entityData.WINDOWS, windows);
   }

   loadTuning () {
      this.components.forEach(component => {
         this.object.setMod(component.component, component.value);
      });
   }
}
