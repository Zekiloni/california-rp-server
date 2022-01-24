

import { Distances, entityData, globalDimension, itemData, NotifyType, Peds, spawnTypes } from '../globals/enums';
import { Colors, Messages } from '../globals/constants';
import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, IsUUID, Length, DataType, BelongsTo, ForeignKey, HasOne, AfterCreate } from 'sequelize-typescript';
import { Config } from '../config';

import Accounts from './account.model';
import { Injury } from './misc/injury.model';
import Appearances from './appearance.model';
import Database from '../database';
import Houses from './house.model';
import Business from './business.model';
import { Vehicles } from './vehicle.model';
import { characterProperties } from '../globals/interfaces';
import { licenseItem } from './items/license.item';
import Items from './inventory.item.model';
import { baseItem } from './item.model';
import { documentType } from './items/document.item';


console.log(Peds.walkingStyles.Normal)

@Table
export default class Characters extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @ForeignKey(() => Accounts)
   @Column
   account_id: number

   @BelongsTo(() => Accounts)
   account: Accounts

   @Unique
   @Length({ min: 6, max: 48 })
   @Column
   name: string

   @Column
   gender: number

   @Column
   birth: string

   @Column
   origin: string

   @Default(Config.Default.Money)
   @Column
   money: number

   @Default(0)
   @Column
   salary: number

   @HasOne(() => Appearances)
   appearance: Appearances

   @Default(0)
   @Column
   paycheck: number

   @IsUUID(4)
   @Default(DataType.UUIDV4)
   @Column
   stranger_id: number;

   @Default(0)
   @Column
   faction: number;

   @Default('none')
   @Column
   faction_rank: string;

   @Default(0)
   @Column
   faction_perms: number;

   @Default(0)
   @Column
   job: number;

   @Default(0)
   @Column
   working_hours: number;

   @Default(100)
   @Column
   health: number;

   @Default(100)
   @Column
   hunger: number;

   @Default(100)
   @Column
   thirst: number;
   
   @Default(false)
   @Column
   wounded: boolean;

   @Default([])
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('injuries')); },
   })    
   injuries: Injury[]

   @Default(null)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('last_position')); },
   })   
   last_position: Vector3Mp;

   @Default(null)
   @Column
   last_dimension: number;
   
   @Default(null)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('inside')); },
   })    
   inside: object

   @Default(0)
   @Column
   muted: number

   @Default(0)
   @Column
   hours: number

   @Default(0)
   @Column
   minutes: number

   @Default(Peds.walkingStyles.Normal)
   @Column(DataType.STRING)
   walking_style: keyof typeof Peds.walkingStyles

   @Default(Peds.facialMoods.Normal)
   @Column(DataType.STRING)
   facial_mood: keyof typeof Peds.facialMoods
   
   @Default(Config.Max.INVENTORY_WEIGHT)
   @Column
   max_inventory_weight: number

   @Default(Config.Max.HOUSES)
   @Column
   max_houses: number

   @Default(Config.Max.BUSINESSES)
   @Column
   max_business: number

   @Default(Config.Max.VEHICLES)
   @Column
   max_vehicles: number

   @Default(false)
   @Column
   cuffed: boolean

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   @AfterCreate
   static async onCreate (character: Characters, options: any) {
      const player = mp.players.find((player: PlayerMp) => player.Character == character);

      const documentItem = await Items.giveItem(player!, baseItem.list[itemData.Names.DOCUMENT_ID_CARD], 1);

      documentItem!.data = {
         name: character.name,
         birth: character.birth,
         origin: character.origin,
         gender: character.gender
      };

      await documentItem?.save();
      console.log(documentItem);
   }

   get properties (): Promise<characterProperties> { 
      return new Promise(async resolve => { 
         const houses = await Houses.findAll({ where: { owner: this.id } });
         const busineess = await Business.findAll({ where: { owner: this.id } });
         const vehicles = await Vehicles.findAll({ where: { owner: this.id } });
         return { houses: houses, busineess: busineess, vehicles: vehicles };
      });
   }

   async spawnPlayer (player: PlayerMp, point: spawnTypes) { 

      player.Account.last_character = this.id;
      player.Character = this;

      player.name = this.name;

      player.setVariable(entityData.SPAWNED, true);

      // loading money and health
      this.setHealth(player, this.health);
      this.setMoney(player, this.money);

      player.setVariable(entityData.JOB, this.job);
      player.setVariable(entityData.FACTION, this.faction);

      // temporary variables
      player.setVariable(entityData.FACTION_DUTY, false);
      player.setVariable(entityData.JOB_DUTY, false);
      player.setVariable(entityData.JOB_VEHICLE, null);
      player.setVariable('Working_Uniform', false);
      player.setVariable(entityData.ADMIN_DUTY, false);
      player.setVariable('Attachment', null);
      player.setVariable('Phone_Ringing', false);
      player.setVariable(entityData.FREEZED, false);
      player.setVariable('Ragdoll', false);


      player.sendNotification(Messages.WELCOME, NotifyType.INFO, 4);


      this.setWalkingStyle(player, this.walking_style);
      this.setMood(player, this.facial_mood);
      this.setCuffs(player, this.cuffed);

      if (this.appearance) { 
         this.appearance.apply(player, this.gender);
      } else { 
         Appearances.findOne({ where: { character_id: this.id } }).then(appearance => {
            appearance?.apply(player, this.gender);
         });
      }

   
   
      // player.setVariable(entityData.INJURIES, this.injuries.length > 0 ? this.injuries : []);

      switch (point) { 
         case spawnTypes.default: { 
            player.position = Config.Default.Spawn;
            player.dimension = globalDimension;
            break;
         }

         case spawnTypes.lastPosition: {
            player.position = new mp.Vector3(this.last_position.x, this.last_position.y, this.last_position.y);
            player.dimension = this.last_dimension ? this.last_dimension : globalDimension;
            break;
         }

      }
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


      await player.Account.save();
   }

   async setHealth (player: PlayerMp, value: number) { 
      player.health = value;
      this.health = value;
   };

   async setMoney (player: PlayerMp, value: number) { 
      player.setVariable(entityData.MONEY, value);
      this.money = value;
      await this.save();
   };

   async giveMoney (player: PlayerMp, value: any) {
      this.increment('money', { by: value });
      player.setVariable(entityData.MONEY, this.money + parseInt(value));
   };

   async setJob (player: PlayerMp, value: number) {
      this.job = value;
      player.setVariable(entityData.JOB, value);
      await this.save();
   };

   async setWalkingStyle (player: PlayerMp, style: keyof typeof Peds.walkingStyles) {
      this.walking_style = style;
      player.setVariable(entityData.WALKING_STYLE, style);
      await this.save();
   };

   setMood (player: PlayerMp, mood: keyof typeof Peds.facialMoods) { 
      this.facial_mood = mood;
      player.setVariable(entityData.FACIAL_MOOD, mood);
   };

   setCuffs (player: PlayerMp, toggle: boolean) {
      this.cuffed = toggle;
      player.setVariable(entityData.CUFFED, toggle);
   }

   async hasLicense (item?: licenseItem) {
      const has = await Items.findOne({ where: { name: item?.name } });
      return has ? has : false;
   }

   onDeath (player: PlayerMp) { 
      const { position } = player;
      console.log(1)
      player.spawn(position);
      
   }

   onChat (player: PlayerMp, content: any) {
      if (player.getVariable(entityData.LOGGED) && player.getVariable(entityData.SPAWNED)) {

         if (player.getVariable(entityData.MUTED)) return; // u are muted

         const character = player.Character;

         player.sendProximityMessage(Distances.IC, character.name + Messages.PERSON_SAYS + content, Colors.White);
      }

      //    if (Player.getVariable('Muted')) return;

      //    const Character = await Player.Character();

      //    const Name = Player.getVariable('Masked') ? Character.Stranger : Player.name;

      //    if (Player.vehicle) { 

      //       const vClass = await Player.callProc('client:player.vehicle:class');
      //       if (vClass == 14 || vClass == 13 || vClass == 8) { 
      //          Player.ProximityMessage(Distances.IC, Name + Messages.PERSON_SAYS + Content, Colors.White);
      //       } else { 

      //          const Seat = Player.seat;
      //          let Windows = Player.vehicle.getVariable('Windows');

      //          if (Windows[Seat]) { 
      //             Player.ProximityMessage(Distances.VEHICLE, Name + Messages.PERSON_SAYS + Content, Colors.White);

      //          } else { 
      //             Player.VehicleMessage(Name + Messages.PERSON_SAYS_IN_VEHICLE + Content, Colors.Vehicle);
      //          }
      //       }

      //    } else { 
      //       Player.ProximityMessage(Distances.IC, Name + Messages.PERSON_SAYS + Content, Colors.White);
      //    }

      // }
   }
}




// frp.Characters.prototype.Attachment = async function (player, model, bone, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
//    if (model) { 
//       const Offset = { X: x, Y: y, Z: z, rX: rx, rY: ry, rZ: rz };
//       player.setVariable('Attachment', { Model: model, Bone: bone, Offset: Offset });
//    } else { 
//       player.setVariable('Attachment', null);
//    }
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



// mp.Player.prototype.Account = async function () {
//    const account = await frp.Accounts.findOne({ where: { id: this.account } });
//    return account ? account : null;
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


