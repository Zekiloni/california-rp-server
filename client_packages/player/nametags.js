const player = mp.players.local;
mp.nametags.enabled = false;
const width = 0.025;
const height = 0.004;
const border = 0.001;
let resolution;
let widthText = 0.0;
let scale = 0.35;
let distance = 10;

mp.events.add('render', (nametags) => {
   nametags.forEach(nametag => {
       let [player, x, y] = nametag;
       if (
           player.id != mp.players.local.id &&
           player.getAlpha() != 0 &&
           mp.players.local.hasClearLosTo(player.handle, 17)
       ) {
           var username = `${player.name} [${player.remoteId}]`;
           drawMpGamerTag(player, username, x, y);
       }
   });
});

drawMpGamerTag = (player, name, x, y) => {

   var localPos = mp.players.local.position,
      playerPos = player.position;
   // var dist = vdist(mp.players.local.position, player.position);
   var dist = mp.game.system.vdist(localPos.x, localPos.y, localPos.z, playerPos.x, playerPos.y, playerPos.z);
   if (dist > distance) return;

//    if (player.vehicle) {
//        y += 0.07;
//    }

   resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
   y -= scale * (0.005 * (resolution.y / 1080));

   gamertag_DrawText(x, y + 0.045, name, 255);
}

isTargetPlayer = (player) => {
   return (
       mp.game.player.isFreeAimingAtEntity(player.handle) ||
       mp.game.player.isTargettingEntity(player.handle)
   );
}


gamertag_DrawText = (x, y, text, alpha, color = [255, 255, 255]) => {
   mp.game.ui.setTextFont(4);
   mp.game.ui.setTextScale(scale, scale);
   mp.game.ui.setTextColour(color[0], color[1], color[2], alpha);
   mp.game.ui.setTextJustification(0);
   mp.game.invoke("0x2513DFB0FB8400FE");
   mp.game.ui.setTextEntry("STRING");
   mp.game.ui.addTextComponentSubstringPlayerName(text);
   mp.game.ui.drawText(x, y);
}




