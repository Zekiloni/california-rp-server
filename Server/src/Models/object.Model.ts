import { Model, PrimaryKey, Column, AutoIncrement, AllowNull, DataType, CreatedAt, UpdatedAt, Default } from 'sequelize-typescript';

export class bObject extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @AllowNull(false)
   @Column
   model: number

   @Column({ 
      type: DataType.JSON,
      get () { 
         return this.getDataValue('position') ? JSON.parse(this.getDataValue('position')) : null;
      }
   })
   position: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { 
         return this.getDataValue('rotation') ? JSON.parse(this.getDataValue('rotation')) : null;
      }
   })
   rotation: Vector3Mp
  
   @Default(null)
   @Column
   last_edit_by: number

   @CreatedAt
   created_at: Date

   @UpdatedAt
   updated_at: Date
}