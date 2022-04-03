
import { BaseItem } from '../item.model';
import { inventories  } from '../inventory.model';
import { ItemEnums } from "@enums";
import { itemDescriptions, itemNames } from '@constants';


import './ammo.item';


export const weaponType = [
   ItemEnums.type.USABLE, 
   ItemEnums.type.WEAPON,
   ItemEnums.type.EQUIPABLE
];


export class WeaponItem extends BaseItem {
   weapon_hash: string;
   caliber: BaseItem | null;
   ammo?: number;
   
   constructor (name: string, model: string, weapHash: string, cal: BaseItem | null, ammo?: number, type?: ItemEnums.type[], weight: number = 0.35, description?: string ) { 
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

// primary 
new WeaponItem(itemNames.WEAPON_FLASHLIGHT, 'w_me_flashlight', 'weapon_flashlight', null, 1, 
   [ItemEnums.type.MISC, ItemEnums.type.ELECTRONIC_DEVICE, ItemEnums.type.TOOL],
   0.15, itemDescriptions.WEAPON_FLASHLIGHT
);

// secondary 

// misc

// mele


new WeaponItem(itemNames.WEAPON_KNIFE, 'w_me_knife_01', 'weapon_knife', null, 1, [ItemEnums.type.WEAPON_MELEE], 0.2, itemDescriptions.WEAPON_KNIFE);

new WeaponItem(itemNames.WEAPON_CROWBAR, 'w_me_crowbar', 'weapon_crowbar', null, 1, 
   [ItemEnums.type.WEAPON_MELEE, ItemEnums.type.MISC, ItemEnums.type.TOOL],
   0.3, itemDescriptions.WEAPON_CROWBAR
);

new WeaponItem(itemNames.WEAPON_HAMMER, 'w_me_hammer', 'weapon_hammer', null, 1, 
   [ItemEnums.type.WEAPON_MELEE, ItemEnums.type.MISC, ItemEnums.type.TOOL],
   0.25, itemDescriptions.WEAPON_HAMMER
);

new WeaponItem(itemNames.WEAPON_NIGHTSTICK, 'w_me_nightstick', 'weapon_nightstic', null, 1, [ItemEnums.type.WEAPON_MELEE], 0.245, itemDescriptions.WEAPON_NIGHTSTICK);

new WeaponItem(itemNames.WEAPON_MACHETE, 'prop_ld_w_me_machette', 'weapon_machete', null, 1, 
   [ItemEnums.type.WEAPON_MELEE, ItemEnums.type.WEAPON_DEADLY],
   0.45, itemDescriptions.WEAPON_MACHETE
);

new WeaponItem(itemNames.WEAPON_HATCHET, 'w_me_hatchet', 'weapon_hatchet', null, 1, 
   [ItemEnums.type.MISC, ItemEnums.type.TOOL, ItemEnums.type.WEAPON_MELEE],
   0.525, itemDescriptions.WEAPON_HATCHET
);

new WeaponItem(itemNames.WEAPON_SWITCHBLADE, 'w_me_switchblade', 'weapon_switchblade', null, 1, 
   [ItemEnums.type.WEAPON_MELEE, ItemEnums.type.WEAPON_DEADLY],
   0.075, itemDescriptions.WEAPON_SWITCHBLADE
);

new WeaponItem(itemNames.WEAPON_KNUCKLE, 'w_me_knuckle_dmd', 'weapon_knuckle', null, 1, [ItemEnums.type.WEAPON_MELEE], 0.125, itemDescriptions.WEAPON_KNUCKLE);

new WeaponItem(itemNames.WEAPON_WRENCH, 'w_me_wrench', 'weapon_wrench', null, 1, [ItemEnums.type.WEAPON_MELEE], 0.375, itemDescriptions.WEAPON_WRENCH);

new WeaponItem(itemNames.WEAPON_STUNGUN, 'w_pi_stungun', 'weapon_stungun', null, 12, 
   [ItemEnums.type.WEAPON_MELEE, ItemEnums.type.ELECTRONIC_DEVICE], 
   0.215, itemDescriptions.WEAPON_STUNGUN
);



