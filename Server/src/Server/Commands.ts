import { Colors } from '../Global/Colors';
import { Globals } from '../Global/Globals';
import { Messages } from '../Global/Messages';




const Commands: Commands = {};

type Commands = {
   [key: string]: Command
}

type Command = {
   name: string;
   desc: string;
   params: string[];
   faction?: any;
   item?: any;
   vehicle?: VehicleMp;
   job?: number;
   position?: Vector3Mp;
   admin?: any;
   call (Player: PlayerMp, args: string[]): void;
}


const commandFiles = [
   'basic.commands',
   'admin.commands',
   'house.commands',
   'business.commands',
   'item.commands',
   'vehicle.commands',
   'interior.commands',
   'job.commands',
   'message.commands',
   'radio.commands',
   'faction.commands',
   'law.commands',
   'lock.command'
];


(async () => { 
   for (const file of commandFiles) {
      const cmdFile = require('../commands/' + file);
      for (const Command of cmdFile) { 
         Commands[Command.name] = Command;
      }
   }
})();


mp.events.add('playerCommand', async (Player: PlayerMp, Command: string) => {
   if (!Player.data.logged) return;

   let args = Command.split(/ +/);
   const Name = args.splice(0, 1)[0];
   let cmd = Commands[Name];

   if (cmd) {
      const Account = await Player.Account();
      const Character = await Player.Character();
      
      if (cmd.admin && Account.Administrator < cmd.admin) return Player.Notification('Nije vam dozvoljeno !', Globals.Notification.Error, 4);
      
      if (cmd.job && Character.Job != cmd.job) return Player.Notification(Messages.NOT_SPECIFIC_JOB, Globals.Notification.Error, 4);

      if (cmd.position && Player.dist(cmd.position) > 1.85) return Player.Notification(Messages.NOT_ON_POSITION, Globals.Notification.Error, 4);

      if (cmd.faction) { 
         //if (cmd.faction.type && cmd.faction.type != frp.Factions[Character.Faction].type) return;
         if (cmd.faction.id && cmd.faction.id != Character.Faction) return;
      }

      if (cmd.vehicle && !Player.vehicle) return Player.Notification(Messages.NOT_IN_VEHICLE, Globals.Notification.Error, 5);

      // if (cmd.item && await frp.Items.HasItem(Player.CHARACTER_ID, cmd.item) == false) return Player.Notification(Messages.YOU_DONT_HAVE + cmd.item + '.', Globals.Notification.Error, 4);
      
      if (cmd.params && cmd.params.length > args.length) return Player.SendMessage('Komanda: /' + Name + ' [' + cmd.params.join('] [') + '] ', Colors.help);

      cmd.call(Player, args);
   } else {
      Player.Notification(Messages.CMD_DOESNT_EXIST, Globals.Notification.Error, 4);
   }
});
