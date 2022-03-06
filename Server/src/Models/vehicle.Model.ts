
import { 
   Table, Column, Model, PrimaryKey, AutoIncrement, 
   Default, CreatedAt, UpdatedAt, AllowNull, 
   AfterCreate, AfterDestroy, DataType, AfterSync, ForeignKey, BelongsTo 
} from 'sequelize-typescript';

import { generateNumber, generateString, shared_Data } from '@shared';
import { gDimension, lang, none } from '@constants';
import { VehicleConfig } from '@configs';
import { notifications } from '@enums'; 
import { jobs, factions, logs, characters } from '@models';
import { NumberPlate } from '@interfaces';


@Table
export class vehicles extends Model {
   
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @AllowNull(false)
   @Column
   model: string

   @AllowNull(false)
   @Column
   type: VehicleConfig.type

   @Default(false)
   @Column(DataType.BOOLEAN)
   temporary: boolean

   @Default(none)
   @Column(DataType.INTEGER)
   price: number

   @ForeignKey(() => characters)
   @Column
   owner: number

   @BelongsTo(() => characters)
   character: characters

   @Default(false)
   @Column(DataType.BOOLEAN)
   spawned: boolean;

   @Default(true)
   @AllowNull(false)
   @Column(DataType.BOOLEAN)
   locked: boolean

   @Default(VehicleConfig.fuelType.DIESEL)
   @Column(DataType.INTEGER)
   fuelType: VehicleConfig.fuelType

   @Default(100.0)
   @AllowNull(false)
   @Column(DataType.FLOAT)
   fuel: number

   @Default(0.00)
   @AllowNull(false)
   @Column(DataType.DOUBLE)
   mileage: number

   @Default(none)
   @AllowNull(false)
   @Column
   dirt: number

   @Default(none)
   @Column(DataType.INTEGER)
   engineLevel: number

   @Default(none)
   @Column(DataType.INTEGER)
   suspensionLevel: number

   @Default(none)
   @Column(DataType.INTEGER)
   transmissionLevel: number

   @Default(false)
   @Column(DataType.BOOLEAN)
   turbo: boolean
   
   @Default(none)
   @Column(DataType.INTEGER)
   tint: number

