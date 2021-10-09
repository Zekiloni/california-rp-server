import { Colors } from '../Global/Colors';
import { Globals } from '../Global/Globals';
import { Messages } from '../Global/Messages';


export let Commands: Commands = {};

type Commands = {
   [key: string]: Command
}

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
}


mp.events.add('playerCommand', async (Player: PlayerMp, Command: string) => {
   if (!Player.data.LOGGED_IN) return;
   const Args = Command.split(/ +/);
   const Name = Args.splice(0, 1)[0];
   const Cmd = Commands[Name];
   Player.outputChatBox('Cmd ' + Cmd);
   if (Cmd) {
      Player.outputChatBox('Cmd true');
      // const Account = Player.Account;
      // const Character = Player.Character;

      // if (cmd.admin && Account.Administrator < cmd.admin) return Player.Notification('Nije vam dozvoljeno !', Globals.Notification.Error, 4);

      // if (cmd.job && Character.Job != cmd.job) return Player.Notification(Messages.NOT_SPECIFIC_JOB, Globals.Notification.Error, 4);

      // if (cmd.position && Player.dist(cmd.position) > 1.85) return Player.Notification(Messages.NOT_ON_POSITION, Globals.Notification.Error, 4);

      // if (cmd.faction) {
      //    //if (cmd.faction.type && cmd.faction.type != frp.Factions[Character.Faction].type) return;
      //    if (cmd.faction.id && cmd.faction.id != Character.Faction) return;
      // }

      // if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, Globals.Notification.Error, 5);

      // // if (cmd.item && await frp.Items.HasItem(Player.CHARACTER_ID, cmd.item) == false) return Player.Notification(Messages.YOU_DONT_HAVE + cmd.item + '.', Globals.Notification.Error, 4);

      if (Cmd.Params && Cmd.Params.length > Args.length) return Player.SendMessage('Komanda: /' + Name + ' [' + Cmd.Params.join('] [') + '] ', Colors.help);

      Cmd.Call(Player, Args);
   } else {
      Player.Notification(Messages.CMD_DOESNT_EXIST, Globals.Notification.Error, 4);
   }
});
