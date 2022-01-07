

import { EntityData, Global_Dimension, NotifyType } from '../enums';
import { Messages } from '../constants';
import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, IsUUID, Length, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Config } from '../config';

import Accounts from './account.model';
import { Injury } from './misc/injury.model';


@Table
export default class Characters extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @ForeignKey(() => Accounts)
   @Column
   Account_id: number

   @BelongsTo(() => Accounts)
   Account: Accounts

   @Unique
   @Length({ min: 6, max: 48 })
   @Column
   Name: string

   @Column
   Gender: number

   @Column
   Birth: string

   @Column
   Origin: string

   @Default(Config.Default.Money)
   @Column
   Money: number

   @Default(0)
   @Column
   Salary: number

   @Default(0)
   @Column
   Bank: number

   @Default(0)
   @Column
   Paycheck: number

   @IsUUID(4)
   @Default(DataType.UUIDV4)
   @Column
   Stranger_ID: number

   @Default(0)
   @Column
   Faction: number

   @Default('none')
   @Column
   Faction_Rank: string

   @Default(0)
   @Column
   Faction_Permissions: number

   @Default(0)
   @Column
   Job: number

   @Default(0)
   @Column
   Working_Hours: number

   @Default(100)
   @Column
   Health: number

   @Default(100)
   @Column
   Hunger: number

   @Default(100)
   @Column
   Thirst: number
   
   @Default(false)
   @Column
   Wounded: boolean

   @Default([])
   @Column(DataType.JSON)
   Injuries: Injury[]

   @Column(DataType.JSON)
   Last_Position: Vector3Mp

   @Default(0)
   @Column
   Spawn_Point: number

   @Column(DataType.JSON)
   Inside: object

   @Default(0)
   @Column
   Muted: number

   @Default(0)
   @Column
   Hours: number

   @Default(0)
   @Column
   Minutes: number

   @Default('normal')
   @Column
   Walking_Style: string

   @Default('normal')
   @Column
   Facial_Mood: string
   
   @Default(Config.Max.INVENTORY_WEIGHT)
   @Column
   Max_Inventory_Weight: number

   @Default(Config.Max.HOUSES)
   @Column
   Max_Houses: number

   @Default(Config.Max.BUSINESSES)
   @Column
   Max_Business: number

   @Default(Config.Max.VEHICLES)
   @Column
   Max_Vehicles: number

   @Default(0)
   @Column
   Frequency: number;


   @Default(false)
   @Column
   Cuffed: boolean

   @CreatedAt
   Created_At: Date;

   @UpdatedAt
   Updated_At: Date;

   async Spawn (player: PlayerMp) { 


      player.Account.Last_Character = this.id;
      player.Character = this;

      player.name = this.Name;

      player.position = Config.Default.Spawn;

      player.setVariable(EntityData.SPAWNED, true);

      // loading money and health
      this.setHealth(player, this.Health);
      this.setMoney(player, this.Money);

      player.setVariable(EntityData.JOB, this.Job);
      player.setVariable(EntityData.FACTION, this.Faction);

      // temporary variables
      player.setVariable(EntityData.FACTION_DUTY, false);
      player.setVariable(EntityData.JOB_DUTY, false);
      player.setVariable(EntityData.JOB_VEHICLE, null);
      player.setVariable('Working_Uniform', false);
      player.setVariable(EntityData.ADMIN_DUTY, false);
      player.setVariable('Attachment', null);
      player.setVariable('Phone_Ringing', false);
      player.setVariable(EntityData.FREEZED, false);
      player.setVariable('Ragdoll', false);


      player.Notification(Messages.WELCOME, NotifyType.INFO, 4);


      this.setWalkingStyle(player, this.Walking_Style);
      this.setMood(player, this.Mood);
      this.setCuffs(player, this.Cuffed);
   
   
      //    Player.setVariable('Injuries', this.Injuries);
      //    Player.RespawnTimer = null;
      //    Player.setVariable('Wounded', this.Wounded);
      //    if (this.Wounded) { 
      //       // ciba na pod...
      //    }
         
      //    Player.setVariable('Bubble', null);
      //    Player.setVariable('Seatbelt', false);
   
   
      //    // Applying appearance & clothing
      //    // const Appearance = await Appearances.findOne({ where: { Character: this.id } });
      //    // if (Appearance) Appearance.Apply(Player, this.Gender);
   
      //    // frp.Items.Equipment(Player, this.Gender);
      //             console.log('Spawn', 3);

      //    // spawning player on desired point
      //    switch (this.Spawn_Point) {
      //       case 0: {
      //          console.log('Spawn', 4);
      //          Player.position = Config.Default.Spawn;
      //          Player.heading = Config.Default.Heading;
      //          Player.dimension = Global_Dimension;
      //          break;
      //       }
      //       case 1: {
      //             Player.position = this.Last_Position;
      //             Player.dimension = Global_Dimension;
      //          break;
      //       }
      //       case 2: {
      //          break;
      //       }
      //    }
   
      // } catch (e) { 
      //    console.log(e)
      // }

   }

   setHealth (player: PlayerMp, value: number) { 
      player.health = value;
      this.Health = value;
   }

   setMoney (player: PlayerMp, value: number) { 
      player.setVariable(EntityData.MONEY, value);
      this.Money = value;
   }

   async setJob (value: number) {
      this.Job = value;
      await this.save();
   }

   async setWalkingStyle (player: PlayerMp, Style) {
      this.Walking_Style = Style;
      player.setVariable('Walking_Style', Style);
      await this.save();
   };

   async giveMoney (Player: PlayerMp, value: number) {
      let Money = await this.increment('Money', { by: value });
      if (Money) {
         Player.setVariable(EntityData.MONEY, this.Money + value);
      }
   };
   
}


