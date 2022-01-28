// import { Colors } from "../../Global/Colors";
// import { Globals } from "../../Global/Globals";
// import { Messages } from "../../Global/Messages";
// import { Commands } from "../commands";

// Commands["f"] = {
//     Faction: 1,
//     description: 'Faction chat',
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         if (Player.character.Faction == 0) return Player.Notification(Messages.NOT_IN_ANY_FACTION, NotifyType.ERROR, 5);
//         // FactionChat
//     }
// };

// Commands["invite"] = {
//     Leader: true,
//     params: ['igrač'],
//     description: 'Slanje zahteva za pristup fakciji',
//     Call: async (Player: PlayerMp, Args: string[]) => {
//         // Provera da li je lider
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
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
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
//         if (TargetPlayer.character.Faction == 0) return Player.Notification(Messages.NOT_IN_ANY_FACTION, NotifyType.ERROR, 5);
//         if (TargetPlayer.character.Faction != Player.character.Faction) return Player.Notification(Messages.NOT_IN_YOUR_FACTION, NotifyType.ERROR, 5);
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
//         if (Player.character.Faction == 0) return Player.Notification(Messages.NOT_FACTION_LEADER, NotifyType.ERROR, 5);
//         const TargetPlayer = mp.players.find(Args[0]);
//         if (!TargetPlayer) return Player.Notification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
//         const Rank = Args[1];
//         TargetPlayer.character.Faction_Rank = Rank;
//         TargetPlayer.character.save();
//     }
// };