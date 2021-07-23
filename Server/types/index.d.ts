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
      RespawnTimer: any;
      
      Character (): Character;
      Account (): Account;
      SendMessage (Message: string, Color: string): void;
      Notification (Message: string, Type: number, Time: number): void;
      Properties (): any;
   }

   interface PlayerMpPool { 
      find (Target: any): PlayerMp;
   }

}

export {};