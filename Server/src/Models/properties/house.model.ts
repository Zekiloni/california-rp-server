
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, AllowNull, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';
import { interactionPoint } from '@interfaces';
import { notifications } from '@enums';
import { gDimension, lang } from '@constants';
import { houseConfig } from '@configs/house.config';


@Table
export class houses extends Model {

   static objects = new Map<number, interactionPoint>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Default(0)
   @Column
   owner: number;

   @Default(houseConfig.type.MEDIUM_GROUND_HOUSE)
   @Column
   type: houseConfig.type;

   @AllowNull(false)
   @Column
   price: number;

   @Default(false)
   @Column
   locked: boolean;

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
         get () { return JSON.parse(this.getDataValue('interior_position')); }
      }
   )
   interior_position: Vector3Mp

   @Default(gDimension)
   @Column
   dimension: number;

   @Default(null)
   @Column
   ipl: string;

   @Default(false)
   @Column
   rentable: boolean;

   @Default(0)
   @Column
   rent: number;

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('tenants')); }
      }
   )
   tenants: number[];

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object (): interactionPoint { 
      return houses.objects.get(this.id)!;
   }

   set object (object: interactionPoint) { 
      houses.objects.set(this.id, object);
   }

   @AfterCreate
   static async creating (house: houses) {
      house.refresh();
   }

   @AfterDestroy
   static async destroying (house: houses, options: any) {
      if (house.object) {
         house.object.colshape!.destroy();
         house.object.blip!.destroy();
         house.object.marker!.destroy();
         houses.objects.delete(house.id);
      }
   }

   static async new (player: PlayerMp, type: number, price: number) {
         houses.create({
            type: type,
            price: price,
            position: player.position,
            interior_position: player.position,
            Dimension: player.dimension,
            tenants: []
         });
   }

   refresh () {
      const { position, dimension, owner } = this;

      if (this.object) {
         this.object.blip!.color = owner == 0 ? 2 : 79;
      } else {
         this.object = {
            colshape: mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, dimension),
            blip: mp.blips.new(40, new mp.Vector3(position.x, position.y, position.z), { dimension: dimension, name: 'House', color: owner == 0 ? 2 : 79, shortRange: true, scale: 0.75, drawDistance: 25 }),
            marker: mp.markers.new(30, new mp.Vector3(position.x, position.y, position.z - 0.35), 0.75, {
               color: houseConfig.markerColor, 
               rotation: new mp.Vector3(0, 0, 0),
               visible: true,
               dimension: dimension
            })
         };

         this.object.colshape!.onPlayerEnter = (player: PlayerMp) => {
            if (player.vehicle) return;
            player.call('CLIENT::HOUSE:INFO', [this]);
         }

         this.object.colshape!.onPlayerLeave = (player: PlayerMp) => { 
            player.call('CLIENT::HOUSE:INFO', [false]);
         }
      }
   }

   async buy (player: PlayerMp) {
      if (this.owner != 0) return player.sendNotification(lang.houseAlreadyOwner, notifications.type.ERROR, 5);

      const character = player.character;

      if (character.houses.length == character.max_houses) {
         player.sendNotification(lang.youHaveMaximumHouses, notifications.type.ERROR, 5);
         return;
      }

      if (this.price > character.money) {
         player.sendNotification(lang.notEnoughMoney, notifications.type.ERROR, 5);
         return;
      } 

      character.giveMoney(player, -this.price);
      player.sendNotification(lang.successfullyBuyedHouse, notifications.type.SUCCESS, 7);

      this.owner = character.id;

      await this.save();
   }

   async lock (player: PlayerMp) {
      if (this.owner == player.character.id || this.tenants.includes(player.character.id)) { 
         this.locked = !this.locked;
         await this.save();
      } else { 
         player.sendNotification(lang.youDontHaveHouseKeys, notifications.type.ERROR, 5);
      }
   }

   static async getNearest (player: PlayerMp): Promise<houses | void> {
      return houses.findAll().then(houses => {
         houses.forEach(house => { 
            if (player.dist(house.position) < 2.5 && player.dimension == house.dimension) {
               return house;
            }
         })
      })

   };

}

