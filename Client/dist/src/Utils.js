"use strict";
const Player = mp.players.local;
const Server = {
    Color: {
        R: 104, G: 69, B: 234, A: 255
    }
};
function CompareVectors(i, x) {
    return i.x == x.x && i.y == x.y && i.z == x.z;
}
;
function LoadAnimDict(i) {
    if (mp.game.streaming.hasAnimDictLoaded(i))
        return Promise.resolve();
    return new Promise(async (resolve) => {
        mp.game.streaming.requestAnimDict(i);
        while (!mp.game.streaming.hasAnimDictLoaded(i)) {
            await mp.game.waitAsync(0);
            bro;
        }
        resolve();
    });
}
;
function LoadMovementClipset(Clipset) {
    if (mp.game.streaming.hasClipSetLoaded(Clipset))
        return Promise.resolve();
    return new Promise(async (resolve) => {
        mp.game.streaming.requestClipSet(Clipset);
        while (!mp.game.streaming.hasClipSetLoaded(Clipset)) {
            await mp.game.waitAsync(10);
        }
        resolve();
    });
}
function WaitEntity(entity) {
    return new Promise(resolve => {
        let wait = setInterval(() => {
            if (mp.game.entity.isAnEntity(entity.handle)) {
                clearInterval(wait);
                resolve();
            }
        }, 1);
    });
}
function weaponString(weapon) {
    if (typeof weapon !== 'undefined')
        return '0x' + weapon.toString(16).toUpperCase();
    else
        return '0xA2719263';
}
function Distance(first, second) {
    return new mp.Vector3(first.x, first.y, first.z).subtract(new mp.Vector3(second.x, second.y, second.z)).length();
}
function OnlinePlayers() {
    let list = [];
    mp.players.forEach(_Player => {
        list.push({ id: _Player.remoteId, name: _Player.name });
    });
    return list;
}
function GetAdress(position) {
    const path = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0), Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(position.x, position.y, position.z)), Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
    return { zone: Zone, street: Street };
}
function BrowserControls(freezeControls, mouse) {
    mouse ? mp.gui.chat.activate(false) : mp.gui.chat.activate(true);
    setTimeout(() => { mp.gui.cursor.show(freezeControls, mouse); }, 250);
}
Player.BrowserControls = BrowserControls;
let MovableCamera = null;
function PlayerPreviewCamera(toggle) {
    if (toggle) {
        MovableCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
        const CameraPositon = new mp.Vector3(Player.position.x + Player.getForwardX() * 1.5, Player.position.y + Player.getForwardY() * 1.5, Player.position.z);
        MovableCamera.setCoord(CameraPositon.x, CameraPositon.y, CameraPositon.z);
        MovableCamera.pointAtCoord(Player.position.x, Player.position.y, Player.position.z);
        MovableCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        mp.events.add('render', MoveCamera);
        mp.events.add('client:player.camera:zoom', ZoomCamera);
    }
    else {
        mp.events.remove('render', MoveCamera);
        mp.events.remove('client:player.camera:zoom', ZoomCamera);
        if (MovableCamera)
            MovableCamera.destroy();
        MovableCamera = null;
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
    }
}
function ZoomCamera(delta) {
    let { x, y, z } = MovableCamera.getCoord();
    if (delta < 0) {
        x += MovableCamera.getDirection().x * 0.1;
        y += MovableCamera.getDirection().y * 0.1;
    }
    else {
        x -= MovableCamera.getDirection().x * 0.1;
        y -= MovableCamera.getDirection().y * 0.1;
    }
    const dist = mp.game.gameplay.getDistanceBetweenCoords(Player.position.x, Player.position.y, Player.position.z, x, y, z, false);
    if (dist > 3.5 || dist < 0.3)
        return;
    MovableCamera.setPosition(x, y, z);
}
let [PrevX, PrevY] = mp.gui.cursor.position;
function CursorData() {
    const x = PrevX, y = PrevY;
    PrevX = mp.gui.cursor.position[0];
    PrevY = mp.gui.cursor.position[1];
    return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}
function MoveCamera() {
    const Data = CursorData();
    if (!mp.keys.isDown(0x02))
        return;
    const newHeading = Player.getHeading() + Data.DeltaX * 0.15;
    Player.setHeading(newHeading);
    let { x: camPosX, y: camPosY, z: camPosZ } = MovableCamera.getCoord();
    let { pointX: camPointX, pointY: camPointY, pointZ: camPointZ } = MovableCamera.getDirection();
    camPosZ = camPosZ + Data.DeltaY * 0.001;
    const { x: charPosX, y: charPosY, z: charPosZ } = Player.getCoords(true);
    if (camPosZ < charPosZ + 0.7 && camPosZ > charPosZ - 0.8) {
        MovableCamera.setPosition(camPosX, camPosY, camPosZ);
        MovableCamera.pointAtCoord(charPosX, charPosY, camPosZ);
    }
}
function CreateInteractionSpot(name, position) {
    const checkpoint = mp.checkpoints.new(48, position, 2.5, { color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
    const blip = mp.blips.new(1, new mp.Vector3(position.x, position.y, 0), { name: name, color: 1, shortRange: false });
    return { checkpoint: checkpoint, blip: blip };
}
;
Player.CreateInteractionSpot = CreateInteractionSpot;
global.utils = { CompareVectors, LoadAnimDict, weaponString, Distance, OnlinePlayers, GetAdress, PlayerPreviewCamera, WaitEntity, LoadMovementClipset, Server };
