let Channels = require('../classes/Channels');
module.exports = {
   commands: [
      {
         name: 'r',
         desc: 'Radio komunikacija',
         call: async (player, args) => {
            const Character = await player.Character();
            if (Character.Frequency == 0) return player.Notification(frp.Globals.messages.NOT_IN_CHANNEL, frp.Globals.Notification.Error, 4);
            if (!frp.Items.HasItem(player.character, 'Handheld Radio')) return player.Notification(frp.Globals.messages.YOU_DONT_HAVE + ' Handheld Radio.', frp.Globals.Notification.Error, 4);
         }
      },
      {
         name: 'freq',
         desc: 'Podešavanje frekvencije',
         call: (player, args) => {
               if (!mp.item.hasItem(player.character, 'Radio Prijemnik'))
                  return player.SendMessage('Ne posedujete radio prijemnik !', mp.colors.tomato);
               if (!args[0])
                  return player.SendMessage('Komanda /freq set - create - leave - delete - password !', mp.colors.help);
               switch (args[0]) {
                  case 'set': {
                     mp.channels.join(player, args[1], args[2]);
                     break;
                  }
                  case 'create': {
                     mp.channels.create(player, args[1], args[2] ? (args[2]) : (0));
                     break;
                  }
                  case 'leave': {
                     mp.channels.leave(player);
                     break;
                  }
                  case 'delete': {
                     console.log('delete');
                     break;
                  }
                  case 'password': {
                     console.log('password');
                     break;
                  }
               }
         }
      }
   ]
};
