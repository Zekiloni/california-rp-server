
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, AllowNull, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';
import { interactionPoint } from '@interfaces';
import { houseType } from '@enums';
import { gDimension } from '@constants';


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

   @Default(houseType)
   @Column
   type: houseType;

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
               color: markerColors.HOUSES, 
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
      if (this.owner != 0) return player.sendNotification(Messages.HOUSE_ALREADY_OWNER, NotifyType.ERROR, 5);

      const character = pplayer.character;
      const { houses } = await character.properties;

      if (houses.length == character.max_houses) return; // PORUKA: Imate maksimalno kuca;
      if (this.price > character.money) return player.sendNotification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 5);

      character.giveMoney(player, -this.price);
      player.sendNotification(Messages.SUCCCESSFULLY_BUYED_HOUSE, NotifyType.SUCCESS, 7);

      this.owner = character.id;

      await this.save();
   }

   async lock (player: PlayerMp) {
      if (this.owner == pplayer.character.id || this.tenants.includes(pplayer.character.id)) { 
         this.locked = !this.locked;
         await this.save();
      } else { 
         player.sendNotification(Messages.YOU_DONT_HAVE_HOUSE_KEYS, NotifyType.ERROR, 5);
      }
   }

   // static async getNearest (player: PlayerMp) {
   //    const houses = await Houses.findAll();
   //    for (const house of houses) {
   //       const position = new mp.Vector3(house.position.x, house.position.y, house.position.z);
   //       if (player.dist(position) < 2.5) return house;
   //    }
   // };

}

