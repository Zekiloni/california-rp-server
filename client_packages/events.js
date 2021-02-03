const player = mp.players.local;

mp.events.add('client:freezePlayer', (toggle) => {
   player.freezePosition(toggle);
   let toggleString;
   if(toggle)
      toggleString = "Zaledjen si."
   else
      toggleString = "Odledjen si."
   player.call("client:showNotification", toggleString);
},
'client:createCheckpoint', (posX, posY, posZ) => {
   mp.checkpoints.new(1, new mp.Vector3(posX, posY, posZ), 10,
   {
    direction: new mp.Vector3(posX, posY, posZ),
    color: [ 255, 255, 255, 255 ],
    visible: true,
    dimension: player.dimension
   });
});