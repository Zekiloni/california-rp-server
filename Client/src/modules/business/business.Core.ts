import { Browser } from '../../browser';
import controls from '../../enums/controls';
import { business } from '../../interfaces/business';
import { getStreetZone } from '../../utils';

let active = {
   info: false,
   management: false
};

let business: business | null = null;

mp.events.add(
   {
      'CLIENT::BUSINESS:INFO': showBusinessInfo
   }
);


mp.keys.bind(controls.KEY_E, true, businessMenuOrEnter);

function businessMenuOrEnter () {

   if (mp.players.local.isTypingInTextChat) {
      return;
   }

   if (!business) {
      return;
   }
   
   if (business.walk_in) {
      mp.events.callRemote('SERVER::BUSINESS:MENU', business.id);
   } else { 
      mp.events.callRemote('SERVER::BUSINESS:ENTER', business.id);

   }
}

function showBusinessInfo (info: boolean | business, cmds: string[]) {
   if (info) { 
      active.info = true;
      business = (<business>info);

      const location = getStreetZone(mp.players.local.position);

      Browser.call('BROWSER::SHOW', 'businessInfo');
      Browser.call('BROWSER::BUSINESS:INFO', info, location, cmds);
   } else { 
      active.info = false;
      business = null;

      Browser.call('BROWSER::HIDE', 'businessInfo');
   }
}
