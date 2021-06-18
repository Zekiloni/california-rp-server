module.exports = {
   commands: [
      {
         name: 'help',
         desc: 'Lista Komand',
         call: (player, args) => {
            let help = '';
            for (let i in frp.Commands) {
               const command = frp.Commands[i], command = cmd.desc;
               if (!command.admin) help += `/${command.name} `;
            }
            player.sendMessage(help, frp.Globals.Colors.info);
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
            const Message = args.splice(0).join(' ');
            frp.Admin.Report.Add(player, Message);
         }
      },

      {
         name: 'tog',
         desc: 'Podešavanja igre',
         params: ['akcija'],
         call: (player, args) => {
            const Action = args[0];
            
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
            const Character = await frp.Characters.findOne({ where: { id: player.character }});
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
         params: ['igrac', 'kolicina'],
         call: async (player, args) => {
            const Character = await frp.Characters.findOne({ where: { id: player.character } });
            if (Character.Hours < 2) return; // PORUKA: Potrebno vam je minimalno dva sata igre.
            
            const Target = mp.players.find(args[0]);
            if (Target) {
               const TargetCharacter = await frp.Characters.findOne({ where: { id: Target.character } });
               const Amount = parseInt(args[1]);

               if (Amount > Character.Money) return; // PORUKA: Nemate dovoljno novca
               if (Amount < 1) return; // PORUKA: Ne mozes dati minus

               TargetCharacter.GiveMoney(Target, Amount);
               Character.GiveMoney(player, -Amount);
               player.ProximityMessage(frp.Globals.distances.me, `* ${player.name} daje nešto novca ${Target.name}. (( Pay ))`, frp.Globals.Colors.purple);
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
