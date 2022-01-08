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
   Desc: string;
   Params?: any[];
   Faction?: factionTypeCommand;
   Item?: any;
   Vehicle?: boolean;
   Job?: number;
   Position?: Vector3Mp;
   Admin?: number;
   Leader?: boolean;
   Call(Player: PlayerMp, ...params: any): void;
};


mp.events.add('playerCommand', async (player: PlayerMp, content: string) => {

   if (!player.getVariable(entityData.LOGGED)) return;

   const params = content.split(/ +/);
   
   const commandName = params.splice(0, 1)[0];
   const Command = Commands[commandName];

   if (Command) {
      const Account = player.Account;
      const Character = player.Character;

      if (Command.Admin && Account.Administrator < Command.Admin) return player.Notification('Nije vam dozvoljeno !', NotifyType.ERROR, 4);

      if (Command.Job && Character.Job != Command.Job) return player.Notification(Messages.NOT_SPECIFIC_JOB, NotifyType.ERROR, 4);

      if (Command.Position && player.dist(Command.Position) > 1.85) return player.Notification(Messages.NOT_ON_POSITION, NotifyType.ERROR, 4);

      if (Command.Faction) {
         //if (Command.Faction.Type && Command.Faction.Type != Factions[Character.Faction].type) return;
         if (Command.Faction.id && Command.Faction.id != Character.Faction) return;
      }

      //if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, NotifyType.ERROR, 5);

      // // if (cmd.item && await frp.Items.HasItem(Player.CHARACTER_ID, cmd.item) == false) return Player.Notification(Messages.YOU_DONT_HAVE + cmd.item + '.', NotifyType.ERROR, 4);

      if (Command.Params && Command.Params.length > params.length) return player.sendMessage('Komanda: /' + commandName + ' [' + Command.Params.join('] [') + '] ', Colors.Help);

      Command.Call(player, ...params);
   } else {
      player.Notification(Messages.CMD_DOESNT_EXIST, NotifyType.ERROR, 4);
   }
});


import './commands/message.commands';
import './commands/admin.commands';
import './commands/item.commands';
import './commands/vehicle.commands';