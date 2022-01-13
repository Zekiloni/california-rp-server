import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';
import { entityData, globalDimension, vvehicleData } from '../globals/enums';
import { vehicleComponent, vehiclePlate } from '../globals/interfaces';
/*
const VehicleEntities = {
   Player: 0, Business: 1, Faction: 2, Job: 3
};*/


let TemporaryVehicles = [];


@Table
export class Vehicles extends Model {

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
   entity: vvehicleData.Entity;

   @AllowNull(false)
   @Column
   owner: string;

   @AllowNull(false)
   @Column
   locked: boolean;

   @Column
   @AllowNull(false)
   numberPlate: vehiclePlate;

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
      get () { return JSON.parse(this.getDataValue('color')); },
   })   
   color: RGB[]

   @Default([])
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('components')); },
   })     
   components: vehicleComponent[]

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('parking')); },
   })       
   parking: Vector3Mp;

   @AllowNull(false)
   @Column
   parked: boolean;

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('position')); },
   })  
   position: Vector3Mp;

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('rotation')); },
   })  
   rotation: Vector3Mp;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object (): VehicleMp { 
      return Vehicles.objects.get(this.id)!;
   }

   set object (vehicle: VehicleMp) { 
      Vehicles.objects.set(this.id, vehicle);
   }

   @AfterCreate
   static async creating (vehicle: Vehicles) {  }

   @AfterDestroy
   static async destroying (vehicle: Vehicles, options: any) {
      if (vehicle.object) { 
         vehicle.object.destroy();
      }
   }

   static async New(model: string, entity: any, owner: number, position: Vector3Mp, rotation: number) {
      const Vehicle = await Vehicles.create({
         Model: model,
         Entity: entity,
         Owner: owner,
         Position: position,
         Rotation: rotation,
         Fuel: 100
      });
      return Vehicle;
   }

   static async newTemporary (model: string, position: Vector3Mp, rotation: Vector3Mp, color: number[], plate: string, dimension = globalDimension) {
      const [primary, secondary] = color;

      const Vehicle = mp.vehicles.new(mp.joaat(model), position, {
         heading: rotation.z, alpha: 255, locked: false,
         numberPlate: plate, dimension: dimension, engine: false
      });

      Vehicle.setColor(primary, secondary);

      Vehicle.setVariable('Mileage', 0.0);
      Vehicle.setVariable('Fuel', 100.0);
      Vehicle.setVariable('Admin', true);

      TemporaryVehicles.push(Vehicle);
      return Vehicle;
   };

   setDimension (i: number) {
      this.object.dimension = i;
   }

   spawn () {
      if (this.object) return;

      const { position, rotation, numberPlate, locked, color } = this;
      const [ primary, secondary ] = color;
      
      const vehicle =  mp.vehicles.new(mp.joaat(this.model), new mp.Vector3(position.x, position.y, position.z), {
         heading: this.rotation.z,
         numberPlate: numberPlate.content,
         color: [primary, secondary],
         alpha: 255,
         locked: locked,
         engine: false,
         dimension: globalDimension
      });


      vehicle.setVariable(entityData.DATABASE, this.id);

      vehicle.setVariable(entityData.VEHICLE_DATA, { 
         fuel: this.fuel, hood: false, trunk: false, mileage: this.mileage,
         windows: [false, false, false, false]
      });

      this.object = vehicle;
   }

   respawn () {
      if (this.object) {
         this.object.position = this.parking;
         this.object.rotation = this.rotation;
      }
   }

   static vehicleInstance (vehicle: VehicleMp) {
      Vehicles.findOne({ where: { id: vehicle.getVariable(entityData.DATABASE) } }).then(vehicle => { 
         return vehicle;
      });
   }

   async Park(Position: Vector3Mp, Rotation: Vector3Mp, garage: any = null) {
      if (this.Vehicle) {
         this.Parking = Position;
         this.Rotation = Rotation;

         if (garage != null) {
            this.Garage = garage;
         }

         this.Vehicle.position = Position;
         this.Vehicle.rotation = Rotation;

         await this.save();
      }
   }

   async Paint(primary: number, secondary: number) {
      this.Color = [primary, secondary];
      if (this.Vehicle) this.Vehicle.setColor(primary, secondary);
      await this.save();
   }

   async Lock(Player: PlayerMp) {
      const Character = Player.Character;

      switch (true) {
         case this.Entity == VehicleEntities.Player: {
            // if (this.Owner != Character.id) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, NotifyType.ERROR, 6);

            this.Vehicle.locked = !this.Vehicle.locked;
            this.Locked = this.Vehicle.locked;
            await this.save();

            break;
         }

         case this.Entity == VehicleEntities.Business: {
            const Biz = await Business.findOne(({ where: { Owner: this.Owner } }));
            if (Biz == null) return;
            if (Biz.Workers.includes(Character.id) == false) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, NotifyType.ERROR, 6);

            this.Vehicle.locked = !this.Vehicle.locked;
            this.Locked = this.Vehicle.locked;
            await this.save();

            break;
         }

         case this.Entity == VehicleEntities.Faction: {
            // if (this.Owner != Character.Faction) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, NotifyType.ERROR, 6);

            this.Vehicle.locked = !this.Vehicle.locked;
            this.Locked = this.Vehicle.locked;
            await this.save();

            break;
         }
      }
   }

   async GeneratePlate(ExpiringDays: number = 92) {
      let CurrentDate = Date.now();
      
      const Plate: VehiclePlate = { 
         Content: '1312-DB',
         Issued: CurrentDate,
         Expiring: CurrentDate + (ExpiringDays * 84000) 
      };

      this.Numberplate = Plate;
      this.Vehicle.numberPlate = Plate.Content;
      await this.save();
   }

   Nearest(position: Vector3Mp, radius: number) {
      let Result = null;
      mp.vehicles.forEachInRange(position, radius, (Vehicle) => {
         if (Vehicle) {
            Result = Vehicle;
            return;
         }
      });
      return Result;
   }

   async Update(fuel: number, mileage: number, position: Vector3Mp) {
      this.Fuel = fuel;
      this.Vehicle.setVariable('Fuel', this.Fuel);
      this.Dirt = mileage;
      this.Vehicle.setVariable('Dirt', this.Dirt);
      this.Position = position;
      await this.save();
   }

   Window(i: number) {
      let Windows = this.Vehicle.getVariable('Windows');
      Windows[i] = !Windows[i];
      this.Vehicle.setVariable('Windows', Windows);
   }

   Tune() {
      const Components = this.Components;
      Components.forEach(component => {
         this.Vehicle.setMod(component.Component, component.Value);
      });
   }
}

(async () => {
   await Vehicles.sync();

   const Vehicle = await Vehicles.findAll();
   Vehicle.forEach((Veh) => {
      Veh.Spawn();
   });
})();

