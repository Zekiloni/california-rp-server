import { Account } from "../src/Models/Account";
import { Character } from "../src/Models/Character";


declare global { 

   interface ColshapeMp { 
      OnPlayerEnter (Player: PlayerMp): void;    
      OnPlayerLeave (Player: PlayerMp): void; 
   }

   interface PlayerMp { 
      CHARACTER_ID: number;
      ACCOUNT_ID: number;
      
      Character (): Character;
      Account (): Account;
      Notification (Message: text, Type: number, Time: number): void;
   }

   interface PlayerMpPool { 
      find (Target: any): void;
   }
}

export {};