const player = mp.players.local;
var aimingAt = mp.game.player.getEntityIsFreeAimingAt();

if(aimingAt.type == 'vehicle') {
    mp.gui.chat.push('Ciljate u vozilo')
}