// const { ItemEntities } = require('../classes/Items.Registry');
// const { VehicleEntities } = require('./Vehicle');

// let Appearance = require('./Appearance');
// const Enums = require('../data/Enums');


// frp.Characters.prototype.Spawn = async function (player) {

// };



// frp.Characters.prototype.Attachment = async function (player, model, bone, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
//    if (model) { 
//       const Offset = { X: x, Y: y, Z: z, rX: rx, rY: ry, rZ: rz };
//       player.setVariable('Attachment', { Model: model, Bone: bone, Offset: Offset });
//    } else { 
//       player.setVariable('Attachment', null);
//    }
// };


// frp.Characters.prototype.SetHealth = async function (player, value) {
//    this.Health = value;
//    player.health = this.Health;
//    await this.save();
// };


// frp.Characters.prototype.SetSpawn = async function (point) {
//    this.Spawn_Point = point;
//    await this.save();
// };


// frp.Characters.prototype.QuitGame = function (player) { 

// };


// frp.Characters.prototype.Injury = async function (Player, Injury) {

//    Injuries = Player.getVariable('Injuries');

//    const AlreadyExist = Injuries.find(Element => Element.Weapon == Injury.Weapon && Element.Bone == Injury.Bone);
//    if (AlreadyExist) { 
//       if (AlreadyExist.Times) { 
//          AlreadyExist.Times ++;
//       } else { 
//          AlreadyExist.Times = 2;
//       }
//    } else { 
//       Injuries.push(Injury);
//    }

//    if (Injuries.length > 0) { 
//       const LastInjury = Injuries[Injuries.length - 1];

//       switch (LastInjury.Bone) { 
//          case Enums.Player.Body_Bones.Torso: { 
//             this.SetWalkingStyle(Player, Enums.Player.Walking_Styles['DeadlyWound']);
//             break;
//          } 

//          case Enums.Player.Body_Bones.Leg: { 
//             this.SetWalkingStyle(Player, Enums.Player.Walking_Styles['MediumWound']);
//          }

//          default: {
//             this.SetWalkingStyle(Player, 'Wounded');
//          }
//       }
//    }

//    this.Injuries = Injuries;
//    Player.setVariable('Injuries', Injuries);

//    await this.save();
//    return true;
  
// };


// frp.Characters.prototype.Wound = function (Player, Toggle, Position = null) { 
//    console.log('Wounded ' + Player.name);
//    return new Promise (async (resolve) => { 
//       if (Toggle) { 
//          let Start = new Date();
   
