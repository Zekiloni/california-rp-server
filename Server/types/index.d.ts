

declare global { 
   const Test : number;
   interface ColshapeMp { 
      OnPlayerEnter (Player: PlayerMp): void;    
      OnPlayerLeave (Player: PlayerMp): void; 

   }

}

export {};