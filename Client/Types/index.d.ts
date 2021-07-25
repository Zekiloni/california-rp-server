

declare global { 
  interface CameraMp {
    setPosition(x: number, y: number, z: number): void;
  }

  interface EntityMp {
    hasVariable(Key: string): boolean;  
  }

  interface PlayerMp {
    Logged: boolean;
    Cuffed: boolean = false;
    Cuffs: ObjectMp;
  }

  interface VehicleMp {
    Fuel: number;
    Mileage: number;
  }

  interface EventMpPool {
    addDataHandler(param: any): void;
  }
}

export {};
