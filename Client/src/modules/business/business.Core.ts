import { Browser } from '../../browser';
import { Business } from '../../interfaces/business';
import { getStreetZone } from '../../utils';


let active: boolean = false;
let business: Business | null = null;


mp.events.add(
   {
      'CLIENT::BUSINESS:INFO': toggleBusinesInfo
   }
);


export function toggleBusinesInfo (info: boolean | Business, cmds?: string[]) {
   if (info) { 
      active = true;
      business = (<Business>info);

      const location = getStreetZone(mp.players.local.position);

      Browser.call('BROWSER::SHOW', 'businessInfo');
      Browser.call('BROWSER::BUSINESS:INFO', info, location, cmds);
   } else { 
      active = false;
      business = null;

      Browser.call('BROWSER::HIDE', 'businessInfo');
   }
}
