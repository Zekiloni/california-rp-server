import { colors, lang } from '@constants';
import { notifications } from '@enums';
import { shared_Data } from '@shared';
import { commands } from '@interfaces';

export let Commands: commands = {};


mp.events.add('playerCommand', async (player: PlayerMp, content: string) => {

   if (!player.character || !player.getVariable(shared_Data.LOGGED)) {
      return;
   }

   const params = content.split(/ +/);
   
   const commandName = params.splice(0, 1)[0];
   const command = Commands[commandName];

   if (command) {
     
      const { account, character } = player;

      if (command.admin && account.administrator < command.admin) {
         player.sendNotification(lang.notAllowed, notifications.type.ERROR, notifications.time.SHORT);
         return;
      } 

      if (command.job && character.job != command.job) {
         player.sendNotification(lang.notSpecificJob, notifications.type.ERROR, notifications.time.SHORT);
         return;
      } 

      if (command.position && player.dist(command.position) > 2.25) {
         player.sendNotification(lang.notOnPosition, notifications.type.ERROR, notifications.time.SHORT);
         return;
      } 

      if (command.faction) {
         // if (command.faction.type && command.faction.type != Factions[Character.Faction].type) {
         // } else

         if (command.faction.id && command.faction.id != character.faction) {
            player.sendNotification(lang.notInSpecFaction, notifications.type.ERROR, notifications.time.SHORT);
            return;
         };
      }

      //if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, notifications.type.ERROR, 5);

      // // if (cmd.item && await frp.Items.HasItem(Player.CHARACTER_ID, cmd.item) == false) return Player.Notification(Messages.YOU_DONT_HAVE + cmd.item + '.', notifications.type.ERROR, 4);

      if (command.params && command.params.length > params.length) return player.sendMessage('Komanda: /' + commandName + ' [' + command.params.join('] [') + '] ', colors.hex.Help);
      console.log('pozvo cmd')
      command.call(player, ...params);
   } else {
      player.sendNotification(lang.cmdDoesntExist, notifications.type.ERROR, 4);
   }
});


import './commands/basic.commands';
import './commands/admin.commands';
import './commands/vehicle.commands';
