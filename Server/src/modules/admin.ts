



import { colors, Lang, none, ranks } from '@constants';
import { notifications } from '@enums';
import { PlayerReport } from '@interfaces';
import { checkForDot } from '@shared';


export class admins {
   static reports = new Map<number, PlayerReport>();


   static chat (player: PlayerMp, message: string) {
      const rank = ranks[player.account.administrator];

      const admins = mp.players.toArray().filter(player => player.account.administrator > none);
      admins.forEach(admin => {
         admin.message(rank + ' ' + player.name + ': ' + checkForDot(message), colors.hex.BROADCAST);
      });
   }

   static broadcast (player: PlayerMp, message: string) {
      const rank = ranks[player.account.administrator];
      const name = player.name + ' (' + player.account.username + ')';

      mp.players.forEach(target => {
         target.message(rank + ' ' + name + ': ' + checkForDot(message), colors.hex.BROADCAST);
      });
   }


   static notify (message: string, color: string) {
      const administrators = mp.players.toArray().filter(player => player.account.administrator > none);
      administrators.forEach(admin => 
         admin.message(message, color)
      );
   }

   static warning () {
      
   }
   
   static createReport (player: PlayerMp, message: string) { 
      if (admins.reports.get(player.character.id)) {
         player.notification(Lang.uAlreadyHaveActiveReport, notifications.type.ERROR, notifications.time.LONG);
         return; 
      }

      const report = {
         sender: player,
         message: message,
         time: Date.now(),
         readed: false
      }

      admins.reports.set(player.character.id, report);
      player.notification(Lang.uSendReport, notifications.type.SUCCESS, notifications.time.MED);
      
      admins.notify(Lang.NEW_REPORT, colors.hex.Admin);

      return report;
   }

   static reportResponse (player: PlayerMp, target: PlayerMp, response: string) { 
      const report = admins.reports.get(target.character.id);

      if (report?.answer) {
         return;
      }
      
      report!.answer = {
         name: player.name,
         username: player.account.username,
         time: Date.now(),
         message: response
      }
      
      if (target) {
         target.call('CLIENT::PLAYER_MENU:REPORT', [report!.answer]);
      }
   }

   static reportDelete (player: PlayerMp) { 
      const report = admins.reports.get(player.character.id);

      if (!report) {
         return;
      }

      player.notification(Lang.urReportDeleted, notifications.type.INFO, notifications.time.MED);
      admins.reports.delete(player.character.id);
      
      return true;
   }
}



