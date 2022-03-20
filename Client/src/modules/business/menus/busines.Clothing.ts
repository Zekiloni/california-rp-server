import { Browser } from '../../../browser';
import { playerPreviewCamera } from '../../../utils';
import { gameIStatus, toggleGameInterface, UI_Status } from '../../game.UI';
import { getClothingItemComponent, isClothingItemProp } from '../../items/clothingItem';
import getPreviousClothing from '../../utils/previous.Clothing';
import { toggleBusinesInfo } from '../business.Core';


let active: boolean = false;
let previous: ReturnType<typeof getPreviousClothing> | null = null;
let UIstatus: number | null = null;

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
      Browser.call('BROWSER::MARKET:MENU', info);
      previous = getPreviousClothing(mp.players.local);
      playerPreviewCamera(true);
      UIstatus = gameIStatus;
      toggleGameInterface(UI_Status.HIDDEN);
      toggleBusinesInfo(false);
   } else {
      applyPreviousClothing();
      playerPreviewCamera(false);
      toggleGameInterface(UIstatus!);
      UIstatus = null;
      previous = null;
   }
}


function buyClothingItem (items: string) {
   
}


function clothingItemPreview (name: string, drawable: number, texture: number) {
   const isProp: boolean = isClothingItemProp(name);
   const component: number = getClothingItemComponent(name);

   if (isProp) {
      if (drawable == 0) {
         mp.players.local.clearProp(component);
      } else { 
         mp.players.local.setPropIndex(component, drawable, texture, drawable > 0 ? true : false);
      }
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
         if (value.drawable == -1) {
            mp.players.local.clearProp(Number(i));
         } else {
            mp.players.local.setPropIndex(Number(i), value.drawable == -1 ? 255 : value.drawable, value.texture, true);
         }

      }
   }
}




