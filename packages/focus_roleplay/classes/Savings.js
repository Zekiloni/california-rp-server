

class Saving { 
   constructor () { 

      mp.events.add({
         'playerQuit': (player, exitType) => { 
            let reason = null;
            switch (exitType) {
               case 'disconnect': reason = 'je samovoljno napustio server'; break;
               case 'timeout': reason = 'je izgubio konekciju sa serverom'; break;
               case 'kicked': reason = 'je kikovan / banovan sa servera'; break; 
            }

            core.terminal(2, `${player.name} ${reason}`);
            if (player.data.logged) { 
               mp.events.call('server:save.player', player, true)
            }
         },

         'server:save.player': (player, exit = false) => { 
            let account = mp.acounts[player.account];
            let character = mp.characters[player.character];

            // let user

            db.query('UPDATE `users` SET ? WHERE id = ?', [account, player.sqlid], function (err, result) {
               if (err) return core.terminal(1, 'Saving Acccount Error ' + err)
            });


         },

         'server:save.vehicle': (player) => { 

         }
      })
   }

   
   save = () => { 
      mp.players.forEach( (player) => {
         if (player.data.logged) { 
            mp.events.call('server:save.player', player);
         }
      });

      mp.vehicles.forEach( (vehicle) => { 
         mp.events.call('server:save.vehicle', vehicle)
      })
   }
}

let saving = new Saving;
setInterval(() => { saving.save(); }, 60000);