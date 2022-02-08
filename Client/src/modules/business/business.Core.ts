import { Browser } from '../../browser';
import { getStreetZone } from '../../utils';

let active = {
   info: false,
   management: false
};

let business: object | null = null;

mp.events.add(
   {
      'CLIENT::BUSINESS:INFO': showBusinessInfo
   }
);


function showBusinessInfo (info: boolean | object) {
   mp.gui.chat.push('e bro')
   if (info) { 
      mp.gui.chat.push('e bro 1')
      active.info = true;
      business = (<Object>info);

      const location = getStreetZone(mp.players.local.position);

      Browser.call('BROWSER::SHOW', 'businessInfo');
      Browser.call('BROWSER::BUSINESS:INFO', info, location);
   } else { 
      active.info = false;
      business = null;
      mp.gui.chat.push('e bro 2')

      Browser.call('BROWSER::HIDE', 'businessInfo');
   }
}
