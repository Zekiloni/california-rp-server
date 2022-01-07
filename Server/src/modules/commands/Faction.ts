// import { Colors } from "../../Global/Colors";
// import { Globals } from "../../Global/Globals";
// import { Messages } from "../../Global/Messages";
// import { Commands } from "../commands";

// Commands["f"] = {
//     Faction: 1,
//     Desc: 'Faction chat',
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         if (Player.Character.Faction == 0) return Player.Notification(Messages.NOT_IN_ANY_FACTION, NotifyType.ERROR, 5);
//         // FactionChat
//     }
// };

// Commands["invite"] = {
//     Leader: true,
//     Params: ['igrač'],
//     Desc: 'Slanje zahteva za pristup fakciji',
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         // Provera da li je lider
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
//         TargetPlayer.data.INVITE_REQUEST = Player.Character.Faction;
//         TargetPlayer.SendMessage(Messages.INVITED_TO_FACTION, Colors.info);
//     }
// };

// Commands["uninvite"] = {
//     Leader: true,
//     Desc: 'Izbacivanje iz fakcije',
//     Params: ['igrač'],
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
//         if (TargetPlayer.Character.Faction == 0) return Player.Notification(Messages.NOT_IN_ANY_FACTION, NotifyType.ERROR, 5);
//         if (TargetPlayer.Character.Faction != Player.Character.Faction) return Player.Notification(Messages.NOT_IN_YOUR_FACTION, NotifyType.ERROR, 5);
//         // Provera da li je igrač lider te fakcije
//         TargetPlayer.Character.Faction = 0;
//         TargetPlayer.Character.Faction_Rank = 'None';
//         await TargetPlayer.Character.save();
//         TargetPlayer.SendMessage(Messages.YOU_ARE_KICKED_FROM_FACTION, Colors.info);
//         Player.SendMessage(Messages.YOU_HAVE_KICKED_PLAYER_FROM_FACTION, Colors.info);
//     }
// };

// Commands["setrank"] = {
//     Faction: 1,
//     Desc: 'Postavljanje ranka igraču',
//     Params: ['igrač', 'rank'],
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         if (Player.Character.Faction == 0) return Player.Notification(Messages.NOT_FACTION_LEADER, NotifyType.ERROR, 5);
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
//         const Rank = Args[1];
//         TargetPlayer.Character.Faction_Rank = Rank;
//         TargetPlayer.Character.save();
//     }
// };