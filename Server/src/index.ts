


import './core/s.Database';
import './api';

import './models/players/s.Player.Manager';

import './modules/rage';
import './modules/commands';
import './modules/player'
import './modules/items';
import './modules/minute';

import { sleep } from '@shared';
import { Logs } from'@models';
import { Lang } from '@constants';


/*
   PORUKA:: - srediti
   LOGS - srediti
*/


/* 
   IMPORTING MAP 
   - gta5 > props > props.rpf > YDR, YTYP, YTD, YDD, YFT
   - gta5 > props > meta.rpf > YBN, YMAP, _manifest
*/


/*
   CHANCING xD was so high
   Math.random() < 0.9) // 90% Chance of true
   Math.random() < 0.8) // 80% chance of true
*/

// mp.events.addProc('test_proc', async (text)...) // dodavanje prcoedure
// let res = await player.callProc('test_proc', ['ok']); - pozivanje klijent procedure sa servera
// let res = await mp.events.callRemoteProc('server:player.character:delete', character); // pzoivanje server procedure sa klijenta

// PERFORMANCE TEST
// let Start =  Date.now();
// let End =  Date.now();
// console.log('Finished in ' + ((End - Start) / 1000));



const onServerClose = async () => {
   Logs.info(Lang.serverIsClosing);
   mp.players.broadcast(Lang.serverIsClosing + ' ' + Lang.pleaseReconnect);

   mp.players.forEach((player) =>  {
      player.kick(Lang.serverRestart);
   });

   sleep(2.5).then(() => { 
      process.exit();
   })
};


process.on('SIGHUP', onServerClose);
process.on('SIGQUIT', onServerClose);
process.on('SIGTERM', onServerClose);
process.on('SIGINT', onServerClose);




