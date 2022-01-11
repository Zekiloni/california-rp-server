import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, DefaultScope, DataType, AfterCreate } from 'sequelize-typescript';
import { globalDimension } from '../globals/enums';
import { businessPoint } from '../globals/interfaces';
import Characters from './character.model';


export default class Business extends Model {

   static objects = new Map<number, businessPoint>();

   @Column
   @PrimaryKey
   @AutoIncrement
   id: number

   @Column
   name: string

   @Column
   type: number

   @Column
   @Default(false)
   locked: boolean

   @Column
   walk_in: boolean

   @Column
   price: number

   @Column
   owner: number

   @Default(0)
   budget: number

   @Default(globalDimension)
   dimension: number

   @Column
   ipl: string

   @Column(DataType.INTEGER)
   sprite: number

   @Column(DataType.INTEGER)
   color: number

   @Column
   @Default([])
   workers: number[]

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('products')); },
   })    
   products: { multiplier: number, quantity: number }[]

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('position')); },
   })       
   position: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('vehicle_point')); },
   })
   vehicle_point: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('interior_position')); },
   })
   interior_position: Vector3Mp

   @Column
   @CreatedAt
   created_at: Date;

   @Column
   @UpdatedAt
   updated_at: Date;

   get object (): businessPoint { 
      return Business.objects.get(this.id)!;
   }

   set object (object: businessPoint) { 
      Business.objects.set(this.id, object);
   }

   @AfterCreate
   static refresh (business: Business) { 
      if (business.object) { 

         const { position } = business;

         const infoPoint = { 
            colshape: mp.colshapes.newRectangle(position.x, position.y, position.z, 1.5, business.dimension),
            blip: mp.blips.new()
         } 

         business.object = infoPoint;
      } else {

      }
   }


   async addWorker (playerr: PlayerMp, targetCharacter: Characters) { 
      let workers = this.workers;
      workers.push(targetCharacter.id);
      this.workers = workers;
      await this.save();
   }

   async removeWorker (player: PlayerMp, targetCharacter: Characters) { 
      let workers = this.workers;
      let x = workers.find(worker => worker == targetCharacter.id);
      if (x) workers.splice(workers.indexOf(x), 1);
      this.workers = workers;
      await this.save();
   }


   static async New(Player: PlayerMp, Type: number, WalkIn: boolean, Price: number) {

      if (!BusinessTypes[Price]) return;

      const Position = Player.position;
      const Dimension = Player.dimension;
      const Walk_in = WalkIn == true ? true : false;
      const Default: any = BusinessTypes[Type];
      let Products: any = {};

      if (Default.products) {
         for (const i in Default.products) {
               let multiplier = Default.products[i];
               Products[i] = { multiplier: multiplier, supplies: Settings.Business.Default.Supplies }; // '\"' + i + '\"'
         }
      }

      //console.log(Products)

      const NewBiz = await Business.create({ Name: Default.name, Type: Type, Price: Price, Walk_in: Walk_in, Products: Products, Position: Position, Dimension: Dimension });
      if (NewBiz) {
         // Log
      }
   };

   static async Nearest(player: PlayerMp) {
      const Businesses = await Business.findAll();
      for (const Business of Businesses) {
         const Position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
         if (player.dist(Position) < 2.5) return Business;
      }
   };


   static async GetNearestGasStation(player: PlayerMp) {
      const GasStations = await Business.findAll({ where: { Type: Globals.Business.Types.GasStation } });
      for (const Station of GasStations) {
         const Position = new mp.Vector3(Station.Position.x, Station.Position.y, Station.Position.z);
         if (player.dist(Position) < 50) return Station;
      }
   };

   async Save() {
      await this.save();
   }

   async Buy(player: PlayerMp) {
      const Character = player.Character;

      if (this.Owner != 0) return; // PORUKA: Neko vec poseduje ovaj biznis
      if (this.Price > Character.Money) return; // PORUKA: Nemate dovoljno novca

      this.Owner = Character.id;
      Character.GiveMoney(player, -this.Price);
      // PORUKA: Uspesno ste kupili biznis
      await this.save();
   };

   async Menu(player: PlayerMp) {

      const Character = player.Character;

      switch (this.Type) {
         case Globals.Business.Types.Dealership: {
               if (this.Vehicle_Point) {
                  //const Info = { Name: this.Name, id: this.id, Point: this.Vehicle_Point, Multiplier: BusinessTypes[this.Type].multiplier, Products: this.DealershipMenu(this.Products) }
                  //player.call('client:business.dealership:menu', [Info]);
                  break;
               }
         }

         case Globals.Business.Types.Rent: {
               player.call('client:business:menu', ['rent', this]);
               break;
         }

         case Globals.Business.Types.Restaurant: {

               break;
         }

         case Globals.Business.Types.Cafe: {
               const Info: any = { Name: this.Name, id: this.id, Multiplier: BusinessTypes[this.Type].multiplier, Products: {} }
               for (const i in this.Products) { Info.Products[i] = { hash: Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies }; }

               player.call('client:business.drinks:menu', [Info]);
               break;
         }

         case Globals.Business.Types.NightClub: {
               const Info: any = { Name: this.Name, id: this.id, Multiplier: BusinessTypes[this.Type].multiplier, Products: {} }
               for (const i in this.Products) { Info.Products[i] = { hash: Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies }; }

               player.call('client:business.drinks:menu', [Info]);
               break;
         }

         case Globals.Business.Types.Clothing: {
               const Info = {
                  Name: this.Name,
                  id: this.id,
                  Multiplier: BusinessTypes[this.Type].multiplier
               };

               player.call('client:business.clothing:menu', [Info]);
               break;
         }

         default: {
               const Info: any = {
                  Name: this.Name,
                  Multiplier: BusinessTypes[this.Type].multiplier,
                  id: this.id,
                  Products: {}
               }

               for (const i in this.Products) {
                  if (i != 'Fuel') {
                     Info.Products[i] = { hash: Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies };
                  }
               }

               player.call('client:business.market:menu', [Info]);
         }
      }
   };

   async Sell(player: PlayerMp, target: any = 0, price = 0) {
      let Character = player.Character;
      if (price == 0) price = (this.Price / 100) * 65;

      Character.GiveMoney(player, price);
      this.Owner = target;

      if (target != 0) {
         let TargetCharacter = await target.Character();
         TargetCharacter.GiveMoney(player, -price);
         // PORUKA: targetu Uspesno ste kupiili biznis od player.name za price
      }
      // PORUKA: Prodali ste biznis
      await this.save();
   };


   async AddProduct(player: PlayerMp, product: number, multiplier: number, amount = 5) {
      let Products = this.Products;
      Products[product] = { Multiplier: multiplier, Supplies: amount };
      this.Products = Products;
      // PORUKA: Uspesno ste dodali produkt u vas bizni
      await this.save();
      return this.Products;
   };
   /*
   async EditProduct(player: PlayerMp, product: number, multiplier: number) {
      let Products = this.Products;
      Products[product] = multiplier;
      this.Products = Products;
      // PORUKA: Uspesno ste editovali produkt
      await this.save();
   };*/

   async RemoveProduct(player: PlayerMp, product: number) {
      let Products = this.Products;
      delete Products[product];
      this.Products = Products;
      // PORUKA: Uspesno ste izbrisali produkt
      await this.save();
   };

   async WorkersAdd(player: PlayerMp) {
      let Workers = this.Workers;
      Workers.push(player.Character.id);
      this.Workers = Workers;
      // PORUKA: Uspesno ste zaposlili igraca da radi u vas biznis
      await this.save();
   };


   async WorkerRemove(characterId: number) {
      let Workers = this.Workers;
      let x = Workers.find(worker => worker === characterId);
      if (x) {
         let i = Workers.indexOf(x);
         Workers.splice(i, 1);
      }       
      this.Workers = Workers;
      // PORUKA: Uspesno ste dali otkaz igracu koji je radio u vasem biznisu
      await this.save();
   };

   /*
   async DealershipMenu(products: any) {
      let Menu = [];
      for (const i in products) {
         Menu.push({
               Model: i, Name: 'Ime vozila', Multiplier: products[i].multiplier, Category: VehiclesList[i].category,
               Stats: {
                  MaxSpeed: Vehicles[i].stats.max_speed,
                  MaxOccupants: Vehicles[i].stats.max_occupants,
                  MaxBraking: Vehicles[i].stats.max_braking,
                  MaxAcceleration: Vehicles[i].stats.max_acceleration
               }
         })
      }
      return Menu;
   }; */

   async Refresh() {

      const Info = BusinessTypes[this.Type];

      const Sprite = this.Sprite ? this.Sprite : Info.blip;

      if (this.GameObject == null) {
         const GameObjects = {
               colshape: mp.colshapes.newRectangle(this.Position.x, this.Position.y, 1.8, 2.0, 0),
               blip: mp.blips.new(Sprite, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
               marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
                  color: [255, 255, 255, 1], // PROMENITI
                  rotation: new mp.Vector3(0, 0, 90),
                  visible: true,
                  dimension: this.Dimension
               })
         };


         GameObjects.colshape.OnPlayerEnter = (player) => {
               const Price = Main.Dollars(this.Price);
               const ForSale = this.Owner == 0 ? 'Na prodaju !' : 'Biznis u vlasništvu';
               const Locked = this.Locked ? 'Zatvoren' : 'Otvoren';

               player.SendMessage('[Business] !{' + Colors.whitesmoke + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', Colors.property);
               player.SendMessage('[Business] !{' + Colors.whitesmoke + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', Colors.property);
               player.SendMessage((this.Walk_In ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy business' : ''), Colors.whitesmoke);
         };

         if (this.Color) {
               GameObjects.blip.color = this.Color;
         } else {
               if (Info.color) {
                  GameObjects.blip.color = Info.color;
               }
         }

         this.GameObject = GameObjects;
      } else {
         if (this.GameObject.blip) {
               this.GameObject.blip.sprite = this.Sprite ? this.Sprite : Info.blip;
               this.GameObject.blip.color = this.Color ? this.Color : Info.color;
         }
      }
   };

}

