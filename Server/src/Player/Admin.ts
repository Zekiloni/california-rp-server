

// const Ban = require('../models/Ban');

import { Colors } from "../Global/Colors";
import Accounts from "../Models/Database/Account";

export const Administrators = [
   'None',
   'Helper',
   'Junior Administrator',
   'Administrator',
   'Senior Administrator',
   'General Administrator',
   'Lead Administrator',
   'Leadership',
   'CEO'
];

interface Reports {
   Sender: PlayerMp,
   Text: string,
   Timestamp: number
}

export class Admin {
   static Reports: Reports[] = [];

   static Chat(Player: PlayerMp, Message: string) {
      if (!Message.trim()) return;

      mp.players.forEach(async (Target: PlayerMp) => {
         if (Target.data.logged && Target.data.spawned) {
            const Account = await Accounts.findOne({ where: { id: Target.Account.id } });
            if (Account && Account.Administrator > 0) {
               Target.SendMessage('(( ' + Administrators[Account.Administrator] + ' ' + Player.name + ': ' + Message + ' ))', Colors.admin);
            }
         }
      });
   }

   static async Broadcast(Player: PlayerMp, Message: string) {
      if (!Message.trim()) return;

      const Account = await Accounts.findOne({ where: { id: Player.Account.id } });
      const Rank: number = Account == null ? 0 : Account.Administrator;

      mp.players.forEach((Target: PlayerMp) => {
         if (Target) {
            Target.SendMessage('(( [ ! ] ' + Administrators[Rank] + ' ' + Player.name + ': ' + Message + ' ))', Colors.admin);
         }
      });
   }

   static async Warning(Message: string) {
      mp.players.forEach(async (Target: PlayerMp) => {
         const Account = await Accounts.findOne({ where: { id: Target.Account.id } });
         if (Account && Account.Administrator > 0) {
            Target.SendMessage('[ ! ! ! ] : ' + Message, Colors.admin);
         }
      })
   }

   static async Ban(Player: PlayerMp, Target: PlayerMp, Reason: string, Days = 92) {
      const Now = Date.now();
      let Expiring = Now + (86400 * Days);


      //frp.Bans.New(player, target, reason, Now, Expiring);

   }

   static AdminActionNotify(Player: PlayerMp, Action: string) {
      mp.players.forEach((Target: PlayerMp) => {
         if (Target.Account.Administrator > 1 && Target != Player && Target.data.ADMIN_DUTY) {
            Target.SendMessage('[ADMIN] ' + Player.name + ` ${Action}`, Colors.tomato);
         }
      });
   }

   static Report = {
      Add(Player: PlayerMp, Message: string) {

         const Report = {
            Sender: Player,
            Text: Message,
            Timestamp: Date.now()
         }
         Admin.Reports.push(Report);
      },

      Remove: (i: number) => {
         Admin.Reports.splice(i, 1);
      }

   }
}



