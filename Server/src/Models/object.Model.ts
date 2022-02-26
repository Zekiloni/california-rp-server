import { cmds } from '@constants';
import { Model, PrimaryKey, Column, AutoIncrement, AllowNull, DataType, CreatedAt, UpdatedAt, Default } from 'sequelize-typescript';
import { houses } from './house.model';

export class objects extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default('none')
   @Column
   name: string

   @AllowNull(false)
   @Column
   model: string

   @Column
   property_id: number
 
   @Column(DataType.STRING)
   property: string

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



const createObject = async (player: PlayerMp, model: string, position: Vector3Mp, rotation: Vector3Mp, name?: string) => { 
   if (!player.character.inside) {
      return;
   }

   // TODO: check player money and price of object

   const instance = player.character.inside instanceof houses ? cmds.actions.house : cmds.actions.busines;

   return await objects.create( 
      {
         model: model, 
         position: position, 
         rotation: rotation, 
         name: name ? name : 'None', 
         property: instance, 
         property_id: player.character.inside.id,
         last_edit_by: player.character.id
      }
   );
}


const saveObject = (player: PlayerMp, databaseID: number, position: Vector3Mp, rotation: Vector3Mp, name?: string) => { 
   objects.findOne( { where: { id: databaseID } } ).then(async object => { 
      if (!object) {
         return;
      }

      object!.position = position;
      object!.rotation = rotation;

      await object.save();
   })
}


const deleteObject = (player: PlayerMp, databaseID: number) => { 
   objects.findOne( { where: { id: databaseID } } ).then(async object => await object?.destroy());
   // logs...
}

mp.events.add('SERVER::BUILDER:OBJECT_DELETE', deleteObject);
mp.events.add('SERVER::BUILDER:OBJECT_SAVE', saveObject);
mp.events.addProc('SERVER::BUILDER:OBJECT_CREATE', createObject);