//          Player.spawn(Player.position);
//          //Player.health = frp.Settings.default.Wound.health;
//          Player.RespawnTimer = setTimeout(() => { this.Wound(Player, false); }, frp.Settings.default.Wound.Respawn_Time)
   
//          Injuries = Player.getVariable('Injuries');
   
//          const Content = { Text: frp.Globals.messages.PERSON_IS_INJURED + Injuries.length + frp.Globals.messages.TIMES, Color: frp.Globals.Colors.Injured };
   
//          Player.setVariable('Wounded', Content);
//          Player.setVariable('Injuries', Injuries);
//          Player.setVariable('Ragdoll', { Time: frp.Settings.default.Wound.Respawn_Time });
         
//          this.Injuries = Injuries;
//          this.Wounded = true;   
      
//          resolve(true);
//       }  else { 
//          if (Player) { 
//             if (Player.RespawnTimer) clearTimeout(Player.RespawnTimer);
   
//             Player.setVariable('Injuries', []);
//             Player.spawn(Position ? Position : Player.position);     
//             Player.setVariable('Wounded', false);
//          }
   
//          this.Injuries = [];
//          this.Wounded = false;     
//          resolve(false);
//          // await this.save();
//       }
//    });  
// };


// frp.Characters.prototype.SetArmour = async function (player, value) {
//    this.Armour = value;
//    player.armour = this.Armour;
//    await this.save();
// };


// frp.Characters.prototype.GiveMoney = async function (player, value) {
//    let Money = await this.increment('Money', { by: value });
//    await player.setVariable('Money', this.Money + value);
// };


// frp.Characters.prototype.SetMoney = async function (player, value) {
//    this.Money = value;
//    player.setVariable('Money', value);
//    await this.save();
// };


// frp.Characters.prototype.SetMood = function (player, mood) { 
//    this.Mood = mood;
//    player.setVariable('Mood', mood);
// };





// frp.Characters.prototype.Cuff = function (player, toggle) { 
//    if (toggle) {
//       this.Cuffed = toggle;
//    } else { 
//       this.Cuffed = !this.Cuffed;
//    }
//    player.setVariable('Cuffed', this.Cuffed);
//    return this.Cuffed;
// };


// frp.Characters.prototype.UnRentVehicle = function (player) {
//    if (this.Rented_Vehicle && this.Rented_Vehicle.Timer) {
//       clearTimeout(this.Rented_Vehicle.Timer);
//       this.Rented_Vehicle.destroy();
//    }
// }


// frp.Characters.prototype.ExtendRent = function (player, minutes) {
//    if (this.Rented_Vehicle && this.Rented_Vehicle.Timer) {
//       clearTimeout(this.Rented_Vehicle.Timer);
//       this.Rented_Vehicle.Timer = setTimeout(() => {
//          frp.Characters.prototype.UnRentVehicle(player);
//       }, 60000 * minutes);
//    }
// }


// frp.Characters.prototype.RentVehicle = function (player, model, business, minutes = 30) {
//    if (frp.Main.IsAnyVehAtPos(business.Vehicle_Point)) {
//       const Vehicle = mp.vehicles.new(model, business.Vehicle_Point,
//       {
//             heading: 180,
//             numberPlate: 'RENT',
//             alpha: 255,
//             color: 0,
//             locked: true,
//             engine: false,
//             dimension: player.dimension
//       });
//       this.Rented_Vehicle = Vehicle;
//       this.Rented_Vehicle.Timer = setTimeout(() => {
//          frp.Characters.prototype.UnRentVehicle(player);
//       }, 60000 * minutes);
//    } else { player.notification('Mesto za isporuku vozila je trenutno zauzeto.', NOTIFY_ERROR, 4); }
// };



// frp.Characters.prototype.SetAdmin = async function (level) { 
//    this.Admin = level;
//    await this.save();
// };


// frp.Characters.prototype.Buy = async function (Player, Nearest, action) { 

//    if (action) { 


//    } else { 

//       switch (true) { 
//          case Nearest instanceof frp.Business: {
//             Nearest.Menu(Player);
//             break;
//          }
   
