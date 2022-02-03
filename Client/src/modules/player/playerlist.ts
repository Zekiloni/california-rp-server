import { Browser } from '../../browser';
import controls from '../../enums/controls';


let active: boolean = false;

mp.keys.bind(controls.TAB, true, openPlayerlist);

function openPlayerlist () {

   if (mp.players.local.isTypingInTextChat) {
      return;
   }


   if (!mp.players.local.getVariable('SPAWNED')) {
      return;
   }

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