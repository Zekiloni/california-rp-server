const movementClipSet = 'move_ped_crouched';
const strafeClipSet = 'move_ped_crouched_strafing';
const clipSetSwitchTime = 0.25;
const Player = mp.players.local;

function LoadClipSet (SetName: string) {
    mp.game.streaming.requestClipSet(SetName);
    while (!mp.game.streaming.hasClipSetLoaded(SetName)) mp.game.waitAsync(1);
};

LoadClipSet(movementClipSet);
LoadClipSet(strafeClipSet);

mp.events.addDataHandler('crouching', (Entity: PlayerMp, Value: number) => {
    if (Entity.type === 'player') {
        if (Value) {
            Entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
            Entity.setStrafeClipset(strafeClipSet);

        } else {
            Entity.resetMovementClipset(clipSetSwitchTime);
            Entity.resetStrafeClipset();
        }
    }
});

mp.events.add('entityStreamIn', (Entity: EntityMp) => {
    if (Entity.type === 'player' && (<PlayerMp>Entity).Crouching) {
        (<PlayerMp>Entity).setMovementClipset(movementClipSet, clipSetSwitchTime);
        (<PlayerMp>Entity).setStrafeClipset(strafeClipSet);
    }
});


mp.keys.bind(0x12, false, () => {
    if (Player.Logged && Player.Spawned) { 
        mp.events.callRemote('server:player.crouch');
    }
});