
import { 
   Table, Column, Model, PrimaryKey, AutoIncrement,
   Unique, Default, CreatedAt, UpdatedAt, Length,
   DataType, BelongsTo, ForeignKey, HasOne, HasMany,
   AfterSync, IsUUID 
} from 'sequelize-typescript';

import { 
   accounts, appearances, banks, houses,
   business, inventories, logs, objects, 
   vehicles, factions, factionsRanks
} from '@models';

import { FacialMoods, gDimension, WalkingStyles, lang, colors, none } from '@constants';
import { spawnPointTypes, notifications, distances, ItemEnums } from '@enums';
import { playerConfig, VehicleConfig } from '@configs';
import { shared_Data } from '@shared';
import { offer, Injury } from '@interfaces';
import { ClothingItem } from '../items/clothing.Item';
import { admins } from '../../modules/admin';



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
   rank: number;

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

   injuries: Injury[] = [];

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

   @Default(WalkingStyles.Normal)
   @Column(DataType.STRING)
   walking_style: keyof typeof WalkingStyles

   @Default(FacialMoods.Normal)
   @Column(DataType.STRING(32))
   facial_mood: keyof typeof FacialMoods
   
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

   @IsUUID(4)
   @Column
   stranger: string

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   @HasMany(() => houses)
   houses: houses[]

   @HasMany(() => business)
   business: business[]

   @HasMany(() => vehicles)
   vehicles: vehicles[]

   offer: offer | null = null;
   
   working: boolean = false;

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

      // faction
      player.setVariable(shared_Data.FACTION, this.faction);
      if (this.faction != none) {
         factions.findOne( { where: { id: this.faction } } ).then(faction => {
            if (!faction) {
               return;
            }
            console.log('faction points')
            faction.points(player);
         });
      }

      // temporary variables
      player.setVariable(shared_Data.FACTION_DUTY, false);
      player.setVariable(shared_Data.ADMIN_DUTY, false);
      player.setVariable(shared_Data.FREEZED, false);
      player.setVariable(shared_Data.BUBBLE, null);
      player.setVariable(shared_Data.ANIMATION, null);
      player.setVariable(shared_Data.BEANBAG, false);
      player.setVariable(shared_Data.PHONE_CALL, false);
      player.setVariable(shared_Data.USING_PHONE, false);
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
               player.setClothes(item.component, item.naked![this.gender], 0, 2);
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
   };

   async setFaction (player: PlayerMp, factionID: number, rank?: number) {
      this.faction = factionID;

      if (rank) {
         this.rank = rank;
      }
      
      player.setVariable(shared_Data.FACTION, factionID);
   }

   async setWalkingStyle (player: PlayerMp, style: keyof typeof WalkingStyles) {
      this.walking_style = style;
      player.setVariable(shared_Data.WALKING_STYLE, WalkingStyles[style]);
   };

   setMood (player: PlayerMp, mood: keyof typeof FacialMoods) { 
      this.facial_mood = mood;
      player.setVariable(shared_Data.FACIAL_MOOD, FacialMoods[mood]);
   };

   async setCuffs (player: PlayerMp, toggle: boolean) {
      this.cuffed = toggle;
      player.setVariable(shared_Data.CUFFED, toggle);

      if (player.weapon) {
         player.removeWeapon(player.weapon);
      }

      await this.save();
   }

   get isUnemployed () {
      return this.job == none ? true : false;
   }

   setOffer (player: PlayerMp, value: offer | null) {
      this.offer = value;
      player.setVariable(shared_Data.OFFER, value);
   }

   async hasLicense (item?: inventories) {
      const has = await inventories.findOne( { where: { name: item?.name, owner: this.id, entity: ItemEnums.entity.PLAYER } } );
      return has ? has : false;
   }

   async injury (player: PlayerMp, bone: number, weapon: number, damage: number) {
      let injuries = this.injuries ? this.injuries : [];
      
      const alreadyInjured = injuries.find(injury => injury.bone == bone && injury.weapon == weapon);

      if (alreadyInjured) { 
         alreadyInjured.times ++;
         alreadyInjured.damage += damage;
      } else {
         const injury: Injury = {
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

      vehicles.findAll({ where: { owner: this.id, temporary: true } } ).then(vehicles => {
         vehicles.forEach(vehicle => {
            switch (vehicle.type) {
               case VehicleConfig.type.ADMIN: {
                  vehicle.destroy();
                  break;
               }

               case VehicleConfig.type.FACTION: {
                  vehicle.destroy();
                  break;
               }
            }
         })
      });

      await this.save();
      inventories.savePlayerEquipment(this);
      
      this.working = false;
   }

   async respawn (player: PlayerMp, inHospital: boolean) {
      let position: Vector3Mp;

      if (inHospital) {
         position = new mp.Vector3(280.8525, -1432.99853, 29.9649658);
      } else { 
         if (player) {
            position = player.position;
         }
      }

      if (this.respawnTimer) {
         clearTimeout(this.respawnTimer);
      }

      this.dead = false;
      this.wounded = false;

      this.clearInjuries(player);

      if (player) {
         player.spawn(position!);
         player.call('CLIENT::DEATHSCREEN', [false])
         player.setVariable(shared_Data.WOUNDED, false);
         player.setVariable(shared_Data.DEAD, false);
      }

      await this.save();
   }

   onChat (player: PlayerMp, content: any) {
      let sender: string;

      if (player.getVariable(shared_Data.LOGGED) && player.getVariable(shared_Data.SPAWNED)) {

         if (player.getVariable(shared_Data.MUTED)) {
            return;
         }; 

         const character = player.character;

         if (character.dead) {
            player.notification(lang.cannotWhileDead, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         if (player.getVariable(shared_Data.MASKED)) {
            sender = player.character.stranger;
         } else {
            sender = player.name;
         }

         player.proximityMessage(distances.IC, sender + lang.personSays + content, colors.hex.White);
      }
   }
   
   static async panel (player: PlayerMp) {
      return [
         player,
         await factions.findOne( { where: { id: player.character.faction } } ),
         await factionsRanks.findOne( { where: { id: player.character.rank } } ),
         WalkingStyles, 
         FacialMoods,
         admins.reports.get(player.character.id)
      ];
   }

   static offerRespond (player: PlayerMp, respond: boolean) {
      if (!player.character.offer) {
         return;
      }
   
      player.character.offer.respond(player, respond);
   }

   static panelAction (player: PlayerMp, action: string, value: keyof typeof WalkingStyles | keyof typeof FacialMoods) {
      switch (action) {
         case 'walkingStyle': {
            player.character.setWalkingStyle(player, <keyof typeof WalkingStyles>value);
            break;
         }

         case 'facialMood': {
            player.character.setMood(player, <keyof typeof FacialMoods>value);
            break;
         }
      }
   }

   static report (player: PlayerMp, message: string) {
      return admins.createReport(player, message);
   }

   static deleteReport (player: PlayerMp) {
      return admins.reportDelete(player);
   }
}


mp.events.add('SERVER::OFFER:RESPONSE', characters.offerRespond);
mp.events.add('SERVER::PLAYER_MENU:ACTION', characters.panelAction);
mp.events.addProc('SERVER::PLAYER_MENU', characters.panel);
mp.events.addProc('SERVER::PLAYER:REPORT', characters.report);
mp.events.addProc('SERVER::PLAYER:DELETE_REPORT', characters.deleteReport);