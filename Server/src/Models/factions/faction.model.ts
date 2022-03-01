
import { AfterCreate, AfterDestroy, AfterSync, AutoIncrement, Column, CreatedAt, DataType, Default, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { factionConfig } from '@configs';
import { factionPoints } from '@interfaces';
import { cmds, colors, lang, none } from '@constants';
import { notifications } from '@enums';
import { characters, factionsRanks, logs } from '@models';
import { checkForDot, shared_Data } from '@shared';


@Table
export class factions extends Model {

   static objects = new Map<number, factionPoints>()

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default(factionConfig.type.LEO)
   @Column
   type: factionConfig.type

   @Unique(true)
   @Column
   name: string

   @Column
   description: string

   @Column
   leader: number

   @Default(none)
   @Column(DataType.INTEGER)
   budget: number

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('spawn_Point')); }
   })   
   spawn_Point: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('vehicle_Point')); }
   })   
   vehicle_Point: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('garage_point')); }
   })   
   garage_point: Vector3Mp

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('equipment_point')); }
      }
   )   
   equipment_point: Vector3Mp

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('equipment')); }
      }
   )   
   equipment: string[]

   @HasMany(() => factionsRanks)
   ranks: factionsRanks[]

   @CreatedAt
   created_at: Date

   @UpdatedAt
   updated_at: Date

   get object (): factionPoints | never { 
      return factions.objects.get(this.id)!;
   }

   set object (object: factionPoints) { 
      factions.objects.set(this.id, object);
   }


   @AfterSync
   static async loading () {
      factions.findAll().then(factions => {
         
         logs.info(factions.length + ' factions loaded !');
      });
   }

   @AfterCreate
   static creating (faction: factions) {
      faction.refresh();
   }

   @AfterDestroy
   static destroying (faction: factions) {

   }

   refresh () {
      if (!this.object) {
         return;
      }

      this.object.vehicle_Point = {
         
      }
   }


   async edit (player: PlayerMp, property: string, value: string) {
      switch (property) {
         case cmds.actions.name: {
            this.name = value;
            break;
         }

         case cmds.actions.description: {
            this.description = value;
            break;
         }

         case cmds.actions.spawn: {
            this.spawn_Point = player.position;
            break;
         }
      }

      await this.save();
   }
   

   async leave (player: PlayerMp) {
      player.character.faction = none;
      player.character.rank = none;
      player.setVariable(shared_Data.FACTION, none);

      if (this.leader == player.character.id) {
         this.leader = none;
         player.notification(lang.uLeaveFactionLeaderPosition + checkForDot(this.name), notifications.type.ERROR, notifications.time.MED);
         await this.save();
      } else { 
         player.notification(lang.uLeavedFaction + checkForDot(this.name), notifications.type.ERROR, notifications.time.MED);
      }

      await player.character.save()
   }

   async removeLeader () {
      this.leader = none;
      await this.save();
   }

   async makeLeader (player: PlayerMp, target: PlayerMp) {
      target.character.faction = this.id;
      this.leader = target.character.id;
      target.setVariable(shared_Data.FACTION, this.id);

      target.notification(lang.uAreNowLeaderOf + this.name + lang.fromAdmin + player.name + ' (' + player.account.username + ').', notifications.type.INFO, notifications.time.MED);

      // PORUKA: u set leader of ... to ...
      // LOGS: setted leader

      await this.save();
      await target.character.save();
   }


   async kick (player: PlayerMp, target: PlayerMp) {
      if (target.character.faction != player.character.faction) {
         player.notification(lang.notInYourFaction, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (this.leader == target.character.id) {
         player.notification(lang.cannotLeader, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      target.character.faction = none;
      target.character.rank = none;
      target.setVariable(shared_Data.FACTION, none);

      target.notification(player.name + lang.hasKickedYouFromFaction + checkForDot(this.name), notifications.type.INFO, notifications.time.LONG);
      player.notification(lang.uKickedFromFaction + target.name + lang.fromFaction, notifications.type.SUCCESS, notifications.time.MED); // to player u succes kicked target.name...

      await target.character.save();
   }


   invite (player: PlayerMp, target: PlayerMp) {
      if (target.character.faction != none) {
         player.notification(lang.playerAlreadyInFaction, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (target.character.offer) {
         player.notification(lang.playerAlreadyHasOffer, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (player.id == target.id) {
         player.notification(lang.cannotToYourself, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      const offer = {
         title: lang.factionInvite,
         description: player.name + lang.toJoinFaction + this.name + '.',
         offerer: player,
         faction: this.id,
         async respond (player: PlayerMp, respond: boolean) {
            const result: string = respond ? lang.accepted : lang.declined;

            if (respond) {
               player.character.faction = this.faction!;
               player.setVariable(shared_Data.FACTION, this.faction);

               await player.character.save();
            } else { 

            }
            
            if (this.offerer) {
               this.offerer.notification(player.name + result + lang.yourFactionInvite, notifications.type.INFO, notifications.time.MED);
            }
            
            player.character.setOffer(player, null);
         }
      }

      player.character.setOffer(player, offer);
   }
   

  async rank (player: PlayerMp, target: PlayerMp, rankName: string) {
      const rank = await factionsRanks.findOne( { where: { faction_id: this.id, name: rankName } } );

      if (!rank) {
         player.notification(lang.rankDoesntExist, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      target.character.rank = rank.id;

      await target.character.save();

      player.notification('u have rank to ' + target.name, notifications.type.SUCCESS, notifications.time.LONG);
   }


   async chat (player: PlayerMp, message: string) { 
      const rank = await factionsRanks.findOne( { where: { id: player.character.rank } } );
      
      mp.players.forEach(target => {
         if (target.character.faction == this.id) {
            target.sendMessage('(( ' + (rank ? rank?.name : lang.unranked) + ' ' + player.name + ': ' + checkForDot(message) + ' ))', colors.hex.FACTION);
         }
      })
   }

}



const getFaction = (player: PlayerMp) => {
   return factions.findOne( { where: { id: player.character.faction }, include: [factionsRanks] } ).then(async faction => {
      const members = await characters.findAll( { where: { faction: player.character.faction } } );
      return [ faction, members ];
   })
}


const kickMember = (player: PlayerMp, characterID: number) => {
   return factions.findOne( { where: { id: player.character.faction } } ).then(async faction => {
      if (!faction) {
         return;
      }

      const targetCharacter = await characters.findOne( { where: { id: characterID } } );

      if (!targetCharacter) {
         return;
      }

      const isOnline = mp.players.toArray().find(target => target.character.id == targetCharacter.id);

      if (isOnline) {
         faction.kick(player, isOnline);
      } else {
         targetCharacter.faction = none;
         targetCharacter.rank = none
         await targetCharacter.save();

         player.notification(lang.uKickedFromFaction + targetCharacter.name + lang.fromFaction, notifications.type.SUCCESS, notifications.time.MED);
      }

      return true;
   });
}


mp.events.addProc('SERVER::FACTION:INFO', getFaction);
mp.events.addProc('SERVER::FACTION:KICK_MEMBER', kickMember);