
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt, AllowNull, AfterCreate, AfterDestroy, DataType, ForeignKey, AfterSync, AfterSave, HasMany, BelongsTo } from 'sequelize-typescript';
import { interactionPoint } from '@interfaces';
import { notifications, rank } from '@enums';
import { cmds, gDimension, Lang } from '@constants';
import { houseConfig } from '@configs';
import { Logs, Characters, PropertyObjects } from '@models';
import { Commands } from '@modules/commands';
import { PropertyConfig } from './s.Property.Config';


interface IPropertyPoint {
   blip: BlipMp
   colshape: ColshapeMp
   marker?: MarkerMp
}


@Table
export class Properties extends Model {
   static gameObjects = new Map<number, IPropertyPoint>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @ForeignKey(() => Characters)
   @Column
   owner: number;

   @BelongsTo(() => Characters)
   character: Characters | null

   @AllowNull(false)
   @Column(DataType.ENUM)
   type: keyof typeof PropertyConfig.PropertyType

   @AllowNull(false)
   @Column
   price: number;

   @Default(false)
   @Column
   locked: boolean;

   @Column({
      type: DataType.JSON,
      get () { 
         return this.getDataValue('position') ? JSON.parse(this.getDataValue('position')) : null;
      }
   })       
   position: Vector3Mp

   @Column({
      type: DataType.JSON,
      field: 'interior_position',
      get () { 
         return this.getDataValue('interiorPosition') ? JSON.parse(this.getDataValue('interiorPosition')) : null;
      }
   })
   interiorPosition: Vector3Mp

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

   @Default(null)
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return this.getDataValue('tenants') ? JSON.parse(this.getDataValue('tenants')) : [];
         }
      }
   )
   tenants: number[];

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object (): IPropertyPoint { 
      return Properties.gameObjects.get(this.id)!;
   }

   set object (object: IPropertyPoint) { 
      Properties.gameObjects.set(this.id, object);
   }

   @AfterSync
   static async loading () {
      Properties.findAll().then(property => {
         property.forEach(house => {
            house.refresh();
         })
      });

      Logs.info(await Properties.count() + ' houses loaded !');
   }

   @AfterSave
   static saving (house: Properties) {
      house.refresh();
   }

   @AfterCreate
   static async creating (house: Properties) {
      house.refresh();
   }

   @AfterDestroy
   static async destroying (house: Properties, options: any) {
      if (house.object) {
         house.object.colshape!.destroy();
         house.object.blip!.destroy();
         house.object.marker!.destroy();
         Properties.gameObjects.delete(house.id);
      }
   }

   static async new (player: PlayerMp, type: number, price: number) {
      Properties.create({
         type: type,
         price: price,
         position: player.position,
         interior_position: player.position,
         locked: true,
         dimension: player.dimension
      });
   }


   async edit (player: PlayerMp, property: string, value: string) {
      switch (property) {
         case 'price': 
            this.price = Number(value); break;
         case 'lock':
            this.locked = Number(value) == 1 ? true : false; break;
         case 'owner':
            this.owner = Number(value); break;
         case 'interior':
            this.interiorPosition = player.position; break;
         default: 
            return;
      }

      await this.save();
   }

   showInfo (player: PlayerMp) {
      if (player.vehicle) {
         return;
      };

      let availableCommands: string[] = [];

      if (this.owner == player.character.id) {
         availableCommands.push(cmds.names.LOCK, cmds.names.HOUSE);
      }

      availableCommands.push(cmds.names.ENTER);
      
      if (!this.owner) {
         availableCommands.push(cmds.names.BUY + ' house');
      }

      if (this.rentable) {
         availableCommands.push(cmds.names.RENT);
      }
      
      player.call('CLIENT::HOUSE:INFO', [this, availableCommands]);
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
            this.showInfo(player);
         }

         this.object.colshape!.onPlayerLeave = (player: PlayerMp) => { 
            player.call('CLIENT::HOUSE:INFO', [false]);
         }
      }
   }

   async buy (player: PlayerMp) {
      if (this.owner) {
         player.notification(Lang.houseAlreadyOwner, notifications.type.ERROR, 5);
         return;
      } 

      const character = player.character;

      if (this.price > character.money) {
         player.notification(Lang.notEnoughMoney, notifications.type.ERROR, 5);
         return;
      } 

      character.giveMoney(player, -this.price);
      player.notification(Lang.successfullyBuyedHouse, notifications.type.SUCCESS, 7);

      this.owner = character.id;

      await this.save();
   }

   async setType (houseType: keyof typeof PropertyConfig.PropertyType) {
      this.type = houseType;
      await this.save();
   }

   async lock (player: PlayerMp) {
      if (this.owner == player.character.id || this.tenants.includes(player.character.id)) { 
         this.locked = !this.locked;
         await this.save();
      } else { 
         player.notification(Lang.youDontHaveHouseKeys, notifications.type.ERROR, 5);
      }
   }

   static async getNearest (player: PlayerMp): Promise<Properties | void> {
      return Properties.findAll( { } ).then(houses => {
         const nearest = houses.filter(house => player.dist(house.position) < 20);

         return nearest.reduce((firstHouse, secondHouse) => {
            return player.dist(firstHouse.position) < player.dist(secondHouse.position) ? firstHouse : secondHouse;
         });
      })
   };

   enter (player: PlayerMp) {
      if (this.locked && this.owner != player.character.id) {
         player.notification(Lang.thisHouseIsLocked, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      player.position = this.interiorPosition;
      player.dimension = this.id;

      PropertyObjects.findAll( { where: { property: 'house', property_id: this.id } } ).then(objects => {
         player.call('CLIENT::INTERIOR:OBJECTS_LOAD', [objects, this.id])
      })


      player.character.inside = this;
      player.call('CLIENT::INTERIOR:CREATE_EXIT_POINT', [this.interiorPosition, 30, this.object.marker?.getColor()])
   }


   exit (player: PlayerMp) {
      this.type = "One Room Apartment"
      if (player.dist(this.interiorPosition) > 2) {
         player.notification(Lang.notNearbyExit, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (this.locked && this.owner != player.character.id) {
         player.notification(Lang.thisHouseIsLocked, notifications.type.ERROR, notifications.time.MED);
         return;
      }
      
      player.position = this.position;
      player.dimension = this.dimension;

      player.call('CLIENT::INTERIOR:OBJECTS_UNLOAD');

      player.character.inside = null;

      player.call('CLIENT::INTERIOR:DESTROY_EXIT_POINT', [this.interiorPosition]);
   }
}


Commands['inside'] = {
   description: 'inside test',
   call (player: PlayerMp) {
      console.log(player.character.inside)
   }
}