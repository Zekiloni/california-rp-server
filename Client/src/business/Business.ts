import { Browser } from "../Browser";


const Player = mp.players.local;
let Active = false;


mp.events.add({
   'CLIENT::BUSINESS:MENU': (MenuName: string, BusinessId: number) => {   
      Active = !Active;
      Browser.call(Active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', MenuName);
   }
});

export {};