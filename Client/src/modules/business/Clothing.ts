import { Browser } from '../../browser';


const Player = mp.players.local;
let Active = false;


mp.events.add({
   'CLIENT::BUSINESS:CLOTHING:MENU': () => {
      Active = !Active;
      if (Active) { 
         Browser.call('BROWSER::SHOW', 'ClothingMenu');
      } else { 
         Browser.call('BROWSER::HIDE', 'ClothingMenu');
         mp.events.callRemote('server:character.clothing:restart');
      }
   },
      
   'CLIENT::BUSINESS:CLOTHING:MODEL:PREVIEW': (x: number, Component: number, Variation: number) => { 
      Player.setComponentVariation(Component, Variation, 0, 2);
   },

   'CLIENT::BUSINESS:CLOTHING:PREVIEW': (x, Component: number, Texture: number) => { 
      // RageEnums.Natives.Ped.GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS
      // RageEnums.Natives.Ped.GET_NUMBER_OF_PED_TEXTURE_VARIATIONS
      const Variation = Player.getDrawableVariation(Component);
      Player.setComponentVariation(Component, Variation, Texture, 2);
   },
   
   'CLIENT::BUSINESS:CLOTHING:BUY': (Total: number, Items: any, Biz: number) => { 
      mp.events.call('client:business.clothing:menu');
      mp.events.callRemote('server:business.clothing:buy', Total, Items, Biz);
   }
})





