
import './database';
import './modules/rage';
import './systems/player';
import './commands';
import './modules/player';
import './systems/main/items';
import './systems/main/bank'
import './systems/jobs';
import './systems/main/houses';
import { sleep } from '@shared';
import { logs } from'@models';
import { lang } from './constants';


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




const exitProcess = async () => {
   logs.info(lang.serverIsClosing);
   mp.players.broadcast(lang.serverIsClosing + ' ' + lang.pleaseReconnect);

   mp.players.forEach((player) =>  {
      player.kick(lang.serverRestart);
   });

   
   sleep(2.5).then(() => { 
      process.exit();
   })
};


process.on('SIGHUP', exitProcess);
process.on('SIGQUIT', exitProcess);
process.on('SIGTERM', exitProcess);
process.on('SIGINT', exitProcess);



