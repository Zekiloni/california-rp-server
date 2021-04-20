

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
            if (player.data.logged && player.data.spawned) { 
               let account = mp.accounts[player.account], onlineStatus = 1;

               console.log(account)
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
            }
         },

         'server:save.player.character': (player, exit = false) => { 
            let character = mp.characters[player.character];

            if (character) { 
               let values = {
                  money: character.money,
                  salary: character.salary,
                  job: character.job,
                  radio_frequency: character.frequency,
                  faction: character.faction,
                  faction_rank: character.rank,
                  faction_leader: character.leader,
                  hunger: character.hunger,
                  thirst: character.thirst,
                  last_position: JSON.stringify(player.position),
                  health: character.health,
                  armour: character.armour
               }
               db.query('UPDATE `characters` SET ? WHERE id = ?', [values, player.character], function (err, result) {
                     if (err) return core.terminal(1, 'Saving Acccount Error ' + err)
               });
            }
         },

         'server:save.player.character.urgent': (player) => { 
            let character = mp.characters[player.character];
            if (character) { 
               let values = {
                  last_position: JSON.stringify(player.position),
                  health: character.health,
                  armour: character.armour
               }
               db.query('UPDATE `characters` SET ? WHERE id = ?', [values, character.id], function (err, result, fields) {
                  if (err) return core.terminal(1, 'Saving character Error ' + err);
              });
            }
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

let saving = new Saving();
setInterval(() => { saving.save(); }, 60000);