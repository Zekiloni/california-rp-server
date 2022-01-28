


import { Colors, Ranks } from '../globals/constants';
import { entityData } from '../globals/enums';


interface Report {
   Sender: PlayerMp,
   Message: string,
   Answer?: string | null,
   Answered_by?: PlayerMp | null,
   Time: number,
   Readed: boolean
};


export class Admin {
   static Reports = new Map<PlayerMp, Report>()

   static sendMessage (player: PlayerMp, message: string) {
      if (!message.trim()) return;

      mp.players.forEach((target: PlayerMp) => {
         if (target.getVariable(entityData.LOGGED) && target.Account.administrator > 0) {
            target.sendMessage('(( ' + Ranks[target.Account.administrator] + ' ' + player.name + ': ' + message + ' ))', Colors.Admin);
         }
      });
   }

   static async broadcast (player: PlayerMp, message: string) {
      if (!message.trim()) return;

      mp.players.forEach((Target: PlayerMp) => {
         Target.sendMessage('(( [ ! ] ' + Ranks[player.Account.administrator] + ' ' + player.name + ': ' + message + ' ))', Colors.Admin);
      });
   }

   static createReport (player: PlayerMp, message: string) { 
      if (Admin.Reports.get(player)) return; // already have report

      Admin.Reports.set(player, {
         Sender: player,
         Message: message,
         Time: Date.now(),
         Readed: false
      });
   }

   static readReport (player: PlayerMp) { 
      const report = Admin.Reports.get(player);
      if (report) {
         // show report
         report.Readed = true;

         Admin.deleteReport(player)
      }
   }

   static deleteReport (player: PlayerMp) { 
      if (Admin.Reports.get(player)) {
         Admin.Reports.delete(player);
      }
   }


}



