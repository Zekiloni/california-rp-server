


import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, CreatedAt, UpdatedAt, IsUUID, Length, DataType, BelongsTo, ForeignKey, HasOne, HasMany, Max } from 'sequelize-typescript';

import { accounts, appearances, banks, houses, business, inventories, items } from '@models';
import { facial_Moods, gDimension, walking_Styles, lang, colors, none } from '@constants';
import { spawnPointTypes, notifications, distances } from '@enums';
import { playerConfig } from '@configs';
import { shared_Data } from '@shared';
import { playerInjury } from '@interfaces';


@Table
export class characters extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column(DataType.INTEGER)
   id: number

   @ForeignKey(() => accounts)
   @Column(DataType.INTEGER)
   account_id: number

   @BelongsTo(() => accounts)
   account: accounts

   @Unique(true)
   @Length({ min: 6, max: 48 })
   @Column(DataType.STRING(128))
   name: string

   @Column(DataType.INTEGER)
   gender: number

   @Column
   birth: string

   @Column(DataType.STRING(64))
   origin: string

   @Default(playerConfig.main.money)
   @Column(DataType.INTEGER)
   money: number

   @HasOne(() => appearances)
   appearance: appearances

   @HasOne(() => banks)
   bank: banks;

   @Default(none)
   @Column
   paycheck: number

   @Default(none)
   @Column
   faction: number;

   @Default(null)
   @Column(DataType.INTEGER)
   faction_rank: number;

   @Default(none)
   @Column(DataType.INTEGER)
   faction_perms: number;

   @Default(none)
   @Length( { min: none, max : 30 })
   @Column(DataType.INTEGER( { length: 2 } ))
   job: number;

   @Default(none)
   @Column(DataType.INTEGER)
   working_hours: number;

   @Default(100)
   @Column(DataType.INTEGER)
   health: number;

   @Default(100)
   @Column(DataType.INTEGER)
   hunger: number;

   @Default(100)
   @Column(DataType.INTEGER( { length: 3 } ))
   thirst: number;
   
   @Default(false)
   @Column(DataType.BOOLEAN)
   wounded: boolean;

   @Default(false)
   @Column(DataType.BOOLEAN)
   dead: boolean;

   injuries: playerInjury[] = [];

   @Default(null)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('last_position')); 
         }
      }
   )   
   last_position: Vector3Mp;

   @Default(null)
   @Column
   last_dimension: number;
   
   @Default(null)
   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('inside')); }
      }
   )    
   inside: { position: Vector3Mp, type: number }

   @Default(none)
   @Column(DataType.INTEGER( { length: 3 } ))
   muted: number

   @Default(0)
   @Column(DataType.INTEGER( { length: 11 } ))
   hours: number

   @Default(0)
   @Column(DataType.INTEGER( { length: 3 } ))
   minutes: number

   @Default(walking_Styles.Normal)
   @Column(DataType.STRING)
   walking_style: keyof typeof walking_Styles

   @Default(facial_Moods.Normal)
   @Column(DataType.STRING(32))
   facial_mood: keyof typeof facial_Moods
   
   @Default(playerConfig.max.INVENTORY_WEIGHT)
   @Column(DataType.INTEGER( { length: 2 } ))
   max_inventory_weight: number

   @Default(playerConfig.max.HOUSES)
   @Column(DataType.INTEGER( { length: 2 } ))
   max_houses: number

   @Default(playerConfig.max.BUSINESS)
   @Column(DataType.INTEGER( { length: 2 } ))
   max_business: number

   @Default(playerConfig.max.VEHICLES)
   @Column(DataType.INTEGER( { length: 2 } ))
   max_vehicles: number

   @Default(false)
   @Column(DataType.BOOLEAN)
   cuffed: boolean

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   @HasMany(() => houses)
   houses: houses[]

   @HasMany(() => business)
   business: business[]

   equiped: inventories[] = [];

   freezed: boolean = false;

   respawnTimer: ReturnType<typeof setTimeout> | undefined = undefined;

   async spawnPlayer (player: PlayerMp, point: spawnPointTypes, appearance: appearances) { 

      player.account.last_character = this.id;
      player.character = this;

      player.name = this.name;

      player.setVariable(shared_Data.SPAWNED, true);

      // loading money and health
      this.setHealth(player, this.health);

      player.setVariable(shared_Data.MONEY, this.money);
      player.setVariable(shared_Data.JOB, this.job);
      player.setVariable(shared_Data.FACTION, this.faction);

      // temporary variables
      player.setVariable(shared_Data.FACTION_DUTY, false);
      player.setVariable(shared_Data.JOB_DUTY, false);
      player.setVariable(shared_Data.JOB_VEHICLE, null);
      player.setVariable(shared_Data.ADMIN_DUTY, false);
      player.setVariable(shared_Data.FREEZED, false);
      player.setVariable(shared_Data.BUBBLE, null);
      player.setVariable(shared_Data.ANIMATION, null);
      player.setVariable('Working_Uniform', false);
      player.setVariable('Attachment', null);
      player.setVariable('Phone_Ringing', false);
      player.setVariable('Ragdoll', false);

      player.sendNotification(lang.welcomeToServer, notifications.type.INFO, 4);

      this.setWalkingStyle(player, this.walking_style);
      this.setMood(player, this.facial_mood);
      this.setCuffs(player, this.cuffed);

      if (appearance) {
         appearance.apply(player, this.gender);
      }

      player.setVariable(shared_Data.INJURIES, this.injuries ? this.injuries : []);

      switch (point) { 
         case spawnPointTypes.DEFAULT: { 
            player.position = playerConfig.main.spawn;
            player.dimension = gDimension;
            break;
         }

         case spawnPointTypes.LAST_POSITION: {
            player.position = new mp.Vector3(this.last_position.x, this.last_position.y, this.last_position.z);
            player.dimension = this.last_dimension ? this.last_dimension : gDimension;
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


      await player.account.save();
   }

   async setHealth (player: PlayerMp, value: number) { 
      player.health = value;
      await this.update( { health: value } );
   };

   async setMoney (player: PlayerMp, value: number) { 
      player.setVariable(shared_Data.MONEY, value);
      await this.update({ money: value });
   };

   async giveMoney (player: PlayerMp, value: number) {
      const money = player.getVariable(shared_Data.MONEY);
      await this.update( { money: money + value });
      player.setVariable(shared_Data.MONEY, money + value);
   };

   async setJob (player: PlayerMp, value: number) {
      this.job = value;
      player.setVariable(shared_Data.JOB, value);
      await this.save();
   };

   async setWalkingStyle (player: PlayerMp, style: keyof typeof walking_Styles) {
      this.walking_style = style;
      player.setVariable(shared_Data.WALKING_STYLE, style);
      await this.save();
   };

   setMood (player: PlayerMp, mood: keyof typeof facial_Moods) { 
      this.facial_mood = mood;
      player.setVariable(shared_Data.FACIAL_MOOD, mood);
   };

   setCuffs (player: PlayerMp, toggle: boolean) {
      this.cuffed = toggle;
      player.setVariable(shared_Data.CUFFED, toggle);
   }

   async hasLicense (item?: inventories) {
      const has = await inventories.findOne({ where: { name: item?.name } });
      return has ? has : false;
   }


   async injury (player: PlayerMp, bone: number, weapon: number, damage: number) {
      let injuries = this.injuries ? this.injuries : [];
      
      const alreadyInjured = injuries.find(injury => injury.bone == bone && injury.weapon == weapon);

      if (alreadyInjured) { 
         console.log('aready injured i that place');
         alreadyInjured.times ++;
         alreadyInjured.damage += damage;
      } else {
         console.log('added new injury')
         const injury: playerInjury = {
            bone: bone,
            weapon: weapon,
            damage: damage,
            times: 1
         };
   
         console.log(injuries)
         console.log(injury)
         injuries.push(injury);
      }

      console.log(injuries);

      player.setVariable(shared_Data.INJURIES, injuries);

      this.update( { injuries: injuries } );
   }
   
   clearInjuries (player: PlayerMp) { 
      player.setVariable(shared_Data.INJURIES, []);
      this.injuries = [];
   }

   onWound (player: PlayerMp, by: PlayerMp | null | EntityMp | undefined) { 
      player.setVariable(shared_Data.WOUNDED, true);

      player.health = 45;
      
      player.call('CLIENT::DEATHSCREEN', [Date.now() + playerConfig.respawnTimer])

      this.respawnTimer = setTimeout(async () => {
         if (player) {
            this.respawn(player, true);
         }

         clearTimeout(this.respawnTimer!);
      }, playerConfig.respawnTimer);

      return true;
   }
   
   onDead (player: PlayerMp, killer: PlayerMp | EntityMp | null | undefined) {
      
      player.setVariable(shared_Data.DEAD, true);
      player.setVariable(shared_Data.WOUNDED, false);

      console.log(' Killer ' + (<PlayerMp>killer).name);

      return true;
   }

   async respawn (player: PlayerMp, inHospital: boolean) {

      const position = inHospital ? new mp.Vector3(280.8525, -1432.99853, 29.9649658) : player.position;

      if (this.respawnTimer) {
         clearTimeout(this.respawnTimer);
      }

      player.call('CLIENT::DEATHSCREEN', [false])
      player.setVariable(shared_Data.WOUNDED, false);
      player.setVariable(shared_Data.DEAD, false);

      this.dead = false;
      this.wounded = false;

      this.clearInjuries(player);

      player.spawn(position);

      await this.save();
   }

   isUnemployed () {
      return this.job == 0 ? true : false;
   }

   onChat (player: PlayerMp, content: any) {
      if (player.getVariable(shared_Data.LOGGED) && player.getVariable(shared_Data.SPAWNED)) {

         if (player.getVariable(shared_Data.MUTED)) {
            return; // u are muted
         }; 

         const character = player.character;

         if (character.dead) {
            player.sendNotification(lang.cannotWhileDead, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         player.sendProximityMessage(distances.IC, character.name + lang.personSays + content, colors.hex.White);
      }

      //    if (Player.getVariable('Muted')) return;

      //    const Character = await Player.character();

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


