
export * from './player';
export * from './items';


export enum distances { 
   OOC = 6.5,
   IC = 7.0,
   LOW = 4.5,
   WHISPER = 2,
   SHOUT = 15.5,
   ROLEPLAY = 8.5,
   VEHICLE = 5.5
};

export namespace notifications {
   export enum type { 
      SUCCESS, ERROR, INFO
   }

   export enum time { 
      SHORT = 4,
      MED = 6,
      LONG = 10
   }
};


export namespace logging { 
   
   export enum type { 
      SUCCESS = 0,
      ERROR = 1,
      INFO = 2
   }
}