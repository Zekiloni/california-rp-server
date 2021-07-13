module.exports = {
   commands: [
      {
         name: 'takejob',
         desc: 'Zapošljavanje.',
         call: async (player, args) => {
            const Character = await player.Character();
            if (Character.Job != frp.Globals.Jobs.Unemployed) return player.Notification(frp.Globals.messages.ALREADY_EMPLOYED, frp.Globals.Notification.Error, 5);

            const Nearest = frp.Jobs.Nearest(player);
            if (Nearest) {
               player.call('client:job:offer', [Nearest]);
            } else {
               player.Notification(frp.Globals.messages.NOT_NEAR_JOB, frp.Globals.Notification.Error, 5);
            }
         }
      },

      {
         name: 'quitjob',
         desc: 'Otkaz sa posla.',
         call: async (Player, args) => {
            const Characcter = await Player.Character();
            if (Characcter.Job == frp.Globals.Jobs.Unemployed) return Player.Notification(frp.Globals.messages.UNEMPLOYED, frp.Globals.Notification.Error, 5);

            Characcter.SetJob(Player, frp.Globals.Jobs.Unemployed);
            Player.Notification(frp.Globals.messages.QUITJOB, frp.Globals.Notification.Succes, 5);
         }
      },

      {
         name: 'Smena Djubretara.',
         job: frp.Globals.Jobs.Sanitation,
         position: frp.Jobs.Job[frp.Globals.Jobs.Sanitation].position,
         params: ['start / stop'],
         call: (Player, args) => {
            const [action] = args;
            switch (action) {
               case frp.Globals.Words.Stop: frp.Sanitation.Stop(Player); break;
               case frp.Globals.Words.Start: frp.Sanitation.Start(Player); break;
            }
         }
      },

      {
         name: 'taxi',
         desc: 'Smena Taksiste.',
         job: frp.Globals.Jobs.Taxi,
         params: ['start / stop'],
         call: (Player, args) => {
            const [action] = args;
            switch (action) {
               case frp.Globals.Words.Stop: {
                  frp.Taxi.Stop(Player);
                  break;
               } 
               case frp.Globals.Words.Start:{
                  if (Player.dist(frp.Jobs.Job[frp.Globals.Jobs.Taxi].position) > 3) return Player.Notification(frp.Globals.messages.NOT_ON_POSITION, frp.Globals.Notification.Error, 5);
                  break;
               }
            }
         }
      },

      {
         name: 'orders',
         desc: 'Narudžbine hrane.',
         job: frp.Globals.Jobs.Food_Delivery,
         position: frp.Jobs.Job[frp.Globals.Jobs.Food_Delivery].position,
         call: (player, args) => {
            player.call('client:job.food:orders', [frp.Food.Orders]);
         }
      }
   ]
};
