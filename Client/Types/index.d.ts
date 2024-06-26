


declare global { 
   type Torsos = {
      [key: string]: number[]
   }

   interface CameraMp {
      setPosition (x: number, y: number, z: number): void;
   }

   interface EntityMp {
      hasVariable (Key: string): boolean;  
   }

   interface PlayerMp {
      /* Variables */
      /* Functions */
   }

   interface VehicleMp {
      doNotChangeAlpha: boolean;
   }

   interface EventMpPool {
      addDataHandler (param: any): void;
   }
}

export {};
