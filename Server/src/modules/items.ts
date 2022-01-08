import { itemData } from '../globals/enums';
import Items from '../models/inventory.item.model';




mp.events.addProc(
   {
      'SERVER::PLAYER:ITEMS:GET': async (player: PlayerMp) => { 
         return Items.getItems(itemData.Entity.Player, player.Character.id);
      }
   }
);