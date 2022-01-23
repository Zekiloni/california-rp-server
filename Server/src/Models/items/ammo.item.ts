import { itemData } from '../../globals/enums';
import Items from '../inventory.item.model';
import { baseItem, noDesc } from '../item.model';
import weaponData from '../../data/weapon.data.json';
import { weapons } from './weapon.item';


type weaponData = { [key: string]: any }


export class ammoItem extends baseItem {
   clipSize: number;
   
   constructor (name: string, model: string, bullets: number, weight: number = 0.1, description: string = noDesc) { 
      super (name, [itemData.Type.AMMO, itemData.Type.MISC], model, weight, description);
      this.clipSize = bullets;
      
      this.use = async function (player: PlayerMp, item: Items) {

         if (!player.weapon) { 
            // no weapon in hand
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
                  status: itemData.Status.EQUIPED 
               } 
            }
         );

         if (!weaponItem) { 
            // no weapon
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

         console.log(ww);

         console.log('Ammo ' + ammo + ', new ammo ' + (ammo + this.clipSize));

         await weaponItem.save()
  
      };
   }
};



new ammoItem(itemData.Names.AMMO_9MM, 'prop_box_ammo07b', 10, 0.3, 'sarzer 9mm 10 metkova');