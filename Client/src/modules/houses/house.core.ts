import { Browser } from "../../browser";
import { distanceBetweenVectors, getStreetZone } from "../../utils";


let houseInfo: undefined | any = null;


mp.events.add( 
   {
      'CLIENT::HOUSE:INFO': showInfo
   }
);

// mp.keys.bind(3, true, function () {

// });

function showInfo (toggle: boolean | object) { 
   toggle ? houseInfo = toggle : houseInfo = null;
   if (toggle) { 
      Browser.call('BROWSER::SHOW', 'HouseInfo'), Browser.call('BROWSER::HOUSE:INFO', houseInfo, getStreetZone(mp.players.local.position));
   } else { 
      Browser.call('BROWSER::HIDE', 'HouseInfo');
   }
}