//          case Nearest instanceof frp.Houses: { 
//             Nearest.Buy(Player);
//             break;
//          }
   
//          default: console.log('nidje');
//       }
//    }

// };


// frp.Characters.prototype.SetJob = async function (player, value) {
//    this.Job = value;
//    player.setVariable('Job', value);
//    await this.save();
// };


// frp.Characters.prototype.GiveLicense = async function (license) {
//    let Licenses = this.Licenses;
//    Licenses.push(license);
//    this.Licenses = Licenses;
//    await this.save();
// };


// frp.Characters.prototype.RemoveLicense = async function (license) {
//    let Licenses = this.Licenses;
//    let x = Licenses.find(name => name === license);
//    let i = Licenses.indexOf(x);
//    Licenses.splice(i, 1);
//    this.Licenses = Licenses;
//    await this.save();
// };


// frp.Characters.prototype.HasLicense = function (i) { 
//    return this.Licenses.includes(name => name === i);
// };


// frp.Characters.prototype.Payment = async function (Amount) { 
//    this.increment('Salary', { by: Amount });
// };


// frp.Characters.prototype.Properties = async function () {
//    const Houses = await frp.Houses.findAll({ where: { Owner: this.id } });
//    const Businesses = await frp.Business.findAll({ where: { Owner: this.id } });
//    const Vehicles = await frp.Business.findAll({ where: { Entity: VehicleEntities.Player, Owner: this.id } });
//    return { Vehicles: Vehicles, Houses: Houses, Businesses: Businesses };
// };


// frp.Characters.prototype.Appearance = async function () { 
//    const appearance = await frp.Appearances.findOne({ where: { Character: this.id }});
//    return appearance ? appearance : null;
// };


// frp.Characters.prototype.Uniform = function (Player, Uniform) { 
//    if (Uniform) { 
//       for (const Component of Uniform) { 
//          Player.setClothes(Component.Index, Component.Drawable, 0, 2);
//          Player.setVariable('Working_Uniform', true);
//       }
//    } else { 
//       frp.Items.Equipment(Player, this.Gender);
//       Player.setVariable('Working_Uniform', false);
//    }
// };


// frp.Characters.afterCreate(async (Character, Options) => {
//    const Appearance = await frp.Appearances.findOne({ where: { Character: Character.id }});
//    if (Appearance) { 
//       Appearance.destroy();
//    }
// });


// frp.Characters.New = async function (player, Character) { 
//    // const Bank = await frp.Bank.New(player);

//    const Created = await frp.Characters.create({
//       Account: player.account, Name: Character.First_Name + ' ' + Character.Last_Name,
//       Birth: Character.Birth, Origin: Character.Origin, Gender: Character.Gender, 
//       Armour: 0, Health: 100
//    });

//    const Appearance = await frp.Appearances.create({
//       Character: Created.id, Blend_Data: Character.Blend, Overlays: Character.Overlays, 
//       Overlays_Colors: Character.Overlays_Colors, Hair: Character.Hair, Beard: Character.Beard, 
//       Eyes: Character.Eyes, Face_Features: Character.Face
//    });

//    player.character = Created.id;

//    Character.Clothing.forEach(async (Clothing) => { 
//       const [item, value] = Clothing;
//       const Cloth = await frp.Items.New(item, 1, ItemEntities.Player, Created.id, null, null, 0, 0, { Drawable: value, Texture: 0 });
//       Cloth.Equip(player);
//    })

//    if (Created) return Created;

// };





// mp.Player.prototype.Instructions = function (content, time) {
//    this.call('client:player.interface:instructions', [content, time]);
// };


// mp.Player.prototype.Character = async function () {
//    if (this.character) { 
//       const character = await frp.Characters.findOne({ where: { id: this.character } });
//       return character ? character : null;
//    }
// };


// mp.Player.prototype.Account = async function () {
//    const account = await frp.Accounts.findOne({ where: { id: this.account } });
//    return account ? account : null;
// };


// mp.Player.prototype.SendMessage = function (message, color) {
//    this.outputChatBox('!{' + color + '}' + message);
// };


// mp.Player.prototype.IsNear = function (target) {
//    return this.dist(target.position) < 3.0 ? true : false;
// };


