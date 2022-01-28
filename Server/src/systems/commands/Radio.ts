// import { Colors } from "../../Global/Colors";
// import { Globals } from "../../Global/Globals";
// import { Messages } from "../../Global/Messages";
// import Channel from "../../models/channel.model";
// import { Commands } from "../commands";

// Commands["r"] = {
//    description: 'Radio komunikacija',
//    params: ['poruka'],
//    Item: 'Handheld Radio',
//    Call: async (Player: PlayerMp, Args: string[]) => {
      
//    }
// };

// Commands["channel"] = {
//    description: 'Podešavanje radio uređaja',
//    params: ['join', 'leave', 'create', 'delete', 'password'],
//    Item: 'Handheld Radio',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const Action = Args[0], Freq = Number(Args[1])
//       switch (Action.toUpperCase()) {
//          case 'JOIN':
//             if (!await Channel.Exists(Freq)) return Player.Notification(Messages.CHANNEL_NOT_FOUND, NotifyType.ERROR, 5);
//             const JoinChannel = await Channel.findOne({ where: { Frequency: Freq }});
//             if (JoinChannel?.Password == Args[2]) {
//                JoinChannel.AddMember(Player);
//                Player.Notification(Messages.SUCCESSFULY_JOINED_CHANNEL, NotifyType.SUCCESS, 5);
//             }
//             break; 
//          case 'LEAVE':
//             const LeaveChannel = await Channel.findOne({ where: { Frequency: Freq }});
//             if (LeaveChannel?.Password == Args[2]) {
//                LeaveChannel.RemoveMember(Player);
//                Player.Notification(Messages.CHANNEL_SUCCESFULLY_LEAVED, NotifyType.SUCCESS, 5);
//             }
//             break;
//          case 'CREATE':
//             if (await Channel.Exists(Freq)) return Player.Notification(Messages.CHANNEL_ALREADY_EXISTS, NotifyType.ERROR, 5);
//             const NewChannel = await Channel.New(Player, Freq, Args[2]);
//             if (NewChannel) Player.Notification(Messages.CHANNEL_SUCCESFULLY_CREATED, NotifyType.SUCCESS, 5);
//             break;
//          case 'DELETE':
//             if (!await Channel.Exists(Freq)) return Player.Notification(Messages.CHANNEL_NOT_FOUND, NotifyType.ERROR, 5);
//             const DelChannel = await Channel.findOne({ where: { Frequency: Freq }});
//             if (DelChannel) {
//                DelChannel.destroy();
//             } else Player.Notification(Messages.CHANNEL_NOT_FOUND, NotifyType.ERROR, 5);
//             break;
//          case 'PASSWORD':
//             if (!await Channel.Exists(Freq)) return Player.Notification(Messages.CHANNEL_NOT_FOUND, NotifyType.ERROR, 5);
//             if (Args[2].length < 4) return Player.Notification(Messages.CHANNEL_TOO_SHORT_PASSWORD, NotifyType.ERROR, 5);
//             const PwChannel = await Channel.findOne({ where: { Frequency: Freq }});
//             if (PwChannel) {
//                PwChannel.Password = Args[2];
//                Player.Notification(Messages.CHANNEL_SUCCESFULLY_EDITED, NotifyType.SUCCESS, 5);
//             }
//             break;
      
//          default:
//             break;
//       }
//    }
// };


//          // name: 'r',
//          // description: 'Radio Komunikacija',
//          // params: ['tekst'],
//          // item: 'Handheld Radio',
//          // call: async (player, args) => {
//          //    const Character = pplayer.character;
//          //    console.log('Frekvencija /r Karaktera ' + Character.Frequency);
//          //    if (Character.Frequency == 0) return player.Notification(frp.Globals.messages.NOT_IN_CHANNEL, frp.NotifyType.ERROR, 4);

//          //    const Message = args.splice(0).join(' ');
//          //    if (!Message.trim()) return;

//          //    const Frequency = await frp.Channels.findOne({ where: { Frequency: Character.Frequency } }) ;
//          //    Frequency.Send('** [CH: ' + Character.Frequency + '] ' + player.name + ': ' + Message);
//          // }

