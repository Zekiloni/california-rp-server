export {};

const Player = mp.players.local;

let Active = false;

mp.events.add({
   'CLIENT::HELP:SHOW': (Text: string) => { 
      Active = !Active;
      
   }
})