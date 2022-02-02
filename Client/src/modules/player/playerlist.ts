import { Browser } from '../../browser';
import controls from '../../enums/controls';


let active: boolean = false;

mp.keys.bind(controls.TAB, true, openPlayerlist);

function openPlayerlist () {
   active = !active;
   
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'playerlist');

   if (active) {
      let players: { name: string, id: number, spawned: boolean }[] = [];
      
      mp.players.forEach(player => {
         players.push( { name: player.name, id: player.remoteId, spawned: player.getVariable('LOGGED_IN') } )
      });

      Browser.call('BROWSER::PLAYERLIST', players);
   }
}