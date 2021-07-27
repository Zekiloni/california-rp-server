

module.exports = {
   commands: [
      {
         name: 'r',
         desc: 'Radio Komunikacija',
         params: ['tekst'],
         item: 'Handheld Radio',
         call: async (player, args) => {
            const Character = player.Character;
            console.log('Frekvencija /r Karaktera ' + Character.Frequency);
            if (Character.Frequency == 0) return player.Notification(frp.Globals.messages.NOT_IN_CHANNEL, frp.Globals.Notification.Error, 4);

            const Message = args.splice(0).join(' ');
            if (!Message.trim()) return;

            const Frequency = await frp.Channels.findOne({ where: { Frequency: Character.Frequency } }) ;
            Frequency.Send('** [CH: ' + Character.Frequency + '] ' + player.name + ': ' + Message);
         }
      },

      {
         name: 'channel',
         desc: 'Podešavanje frekvencije',
         item: 'Handheld Radio',
         actions: 'join, leave, create, delete, password',
         call: async (player, args) => {
            const [action, data, value] = args;
            if (!action) return player.Notification(frp.Globals.messages.COMMAND_USAGE + '/channel join, leave, create, password', frp.Globals.Notification.Info, 4);
            const Character = await player.Character();

            switch (action) { 
               case 'join': frp.Channels.Join(player, data, value); break;
               case 'leave': frp.Channels.Leave(player); break;
               case 'create':  frp.Channels.New(player, data, value); break;
               case 'password': frp.Channels.Edit(player, data); break;
               case 'delete':  frp.Channels.Delete(player); break;
            }
         }
      }
   ]
};
