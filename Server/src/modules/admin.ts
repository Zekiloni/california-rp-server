



import { ranks, colors } from '@constants';
import { PlayerReport } from '@interfaces';


export class admins {
   static Reports = new Map<number, PlayerReport>()

   static createReport (player: PlayerMp, message: string) { 
      if (admins.Reports.get(player.character.id)) {
         return; 
      }

      admins.Reports.set(player.character.id, {
         sender: player,
         message: message,
         time: Date.now(),
         readed: false
      });
   }

   static responseReport (player: PlayerMp) { 
      const report = admins.Reports.get(player.character.id);
      if (report) {
         // show report
         report.readed = true;

         admins.deleteReport(player)
      }
   }

   static deleteReport (player: PlayerMp) { 
      if (admins.Reports.get(player.character.id)) {
         admins.Reports.delete(player.character.id);
      }
   }


}



