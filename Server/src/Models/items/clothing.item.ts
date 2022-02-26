

import { items } from '../item.model';
import { inventories  } from '@models';
import { ItemEnums } from "@enums";
import { itemNames } from '@constants';

const clothingType = [
   ItemEnums.type.CLOTHING,
   ItemEnums.type.USABLE,
];

const propType = [
   ItemEnums.type.PROP,
   ItemEnums.type.USABLE
];


export class ClothingItem extends items {

   static clothings: ClothingItem[] = [];
   static props: ClothingItem[] = [];

   component: ItemEnums.components.clothings | ItemEnums.components.props;
   naked: number[] = [0, 0];
   prop?: boolean;
   
   constructor (name: string, type: ItemEnums.type[], model: string, component: number, weight: number = 0.1, description?: string, naked?: number[]) { 
      super (name, [...type], model, weight, description);
      this.component = component;
      
      if (!this.prop) {
         ClothingItem.clothings.push(this);
      } else {
         ClothingItem.props.push(this);
      }
   }

   async use (player: PlayerMp, item: inventories) {
      inventories.findOne( { where: { owner: player.character.id, equiped: true, name: this.name } } ).then(async already => {
         if (!already) {
            return;
         }
      });

      if (this.prop) { 
         player.setProp(this.component, item.data.drawable!, item.data.texture || 0);
      } else { 
         player.setClothes(this.component, item.data.drawable!, item.data.texture || 0, 2);    

         if (this.component == ItemEnums.components.clothings.TOP || this.component == ItemEnums.components.clothings.UNDERSHIRT) {
            const bestTorso = await player.callProc('CLIENT::GET:BEST_TORSO');
            player.setClothes(ItemEnums.components.clothings.TORSO, bestTorso, 0, 2);      
         }     
      }

      await item.update( { equiped: true } );
   };

   async unequip (player: PlayerMp) {
      player.setClothes(this.component, this.naked[player.character.gender], 0, 2);    

      if (this.component == ItemEnums.components.clothings.TOP) {
         
         inventories.findOne( { where: { entity: ItemEnums.entity.PLAYER, owner: player.character.id, equiped: true, name: itemNames.CLOTHING_UNDERSHIRT } } ).then(async undershirt => {
            if (!undershirt) {
               return;
            }

            undershirt.equiped = false;
            await undershirt.save();
            
            items.list[undershirt.name].unequip!(player);
         })

         const bestTorso = await player.callProc('CLIENT::GET:BEST_TORSO');
         player.setClothes(ItemEnums.components.clothings.TORSO, bestTorso, 0, 2);
      }    
   }
};


new ClothingItem(itemNames.CLOTHING_MASK, clothingType, 'prop_michael_balaclava', ItemEnums.components.clothings.MASK, 0.125, 'Mask.', [0, 0]);
new ClothingItem(itemNames.CLOTHING_LEGS, clothingType, 'prop_ld_jeans_01', ItemEnums.components.clothings.LEGS, 0.125, 'Legs.', [18, 15]);
new ClothingItem(itemNames.CLOTHING_SHOES, clothingType, 'v_ret_ps_shoe_01', ItemEnums.components.clothings.SHOES, 0.125, 'Shoes.', [34, 35]);
new ClothingItem(itemNames.CLOTHING_ACCESSORIES, clothingType, 'prop_cs_box_clothes', ItemEnums.components.clothings.ACCESSORIES, 0.125, 'acc.', [0, 0]);
new ClothingItem(itemNames.CLOTHING_UNDERSHIRT, clothingType, 'prop_cs_tshirt_ball_01', ItemEnums.components.clothings.UNDERSHIRT, 0.125, 'undershirt.', [15, 15]);
new ClothingItem(itemNames.CLOTHING_BODY_ARMOUR, clothingType, 'prop_bodyarmour_03', ItemEnums.components.clothings.BODY_ARMOUR, 0.125, 'body armour.', [0, 0]);
new ClothingItem(itemNames.CLOTHING_DECAL, clothingType, 'hei_prop_drug_statue_base_01', ItemEnums.components.clothings.DECALS, 0.025, 'decal.', [0, 0]);
new ClothingItem(itemNames.CLOTHING_TOP, clothingType, 'prop_ld_shirt_01', ItemEnums.components.clothings.TOP, 0.225, 'top', [15, 15]);


new ClothingItem(itemNames.PROP_HAT, propType, 'prop_ld_hat_01', ItemEnums.components.props.HAT, 0.3, '').prop = true;
new ClothingItem(itemNames.PROP_GLASSES, propType, 'xm_prop_x17_b_glasses_01', ItemEnums.components.props.GLASSES, 0.3, '').prop = true;
new ClothingItem(itemNames.PROP_EARS, propType, 'v_ret_gc_ear01', ItemEnums.components.props.EAR_ACCESSORY, 0.3, '').prop = true;
new ClothingItem(itemNames.PROP_WATCH, propType, 'p_watch_01', ItemEnums.components.props.WATCH, 0.3, '').prop = true;
new ClothingItem(itemNames.PROP_BRACELET, propType, 'h4_prop_h4_bracelet_01a', ItemEnums.components.props.BRACELET, 0.3, '').prop = true;
