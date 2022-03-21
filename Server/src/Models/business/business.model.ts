import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, DataType, AfterCreate, AllowNull, ForeignKey, AfterSync, AfterDestroy, HasMany, BelongsTo, AfterSave, AfterFind } from 'sequelize-typescript';

import { interactionPoint } from '@interfaces';
import { cmds, gDimension, lang, none } from '@constants';
import { Characters, logs, products, workers } from '@models';
import { BusinesConfig, VehicleConfig } from '@configs';
import { notifications } from '@enums';
import { dollars } from '@shared';
import { vehicles } from '@models';


@Table
export class business extends Model {

   static objects = new Map<number, interactionPoint>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column
   name: string

   @Default(BusinesConfig.type.MARKET)
   @Column
   type: BusinesConfig.type

   @Default(false)
   @Column(DataType.BOOLEAN)
   locked: boolean

   @Default(true)
   @Column(DataType.BOOLEAN)
   walk_in: boolean

   @AllowNull(false)
   @Column(DataType.INTEGER)
   price: number

   @ForeignKey(() => Characters)
   @Default(null)
   @Column(DataType.INTEGER)
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
         get () { 
            return this.getDataValue('position') ? JSON.parse(this.getDataValue('position')) : null;
         }
      }
   )       
   position: Vector3Mp


   @Column(
      {
         type: DataType.JSON,
         get () {
            return this.getDataValue('preview_Point') ? JSON.parse(this.getDataValue('preview_Point')) : null;
         }
      }
   )
   preview_Point: Vector3Mp

   @Column(
      {
         type: DataType.JSON,
         get () { 
            return this.getDataValue('vehicle_point') ? JSON.parse(this.getDataValue('vehicle_point')) : null;
         }
      }
   )
   vehicle_point: [Vector3Mp, number]

   @Column(
      {
         type: DataType.JSON,
         get () {
            return this.getDataValue('interior_position') ? JSON.parse(this.getDataValue('interior_position')) : null;
         }
      }
   )
   interior_position: Vector3Mp

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   @HasMany(() => products)
   products: products[]

   @HasMany(() => workers)
   workers: workers[]

   get object (): interactionPoint { 
      return business.objects.get(this.id)!;
   }

   set object (object: interactionPoint) { 
      business.objects.set(this.id, object);
   }

   @AfterSync
   static loading () {
      business.findAll( ).then(businesses => {
         businesses.forEach(busines => {
            busines.refresh();
         });
         
         logs.info(businesses.length + ' business loaded !');
      });
   }


   @AfterCreate
   static async creating (business: business) { 
      business.sprite = BusinesConfig.sprites[business.type];
      business.sprite_color = BusinesConfig.blipColors[business.type];
      (await business.save()).refresh();
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

   
   @AfterSave
   static saving (busines: business) {
      busines.refresh();
   }

   showInfo (player: PlayerMp) {
      if (player.vehicle) {
         return;
      };

      let availableCommands: string[] = [];

      if (this.owner == player.character.id) {
         availableCommands.push(cmds.names.LOCK, cmds.names.BUSINES);
      }

      if (this.walk_in) {
         availableCommands.push(cmds.names.BUY);
      } else {
         availableCommands.push(cmds.names.ENTER);
      }
      
      if (!this.owner) {
         availableCommands.push(cmds.names.BUY + ' busines');
      }
      
      player.call('CLIENT::BUSINESS:INFO', [JSON.stringify(this), availableCommands]);
   }

   static getNearest (player: PlayerMp) {
      return business.findAll( { include: [products, workers] } ).then(businesses => {
         const nearest = businesses.filter(business => player.dist(business.position) < 35);

         if (!nearest || nearest.length == none) {
            return;
         }

         return nearest.reduce((firstBiz, secondBiz) => {
            return player.dist(firstBiz.position) < player.dist(secondBiz.position) ? firstBiz : secondBiz;
         })
      })
   }
   
   static async getNearestGasStation (player: PlayerMp)  {
      return business.findAll( { where: { type: BusinesConfig.type.GAS_STATION } } ).then(gasStations => {
         gasStations.forEach(gasStation => {
            if (player.dist(gasStation.position) < 45) {
               return gasStation;
            };
         });
      });
   };

   refresh () {
      if (!this.object) {
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
            
            colshape: mp.colshapes.newSphere(position.x, position.y, position.z, 1.8, dimension),
            marker: mp.markers.new(1, new mp.Vector3(position.x, position.y, position.z - 1), 1, { color: BusinesConfig.markerColor, dimension: this.dimension, visible: true })
         }
      }

      this.object.colshape!.onPlayerEnter = (player: PlayerMp) => {
         this.showInfo(player);
      }

      this.object.colshape!.onPlayerLeave = (player: PlayerMp) => { 
         player.call('CLIENT::BUSINESS:INFO', [false]);
      }
   }

   async lock (player: PlayerMp, locked: boolean) {
      if (this.owner != player.character.id) {
         player.notification(lang.youDontHaveBusinesKeys, notifications.type.ERROR, notifications.time.MED);
         return;
      } 

      await this.update( { locked: locked } );
      player.notification(locked ? lang.businessLocked : lang.businessUnlocked, notifications.type.INFO, notifications.time.MED);
   }

   async edit (player: PlayerMp, property: string, value: string) {
      switch (property) {
         case 'price': {
            this.price = Number(value); 
            break;
         }

         case 'name':{
            this.name = value; 
            break;
         }

         case 'lock':{
            this.locked = Number(value) == 1 ? true : false;
            break;
         }

         case 'sprite':{
            this.sprite = Number(value); 
            break;
         }

         case 'spriteColor': {
            this.sprite_color = Number(value); 
            break;
         }

         case 'owner': {
            this.owner = Number(value); 
            break;
         }

         case 'previewpoint': {
            this.preview_Point = player.position;
             break;
         }

         case 'vehiclepoint': {
            if (!player.vehicle) {
               player.notification(lang.notInVehicle, notifications.type.ERROR, notifications.time.MED);
               return;
            }

            this.vehicle_point = [player.vehicle.position, player.vehicle.heading];
            break;
         }

         default: {
            // PORUKA: Actions
            return;
         }
      }

      await this.save();
      player.call('CLIENT::BUSINESS:INFO', [this]);
   }

   async buy (player: PlayerMp) {
      const character = player.character;

      if (this.owner) {
         player.notification(lang.busiensAlreadyOwner, notifications.type.ERROR, notifications.time.MED);
         return;
      }; 
      

      if (character.money < this.price) {
         player.notification(lang.notEnoughMoney, notifications.type.ERROR, notifications.time.MED);
         return;
      };

      this.owner = character.id;
      character.giveMoney(player, -this.price);

      player.notification(lang.successfullyBuyedBusiness + this.name + lang.for + dollars(this.price) + '.', notifications.type.SUCCESS, notifications.time.LONG);
      await this.save();
   };
   
   async sell (player: PlayerMp, sellPrice: string, targetSearch: string | number) {
      const price = Number(sellPrice);

      if (targetSearch != -1) {
         
         const target = mp.players.find(targetSearch);

         if (!target) {
            player.notification(lang.userNotFound, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         const { character: character } = player;
         const { character: tCharacter } = target!;

         if (player.dist(target.position) > 2) {
            player.notification(lang.playerNotNear, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         if (tCharacter.money < price) {
            player.notification(lang.playerDoesntHaveMoney, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         // const offer = {
         //    type: offerTypes.BUSINESS_SELL,
         //    offeredBy: player,
         //    id: this.id,
         //    status: offerStatus.NONE,
         //    expire: setTimeout(() => {
   
         //    }, offerExpire)
         // };
         
         // /// send notify to both

         // tCharacter.offer = offer;
         
      } else { 
         const cPrice = (this.price / 100) * 65;
         
         this.owner = none;
         player.character.giveMoney(player, cPrice);
         player.notification(lang.succesfullySoldBizToCountry, notifications.type.INFO, notifications.time.LONG);

         await this.save();
      }
   };

   menu (player: PlayerMp) {
      
      if (this.locked) {
         player.notification(lang.thisBusinessIsLocked, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      switch (this.type) {
         case BusinesConfig.type.MARKET: {
            player.call('CLIENT::MARKET:MENU', [this]);
            break;
         }

         case BusinesConfig.type.GAS_STATION: {
            player.call('CLIENT::MARKET:MENU', [this]);
            break;
         }

         case BusinesConfig.type.CLOTHING: {
            player.call('CLIENT::CLOTHING:MENU', [this]);
            break;
         }

         case BusinesConfig.type.BARBER_SHOP: {
            player.call('CLIENT::BARBER:MENU', [this]);
            break;
         }

         case BusinesConfig.type.VEHICLE_DEALERSHIP: {
            if (this.products.length == none) {
               player.notification(lang.businesNoVehiclesToSell, notifications.type.INFO, notifications.time.LONG);
               return;
            }

            if (!this.preview_Point) {
               player.notification(lang.dealershipNoPreview, notifications.type.INFO, notifications.time.LONG);
               return;
            }

            player.call('CLIENT::DEALERSHIP:MENU', [this]);
            break;
         }
      }
   }


   addWorker (player: PlayerMp, character: Characters, salary: number) {
      return workers.findOne( { where: { name: character.name } }).then(worker => {
         if (worker) {

            return false;
         }


         return true;
      })
   }

   static vehicleBuy (player: PlayerMp, businesID: number, productID: number, color: string) {
      return business.findOne( { where: { id: businesID }, include: [products] } ).then(busines => {
         if (!busines) {
            return;
         }

         const product = busines.products.find(_product => _product.id == productID);

         if (!product) {
            return;
         }


         if (product.quantity == none) {
            return;
         }

         if (product.price > player.character.money) {
            player.notification(lang.notEnoughtMoneyForVehicle, notifications.type.ERROR, notifications.time.MED);
            return;
         }
         
         if (player.character.vehicles.length > player.character.max_vehicles) {
            return;
         }

         const [ position, heading ] = busines.vehicle_point;

         if (!position) {
            return;
         }

         const model = (<string>product.name).toLocaleLowerCase();
         const [primaryColor, secondaryColor]: [RGB, RGB] = JSON.parse(color);
         
         vehicles.new(
            model, 
            VehicleConfig.type.OWNED, 
            false, 
            player.character.id,
            [primaryColor, secondaryColor],
            new mp.Vector3(position.x, position.y, position.z), new mp.Vector3(0, 0, heading), {
               locked: false, spawned: false, price: product.price
            }
         ).then(vehicle => {
            if (!vehicle) {
               return;
            }

            vehicle.load();
         });

         player.character.giveMoney(player, -product.price);
         
         player.notification('kupia si vozilo', notifications.type.INFO, notifications.time.MED);

         return true;
      })
   }
}



mp.events.addProc('SERVER::DEALERSHIP:BUY', business.vehicleBuy);