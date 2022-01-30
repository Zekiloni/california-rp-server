
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

   @Column
   shape_First: number

   @Column
   shape_Second: number

   @Column
   skin_First: number

   @Column
   skin_Second: number

   @Column(DataType.FLOAT)
   shape_Mix: number

   @Column(DataType.FLOAT)
   skin_Mix: number


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

   @Column
   hair_Style: number

   @Column
   hair_Color: number

   @Column
   hair_Highlight: number

   @Column(DataType.NUMBER)
   beard_Style: number

   @Column(DataType.NUMBER)
   beard_Color: number

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
      const genders = [ 
         mp.joaat(playerModels.MALE),
         mp.joaat(playerModels.FEMALE)
      ];

      player.model = genders[gender];

      player.setHeadBlend(
         this.shape_First, 
         this.shape_Second, 
         0,
         this.skin_First,
         this.skin_Second, 
         0,
         this.shape_Mix,
         this.skin_Mix, 
         0
      );

      player.eyeColor = this.eyes;   
      
      player.setClothes(2, this.hair_Style, 0, 2);
      player.setHairColor(
         this.hair_Color, this.hair_Highlight
      );

      player.setHeadOverlay(1, 
         [this.beard_Style, 1.0, this.beard_Color, 0]
      );

      for (let i = 0; i < 20; i ++) { 
         player.setFaceFeature(i, this.face_features[i]);
      }
   };
}
