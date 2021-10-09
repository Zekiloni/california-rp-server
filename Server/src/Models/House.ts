import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey, AfterCreate, AfterDestroy } from 'sequelize-typescript';
import HouseTypes from '../data/Houses.json';
import { Colors } from '../Global/Colors';
import { Globals } from '../Global/Globals';
import { Messages } from '../Global/Messages';
import { Main } from '../Server/Main';

@Table
export default class House extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number;

   @Column
   @AllowNull(false)
   @Default(-1)
   Owner: number;

   @Column
   @AllowNull(false)
   Type: number;

   @Column
   @AllowNull(false)
   Price: number;

   @Column
   @AllowNull(false)
   @Default(false)
   Locked: boolean;

   @Column
   @AllowNull(false)
   Position: Vector3Mp;

   @Column
   @AllowNull(false)
   @Default(0)
   Dimension: number;

   @Column
   @AllowNull(false)
   Interior_Position: Vector3Mp;

   @Column
   @AllowNull(false)
   IPL: string;

   @Column
   @AllowNull(false)
   @Default(false)
   Rentable: boolean;

   @Column
   @AllowNull(false)
   @Default(0)
   Rent: number;

   @Column
   @AllowNull(false)
   Tenants: number[];

   @Column
   @CreatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;

   GameObject: any;

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

   async Refresh() {
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
      if (this.Owner != 0) return Player.Notification(Messages.HOUSE_ALREADY_OWNER, Globals.Notification.Error, 5);

      const Character = Player.Character;
      const Houses = await Player.Properties().Houses;


      if (Houses.length == Character.Max_Houses) return; // PORUKA: Imate maksimalno kuca;
      if (this.Price > Character.Money) return Player.Notification(Messages.NOT_ENOUGH_MONEY, Globals.Notification.Error, 5);

      Character.GiveMoney(Player, -this.Price);
      Player.Notification(Messages.SUCCCESSFULLY_BUYED_HOUSE, Globals.Notification.Succes, 7);

      this.Owner = Character.id;

      await this.save();
   }

   async Lock(Player: PlayerMp) {
      if (this.Owner != Player.Character.id) return Player.Notification(Messages.YOU_DONT_HAVE_HOUSE_KEYS, Globals.Notification.Error, 5);
      if (!this.Tenants.includes(Player.Character.id)) return Player.Notification(Messages.YOU_DONT_HAVE_HOUSE_KEYS, Globals.Notification.Error, 5);

      this.Locked = !this.Locked;
      await this.save();
   }

   async Create(Player: PlayerMp, HouseType: number, Price: number) {
      if (HouseTypes[HouseType] == undefined) return Player.Notification(Messages.TYPES_ARE_IN_RANGE + '0 - ' + HouseTypes.length + '.', Globals.Notification.Error, 5);

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

   static async Nearest(player: PlayerMp) {
      const Houses = await House.findAll();
      for (const House of Houses) {
          const Position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
          if (player.dist(Position) < 2.5) return House;
      }
  };

}

(async () => {

   await House.sync();

   const HouseList = await House.findAll();
   HouseList.forEach((House) => {
      House.Refresh();
   });

   Main.Terminal(3, HouseList.length + ' Houses Loaded !');
})();
