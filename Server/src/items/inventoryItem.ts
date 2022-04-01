

import { AfterCreate, AfterDestroy, AfterSave, AfterSync, AutoIncrement, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { ItemEnums, notifications } from '@enums';
import { shared_Data } from '@shared';
import { ItemExtra } from '@interfaces';
import { Items, logs, Characters } from 'src/vehicles';
import { itemNames, Lang, none } from '@constants';
import { playerConfig } from '@configs';


@Table
export class inventories extends Model { 

   static objects = new Map<number, ObjectMp>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column(DataType.STRING)
   name: string;

   @Column(DataType.INTEGER)
   entity: ItemEnums.entity;

   @Default(none)
   @Column(DataType.INTEGER)
   owner: number;

   @Default(false)
   @Column(DataType.BOOLEAN)
   on_ground: boolean;

   @Default(false)
   @Column(DataType.BOOLEAN)
   equiped: boolean;

   @Default(ItemEnums.status.NONE)
   @Column(DataType.INTEGER)
   status: ItemEnums.status;
   
   @Default(none)
   @Column(DataType.INTEGER)
   fingerprint: number; 

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('position')); }
   })
   position: Vector3Mp;

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('rotation')); }
   })   
   rotation: Vector3Mp

   @Column
   dimension: number;

   @Default({})
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('data')); }
   })   
   data: ItemExtra;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object () { 
      return inventories.objects.get(this.id)!;
   }

   set object (object: ObjectMp) { 
      inventories.objects.set(this.id, object);
   }


   @AfterSync
   static async loading () {
      inventories.findAll( { where: { on_ground: true } } ).then(items => {
         items.forEach(item => {
            item.refresh();
         })
      });

      logs.info(await inventories.count() + ' items loaded !');
   }

   @AfterCreate
   static async creating (item: inventories) { 
      item.refresh();
      
      const rItem = Items.list[item.name];

      if (!rItem) {
         return;
      }

      switch (rItem.name) {
         case itemNames.HANDHELD_RADIO: {
            item.data = {
               power: true,
               frequency: '000',
               slot: 1
            }
            break;
         }
      }

      await item.save();
   }

   @AfterDestroy
   static destroying (item: inventories) { 
      if (item.object) {
         item.object.destroy();
         inventories.objects.delete(item.id);
      }
   }

   @AfterSave
   static saving (item: inventories) {
      item.refresh();
   }

   refresh () {
      if (this.on_ground) {
         this.object = mp.objects.new(Items.list[this.name].model, this.position, { alpha: 255, rotation: this.rotation, dimension: this.dimension });
         this.object.setVariable(shared_Data.ITEM, { name: this.name, id: this.id });
      } else { 
         if (this.object) { 
            this.object.destroy();
            inventories.objects.delete(this.id);
         }
      }
   }

   async pickupItem (player: PlayerMp) { 
      if (this.on_ground) {
         this.on_ground = false;
         this.owner = player.character.id;
         this.entity = ItemEnums.entity.PLAYER;
         player.setVariable('ANIMATION', { name: 'pickup_low', dictionary: 'random@domestic', flag: 0 } );
         await this.save();
      }
   }

   async dropItem (player: PlayerMp, position: Vector3Mp, rotation: Vector3Mp) {
      this.owner = 0;
      this.on_ground = true;
      this.dimension = player.dimension;
      this.fingerprint = player.character.id;
      this.position = position;
      this.rotation = rotation;
      await this.save();
   }

   async equipItem (player: PlayerMp) {
      const rItem = Items.list[this.name!];

      const equipment = await inventories.findAll( { where: { equiped: true, owner: player.character.id, entity: ItemEnums.entity.PLAYER } });
      const equiped = equipment.filter(
         item => !Items.list[item.name].type.includes(ItemEnums.type.CLOTHING) && !Items.list[item.name].type.includes(ItemEnums.type.PROP)
      );
      
      if (equiped.length > playerConfig.max.EQUIPMENT) {
         player.notification(Lang.youReachedMaxEquipemnt + playerConfig.max.EQUIPMENT + '.', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (!rItem.isEquipable) {
         logs.error('equipItem: isEquipable');
         return;
      }

      if (equiped.find(alreadyEquiped => alreadyEquiped.name == this.name)) {
         player.notification(Lang.youAlreadyEquiped + ' ' + this.name + '.', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      this.equiped = true;
      await this.save();
   }

   async unequip (player: PlayerMp) {
      const item = Items.list[this.name];

      if (!item) {
         return;
      }

      this.equiped = false;

      if (item.unequip) {
         item.unequip(player);
      }

      await this.save();
   }

   async useItem (player: PlayerMp) { 
      const Character = player.character;
      
      const rItem = Items.list[this.name];
   }

   static async doesHaveItem (entity: ItemEnums.entity, owner: number, itemName: string) {
      return inventories.findOne( { where: { entity: entity, owner: owner, name: itemName } } ).then(haveItem => {
         return haveItem ? haveItem : false;
      });
   }

   static hasEquiped (player: PlayerMp, itemName: string) {
      return inventories.findOne( { where: { name: itemName, equiped: true, owner: player.character.id }})
   }

   static getEntityItems (entity: ItemEnums.entity, owner: number)  { 
      return inventories.findAll( { where: { owner: owner, entity: entity } } ).then(items => { 
         return items;
      }).catch(e => {
         logs.error('ctchingPlyerItems: ' + e);
      });
   }

   static giveItem (player: PlayerMp, item: Items) { 
      inventories.create( { name: item.name, entity: ItemEnums.entity.PLAYER, owner: player.character.id } );
   };

   static async savePlayerEquipment (character: Characters) { 
      inventories.findAll( { where: { entity: ItemEnums.entity.PLAYER, owner: character.id, equiped: true } }).then(equipedItems => { 
         equipedItems.forEach(async item => {
            if (!Items.list[item.name].isClothing() && !Items.list[item.name].isProp()) {
               item.equiped = false;
               await item.save();
            }
         });
      })
   }


   static async itemsWeight (player: PlayerMp) {
      return inventories.findAll( { where: { owner: player.character.id, entity: ItemEnums.entity.PLAYER } } ).then(playerItems => {
         let weight: number = 0;

         playerItems.forEach(item => {
            weight += Items.list[item.name].weight;
         });

         return weight;
      })
   }

}
