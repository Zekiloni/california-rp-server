import { Browser } from "../../browser";
import { controls } from "../../data/enums";
import { getStreetZone } from "../../utils";


const player = mp.players.local;

let houseInfo: null | any = null;


mp.events.add( 
   {
      'CLIENT::HOUSE:INFO': showInfo
   }
);

mp.keys.bind(controls.KEY_E, true, function () {
   if (player.getVariable('LOGGED_IN') && player.getVariable('SPAWNED')) { 
      if (houseInfo) {
         if (player.getVariable('CUFFED')) return;
         mp.gui.chat.push('tri enter house')
         mp.events.callRemote('SERVER::HOUSE:ENTER', houseInfo.id);
      }
   }
});

function showInfo (toggle: boolean | object) { 
   mp.gui.chat.push(JSON.stringify(toggle))
   toggle ? houseInfo = toggle : houseInfo = null;
   if (toggle) { 
      Browser.call('BROWSER::SHOW', 'HouseInfo'), Browser.call('BROWSER::HOUSE:INFO', houseInfo, getStreetZone(mp.players.local.position));
   } else { 
      mp.gui.chat.push('hide is')
      Browser.call('BROWSER::HIDE', 'HouseInfo');
   }
}