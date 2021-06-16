


const FlaggedWords = ['Cit', 'Čit', 'Admin'],
      Player = mp.players.local;

mp.events.add("playerChat", (text) => {
   for (const i of FlaggedWords) {
      if (text.toLowerCase().includes(i.toLowerCase())) {
         mp.events.callRemote('server:anticheat.chat', i);
      }
   }
});