
frp.Commands = {};

const commandFiles = [
    'basic.commands',
    'admin.commands',
    'house.commands',
    'business.commands',
    'item.commands',
    'vehicle.commands',
    'interior.commands',
    'job.commands',
    'message.commands',
    'radio.commands',
    'faction.commands',
    'law.commands',
    'lock.command'
];


for (const file of commandFiles) {
   let cmdFile = require('../commands/' + file);
   cmdFile.commands.forEach(cmd => {
      frp.Commands[cmd.name] = cmd;
   });
}

mp.events.add('playerCommand', async (player, command) => {
   if (!player.data.logged) return false;

   let args = command.split(/ +/);
   const commandName = args.splice(0, 1)[0];
   let cmd = frp.Commands[commandName];

   if (cmd) {
      const Account = await player.Account();
      const Character = await player.Character();
      
      if (cmd.admin && Account.Administrator < cmd.admin) return player.Notification('Nije vam dozvoljeno !', frp.Globals.Notification.Error, 4);
      
      if (cmd.job && Character.Job != cmd.job) return;

      if (cmd.faction) { 
         if (cmd.faction.type && cmd.faction.type != frp.Factions[Character.Faction].type) return;
         if (cmd.faction.id && cmd.faction.id != Character.Faction) return;
      }

      if (cmd.item && frp.Items.HasItem(player.character, cmd.item) == false) return player.Notification(frp.Globals.messages.YOU_DONT_HAVE + cmd.item + '.', frp.Globals.Notification.Error, 4);
      
      if (cmd.params && cmd.params.length > args.length) return player.SendMessage('Komanda: /' + commandName + ' [' + cmd.params.join('] [') + '] ', frp.Globals.Colors.help);

      cmd.call(player, args);
   } else {
      player.Notification('Komanda ne postoji !', frp.Globals.Notification.Error, 4);
   }
});
