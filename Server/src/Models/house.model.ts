import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';
import { globalDimension } from '../globals/enums';
import { propertyPoint } from '../globals/interfaces';

@Table
export default class House extends Model {

   static objects = new Map<number, propertyPoint>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @AllowNull(false)
   @Default(0)
   @Column
   owner: number;

   @AllowNull(false)
   @Column
   type: number;

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

   @AllowNull(false)
   @Column
   ipl: string;

   @AllowNull(false)
   @Default(false)
   @Column
   rentable: boolean;

   @AllowNull(false)
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

   object: any;

   @AfterCreate
   static async AfterCreating(HouseObj: House) { await HouseObj.Refresh(); } // ToDo Namestiti da seta IPL i Interior_Position prema Type

   @AfterDestroy
   static async AfterDestroying(HouseObj: House, Options: any) {
      if (HouseObj.GameObject) {
         HouseObj.GameObject.colshape.destroy();
         HouseObj.GameObject.blip.destroy();
         HouseObj.GameObject.marker.destroy();
      }
   }

   async refresh () {
      if (this.GameObject == null) {
         const GameObjects = {
            colshape: mp.colshapes.newSphere(this.Position.x, this.Position.y, this.Position.z, 1.8, this.Dimension),
            blip: mp.blips.new(40, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: 'House', color: 59, shortRange: true, scale: 0.75, drawDistance: 25 }),
            marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
               color: [255, 255, 255, 255],  // Globals.MarkerColors.Houses
               rotation: new mp.Vector3(0, 0, 90),
               visible: true,
               dimension: this.Dimension
            })
         };


         GameObjects.colshape.OnPlayerEnter = (player) => {

            const white = Colors.whitesmoke;

            player.SendMessage('[House] !{' + white + '} Kucaraaa ', Colors.property);
         };

         this.GameObject = GameObjects;
      } else {
         const BlipColor = this.Owner == 0 ? 49 : 52;
         this.GameObject.blip.color = BlipColor;
      }
   }

   async Buy(Player: PlayerMp) {
      if (this.Owner != 0) return Player.Notification(Messages.HOUSE_ALREADY_OWNER, NotifyType.ERROR, 5);

      const Character = Player.Character;
      const Houses = await Player.Properties().Houses;


      if (Houses.length == Character.Max_Houses) return; // PORUKA: Imate maksimalno kuca;
      if (this.Price > Character.Money) return Player.Notification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 5);

      Character.GiveMoney(Player, -this.Price);
      Player.Notification(Messages.SUCCCESSFULLY_BUYED_HOUSE, NotifyType.SUCCESS, 7);

      this.Owner = Character.id;

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

   async Create(Player: PlayerMp, HouseType: number, Price: number) {
      if (HouseTypes[HouseType] == undefined) return Player.Notification(Messages.TYPES_ARE_IN_RANGE + '0 - ' + HouseTypes.length + '.', NotifyType.ERROR, 5);

      this.Type = HouseType;
      const DefaultType = HouseTypes[HouseType];
      const Position = Player.position;

      House.create({
         Type: DefaultType.id,
         Price: Price,
         Position: Position,
         Dimension: Player.dimension,
         Interior_Position: DefaultType.Position,
         IPL: DefaultType.IPL ? DefaultType.IPL : null,
      });
   }

   static async getNearest (player: PlayerMp) {
      const houses = await House.findAll();
      for (const house of houses) {
         const position = new mp.Vector3(house.position.x, house.position.y, house.position.z);
         if (player.dist(position) < 2.5) return house;
      }
  };

}

