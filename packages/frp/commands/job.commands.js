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
      }
   ]
};
