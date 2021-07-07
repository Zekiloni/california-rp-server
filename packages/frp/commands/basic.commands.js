
const Animations = require('../data/Animations');

module.exports = {
   commands: [
      {
         name: 'help',
         desc: 'Lista Komand',
         call: (player, args) => {
            let help = '';
            for (let i in frp.Commands) {
               const command = frp.Commands[i]
               if (!command.admin) help += ('/' + command.name + ' - ' + command.desc);
            }
            player.SendMessage(help, frp.Globals.Colors.info);
         }
      },
      {
         name: 'changespawn',
         desc: 'Promena mesta spavna',
         params: ['mesto'],
         call: async (player, args) => {
            const spawns = ['Default spawn', 'Zadnja pozicija', 'Fakcija'];
            const [point] = args;
            let Character = await player.Character();
            Character.SetSpawn(point);
            player.SendMessage('Promenili ste mesto spawna na ' + spawns[point], frp.Globals.Colors.info);
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
         name: 'dmv',
         desc: 'Departman Motornih Vozila',
         call: (player, args) => {
            if (mp.world.time.hour < 6 || mp.world.time.hour > 20) return;
            mp.events.call('server:vehicle.department:menu', player);
         }
      },

      {
         name: 'anim',
         desc: 'Povez preko ociju',
         call: (player, args) => {
            const [name, flag] = args;
            if (Animations[name]) { 
               const Animation = Animations[name];
               player.playAnimation(Animation[0], Animation[1], -1, parseInt(flag) || 0)
            } else { 
               player.Notification(frp.Globals.messages.ANIM_DOESNT_EXIST, frp.Globals.Notification.Error, 5);
            }
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
         name: 'fontsize',
         desc: 'Veličina',
         params: ['velicina'],
         call: (player, args) => {
            const [size] = args;
            player.call('chat:size', [size]);
         }
      },

      {
         name: 'tog',
         desc: 'Podešavanja igre',
         params: ['akcija'],
         call: (player, args) => {
            const Action = args[0];
            switch (Action) { 
               case 'hud': player.call('client:player.interface:toggle'); break;
               case 'minimap': player.call('client:player.interface.radar:toggle'); break;
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
               if (player.IsNear(Target)) {
                  const TargetCharacter = await frp.Characters.findOne({ where: { id: Target.character } });
                  const Amount = parseInt(args[1]);
   
                  if (Amount > Character.Money) return; // PORUKA: Nemate dovoljno novca
                  if (Amount < 1) return; // PORUKA: Ne mozes dati minus
   
                  TargetCharacter.GiveMoney(Target, Amount);
                  Character.GiveMoney(player, -Amount);
                  player.ProximityMessage(frp.Globals.distances.me, `* ${player.name} daje nešto novca ${Target.name}. (( Pay ))`, frp.Globals.Colors.purple);
               } else { 
                  // PORUKA NIJE BLIZU
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
                  player.SendMessage('Uspešno ste se pridružili fakciji ' + mp.factions[faction].name + '.', mp.colors.success);
               }
            }
         }
      },

      {
         name: 'buy',
         desc: 'Kupovina',
         call: async (player, args) => {
            const Nearest = await player.Nearest(), Character = await player.Character();
            // if (Nearest) {
               const [action] = args;
               Character.Buy(player, Nearest, action);
            // } else { 
            //    // PORUKA: Nema nicega u blizini
            // }
         }
     }
   ]
};
