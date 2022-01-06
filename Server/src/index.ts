
import './Server/Database';
import './Player/Core';
import './Player/Player';
import './Player/Account';
import Accounts from './models/Account';
import Characters from './models/Character';
import './modules/commands';
import { Logger, Sleep } from './utils';
import { LogType } from '@Shared/enums';
import { Messages } from '@Shared/messages';


//console.log(Items.List);



// !!! TEST //

// DATA
// let Globals = require('./configs/Globals');

// // MODELS 
// let Logs = require('./models/Logs');


// // MODULES
// const Helpers = require('./modules/Managers');



// mp.events.addProc('test_proc', async (text)...) // dodavanje prcoedure
// let res = await player.callProc('test_proc', ['ok']); - pozivanje klijent procedure sa servera
// let res = await mp.events.callRemoteProc('server:player.character:delete', character); // pzoivanje server procedure sa klijenta
// Player.Nearest(); - vraca instancu najblizeg objekta

// PERFORMANCE TEST
// let Start = new Date();
// let End = new Date();
// console.log('Finished in ' + ((End - Start) / 1000));


(async () => {
   const Chars = await Characters.count()
   const Users = await Accounts.count();
   Logger(LogType.INFO, 'There are registered ' + Users + ' users, with ' + Chars + ' registered characters.')

})();


const Exit = async () => {
   Logger(LogType.SUCCESS, 'Clossing Connection, Bye-bye !');
   mp.players.broadcast('Server se gasi. Rekonektujte se na F1.');

   mp.players.forEach((player) =>  {
      player.kick(Messages.SERVER_RESTART);
   });

   
   Sleep(2.5).then(() => { 
      process.exit();
   })
};


process.on('SIGHUP', Exit);
process.on('SIGQUIT', Exit);
process.on('SIGTERM', Exit);
process.on('SIGINT', Exit);



