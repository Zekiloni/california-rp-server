


import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, CreatedAt, UpdatedAt, Length, DataType, BelongsTo, ForeignKey, HasOne, HasMany, Max, AfterSync } from 'sequelize-typescript';

import { accounts, appearances, banks, houses, business, inventories, items, logs, objects } from '@models';
import { facial_Moods, gDimension, walking_Styles, lang, colors, none, itemNames } from '@constants';
import { spawnPointTypes, notifications, distances, ItemEnums, offerTypes } from '@enums';
import { playerConfig } from '@configs';
import { shared_Data } from '@shared';
import { offer, playerInjury } from '@interfaces';
import { ClothingItem } from '../items/clothing.Item';


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

   offers: offer[] = [];
   
   inside: houses | business | null = null;

   freezed: boolean = false;

   respawnTimer: ReturnType<typeof setTimeout> | undefined = undefined;

   @AfterSync
   static async loading () {
      logs.info(await characters.count() + ' characters loaded !');
   }

   async spawnPlayer (player: PlayerMp, point: spawnPointTypes, appearance: appearances, id?: number) { 

      player.account.last_character = this.id;
      player.character = this;

      player.name = this.name;

      player.setVariable(shared_Data.SPAWNED, true);

      // loading money and health
      this.setHealth(player, this.health);

      player.setVariable(shared_Data.CHARACTER_ID, this.id);

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
      player.setVariable(shared_Data.BEANBAG, false);
      player.setVariable('Working_Uniform', false);
      player.setVariable('Attachment', null);
      player.setVariable('Phone_Ringing', false);
      player.setVariable('Ragdoll', false);
      

      player.notification(lang.welcomeToServer, notifications.type.INFO, 4);

      this.setWalkingStyle(player, this.walking_style);
      this.setMood(player, this.facial_mood);
      this.setCuffs(player, this.cuffed);

      if (appearance) {
         appearance.apply(player, this.gender);
      }
      
      ClothingItem.clothings.forEach(item => {
         inventories.findOne( { where: { name: item.name, owner: this.id, entity: ItemEnums.entity.PLAYER } } ).then(clothed => {
            if (clothed && clothed.equiped) {
               item.use(player, clothed);
            } else { 
               player.setClothes(item.component, item.naked[this.gender], 0, 2);
            }
         })
      });

      const bestTorso = await player.callProc('CLIENT::GET:BEST_TORSO');
      player.setClothes(ItemEnums.components.clothings.TORSO, bestTorso, 0, 2);      
      
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

         case spawnPointTypes.HOUSE: {
            houses.findOne( { where: { id: id } } ).then(house => {
               if (!house) {
                  return;
               }               

               player.position = house.interior_position;
               player.dimension = house.id;

               objects.findAll( { where: { property: 'house', property_id: house.id } } ).then(objects => {
                  player.call('CLIENT::INTERIOR:OBJECTS_LOAD', [objects, house.id])
               })

               player.character.inside = house;
         
               player.call('CLIENT::INTERIOR:CREATE_EXIT_POINT', [house.interior_position, 30, house.object.marker?.getColor()])
            })
            break;
         }
      }

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

   isUnemployed () {
      return this.job == 0 ? true : false;
   }

   async hasLicense (item?: inventories) {
      const has = await inventories.findOne({ where: { name: item?.name } });
      return has ? has : false;
   }


   async injury (player: PlayerMp, bone: number, weapon: number, damage: number) {
      let injuries = this.injuries ? this.injuries : [];
      
      const alreadyInjured = injuries.find(injury => injury.bone == bone && injury.weapon == weapon);

      if (alreadyInjured) { 
         alreadyInjured.times ++;
         alreadyInjured.damage += damage;
      } else {
         const injury: playerInjury = {
            bone: bone,
            weapon: weapon,
            damage: damage,
            times: 1
         };
         injuries.push(injury);
      }

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
   
   onDead (player: PlayerMp, killer: PlayerMp | EntityMp | null | undefined, reason?: number) {
      player.setVariable(shared_Data.DEAD, true);
      player.setVariable(shared_Data.WOUNDED, false);

      if (killer && (<PlayerMp>killer).name) {
         console.log(' Killer ' + (<PlayerMp>killer).name);

      }

      if (reason) {
         
      }

   }

   async onQuit (position: Vector3Mp, dimension: number, exitType: string, reason: string | null) {
      this.last_position = position;
      this.last_dimension = dimension;

      await this.save();
      inventories.savePlayerEquipment(this);
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

   onChat (player: PlayerMp, content: any) {
      if (player.getVariable(shared_Data.LOGGED) && player.getVariable(shared_Data.SPAWNED)) {

         if (player.getVariable(shared_Data.MUTED)) {
            return; // u are muted
         }; 

         const character = player.character;

         if (character.dead) {
            player.notification(lang.cannotWhileDead, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         player.proximityMessage(distances.IC, character.name + lang.personSays + content, colors.hex.White);
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


   // pushOffer (player: PlayerMp, type: offerTypes, offeredBy: PlayerMp, id?: ) {
   //    const offer: offer = {
         
   //    }
   // }

   removeOffer (offer: offer) {
      clearTimeout(offer.expire);
      const index = this.offers.indexOf(offer);
      this.offers.splice(index, 1);
   }   

   clearOffers () {
      this.offers.forEach(offer => {
         this.removeOffer(offer);
      });
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



mp.Player.prototype.proximityMessage = function (radius: number, message: string, colors: string[]) {
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


