import Accounts from "../src/Models/Account";
import Characters from "../src/Models/Character";



declare global { 


   interface Mp {
      Player: any
   }


   interface ColshapeMp { 
      OnPlayerEnter (Player: PlayerMp): void;    
      OnPlayerLeave (Player: PlayerMp): void; 
   }

   interface VehicleMp { 
      Job: number;
      Faction: number;
      DATABASE: number;
   }

   interface PlayerMp { 
      CHARACTER_ID: number;
      ACCOUNT_ID: number;
      RespawnTimer: any;
      
      Character (): Promise<Characters>;
      Account (): Promise<Accounts>;
      SendMessage (Message: string, Color: string): void;
      Notification (Message: string, Type: number, Time: number): void;
      Properties (): any;
   }

   interface PlayerMpPool { 
      find (Target: any): PlayerMp;
   }

}

export {};