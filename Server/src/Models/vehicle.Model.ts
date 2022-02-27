
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, AllowNull, AfterCreate, AfterDestroy, DataType, AfterSync } from 'sequelize-typescript';

import { numberPlate, VehicleComponent, VehiclePoint } from '@interfaces';
import { gDimension, lang } from '@constants';
import { distanceBetweenVectors, generateNumber, generateString, shared_Data } from '@shared';
import { VehicleConfig } from '@configs';
import { notifications } from '@enums'; 
import { business } from '@models';


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
   type: VehicleConfig.type;

   @Default(false)
   @Column(DataType.BOOLEAN)
   temporary: boolean

   @AllowNull(false)
   @Column
   owner: number;

   @AllowNull(false)
   @Column(DataType.BOOLEAN)
   locked: boolean;

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('numberPlate')); }
   })   
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
      get () { return JSON.parse(this.getDataValue('color')) ? JSON.parse(this.getDataValue('color')) : []; }
   })   
   color: [RGB, RGB]

   @Default([])
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('components')); }
   })     
   components: VehicleComponent[]

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

   @AllowNull(false)
   @Column(DataType.BOOLEAN)
   spawned: boolean;

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('spawn')) ? JSON.parse(this.getDataValue('spawn')) : {}; }
   })  
   spawn: VehiclePoint;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   job: number;
   
   faction: number;

   rent: ReturnType<typeof setTimeout>;

   get object (): VehicleMp { 
      return vehicles.objects.get(this.id)!;
   }

   set object (vehicle: VehicleMp) { 
      vehicles.objects.set(this.id, vehicle);
   }
   

   @AfterSync
   static loading () {
      vehicles.findAll( { where: { spawned: true } } ).then(spawnedVehicles => {
         spawnedVehicles.forEach(vehicle => {
            vehicle.load();
         })
      });
   }

   @AfterCreate
   static async creating (vehicle: vehicles, options: { parking: boolean } ) {
      if (vehicle.spawned) {
         vehicle.load(options.parking);
      }
   }

   @AfterDestroy
   static async destroying (vehicle: vehicles) {
      if (vehicle.object) { 
         vehicle.object.destroy();
      }
   }

   static getNearest (position: Vector3Mp, radius: number) {
      const vehicle = mp.vehicles.getClosest(position);

      if (!vehicle) {
         return;
      }

      return vehicle.dist(position) < radius ? vehicle : null;
   }

   load (parking?: boolean) {
      if (this.object) {
         return;
      };

      const { spawn, position, rotation, numberPlate, locked, color } = this;
      const [ primary, secondary ] = color;

      const model = mp.joaat(this.model);
      
      const vehicle = mp.vehicles.new(model, parking ? spawn.position : position, {
         heading: parking ? this.spawn.rotation.z : this.rotation.z,
         numberPlate: numberPlate.plate,
         color: [primary, secondary],
         alpha: 255,
         locked: locked,
         engine: false,
         dimension: gDimension
      });

      vehicle.setVariable(shared_Data.DATABASE, this.id);
      vehicle.DATABASE = this.id;

      vehicle.setVariable(shared_Data.FUEL, this.fuel);
      vehicle.setVariable(shared_Data.MILEAGE, this.mileage);
      vehicle.setVariable(shared_Data.DIRT, this.dirt);
      vehicle.setVariable(shared_Data.TRUNK, false);
      vehicle.setVariable(shared_Data.HOOD, false);
      vehicle.setVariable(shared_Data.ALARM, false);
      vehicle.setVariable(shared_Data.WINDOWS, [false, false, false, false]);
      
      this.object = vehicle;
   }

   unload () {
      if (this.object) {
         this.object.destroy();
         vehicles.objects.delete(this.id);
      }
   }

   async park (player: PlayerMp, newParking: boolean) {
      if (this.type != VehicleConfig.type.DEFAULT) {
         // PORUKA: Cannot this vehicle
         return;
      }

      if (this.owner != player.character.id) {
         // PORUKA: Not your vehicle
         return;
      }

      if (this.object) {
         if (newParking) {
            this.spawn = { position: player.vehicle.position, rotation: player.vehicle.rotation };
            this.position = player.vehicle.position;
            this.rotation = player.vehicle.rotation;
            
            // new parking message
            // take player money
         }

         if (!newParking && player.vehicle.dist(this.spawn.position) > 5) {
            // PORUKA: Not on parking position
            return;
         }

         this.object.getOccupants().forEach(occupant => {
            occupant.removeFromVehicle();
         });

         this.spawned = false;
         this.unload();

         await this.save();
      }
   };

   respawn () {
      if (this.object) {
         this.object.position = this.spawn.position;
         this.object.rotation = this.spawn.rotation;
      }
   }

   async paint (primary: RGB, secondary: RGB) {
      this.color = [primary, secondary];

      if (this.object) {
         this.object.setColorRGB(primary[0], primary[1], primary[2], secondary[0], secondary[1], secondary[2]);
      }
      
      await this.save();
   }

   async lock (player: PlayerMp) {
      const character = player.character;

      switch (this.type) {
         case VehicleConfig.type.DEFAULT: {
            // if (this.Owner != Character.id) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, notifications.type.ERROR, 6);

            this.object.locked = !this.object.locked;
            this.locked = this.object.locked;
            await this.save();

            break;
         }

         case VehicleConfig.type.BUSINESS: {
            business.findOne(({ where: { owner: this.owner } })).then(business => {

            });

            break;
         }

         case VehicleConfig.type.FACTION: {
            if (this.owner != character.faction) return player.notification(lang.youDontHaveVehicleKeys, notifications.type.ERROR, 6);

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

   window (i: number) {
      let windows = this.object.getVariable(shared_Data.WINDOWS);
      windows[i] = !windows[i];
      this.object.setVariable(shared_Data.WINDOWS, windows);
   }

   loadTuning () {
      this.components.forEach(component => {
         this.object.setMod(component.component, component.value);
      });
   }

   
   static indicators (player:PlayerMp, left: boolean, right: boolean) {
      if (!player.vehicle) {
         return;
      }
      
      player.vehicle.setVariable(shared_Data.INDICATORS, [left, right]);
   }
}




mp.events.add('SERVER::VEHICLE:INDICATORS', vehicles.indicators);