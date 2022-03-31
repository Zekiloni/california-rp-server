import { cmds, Lang } from '@constants';
import { FactionsPermissions, notifications } from '@enums';
import { Factions } from '@models';
import { Commands } from '../commands';


Commands[cmds.names.FACTION_CHAT] = {
   description: cmds.descriptions.FACTION_CHAT,
   faction: { required: true },
   call (player: PlayerMp, ...text: any) {
      const message = [...text].join(' ');

      if (!message.trim()) {
         return;
      };

      Factions.findOne( { where: { id: player.character.faction } } ).then(faction => {
         if (!faction) {
            return;
         }

         faction.chat(player, message);
      })
   }
};


Commands[cmds.names.FACTION_PANEL] = {
   description: cmds.descriptions.FACTION_PANEL,
   faction: { required: true },
   call (player: PlayerMp) {
      player.character.getFaction().then(async faction => {
         const members = await faction?.allMembers;
         faction!.members = members!;
         

         faction?.members.forEach(member => console.log(member.name));
         
         player.call('CLIENT::FACTION:PANEL', [faction]);
      });
   }
};


Commands[cmds.names.FACTION_INVITE] = {
   description: cmds.descriptions.FACTION_INVITE,
   faction: { 
      required: true, 
      permission: FactionsPermissions.INVITE_PLAYER 
   },
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (!target.character) {
         return;
      }

      Factions.findOne( { where: { id: player.character.faction } } ).then(faction => {
         if (!faction) {
            return;
         }

         faction?.invite(player, target);
      })
   }
}


Commands[cmds.names.FACTION_KICK] = {
   description: cmds.descriptions.FACTION_KICK,
   faction: { 
      required: true, 
      permission: FactionsPermissions.KICK_PLAYER
   },
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      Factions.findOne( { where: { id: player.character.faction } } ).then(faction => {
         if (!faction) {
            return;
         }

         faction.kick(player, target);
      });
   }
}


Commands[cmds.names.FACTION_LEAVE] = {
   description: cmds.descriptions.FACTION_LEAVE,
   faction: { required: true },
   call (player: PlayerMp) {
      Factions.findOne( { where: { id: player.character.faction } } ).then(faction => {
         if (!faction) {
            return;
         }

         faction.leave(player);
      });
   }
}

// Commands["invite"] = {
//     Leader: true,
//     params: ['igrač'],
//     description: 'Slanje zahteva za pristup fakciji',
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         // Provera da li je lider
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, notifications.type.ERROR, 5);
//         TargetPlayer.data.INVITE_REQUEST = Player.character.Faction;
//         TargetPlayer.SendMessage(Messages.INVITED_TO_FACTION, Colors.info);
//     }
// };

// Commands["uninvite"] = {
//     Leader: true,
//     description: 'Izbacivanje iz fakcije',
//     params: ['igrač'],
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, notifications.type.ERROR, 5);
//         if (TargetPlayer.character.Faction == 0) return Player.Notification(Messages.NOT_IN_ANY_FACTION, notifications.type.ERROR, 5);
//         if (TargetPlayer.character.Faction != Player.character.Faction) return Player.Notification(Messages.NOT_IN_YOUR_FACTION, notifications.type.ERROR, 5);
//         // Provera da li je igrač lider te fakcije
//         TargetPlayer.character.Faction = 0;
//         TargetPlayer.character.Faction_Rank = 'None';
//         await TargetPlayer.character.save();
//         TargetPlayer.SendMessage(Messages.YOU_ARE_KICKED_FROM_FACTION, Colors.info);
//         Player.SendMessage(Messages.YOU_HAVE_KICKED_PLAYER_FROM_FACTION, Colors.info);
//     }
// };

// Commands["setrank"] = {
//     Faction: 1,
//     description: 'Postavljanje ranka igraču',
//     params: ['igrač', 'rank'],
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         if (Player.character.Faction == 0) return Player.Notification(Messages.NOT_FACTION_LEADER, notifications.type.ERROR, 5);
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, notifications.type.ERROR, 5);
//         const Rank = Args[1];
//         TargetPlayer.character.Faction_Rank = Rank;
//         TargetPlayer.character.save();
//     }
// };