"use strict";
const Player = mp.players.local;
let camdir = false, noclip = false, charpos = false, Spectating = false, SpecTarget = null, Waypoint = null;
mp.events.add({
    'client:player.administrator:fly': () => {
        noclip = !noclip;
        Player.setInvincible(noclip);
        Player.freezePosition(false);
        Player.setVisible(!noclip, !noclip);
        Player.setCollision(!noclip, !noclip);
        Player.setHasGravity(!noclip);
        noclip ? Player.setMaxSpeed(0.0001) : Player.setMaxSpeed(10);
    },
    'playerCreateWaypoint': (position) => {
        Waypoint = { x: position.x, y: position.y, z: position.z };
    },
    'playerRemoveWaypoint': () => {
        Waypoint = null;
    },
    'client:spectate': (target, toggle) => {
        localplayer.freezePosition(toggle);
        if (toggle) {
            if (target && mp.players.exists(target)) {
                SpecTarget = target;
                Spectating = true;
                Player.attachTo(target.handle, -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
            }
            else {
                mp.events.call("client:spectate", -1, false);
            }
        }
        else {
            SpecTarget = null;
            Player.detach(true, true);
            Spectating = false;
        }
    },
    'render': () => {
        if (noclip) {
            if (mp.keys.isDown(87) === true) {
                const pos = Player.position;
                const dir = getCameraDirection();
                Player.setCoordsNoOffset(pos.x + dir.x, pos.y + dir.y, pos.z + dir.z, false, false, false);
            }
            if (mp.keys.isDown(83) === true) {
                const pos = Player.position;
                const dir = getCameraDirection();
                Player.setCoordsNoOffset(pos.x - dir.x, pos.y - dir.y, pos.z - dir.z, false, false, false);
            }
        }
        if (charpos) {
            const pos = Player.position;
            mp.game.graphics.drawText(`X:${pos.x}    Y:${pos.y}    Z:${pos.z}`, [0.5, 0.005], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [1.0, 1.0],
                outline: true,
            });
        }
        if (camdir) {
            const dir = getCameraDirection();
            mp.game.graphics.drawText(`X:${dir.x}    Y:${dir.y}    Z:${dir.z}`, [0.5, 0.05], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [1.0, 1.0],
                outline: true,
            });
        }
    }
});
mp.events.addProc('client:player.administrator:marker', () => {
    if (Waypoint)
        return Waypoint;
    else
        return false;
});
function getCameraDirection() {
    const heading = mp.game.cam.getGameplayCamRelativeHeading() + Player.getHeading();
    const pitch = mp.game.cam.getGameplayCamRot(0).x;
    let x = -Math.sin(heading * Math.PI / 180.0);
    let y = Math.cos(heading * Math.PI / 180.0);
    let z = Math.sin(pitch * Math.PI / 180.0);
    let len = Math.sqrt(x * x + y * y + z * z);
    if (len != 0) {
        x = x / len;
        y = y / len;
        z = z / len;
    }
    return new mp.Vector3(x, y, z);
}
;
