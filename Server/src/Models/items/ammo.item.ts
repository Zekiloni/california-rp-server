

import { items } from '../item.model';
import { inventories, logs} from '@models';
import { itemEnums } from '@enums';
import { itemNames } from '@constants';


type weaponData = { [key: string]: any }


export class ammoItem extends items {
   clipSize: number;
   
   constructor (name: string, model: string, bullets: number, weight: number = 0.1, description?: string) { 
      super (name, [itemEnums.type.USABLE, itemEnums.type.STACKABLE, itemEnums.type.AMMO, itemEnums.type.MISC], model, weight, description);
      this.clipSize = bullets;
      
      this.use = async function (player: PlayerMp, item: inventories) {

         if (!player.weapon) { 
            // ERROR: No weapon
            return;
         }


         const weapon = await player.call('CLIENT::WEAPON:NAME', [player.weapon]);

         logs.info('Weapon Name ' + weapon + ', player ' + player.name);
      
         const weaponItem = await inventories.findOne(
            { 
               where: { 
                  owner: player.character.id, 
                  name: <string>weapon!, 
                  equiped: true
               } 
            }
         );

         if (!weaponItem) { 
            logs.error('updateWeapon: No weapon');
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

         if (item.quantity > 1) { 
            item.increment('quantity', { by: -1 } );
         } else { 
            item.destroy();
         }

         await weaponItem.save()
      };
   }
};



new ammoItem(itemNames.AMMO_9MM, 'prop_box_ammo07b', 10, 0.3, 'sarzer 9mm 10 metkova');