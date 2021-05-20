
module.exports = { 
   commands: [
      {
         name: 'help',
         desc: 'Lista Komand',
         call: (player, args) => { 
            let result = ''
            for (let i in mp.cmds) { 
               let cmd = mp.cmds[i], desc = cmd.desc;

               if (!cmd.admin) {
                  result += `/${cmd.name} `
               }
            }  

            player.sendMessage(result, mp.colors.server)
         }
      },

      {
         name: 'changespawn',
         desc: 'Promena mesta spavna',
         call: (player, args) => { 
            let Character = player.Character();
            let character = player.getCharacter();
            const spawns = ['Default spawn', 'Zadnja pozicija', 'Fakcija']
            if (!args[0]) { 
               player.sendMessage('Komanda zahteva argument broja.', mp.colors.help);
               player.sendMessage('0 - Default Spawn, 1 - Zadnja Pozicija, 2 - Fakcija.', mp.colors.help);
               return false;
            } 
            switch (args[0]) { 
               case 0: { character.spawn_point = 0; }
               case 1: { character.spawn_point = 1; }
            }
            player.sendMessage('Promenili ste mesto spawna na ' + spawns[args[0]], mp.colors.info);
         }
      },

      {
         name: 'blindfold',
         desc: 'Povez preko ociju',
         call: (player, args) => { 
            player.call('client:hud.black_screen')
         }
      },

      {
         name: 'showid',
         desc: 'Pokazivanje dokumenata',
         call: (player, args) => { 
            if (args[0]) { 
               let target = mp.players.find(args[0]);
               if (target) { 
                  target.call('client:player.documents', 'id', player.getCharacter());
               }
            } else { 
               player.call('client:player.documents', 'id', player.getCharacter());
            }
         }
      },

      {
         name: 'pay',
         desc: 'Davanje novca',
         call: (player, args) => { 
            let character = player.getCharacter();
            if (character.hours < 2) { 
               if (args[0]) { 
                  let target = mp.players.find(args[0]);
                  if (target && args[1]) { 
                     let targetCharacter = target.getCharacter(), amount = args[1];
                     if (amount > character.money) return; // nemas dovoljno novca
                     if (amount < 0) return; // ne mozes dati minus :)

                     targetCharacter.giveMoney(target, amount);
                     character.giveMoney(player, -amount);

                     player.proximityMessage(8.25, `* ${player.name} daje nešto novca ${target.name}. (( Pay ))`, mp.colors.purple);
                  }
               }
            }
         }
      },

      {
         name: 'accept',
         desc: 'Lista Komand',
         call: (player, args) => { 
            let character = player.getCharacter();
            if (!args[0]) return;
            switch(args[0]) { 
               case 'invite': {
                  if (character.invite_request == 0) return false;
                  let faction = character.invite_request;
                  character.faction = faction;
                  character.invite_request = 0;
                  character.rank = 'Newbie';
                  player.sendMessage('Uspešno ste se pridružili fakciji ' + mp.factions[faction].name + '.', mp.colors.success);
               }
            }
         }
      }
   ]
}