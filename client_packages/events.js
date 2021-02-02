const player = mp.players.local;

mp.events.add('client:freezePlayer', (toggle) => {
   player.freezePosition(toggle);
   let toggleString;
   if(toggle)
      toggleString = "Zaledjen si."
   else
      toggleString = "Odledjen si."
   player.call("client:showNotification", toggleString);
});