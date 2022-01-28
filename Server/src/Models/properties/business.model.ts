import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, DefaultScope, DataType, AfterCreate, AllowNull } from 'sequelize-typescript';

import { interactionPoint } from '@interfaces';
import { gDimension } from '@constants';
import { characters } from '@models';
import { bizData } from '../../globals/enums';
import { businessConfig } from '@configs/business.config';


@Table
export class business extends Model {

   static objects = new Map<number, interactionPoint>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column
   name: string

   @Column
   type: number

   @Default(false)
   @Column
   locked: boolean

   @Column
   walk_in: boolean

   @AllowNull(false)
   @Column
   price: number

   @Default(null)
   @Column
   owner: number

   @Default(0)
   @Column
   budget: number

   @Default(gDimension)
   @Column
   dimension: number

   @Column
   ipl: string

   @Column
   sprite: number

   @Column
   sprite_color: number

   @Default([])
   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('workers')); }
      }
   )    
   workers: number[]

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('products')); }
      }
   )    
   products: { multiplier: number, quantity: number }[]

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

   @AfterCreate
   static refresh (business: business) { 
      if (business.object) { 



      } else {
         const { name, position, sprite, dimension, sprite_color } = business;

         business.object = { 
            colshape: mp.colshapes.newSphere(position.x, position.y, position.z, 1.8, dimension),
            blip: mp.blips.new(sprite, new mp.Vector3(position.x, position.y, position.z), { dimension: dimension, name: name, color: sprite_color, shortRange: true, scale: 0.85 }),
            marker: mp.markers.new(27, new mp.Vector3(position.x, position.y, position.z - 0.98), 1.8, {
               color: businessConfig.markerColor,
               rotation: new mp.Vector3(0, 0, 90),
               visible: true,
               dimension: dimension
            })
         }; 
      }
   }


   async addWorker (playerr: PlayerMp, targetCharacter: characters) { 
      let workers = this.workers;
      workers.push(targetCharacter.id);
      this.workers = workers;
      await this.save();
   }

   async removeWorker (player: PlayerMp, targetCharacter: characters) { 
      let workers = this.workers;
      let x = workers.find(worker => worker == targetCharacter.id);
      if (x) workers.splice(workers.indexOf(x), 1);
      this.workers = workers;
      await this.save();
   }


   static async createBiz (Player: PlayerMp, Type: number, WalkIn: boolean, Price: number) {

      const Position = Player.position;
      const Dimension = Player.dimension;
      const Walk_in = WalkIn == true ? true : false;
      let Products: any = {};
      //console.log(Products)

      const NewBiz = await business.create({ Name: Default.name, Type: Type, Price: Price, Walk_in: Walk_in, Products: Products, Position: Position, Dimension: Dimension });
      if (NewBiz) {
         // Log
      }
   };

   // static async getNearest (player: PlayerMp): Promise<business | undefined> {
   //    const business = await business.findAll();
   //    for (const b of business) {
   //       const position = new mp.Vector3(b.position.x, b.position.y, b.position.z);
   //       if (player.dist(position) < 2.5) return b;
   //    }
   // };

   // static async gerNearestGasStation (player: PlayerMp): Promise<business | undefined>  {
   //    const gasStations = await Business.findAll({ where: { type: bizData.Type.GAS_STATION } });
   //    for (const station of gasStations) {
   //       const position = new mp.Vector3(station.position.x, station.position.y, station.position.z);
   //       if (player.dist(position) < 50) return station;
   //    }
   // };

   async buy (player: PlayerMp) {
      const character = pplayer.character;

      if (this.owner != 0) return; // PORUKA: Neko vec poseduje ovaj biznis
      if (this.price > character.money) return; // PORUKA: Nemate dovoljno novca

      this.owner = character.id;
      character.giveMoney(player, -this.price);
      // PORUKA: Uspesno ste kupili biznis
      await this.save();
   };

   async openBuyMenu (player: PlayerMp) {

      const Character = pplayer.character;

      // switch (this.Type) {
      //    case Globals.Business.Types.Dealership: {
      //          if (this.Vehicle_Point) {
      //             //const Info = { Name: this.Name, id: this.id, Point: this.Vehicle_Point, Multiplier: BusinessTypes[this.Type].multiplier, Products: this.DealershipMenu(this.Products) }
      //             //player.call('client:business.dealership:menu', [Info]);
      //             break;
      //          }
      //    }

      //    case Globals.Business.Types.Rent: {
      //          player.call('client:business:menu', ['rent', this]);
      //          break;
      //    }

      //    case Globals.Business.Types.Restaurant: {

      //          break;
      //    }

      //    case Globals.Business.Types.Cafe: {
      //          const Info: any = { Name: this.Name, id: this.id, Multiplier: BusinessTypes[this.Type].multiplier, Products: {} }
      //          for (const i in this.Products) { Info.Products[i] = { hash: Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies }; }

      //          player.call('client:business.drinks:menu', [Info]);
      //          break;
      //    }

      //    case Globals.Business.Types.NightClub: {
      //          const Info: any = { Name: this.Name, id: this.id, Multiplier: BusinessTypes[this.Type].multiplier, Products: {} }
      //          for (const i in this.Products) { Info.Products[i] = { hash: Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies }; }

      //          player.call('client:business.drinks:menu', [Info]);
      //          break;
      //    }

      //    case Globals.Business.Types.Clothing: {
      //          const Info = {
      //             Name: this.Name,
      //             id: this.id,
      //             Multiplier: BusinessTypes[this.Type].multiplier
      //          };

      //          player.call('client:business.clothing:menu', [Info]);
      //          break;
      //    }

      //    default: {
      //          const Info: any = {
      //             Name: this.Name,
      //             Multiplier: BusinessTypes[this.Type].multiplier,
      //             id: this.id,
      //             Products: {}
      //          }

      //          for (const i in this.Products) {
      //             if (i != 'Fuel') {
      //                Info.Products[i] = { hash: Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies };
      //             }
      //          }

      //          player.call('client:business.market:menu', [Info]);
      //    }
      // }
   };

   async sell (player: PlayerMp, target: any = 0, price = 0) {
      let Character = pplayer.character;
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


   // async AddProduct(player: PlayerMp, product: number, multiplier: number, amount = 5) {
   //    let Products = this.Products;
   //    Products[product] = { Multiplier: multiplier, Supplies: amount };
   //    this.Products = Products;
   //    // PORUKA: Uspesno ste dodali produkt u vas bizni
   //    await this.save();
   //    return this.Products;
   // };
   /*
   async EditProduct(player: PlayerMp, product: number, multiplier: number) {
      let Products = this.Products;
      Products[product] = multiplier;
      this.Products = Products;
      // PORUKA: Uspesno ste editovali produkt
      await this.save();
   };*/

   // async RemoveProduct(player: PlayerMp, product: number) {
   //    let Products = this.Products;
   //    delete Products[product];
   //    this.Products = Products;
   //    // PORUKA: Uspesno ste izbrisali produkt
   //    await this.save();
   // };

   // async WorkersAdd(player: PlayerMp) {
   //    let Workers = this.Workers;
   //    Workers.push(pplayer.character.id);
   //    this.Workers = Workers;
   //    // PORUKA: Uspesno ste zaposlili igraca da radi u vas biznis
   //    await this.save();
   // };


   // async WorkerRemove(characterId: number) {
   //    let Workers = this.Workers;
   //    let x = Workers.find(worker => worker === characterId);
   //    if (x) {
   //       let i = Workers.indexOf(x);
   //       Workers.splice(i, 1);
   //    }       
   //    this.Workers = Workers;
   //    // PORUKA: Uspesno ste dali otkaz igracu koji je radio u vasem biznisu
   //    await this.save();
   // };

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

   // async Refresh() {

   //    const Info = BusinessTypes[this.Type];

   //    const Sprite = this.Sprite ? this.Sprite : Info.blip;

   //    if (this.GameObject == null) {
   //       const GameObjects = {
   //             colshape: mp.colshapes.newRectangle(this.Position.x, this.Position.y, 1.8, 2.0, 0),
   //             blip: mp.blips.new(Sprite, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
   //             marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
   //                color: [255, 255, 255, 1], // PROMENITI
   //                rotation: new mp.Vector3(0, 0, 90),
   //                visible: true,
   //                dimension: this.Dimension
   //             })
   //       };


   //       GameObjects.colshape.OnPlayerEnter = (player) => {
   //             const Price = Main.Dollars(this.Price);
   //             const ForSale = this.Owner == 0 ? 'Na prodaju !' : 'Biznis u vlasništvu';
   //             const Locked = this.Locked ? 'Zatvoren' : 'Otvoren';

   //             player.SendMessage('[Business] !{' + Colors.whitesmoke + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', Colors.property);
   //             player.SendMessage('[Business] !{' + Colors.whitesmoke + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', Colors.property);
   //             player.SendMessage((this.Walk_In ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy business' : ''), Colors.whitesmoke);
   //       };

   //       if (this.Color) {
   //             GameObjects.blip.color = this.Color;
   //       } else {
   //             if (Info.color) {
   //                GameObjects.blip.color = Info.color;
   //             }
   //       }

   //       this.GameObject = GameObjects;
   //    } else {
   //       if (this.GameObject.blip) {
   //             this.GameObject.blip.sprite = this.Sprite ? this.Sprite : Info.blip;
   //             this.GameObject.blip.color = this.Color ? this.Color : Info.color;
   //       }
   //    }
   //};

}

