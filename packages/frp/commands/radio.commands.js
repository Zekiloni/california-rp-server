

module.exports = {
   commands: [
      {
         name: 'r',
         desc: 'Radio Komunikacija',
         params: ['tekst'],
         item: 'Handheld Radio',
         call: async (player, args) => {
            const Character = await player.Character();
            if (Character.Frequency == 0) return player.Notification(frp.Globals.messages.NOT_IN_CHANNEL, frp.Globals.Notification.Error, 4);

            const Message = args.splice(0).join(' ');
            if (!Message.trim()) return;

            const Frequency = await frp.Channels.findOne({ where: { Frequency: Character.Frequency } }) ;
            Frequency.Send('[CH: ' + Character.Frequency + '] ' + player.name + ': ' + Message);
         }
      },

      {
         name: 'channel',
         desc: 'Podešavanje frekvencije',
         params: ['action'],
         item: 'Handheld Radio',
         actions: 'join, leave, create, password',
         call: async (player, args) => {
            const [action, data, value] = args;
            const Character = await player.Character();

            switch (action) { 
               case 'join': frp.Channels.Join(player, data, value); break;
               case 'leave': frp.Channels.Leave(player); break;
               case 'create':  frp.Channels.create(player, data, value); break;
            }
         }
      }
   ]
};
