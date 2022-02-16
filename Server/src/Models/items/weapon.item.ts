
import { items } from '../item.model';
import { inventories  } from '../inventory.model';
import { itemEnums } from "@enums";
import { itemDescriptions, itemNames } from '@constants';


import './ammo.item';


export const weaponType = [
   itemEnums.type.USABLE, 
   itemEnums.type.WEAPON,
   itemEnums.type.EQUIPABLE
];


export class weaponItem extends items {
   weapon_hash: string;
   caliber: items | null;
   ammo?: number;
   
   constructor (name: string, model: string, weapHash: string, cal: items | null, ammo?: number, type?: itemEnums.type[], weight: number = 0.35, description?: string ) { 
      super (name, type ? weaponType.concat(type) : weaponType, model, weight, description);

      this.weapon_hash = weapHash;
      this.caliber = cal;
      this.ammo = ammo;
   }
   
   async use (player: PlayerMp, item: inventories) {
      if (this.caliber) {
         player.giveWeapon(
            mp.joaat(this.weapon_hash),
            item.data.ammo ? item.data.ammo : 0
         );
      } else { 
         player.giveWeapon(
            mp.joaat(this.weapon_hash),
            this.ammo ? this.ammo : 1
         );
      }
      await item.save();
   }
}


new weaponItem(itemNames.WEAPON_FLASHLIGHT, 'w_me_flashlight', 'weapon_flashlight', null, 1, 
   [itemEnums.type.MISC, itemEnums.type.ELECTRONIC_DEVICE, itemEnums.type.TOOL],
   0.15, itemDescriptions.WEAPON_FLASHLIGHT
);

new weaponItem(itemNames.WEAPON_KNIFE, 'w_me_knife_01', 'weapon_knife', null, 1, [itemEnums.type.WEAPON_MELEE], 0.2, itemDescriptions.WEAPON_KNIFE);

new weaponItem(itemNames.WEAPON_CROWBAR, 'w_me_crowbar', 'weapon_crowbar', null, 1, 
   [itemEnums.type.WEAPON_MELEE, itemEnums.type.MISC, itemEnums.type.TOOL],
   0.3, itemDescriptions.WEAPON_CROWBAR
);

new weaponItem(itemNames.WEAPON_HAMMER, 'w_me_hammer', 'weapon_hammer', null, 1, 
   [itemEnums.type.WEAPON_MELEE, itemEnums.type.MISC, itemEnums.type.TOOL],
   0.25, itemDescriptions.WEAPON_HAMMER
);

new weaponItem(itemNames.WEAPON_NIGHTSTICK, 'w_me_nightstick', 'weapon_nightstic', null, 1, [itemEnums.type.WEAPON_MELEE], 0.245, itemDescriptions.WEAPON_NIGHTSTICK);

new weaponItem(itemNames.WEAPON_MACHETE, 'prop_ld_w_me_machette', 'weapon_machete', null, 1, 
   [itemEnums.type.WEAPON_MELEE, itemEnums.type.WEAPON_DEADLY],
   0.45, itemDescriptions.WEAPON_MACHETE
);

new weaponItem(itemNames.WEAPON_HATCHET, 'w_me_hatchet', 'weapon_hatchet', null, 1, 
   [itemEnums.type.MISC, itemEnums.type.TOOL, itemEnums.type.WEAPON_MELEE],
   0.525, itemDescriptions.WEAPON_HATCHET
);

new weaponItem(itemNames.WEAPON_SWITCHBLADE, 'w_me_switchblade', 'weapon_switchblade', null, 1, 
   [itemEnums.type.WEAPON_MELEE, itemEnums.type.WEAPON_DEADLY],
   0.075, itemDescriptions.WEAPON_SWITCHBLADE
);

new weaponItem(itemNames.WEAPON_KNUCKLE, 'w_me_knuckle_dmd', 'weapon_knuckle', null, 1, [itemEnums.type.WEAPON_MELEE], 0.125, itemDescriptions.WEAPON_KNUCKLE);

new weaponItem(itemNames.WEAPON_WRENCH, 'w_me_wrench', 'weapon_wrench', null, 1, [itemEnums.type.WEAPON_MELEE], 0.375, itemDescriptions.WEAPON_WRENCH);

new weaponItem(itemNames.WEAPON_STUNGUN, 'w_pi_stungun', 'weapon_stungun', null, 12, 
   [itemEnums.type.WEAPON_MELEE, itemEnums.type.ELECTRONIC_DEVICE], 
   0.215, itemDescriptions.WEAPON_STUNGUN
);