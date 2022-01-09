

import { adminLevel, commandData } from '../../globals/enums';
import Items from '../../models/inventory.item.model';
import { baseItem } from '../../models/item.model';
import { Commands } from '../commands';


Commands[commandData.Names.ITEMS] = { 
   Desc: commandData.Descriptions.items,
   Call: (player: PlayerMp) => { 
      console.log(baseItem.list);
   }
}


Commands[commandData.Names.GIVE_ITEM] ={
   Desc: commandData.Descriptions.giveItem,
   Admin: adminLevel.SENIOR_ADMIN,
   Call: (player: PlayerMp, targetSearch: any, itemName: string, quantity: number) => { 
      if (baseItem.list[itemName]) {
         const foundItem = baseItem.list[itemName];
         const target = mp.players.find(targetSearch);
         if (!target) return; // no target found
         Items.giveItem(player, target, foundItem, quantity);

      } else { 
         // that item doesnt exist
      }
   }
}


Commands[commandData.Names.CLEAR_INVENTORY] = { 
   Desc: commandData.Descriptions.clearInventory,
   Call: (player: PlayerMp, target: any) => { 
      
   }
}


// module.exports = {
//    commands: [

//       {
//          name: 'itemlist',
//          admin: 2,
//          call: (player, args) => {
//             let items = '';
//             for (const i in ItemRegistry) {
//                const Item = ItemRegistry[i];
//                if (Item.type != ItemType.Weapon) items += i + ', ';
//             }
//             player.SendMessage(items, frp.Globals.Colors.info);
//          }
//       },

      
//       {
//          name: 'testitems', // TEST CMD
//          admin: 2,
//          call: (player, args) => {
//             for (const i in ItemRegistry) {
//                const Item = ItemRegistry[i];
//                if (Item.type != ItemType.Weapon) {
//                   frp.Items.New(Item.name, 1, 0, player.character);
//                }
//             }
//          }
//       },

//       {
//          name: 'createitem',
//          admin: 3,
//          params: ['kolicina', 'predmet'],
//          call: (player, args) => {
//             let Quantity = args[0];
//             const Item = args.slice(1).join(' ');
//             let Position = { x: player.position.x, y: player.position.y, z: player.position.z - 0.9 };
//             if (ItemRegistry[Item]) {
//                frp.Items.New(Item, Quantity, ItemEntities.Ground, 0, Position, { x: 0, y: 0, z: 0 }, player.dimension);
//             }
//          }
//       },

//       {
//          name: 'giveitem',
//          admin: 3,
//          params: ['igrac', 'kolicina', 'predmet'],
//          call: (player, args) => {
//             const [toGive, quantity] = args;
//             const Item = args.slice(2).join(' ');
//             const Target = mp.players.find(toGive);
//             if (Target && ItemRegistry[Item]) frp.Items.New(Item, quantity, ItemEntities.Player, Target.character);
//          }
//       },

//       {
//          name: 'clearinventory',
//          admin: 3,
//          params: ['igrac'],
//          call: (player, args) => {
//             const [toDelete] = args;
//             const Target = mp.players.find(toDelete);
//             frp.Items.Clear(Target);
//          }
//       }
//    ]
// };
