
mp.events.add('render', updateRPC);

function updateRPC () {
   if (!mp.players.local.getVariable('LOGGED_IN') || !mp.players.local.getVariable('SPAWNED')) { 
      return;
   }

   const { name } = mp.players.local;

   mp.discord.update('California Roleplay', name);
}

