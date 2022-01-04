import { Colors } from "../../Global/Colors";
import { Globals } from "../../Global/Globals";
import { Messages } from "../../Global/Messages";
import { IsPlayerNearPlayer } from "../../Global/Utils";
import { Commands } from "../Commands";


Commands["help"] = {
   Desc: 'Lista komandi',
   Call: async (Player: PlayerMp, Args: string[]) => {
      // ToDo
   }
};

Commands["changespawn"] = {
   Desc: 'Promena mesta spawna',
   Params: ['mesto'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const Spawns = ['Default spawn', 'Zadnja pozicija', 'Fakcija'];
      const InputNumber = parseInt(Args[0]);
      //Player.Character.Spawn_Place = Spawns[InputNumber];
      // ToDo
      Player.SendMessage('Promenili ste mesto spawna na ' + Spawns[InputNumber], Colors.info);
   }
};

Commands["blindfold"] = {
   Desc: 'Povez preko ociju',
   Params: ['igrac'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]);
      if (TargetPlayer) {
         TargetPlayer.call('CLIENT::INTERFACE:BLINDFOLD', [TargetPlayer])
      }
   }
};

Commands["report"] = {
   Desc: 'Prijavite igrača ili neki događaj adminu',
   Params: ['text'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const ReportText = Args[0];
      // ToDo
   }
};

Commands["fontsize"] = {
   Desc: 'Veličina fonta četa',
   Params: ['vrednost'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const InputNumber = parseInt(Args[0]);

      if (InputNumber) {
         Player.call('CHAT::FONTSIZE', [InputNumber]);
         Player.SendMessage('[OOC] Namestli ste veličinu četa na ' + InputNumber, Colors.info);
      }
      // ToDo
   }
};

Commands["dmv"] = {
   Desc: 'Otvaranje menija za dozvole',
   Call: async (Player: PlayerMp, Args: string[]) => {
      //Player.call('')
      // ToDo
   }
}

Commands["tog"] = {
   Desc: 'Gašenje/paljenje određenog elementa',
   Params: ['akcija'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      switch (Args[0].toLowerCase()) {
         case 'PHONE':
            // ToDo
            break;
         case 'OOC':

            break;
         case 'NEWBIE':

            break;
         default:
            break;
      }
   }
}

Commands["show"] = {
   Desc: 'Pokazivanje dokumenta drugom igraču',
   Params: ['vrsta', 'igrač'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]);
      if (!TargetPlayer) return Player.notify(Messages.USER_NOT_FOUND);

      switch (Args[0].toLowerCase()) {
         case 'LIC':
            // ToDo
            TargetPlayer.call('CLIENT::DOCUMENTS:SHOW', [0, Player.Character]);
            break;
         case 'ID':
            TargetPlayer.call('CLIENT::DOCUMENTS:SHOW', [1, Player.Character]);
            break;
         case 'PASSPORT':
            TargetPlayer.call('CLIENT::DOCUMENTS:SHOW', [2, Player.Character]);
            break;
         default:
            break;
      }
   }
};

Commands["pay"] = {
   Desc: 'Davanje novca',
   Params: ['igrač', 'količina'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const Character = Player.Character;
      if (Character.Hours < 2) return Player.Notification(Messages.YOU_NEED_MINIMUM_2_HOURS_OF_PLAYING, Globals.Notification.Error, 5);

      const Target = mp.players.find(Args[0]);
      if (Target) {
         if (IsPlayerNearPlayer(Player, Target)) {
            const Amount = parseInt(Args[1]);

            if (Amount > Character.Money) return Player.Notification(Messages.NOT_ENOUGH_MONEY, Globals.Notification.Error, 5); // PORUKA: Nemate dovoljno novca
            if (Amount < 1) return Player.Notification(Messages.MINIMUM_PAY_AMOUNT, Globals.Notification.Error, 5);; // PORUKA: Ne mozes dati minus

            Target.Character.GiveMoney(Target, Amount);
            Character.GiveMoney(Player, -Amount);
            //Player.ProximityMessage(frp.Globals.distances.me, `* ${player.name} daje nešto novca ${Target.Character.name}. (( Pay ))`, frp.Globals.Colors.purple);
         } else {
            Player.Notification(Messages.PLAYER_NOT_NEAR, Globals.Notification.Error, 5);
         }
      }
   }
};

Commands["accept"] = {
   Desc: 'Prihvatanje poziva u fakciju',
   Params: ['akcija'],
   Call: (Player: PlayerMp, Args: string[]) => {
      if (!Args[0]) return;
      switch (Args[0].toUpperCase()) {
         case 'INVITE':
            const Faction = Player.data.INVITE_REQUIEST;
            if (Faction == 0)
               return false;

            Player.Character.Faction = Faction;
            Player.Character.Faction_Rank = 'Newbie';
            Player.Character.save();

            //Player.SendMessage('Uspešno ste se pridružili fakciji ' + mp.factions[faction].name + '.', mp.colors.success);
            break;
         default:
            break;
      }
   }
};

Commands["buy"] = {
   Desc: 'Kupovina',
   Params: ['akcija'],
   Call: (Player: PlayerMp, Args: string[]) => {
      if (!Args[0]) return;
      switch (Args[0].toUpperCase()) {
         case 'HOUSE':
            // ToDo
            break;
         case 'BUSINESS':
            break;
         case 'FOOD':
            break;
         default:
            break;
      }
   }
};