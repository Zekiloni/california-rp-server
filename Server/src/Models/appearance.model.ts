
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
   @Column(DataType.JSON)
   face_features: number[];

   @AllowNull(false)
   @Column(DataType.JSON)
   blend_data: number[];

   @AllowNull(false)
   @Column(DataType.JSON)
   hair: number[];

   @AllowNull(false)
   @Column(DataType.JSON)
   beard: number[];

   @AllowNull(false)
   @Column
   eyes: number;

   @AllowNull(false)
   @Column(DataType.JSON)
   overlays: number[];

   @AllowNull(true)
   @Column(DataType.JSON)
   overlays_colors: number[];

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   Apply (Player: PlayerMp, Gender: number) {

      const genders = [ mp.joaat(Peds.Models.MALE), mp.joaat(Peds.Models.FEMALE) ];
      Player.model = genders[Gender];
   
      Player.setHeadBlend(
         this.blend_data[0], 
         this.blend_data[1], 0,
         this.blend_data[2],
         this.blend_data[3], 0,
         this.blend_data[4],
         this.blend_data[5], 0
      );
   
      Player.eyeColor = this.eyes;   
      Player.setClothes(2, this.hair[0], 0, 2);
      Player.setHairColor(
         this.hair[1], this.hair[2]
      );
   
      for (let i = 0; i < 20; i ++) { 
         Player.setFaceFeature(i, this.face_features[i]);
      }
   };
}
