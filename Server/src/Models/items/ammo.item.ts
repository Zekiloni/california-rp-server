import { itemData, logType } from '../../globals/enums';
import Items from '../inventory.item.model';
import { baseItem, noDesc } from '../item.model';
import weaponData from '../../data/weapon.data.json';
import { weapons } from './weapon.item';
import { Logger } from '../../utils';


type weaponData = { [key: string]: any }


export class ammoItem extends baseItem {
   clipSize: number;
   
   constructor (name: string, model: string, bullets: number, weight: number = 0.1, description: string = noDesc) { 
      super (name, [itemData.Type.USABLE, itemData.Type.STACKABLE, itemData.Type.AMMO, itemData.Type.MISC], model, weight, description);
      this.clipSize = bullets;
      
      this.use = async function (player: PlayerMp, item: Items) {

         if (!player.weapon) { 
            // ERROR: No weapon
            return;
         }


         const ww = weapons.find(
            weapon => weapon.weapon_hash == (<weaponData>weaponData)[player.weapon].HashKey.toLowerCase()
         )!;
      
         const weaponItem = await Items.findOne(
            { 
               where: { 
                  owner: player.Character.id, 
                  name: ww.name, 
                  equiped: true
               } 
            }
         );

         if (!weaponItem) { 
            Logger(logType.ERROR, 'updating weapon exception.');
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



new ammoItem(itemData.Names.AMMO_9MM, 'prop_box_ammo07b', 10, 0.3, 'sarzer 9mm 10 metkova');