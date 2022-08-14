import { Lang } from "@constants";
import { notifications } from "@enums";
import { Characters } from "../character/s.Character";
import { Accounts } from "./s.Account";


export class AccountManager extends Accounts {
   static playerLogin (player: PlayerMp, username: string, password: string) {
      return Accounts.findOne({ where: { username: username }, include: Characters }).then(account => {
         if (!account) {
            return;
         }

         if (account.isPlaying) {
            return;
         }

         const logged = account.login(password);
         
         if (!logged) { 
            player.notification(Lang.INCORRECT_PASSWORD, notifications.type.ERROR, 5);
            return;
         }

         account.setLogged(player, true);
         return account;
      });
   }
}

mp.events.add('playerAccountLogin', AccountManager.playerLogin);