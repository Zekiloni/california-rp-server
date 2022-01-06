import { EntityData, NotifyType } from '../enums';
import { Colors, Messages } from '../constants';


export let Commands: Commands = {};

type Commands = {
   [key: string]: Command
};


type Command = {
   Desc: string;
   Params?: string[];
   Faction?: number;
   Item?: any;
   Vehicle?: VehicleMp;
   Job?: number;
   Position?: Vector3Mp;
   Admin?: number;
   Leader?: boolean;
   Call(Player: PlayerMp, Args: string[]): void;
};


mp.events.add('playerCommand', async (player: PlayerMp, command: string) => {
  
   if (!player.getVariable(EntityData.LOGGED)) return;

   const params = command.split(/ +/);
   const commandName = params.splice(0, 1)[0];
   const fCommand = Commands[commandName];

   
   if (fCommand) {
      player.outputChatBox('Cmd true');
      // const Account = Player.Account;
      // const Character = Player.Character;

      // if (cmd.admin && Account.Administrator < cmd.admin) return Player.Notification('Nije vam dozvoljeno !', NotifyType.ERROR, 4);

      // if (cmd.job && Character.Job != cmd.job) return Player.Notification(Messages.NOT_SPECIFIC_JOB, NotifyType.ERROR, 4);

      // if (cmd.position && Player.dist(cmd.position) > 1.85) return Player.Notification(Messages.NOT_ON_POSITION, NotifyType.ERROR, 4);

      // if (cmd.faction) {
      //    //if (cmd.faction.type && cmd.faction.type != frp.Factions[Character.Faction].type) return;
      //    if (cmd.faction.id && cmd.faction.id != Character.Faction) return;
      // }

      // if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, NotifyType.ERROR, 5);

      // // if (cmd.item && await frp.Items.HasItem(Player.CHARACTER_ID, cmd.item) == false) return Player.Notification(Messages.YOU_DONT_HAVE + cmd.item + '.', NotifyType.ERROR, 4);

      if (fCommand.Params && fCommand.Params.length > params.length) return player.SendMessage('Komanda: /' + commandName + ' [' + fCommand.Params.join('] [') + '] ', Colors.Help);

      fCommand.Call(player, params);
   } else {
      player.Notification(Messages.CMD_DOESNT_EXIST, NotifyType.ERROR, 4);
   }
});
