
import { Accounts, Characters, Vehicles } from '@models';

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
      /* Methods */
      onPlayerEnter (player: PlayerMp): void
      onPlayerLeave (player: PlayerMp): void
      
      /* Propertties */
      propertyId?: number
   }

   interface VehicleMp { 
      instance: Vehicles
   }

   interface PlayerMp { 
      character: Characters;
      account: Accounts;

      message (message: string, color: string): void;
      proximityMessage (radius: number, message: string, colors: string[]): void;
      notification (message: string, Type: number, Time: number): void;
      hint (key: string, message: string, time: number): void;
      help (message: string, time: number): void;
   }

   interface PlayerMpPool { 
      find (searchQuery: any): PlayerMp | null;
   }

}

export {};