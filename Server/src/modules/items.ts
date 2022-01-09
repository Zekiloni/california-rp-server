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

      'SERVER::ITEM:DROP': async (playeR: PlayerMp, item: Items, position: string) => { 
         
      }
   }
);