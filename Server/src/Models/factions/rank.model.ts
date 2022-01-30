import { Table, Column, PrimaryKey, AutoIncrement, Model, Unique, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { characters, factions } from '@models';
import { factionPermissions } from '@enums';
import { none } from '@constants';


@Table
export class ranks extends Model {

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
         get () { return JSON.parse(this.getDataValue('spawn_Point')); }
      }
   )   
   permissions: factionPermissions[]

   async edit (player: PlayerMp, name: string, permissions: factionPermissions[]) {
      this.name = name;
      this.permissions = permissions;
      await this.save();
   }

   delete (player: PlayerMp) {
      ranks.findOne( { where: { id: player.character.faction_rank } } ).then(rank => {
         if (!rank?.permissions.includes(factionPermissions.UPDATE_RANK)) {
            // PORUKA: Nemas permisiju
            return;
         }
      
         characters.findAll().then(characters => {
            const members = characters.filter(character => character.faction_rank == this.id);
            members.forEach(async member => { 
               member.faction_rank = none;
               await member.save();
            })
         });

         this.destroy();
      })
   }
}