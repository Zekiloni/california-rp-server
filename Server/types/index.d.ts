
import { accounts, characters } from '@models';


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
      DATABASE: number;
   }

   interface PlayerMp { 
      character: characters;
      account: accounts;

      sendMessage (message: string, color: string): void;
      sendProximityMessage (radius: number, message: string, colors: string[]): void;
      notification (message: string, Type: number, Time: number): void;
      hint (key: string, message: string, time: number): void;
      help (message: string, time: number): void;
   }

   interface PlayerMpPool { 
      find (searchQuery: any): PlayerMp | null;
   }

}

export {};