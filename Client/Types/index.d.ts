


declare global { 
   type Torsos = {
      [key: string]: number[]
   }

   interface CameraMp {
      setPosition (x: number, y: number, z: number): void;
   }

   type StringIndex = {
      [key: string]: any;
   }


   interface EntityMp {
      hasVariable (Key: string): boolean;  
   }

   interface PlayerMp {
      /* Variables */
      Logged: boolean;
      Spawned: boolean;
      Cuffed: boolean = false;
      Cuffs: ObjectMp;
      Money: number;
      Job: number;
      Wounded: boolean;
      Seatbelt: boolean;
      Bubble: string;
      Attachment: ObjectMp;
      Crouching: boolean = false;
      /* Functions */
      
      /* Finger pointing */
      LastReceivedPointing: any;
      PointingInterval: Timer;
   }

   interface CheckpointMp {
      Station: number = -1;
   }

   interface VehicleMp {
      Fuel: number;
      Mileage: number;
      doNotChangeAlpha: boolean;
   }

   interface EventMpPool {
      addDataHandler (param: any): void;
   }

   interface ObjectMp {
      Hits: number;
   }
}

export {};
