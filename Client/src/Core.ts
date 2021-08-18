
import { Browser } from './Browser';
import { Clothing_Components, Genders } from './Data/Player';

const Player = mp.players.local;


mp.nametags.enabled = false;

const ScreenResolution = mp.game.graphics.getScreenActiveResolution(100, 100);

mp.events.add(
   {
      
      'CLIENT::OFFER': (Title: string, Message: string, Event: object, Time: number) => { 
         Browser.call('BROWSER::OFFER', Title, Message, Event, Time);
      },

      'CLIENT::OFFER:ACCEPT': (Info: object) => { 
         mp.events.callRemote('SERVER::OFFER:ACCEPT', Info);
      },

      'CLIENT::OFFER:DECLINE': (Info: object) => { 
         mp.events.callRemote('SERVER::OFFER:DECLINE', Info);
      }
   }
);
