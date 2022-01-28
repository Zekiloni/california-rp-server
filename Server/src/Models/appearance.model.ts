
import { Peds } from '../globals/enums';
import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, AllowNull, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Characters from './character.model';

@Table
export default class Appearances extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   
   @ForeignKey(() => Characters)
   @Column
   character_id: number;


   @BelongsTo(() => Characters)
   character: Characters


   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('face_features')); },
   })    
   face_features: number[];


   @AllowNull(false)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('blend_data')); },
   })    
   blend_data: number[];


   @AllowNull(false)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('hair')); 
         }
      }
   )   
   hair: hairStyle;


   @AllowNull(false)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('beard')); 
         }
      }
   )   
   beard: beardStyle;


   @AllowNull(false)
   @Column(DataType.INTEGER)
   eyes: number;


   @AllowNull(false)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('overlays')); 
         },
      }
   )   
   overlays: number[];


   @AllowNull(true)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('overlays_colors')); 
         }
      }
   )   
   overlays_colors: number[];


   @CreatedAt
   created_at: Date;


   @UpdatedAt
   updated_at: Date;

   
   apply (player: PlayerMp, gender: number) {

      const genders = [ mp.joaat(Peds.Models.MALE), mp.joaat(Peds.Models.FEMALE) ];
      player.model = genders[gender];
   
      player.setHeadBlend(
         this.blend_data[0], 
         this.blend_data[1], 0,
         this.blend_data[2],
         this.blend_data[3], 0,
         this.blend_data[4],
         this.blend_data[5], 0
      );
   
      player.eyeColor = this.eyes;   
      player.setClothes(2, this.hair.style, 0, 2);
      player.setHairColor(
         this.hair.color, this.hair.highlight
      );
   
      for (let i = 0; i < 20; i ++) { 
         player.setFaceFeature(i, this.face_features[i]);
      }
   };
}
