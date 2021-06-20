


mp.events.add('playerEnterColshape', (player, shape) => { 
   if (player.vehicle) return;
   if (shape.OnPlayerEnter) shape.OnPlayerEnter(player); 
});