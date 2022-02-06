

import { AfterCreate, AfterDestroy, AfterSave, AfterSync, AutoIncrement, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
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


   @AfterSync
   static loading () {
      inventories.findAll( { where: { on_ground: true } } ).then(items => {
         items.forEach(item => {
            item.refresh();
         })
      });
   }

   @AfterCreate
   static async creating (item: inventories) { 
      item.refresh();
      
      const rItem = items.list[item.name];

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
         this.object = mp.objects.new(items.list[this.name].model, this.position, { alpha: 255, rotation: this.rotation, dimension: this.dimension });
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

   static giveItem (player: PlayerMp, item: items) { 
      inventories.create( { name: item.name, entity: itemEnums.entity.PLAYER, owner: player.character.id } );
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



