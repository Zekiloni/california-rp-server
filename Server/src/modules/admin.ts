



import { ranks, colors } from '@constants';
import { playerReport } from '@interfaces';





export class Admin {
   static Reports = new Map<PlayerMp, playerReport>()

   static sendMessage (player: PlayerMp, message: string) {
      if (!message.trim()) return;

      mp.players.forEach((target: PlayerMp) => {
         if (target.account.administrator > 0) {
            target.sendMessage('(( ' + ranks[target.account.administrator] + ' ' + player.name + ': ' + message + ' ))', colors.hex.Admin);
         }
      });
   }

   static async broadcast (player: PlayerMp, message: string) {
      if (!message.trim()) return;

      mp.players.forEach((Target: PlayerMp) => {
         Target.sendMessage('(( [ ! ] ' + ranks[player.account.administrator] + ' ' + player.name + ': ' + message + ' ))', colors.hex.Admin);
      });
   }

   static createReport (player: PlayerMp, message: string) { 
      if (Admin.Reports.get(player)) return; // already have report

      Admin.Reports.set(player, {
         sender: player,
         message: message,
         time: Date.now(),
         readed: false
      });
   }

   static readReport (player: PlayerMp) { 
      const report = Admin.Reports.get(player);
      if (report) {
         // show report
         report.readed = true;

         Admin.deleteReport(player)
      }
   }

   static deleteReport (player: PlayerMp) { 
      if (Admin.Reports.get(player)) {
         Admin.Reports.delete(player);
      }
   }


}



