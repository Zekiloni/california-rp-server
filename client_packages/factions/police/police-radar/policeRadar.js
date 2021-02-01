const player = mp.players.local;
var playerAimingAt;

mp.events.add('render', (nametags) => {

    if(player.isAiming)
    {
        playerAimingAt = mp.game.player.getEntityIsFreeAimingAt();
        if(playerAimingAt != undefined && playerAimingAt == 'vehicle' && playerAimingAt.handle)
        {
            if(player.aimTarget)
                mp.gui.chat.push(`Ciljate u ${player.aimTarget}`);
        }
    }
    
});