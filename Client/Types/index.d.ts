

declare global { 
  interface CameraMp {
    setPosition(x: number, y: number, z: number): void;
  }

  interface EntityMp {
    hasVariable(Key: string): boolean;  
  }

  interface PlayerMp {
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
