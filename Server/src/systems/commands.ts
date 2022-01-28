import { entityData, NotifyType } from '../globals/enums';
import { Colors, Messages } from '../globals/constants';


export let Commands: Commands = {};

type Commands = {
   [key: string]: Command
};


type factionTypeCommand = {
   Type?: number,
   id?: number
}

type Command = {
   description: string;
   params?: any[];
   faction?: factionTypeCommand;
   item?: any;
   vehicle?: boolean;
   job?: number;
   position?: Vector3Mp;
   admin?: number;
   call (player: PlayerMp, ...params: any): void;
};


mp.events.add('playerCommand', async (player: PlayerMp, content: string) => {

   if (!player.getVariable(entityData.LOGGED)) {
      return;
   }

   const params = content.split(/ +/);
   
   const commandName = params.splice(0, 1)[0];
   const command = Commands[commandName];

   if (command) {
      const Account = player.account;
      const Character = pplayer.character;

      if (command.admin && Account.administrator < command.admin) {
         player.sendNotification('Nije vam dozvoljeno !', NotifyType.ERROR, 4);
         return;
      } 

      if (command.job && Character.job != command.job) return player.sendNotification(Messages.NOT_SPECIFIC_JOB, NotifyType.ERROR, 4);

      if (command.position && player.dist(command.position) > 2) return player.sendNotification(Messages.NOT_ON_POSITION, NotifyType.ERROR, 4);

      if (command.faction) {
         //if (Command.Faction.Type && Command.Faction.Type != Factions[Character.Faction].type) return;
         if (command.faction.id && command.faction.id != Character.faction) return;
      }

      //if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, NotifyType.ERROR, 5);

      // // if (cmd.item && await frp.Items.HasItem(Player.CHARACTER_ID, cmd.item) == false) return Player.Notification(Messages.YOU_DONT_HAVE + cmd.item + '.', NotifyType.ERROR, 4);

      if (command.params && command.params.length > params.length) return player.sendMessage('Komanda: /' + commandName + ' [' + command.params.join('] [') + '] ', Colors.Help);

      command.call(player, ...params);
   } else {
      player.sendNotification(Messages.CMD_DOESNT_EXIST, NotifyType.ERROR, 4);
   }
});


import './commands/basic.commands';
import './commands/admin.commands';
import './commands/vehicle.commands';