import { itemData } from '../globals/enums';
import Items from '../models/inventory.item.model';
import { baseItem } from '../models/item.model';




mp.events.addProc(
   {
      'SERVER::PLAYER:ITEMS:GET': async (player: PlayerMp) => { 
         return Items.getItems(itemData.Entity.PLAYER, player.Character.id);
      },

      'SERVER::ITEM:INFO': (player: PlayerMp, itemName: string) => { 
         return baseItem.List[itemName];
      }
   }
);