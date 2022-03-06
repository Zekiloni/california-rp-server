
import 'module-alias/register';

import './database';
import './modules/rage';
import './modules/commands';
import './modules/player'
import './modules/items';
import './modules/minute';
import './modules/bank'
import './modules/jobs';
import './modules/business.Manager';

import { sleep } from '@shared';
import { logs } from'@models';
import { lang } from '@constants';



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



