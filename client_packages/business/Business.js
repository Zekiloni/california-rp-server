

const Player = mp.players.local;
let browser = null, opened = false;


mp.events.add({
   'client:business:menu': (type, business) => { 
      opened = !opened;
   }
});
