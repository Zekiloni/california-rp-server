import { markerColors, Messages } from '../globals/constants';
import { Controls, GlobalDimension, Locations, NotifyType } from '../globals/enums';
import Bank from '../models/bank.model';


class banking {
 
   static positions: Vector3Mp[] = [
     new mp.Vector3(247.139022, 222.13290, 106.28690),
     new mp.Vector3(150.226699, -1039.814, 29.374057),
     new mp.Vector3(-113.58491, 6469.8193, 31.626707)
   ];

   constructor () {

      for (const position of banking.positions) {
         mp.blips.new(Locations.Sprites.BANK, position, { dimension: GlobalDimension, name: Messages.BANK, color: 52, shortRange: true, scale: 0.85, drawDistance: 150 });

         const colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, GlobalDimension);

         colshape.onPlayerEnter = (player: PlayerMp) => {
            if (player.vehicle) {
               return;
            }

            if (player.Character.wounded) {
               return;
            }

            player.call('CLIENT::BANK:MENU', [true]);
            player.sendHint(Controls.KEY_E, Messages.TO_OPEN_BANK_MENU, 6);
         }

         colshape.onPlayerLeave = (player) => {
            player.call('CLIENT::BANK:MENU', [false]);
         }

         mp.markers.new(
            Locations.Markers.BANK, 
            new mp.Vector3(position.x, position.y, position.z - 0.25), 
            1.05, 
            {
               color: markerColors.BANKS, 
               rotation: new mp.Vector3(0, 0, 0),
               visible: true,
               dimension: GlobalDimension
            }
         );

      }
   }

   static async createAccount (player: PlayerMp) {

      console.log(player.Character.bank);

      if (player.Character.bank) {
         player.sendNotification('', NotifyType.ERROR, 7);
         return false;
      }

      const bankAccount = await Bank.create({ character_id: player.Character.id, character: player.Character });
      player.Character.bank = bankAccount;
      return bankAccount;
   }

   static showATM (player: PlayerMp) {
      
   }

   static withdrawMoney (player: PlayerMp, creditCard: number) {

   }

   static depositMoney (player: PlayerMp, creditCard: number) {

   }
}

new banking();

mp.events.add(
   {
      'SERVER::BANKING:ATM': banking.showATM,
      'SERVER::BANKING:WITHDRAW': banking.withdrawMoney,
      'SERVER::BANKING:DEPOSIT': banking.depositMoney,
   }
);


mp.events.addProc(
   {
      'SERVER::BANKING:CREATE': banking.createAccount
   }
)


