


frp.Commands = {};

const commandFiles = [
   'basic.commands',
   'admin.commands',
   'house.commands',
   'item.commands',
   'vehicle.commands',
   'interior.commands',
   'job.commands',
   'message.commands',
   'radio.commands',
   'faction.commands',
   'law.commands',
   'lock.command',
   'buy.command'
];

for (const file of commandFiles) {
	let cmdFile = require(`../commands/${file}`);
   cmdFile.commands.forEach(cmd => {
      frp.Commands[cmd.name] = cmd;
   });
}

mp.events.add('playerCommand', (player, command) => {

   if (!player.data.logged) return false;

   let args = command.split(/ +/);
   const commandName = args.splice(0, 1)[0];
   let cmd = frp.Commands[commandName];

   if (cmd) { 
      let Account = player.Account(), Character = player.Character();

      if (cmd.admin && Account.Administrator < cmd.admin) return player.notification('not allowed', 'error', 4);

      // if (cmd.faction) { 
      //    if (cmd.faction.type && cmd.faction.type != mp.factions[character.faction].type) return;
      //    if (cmd.faction.id && cmd.faction.id != character.faction) return;
      // }

      // if (cmd.job && character.job != cmd.job) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);;

      cmd.call(player, args);
 
   } else {
      player.notification('aaaaa', 'error', 4);
   }
}) 