   @Default(none)
   @Column(DataType.INTEGER)
   lockLevel: number

   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return this.getDataValue('position') ? JSON.parse(this.getDataValue('position')) : null; }
   })  
   position: Vector3Mp;

   @Column({
      type: DataType.JSON,
      get () { return this.getDataValue('rotation') ? JSON.parse(this.getDataValue('rotation')) : null; }
   })  
   rotation: Vector3Mp;

   @Column({
      type: DataType.JSON,
      get () { return this.getDataValue('numberPlate') ? JSON.parse(this.getDataValue('numberPlate')) : null; }
   })   
   numberPlate: NumberPlate;

   color: [RGB, RGB] = [[0,0,0], [0,0,0]]

   @CreatedAt
   created_at: Date

   @UpdatedAt
   updated_at: Date

   job: jobs | null

   faction: factions | null

   rent: ReturnType<typeof setTimeout> | null

   @AfterSync
   static loading () {
      vehicles.findAll().then(vehicles => {
         const spawnedVehicles = vehicles.filter(vehicle =>  vehicle.spawned == true);
         spawnedVehicles.forEach(vehicle => {
            if (vehicle.spawned) {
               vehicle.load();
            }
         })

         logs.info(vehicles.length + ' vehicles loaded, ' + spawnedVehicles.length + ' spawned !');
      });
   }

   @AfterCreate
   static async creating (vehicle: vehicles) {
   }

   @AfterDestroy
   static async destroying (vehicle: vehicles) {
      const gameObject = mp.vehicles.toArray().find(gameVehicle => gameVehicle.instance.id == vehicle.id);

      if (gameObject) {
         gameObject.destroy();
      }
   }


   static new (model: string, type: VehicleConfig.type, temporary: boolean, owner: number,  color: [RGB, RGB], position: Vector3Mp, rotation: Vector3Mp, options?: { price?: number, locked?: boolean, spawned?: boolean, faction?: factions, job?: jobs, rent?: number } ) {
      return vehicles.create( 
         { 
            model: model, 
            type: type, 
            temporary: temporary, 
            owner: owner, 
            spawned: options?.spawned, 
            locked: options?.locked || false, 
            position: position, 
            rotation: rotation, 
            color: color,
            price: options!.price ? options?.price : none
         } 
      ).then(vehicle => {
         return vehicle;
      })
   }

   load (pointPosition?: Vector3Mp, pointRotation?: Vector3Mp) {
      const alreadySpawned = mp.vehicles.toArray().find(vehicle => vehicle.instance.id == this.id);

      if (alreadySpawned) {
         return;
      }

      const { position, rotation, numberPlate, locked, color } = this;
      const [ primaryColor, secondaryColor ] = color;

      const model = mp.joaat(this.model);
      
      const vehicle = mp.vehicles.new(model, pointPosition ? pointPosition : position, {
         heading: pointRotation ? pointRotation.z : rotation.z,
         numberPlate: numberPlate ? numberPlate.plate : '',
         color: [primaryColor, secondaryColor],
         alpha: 255,
         locked: locked,
         engine: false,
         dimension: gDimension
      });

      vehicle.setVariable(shared_Data.DATABASE, this.id);
      vehicle.instance = this;

      vehicle.setVariable(shared_Data.FUEL, this.fuel);
      vehicle.setVariable(shared_Data.MILEAGE, this.mileage);
      vehicle.setVariable(shared_Data.DIRT, this.dirt);
      vehicle.setVariable(shared_Data.TRUNK, false);
      vehicle.setVariable(shared_Data.HOOD, false);
      vehicle.setVariable(shared_Data.ALARM, false);
      vehicle.setVariable(shared_Data.WINDOWS, [false, false, false, false]);
      vehicle.setVariable(shared_Data.INDICATORS, [false, false]);
      
      this.spawned = true;

      return vehicle;
   }

   unload (vehicle: VehicleMp) {
      vehicle.destroy();
   }
   
   async park (vehicle: VehicleMp, player: PlayerMp, newParking: boolean) {
      if (this.type != VehicleConfig.type.OWNED) {
         // PORUKA: Cannot this vehicle
         return;
      }

      if (this.owner != player.character.id) {
         // PORUKA: Not your vehicle
         return;
      }

      if (newParking) {
         this.position = player.vehicle.position;
         this.rotation = player.vehicle.rotation;
         
         // new parking message
         // take player money
      }

      // if (!newParking && player.vehicle.dist(this.spawn.position) > 5) {
      //    // PORUKA: Not on parking position
      //    return;
      // }

      player.vehicle.getOccupants().forEach(occupant => {
         occupant.removeFromVehicle();
      });

      this.spawned = false;
      this.unload(player.vehicle);

      await this.save();
   };

   async respawn (vehicle: VehicleMp) {
      vehicle.position = this.position;
      vehicle.rotation = this.rotation;

      await this.save();
   }

   async paint (vehicle: VehicleMp, primary: RGB, secondary: RGB) {
      this.color = [primary, secondary];

      if (vehicle) {
         vehicle.setColorRGB(primary[0], primary[1], primary[2], secondary[0], secondary[1], secondary[2]);
      }
      
      await this.save();
   }

   async lock (vehicle: VehicleMp, player: PlayerMp) {
      switch (this.type) {
         case VehicleConfig.type.OWNED: {
            if (this.owner != player.character.id) {
               player.notification(lang.youDontHaveVehicleKeys, notifications.type.ERROR, notifications.time.MED);
               return;
            }
            break;
         }

         case VehicleConfig.type.FACTION: {
            if (this.faction?.id != player.character.faction) {
               player.notification(lang.youDontHaveVehicleKeys, notifications.type.ERROR, notifications.time.MED);
               return;
            }
            break;
         }

         case VehicleConfig.type.ADMIN: {
            if (player.account.administrator < 1) {
               player.notification(lang.youDontHaveVehicleKeys, notifications.type.ERROR, notifications.time.MED);
               return;
            }
            break;
         }
      }
      

      player.notification(vehicle.locked ? lang.uUnlockedVehicle : lang.uLockedVehicle, notifications.type.INFO, notifications.time.MED);
      vehicle.locked = !vehicle.locked;
      this.locked = vehicle.locked;
      await this.save();
   }

   async generateNumberplate (vehicle: VehicleMp, expireDays: number = 30) {
      const plate = this.id.toString() + generateString(3) + generateNumber(0, 900).toString();

      const numberPlate: NumberPlate = { 
         plate: plate,
         issued:  Date.now(),
         expiring:  Date.now() + (expireDays * 84000) 
      };

      this.numberPlate = numberPlate;
      vehicle.numberPlate = numberPlate.plate;
      await this.save();
   }

   window (vehicle: VehicleMp, i: number) {
      let windows = vehicle.getVariable(shared_Data.WINDOWS);
      windows[i] = !windows[i];

      vehicle.setVariable(shared_Data.WINDOWS, windows);
   }


   static exit (player: PlayerMp, vehicle: VehicleMp) {
      if (!vehicle) {
         return;
      }
   
      // # if engine runing keep it
      if (vehicle.engine) {
         vehicle.engine = true;
      }

      if (vehicle.siren) {
         vehicle.siren = true;
      }
   }

   static async data (player: PlayerMp, vehicleID: number, mileage: number, fuel: number) {
      const vehicle = mp.vehicles.at(vehicleID);
   
      if (!vehicle) {
         return;
      }

      vehicle.instance.position = vehicle.position;
      vehicle.instance.rotation = vehicle.rotation;

      vehicle.instance.mileage = Number(mileage.toFixed(3));
      vehicle.instance.fuel = fuel;

      vehicle.setVariable(shared_Data.MILEAGE, mileage);
      vehicle.setVariable(shared_Data.FUEL, fuel);
      
      await vehicle.instance.save();
   }

   static indicators (player: PlayerMp, indicator: number) {
      if (!player.vehicle) {
         return;
      }
      
      let indicators = player.vehicle.getVariable(shared_Data.INDICATORS);

      indicators[indicator] = !indicators[indicator];
      
      player.vehicle.setVariable(shared_Data.INDICATORS, indicators);
   }

   static async action (player: PlayerMp, vehicleID: number, action: string) {
      const vehicle = mp.vehicles.toArray().find(vehicle => vehicle.instance.id == vehicleID);

      if (!vehicle) {
         return;
      }

      if (player.dist(vehicle.position) > 3.5 || player.vehicle && player.vehicle.id != vehicle.id) {
         player.notification(lang.notinVehicleOrNearby, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      switch (action) {
         case 'lock': {
            await vehicle.instance.lock(vehicle, player);
            break;
         }

         case 'unlock': {
            await vehicle.instance.lock(vehicle, player);
            break;
         }

         case 'park': {
            await vehicle.instance.park(vehicle, player, false);
            break;
         }

         case 'get': {
            await vehicle.instance.load();
            break;
         }

         case 'newparking': {
            await vehicle.instance.park(vehicle, player, true);
            break;
         }
      }

      return true;
   }
}



mp.events.add('playerExitVehicle', vehicles.exit);
mp.events.add('SERVER::VEHICLE:UPDATE', vehicles.data);
mp.events.add('SERVER::VEHICLE:INDICATORS', vehicles.indicators);
mp.events.addProc('SERVER::VEHICLE:MENU_ACTION', vehicles.action);

