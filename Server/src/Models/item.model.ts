

import { itemDescriptions, lang } from '@constants';
import { itemEnums } from '@enums';
import { itemAction } from '@interfaces';


export class items {

   name: string;
   type: itemEnums.type[];
   model: string;
   weight: number;
   description?: string;
   carryModel?: string;
   extraActions?: itemAction[];
   use? (player: PlayerMp, ...params: any): void | any;
   unequip? (player: PlayerMp): void ;

   static list: { [key:string] : items } = {};

   constructor (name: string, type: itemEnums.type[], model: string, weight: number = 0.1, description: string = itemDescriptions.NO_DESCRIPTION) { 
      this.name = name;
      this.type = type;
      this.model = model;
      this.weight = weight;     
      this.description = description;

      items.list[this.name] = this;
   }


   isWeapon () { 
      return this.type.includes(itemEnums.type.WEAPON);
   }

   isCookable () {
      return this.type.includes(itemEnums.type.COOKABLE);
   }

   isStackable () { 
      return this.type.includes(itemEnums.type.STACKABLE);
   }

   isEquipable () {
      return this.type.includes(itemEnums.type.EQUIPABLE);
   }

   isUsable () {
      return this.type.includes(itemEnums.type.USABLE);
   }

   isClothing () {
      return this.type.includes(itemEnums.type.CLOTHING);
   }

   isProp () {
      return this.type.includes(itemEnums.type.PROP);
   }

   isConsumable () {
      return this.type.includes(itemEnums.type.CONSUMABLE);
   }

   availableActions () {
      let actions: itemAction[] = [];

      actions.push(
         { name: lang.itemAction.drop, event: 'CLIENT::ITEM:DROP', icon: 'drop' },
         { name: lang.itemAction.give, event: 'CLIENT::ITEM:GIVE', icon: 'give' }
      );

      if (this.isEquipable()) {
         actions.push( { name: lang.itemAction.EQUIP, event: 'CLIENT::ITEM:EQUIP', icon: 'use' } )
      }

      if (this.isConsumable()) {
         actions.push( { name: lang.itemAction.CONSUME, event: 'CLIENT::ITEM:USE', icon: 'use' } )
      }

      if (this.isUsable() && !actions.find(action => action.name == lang.itemAction.EQUIP)) {
         actions.push( { name: lang.itemAction.use, event: 'CLIENT::ITEM:USE', icon: 'use' } )
      }

      if (this.isStackable()){
         actions.push( { name: lang.itemAction.split, event: 'CLIENT::ITEM:SPLIT', icon: 'split' } );
      } 

      if (this.extraActions) {
         this.extraActions.forEach(action => {
            actions.push( { name: action.name, event: action.event, icon: action.icon } )
         });
      }
      
      return actions;
   }
}


import './items/document.item';
import './items/creditCard.item';
import './items/drink.item';
import './items/food.item';
import './items/ammo.item';
import './items/weapon.item';
import './items/phone.item';
import './items/handheld.radio.item';
import './items/cooker.item';
import './items/med.item';



// Component?: number;
// Consist?: string;
// Hunger?: number;
// Thirst?: number;
// this.Carry_Model = Data.Carry_Model;
// this.Weapon_Hash = Data.Weapon_Hash;
// this.Caliber = Data.Caliber;
// this.Component = Data.Component;
// this.Hunger = Data.Hunger;
// this.Thirst = Data.Thirst;



// /* Clothing */
// new Items('Mask', [Items.Type.Equipable, Items.Type.Clothing], 'prop_michael_balaclava', 0.3, 'Mask for Head');
// new Items('Pants', [Items.Type.Equipable, Items.Type.Clothing], 'prop_ld_jeans_01', 0.2, 'Pants for legs');
// new Items('Bag', [Items.Type.Equipable, Items.Type.Clothing], 'prop_michael_backpack', 0.45, '');
// new Items('Shoes', [Items.Type.Equipable, Items.Type.Clothing], 'v_ret_ps_shoe_01', 0.15);
// new Items('Accesories', [Items.Type.Equipable, Items.Type.Clothing], 'prop_cs_box_clothes', 0.3);
// new Items('Undershirt', [Items.Type.Equipable, Items.Type.Clothing], 'prop_cs_tshirt_ball_01', 0.1);
// new Items('Armour', [Items.Type.Equipable, Items.Type.Clothing], 'prop_bodyarmour_03', 1.25);
// new Items('Tops', [Items.Type.Equipable, Items.Type.Clothing], 'prop_ld_shirt_01', 0.2); 


