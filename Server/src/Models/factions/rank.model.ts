import { Table, Column, PrimaryKey, AutoIncrement, Model, Unique, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { characters, factions } from '@models';
import { FactionsPermissions } from '@enums';
import { none } from '@constants';


@Table
export class factionsRanks extends Model {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @ForeignKey(() => factions)
   @Column
   faction_id: number

   @BelongsTo(() => factions)
   faction: factions

   @Unique(true)
   @Column
   name: string

   @Column
   description: string

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('permissions')) ? JSON.parse(this.getDataValue('permissions')) : []; }
      }
   )   
   permissions: FactionsPermissions[]

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
      
         characters.findAll().then(characters => {
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