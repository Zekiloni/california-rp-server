
module.exports = { 
   commands: [ 

      {
         name: 'f',
         desc: 'Izbacivanje iz fakcije',
         call: (player, args) => { 
            let character = player.getCharacter();
            if (character.faction == 0) return;
            let message = args.splice(0).join(" ");
            mp.faction.chat(character.faction, `${character.rank} ${player.name} [${player.id}]: ${message}`);
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
               mp.faction.uninvite(player, target);
            }
         }
      },

      {
         name: 'setrank',
         leader: true,
         desc: 'Postavljanje ranka',
         call: (player, args) => { 
            let target = mp.players.find(args[0]), rank = args.slice(1).join(' ');        
            if (target) { 
               mp.faction.rank(player, target, rank);
            }
         }
      }
   ]
}
      