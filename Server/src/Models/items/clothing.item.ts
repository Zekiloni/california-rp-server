

import { items } from '../item.model';
import { inventories  } from '@models';
import { itemEnums } from "@enums";
import { itemNames } from '@constants/items';



export class clothingItem extends items {

   static _list: clothingItem[] = [];

   component: itemEnums.components.clothings | itemEnums.components.props;
   naked: number[] = [0, 0];
   prop: boolean;
   
   constructor (name: string, type: itemEnums.type[], model: string, component: number, naked: number[], weight: number = 0.1, description?: string) { 
      super (name, [...type], model, weight, description);
      this.component = component;
      this.naked = naked;
      
      clothingItem._list.push(this);
   }

   async use (player: PlayerMp, item: inventories) {
      inventories.findOne( { where: { owner: player.character.id, equiped: true, name: this.name } } ).then(async already => {
         if (!already) {
            return;
         }
         
        await already.update( { equiped: false } );
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
};

new clothingItem(itemNames.CLOTHING_MASK, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.MASK, [0, 0], 0.125, 'Mask.');
new clothingItem(itemNames.CLOTHING_LEGS, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.LEGS, [18, 15], 0.125, 'Legs.');
new clothingItem(itemNames.CLOTHING_BAG, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.BAG, [0, 0], 0.125, 'Bag.');
new clothingItem(itemNames.CLOTHING_SHOES, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.SHOES, [34, 35], 0.125, 'Shoes.');
new clothingItem(itemNames.CLOTHING_ACCESSORIES, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.ACCESSORIES, [0, 0], 0.125, 'acc.');
new clothingItem(itemNames.CLOTHING_UNDERSHIRT, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.UNDERSHIRT, [15, 15], 0.125, 'undershirt.');
new clothingItem(itemNames.CLOTHING_BODY_ARMOUR, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.BODY_ARMOUR,[0, 0],  0.125, 'body armour.');
new clothingItem(itemNames.CLOTHING_DECAL, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.DECALS, [0, 0], 0.125, 'decal.');
new clothingItem(itemNames.CLOTHING_TOP, [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.TOP, [15, 15], 0.125, 'top');

