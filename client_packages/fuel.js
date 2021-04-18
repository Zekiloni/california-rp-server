
const player = mp.players.local;

mp.keys.bind(0x4F, true, function() {
   let near = nearGasStation(player);
   mp.gui.chat.push('pozvao')
   let pos = player.position;
   if (near) { 
      mp.gui.chat.push('nasao objekat')
      let rope = mp.game.rope.addRope(pos.x, pos.y, pos.z, 0, 0, 90, 3.0, 5, 3.0, 3.0, 0.5, true, true, true, 3.0, true, 0);
      mp.gui.chat.push('kreirao kanap')
      mp.game.rope.attachRopeToEntity(rope.handle, near.handle, 0, 0, 0, 0);
      mp.gui.chat.push('zakacio')
   }
});


nearGasStation = (player) => {
   let gas = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 1933174915, false, true, true);
   if (gas) { return gas; }
   else {  return false; }
}