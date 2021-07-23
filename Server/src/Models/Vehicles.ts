import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey, AfterCreate, AfterDestroy } from 'sequelize-typescript';
import { Settings } from '../Server/Settings';
import Business from './Business';
import Main from '../Server/Main';
import { Messages } from '../Global/Messages';
import { Globals } from '../Global/Globals';

const VehicleEntities = {
   Player: 0, Business: 1, Faction: 2, Job: 3
};

let TemporaryVehicles = [];

interface VehicleComponent { 
   Component: number,
   Value: number
};

export interface VehiclePlate { 
   Content: string,
   Issued: number,
   Expiring: number
}

export class Vehicles extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number;

   @Column
   @AllowNull(false)
   Model: string;

   @Column
   @AllowNull(false)
   Entity: number;

   @Column
   @AllowNull(false)
   Owner: string;

   @Column
   @AllowNull(false)
   Locked: boolean;

   @Column
   @AllowNull(false)
   Numberplate: VehiclePlate;

   @Column
   @AllowNull(false)
   Fuel: number;

   @Column
   @AllowNull(false)
   Dirt: number;

   @Column
   @AllowNull(false)
   Mileage: number;

   @Column
   @AllowNull(false)
   Parked: boolean;

   @Column
   @AllowNull(false)
   Garage: number;

   @Column
   @AllowNull(false)
   Color: number[]

   @Column
   @AllowNull(false)
   Components: VehicleComponent[]

   @Column
   @AllowNull(false)
   Parking: Vector3Mp;

   @Column
   @AllowNull(false)
   Position: Vector3Mp;

   @Column
   @AllowNull(false)
   Rotation: Vector3Mp;

   @CreatedAt
   Created_At: Date;

   @UpdatedAt
   Updated_At: Date;

   Vehicle: VehicleMp;

   @AfterCreate
   static async AfterCreating(Veh: Vehicles) { Veh.Spawn(); }

   @AfterDestroy
   static async AfterDestroying(Vehicle: Vehicles, Options: any) {
      if (Vehicle.Vehicle) {
         Vehicle.Vehicle.destroy();
      }
   }

   async New(model: string, entity: any, owner: number, position: Vector3Mp, rotation: number) {
      const Vehicle = await Vehicles.create({
         Model: model,
         Entity: entity,
         Owner: owner,
         Position: position,
         Rotation: rotation,
         Fuel: 100
      });
   }

   async CreateTemporary(model: string, position: Vector3Mp, rotation: number, color: number[], plate: string, dimension = Settings.Default.dimension) {
      const [primary, secondary] = color;

      const Vehicle = mp.vehicles.new(mp.joaat(model), position, {
         heading: rotation, alpha: 255, locked: false,
         numberPlate: plate, dimension: dimension, engine: false
      });

      Vehicle.setColor(primary, secondary);

      Vehicle.setVariable('Mileage', 0.0);
      Vehicle.setVariable('Fuel', 100.0);
      Vehicle.setVariable('Admin', true);

      TemporaryVehicles.push(Vehicle);
      return Vehicle;
   };

   async Dimension(i: number) {
      this.Vehicle.dimension = i;
   }

   Spawn() {
      if (this.Vehicle) return;

      const Vehicle = mp.vehicles.new(mp.joaat(this.Model), this.Position, {
         heading: this.Rotation.z,
         numberPlate: this.Numberplate.Content,
         alpha: 255,
         locked: this.Locked,
         engine: false,
         dimension: this.Garage
      });

      const [primary, secondary] = this.Color;
      Vehicle.setColor(primary, secondary);

      Vehicle.DATABASE = this.id;

      Vehicle.setVariable('Mileage', this.Mileage);
      Vehicle.setVariable('Fuel', this.Fuel);

      Vehicle.setVariable('Hood', false);
      Vehicle.setVariable('Trunk', false);
      Vehicle.setVariable('Windows', [false, false, false, false]);

      this.Vehicle = Vehicle;
   }

   Respawn() {
      if (this.Vehicle) {
         this.Vehicle.position = this.Parking;
         this.Vehicle.rotation = this.Rotation;
      }
   }

   async GetVehicleInstance(Vehicle: VehicleMp) {
      const Veh = await Vehicles.findAll();
      Veh.forEach( (Instance) => {
         if (Instance.Vehicle == Vehicle) return Instance;
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
      const Character = await Player.Character();

      switch (true) {
         case this.Entity == VehicleEntities.Player: {
            if (this.Owner != Character.id) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, Globals.Notification.Error, 6);

            this.Vehicle.locked = !this.Vehicle.locked;
            this.Locked = this.Vehicle.locked;
            await this.save();

            break;
         }

         case this.Entity == VehicleEntities.Business: {
            const Biz = await Business.findOne(({ where: { Owner: this.Owner } }));
            if (Biz == null) return;
            if (Biz.Workers.includes(Character.id) == false) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, Globals.Notification.Error, 6);

            this.Vehicle.locked = !this.Vehicle.locked;
            this.Locked = this.Vehicle.locked;
            await this.save();

            break;
         }

         case this.Entity == VehicleEntities.Faction: {
            if (this.Owner != Character.Faction) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, Globals.Notification.Error, 6);

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

