
import 'module-alias/register';


import './database';
import './api';

import './systems/player/Authorization';

import './modules/rage';
import './modules/commands';
import './modules/player'
import './modules/items';
import './modules/minute';
import './modules/jobs';

import { sleep } from '@shared';
import { logs } from'@models';
import { Lang } from '@constants';



// mp.events.addProc('test_proc', async (text)...) // dodavanje prcoedure
// let res = await player.callProc('test_proc', ['ok']); - pozivanje klijent procedure sa servera
// let res = await mp.events.callRemoteProc('server:player.character:delete', character); // pzoivanje server procedure sa klijenta

// PERFORMANCE TEST
// let Start =  Date.now();
// let End =  Date.now();
// console.log('Finished in ' + ((End - Start) / 1000));



const exitProcess = async () => {
   logs.info(Lang.serverIsClosing);
   mp.players.broadcast(Lang.serverIsClosing + ' ' + Lang.pleaseReconnect);

   mp.players.forEach((player) =>  {
      player.kick(Lang.serverRestart);
   });

   
   sleep(2.5).then(() => { 
      process.exit();
   })
};


process.on('SIGHUP', exitProcess);
process.on('SIGQUIT', exitProcess);
process.on('SIGTERM', exitProcess);
process.on('SIGINT', exitProcess);



