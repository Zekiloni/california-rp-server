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

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player" && entity.getVariable("crouching")) {
        entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
        entity.setStrafeClipset(strafeClipSet);
    }
});

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

mp.keys.bind(0x12, false, () => { // testirati
    if(localPlayer.getVariable("cuffed") || localPlayer.getVariable("frozen")) return;
    let lastCheck = new Date().getTime();
    if (new Date().getTime() - lastCheck < 1000 || localplayer.vehicle) return;
    mp.events.callRemote("server:toggleCrouch");
});