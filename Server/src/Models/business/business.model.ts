import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, DataType, AfterCreate, AllowNull, ForeignKey, AfterSync, AfterDestroy } from 'sequelize-typescript';

import { interactionPoint } from '@interfaces';
import { gDimension } from '@constants';
import { characters, logs } from '@models';
import { businessConfig } from '@configs';


@Table
export class business extends Model {

   static objects = new Map<number, interactionPoint>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column
   name: string

   @Default(businessConfig.type.MARKET)
   @Column
   type: businessConfig.type

   @Default(false)
   @Column(DataType.BOOLEAN)
   locked: boolean

   @Default(true)
   @Column(DataType.BOOLEAN)
   walk_in: boolean

   @AllowNull(false)
   @Column(DataType.INTEGER)
   price: number

   @ForeignKey(() => characters)
   @Default(null)
   @Column
   owner: number

   @Default(0)
   @Column
   budget: number

   @Default(gDimension)
   @Column(DataType.INTEGER)
   dimension: number

   @Column
   ipl: string

   @Column(DataType.INTEGER)
   sprite: number

   @Column(DataType.INTEGER)
   sprite_color: number

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('position')); }
      }
   )       
   position: Vector3Mp

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('vehicle_point')); }
      }
   )
   vehicle_point: Vector3Mp

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('interior_position')); }
      }
   )
   interior_position: Vector3Mp

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object (): interactionPoint { 
      return business.objects.get(this.id)!;
   }

   set object (object: interactionPoint) { 
      business.objects.set(this.id, object);
   }


   @AfterSync
   static loading () {
      business.findAll().then(businesses => {
         businesses.forEach(business => {
            business.refresh();
         });
         
         logs.info(businesses.length + ' business loaded !');
      });
   }

   @AfterCreate
   static creating (business: business) { 
      business.refresh();
   }


   @AfterDestroy
   static destroying (business: business) {
      if (business.object) {
         business.object.blip?.destroy();
         business.object.colshape?.destroy();
         business.object.marker?.destroy();
         this.objects.delete(business.id);
      }
   }
   
   static async getNearestGasStation (player: PlayerMp)  {
      return business.findAll( { where: { type: businessConfig.type.GAS_STATION } } ).then(gasStations => {
         gasStations.forEach(gasStation => {
            if (player.dist(gasStation.position) < 45) {
               return gasStation;
            };
         });
      });
   };


   refresh () {
      if (this.object) { 

      } else {
         const { name, position, sprite, dimension, sprite_color } = this;

         // this.object = { 
         //    colshape: mp.colshapes.newSphere(position.x, position.y, position.z, 1.8, dimension),
         //    blip: mp.blips.new(sprite, new mp.Vector3(position.x, position.y, position.z), { dimension: dimension, name: name, color: sprite_color, shortRange: true, scale: 0.85 }),
         //    marker: mp.markers.new(27, new mp.Vector3(position.x, position.y, position.z - 0.98), 1.8, {
         //       color: businessConfig.markerColor,
         //       rotation: new mp.Vector3(0, 0, 90),
         //       visible: true,
         //       dimension: dimension
         //    })
         // }; 
      }
   }


   async buy (player: PlayerMp) {
      const character = player.character;

      if (this.owner != 0) return; // PORUKA: Neko vec poseduje ovaj biznis
      if (this.price > character.money) return; // PORUKA: Nemate dovoljno novca

      this.owner = character.id;
      character.giveMoney(player, -this.price);
      // PORUKA: Uspesno ste kupili biznis
      await this.save();
   };

   
   async sell (player: PlayerMp, target: any = 0, price = 0) {
      let Character = player.character;
      if (price == 0) price = (this.price / 100) * 65;

      Character.giveMoney(player, price);
      this.owner = target;

      if (target != 0) {
         let TargetCharacter = await target.Character();
         TargetCharacter.GiveMoney(player, -price);
         // PORUKA: targetu Uspesno ste kupiili biznis od player.name za price
      }
      // PORUKA: Prodali ste biznis
      await this.save();
   };

}

