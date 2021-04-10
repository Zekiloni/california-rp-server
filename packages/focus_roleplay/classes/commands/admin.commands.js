

module.exports = { 
   commands: [
      {
         name: 'kick',
         admin: 3,
         handler: (player, ...args) => { 
   
         }
      },
   
      {
         name: 'ban',
         description: 'Ban a player',
         admin: 3,
         handler: (player, ...args) => { 
            
         }
      },
   

      {
         name: 'revive',
         admin: 2,
         call: (player, args) => { 
            let target = mp.players.find(args[0]);
            if (target) { 
               let position = target.position;
               clearTimeout(target.respawnTimer)
               target.isDead = false;
               setTimeout(() => { target.spawn(position); }, 700)

            }
         }
      },

      {
         name: 'freeze',
         call: (player, args) => { 
         }
      },
   
      {
         name: 'warn',
         call: (player, args) => { 
         }
      },
   
      {
         name: 'fixveh',
         call: (player, args) => {
            if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
            let vehToFix = player.vehicle;
            if (!vehToFix) 
               return player.notification('Morate biti u vozilu.', NOTIFY_ERROR, 4);
            else
               vehToFix.repair();
         }
      },
   ]
}