
module.exports = { 
   commands: [

      {
         name: 'id',
         desc: 'Lista igraca',
         params: '[id / ime]',
         call: (player, args) => { 
            // let players = mp.players.get(args[0]);
            // if (players.length > 1) {
            //    players.forEach(target => {
            //       player.sendMessage(`[${target.id}] ${target.name}`);
            //    });
            //    player.sendMessage(`Pronadjeno rezultata !{${mp.colors.server}}${players.length}`);
            // } else { 
            //    player.sendMessage(`[${players.id}] ${players.name}`);
            // }

         }
      },
   ]
}