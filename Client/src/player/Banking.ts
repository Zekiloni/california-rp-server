
import { Browser } from '../Browser';
import { Controls, IsNearATM } from '../Utils';

const Player = mp.players.local;

let Active:boolean = false;


mp.events.add(
   {
      'CLIENT::BANKING:TOGGLE': () => {
         Active = !Active;
         Browser.call(Active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Banking');
      },

      'CLIENT::BANKING:WITHDRAW': (Amount: number) => { 
         mp.events.callRemote('SERVER::BANKING:WITHDRAW', Amount);
      },

      'CLIENT::BANKING:DEPOSIT': (Amount: number) => { 
         mp.events.callRemote('SERVER::BANKING:DEPOSIT', Amount);
      },

      'CLIENT::BANKING:TRANSFER': (Target: any, Amount: number) => { 
         mp.events.callRemote('SERVER::BANKING:TRANSFER', Target, Amount);
      }
   }
);


mp.keys.bind(Controls.KEY_Y, false, function () {
   if (Player.vehicle || Player.isTypingInTextChat || Player.getVariable('Cuffed') || !Player.getVariable('Logged') || Active) return;

   if (IsNearATM(Player.position)) { 
      mp.events.call('CLIENT::BANKING:TOGGLE')
   }
});



export { };