// /* Props */
// new Items('Hat', [Items.Type.Equipable, Items.Type.Prop], 'prop_ld_hat_01', 0.05);
// new Items('Glasses', [Items.Type.Equipable, Items.Type.Prop], 'xm_prop_x17_b_glasses_01', 0.05);
// new Items('Ears', [Items.Type.Equipable, Items.Type.Prop], 'v_ret_gc_ear01', 0.05);
// new Items('Watch', [Items.Type.Equipable, Items.Type.Prop], 'p_watch_01', 0.1);
// new Items('Bracelet', [Items.Type.Equipable, Items.Type.Prop], 'h4_prop_h4_bracelet_01a', 0.2);







// /* Seeds */
// new Items('Cannabis Seed', [Items.Type.Seed], '', 0.01,);
// new Items('10 Cannabis Seed Pack', [Items.Type.Seed, Items.Type.Openable], 'prop_paper_bag_small', 0.1);
// new Items('Poppy Seed', [Items.Type.Seed], '', 0.01, '');
// new Items('10 Poppy Seed Pack', [Items.Type.Seed, Items.Type.Openable], 'prop_paper_bag_small', 0.1);
// new Items('Tomato Seed', [Items.Type.Seed], '', 0.01, '');
// new Items('10 Tomato Seed Pack', [Items.Type.Seed, Items.Type.Openable], 'prop_paper_bag_small', 0.1);
// new Items('Potato Seed', [Items.Type.Seed], '', 0.01, '');
// new Items('10 Potato Seed Pack', [Items.Type.Seed, Items.Type.Openable], 'prop_paper_bag_small', 0.1);

// /* Plants */
// new Items('Plant Fertilizer', [Items.Type.Misc], 'prop_cs_script_bottle_01', 0.8);


// // MISCELLANEOUS
// new Item('Smartphone', ItemType.Misc, 'prop_amb_phone', 0.2, false, false);
// new Item('Phone', ItemType.Misc, 'prop_v_m_phone_01', 0.2, false, function (player) { });
// new Item('Boombox', ItemType.Misc, 'prop_boombox_01', 0.5, false, function (player) { });
// new Item('Lighter', ItemType.Misc, 'p_cs_lighter_01', 0.05, false, function (player) { });
// new Item('Cigarettes', ItemType.Misc, 'prop_cigar_pack_01', 0.01, false, function (player) { });
// new Item('Rope', ItemType.Misc, 'prop_stag_do_rope', 0.05, false, function (player) { });
// new Item('Jerrycan', ItemType.Misc, 'w_am_jerrycan', 0.4, false, function (player) { });
// new Item('Papers', ItemType.Misc, 'p_cs_papers_01', 0.01, false, function (player) { });
// new Item('Medkit', ItemType.Misc, 'prop_ld_health_pack', 0.6, false, function (player) { });
// new Item('Handcuffs', ItemType.Misc, 'prop_cs_cuffs_01', 0.2, false, function (player) { });
// new Item('Toolbox', ItemType.Misc, 'v_ind_cs_toolbox2', 0.8, false, function (player) { });
// new Item('Fishing Rod', ItemType.Misc, 'prop_fishing_rod_01', 0.5, false, function (player) { });
// new Item('Fish Bait', ItemType.Misc, 'ng_proc_paintcan02a', 0.3, false, function (player) { });
// new Item('Baking Soda', ItemType.Misc, 'bkr_prop_coke_bakingsoda', 0.6, false, function (player) { });
// new Item('Hydrochloric Acid', ItemType.Misc, 'bkr_prop_meth_sacid', 0.6, false, function (player) { });


// // OPENABLE
// new Item('Pack of Beers', ItemType.Openable, 'v_ret_ml_beerpis1', 1.2, { quantity: 6, inside: 'Beer Bottle' }, function (player) { });


// // AMMUNITION
// new Item('9mm Ammo', ItemType.Ammo, 'prop_ld_ammo_pack_01', 0.9, false, function (player) { });
// new Item('5.56×45mm Ammo', ItemType.Ammo, 'prop_ld_ammo_pack_03', 1.05, false, function (player) { });
// new Item('12ga Slug Ammo', ItemType.Ammo, 'prop_ld_ammo_pack_02', 0.9, false, function (player) { });




// // mp.ItemRegistry = {};


// module.exports = { ItemType, ItemEntities, ItemRegistry };
