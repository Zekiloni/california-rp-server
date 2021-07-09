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
         name: 'orders',
         desc: 'Narudžbine hrane.',
         job: frp.Globals.Jobs.Food_Delivery,
         position: frp.Jobs.Job[frp.Globals.Jobs.Food_Delivery].point,
         call: (player, args) => {
            console.log(frp.Food.Orders);
            player.call('client:job.food:orders', [frp.Food.Orders]);
         }
      }
   ]
};
