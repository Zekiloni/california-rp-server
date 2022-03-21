
import { AfterCreate, AfterDestroy, AfterSync, AutoIncrement, Column, CreatedAt, DataType, Default, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { EconomyConfig, FactionConfig } from '@configs';
import { factionPoints } from '@interfaces';
import { cmds, colors, lang, none } from '@constants';
import { notifications } from '@enums';
import { Characters, factionsRanks, logs } from '@models';
import { checkForDot, formatCommand, shared_Data } from '@shared';


@Table
export class factions extends Model {

   static objects = new Map<number, factionPoints>()

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default(FactionConfig.type.LEO)
   @Column
   type: FactionConfig.type

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
      get () { return JSON.parse(this.getDataValue('spawn_point')); }
   })   
   spawn_point: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('vehicle_point')); }
   })   
   vehicle_point: Vector3Mp

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
            this.spawn_point = player.position;
            break;
         }

         case cmds.actions.equipment: {
            this.equipment_point = player.position;
            break;
         }

         case cmds.actions.garage: {
            this.garage_point = player.position;
            break;
         }
      }

      await this.save();
      this.points();
   }
   

   async leave (player: PlayerMp) {
      player.character.setFaction(player, none, none);

      if (this.leader == player.character.id) {
         this.setLeader(none);
         player.notification(lang.uLeaveFactionLeaderPosition + checkForDot(this.name), notifications.type.ERROR, notifications.time.MED);
      } else { 
         player.notification(lang.uLeavedFaction + checkForDot(this.name), notifications.type.ERROR, notifications.time.MED);
      }

      await player.character.save();
      this.points(player);
   }

   async setLeader (leader: number) {
      this.leader = leader;
      await this.save();
   }

   async makeLeader (player: PlayerMp, target: PlayerMp) {
      target.character.setFaction(target, this.id);
      this.leader = target.character.id;

      target.notification(lang.uAreNowLeaderOf + this.name + lang.fromAdmin + player.name + ' (' + player.account.username + ').', notifications.type.INFO, notifications.time.MED);

      player.notification(lang.uSetLeaderOf + this.name + ' ' + target.name, notifications.type.SUCCESS, notifications.time.MED);
      // LOGS: setted leader

      await this.save();
      this.points(player);
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
      this.points(player);
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
         faction: this,
         async respond (_target: PlayerMp, respond: boolean) {
            const result: string = respond ? lang.accepted : lang.declined;
            
            if (respond) {
               target.character.setFaction(target, this.faction.id);

               this.faction.points(_target);
               
               await _target.character.save();
            } else { 

            }
            
            if (this.offerer) {
               this.offerer.notification(_target.name + result + lang.yourFactionInvite, notifications.type.INFO, notifications.time.MED);
            }
            
            this.offerer.notification(respond ? lang.uAcceptedFactionInvite : lang.uDeclinedFactionInvite, notifications.type.INFO, notifications.time.MED);

            _target.character.setOffer(player, null);
         }
      }

      target.character.setOffer(target, offer);
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

   points (player?: PlayerMp) {
      let factionPoints: [string, Vector3Mp][] = [];
               
      if (this?.equipment_point) {
         factionPoints.push( [formatCommand(cmds.names.FACTION_EQUIPMENT), this.equipment_point] )
      }

      if (this?.garage_point) {
         factionPoints.push( [formatCommand(cmds.names.FACTION_GARAGE) + ' ' + formatCommand(cmds.names.FACTION_GOV_REPAIR) + ' ' + formatCommand(cmds.names.FACTION_LIVERY), this.garage_point] );
      }

      if (player) {
         if (player.character.faction == none) {
            player.call('CLIENT::FACTION:POINTS', [null]);
         } else {
            factions.findOne( { where: { id: player.character.id } } ).then(faction => {
   
               player.call('CLIENT::FACTION:POINTS', [factionPoints]);
            });
         }
      } else {
         const onlineMembers = mp.players.toArray().filter(target => target.character.faction == this.id);

         onlineMembers.forEach(member => { 
            member.call('CLIENT::FACTION:POINTS', [factionPoints]);
         })
      }
   }

   static info (player: PlayerMp) {
      return factions.findOne( { where: { id: player.character.faction }, include: [factionsRanks] } ).then(async faction => {
         const members = await Characters.findAll( { where: { faction: player.character.faction } } );
         return [ faction, members ];
      })
   }
   
   isFactionVehicle (vehicle: VehicleMp) {
      if (!vehicle.instance.faction) { 
         return false;
      }

      return vehicle.instance.faction.id == this.id;
   }

   equipment (player: PlayerMp) {

      player.call('CLIENT::FACTION:EQUIPMENT', [this.name]);
   }

   garage (player: PlayerMp, action: string) {
      if (player.dist(this.garage_point) > 3) {
         player.notification(lang.notOnPosition, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      switch (action) {
         case cmds.actions.take: {
            player.call('CLIENT::FACTION:GARAGE', [this.name]);
            break;
         }

         case cmds.actions.return: {

            break;
         }
      }
   }

   repairVehicle (player: PlayerMp) {
      if (player.vehicle.dist(this.garage_point) > 3) {
         player.notification(lang.notOnPosition, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (!this.isFactionVehicle(player.vehicle)) {
         player.notification(lang.thisVehicleNotPartOfFaction, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      this.decrement('budget', { by: EconomyConfig.prices.GOV_REPAIR });
      
      player.vehicle.repair();
      
      player.notification(lang.uGovRepairVehicle, notifications.type.INFO, notifications.time.MED);
      // logs...
   }

   livery (player: PlayerMp, livery: number) {
      if (!this.isFactionVehicle(player.vehicle)) {
         player.notification(lang.thisVehicleNotPartOfFaction, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (player.vehicle.dist(this.garage_point) > 3) {
         player.notification(lang.notOnPosition, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      player.vehicle.livery = livery;
   }
}


const kickMember = (player: PlayerMp, targetCharacterID: number) => {
   return factions.findOne( { where: { id: player.character.faction } } ).then(async faction => {
      if (!faction) {
         return;
      }

      const isOnline = mp.players.toArray().find(target => target.character.id == targetCharacterID);

      if (isOnline) {
         faction.kick(player, isOnline);
      } else {
         const targetCharacter = await Characters.findOne( { where: { id: targetCharacterID } } );

         if (!targetCharacter) {
            return;
         }

         targetCharacter.faction = none;
         targetCharacter.rank = none
         await targetCharacter.save();

         player.notification(lang.uKickedFromFaction + targetCharacter.name + lang.fromFaction, notifications.type.SUCCESS, notifications.time.MED);
      }

      return true;
   });
}


const updateMemberRank = (player: PlayerMp, targetCharacterID: number, rankName: string) => {
   return factions.findOne( { where: { id: player.character.faction } } ).then(faction => {
      if (!faction) {
         return;
      }

      const isOnline = mp.players.toArray().find(target => target.character.id == targetCharacterID);

      if (isOnline) {
         faction.rank(player, isOnline, rankName);
      } else { 

      }
   })
};


mp.events.addProc('SERVER::FACTION:INFO', factions.info);
mp.events.addProc('SERVER::FACTION:KICK_MEMBER', kickMember);
mp.events.addProc('SERVER::FACTION:RANKUP_MEMBER', updateMemberRank);