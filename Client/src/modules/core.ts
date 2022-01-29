
import { Browser } from '../browser';
import { Genders } from '../data/Player';
import { clothingComponents } from '../enums/clothing';
import { getStreetZone } from '../utils';
import { gameInterface } from './game.UI';

const Player = mp.players.local;


export const screenResolution = mp.game.graphics.getScreenActiveResolution(100, 100);


mp.events.addDataHandler({
   'MONEY': (entity: EntityMp, value: any, oldValue: any) => { 
      if (entity == mp.players.local && value != oldValue) {
         gameInterface.updateMoney(value);
      }
   }
})

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
   },

   'CLIENT::WEAPON:NAME': (hash: number) => {
      return mp.game.weapon.getWeapontypeModel(hash);
   }
})

