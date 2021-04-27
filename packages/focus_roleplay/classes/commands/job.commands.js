


module.exports = { 
   commands: [
      {
         name: 'job',
         desc: 'Stvari vezane za posao karaktera',
         call: (player, args) => { 
            let action = args[0], character = player.getCharacter();
            switch (action) { 
               case 'take': {
                  if (character.job != 0) return; // prvo /job quit
                  if (player.near) { 
                     if (player.near.type == 'job') { 
                        let job = mp.jobs[player.near.id];
                        player.call('client:player.job.offer', [job])
                     }
                  } else { 
                     // niste u blizini posla
                  }
                  break;
               }
               
               case 'quit': { 
                  if (character.job == 0) return; // vi niste zaposleni
                  character.job = 0;
                  player.sendMessage('Dali ste otkaz !', mp.colors.info)
                  break;
               }

               case 'start': { 
                  if (character.job == 0) return; // niste zaposleni
                  // startaj job
                  break;
               }
            }
         }
      }
   ]
}