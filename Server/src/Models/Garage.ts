// import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey, AfterCreate, AfterDestroy } from 'sequelize-typescript';
// import { Colors } from '../Global/Colors';
// import { Globals } from '../Global/Globals';
// import { Messages } from '../Global/Messages';
// import { Main } from '../Server/Main';
// import { Vehicles } from './Vehicles';

// const GarageTypes = [
//    { Type: 'Small', Position: new mp.Vector3(0, 0, 0)}, // Garage type 0
//    { Type: 'Big', Position: new mp.Vector3(0, 0, 0)} // Garage type 1
// ]

// @Table
// export default class Garages extends Model {
//    @Column
//    @PrimaryKey
//    @AutoIncrement
//    ID: number;

//    @Column
//    @AllowNull(false)
//    Owner: number;

//    @Column
//    @AllowNull(false)
//    Type: number;

//    @Column
//    @Default(20000)
//    @AllowNull(false)
//    Price: number;

//    @Column
//    @Default(false)
//    @AllowNull(false)
//    Locked: boolean;

//    @Column
//    @AllowNull(false)
//    Entrance: Vector3Mp;

//    @Column
//    @Default(0)
//    @AllowNull(false)
//    Dimension: number;

//    @Column
//    @CreatedAt
//    Created_At: Date;

//    @Column
//    @UpdatedAt
//    Updated_At: Date;

//    GameObject: any;
//    Interior_Dimension: number;

//    @AfterCreate
//    static async AfterCreating(Garage: Garages) { await Garage.Refresh(); }

//    @AfterDestroy
//    static async AfterDestroying(Garage: Garages, Option: any) { 
//       if (Garage.GameObject) {
//          Garage.GameObject.colshape.destroy();
//          Garage.GameObject.blip.destroy();
//          Garage.GameObject.marker.destroy(); 
//       }
//    }

//    static async New(Player: PlayerMp, NewType: number, NewPrice: number) {
//       const NewGarage = await Garages.create({ Type: NewType, Price: NewPrice, Entrance: Player.position });
//    }

//    async ParkVehicle (player: PlayerMp) { 
//       const Vehicle = await Vehicles.GetVehicleInstance(player.vehicle);
//       if (Vehicle) {
//          if (this.Type == 0) {
//             Vehicle.Park(GarageTypes[0].Position);
//             Vehicle.Respawn();
//          } else if (this.Type == 1) {
//             if (Main.IsAnyVehAtPos(GarageTypes[0].Position, 2, this.ID)) {
//                Vehicle.Park(GarageTypes[1].Position);
//                Vehicle.Respawn();
//             } else {
//                Vehicle.Park(GarageTypes[0].Position);
//                Vehicle.Respawn();
//             } 
//          }
//       }
//    };

//    async Refresh() {
//       if (this.GameObject == null) { 
//          const GameObjects = { 
//             colshape: mp.colshapes.newSphere(this.Entrance.x, this.Entrance.y, this.Entrance.z, 3, this.Dimension),
//             blip: mp.blips.new(50, new mp.Vector3(this.Entrance.x, this.Entrance.y, this.Entrance.z), { dimension: this.Dimension, name: 'Garage', color: 37, shortRange: true, scale: 0.85 }),
//             marker: mp.markers.new(27, new mp.Vector3(this.Entrance.x, this.Entrance.y, this.Entrance.z - 0.98), 2.5, {
//                color: [255, 255, 255, 70], // Globals.MarkerColors.Garages 
//                rotation: new mp.Vector3(0, 0, 90), 
//                visible: true, 
//                dimension: this.Dimension
//             })
//          };
   
   
//          GameObjects.colshape.OnPlayerEnter = async (player) => {
//             if (player.vehicle) {
//                if (this.Owner == player.CHARACTER_ID && !this.Locked) {
//                   // Park vehicle function
//                   const Garage = await Garages.findOne({ where: { Owner: player.CHARACTER_ID, id: this.id } });
//                   if (Garage) {
//                      Garage.ParkVehicle(player);
//                   }
//                } else {
//                   player.SendMessage('Garaža nije u tvom vlasništvu.', Colors.grey); 
//                }
//             }
//             else {
//                if (!this.Locked) {
//                   // PlayerEnterGarage(player)
                  
//                } else {
//                   player.Notification(Messages.IS_LOCKED, NotifyType.ERROR, 4);
//                }
//             }
   

//          };
   
//          this.GameObject = GameObjects;
//       }
//    }
// }

//    (async () => {

//    await Garages.sync();

//    const Garage = await Garages.findAll();
//    Garage.forEach((GarageObj) => {
//       GarageObj.Refresh();
//    });

//    Main.Terminal(3, Garage.length + ' Garages Loaded !');
// })();