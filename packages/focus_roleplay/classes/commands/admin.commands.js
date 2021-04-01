

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
            if(!vehToFix) 
               return player.notification('Morate biti u vozilu.', NOTIFY_ERROR, 4);
            else
               vehToFix.repair();
         }
      },
   ]
}