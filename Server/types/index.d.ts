import { Account } from "../src/Models/Account";


declare global { 

   interface ColshapeMp { 
      OnPlayerEnter (Player: PlayerMp): void;    
      OnPlayerLeave (Player: PlayerMp): void; 
   }

   interface PlayerMp { 
      character: number;
      account: number;

      Character (): Character;
      Account (): Account;
      Notification (Message: text, Type: number, Time: number): void;
   }

   interface PlayerMpPool {
      find (Target: any): PlayerMp;
   }

}

export {};