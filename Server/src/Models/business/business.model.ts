import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, DataType, AfterCreate, AllowNull, ForeignKey, AfterSync, AfterDestroy, HasMany } from 'sequelize-typescript';

import { interactionPoint } from '@interfaces';
import { gDimension, lang, none, offerExpire } from '@constants';
import { characters, logs, products } from '@models';
import { businessConfig } from '@configs';
import { notifications, offerStatus, offerTypes } from '@enums';
import { dollars } from '@shared';


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

   @HasMany(() => products)
   products: products[]

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
   static async creating (business: business) { 
      business.sprite = businessConfig.sprites[business.type];
      business.sprite_color = businessConfig.blipColors[business.type];
      await business.save();

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
         const { name, position, sprite, dimension, sprite_color, type } = this;

         this.object = {
            blip: mp.blips.new(sprite!, new mp.Vector3(position.x, position.y, position.z), 
               { 
                  dimension: dimension,
                  name: name,
                  color: sprite_color!,
                  shortRange: true,
                  scale: 0.85
               }
            ),
            
            colshape: mp.colshapes.newSphere(position.x, position.y, position.z, 1.8, dimension)
         }
      }
   }

   async lock (player: PlayerMp, locked: boolean) {
      await this.update( { locked: locked } );
      player.sendNotification(locked ? lang.businessLocked : lang.businessUnlocked, notifications.type.INFO, notifications.time.MED);
   }

   async edit (player: PlayerMp, property: string, value: string) {
      switch (property) {
         case 'price': 
            this.price = Number(value); break;
         case 'name':
            this.name = value; break;
         case 'sprite':
            this.sprite = Number(value); break;
         case 'spriteColor':
            this.sprite_color = Number(value); break;
         case 'owner':
            this.owner = Number(value); break;
         default: 
            return;
      }

      await this.save();
      this.refresh();
   }

   async buy (player: PlayerMp) {
      const character = player.character;

      if (this.owner != none) {
         player.sendNotification(lang.busiensAlreadyOwner, notifications.type.ERROR, notifications.time.MED);
         return;
      }; 

      if (this.price > character.money) {
         player.sendNotification(lang.notEnoughMoney, notifications.type.ERROR, notifications.time.MED);
         return;
      };

      this.owner = character.id;
      character.giveMoney(player, -this.price);

      player.sendNotification(lang.successfullyBuyedBusiness + this.name + lang.for + dollars(this.price) + '.', notifications.type.SUCCESS, notifications.time.LONG);
      await this.save();
   };
   
   async sell (player: PlayerMp, sellPrice: string, targetSearch: string | number) {

      const price = Number(sellPrice);

      if (targetSearch != -1) {
         
         const target = mp.players.find(targetSearch);

         if (!target) {
            player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         const { character: character } = player;
         const { character: tCharacter } = target!;

         if (player.dist(target.position) > 2) {
            player.sendNotification(lang.playerNotNear, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         if (tCharacter.money < price) {
            player.sendNotification(lang.playerDoesntHaveMoney, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         const offer = {
            type: offerTypes.BUSINESS_SELL,
            offeredBy: player,
            id: this.id,
            status: offerStatus.NONE,
            expire: setTimeout(() => {
               const index = tCharacter.offers.indexOf(offer);
               tCharacter.offers.splice(index, 1);
            }, offerExpire)
         };
         
         /// send notify to both

         tCharacter.offers.push(offer);
         
      } else { 
         const cPrice = (this.price / 100) * 65;
         
         this.owner = none;
         player.character.giveMoney(player, cPrice);
         player.sendNotification(lang.succesfullySoldBizToCountry, notifications.type.INFO, notifications.time.LONG);

         await this.save();
      }
   };

}

