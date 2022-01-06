import { Globals } from "../../Global/Globals";
import { Messages } from "../../Global/Messages";
import Food from "../jobs/Food";
import { Sanitation } from "../jobs/Sanitation";
import { Taxi } from "../jobs/Taxi";
import { Commands } from "../commands";

// name: 'takejob',
// desc: 'Zapošljavanje.',
// call: async (player, args) => {
//    const Character = player.Character;
//    if (Character.Job != frp.Globals.Jobs.Unemployed) return player.Notification(frp.Globals.messages.ALREADY_EMPLOYED, frp.NotifyType.ERROR, 5);

//    const Nearest = frp.Jobs.Nearest(player);
//    if (Nearest) {
//       player.call('client:job:offer', [Nearest]);
//    } else {
//       player.Notification(frp.Globals.messages.NOT_NEAR_JOB, frp.NotifyType.ERROR, 5);
//    }
// }
// },
Commands["takejob"] = {
   Desc: 'Zapošljavanje',
   Call: async (Player: PlayerMp, Args: string[]) => {
      if (Player.Character.Job != 0) return Player.Notification(Messages.ALREADY_EMPLOYED, NotifyType.ERROR, 5);

   }
};

Commands["quitjob"] = {
   Desc: 'Davanje otkaza',
   Call: async (Player: PlayerMp, Args: string[]) => {
      if (Player.Character.Job == 0) return Player.Notification(Messages.NOT_EMPLOYED, NotifyType.ERROR, 5);
      Player.Character.SetJob(0);
   }
};

/* Sanitation job */
Commands["garbage"] = {
   Desc: 'Započinje/zaustavlja turu smećara.',
   Params: ['start / stop'],
   Job: Globals.Jobs.Sanitation,
   Position: new mp.Vector3(0, 0, 0), // ToDo
   Call: async (Player: PlayerMp, Args: string[]) => {
      switch (Args[0].toUpperCase()) {
         case 'START':
            Sanitation.Start(Player);
            break;
         case 'STOP':
            Sanitation.Stop(Player);
            break;
         default:
            break;
      }
   }
};

/* Taxi Job */
Commands["taxi"] = {
   Desc: 'Započinje/zaustavlja taxi smenu.',
   Params: ['start / stop'],
   Job: Globals.Jobs.Taxi,
   Position: new mp.Vector3(0, 0, 0), // ToDo
   Call: async (Player: PlayerMp, Args: string[]) => {
      switch (Args[0].toUpperCase()) {
         case 'START':
            Taxi.Start(Player, false);
            break;
         case 'STOP':
            Taxi.Stop(Player);
            break;
         default:
            break;
      }
   }
};

Commands["fare"] = {
   Desc: 'Postavljanje cene po minutu na taksimetru.',
   Params: ['cena po minutu'],
   Job: Globals.Jobs.Taxi,
   Call: async (Player: PlayerMp, Args: string[]) => {
      Taxi.Fare(Player, Number(Args[0]));
   }
};

/* Food Delivery */
Commands["orders"] = {
   Desc: 'Lista naručene hrane.',
   Job: Globals.Jobs.Food_Delivery,
   Position: new mp.Vector3(0, 0, 0), //ToDo
   Call: async (Player: PlayerMp, Args: string[]) => {
      Player.call('CLIENT::JOB:FOOD:ORDERS', [Food.GetOrders()]);
   }
};
