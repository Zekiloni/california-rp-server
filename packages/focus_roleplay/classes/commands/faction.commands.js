
module.exports = { 
   commands: [ 

      {
         name: 'f',
         leader: true,
         desc: 'Izbacivanje iz fakcije',
         call: (player, args) => { 
            let character = player.getCharater();
            if (character.faction == 0) return;
            let message = args.splice(0).join(" ");
            if (message) { 
               mp.faction.chat(character.faction, `${character.rank} ${player.name} [${player.d}]: ${message}`);
            }
         }
      },

      {
         name: 'invite',
         leader: true,
         desc: 'Zahtev za pridruzivanje fakciji',
         call: (player, args) => { 
            let target = mp.players.find(args[0]);
            if (target) { 
               mp.faction.invite(player, target);
            }
         }
      },

      {
         name: 'uninvite',
         leader: true,
         desc: 'Izbacivanje iz fakcije',
         call: (player, args) => { 
            let target = mp.players.find(args[0]);
            if (target) { 
               mp.faction.invite(player, target);
            }
         }
      }
   ]
}
      