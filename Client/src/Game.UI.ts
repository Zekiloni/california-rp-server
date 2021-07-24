import { Browser } from './Browser';



const Player = mp.players.local;

enum UI_Status {
   Full_Visible,
   Chat_Hidden,
   Fully_Hidden
};


let Configuration = { 
   Status: UI_Status.Fully_Hidden
};


mp.events.add(
   {
      'CLIENT::NOTIFICATION': (Message: string, Type: number, Time: number) => { 
         Browser.call('BROWSER::NOTIFICATION', Message, Type, Time);
      }
   }
);

