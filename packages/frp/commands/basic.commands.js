module.exports = {
   commands: [
      {
         name: 'help',
         desc: 'Lista Komand',
         call: (player, args) => {
               let result = '';
               for (let i in mp.cmds) {
                  let cmd = mp.cmds[i], desc = cmd.desc;
                  if (!cmd.admin) {
                     result += `/${cmd.name} `;
                  }
               }
               player.sendMessage(result, mp.colors.server);
         }
      },
      {
         name: 'changespawn',
         desc: 'Promena mesta spavna',
         params: ['mesto'],
         call: async (player, args) => {
            let Character = await player.Character();
            const spawns = ['Default spawn', 'Zadnja pozicija', 'Fakcija'];
            Character.SetSpawn(args[0]);
            player.sendMessage('Promenili ste mesto spawna na ' + spawns[args[0]], frp.Globals.Colors.info);
         }
      },

      {
         name: 'blindfold',
         desc: 'Povez preko ociju',
         call: (player, args) => {
            player.call('client:player.interface:black');
         }
      },

      {
         name: 'report',
         desc: 'Slanje pitanja administraciji',
         params: ['sadrzaj'],
         call: (player, args) => {
            let Message = args.splice(0).join(' ');
            frp.Admin.Report.Add(player, Message);
         }
      },

      {
         name: 'tog',
         desc: 'Podešavanja igre',
         params: ['akcija'],
         call: (player, args) => {
            let Action = args[0];
            
            switch (Action) { 
               case 'hud':  player.call('client:player.interface:toggle'); break;
            }
         }
      },

      {
         name: 'showid',
         desc: 'Pokazivanje dokumenata',
         call: async (player, args) => {
            let Character = await frp.Characters.findOne({ where: { id: player.character }});
            if (args[0]) { 
               let Target = mp.players.find(args[0]);
               if (Target) Target.call('client:player.documents:show', ['identity', Character]);
            } else { 
               player.call('client:player.documents:show', ['identity', Character]);
            }
         }
      },

      {
         name: 'showlicenses',
         desc: 'Pokazivanje dozvoli',
         call: async (player, args) => {
            let Character = await frp.Characters.findOne({ where: { id: player.character }});
            if (args[0]) { 
               let Target = mp.players.find(args[0]);
               if (Target) Target.call('client:player.documents:show', ['licenses', Character]);
            } else { 
               player.call('client:player.documents:show', ['licenses', Character]);
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
                           if (amount > character.money)
                              return; // nemas dovoljno novca
                           if (amount < 0)
                              return; // ne mozes dati minus :)
                           targetCharacter.giveMoney(target, amount);
                           character.giveMoney(player, -amount);
                           player.ProximityMessage(8.25, `* ${player.name} daje nešto novca ${target.name}. (( Pay ))`, mp.colors.purple);
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
               if (!args[0])
                  return;
               switch (args[0]) {
                  case 'invite': {
                     if (character.invite_request == 0)
                           return false;
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
};
