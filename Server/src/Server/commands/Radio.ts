import { Colors } from "../../Global/Colors";
import { Globals } from "../../Global/Globals";
import { Messages } from "../../Global/Messages";
import Channel from "../../Models/Channel";
import { Commands } from "../Commands";

Commands["r"] = {
   Desc: 'Radio komunikacija',
   Params: ['poruka'],
   Item: 'Handheld Radio',
   Call: async (Player: PlayerMp, Args: string[]) => {
      
   }
};

Commands["channel"] = {
   Desc: 'Podešavanje radio uređaja',
   Params: ['join', 'leave', 'create', 'delete', 'password'],
   Item: 'Handheld Radio',
   Call: async (Player: PlayerMp, Args: string[]) => {
      const Action = Args[0], Freq = Number(Args[1])
      switch (Action.toUpperCase()) {
         case 'JOIN':
            
            break;
         case 'LEAVE':
            
            break;
         case 'CREATE':
            if (await Channel.Exists(Freq)) return Player.Notification(Messages.CHANNEL_ALREADY_EXISTS, Globals.Notification.Error, 5);
            const NewChannel = await Channel.New(Player, Freq, Args[2]);
            if (NewChannel) Player.Notification(Messages.CHANNEL_SUCCESFULLY_CREATED, Globals.Notification.Succes, 5);
            break;
         case 'DELETE':
            if (!await Channel.Exists(Freq)) return Player.Notification(Messages.CHANNEL_NOT_FOUND, Globals.Notification.Error, 5);
            const DelChannel = await Channel.findOne({ where: { Frequency: Freq }});
            if (DelChannel) {
               DelChannel.destroy();
            } else Player.Notification(Messages.CHANNEL_NOT_FOUND, Globals.Notification.Error, 5);
            break;
         case 'PASSWORD':
            if (!await Channel.Exists(Freq)) return Player.Notification(Messages.CHANNEL_NOT_FOUND, Globals.Notification.Error, 5);
            const Password = Args[2];
            if (Password.length < 4) return Player.Notification(Messages.CHANNEL_TOO_SHORT_PASSWORD, Globals.Notification.Error, 5);
            const PwChannel = await Channel.findOne({ where: { Frequency: Freq }});
            if (PwChannel) {
               PwChannel.Password = Password;
               Player.Notification(Messages.CHANNEL_SUCCESFULLY_EDITED, Globals.Notification.Succes, 5);
            }
            break;
      
         default:
            break;
      }
   }
};


         // name: 'r',
         // desc: 'Radio Komunikacija',
         // params: ['tekst'],
         // item: 'Handheld Radio',
         // call: async (player, args) => {
         //    const Character = player.Character;
         //    console.log('Frekvencija /r Karaktera ' + Character.Frequency);
         //    if (Character.Frequency == 0) return player.Notification(frp.Globals.messages.NOT_IN_CHANNEL, frp.Globals.Notification.Error, 4);

         //    const Message = args.splice(0).join(' ');
         //    if (!Message.trim()) return;

         //    const Frequency = await frp.Channels.findOne({ where: { Frequency: Character.Frequency } }) ;
         //    Frequency.Send('** [CH: ' + Character.Frequency + '] ' + player.name + ': ' + Message);
         // }

