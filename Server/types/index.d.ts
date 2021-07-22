

declare global { 

   interface ColshapeMp { 
      OnPlayerEnter (Player: PlayerMp): void;    
      OnPlayerLeave (Player: PlayerMp): void; 
   }

   interface PlayerMp { 
      Character (): void;
      Account (): void;
      Notification (Message: text, Type: number, Time: number): void;
   }

   

}

export {};