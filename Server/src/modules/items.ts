import { Messages } from '../globals/constants';
import { itemData } from '../globals/enums';
import { itemAction } from '../globals/interfaces';
import Items from '../models/inventory.item.model';
import { baseItem } from '../models/item.model';




mp.events.addProc(
   {

      'SERVER::PLAYER:ITEMS:GET': async (player: PlayerMp) => { 
         return Items.getItems(itemData.Entity.PLAYER, player.Character.id);
      },


      'SERVER::ITEM:INFO': (player: PlayerMp, itemName: string) => { 
         const item = baseItem.list[itemName];
         const actions: itemAction[] = [];

         actions.push(
            { name: Messages.ITEM_ACTION.USE, event: 'CLIENT::ITEM:USE', icon: 'use' },
            { name: Messages.ITEM_ACTION.DROP, event: 'CLIENT::ITEM:DROP', icon: 'drop' },
            { name: Messages.ITEM_ACTION.GIVE, event: 'CLIENT::ITEM:GIVE', icon: 'give' },
         );

         if (item.isStackable()) actions.push({ name: Messages.ITEM_ACTION.SPLIT, event: 'CLIENT::ITEM:SPLIT', icon: 'split' });

         return { info: item, actions: actions };
      },

      
      'SERVER::ITEM:USE': async (player: PlayerMp, itemId: number): Promise<Items[]> => { 
         return new Promise((resolve) => { 
            Items.findOne({ where: { id: itemId } }).then(async item => { 
               const rItem = baseItem.list[item?.name!];
               await rItem?.use!(player, item);

               const newInventory = await Items.getItems(itemData.Entity.PLAYER, player.Character.id);
               if (newInventory) resolve(newInventory)
            })
         });
      },

      'SERVER::ITEM:DROP': async (player: PlayerMp, itemId: number, positionString: string): Promise<Items[]> => { 
         return new Promise((resolve) => { 
            Items.findOne({ where: { id: itemId } }).then(async item => { 

               const groundPosition = JSON.parse(positionString);
               const { position, rotation } = groundPosition;

               item!.owner = 0;
               item!.on_ground = true;
               item!.dimension = player.dimension;
               item!.fingerprint = player.Character.id;
               item!.position = new mp.Vector3(position.x, position.y, position.z);
               item!.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z);
               
               await item?.save();
               
               const newInventory = await Items.getItems(itemData.Entity.PLAYER, player.Character.id);
               if (newInventory) resolve(newInventory);
            });
         });
      },

      'SERVER::ITEM:PICKUP': (player: PlayerMp, itemId: number) => { 
         return new Promise((resolve) => { 
            Items.findOne({ where: { id: itemId } }).then(async item => { 
               await item?.dropItem(player);      
               const newInventory = await Items.getItems(itemData.Entity.PLAYER, player.Character.id);
               if (newInventory) resolve(newInventory);   
            });
         })
      }
   }
);