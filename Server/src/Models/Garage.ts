import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey, AfterCreate } from 'sequelize-typescript';
import { Globals } from '../Global/Globals';
import { Messages } from '../Global/Messages';
import { Main } from '../Server/Main';

const GarageTypes = [
   { Type: 'Small', Position: new mp.Vector3(0, 0, 0)}, // Garage type 0
   { Type: 'Big', Position: new mp.Vector3(0, 0, 0)} // Garage type 1
]

@Table
export default class Garages extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number;

   @Column
   @AllowNull(false)
   Owner: number;

   @Column
   @AllowNull(false)
   Type: number;

   @Column
   @Default(20000)
   @AllowNull(false)
   Price: number;

   @Column
   @Default(false)
   @AllowNull(false)
   Locked: boolean;

   @Column
   @AllowNull(false)
   Entrance: Vector3Mp;

   @Column
   @Default(0)
   @AllowNull(false)
   Dimension: number;

   @Column
   @CreatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;

   GameObject: any;
   Interior_Dimension: number;

   @AfterCreate
   static async AfterCreating(garage: Garages) { await garage.Refresh(); }

   static async New(Player: PlayerMp, NewType: number, NewPrice: number) {
      const NewGarage = await Garages.create({ Type: NewType, Price: NewPrice, Entrance: Player.position });
   }

   async ParkVehicle (player: PlayerMp) { 
      const Vehicle = await frp.Vehicles.GetVehicleInstance(player.vehicle);
      if (Vehicle) {
         if (this.Type == 0) {
            Vehicle.Park(GarageTypes[0].Position);
            Vehicle.Respawn();
         } else if (this.Type == 1) {
            if (Main.IsAnyVehicleAtPoint(GarageTypes[0].Position)) {
               Vehicle.Park(GarageTypes[1].Position);
               Vehicle.Respawn();
            } else {
               Vehicle.Park(GarageTypes[0].Position);
               Vehicle.Respawn();
            } 
         }
      }
   };

   async Refresh() {
      if (this.GameObject == null) { 
         const GameObjects = { 
            colshape: mp.colshapes.newSphere(this.Entrance.x, this.Entrance.y, this.Entrance.z, 3, this.Dimension),
            blip: mp.blips.new(50, new mp.Vector3(this.Entrance.x, this.Entrance.y, this.Entrance.z), { dimension: this.Dimension, name: 'Garage', color: 37, shortRange: true, scale: 0.85 }),
            marker: mp.markers.new(27, new mp.Vector3(this.Entrance.x, this.Entrance.y, this.Entrance.z - 0.98), 2.5, {
               color: Globals.MarkerColors.Garages, 
               rotation: new mp.Vector3(0, 0, 90), 
               visible: true, 
               dimension: this.Dimension
            })
         };
   
   
         GameObjects.colshape.OnPlayerEnter = async (player) => {
            if (player.vehicle) {
               if (this.Owner == player.CHARACTER_ID && !this.Locked) {
                  // Park vehicle function
                  const Garage = await Garages.findOne({ where: { Owner: player.CHARACTER_ID, id: this.id } });
                  if (Garage) {
                     Garage.ParkVehicle(player);
                  }
               } else {
                  player.SendMessage('Garaža nije u tvom vlasništvu.', Globals.); 
               }
            }
            else {
               if (!this.Locked) {
                  // PlayerEnterGarage(player)
                  
               } else {
                  player.Notification(Messages.IS_LOCKED, Globals.Notification.Error, 4);
               }
            }
            //const white = frp.Globals.Colors.whitesmoke;
   

         };
   
         this.GameObject = GameObjects;
      }
   }
}

   /*
   //const GarageTypes = require('../data/Garages.json')
   
   const Garages = [
      { Position: new mp.Vector3(0, 0, 0)}, // Garage type 0
      { Position: new mp.Vector3(0, 0, 0)} // Garage type 1
   ]
   
   frp.Garages = frp.Database.define('garage', {
         id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
         Owner: { type: DataTypes.STRING, defaultValue: 0 },
         Type: { type: DataTypes.INTEGER, defaultValue: 0 }, // 0 - Mala | 1 - Velika | Mala max 1 vozilo, Velika max 2 vozila
         Price: { type: DataTypes.STRING },
         Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
         Entrance: { 
            type: DataTypes.TEXT, defaultValue: null, 
            get: function () { return JSON.parse(this.getDataValue('Entrance')); },
            set: function (value) { this.setDataValue('Entrance', JSON.stringify(value)); }
         },
         Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
         Interior_Dimension: { type: DataTypes.INTEGER, defaultValue: this.id },
         GameObject: { 
            type: DataTypes.VIRTUAL, defaultValue: null,
            get () { return frp.GameObjects.Garages[this.getDataValue('id')]; },
            set (x) { frp.GameObjects.Garages[this.getDataValue('id')] = x; }
         }
      }, {
         // Options
         timestamps: true,
         underscrored: true,
         createdAt: 'Created_Date',
         updatedAt: 'Update_Date',
      }
   );
   
   
   frp.Garages.afterCreate(async (Garage, Options) => {
      Garages.Refresh();
   });
   
   
   frp.Garages.afterDestroy(async (Garage, Options) => {
      if (Garages.GameObject) {
         Garages.GameObject.colshape.destroy();
         Garages.GameObject.blip.destroy();
         Garages.GameObject.marker.destroy(); 
      }
   });
   
   /* frp.Items.prototype.Delete = async function () {
      this.object.destroy();
      await this.destroy();
   }; 
   
   frp.Garages.prototype.Refresh = function () {
   
      if (this.GameObject == null) { 
         const GameObjects = { 
            colshape: mp.colshapes.newSphere(this.Position.x, this.Position.y, this.Position.z, 3, this.Dimension),
            blip: mp.blips.new(50, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
            marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 2.5, {
               color: frp.Globals.MarkerColors.Garages, 
               rotation: new mp.Vector3(0, 0, 90), 
               visible: true, 
               dimension: this.Dimension
            })
         };
   
   
         GameObjects.colshape.OnPlayerEnter = (player) => {
            if (player.vehicle) {
               if (this.Owner == player.character && !this.Locked) {
                  // Park vehicle function
                  const Garage = await frp.Garages.findOne({ where: { Owner: player.character, id: this.id } });
                  Garage.ParkVehicle(player);
                  
               } else {
                  player.SendMessage('Garaža nije u tvom vlasništvu.'); 
               }
            }
            else {
               if (!this.Locked) {
                  // PlayerEnterGarage(player)
                  
               } else {
                  player.Notification(frp.Globals.messages.IS_LOCKED, frp.Globals.Notification.Error, 4);
               }
            }
            //const white = frp.Globals.Colors.whitesmoke;
   
            /* player.SendMessage('[House] !{' + white + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', frp.Globals.Colors.property);
            player.SendMessage('[House] !{' + white + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', frp.Globals.Colors.property);
            player.SendMessage((this.Walk_in ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy house' : ''), frp.Globals.Colors.whitesmoke); 
         };
   
         this.GameObject = GameObjects;
      }
   };
   
   frp.Garages.prototype.Refresh = function () {
      this.Owner == 0 ? (this.blip.color = 1) : (this.blip.color = 2);
      this.Owner == 0 ? (this.blip.name = 'Garaža je na prodaju !') : (this.blip.name = 'Garaza');
   };
   
   frp.Garages.New = async function (player, type, price) { 
      const Garage = await frp.Garages.create({ Type: type, Price: price, Position: player.position });
      Garage.Init();
   };
   
   frp.Garages.prototype.ParkVehicle = async function(player) { 
      const Vehicle = await frp.Vehicles.GetVehicleInstance(player.vehicle);
      if (Vehicle) {
         if (this.Type == 0) {
            Vehicle.Park(Garages[0].Position);
            Vehicle.Respawn();
         } else if (this.Type == 1) {
            if (frp.Main.IsAnyVehicleAtPoint(Garages[0].Position)) {
               Vehicle.Park(Garages[1].Position);
               Vehicle.Respawn();
            } else {
               Vehicle.Park(Garages[0].Position);
               Vehicle.Respawn();
            } 
         }
      }
   };
   
   
   
   */

   (async () => {

      await Garages.sync();

      const Garage = await Garages.findAll();
      Garage.forEach((GarageObj) => {
         GarageObj.Refresh();
      });

      Main.Terminal(3, Garage.length + ' Garages Loaded !');
   })();