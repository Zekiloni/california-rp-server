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

   if (!player.getVariable(entityData.LOGGED)) return;

   const params = content.split(/ +/);
   
   const commandName = params.splice(0, 1)[0];
   const Command = Commands[commandName];

   if (Command) {
      const Account = player.Account;
      const Character = player.Character;

      if (Command.admin && Account.administrator < Command.admin) return player.Notification('Nije vam dozvoljeno !', NotifyType.ERROR, 4);

      if (Command.job && Character.job != Command.job) return player.Notification(Messages.NOT_SPECIFIC_JOB, NotifyType.ERROR, 4);

      if (Command.position && player.dist(Command.position) > 2) return player.Notification(Messages.NOT_ON_POSITION, NotifyType.ERROR, 4);

      if (Command.faction) {
         //if (Command.Faction.Type && Command.Faction.Type != Factions[Character.Faction].type) return;
         if (Command.faction.id && Command.faction.id != Character.faction) return;
      }

      //if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, NotifyType.ERROR, 5);

      // // if (cmd.item && await frp.Items.HasItem(Player.CHARACTER_ID, cmd.item) == false) return Player.Notification(Messages.YOU_DONT_HAVE + cmd.item + '.', NotifyType.ERROR, 4);

      if (Command.params && Command.params.length > params.length) return player.sendMessage('Komanda: /' + commandName + ' [' + Command.params.join('] [') + '] ', Colors.Help);

      Command.call(player, ...params);
   } else {
      player.Notification(Messages.CMD_DOESNT_EXIST, NotifyType.ERROR, 4);
   }
});


import './commands/message.commands';
import './commands/admin.commands';
import './commands/vehicle.commands';