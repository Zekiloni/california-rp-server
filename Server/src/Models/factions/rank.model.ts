import { Table, Column, PrimaryKey, AutoIncrement, Model, Unique, ForeignKey, BelongsTo, DataType, CreatedAt, UpdatedAt, Max, Min } from 'sequelize-typescript';
import { Characters, factions } from '@models';
import { FactionsPermissions, notifications } from '@enums';
import { Lang, none } from '@constants';


@Table({
   tableName: 'factions_ranks'
})
export class factionsRanks extends Model {

   @PrimaryKey
   @AutoIncrement
   @Column(DataType.INTEGER)
   id: number

   @ForeignKey(() => factions)
   @Column
   faction_id: number

   @BelongsTo(() => factions)
   faction: factions

   @Unique(true)
   @Column(DataType.STRING)
   name: string

   @Column(DataType.TEXT)
   description: string

   @Min(0)
   @Max(50)
   @Column(DataType.INTEGER)
   salary: number

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('permissions')) ? JSON.parse(this.getDataValue('permissions')) : []; }
      }
   )   
   permissions: FactionsPermissions[]

   @CreatedAt
   created_at: Date

   @UpdatedAt
   updated_at: Date

   async edit (player: PlayerMp, name: string, permissions: FactionsPermissions[]) {
      this.name = name;
      this.permissions = permissions;
      await this.save();
   }

   delete (player: PlayerMp) {
      factionsRanks.findOne( { where: { id: player.character.rank } } ).then(rank => {
         if (!rank?.permissions.includes(FactionsPermissions.UPDATE_RANK)) {
            // PORUKA: Nemas permisiju
            return;
         }
      
         Characters.findAll().then(characters => {
            const members = characters.filter(character => character.rank == this.id);
            members.forEach(async member => { 
               member.rank = none;
               await member.save();
            })
         });

         this.destroy();
      })
   }
}


const deleteRank = (player: PlayerMp, rankID: number) => {
   return factionsRanks.findOne( { where: { id: rankID } } ).then(rank => {
      if (!rank) {
         return;
      }

      rank.destroy();
      player.notification(Lang.factionRankDelete, notifications.type.SUCCESS, notifications.time.MED);
      return true;
   })
}


const updateRank = (player: PlayerMp, rankID: number, name: string, description: string, salary: number) => {
   return factionsRanks.findOne( { where: { id: rankID }}).then(async rank => {
      if (!rank) {
         return;
      }

      if (name.length < 3) {
         player.notification(Lang.rankNameCannotBeLessThenTreeSamirGey, notifications.type.ERROR, notifications.time.MED);
         return;
      }  

      rank.name = name;
      rank.description = description;
      rank.salary = salary;

      player.notification(Lang.rankSuccessfullyUpdated, notifications.type.ERROR, notifications.time.MED);

      await rank.save();
      return true;
   })
};


mp.events.addProc('SERVER::RANK:DELETE', deleteRank);
mp.events.addProc('SERVER::RANK:UPDATE', updateRank);