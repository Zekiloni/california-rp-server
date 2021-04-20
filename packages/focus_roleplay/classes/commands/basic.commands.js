
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