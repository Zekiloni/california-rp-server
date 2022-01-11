
import Accounts from '../src/models/account.model';
import Characters from '../src/models/character.model';


declare global { 

   type markerColors = {
      [key: string]: RGBA
   };

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

      sendMessage (message: string, color: string): void;
      sendProximityMessage (radius: number, message: string, colors: string[]): void;
      Notification (message: string, Type: number, Time: number): void;
      Properties (): any;
   }

   interface PlayerMpPool { 
      find (searchQuery: any): PlayerMp | null;
   }

}

export {};