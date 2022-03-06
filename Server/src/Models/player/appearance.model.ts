
import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, AllowNull, DataType, BelongsTo, ForeignKey, Max, Unique } from 'sequelize-typescript';
import { characters } from '@models';
import { playerModels } from '@shared';


@Table
export class appearances extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column(DataType.INTEGER)
   id: number

   @Unique(true)
   @ForeignKey(() => characters)
   @Column(DataType.INTEGER( { length: 11 } ))
   character_id: number

   @BelongsTo(() => characters)
   character: characters

   @Column(DataType.INTEGER)
   shape_First: number

   @Column(DataType.INTEGER)
   shape_Second: number

   @Column(DataType.INTEGER)
   skin_First: number

   @Column(DataType.INTEGER)
   skin_Second: number

   @Column(DataType.FLOAT)
   shape_Mix: number

   @Column(DataType.FLOAT)
   skin_Mix: number

   @Column(DataType.INTEGER)
   hair_Style: number

   @Column(DataType.INTEGER)
   hair_Color: number

   @Column(DataType.INTEGER)
   hair_Highlight: number

   @Column(DataType.INTEGER)
   beard_Style: number

   @Column(DataType.INTEGER)
   beard_Color: number

   @AllowNull(false)
   @Column(DataType.INTEGER)
   eyes: number;

   @AllowNull(false)
   @Column(
      {
         type: DataType.JSON,
         set (face: number[]) {
            this.setDataValue('face_Features', JSON.stringify(face))
         },
         get () { 
            return JSON.parse(this.getDataValue('face_Features')); 
         }
      }
   )    
   face_Features: number[];

   @AllowNull(false)
   @Column(
      {
         type: DataType.JSON,
         set (face: number[]) {
            this.setDataValue('overlays', JSON.stringify(face))
         },
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
      const genders = [ 
         playerModels.MALE,
         playerModels.FEMALE
      ];

      console.log('gender is ' + gender)
      player.model = mp.joaat(genders[gender]);
      console.log(genders[gender])

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
         player.setFaceFeature(i, this.face_Features[i]);
      }
   };
}
