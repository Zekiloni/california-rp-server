

import { items } from '../item.model';
import { inventories, logs} from '@models';
import { ItemEnums } from '@enums';
import { itemDescriptions, itemNames } from '@constants';
import weaponData from '../../configs/weapon.data.json';



export class ammoItem extends items {
   clipSize: number;
   
   constructor (name: string, model: string, bullets: number, weight: number = 0.1, description?: string) { 
      super (name, [ItemEnums.type.USABLE, ItemEnums.type.STACKABLE, ItemEnums.type.AMMO, ItemEnums.type.MISC], model, weight, description);
      this.clipSize = bullets;
      
      this.use = async function (player: PlayerMp, item: inventories) {
         if (!player.weapon) { 
            logs.error('ammoUse: noWeapon');
            return;
         }

         //@ts-ignore
         const weapon = weaponData[player.weapon.toString()];
      
         const weaponItem = await inventories.findOne(
            { 
               where: { 
                  owner: player.character.id, 
                  //@ts-ignore
                  name: weapon.Name, 
                  equiped: true
               } 
            }
         );

         if (!weaponItem) { 
            logs.error('updateWeapon: noWeapon');
            return;
         }
         
         let ammo = player.getWeaponAmmo(player.weapon);
         player.setWeaponAmmo(player.weapon, ammo + this.clipSize);

         if (weaponItem.data.ammo) {
            weaponItem.data.ammo = (ammo + this.clipSize);
         } else { 
            weaponItem.data = { 
               ammo: (ammo + this.clipSize) 
            };
         }

         await item.destroy();
         await weaponItem.save()
      };
   }
};


new ammoItem(itemNames.AMMO_9MM, 'prop_ld_ammo_pack_01', 18, 0.25, '18x ' + itemNames.AMMO_9MM + itemDescriptions.AMMO_9MM);
new ammoItem(itemNames.AMMO_556, 'prop_ld_ammo_pack_03', 30, 0.325, '30x ' + itemNames.AMMO_556 + itemDescriptions.AMMO_556);
new ammoItem(itemNames.AMMO_762, 'prop_ld_ammo_pack_03', 30, 0.315, '30x ' + itemNames.AMMO_762 + itemDescriptions.AMMO_762);
new ammoItem(itemNames.AMMO_357, 'prop_box_ammo07b', 6, 0.4, '6x ' + itemNames.AMMO_357 + itemDescriptions.AMMO_357);
new ammoItem(itemNames.AMMO_50CAL, 'prop_box_ammo06a', 5, 0.45, '5x ' + itemNames.AMMO_50CAL + itemDescriptions.AMMO_50CAL);
new ammoItem(itemNames.AMMO_12GAUGE, 'prop_ld_ammo_pack_02', 8, 0.3, '8x ' + itemNames.AMMO_12GAUGE + itemDescriptions.AMMO_50CAL);