// mp.Player.prototype.NearbyPlayers = function (radius) {
//    let near = [];
//    mp.players.forEachInRange(this.position, radius, (player) => {
//       near.push(player);
//    });
//    return near;
// };


// mp.Player.prototype.Nearest = async function () { 

//    const Businesses = await frp.Business.findAll();
//    for (const Business of Businesses) { 
//       const Position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
//       if (this.dist(Position) < 2.0) return Business;
//    }

//    const Houses = await frp.Houses.findAll();
//    for (const House of Houses) { 
//       const Position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
//       if (this.dist(Position) < 2.0) return House;
//    }

//    const Vehicles = await mp.vehicles.toArray();
//    for (const Vehicle of Vehicles) { 
//       if (this.dist(Vehicle.position) < 2.25) return Vehicle;
//    }

// };



mp.Player.prototype.sendProximityMessage = function (radius: number, message: string, colors: string[]) {
   mp.players.forEachInRange(this.position, radius, (target) => {
      const distanceGap = radius / 5;
      const distance = target.dist(this.position)
      let color = null;

      switch (true) {
         case (distance < distanceGap): color = colors[0]; break;
         case (distance < distanceGap * 2): color = colors[1]; break;
         case (distance < distanceGap * 3): color = colors[2]; break;
         case (distance < distanceGap * 4): color = colors[3]; break;
         default: color = colors[0]; break;
      }
      
      target.outputChatBox('!{' + color + '}' + message);
   });
};


// mp.Player.prototype.VehicleMessage = function (message, colors) {
//    const Radius = 8;
//    mp.players.forEachInRange(this.position, Radius, (target) => {
//       if (this.vehicle == target.vehicle) { 
//          const distanceGap = Radius / 5;
//          const distance = target.dist(this.position)
//          let color = null;
   
//          switch (true) {
//             case (distance < distanceGap): color = colors[0]; break;
//             case (distance < distanceGap * 2): color = colors[1]; break;
//             case (distance < distanceGap * 3): color = colors[2]; break;
//             case (distance < distanceGap * 4): color = colors[3]; break;
//             default: color = colors[0]; break;
//          }
         
//          target.outputChatBox('!{' + color + '}' + message);
//       }
//    });
// };


// mp.Player.prototype.message = function (color, message) {
//    this.outputChatBox(`!{${color}}${message}`);
// };


// mp.Player.prototype.Bubble = function (Content, Color) { 
//    Player.setVariable('Bubble', { Content: Content, Color: Color });
//    Player.BubbleExpire = setTimeout(() => {
//       if (Player) Player.setVariable('Bubble', null);
//    }, 4000);
// };


// mp.players.find = (playerName) => {
//    let foundPlayer = null;
//    if (playerName == parseInt(playerName)) {
//       foundPlayer = mp.players.at(playerName);
//    }
//    if (!foundPlayer) {
//       mp.players.forEach((target) => {
//          if (target.name === playerName) {
//             foundPlayer = target;
//          }
//          else if (target.name.includes(playerName)) {
//             foundPlayer = target;
//          }
//       });
//    }
//    return foundPlayer;
// };



// (async () => {
//    frp.Characters.sync({ force: true });

//    // await frp.Characters.create({ Name: 'Zachary Parker', Account: 1 });
//    // await frp.Characters.create({ Name: 'Tester 1', Account: 2 });
//    // await frp.Characters.create({ Name: 'Tester Dva', Account: 3 });
//    // await frp.Characters.create({ Name: 'Tester Tri', Account: 4 });
//    // await frp.Characters.create({ Name: 'Tester Cetri', Account: 5 });
//    // await frp.Characters.create({ Name: 'Tester Pet', Account: 6 });
//    // await frp.Characters.create({ Name: 'Tester Sest', Account: 7 });
//    // await frp.Characters.create({ Name: 'Tester Sedam', Account: 8 });
//    // await frp.Characters.create({ Name: 'Tester Osam', Account: 9 });
//    // await frp.Characters.create({ Name: 'Tester Devet', Account: 10 });
//    // await frp.Characters.create({ Name: 'Tester Deset', Account: 11 });

// })();


