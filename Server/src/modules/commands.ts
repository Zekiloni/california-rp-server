
import { shared_Data } from '@shared';
import { commands } from '@interfaces';
import { colors, Lang, none } from '@constants';
import { ItemEnums, notifications } from '@enums';
import { Factions, Items, FactionsRanks } from '@models';


export let Commands: commands = {};


mp.events.add('playerCommand', async (player: PlayerMp, content: string) => {

   if (!player.character || !player.getVariable(shared_Data.LOGGED)) {
      return;
   }

   const params = content.split(/ +/);
   
   const commandName = params.splice(0, 1)[0];
   const command = Commands[commandName.toLowerCase()];

   if (command) {
      const { account, character } = player;

      if (command.admin && account.administrator < command.admin) {
         player.notification(Lang.notAllowed, notifications.type.ERROR, notifications.time.SHORT);
         return;
      } 

      if (command.job && command.job.required && player.character.isUnemployed) {
         player.notification(Lang.UNEMPLOYED, notifications.type.ERROR, notifications.time.MED);
         return;
      } 

      if (command.job && command.job.id && player.character.job != command.job.id) {
         player.notification(Lang.NOT_SPECIFIED_JOB, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (command.position && player.dist(command.position) > 2.25) {
         player.notification(Lang.notOnPosition, notifications.type.ERROR, notifications.time.MED);
         return;
      } 

      if (command.faction) {
         if (command.faction.required && !character.faction) {
            player.notification(Lang.notInAnyFaction, notifications.type.ERROR, notifications.time.SHORT);
            return;
         }

         const faction = await Factions.findOne( { where: { id: character.faction } } );
         const rank = await FactionsRanks.findOne( { where: { id: player.character.rank } } );

         if (command.faction.permission) {
            if (!rank?.permissions.includes(command.faction.permission) && faction?.leader != player.character.id) {
               player.notification(Lang.noFactionPermissions, notifications.type.ERROR, notifications.time.SHORT);
               return;
            }
         }

         if (command.faction.type) {
            if (faction && !command.faction.type.includes(faction.type)) {
               player.notification(Lang.notInSpecFaction, notifications.type.ERROR, notifications.time.SHORT);
               return;
            }
         };
      }

      if (command.vehicle && !player.vehicle) {
         player.notification(Lang.notInVehicle, notifications.type.ERROR, notifications.time.MED);
         return;
      } 

      if (command.item) {
         const item = await Items.findOne( { where: { name: command.item, owner: character.id, entity: ItemEnums.entity.PLAYER } } );
         
         if (!item) {
            player.notification(Lang.youDontHave + command.item + '.', notifications.type.ERROR, 4);
            return;
         }
      }

      if (command.params && command.params.length > params.length) {
         player.message('Komanda: /' + commandName + ' [' + command.params.join('] [') + '] ', colors.hex.Help);
         return;
      } 

      command.call(player, ...params);
   } else {
      player.notification(Lang.cmdDoesntExist, notifications.type.ERROR, 4);
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
import './commands/faction.Commands';
import './commands/leo.Commands';
import './commands/job.Commands';
import './commands/test.commands';


