
import Accounts from '../src/models/player/account.model';
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
      onPlayerEnter (player: PlayerMp): void;    
      onPlayerLeave (player: PlayerMp): void; 
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
      sendNotification (message: string, Type: number, Time: number): void;
      sendHint (key: string, message: string, time: number): void;
   }

   interface PlayerMpPool { 
      find (searchQuery: any): PlayerMp | null;
   }

}

export {};