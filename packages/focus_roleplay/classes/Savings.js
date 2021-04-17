

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
            if (player.getVariable('logged')) { 
               mp.events.call('server:save.player.account', player, true);
               mp.events.call('server:save.player.character', player, true);
            }
         },

         'server:save.player.account': (player, exit = false) => { 
            let account = mp.acounts[player.account], onlineStatus = 1;

            if (account) { 
               if (exit) { onlineStatus = 0; }

               let values = {
                  ip_adress: player.ip,
                  admin: account.admin,
                  donator: account.donator,
                  coins: account.coins,
                  online: onlineStatus
               }
               db.query('UPDATE `users` SET ? WHERE id = ?', [values, account.id], function (err, result, fields) {
                  if (err) return core.terminal(1, 'Saving Acccount Error ' + err);
                  if (exit == true) {
                     delete mp.accounts[account.id];
                  }
              });
            }
         },

         'server:save.player.character': (player, exit = false) => { 
            let character = mp.characters[player.character];

            // let user

            // db.query('UPDATE `users` SET ? WHERE id = ?', [account, player.sqlid], function (err, result) {
            //    if (err) return core.terminal(1, 'Saving Acccount Error ' + err)
            // });

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