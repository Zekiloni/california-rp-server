

import { AfterCreate, AfterDestroy, AfterSave, AutoIncrement, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { itemEnums, notifications } from '@enums';
import { shared_Data } from '@shared';
import { itemExtra } from '@interfaces';
import { items, logs, characters } from '@models';
import { itemNames, lang, none } from '@constants';
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
   entity: itemEnums.entity;

   @Column
   owner: number;

   @Default(false)
   @Column(DataType.BOOLEAN)
   on_ground: boolean;

   @Default(false)
   @Column(DataType.BOOLEAN)
   equiped: boolean;

   @Column(DataType.INTEGER)
   status: itemEnums.status;

   @Default(1)
   @Column(DataType.INTEGER)
   quantity: number;
   
   @Default(none)
   @Column
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
   data: itemExtra;

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

   @AfterCreate
   static async creating (inventory: inventories) { 
      inventories.refresh(inventory);
      
      const rItem = items.list[inventory.name];

      if (!rItem) {
         return;
      }

      switch (rItem.name) {
         case itemNames.HANDHELD_RADIO: {
            inventory.data = {
               power: true,
               frequency: '000',
               slot: 1
            }
            break;
         }
      }

      await inventory.save();
   }

   @AfterDestroy
   static destroying (item: inventories) { 
      if (item.object) item.object.destroy();
   }

   @AfterSave
   static refresh (item: inventories) {
      if (item.on_ground) {
         item.object = mp.objects.new(items.list[item.name].model, item.position, { alpha: 255, rotation: item.rotation, dimension: item.dimension });
         item.object.setVariable(shared_Data.ITEM, { name: item.name, id: item.id });
      } else { 
         if (item.object) { 
            item.object.destroy();
            inventories.objects.delete(item.id);
         }
      }
   }

   async pickupItem (player: PlayerMp) { 
      if (this.on_ground) {
         this.on_ground = false;
         this.owner = player.character.id;
         this.entity = itemEnums.entity.PLAYER;
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
      const rItem = items.list[this.name!];

      let { equiped: equipment } = player.character;
      
      if (equipment.length > playerConfig.max.EQUIPMENT) {
         player.sendNotification(lang.youReachedMaxEquipemnt + playerConfig.max.EQUIPMENT + '.', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (!rItem.isEquipable) {
         logs.error('equipItem: isEquipable');
         return;
      }

      if (equipment.find(alreadyEquiped => alreadyEquiped.name == this.name)) {
         player.sendNotification(lang.youAlreadyEquiped + ' ' + this.name + '.', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      equipment.push(this);
      this.equiped = true;
      await this.save();
   }

   async useItem (player: PlayerMp) { 
      const Character = player.character;
      
      const rItem = items.list[this.name];
   }

   static async doesHaveItem (entity: itemEnums.entity, owner: number, itemName: string) {
      return inventories.findOne( { where: { entity: entity, owner: owner, name: itemName } } ).then(haveItem => {
         return haveItem ? haveItem : false;
      });
   }

   static hasEquiped (player: PlayerMp, itemName: string) {
      return player.character.equiped.find(item => item.name == itemName);
   }

   static getEntityItems (entity: itemEnums.entity, owner: number, includeEquiped?: boolean)  { 
      return inventories.findAll( { where: { owner: owner, entity: entity } } ).then(items => { 
         if (includeEquiped) {
            return items;
         } else {
            return items.filter(item => item.equiped != true);
         }
      }).catch(e => {
         logs.error('ctchingPlyerItems: ' + e);
      });
   }

   static getEquipedItems (player: PlayerMp) {
      return player.character?.equiped;
   }

   static giveItem (player: PlayerMp, item: items, quantity: number = 1) { 
      inventories.doesHaveItem(itemEnums.entity.PLAYER, player.character.id, item.name).then(haveItem => {
         if (haveItem && item.isStackable()) {
            haveItem.increment('quantity', { by: quantity } );
         } else { 
            inventories.create( { name: item.name, quantity: quantity, entity: itemEnums.entity.PLAYER, owner: player.character.id } );
         }
      });
   };

   static async savePlayerEquipment (character: characters) { 
      character.equiped.forEach(async item => {
         item.equiped = false;
         await item.save();
      });

      character.equiped = [];

      await character.save();
   }

}





// frp.Items.Equipment = async function (player, gender) { 

//    const Clothings = [
//       'Pants', 'Bag', 'Shoes', 'Accesories', 'Undershirt', 'Armour',
//       'Tops', 'Hat', 'Glasses', 'Ears', 'Mask',  'Watch',  'Bracelet'
//    ];

//    let items = {};

//    for (const clothing of Clothings) { 
//       const item = await frp.Items.HasItem(player.character, clothing);
//       if (item && item.Entity == ItemEntities.Equiped) { 
//          items[clothing] = item;
//       } else { 
//          items[clothing] = null;
//       }
//    }

//    for (const name in items) { 
//       const item = items[name];
//       const info = ItemRegistry[name];

//       if (item) { 
//          info.prop ? 
//             player.setProp(info.component, parseInt(item.Extra.Drawable), parseInt(item.Extra.Texture)) : player.setClothes(info.component, parseInt(item.Extra.Drawable), parseInt(item.Extra.Texture), 2);
//       } else { 
//          info.prop ? 
//             player.setProp(info.component, 0, 255) : player.setClothes(info.component, Clothing.Naked[gender][name], 0, 2);
//       }
//    }

//    let BestTorso = 0
//    if (items['Tops']) { 
//       BestTorso = Torsos[gender][items['Tops'].Extra.Drawable];
//    } else { 
//       BestTorso = Torsos[gender][Clothing.Naked[gender]['Tops']];
//    }

//    player.setClothes(Clothing.Components.Torso, BestTorso, 0, 2);
// };



