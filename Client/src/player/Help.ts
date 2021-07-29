

let Active:boolean = false;

mp.events.add({
   'CLIENT::HELP:SHOW': (Text: string) => { 
      Active = !Active;
      
   }
})