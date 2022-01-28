// import { Colors } from "../../Global/Colors";
// import { Globals } from "../../Global/Globals";
// import { Messages } from "../../Global/Messages";
// import { IsPlayerNearPlayer } from "../../Global/Utils";
// import { Commands } from "../commands";


// Commands["help"] = {
//    description: 'Lista komandi',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       // ToDo
//    }
// };

// Commands["changespawn"] = {
//    description: 'Promena mesta spawna',
//    params: ['mesto'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const Spawns = ['Default spawn', 'Zadnja pozicija', 'Fakcija'];
//       const InputNumber = parseInt(Args[0]);
//       //Player.Character.Spawn_Place = Spawns[InputNumber];
//       // ToDo
//       Player.SendMessage('Promenili ste mesto spawna na ' + Spawns[InputNumber], Colors.info);
//    }
// };

// Commands["blindfold"] = {
//    description: 'Povez preko ociju',
//    params: ['igrac'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]);
//       if (TargetPlayer) {
//          TargetPlayer.call('CLIENT::INTERFACE:BLINDFOLD', [TargetPlayer])
//       }
//    }
// };

// Commands["report"] = {
//    description: 'Prijavite igrača ili neki događaj adminu',
//    params: ['text'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const ReportText = Args[0];
//       // ToDo
//    }
// };

// Commands["fontsize"] = {
//    description: 'Veličina fonta četa',
//    params: ['vrednost'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const InputNumber = parseInt(Args[0]);

//       if (InputNumber) {
//          Player.call('CHAT::FONTSIZE', [InputNumber]);
//          Player.SendMessage('[OOC] Namestli ste veličinu četa na ' + InputNumber, Colors.info);
//       }
//       // ToDo
//    }
// };

// Commands["dmv"] = {
//    description: 'Otvaranje menija za dozvole',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       //Player.call('')
//       // ToDo
//    }
// }

// Commands["tog"] = {
//    description: 'Gašenje/paljenje određenog elementa',
//    params: ['akcija'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       switch (Args[0].toLowerCase()) {
//          case 'PHONE':
//             // ToDo
//             break;
//          case 'OOC':

//             break;
//          case 'NEWBIE':

//             break;
//          default:
//             break;
//       }
//    }
// }

// Commands["show"] = {
//    description: 'Pokazivanje dokumenta drugom igraču',
//    params: ['vrsta', 'igrač'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const TargetPlayer = mp.players.find(Args[0]);
//       if (!TargetPlayer) return Player.notify(Messages.USER_NOT_FOUND);

//       switch (Args[0].toLowerCase()) {
//          case 'LIC':
//             // ToDo
//             TargetPlayer.call('CLIENT::DOCUMENTS:SHOW', [0, Player.Character]);
//             break;
//          case 'ID':
//             TargetPlayer.call('CLIENT::DOCUMENTS:SHOW', [1, Player.Character]);
//             break;
//          case 'PASSPORT':
//             TargetPlayer.call('CLIENT::DOCUMENTS:SHOW', [2, Player.Character]);
//             break;
//          default:
//             break;
//       }
//    }
// };

// Commands["pay"] = {
//    description: 'Davanje novca',
//    params: ['igrač', 'količina'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const Character = Player.Character;
//       if (Character.Hours < 2) return Player.Notification(Messages.YOU_NEED_MINIMUM_2_HOURS_OF_PLAYING, NotifyType.ERROR, 5);

//       const Target = mp.players.find(Args[0]);
//       if (Target) {
//          if (IsPlayerNearPlayer(Player, Target)) {
//             const Amount = parseInt(Args[1]);

//             if (Amount > Character.Money) return Player.Notification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 5); // PORUKA: Nemate dovoljno novca
//             if (Amount < 1) return Player.Notification(Messages.MINIMUM_PAY_AMOUNT, NotifyType.ERROR, 5);; // PORUKA: Ne mozes dati minus

//             Target.Character.GiveMoney(Target, Amount);
//             Character.GiveMoney(Player, -Amount);
//             //Player.ProximityMessage(frp.Globals.distances.me, `* ${player.name} daje nešto novca ${Target.Character.name}. (( Pay ))`, frp.Globals.Colors.purple);
//          } else {
//             Player.Notification(Messages.PLAYER_NOT_NEAR, NotifyType.ERROR, 5);
//          }
//       }
//    }
// };

// Commands["accept"] = {
//    description: 'Prihvatanje poziva u fakciju',
//    params: ['akcija'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       if (!Args[0]) return;
//       switch (Args[0].toUpperCase()) {
//          case 'INVITE':
//             const Faction = Player.data.INVITE_REQUIEST;
//             if (Faction == 0)
//                return false;

//             Player.Character.Faction = Faction;
//             Player.Character.Faction_Rank = 'Newbie';
//             Player.Character.save();

//             //Player.SendMessage('Uspešno ste se pridružili fakciji ' + mp.factions[faction].name + '.', mp.colors.success);
//             break;
//          default:
//             break;
//       }
//    }
// };

// Commands["buy"] = {
//    description: 'Kupovina',
//    params: ['akcija'],
//    call: (Player: PlayerMp, Args: string[]) => {
//       if (!Args[0]) return;
//       switch (Args[0].toUpperCase()) {
//          case 'HOUSE':
//             // ToDo
//             break;
//          case 'BUSINESS':
//             break;
//          case 'FOOD':
//             break;
//          default:
//             break;
//       }
//    }
// };
