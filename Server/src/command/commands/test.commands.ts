import { animations } from "@configs";
import { Lang, cmds } from "@constants";
import { notifications } from "@enums";
import { Commands } from "../command.Handler";
import { shared_Data } from "@shared";
import { Items } from "src/vehicles";


Commands['uniform'] = {
   description: 'uniforma',
   call (player: PlayerMp) {
      player.setClothes(7, 126, 0, 2);
      player.setClothes(4, 96, 0, 2);
      player.setClothes(11, 250, 0, 2);
      player.setClothes(3, 0, 0, 2);
      player.setClothes(8, 15, 0, 2);
      player.setClothes(6, 25, 0, 2);

   }
}

Commands['ring'] = {
   description: 'ring',
   call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         return;
      }

      target.setVariable(shared_Data.PHONE_CALL, [true, 324252, false]);
   } 
};


Commands['nigger'] = {
   description: '',
   call (player: PlayerMp) {
      let shootingItems = [];
      
      for (const i in Items.list) {
         const item = Items.list[i];

         if (item.model) {
            shootingItems.push( { name: i, model: item.model } );
         }
      }

      player.call('MIDNIGHT:ITEM+PHOTOSHOOTING', [shootingItems]);
   }
}

Commands['of1'] = {
   description: 'uniforma',
   call (player: PlayerMp) {
      player.setClothes(11, 97, 0, 2);
      player.setClothes(8, 15, 0, 2);
      player.setClothes(4, 47, 0, 2);
      player.setClothes(6, 31, 0, 2);
   }
}

Commands['of2'] = {
   description: 'uniforma',
   call (player: PlayerMp) {
      player.setClothes(11, 143, 0, 2);
      player.setClothes(8, 15, 0, 2);
      player.setClothes(4, 55, 0, 2);
      player.setClothes(6, 48, 0, 2);
   }
}


Commands['prospect'] = {
   description: 'test prospect.',
   call (player: PlayerMp, targetSearch: string) {
      player.call('CLIENT::PROSPECTING_INITIALIZE', [
         [
            { item: 'Raw Gold', position: new mp.Vector3(1800.6885986328125, 4534.62255859375, 33.09663) },
            { item: 'Iron Ingot', position: new mp.Vector3(1787.94189453125, 4533.68896484375, 34.539356) },
            { item: 'Diamond', position: new mp.Vector3(1789.89306640625, 4522.65478515625, 32.968578) },
            { item: 'Diamond', position: new mp.Vector3(1796.8463134765625, 4552.44921875, 35.552318) }
         ]
      ]);
   }
}