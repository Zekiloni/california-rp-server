import { Browser } from '../../browser';
import controls from '../../enums/controls';
import { getStreetZone } from '../../utils';


let active: boolean = false;
let house: object | null = null;


mp.events.add(
   {
      'CLIENT::HOUSE:INFO': showHouseInfo,
   }
);


mp.keys.bind(controls.KEY_E, true, enterHouse);


function showHouseInfo (info: boolean | object, availableCommands?: string[]) {
   if (info) { 
      active = true;
      house = (<Object>info);

      const location = getStreetZone(mp.players.local.position);

      Browser.call('BROWSER::SHOW', 'houseInfo');
      Browser.call('BROWSER::HOUSE:INFO', info, location, availableCommands);
   } else { 
      active = false;
      house = null;

      Browser.call('BROWSER::HIDE', 'houseInfo');
   }
}

function enterHouse () {

   if (mp.players.local.getVariable('CUFFED')) { 
      return;
   }

   if (!house) { 
      return;
   }


}