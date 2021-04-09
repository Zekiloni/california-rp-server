


mp.cmds = { };

const commandFiles = [
   'basic.commands',
   'admin.commands',
   'house.commands',
   'item.commands',
   'vehicle.commands',
   'interior.commands',
   'message.commands'
];

for (const file of commandFiles) {
	let cmdFile = require(`./commands/${file}`);
   cmdFile.commands.forEach(cmd => {
      mp.cmds[cmd.name] = cmd;
   });
}

mp.events.add('playerCommand', (player, command) => {

   if (!player.data.logged) return false;

   let args = command.split(/ +/);
   const commandName = args.splice(0, 1)[0];
   let cmd = mp.cmds[commandName];

   if (cmd) { 
      let account = mp.accounts[player.account];
      // let character = mp.characters[player.character];

      if (cmd.admin && account.admin < cmd.admin) return false;
      if (cmd.faction && character.faction != cmd.faction) return false;
      if (cmd.job && character.job != cmd.job) return false;

      cmd.call(player, args);
 
   } else {
      // player.notfication();
   }
}) 
