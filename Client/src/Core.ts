
import { Browser } from './browser';
import { Clothing_Components, Genders } from './data/Player';
import { getStreetZone } from './utils';

const Player = mp.players.local;


mp.nametags.enabled = false;

export const screenResolution = mp.game.graphics.getScreenActiveResolution(100, 100);

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


mp.events.addProc({
   'CLIENT::GET:STREET_ZONE': (position: Vector3Mp) => { 
      return getStreetZone(position);
   }
})

