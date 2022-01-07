
import Accounts from '../src/models/account.model';
import Characters from '../src/models/character.model';


declare global { 


   interface Mp {
      Player: any
   }

   interface PedMp {
      playScenario (Name: string): void;
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
      RespawnTimer: any;
      Character: Characters;
      Account: Accounts;

      SendMessage (Message: string, Color: string): void;
      sendProximityMessage (radius: number, message: string, colors: string[]): void;
      Notification (Message: string, Type: number, Time: number): void;
      Properties (): any;
   }

   interface PlayerMpPool { 
      find (Target: any): PlayerMp;
   }

}

export {};