

import { items } from '../item.model';
import { inventories  } from '@models';
import { itemEnums } from "@enums";



export class clothingItem extends items {
   component: itemEnums.components.clothings | itemEnums.components.props;
   prop: boolean;
   
   constructor (name: string, type: itemEnums.type[], model: string, component: number, weight: number = 0.1, description?: string) { 
      super (name, [...type], model, weight, description);
      this.component = component;
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
         // ... set best torso
      }

      await item.update( { equiped: true } );
   };
};

new clothingItem('Mask', [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.MASK, 0.125, 'Maskata za na glavata.');
new clothingItem('Mask', [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.MASK, 0.125, 'Maskata za na glavata.');
new clothingItem('Mask', [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.MASK, 0.125, 'Maskata za na glavata.');
new clothingItem('Mask', [itemEnums.type.CLOTHING], 'a', itemEnums.components.clothings.MASK, 0.125, 'Maskata za na glavata.');
