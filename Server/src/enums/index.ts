
export * from './player';
export * from './items';
export * from './property/business.enums';
export * from './property/house.enums';



export namespace notifications {
   export enum type { 
      SUCCESS, ERROR, INFO
   }

   export enum type { 
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