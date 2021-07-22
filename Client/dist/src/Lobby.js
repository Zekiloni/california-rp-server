"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
const Player = mp.players.local;
mp.events.add({
    'playerReady': async () => {
        const Info = await mp.events.callRemoteProc('SERVER::PLAYER:LOBY');
        Lobby(true, Info.Position, Info.LookAt);
    }
});
let Camera;
function Lobby(Toggle, Position, LookAt) {
    if (Toggle) {
        Player.position = new mp.Vector3(Position.x, Position.y, Position.z + 1);
        Player.freezePosition(true);
        Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
        Camera.setActive(true);
        Camera.setCoord(Position.x, Position.y, Position.z);
        Camera.pointAtCoord(LookAt.x, LookAt.y, LookAt.z);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
    else {
        if (Camera)
            Camera.destroy();
        Player.freezePosition(false);
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
    }
}
exports.Lobby = Lobby;
