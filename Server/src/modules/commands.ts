import { colors, lang, none } from '@constants';
import { ItemEnums, notifications } from '@enums';
import { shared_Data } from '@shared';
import { commands } from '@interfaces';
import { factions, inventories } from '@models';


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
         player.notification(lang.notAllowed, notifications.type.ERROR, notifications.time.SHORT);
         return;
      } 

      if (command.job && character.job != command.job) {
         player.notification(lang.notSpecificJob, notifications.type.ERROR, notifications.time.SHORT);
         return;
      } 

      if (command.position && player.dist(command.position) > 2.25) {
         player.notification(lang.notOnPosition, notifications.type.ERROR, notifications.time.SHORT);
         return;
      } 

      if (command.faction) {
         if (command.faction.required && character.faction == none) {
            return;
         }

         if (command.faction.type) {
            const faction = await factions.findOne( { where: { id: character.faction } } );
            
            if (faction && faction.type != command.faction.type) {
               player.notification(lang.notInSpecFaction, notifications.type.ERROR, notifications.time.SHORT);
               return;
            }
         };
      }

      //if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, notifications.type.ERROR, 5);

      if (command.item) {
         const item = await inventories.findOne( { where: { name: command.item, owner: character.id, entity: ItemEnums.entity.PLAYER } } );
         
         if (!item) {
            player.notification(lang.youDontHave + command.item + '.', notifications.type.ERROR, 4);
            return;
         }
      }

      if (command.params && command.params.length > params.length) {
         player.sendMessage('Komanda: /' + commandName + ' [' + command.params.join('] [') + '] ', colors.hex.Help);
         return;
      } 

      command.call(player, ...params);
   } else {
      player.notification(lang.cmdDoesntExist, notifications.type.ERROR, 4);
   }
});


import './commands/basic.commands';
import './commands/admin.Commands';
import './commands/buy.Command';
import './commands/vehicle.Commands';
import './commands/property.Commands';
import './commands/interior.Commands';
import './commands/lock.Command';
import './commands/channel.commands';
import './commands/test.commands';


