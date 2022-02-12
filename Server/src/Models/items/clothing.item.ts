

import { items } from '../item.model';
import { inventories  } from '@models';
import { itemEnums } from "@enums";
import { itemNames } from '@constants/items';

const clothingType = [
   itemEnums.type.CLOTHING,
   itemEnums.type.USABLE,
]


export class clothingItem extends items {

   static clothings: clothingItem[] = [];
   static props: clothingItem[] = [];

   component: itemEnums.components.clothings | itemEnums.components.props;
   naked: number[] = [0, 0];
   prop: boolean;
   
   constructor (name: string, type: itemEnums.type[], model: string, component: number, naked: number[], weight: number = 0.1, description?: string) { 
      super (name, [...type], model, weight, description);
      this.component = component;
      this.naked = naked;
      
      if (!this.prop) {
         clothingItem.clothings.push(this);
      } else {
         clothingItem.props.push(this);
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

         if (this.component == itemEnums.components.clothings.TOP || this.component == itemEnums.components.clothings.UNDERSHIRT) {
            const bestTorso = await player.callProc('CLIENT::GET:BEST_TORSO');
            player.setClothes(itemEnums.components.clothings.TORSO, bestTorso, 0, 2);      
         }     
      }

      await item.update( { equiped: true } );
   };

   async unequip (player: PlayerMp) {
      player.setClothes(this.component, this.naked[player.character.gender], 0, 2);    

      if (this.component == itemEnums.components.clothings.TOP) {
         
         inventories.findOne( { where: { entity: itemEnums.entity.PLAYER, owner: player.character.id, equiped: true, name: itemNames.CLOTHING_UNDERSHIRT } } ).then(async undershirt => {
            if (!undershirt) {
               return;
            }

            undershirt.equiped = false;
            await undershirt.save();
            
            items.list[undershirt.name].unequip!(player);
         })

         const bestTorso = await player.callProc('CLIENT::GET:BEST_TORSO');
         player.setClothes(itemEnums.components.clothings.TORSO, bestTorso, 0, 2);
      }    
   }
};

new clothingItem(itemNames.CLOTHING_MASK, clothingType, 'a', itemEnums.components.clothings.MASK, [0, 0], 0.125, 'Mask.');
new clothingItem(itemNames.CLOTHING_LEGS, clothingType, 'a', itemEnums.components.clothings.LEGS, [18, 15], 0.125, 'Legs.');
new clothingItem(itemNames.CLOTHING_BAG, clothingType, 'a', itemEnums.components.clothings.BAG, [0, 0], 0.125, 'Bag.');
new clothingItem(itemNames.CLOTHING_SHOES, clothingType, 'a', itemEnums.components.clothings.SHOES, [34, 35], 0.125, 'Shoes.');
new clothingItem(itemNames.CLOTHING_ACCESSORIES, clothingType, 'a', itemEnums.components.clothings.ACCESSORIES, [0, 0], 0.125, 'acc.');
new clothingItem(itemNames.CLOTHING_UNDERSHIRT, clothingType, 'a', itemEnums.components.clothings.UNDERSHIRT, [15, 15], 0.125, 'undershirt.');
new clothingItem(itemNames.CLOTHING_BODY_ARMOUR, clothingType, 'a', itemEnums.components.clothings.BODY_ARMOUR,[0, 0],  0.125, 'body armour.');
new clothingItem(itemNames.CLOTHING_DECAL, clothingType, 'a', itemEnums.components.clothings.DECALS, [0, 0], 0.125, 'decal.');
new clothingItem(itemNames.CLOTHING_TOP, clothingType, 'a', itemEnums.components.clothings.TOP, [15, 15], 0.125, 'top');

