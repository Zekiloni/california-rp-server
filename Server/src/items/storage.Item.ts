import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';



@Table({
   createdAt: false, updatedAt: false, tableName: 'character_items'
})
export class Storages extends Model {
   @ForeignKey(() => )
   @Column
   bookId: number
 
   @ForeignKey(() => Author)
   @Column
   authorId: number
}