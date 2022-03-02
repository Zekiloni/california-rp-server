import { Browser } from '../../browser';
import { Business } from '../../interfaces/business';
import { getStreetZone } from '../../utils';


export let businesInfo: boolean = false;


export function toggleBusinesInfo (info: boolean | Business, cmds?: string[]) {
   if (info) { 
      businesInfo = true;

      const location = getStreetZone(mp.players.local.position);

      Browser.call('BROWSER::SHOW', 'businessInfo');
      Browser.call('BROWSER::BUSINESS:INFO', info, location, cmds);
   } else { 
      businesInfo = false;

      Browser.call('BROWSER::HIDE', 'businessInfo');
   }
}


mp.events.add('CLIENT::BUSINESS:INFO', toggleBusinesInfo);