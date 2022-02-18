import { Browser } from '../../../browser';
import { getClothingItemComponent, isClothingItemProp } from '../../items/items.Clothing';
import getPreviousClothing from '../../utils/previous.Clothing';


let active: boolean = false;
let previous: ReturnType<typeof getPreviousClothing> | null = null;


mp.events.add(
   {
      'CLIENT::CLOTHING:MENU': toggleClothingMenu,
      'CLIENT::CLOTHING:BUY': buyClothingItem,
      'CLIENT::CLOTHNG:PREVIEW': clothingItemPreview
   }
)


function toggleClothingMenu (info: string) {
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'clothingMenu');
   
   if (active) {
      previous = getPreviousClothing(mp.players.local);
   } else {
      applyPreviousClothing()
   }
}


function buyClothingItem (items: string) {
   
}


function clothingItemPreview (name: string, drawable: number, texture: number) {
   const isProp: boolean = isClothingItemProp(name);
   const component: number = getClothingItemComponent(name);

   if (isProp) {
      mp.players.local.setPropIndex(component, drawable, texture, drawable > 0 ? true : false);
   } else { 
      mp.players.local.setComponentVariation(component, drawable, texture, 2);
   }
}


function applyPreviousClothing () {
   if (previous) {
      for (const i in previous.clothing) {
         const value = previous.clothing[i];
         mp.players.local.setComponentVariation(Number(i), value.drawable, value.texture, 2);
      }
   
      for (const i in previous.props) {
         const value = previous.props[i];
         mp.players.local.setPropIndex(Number(i), value.drawable, value.texture, true);
      }
   }
}




