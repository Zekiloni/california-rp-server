const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;
const localPlayer = mp.players.local;

const loadClipSet = (clipSetName) => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) mp.game.wait(0);
};

loadClipSet(movementClipSet);
loadClipSet(strafeClipSet);

mp.events.addDataHandler("crouching", (entity, value) => {
    if (entity.type === "player") {
        if (value) {
            entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
            entity.setStrafeClipset(strafeClipSet);

        } else {
            entity.resetMovementClipset(clipSetSwitchTime);
            entity.resetStrafeClipset();
        }
    }
});

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player" && entity.crouching) {
        entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
        entity.setStrafeClipset(strafeClipSet);
    }
});


mp.keys.bind(0x12, false, () => {
    mp.events.callRemote("server:player.crouch");
});