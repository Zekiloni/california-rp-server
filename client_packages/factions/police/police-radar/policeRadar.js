const player = mp.players.local;
var playerAimingAt;

mp.events.add('render', () => {
    playerAimingAt = mp.game.player.getEntityIsFreeAimingAt();
    if(playerAimingAt != undefined && playerAimingAt.handle)
    {
        if(player.aimTarget)
            mp.gui.chat.push(`Ciljate u ${player.aimTarget}`);
    }  
});