import { Browser } from "../Browser";
export {};


const Player = mp.players.local;
let BusinessDrinkMenu = false;

mp.events.add({
   'CLIENT::BUSINESS:DRINK:MENU': (Info: string) => { 
      BusinessDrinkMenu = !BusinessDrinkMenu;
      Browser.call(BusinessDrinkMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'BusinessDrinkMenu')
   },

   'CLIENT::BUSINESS:DRINK:BUY': (Price: number, Item: string, Business: number) => { 
      mp.events.callRemote('SERVER::BUSINESS:DRINK:BUY', Price, Item, Business);
   }
})

