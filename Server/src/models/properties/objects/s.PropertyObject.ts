import { 
   Model, PrimaryKey, Column, AutoIncrement,
   AllowNull, DataType, CreatedAt, UpdatedAt,
   Default, AfterSync 
} from 'sequelize-typescript';

import { cmds } from '@constants';
import { Properties, Logs } from '@models';


export class PropertyObjects extends Model {
   static gameObjects = new Map<number, ObjectMp>();

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

   get gameObject ()  {
      return PropertyObjects.gameObjects.get(this.id)!;
   }

   set gameObject (object: ObjectMp) {
      PropertyObjects.gameObjects.set(this.id, object);
   }
   
   @AfterSync
   static loading () {
      PropertyObjects.findAll().then(objects => Logs.info(objects.length + ' builder objects loaded !'));
   }

   static async createNew (player: PlayerMp, model: string, position: Vector3Mp, rotation: Vector3Mp, name?: string) {
      if (!player.character.inside) {
         return;
      }
   
      // TODO: check player money and price of object
   
      const instance = player.character.inside instanceof Properties ? cmds.actions.house : cmds.actions.busines;
   
      return await PropertyObjects.create( 
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

   static updateObject (player: PlayerMp, databaseID: number, position: Vector3Mp, rotation: Vector3Mp, name?: string) {
      PropertyObjects.findOne( { where: { id: databaseID } } ).then(async object => { 
         if (!object) {
            return;
         }
   
         object!.position = position;
         object!.rotation = rotation;
   
         await object.save();
      })
   }

   static delete (player: PlayerMp, databaseID: number) {
      PropertyObjects.findOne( { where: { id: databaseID } } ).then(async object => await object?.destroy());
   }
}



mp.events.add('SERVER::BUILDER:OBJECT_DELETE', PropertyObjects.delete);
mp.events.add('SERVER::BUILDER:OBJECT_SAVE', PropertyObjects.updateObject);
mp.events.addProc('SERVER::BUILDER:OBJECT_CREATE', PropertyObjects.createNew);
