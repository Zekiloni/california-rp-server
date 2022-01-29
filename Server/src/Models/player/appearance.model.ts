
import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, AllowNull, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { characters } from '@models';
import { beardStyle, hairStyle } from '@interfaces';
import { playerModels } from '@shared';


@Table
export class apppearances extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @ForeignKey(() => characters)
   @Column
   character_id: number

   @BelongsTo(() => characters)
   character: characters

   @AllowNull(false)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('face_features')); 
         }
      }
   )    
   face_features: number[];

   @AllowNull(false)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('blend_data')); 
         }
      }
   )    
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

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;
   
   apply (player: PlayerMp, gender: number) {
      console.log(this)
      const genders = [ mp.joaat(playerModels.MALE), mp.joaat(playerModels.FEMALE) ];
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
