import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';

@Table
export default class Appearances extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   ID: number;

   @Unique(true)
   @AllowNull(false)
   @Column
   Character: number;

   @AllowNull(false)
   @Column(DataType.JSON)
   Face_Features: number[];

   @AllowNull(false)
   @Column(DataType.JSON)
   Blend_Data: number[];

   @AllowNull(false)
   @Column(DataType.JSON)
   Hair: number[];

   @AllowNull(false)
   @Column
   Beard: number[];

   @AllowNull(false)
   @Column
   Eyes: number;

   @AllowNull(false)
   @Column(DataType.JSON)
   Overlays: number[];

   @AllowNull(true)
   @Column(DataType.JSON)
   Overlays_Colors: number[];

   @CreatedAt
   Created_At: Date;

   @UpdatedAt
   Updated_At: Date;

   Apply (Player: PlayerMp, Gender: number) {

      const Genders = [ mp.joaat('mp_m_freemode_01'), mp.joaat('mp_f_freemode_01') ];
      Player.model = Genders[Gender];
   
      Player.setHeadBlend(
         this.Blend_Data[0], 
         this.Blend_Data[1], 0,
         this.Blend_Data[2],
         this.Blend_Data[3], 0,
         this.Blend_Data[4],
         this.Blend_Data[5], 0
      );
   
      Player.eyeColor = this.Eyes;   
      Player.setClothes(2, this.Hair[0], 0, 2);
      Player.setHairColor(
         this.Hair[1], this.Hair[2]
      );
   
      for (let i = 0; i < 20; i ++) { 
         Player.setFaceFeature(i, this.Face_Features[i]);
      }
   };
}

(async () => {
   // await Appearances.sync();
})();


