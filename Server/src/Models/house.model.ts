import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';
import { Messages } from '../globals/constants';
import { globalDimension, houseData, NotifyType } from '../globals/enums';
import { propertyPoint } from '../globals/interfaces';

@Table
export default class Houses extends Model {

   static objects = new Map<number, propertyPoint>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Default(0)
   @Column
   owner: number;

   @Default(houseData.Type.SMALL_HOUSE)
   @Column
   type: houseData.Type;

   @AllowNull(false)
   @Column
   price: number;

   @AllowNull(false)
   @Default(false)
   @Column
   locked: boolean;

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('position')); },
   })       
   position: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('interior_position')); },
   })
   interior_position: Vector3Mp

   @AllowNull(false)
   @Default(globalDimension)
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

   @Default([])
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('tenants')); },
   })
   tenants: number[];

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object (): propertyPoint { 
      return Houses.objects.get(this.id)!;
   }

   set object (object: propertyPoint) { 
      Houses.objects.set(this.id, object);
   }

   @AfterCreate
   static creating (house: Houses) { house.refresh(); }

   @AfterDestroy
   static async destroying (house: Houses, options: any) {
      if (house.object) {
         house.object.colshape.destroy();
         house.object.blip.destroy();
         house.object.marker.destroy();
         Houses.objects.delete(house.id);
      }
   }

   async refresh () {

      const { position, dimension, owner } = this;

      if (this.object) {
         this.object.blip.color = owner == 0 ? 49 : 52;
      } else {
         this.object = {
            colshape: mp.colshapes.newSphere(position.x, position.y, position.z, 1.8, dimension),
            blip: mp.blips.new(40, new mp.Vector3(position.x, position.y, position.z), { dimension: dimension, name: 'House', color: 59, shortRange: true, scale: 0.75, drawDistance: 25 }),
            marker: mp.markers.new(27, new mp.Vector3(position.x, position.y, position.z - 0.98), 1.8, {
               color: [255, 255, 255, 255], 
               rotation: new mp.Vector3(0, 0, 90),
               visible: true,
               dimension: dimension
            })
         };
      }

      this.object.colshape.onPlayerEnter = (player) => {

      };
   }

   async buy (player: PlayerMp) {
      if (this.owner != 0) return player.Notification(Messages.HOUSE_ALREADY_OWNER, NotifyType.ERROR, 5);

      const character = player.Character;
      const { houses } = await character.properties;

      if (houses.length == character.max_houses) return; // PORUKA: Imate maksimalno kuca;
      if (this.price > character.money) return player.Notification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 5);

      character.giveMoney(player, -this.price);
      player.Notification(Messages.SUCCCESSFULLY_BUYED_HOUSE, NotifyType.SUCCESS, 7);

      this.owner = character.id;

      await this.save();
   }

   async lock (player: PlayerMp) {

      if (this.owner == player.Character.id || this.tenants.includes(player.Character.id)) { 
         this.locked = !this.locked;

         await this.save();
      } else { 
         // player.Notification(Messages.YOU_DONT_HAVE_HOUSE_KEYS, NotifyType.ERROR, 5);
      }

   }

   // async Create(Player: PlayerMp, HouseType: number, Price: number) {
   //    if (HouseTypes[HouseType] == undefined) return Player.Notification(Messages.TYPES_ARE_IN_RANGE + '0 - ' + HouseTypes.length + '.', NotifyType.ERROR, 5);

   //    this.Type = HouseType;
   //    const DefaultType = HouseTypes[HouseType];
   //    const Position = Player.position;

   //    Houses.create({
   //       Type: DefaultType.id,
   //       Price: Price,
   //       Position: Position,
   //       Dimension: Player.dimension,
   //       Interior_Position: DefaultType.Position,
   //       IPL: DefaultType.IPL ? DefaultType.IPL : null,
   //    });
   // }

   static async getNearest (player: PlayerMp) {
      const houses = await Houses.findAll();
      for (const house of houses) {
         const position = new mp.Vector3(house.position.x, house.position.y, house.position.z);
         if (player.dist(position) < 2.5) return house;
      }
  };

}

