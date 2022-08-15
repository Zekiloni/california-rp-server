
import { 
   Table, Column, Model, PrimaryKey, AutoIncrement, 
   Default, CreatedAt, UpdatedAt, AllowNull, 
   AfterCreate, AfterDestroy, DataType, AfterSync, ForeignKey, BelongsTo, HasMany 
} from 'sequelize-typescript';

import { generateNumber, generateString, shared_Data } from '@shared';
import { gDimension, Lang, none } from '@constants';
import { VehicleConfig } from '@configs';
import { notifications } from '@enums'; 
import { Jobs, Factions, Logs, Characters, VehicleComponents, Items } from '@models';
import { NumberPlate } from '@interfaces';


@Table({
   tableName: 'vehicles'
})
export class Vehicles extends Model {
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

   @ForeignKey(() => Characters)
   @Column({
      type: DataType.INTEGER({ length: 11 }), field: 'character_id'
   })
   characterID: number
   
   @BelongsTo(() => Characters)
   character: Characters

   @Default(none)
   @Column(DataType.INTEGER)
   price: number

   @Default(false)
   @Column(DataType.BOOLEAN)
   spawned: boolean;

   @Default(true)
   @AllowNull(false)
   @Column(DataType.BOOLEAN)
   locked: boolean

   @Default(VehicleConfig.FuelType.DIESEL)
   @Column(DataType.INTEGER)
   fuelType: VehicleConfig.FuelType

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

   @HasMany(() => Items)
   items: Items[]

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

   @Column(DataType.STRING)
   get numberPlate (): NumberPlate {
      return JSON.parse(this.getDataValue('numberPlate'))
   }

   set numberPlate (value: NumberPlate) {
      this.setDataValue('numberPlate', JSON.stringify(value))
   }

   @Column(DataType.STRING)
   get color (): [RGB, RGB] {
      return JSON.parse(this.getDataValue('color'));
   }

   set color (value: [RGB, RGB]) {
      this.setDataValue('color', JSON.stringify(value));
   }

   @HasMany(() => VehicleComponents)
   mods: VehicleComponents[]

   @CreatedAt
   created_at: Date

   @UpdatedAt
   updated_at: Date

   job: Jobs | null;

   faction: Factions | null;

   rent: ReturnType<typeof setTimeout> | null;

   @AfterSync
   static loading () {
      Vehicles.findAll().then(vehicles => {
         const spawnedVehicles = vehicles.filter(vehicle =>  vehicle.spawned == true);
         spawnedVehicles.forEach(vehicle => {
            if (vehicle.spawned) {
               vehicle.load();
            }
         })

         Logs.info(vehicles.length + ' vehicles loaded, ' + spawnedVehicles.length + ' spawned !');
      });
   }

   @AfterCreate
   static async creating (vehicle: Vehicles) {
   }

   @AfterDestroy
   static async destroying (vehicle: Vehicles) {
      const gameObject = mp.vehicles.toArray().find(gameVehicle => gameVehicle.instance.id == vehicle.id);

      if (gameObject) {
         gameObject.destroy();
      }
   }

   static new (
      model: string,
      type: VehicleConfig.type,
      temporary: boolean,
      owner: number, 
      color: [RGB, RGB],
      position: Vector3Mp,
      rotation: Vector3Mp,
      options?: { 
         price?: number, locked?: boolean, spawned?: boolean, faction?: Factions, job?: Jobs, rent?: number,
         numberplate?: NumberPlate
      } 
   ) {
      console.log(color)
      return Vehicles.create( 
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
            price: options!.price ? options?.price : none,
            numberPlate: options?.numberplate ? options.numberplate : null
         } 
      ).then(vehicle => {
         return vehicle;
      })
   }
   
   isLoaded (): VehicleMp | undefined {
      return mp.vehicles.toArray().find(vehicle => vehicle.instance && vehicle.instance.id == this.id);
   }

   load (pointPosition?: Vector3Mp, pointRotation?: Vector3Mp) {
      const isSpawned = this.isLoaded();

      if (isSpawned) {
         return;
      }

      const { position, rotation, numberPlate, locked, color } = this;

      const model = mp.joaat(this.model);
      
      const vehicle = mp.vehicles.new(model, pointPosition ? pointPosition : position, {
         heading: pointRotation ? pointRotation.z : rotation.z,
         numberPlate: numberPlate ? numberPlate.plate : '',
         color: color,
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

      if (this.characterID != player.character.id) {
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
            if (this.characterID != player.character.id) {
               player.notification(Lang.youDontHaveVehicleKeys, notifications.type.ERROR, notifications.time.MED);
               return;
            }
            break;
         }

         case VehicleConfig.type.FACTION: {
            if (this.faction?.id != player.character.faction) {
               player.notification(Lang.youDontHaveVehicleKeys, notifications.type.ERROR, notifications.time.MED);
               return;
            }
            break;
         }

         case VehicleConfig.type.ADMIN: {
            if (player.account.administrator < 1) {
               player.notification(Lang.youDontHaveVehicleKeys, notifications.type.ERROR, notifications.time.MED);
               return;
            }
            break;
         }
      }
      

      player.notification(vehicle.locked ? Lang.uUnlockedVehicle : Lang.uLockedVehicle, notifications.type.INFO, notifications.time.MED);
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
         player.notification(Lang.notinVehicleOrNearby, notifications.type.ERROR, notifications.time.MED);
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

   static trunk (player: PlayerMp, vehicleID: number) {
      console.log('vid ' + vehicleID);
      const vehicle = mp.vehicles.at(vehicleID);

      console.log(vehicle)

      return 'niga';
   }
}



mp.events.add('SERVER::VEHICLE:UPDATE', Vehicles.data);
mp.events.add('SERVER::VEHICLE:INDICATORS', Vehicles.indicators);
mp.events.addProc('SERVER::VEHICLE:MENU_ACTION', Vehicles.action);
mp.events.addProc('SERVER::GET_VEHICLE_TRUNK', Vehicles.trunk);

