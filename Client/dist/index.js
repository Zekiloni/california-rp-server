/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2910:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Browser = void 0;
mp.gui.chat.show(false);
exports.Browser = mp.browsers.new('localhost:8080');
exports.Browser.markAsChat();


/***/ }),

/***/ 9633:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
let Active = false;
mp.events.add({
    'CLIENT::BUSINESS:MENU': (MenuName, BusinessId) => {
        Active = !Active;
        Browser_1.Browser.call(Active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', MenuName);
    }
});


/***/ }),

/***/ 1252:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
let Active = false;
mp.events.add({
    'CLIENT::BUSINESS:CLOTHING:MENU': () => {
        Active = !Active;
        if (Active) {
            Browser_1.Browser.call('BROWSER::SHOW', 'ClothingMenu');
        }
        else {
            Browser_1.Browser.call('BROWSER::HIDE', 'ClothingMenu');
            mp.events.callRemote('server:character.clothing:restart');
        }
    },
    'CLIENT::BUSINESS:CLOTHING:MODEL:PREVIEW': (x, Component, Variation) => {
        Player.setComponentVariation(Component, Variation, 0, 2);
    },
    'CLIENT::BUSINESS:CLOTHING:PREVIEW': (x, Component, Texture) => {
        const Variation = Player.getDrawableVariation(Component);
        Player.setComponentVariation(Component, Variation, Texture, 2);
    },
    'CLIENT::BUSINESS:CLOTHING:BUY': (Total, Items, Biz) => {
        mp.events.call('client:business.clothing:menu');
        mp.events.callRemote('server:business.clothing:buy', Total, Items, Biz);
    }
});


/***/ }),

/***/ 7588:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Player = mp.players.local;
let Active = false;
let Vehicle = null;
let Camera = null;
let Point = null;
mp.events.add({
    'client:business.dealership:menu': (Info) => {
        Active = !Active;
        if (Active) {
            Point = new mp.Vector3(Info.Point.x, Info.Point.y, Info.Point.z);
            camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
            camera.setActive(true);
            camera.setCoord(Point.x + 6, Point.y, Point.z);
            camera.pointAtCoord(Point.x, Point.y, Point.z);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            mp.events.add('render', MoveCamera);
            Preview(Info.Products[0].Model);
        }
        else {
            if (Camera)
                Camera.destroy();
            Camera = null;
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
            if (Vehicle)
                Vehicle.destroy();
            mp.events.remove('render', MoveCamera);
        }
    },
    'client:vehicle.dealership:zoom': (delta) => {
        if (!Camera || !Vehicle)
            return;
        let { x, y, z } = Camera.getCoord();
        if (delta < 0) {
            x += Camera.getDirection().x * 0.2;
            y += Camera.getDirection().y * 0.2;
        }
        else {
            x -= Camera.getDirection().x * 0.2;
            y -= Camera.getDirection().y * 0.2;
        }
        const dist = mp.game.gameplay.getDistanceBetweenCoords(Vehicle.position.x, Vehicle.position.y, Vehicle.position.z, x, y, z, false);
        if (dist > 12.5 || dist < 0.8)
            return;
        Camera.setPosition(x, y, z);
    },
    'client:business.dealership:preview': Preview,
    'client:business.dealership:customization': (primary, secondary) => {
        if (!Vehicle)
            return;
        Vehicle.setColours(parseInt(primary), parseInt(secondary));
    },
    'client:business.dealership.vehicle:buy': (total, model, color, biz) => {
        mp.events.callRemote('server:business.dealership.vehicle:buy', total, model, color, biz);
    }
});
async function Preview(Model) {
    if (!Vehicle || !Point)
        return;
    if (mp.vehicles.exists(Vehicle)) {
        if (Vehicle.handle === 0)
            await mp.game.waitAsync(0);
        Vehicle.model = mp.game.joaat(Model);
    }
    else {
        Vehicle = mp.vehicles.new(mp.game.joaat(Model), Point, { numberPlate: 'Dealership', alpha: 255, engine: false, heading: 90, dimension: Player.dimension });
    }
}
;
let [PrevX, PrevY] = mp.gui.cursor.position;
function CursorData() {
    const x = PrevX, y = PrevY;
    PrevX = mp.gui.cursor.position[0];
    PrevY = mp.gui.cursor.position[1];
    return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}
function MoveCamera() {
    if (!Vehicle || !Camera)
        return;
    const Data = CursorData();
    if (!mp.keys.isDown(0x02))
        return;
    const newHeading = Vehicle.getHeading() + Data.DeltaX * 0.15;
    Vehicle.setHeading(newHeading);
    let { x: camPosX, y: camPosY, z: camPosZ } = Camera.getCoord();
    //let { pointX: camPointX, pointY: camPointY, pointZ: camPointZ } = Camera.getDirection();
    camPosZ = camPosZ + Data.DeltaY * 0.001;
    const { x: vehPosX, y: vehPosY, z: vehPosZ } = Vehicle.getCoords(true);
    if (camPosZ < vehPosZ + 1.0 && camPosZ > vehPosZ - 0.3) {
        Camera.setPosition(camPosX, camPosY, camPosZ);
        Camera.pointAtCoord(vehPosX, vehPosY, camPosZ);
    }
}


/***/ }),

/***/ 8621:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
let BusinessDrinkMenu = false;
mp.events.add({
    'CLIENT::BUSINESS:DRINK:MENU': (Info) => {
        BusinessDrinkMenu = !BusinessDrinkMenu;
        Browser_1.Browser.call(BusinessDrinkMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'BusinessDrinkMenu');
    },
    'CLIENT::BUSINESS:DRINK:BUY': (Price, Item, Business) => {
        mp.events.callRemote('SERVER::BUSINESS:DRINK:BUY', Price, Item, Business);
    }
});


/***/ }),

/***/ 7313:
/***/ (() => {

"use strict";



/***/ }),

/***/ 3568:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
let BusinessGasMenu = false;
const Pumps = [1339433404, 1694452750, 1933174915, 2287735495];
const Player = mp.players.local;
mp.events.add({
    'client:business.gas:menu': (Info) => {
        BusinessGasMenu = !BusinessGasMenu;
    }
});
mp.events.addProc({
    'client:business.gas:nearpump': () => {
        const Position = Player.position;
        return new Promise((resolve) => {
            for (const Pump of Pumps) {
                let object = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 3.0, Pump, false, true, true);
                if (object) {
                    resolve(true);
                    break;
                }
            }
        });
    }
});


/***/ }),

/***/ 8574:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
let Active = false;
mp.events.add({
    'client:business.market:menu': (business) => {
        Active = !Active;
        if (Active) {
            Browser_1.Browser.call('BROWSER::SHOW', 'Market');
        }
        else {
            Browser_1.Browser.call('BROWSER::HIDE', 'Market');
        }
    },
    'client:business.market:buy': (bill, items, business) => {
        mp.events.call('client:business.market:menu');
        mp.events.callRemote('server:bussines.market:buy', bill, items, business);
    }
});


/***/ }),

/***/ 1235:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
let BusinessRentMenu = false;
mp.events.add({
    'CLIENT::BUSINESS:RENT:MENU': (Business) => {
        BusinessRentMenu = !BusinessRentMenu;
        Browser_1.Browser.call(BusinessRentMenu ? 'BROWSER::SHOW' : `BROWSER::HIDE`, 'HouseManagement');
    }
});


/***/ }),

/***/ 7724:
/***/ (() => {

"use strict";

/* Big thanks to MrPancakers2 for his resources and research! */
mp.events.add("CLIENT::CASINO:ENTER", () => {
    mp.events.call('CLIENT::CASINO:WALLS:LOAD'); // Animated casino walls
    mp.events.call('CLIENT::CASINO:WHEEL:LOAD'); // Lucky wheel
});
mp.events.call('CLIENT::CASINO:ENTER');


/***/ }),

/***/ 9232:
/***/ (() => {

"use strict";

/**
 * Notes:
 *  - Pressing F3/loading libs first go won't do the animation, pressing it again will. Only occurs
 *      on first loading into the game
 *  - Need to unload the lucky wheel
 *  - Need to limit when the player can do the lucky wheel animation/Distance check when pressed
 */
/**
 * Animations
 * - Enter_to_ArmRaisedIDLE
 * - ArmRaisedIDLE
 * - ArmRaisedIDLE_to_SpinReadyIDLE
 * - SpinReadyIDLE
 * - SpinStart_ArmRaisedIDLE_to_BaseIDLE
 * - spinreadyidle_to_spinningidle_low
 * - spinreadyidle_to_spinningidle_med
 * - spinreadyidle_to_spinningidle_high
 * - SpinningIDLE_Low
 * - SpinningIDLE_Med
 * - SpinningIDLE_High
 * - Win
 * - Win_Big
 * - Win_Huge
 * - Exit_to_Standing
 * - SpinReadyIDLE_to_ArmRaisedIDLE
 *
 * Lucky Wheel anims
 * - spinningwheel_low_effort_01 [Up to 20]
 * - spinningwheel_med_effort_01 [Up to 20]
 * - spinningwheel_high_effort_01 [Up to 20]
 */
let animationLib;
const luckyWheelHash = mp.game.joaat("vw_prop_vw_luckywheel_02a");
let luckyWheelObject;
async function spinLuckyWheel() {
    mp.gui.chat.push("Start lucky wheel");
    //  Load the animation lib
    await loadLuckyWheelAnimLib();
    if (mp.game.streaming.hasAnimDictLoaded(animationLib)) {
        let playerWheelPosition = new mp.Vector3(1109.55, 228.88, -49.64);
        // mp.gui.chat.push("Moving to position");
        mp.players.local.taskGoStraightToCoord(playerWheelPosition.x, playerWheelPosition.y, playerWheelPosition.z, 1.0, -1, 312.2, 0.0);
        //  Wait until they're in position to play animation
        let inPosition = false;
        while (!inPosition) {
            await mp.game.waitAsync(500);
            let coords = mp.players.local.position;
            let wheelDistance = mp.game.system.vdist(coords.x, coords.y, coords.z, playerWheelPosition.x, playerWheelPosition.y, playerWheelPosition.z);
            // mp.gui.chat.push(`Dist: ${wheelDistance}`)
            if (wheelDistance <= 0.015) {
                inPosition = true;
                // mp.gui.chat.push("Player in position");
            }
        }
        mp.players.local.taskPlayAnim(animationLib, "enter_right_to_baseidle", 8.0, -8.0, -1, 0, 0, false, false, false);
        while (!mp.players.local.isPlayingAnim(animationLib, "enter_right_to_baseidle", 3)) {
            mp.gui.chat.push("playing 1");
            await mp.game.waitAsync(100);
        }
        mp.players.local.taskPlayAnim(animationLib, "enter_to_armraisedidle", 8.0, -8.0, -1, 0, 0, false, false, false);
        while (!mp.players.local.isPlayingAnim(animationLib, "enter_to_armraisedidle", 3)) {
            mp.gui.chat.push("playing 2");
            await mp.game.waitAsync(100);
        }
        mp.players.local.taskPlayAnim(animationLib, 'ArmRaisedIDLE_to_SpinReadyIDLE', 8.0, -8.0, -1, 0, 0, false, false, false);
        // await mp.game.waitAsync(1000);
        mp.players.local.taskPlayAnim(animationLib, 'armraisedidle_to_spinningidle_high', 8.0, -8.0, -1, 0, 0, false, false, false);
        mp.game.audio.playSoundFromCoord(-1, "Spin_Start", 1109.55, 228.88, -49.64, "dlc_vw_casino_lucky_wheel_sounds", true, 0, false);
        while (!mp.players.local.isPlayingAnim(animationLib, "armraisedidle_to_spinningidle_high", 3)) {
            mp.gui.chat.push("playing 3");
            await mp.game.waitAsync(100);
        }
        //  This below destroys the entire animation sequence
        // await mp.game.waitAsync(1000);
        // mp.players.local.taskPlayAnim(animationLib, 'SpinningIDLE_High', 8.0, -8.0, -1, 0, 0, false, false, false);
        // while(!mp.players.local.isPlayingAnim(animationLib, 'SpinningIDLE_High', 3)){
        //     mp.gui.chat.push("playing 4")
        //     await mp.game.waitAsync(100);
        // }
        //  This needs to come after
        //mp.players.local.taskPlayAnim(animationLib, 'SpinningIDLE_High', 8.0, -8.0, -1, 0, 0, false, false, false);
        // mp.players.local.taskPlayAnim(animationLib, 'Win_Big', 8.0, -8.0, -1, 0, 0, false, false, false);
        //  Testing
        luckyWheelObject.setRotation(0.0, 0.0, 0.0, 2, true);
        //  This is the animation for the ending of the wheel maybe
        luckyWheelObject.playAnim("spinningwheel_high_effort_20", animationLib, 1000.0, false, true, false, 0.0, 2);
        luckyWheelObject.forceAiAndAnimationUpdate();
        //  This isn't working, breaking the while loop manually
        while (mp.game.audio.hasSoundFinished(-1)) {
            await mp.game.waitAsync(10000);
            break;
            mp.gui.chat.push("Waiting on Sound" + mp.game.audio.hasSoundFinished(-1) + " " + -1);
        }
        // mp.gui.chat.push("Sound Done")
        mp.game.audio.playSoundFromCoord(-1, "Win", 1109.55, 228.88, -49.64, "dlc_vw_casino_lucky_wheel_sounds", true, 0, false);
        mp.game.entity.createModelHide(1111.052, 229.849, -50.641, 5, mp.game.joaat("vw_prop_vw_jackpot_on"), false);
        mp.game.entity.createModelHide(1111.052, 229.849, -50.641, 2, mp.game.joaat("vw_prop_vw_luckylight_on"), false);
        mp.gui.chat.push("Done");
    }
}
//  Functions
async function loadLuckyWheelAnimLib() {
    if (mp.players.local.model === mp.game.joaat("mp_m_freemode_01")) {
        animationLib = "anim_casino_a@amb@casino@games@lucky7wheel@male";
    }
    else if (mp.players.local.model === mp.game.joaat("mp_f_freemode_01")) {
        animationLib = "anim_casino_a@amb@casino@games@lucky7wheel@female";
    }
    else {
        return mp.gui.chat.push("You must be using a freemode character model");
    }
    mp.game.streaming.requestAnimDict(animationLib);
    for (let i = 0; !mp.game.streaming.hasAnimDictLoaded(animationLib) && i < 15; i++) {
        if (i === 14)
            return mp.game.graphics.notify('~r~Error loading Lucky Wheel spin animation.');
        mp.gui.chat.push("loading wheel spin");
        await mp.game.waitAsync(100);
    }
    mp.gui.chat.push("Anim loaded.");
}
async function loadLuckyWheel() {
    //  Load Wheel
    mp.game.streaming.requestModel(luckyWheelHash);
    while (!mp.game.streaming.hasModelLoaded(luckyWheelHash)) {
        await mp.game.waitAsync(100);
    }
    luckyWheelObject = mp.objects.new(luckyWheelHash, new mp.Vector3(1111.052, 229.8579, -49.133));
    //  Unload model from memory
    mp.game.streaming.setModelAsNoLongerNeeded(luckyWheelHash);
}
mp.events.add("CLIENT::CASINO:WHEEL:LOAD", () => {
    loadLuckyWheel();
    //  F3
    mp.keys.bind(0x72, true, luckyWheelBind);
});
mp.events.add("CLIENT::CASINO:WHEEL:UNLOAD", () => {
    //  Unload lucky wheel
    if (mp.objects.exists(luckyWheelObject.handle))
        luckyWheelObject.destroy();
    //  Unload anim dict
    mp.game.streaming.removeAnimDict(animationLib);
    //  Unbind key
    mp.keys.unbind(0x72, true, luckyWheelBind);
});
function luckyWheelBind() {
    spinLuckyWheel();
}


/***/ }),

/***/ 6142:
/***/ (() => {

"use strict";

let rot = 0;
mp.game.entity.createModelHideExcludingScriptObjects(1100.0177001953125, 220.02122497558594, -49.989967346191406, 10.0, 2733879850, true);
let podium = mp.objects.new(2733879850, new mp.Vector3(1100.0177001953125, 220.02122497558594, -49.989967346191406));
let veh = mp.vehicles.new(mp.game.joaat("neon"), new mp.Vector3(1100.0177001953125, 220.02122497558594, -49.789967346191406), {
    color: [[255, 0, 0], [255, 0, 0]],
    locked: true
});
veh.doNotChangeAlpha = true;
veh.freezePosition(true);
let rotatePodiumColshape = mp.colshapes.newSphere(1100.0177001953125, 220.02122497558594, -49.989967346191406, 50.0);
mp.events.add("playerEnterColshape", (shape) => {
    if (shape == rotatePodiumColshape) {
        mp.events.add("render", Rotate);
    }
});
mp.events.add("playerExitColshape", (shape) => {
    if (shape == rotatePodiumColshape) {
        mp.events.remove("render", Rotate);
    }
});
function Rotate() {
    rot += 0.05;
    if (rot >= 360)
        rot = 0;
    podium.rotation = new mp.Vector3(0, 0, rot);
    veh.setHeading(rot);
}


/***/ }),

/***/ 9745:
/***/ (() => {

"use strict";

// let lpSlotMachine: number | null = null;
// let slotMachineToJoin: number | null = null;
// let interactingWithSlotMachine: number | null = null;
// let canSpin: boolean = false;
// let interactingWithSlotMachineTimeout: any | null = null;
// let slotMachineData: object[] = [];
// let SPINNING_TIME: number[] = []; 
// type SPINNING_TIME = {
// 	[key: number]: number
//  }
// SPINNING_TIME[1] = [2000,2500,3000];
// SPINNING_TIME[2] = [2000,4000,6000];
// let reelsOffsets = 
// [
// 	[-0.115, 0.047, 1.106],
// 	[0.005, 0.047, 1.106],
// 	[0.125, 0.047, 1.106]
// ]
// let slotMachineBets = [];
// slotMachineBets[1] = 100;
// slotMachineBets[2] = 25;
// slotMachineBets[3] = 25;
// slotMachineBets[4] = 5;
// slotMachineBets[5] = 500;
// slotMachineBets[6] = 100;
// slotMachineBets[7] = 500;
// slotMachineBets[8] = 5;
// let slotMachineNames = [];
// slotMachineNames[1] = "Angel and the Knight";
// slotMachineNames[2] = "Impotent RAGE";
// slotMachineNames[3] = "Republican Space Rangers";
// slotMachineNames[4] = "Fame or Shame";
// slotMachineNames[5] = "Deity of the Sun";
// slotMachineNames[6] = "Twilight Knife";
// slotMachineNames[7] = "Diamond Miner";
// slotMachineNames[8] = "Evacuator";
// let slotMachinePos =
// [
// 	{ "type": 1, "x": 1135.1024169921875, "y": 256.709716796875, "z": -52.03075408935547, "rz": 101.998046875 },
// 	{ "type": 1, "x": 1120.8575439453125, "y": 233.18858337402344, "z": -50.84077453613281, "rz": -104.99775695800781 },
// 	{ "type": 1, "x": 1108.9188232421875, "y": 239.50234985351562, "z": -50.84078598022461, "rz": -44.99958038330078 },
// 	{ "type": 1, "x": 1105.031982421875, "y": 230.81637573242188, "z": -50.84077072143555, "rz": -177.001220703125 },
// 	{ "type": 1, "x": 1114.0848388671875, "y": 235.03343200683594, "z": -50.84077453613281, "rz": -179.00137329101562 },
// 	{ "type": 2, "x": 1134.7552490234375, "y": 255.9905242919922, "z": -52.03075408935547, "rz": 30.999441146850586 },
// 	{ "type": 2, "x": 1132.4876708984375, "y": 247.59466552734375, "z": -52.03075408935547, "rz": 88.49937438964844 },
// 	{ "type": 2, "x": 1109.5211181640625, "y": 239.04225158691406, "z": -50.84078598022461, "rz": -29.499794006347656 },
// 	{ "type": 2, "x": 1105.7384033203125, "y": 230.33175659179688, "z": -50.84077072143555, "rz": 107.99896240234375 },
// 	{ "type": 2, "x": 1120.756103515625, "y": 232.42312622070312, "z": -50.84077453613281, "rz": -90.49939727783203 },
// 	{ "type": 2, "x": 1114.8876953125, "y": 234.52394104003906, "z": -50.84077453613281, "rz": 108.99903869628906 },
// 	{ "type": 3, "x": 1133.948974609375, "y": 256.10711669921875, "z": -52.0307502746582, "rz": -46.99979782104492 },
// 	{ "type": 3, "x": 1132.41357421875, "y": 248.33412170410156, "z": -52.03075408935547, "rz": 105.99855041503906 },
// 	{ "type": 3, "x": 1105.5439453125, "y": 229.40882873535156, "z": -50.84077072143555, "rz": 38.49977111816406 },
// 	{ "type": 3, "x": 1110.232666015625, "y": 238.7513427734375, "z": -50.84078598022461, "rz": -12.999954223632812 },
// 	{ "type": 3, "x": 1114.5487060546875, "y": 233.68020629882812, "z": -50.84077453613281, "rz": 33.99979019165039 },
// 	{ "type": 3, "x": 1120.85302734375, "y": 231.6873779296875, "z": -50.84077072143555, "rz": -73.99937438964844 },
// 	{ "type": 4, "x": 1139.37109375, "y": 252.4561767578125, "z": -52.03075408935547, "rz": 97.49907684326172 },
// 	{ "type": 4, "x": 1132.109130859375, "y": 249.05078125, "z": -52.03075408935547, "rz": 118.9986801147461 },
// 	{ "type": 4, "x": 1133.8514404296875, "y": 256.8948669433594, "z": -52.0307502746582, "rz": -115.99858856201172 },
// 	{ "type": 4, "x": 1110.988037109375, "y": 238.6630401611328, "z": -50.84078598022461, "rz": 0 },
// 	{ "type": 4, "x": 1100.46630859375, "y": 230.39248657226562, "z": -50.84077072143555, "rz": 44.49960708618164 },
// 	{ "type": 4, "x": 1104.66650390625, "y": 229.47808837890625, "z": -50.84077453613281, "rz": -30.99989128112793 },
// 	{ "type": 4, "x": 1108.446533203125, "y": 235.39356994628906, "z": -50.84077453613281, "rz": -179.0015106201172 },
// 	{ "type": 4, "x": 1113.65576171875, "y": 233.69044494628906, "z": -50.84077453613281, "rz": -34.49992752075195 },
// 	{ "type": 4, "x": 1117.1199951171875, "y": 230.25537109375, "z": -50.84077453613281, "rz": -176.5015106201172 },
// 	{ "type": 4, "x": 1121.1380615234375, "y": 230.99908447265625, "z": -50.84077453613281, "rz": -58.999629974365234 },
// 	{ "type": 5, "x": 1134.55615234375, "y": 257.2640075683594, "z": -52.03075408935547, "rz": 170.9969940185547 },
// 	{ "type": 5, "x": 1138.998046875, "y": 251.7522430419922, "z": -52.03075408935547, "rz": 29.49958610534668 },
// 	{ "type": 5, "x": 1131.660400390625, "y": 249.63453674316406, "z": -52.03075408935547, "rz": 135.99819946289062 },
// 	{ "type": 5, "x": 1100.9368896484375, "y": 230.99258422851562, "z": -50.84077453613281, "rz": 59.49959945678711 },
// 	{ "type": 5, "x": 1111.7265625, "y": 238.75173950195312, "z": -50.84078598022461, "rz": 12.99996566772461 },
// 	{ "type": 5, "x": 1104.3472900390625, "y": 230.33616638183594, "z": -50.84077453613281, "rz": -106.99888610839844 },
// 	{ "type": 5, "x": 1109.1422119140625, "y": 234.78053283691406, "z": -50.84077453613281, "rz": 106.9991455078125 },
// 	{ "type": 5, "x": 1113.37841796875, "y": 234.48037719726562, "z": -50.84077072143555, "rz": -104.99906158447266 },
// 	{ "type": 5, "x": 1117.8211669921875, "y": 229.77664184570312, "z": -50.84077072143555, "rz": 111.9986801147461 },
// 	{ "type": 6, "x": 1138.1981201171875, "y": 251.86956787109375, "z": -52.03075408935547, "rz": -45.4997444152832 },
// 	{ "type": 6, "x": 1131.0672607421875, "y": 250.08070373535156, "z": -52.03075408935547, "rz": 149.9978790283203 },
// 	{ "type": 6, "x": 1112.40869140625, "y": 239.02345275878906, "z": -50.84078598022461, "rz": 30.4997615814209 },
// 	{ "type": 6, "x": 1121.614501953125, "y": 230.38429260253906, "z": -50.84077453613281, "rz": -45.499813079833984 },
// 	{ "type": 6, "x": 1117.5740966796875, "y": 228.9528045654297, "z": -50.84077072143555, "rz": 34.49982452392578 },
// 	{ "type": 6, "x": 1108.875244140625, "y": 233.94735717773438, "z": -50.84077453613281, "rz": 33.99979019165039 },
// 	{ "type": 6, "x": 1101.227783203125, "y": 231.69332885742188, "z": -50.84077453613281, "rz": 75.49949645996094 },
// 	{ "type": 7, "x": 1138.080810546875, "y": 252.67027282714844, "z": -52.03075408935547, "rz": -118.99893951416016 },
// 	{ "type": 7, "x": 1130.3834228515625, "y": 250.3516082763672, "z": -52.03075408935547, "rz": 165.49742126464844 },
// 	{ "type": 7, "x": 1101.32080078125, "y": 232.4326629638672, "z": -50.84077453613281, "rz": 90.99922943115234 },
// 	{ "type": 7, "x": 1108.02001953125, "y": 233.9359130859375, "z": -50.84077072143555, "rz": -35.499839782714844 },
// 	{ "type": 7, "x": 1116.7257080078125, "y": 228.941162109375, "z": -50.84077453613281, "rz": -33.499881744384766 },
// 	{ "type": 8, "x": 1138.8004150390625, "y": 253.02676391601562, "z": -52.03075408935547, "rz": 170.9975128173828 },
// 	{ "type": 8, "x": 1129.5975341796875, "y": 250.44863891601562, "z": -52.03075408935547, "rz": 179.49769592285156 },
// 	{ "type": 8, "x": 1113.0006103515625, "y": 239.52088928222656, "z": -50.840789794921875, "rz": 46.499603271484375 },
// 	{ "type": 8, "x": 1107.7371826171875, "y": 234.7730712890625, "z": -50.84077453613281, "rz": -106.99908447265625 },
// 	{ "type": 8, "x": 1116.4288330078125, "y": 229.7194061279297, "z": -50.84077453613281, "rz": -102.49913024902344 },
// 	{ "type": 8, "x": 1101.1824951171875, "y": 233.19720458984375, "z": -50.84077453613281, "rz": -50.84077453613281 }
// ];
// for(var i=1; i <= 8; i++)
// {
// 	mp.game.entity.createModelHideExcludingScriptObjects(1127.1312255859375, 254.82090759277344, -50.4407958984375, 300.0, mp.game.joaat("vw_prop_casino_slot_0"+i+"a"), true);
// }
// for(let i=0; i < slotMachinePos.length; i++)
// {
// 	slotMachineData[i] = { spinning: [] };
// 	slotMachineData[i].machine = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a"), new mp.Vector3(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
// 	slotMachineData[i].reels = [];
// 	var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, 0, -1.5, 1);
// 	var newShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 0.25);
// 	newShape.casinoSlotMachime = i;
// 	for(var c=0; c < 3; c++)
// 	{
// 		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, reelsOffsets[c][0], reelsOffsets[c][1], reelsOffsets[c][2]);
// 		slotMachineData[i].reels[c] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
// 	}
// }
// mp.events.add('playerEnterColshape', (shape) => {
// 	if(shape.casinoSlotMachime !== undefined && lpSlotMachine == null && interactingWithSlotMachine == null)
// 	{
// 		slotMachineToJoin = shape.casinoSlotMachime;
// 		mp.gui.chat.push(`slotMachineToJoin: ${slotMachineToJoin}`);
// 		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
// 		mp.game.graphics.notify(`Pritisnite ~b~E~s~ da zapocnete igru ${slotMachineNames[slotMachinePos[slotMachineToJoin].type]}`);
// 	}
// });
// mp.events.add('playerExitColshape', (shape) => {
// 	if(shape.casinoSlotMachime !== undefined)
// 	{
// 		slotMachineToJoin = null;
// 	}
// });
// mp.keys.bind(0x45, true, () =>  // E
// {
// 	mp.gui.chat.push('1');
// 	if(mp.gui.cursor.visible || interactingWithSlotMachine != null) return false;
// 	mp.gui.chat.push('2');
// 	if(lpSlotMachine != null)
// 	{
// 		mp.gui.chat.push('3');
// 		mp.events.callRemote("leaveSlotMachine");
// 		mp.gui.chat.push('4');
// 		interactingWithSlotMachine = lpSlotMachine;
// 		mp.gui.chat.push('5');
// 		lpSlotMachine = null;
// 		mp.gui.chat.push('6');
// 		BLOCK_CONTROLS_DURING_ANIMATION = false;
// 		if(canSpin) canSpin = false;
// 		mp.gui.chat.push('7');
// 		interactingWithSlotMachineTimeout = setTimeout(
// 			function()
// 			{
// 				slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
// 				interactingWithSlotMachine = null;
// 				interactingWithSlotMachineTimeout = null;
// 				mp.gui.chat.push('8');
// 			},4500
// 		);
// 	}
// 	else
// 	{
// 		mp.gui.chat.push('9');
// 		mp.gui.chat.push(`slotMachineToJoin2: ${slotMachineToJoin}`);
// 		if(slotMachineToJoin == null) return false;
// 		mp.gui.chat.push('10');
// 		interactingWithSlotMachine = slotMachineToJoin;
// 		mp.gui.chat.push('11');
// 		slotMachineData[slotMachineToJoin].machine.setCollision(false, false);
// 		mp.gui.chat.push('12');
// 		var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[slotMachineToJoin].x, slotMachinePos[slotMachineToJoin].y, slotMachinePos[slotMachineToJoin].z, slotMachinePos[slotMachineToJoin].rz, 0, -1.5, 1);
// 		localPlayer.position = new mp.Vector3(pos.x, pos.y, pos.z);
// 		localPlayer.setHeading(slotMachinePos[slotMachineToJoin].rz);
// 		mp.gui.chat.push('13');
// 		mp.events.callRemote("occupySlotMachine", slotMachineToJoin);
// 		mp.gui.chat.push('14');
// 		interactingWithSlotMachineTimeout = setTimeout(
// 			function()
// 			{
// 				interactingWithSlotMachine = null;
// 				interactingWithSlotMachineTimeout = null;
// 				mp.gui.chat.push('15');
// 			},5500
// 		);
// 	}	
// });
// mp.events.add("cancelInteractingWithSlotMachine", () => 
// {
// 	slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
// 	interactingWithSlotMachine = null;
// 	if(interactingWithSlotMachineTimeout != null)
// 	{
// 		clearTimeout(interactingWithSlotMachineTimeout);
// 		interactingWithSlotMachineTimeout = null;
// 	}
// });
// mp.events.add("playerSitAtSlotMachine", (player, machineID) => {
// 	if(player == localPlayer) 
// 	{
// 		lpSlotMachine = slotMachineToJoin;
// 		BLOCK_CONTROLS_DURING_ANIMATION = true;
// 	}
// 	else
// 	{
// 		slotMachineData[machineID].machine.setNoCollision(player.handle, false);
// 	}
// });
// mp.events.add("slotMachineAllowSpin", () => {
// 	canSpin = true;
// });
// mp.events.add('test.slot', (slotId) => {
// 	mp.events.callRemote("occupySlotMachine", slotId);
// 	lpSlotMachine = slotId;
// 	canSpin = true;
// 	mp.events.callRemote("spinSlotMachine", slotId, 0);
// });
// mp.events.add('playerDeath', (player) => 
// {
// 	if(player == localPlayer) 
// 	{
// 		if(lpSlotMachine != null) lpSlotMachine = null;
// 		if(interactingWithSlotMachine != null) interactingWithSlotMachine = null;
// 		if(canSpin) canSpin = false;
// 	}
// });
// mp.events.add('render', (nametags) => {
// 	var rot = null;
// 	for(var machine = 0; machine < slotMachineData.length; machine++)
// 	{
// 		for(var i=0; i < 3; i++)
// 		{
// 			if(slotMachineData[machine]['spinning'][i])
// 			{
// 				rot = slotMachineData[machine].reels[i].rotation;
// 				slotMachineData[machine].reels[i].rotation = new mp.Vector3(rot.x+5.0, 0.0, rot.z);
// 			}
// 		}
// 	}
// 	if(canSpin)
// 	{
// 		if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // LMB
// 		{
// 			mp.events.callRemote("spinSlotMachine");
// 		}
// 	}
// });
// mp.events.add('spinSlotMachine', (id, position) => 
// {
// 	let machine = id;
// 	//slotMachineData[machine].endPos = //JSON.parse(position);
// 	var pos = null;
// 	for(var i=0; i < 3; i++)
// 	{
// 		slotMachineData[machine].reels[i].destroy();
// 		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[i][0], reelsOffsets[i][1], reelsOffsets[i][2]);
// 		slotMachineData[machine].reels[i] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"b_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[machine].rz) });
// 		slotMachineData[machine]['spinning'][i] = true;
// 	}
// 	setTimeout(
// 		function()
// 		{
// 			slotMachineData[machine]['spinning'][0] = null;
// 			slotMachineData[machine].reels[0].destroy();
// 			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[0][0], reelsOffsets[0][1], reelsOffsets[0][2]);
// 			slotMachineData[machine].reels[0] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[0], 0, slotMachinePos[machine].rz) });
// 		}, SPINNING_TIME[0][0]
// 	);
// 	setTimeout(
// 		function()
// 		{
// 			slotMachineData[machine]['spinning'][1] = null;
// 			slotMachineData[machine].reels[1].destroy();
// 			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[1][0], reelsOffsets[1][1], reelsOffsets[1][2]);
// 			slotMachineData[machine].reels[1] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[1], 0, slotMachinePos[machine].rz) });
// 		}, SPINNING_TIME[1][1] // slotMachineData[machine].endPos[3]
// 	);
// 	setTimeout(
// 		function()
// 		{
// 			slotMachineData[machine]['spinning'][2] = null;
// 			slotMachineData[machine].reels[2].destroy();
// 			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[2][0], reelsOffsets[2][1], reelsOffsets[2][2]);
// 			slotMachineData[machine].reels[2] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[2], 0, slotMachinePos[machine].rz) });
// 		}, SPINNING_TIME[2][2] // slotMachineData[machine].endPos[3]
// 	);
// });


/***/ }),

/***/ 2291:
/***/ (() => {

"use strict";

let enabled = false;
let renderTarget;
const SCREEN_DIAMONDS = "CASINO_DIA_PL";
const SCREEN_SKULLS = "CASINO_HLW_PL";
const SCREEN_SNOW = "CASINO_SNWFLK_PL";
const SCREEN_WIN = "CASINO_WIN_PL";
const targetName = "casinoscreen_01";
const targetModel = mp.game.joaat('vw_vwint01_video_overlay');
const textureDict = "Prop_Screen_Vinewood";
const textureName = "BG_Wall_Colour_4x4";
// Na ulazu: CLIENT::CASINO:WALLS:LOAD
// Kad izadje: CLIENT::CASINO:WALLS:UNLOAD
mp.events.add("CLIENT::CASINO:WALLS:LOAD", async () => {
    mp.game.graphics.requestStreamedTextureDict(textureDict, false);
    for (let i = 0; !mp.game.graphics.hasStreamedTextureDictLoaded(textureDict) && i < 15; i++) {
        if (i === 14)
            return mp.game.graphics.notify('~r~Error loading Casino video walls.');
        await mp.game.waitAsync(100);
    }
    mp.game.ui.registerNamedRendertarget(targetName, false);
    mp.game.ui.linkNamedRendertarget(targetModel);
    //  SET_TV_CHANNEL_PLAYLIST
    mp.game.invoke("0xF7B38B8305F1FE8B", 0, SCREEN_DIAMONDS, true);
    mp.game.graphics.setTvAudioFrontend(true);
    mp.game.graphics.setTvVolume(-100);
    mp.game.graphics.setTvChannel(0);
    renderTarget = mp.game.ui.getNamedRendertargetRenderId(targetName);
    enabled = true;
});
mp.events.add("CLIENT::CASINO:WALLS:UNLOAD", () => {
    mp.game.ui.releaseNamedRendertarget(renderTarget);
    mp.game.ui.isNamedRendertargetRegistered(targetName);
    mp.game.graphics.setStreamedTextureDictAsNoLongerNeeded(textureDict);
    mp.game.graphics.setTvChannel(-1);
    enabled = false;
});
mp.events.add('render', function () {
    if (enabled) {
        mp.game.ui.setTextRenderId(renderTarget);
        mp.game.invoke("0x61BB1D9B3A95D802", 4); //  SET_SCRIPT_GFX_DRAW_ORDER
        mp.game.invoke("0xC6372ECD45D73BCD", true); //  SET_SCRIPT_GFX_DRAW_BEHIND_PAUSEMENU
        //  _DRAW_INTERACTIVE_SPRITE
        mp.game.invoke('0x2BC54A8188768488', textureDict, textureName, 0.25, 0.5, 0.5, 1.0, 0.0, 255, 255, 255, 255);
        mp.game.graphics.drawTvChannel(0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255);
        mp.game.ui.setTextRenderId(1);
    }
});


/***/ }),

/***/ 1828:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
mp.nametags.enabled = false;
const ScreenResolution = mp.game.graphics.getScreenActiveResolution(100, 100);
mp.events.add({
    'CLIENT::OFFER': (Title, Message, Event, Time) => {
        Browser_1.Browser.call('BROWSER::OFFER', Title, Message, Event, Time);
    },
    'CLIENT::OFFER:ACCEPT': (Info) => {
        mp.events.callRemote('SERVER::OFFER:ACCEPT', Info);
    },
    'CLIENT::OFFER:DECLINE': (Info) => {
        mp.events.callRemote('SERVER::OFFER:DECLINE', Info);
    }
});


/***/ }),

/***/ 7845:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Browser_1 = __webpack_require__(2910);
const Player_1 = __webpack_require__(8412);
const Lobby_1 = __webpack_require__(551);
const Utils_1 = __webpack_require__(8675);
const FEMALE_TORSOS_json_1 = __importDefault(__webpack_require__(3678));
const MALE_TORSOS_json_1 = __importDefault(__webpack_require__(9293));
const Clothing_Combinations_1 = __webpack_require__(8934);
const Player = mp.players.local;
let Active = false;
mp.events.add({
    'CLIENT::CREATOR:START': () => {
        Active = true;
        mp.events.callRemoteProc('SERVER::CREATOR:INFO').then((Info) => {
            Lobby_1.Lobby(false);
            Browser_1.Browser.call('BROWSER::SHOW', 'Creator');
            Player.position = Info.Position;
            Browser_1.Browser.call('BROWSER::CREATOR:TOPS', JSON.stringify(Clothing_Combinations_1.Clothing_Combinations[0]));
            Player.setHeading(0);
            mp.game.time.setClockTime(Info.Time, 0, 0);
            Player.freezePosition(true);
            mp.events.add('render', Utils_1.DisableMoving);
            Utils_1.RemoveClothing(Player);
            mp.game.ui.displayRadar(false);
            Utils_1.PlayerPreviewCamera(true);
        });
    },
    'CLIENT::CREATOR:FINISH': async (Character, Appearance) => {
        const Created = await mp.events.callRemoteProc('SERVER::CREATOR:FINISH', Character, Appearance);
        if (Created) {
            Active = false;
            mp.events.remove('render', Utils_1.DisableMoving);
            Player.freezePosition(false);
            Utils_1.PlayerPreviewCamera(false);
            Browser_1.Browser.call('BROWSER::HIDE', 'Creator');
        }
    },
    'CLIENT::CREATOR:BLEND': (shapeM, shapeF, skinM, skinF, shapeMix, skinMix) => {
        Player.setHeadBlendData(shapeM, shapeF, 0, skinM, skinF, 0, shapeMix, skinMix, 0, true);
    },
    'CLIENT::CREATOR:FACE': (Index, Value) => {
        Player.setFaceFeature(Index, Value);
    },
    'CLIENT::CREATOR:GENDER': (x) => {
        Player.model = Player_1.Player_Models[x];
        Utils_1.RemoveClothing(Player);
        // Browser.call('BROWSER::CREATOR:TOPS', JSON.stringify(Clothing_Combinations[0]));
    },
    'CLIENT::CREATOR:HAIR': (Style, Color, Highlights) => {
        Player.setComponentVariation(2, Style, 0, 0);
        Player.setHairColor(Color, Highlights);
    },
    'CLIENT::CREATOR:OVERLAY': (i, e, x) => {
        Player.setHeadOverlay(i, e, 1.0, 0, 0);
    },
    'CLIENT::CREATOR:CLOTHING': (Component, Drawable) => {
        Player.setComponentVariation(Component, Drawable, 0, 2);
        if (Component == Player_1.Clothing_Components.Top) {
            const Gender = Player_1.Genders[Player.model];
            switch (Gender) {
                case '0': {
                    if (MALE_TORSOS_json_1.default[String(Drawable)] != undefined || MALE_TORSOS_json_1.default[String(Drawable)][0] != undefined) {
                        const Torso = MALE_TORSOS_json_1.default[String(Drawable)][0].BestTorsoDrawable;
                        if (Torso != -1)
                            Player.setComponentVariation(Player_1.Clothing_Components.Torso, Torso, 0, 2);
                    }
                    break;
                }
                case '1': {
                    if (FEMALE_TORSOS_json_1.default[String(Drawable)] != undefined || FEMALE_TORSOS_json_1.default[String(Drawable)][0] != undefined) {
                        const Torso = FEMALE_TORSOS_json_1.default[String(Drawable)][0].BestTorsoDrawable;
                        if (Torso != -1)
                            Player.setComponentVariation(Player_1.Clothing_Components.Torso, Torso, 0, 2);
                    }
                    break;
                }
            }
        }
    },
    'CLIENT::CREATOR:EYES_COLOR': (Color) => {
        Player.setEyeColor(Color);
    },
    'CLIENT::CREATOR:BEARD': (Style, Color) => {
        Player.setHeadOverlay(1, Style, 1.0, Color, 0);
    }
});
mp.events.addProc({
    'CLIENT::TOP:COMBINATIONS': (Gender, Top) => {
        return Clothing_Combinations_1.Clothing_Combinations[Gender][Top];
    }
});


/***/ }),

/***/ 8934:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Clothing_Combinations = void 0;
exports.Clothing_Combinations = {
    "0": {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [0, 1, 3, 4, 8, 9, 10, 11, 12, 13, 16, 21, 23, 25, 26, 27, 28, 29, 37, 38, 41, 42, 43, 44, 45, 46, 47, 53, 60, 63, 64, 65, 67, 69, 72, 75, 76, 79, 90, 95, 96, 101, 103, 106, 109, 110, 115, 135, 141, 146, 148, 150, 168, 176, 178, 179],
        "5": [],
        "6": [2, 9, 10, 11, 13, 14, 18, 21, 22, 24, 25, 26, 27, 28, 30, 31, 32, 34, 35, 36, 39, 44, 45, 48, 54, 60, 66, 68, 71, 74, 77, 80, 86, 89, 90, 93, 94, 100, 102, 105, 107, 110, 116, 121, 134, 140, 142, 146, 147, 148, 149, 150, 167, 175, 178],
        "7": [0, 1],
        "8": [],
        "9": [],
        "10": ["URADITI KOMBINACIJE"],
        "12": [],
        "13": [],
        "14": [],
        "16": [],
        "17": [],
        "19": ["URADITI KOMBINACIJE"],
        "20": ["URADITI KOMBINACIJE"],
        "21": ["URADITI KOMBINACIJE"],
        "22": [],
        "23": ["URADITI KOMBINACIJE"],
        "24": ["URADITI KOMBINACIJE"],
        "25": ["URADITI KOMBINACIJE"],
        "26": [],
        "27": ["URADITI KOMBINACIJE"],
        "28": ["URADITI KOMBINACIJE"],
        "29": ["URADITI KOMBINACIJE"],
        "30": ["URADITI KOMBINACIJE"],
        "31": ["URADITI KOMBINACIJE"],
        "32": ["URADITI KOMBINACIJE"],
        "33": [],
        "34": [],
        "35": ["URADITI KOMBINACIJE"],
        "36": [],
        "37": ["URADITI KOMBINACIJE"],
        "38": [],
        "39": [],
        "40": ["URADITI KOMBINACIJE"],
        "41": [],
        "42": [],
        "43": [],
        "46": ["URADITI KOMBINACIJE"],
        "47": [],
        "49": [],
        "50": [],
        "51": [],
        "52": [],
        "53": [],
        "56": [],
        "57": [],
        "58": ["URADITI KOMBINACIJE"],
        "59": ["URADITI KOMBINACIJE"],
        "60": ["URADITI KOMBINACIJE"],
        "61": [],
        "62": ["URADITI KOMBINACIJE"],
        "63": [],
        "64": ["URADITI KOMBINACIJE"],
        "67": [],
        "68": ["URADITI KOMBINACIJE"],
        "69": ["URADITI KOMBINACIJE"],
        "70": ["URADITI KOMBINACIJE"],
        "71": [],
        "72": ["URADITI KOMBINACIJE"],
        "73": [],
        "74": ["URADITI KOMBINACIJE"],
        "75": [],
        "76": ["URADITI KOMBINACIJE"],
        "77": ["URADITI KOMBINACIJE"],
        "78": [],
        "79": [],
        "80": [],
        "81": [],
        "82": [],
        "83": [],
        "84": [],
        "85": [],
        "86": [],
        "87": [],
        "88": ["URADITI KOMBINACIJE"],
        "89": [],
        "90": [],
        "92": [],
        "93": [],
        "94": [],
        "95": [],
        "96": [],
        "97": [],
        "98": [],
        "99": ["URADITI KOMBINACIJE"],
        "100": ["URADITI KOMBINACIJE"],
        "101": ["URADITI KOMBINACIJE"],
        "102": ["URADITI KOMBINACIJE"],
        "103": ["URADITI KOMBINACIJE"],
        "104": ["URADITI KOMBINACIJE"],
        "105": [],
        "106": ["URADITI KOMBINACIJE"],
        "107": [],
        "108": ["URADITI KOMBINACIJE"],
        "109": ["URADITI KOMBINACIJE"],
        "110": [],
        "111": [],
        "112": ["URADITI KOMBINACIJE"],
        "113": [],
        "115": ["URADITI KOMBINACIJE"],
        "117": [],
        "118": ["URADITI KOMBINACIJE"],
        "119": ["URADITI KOMBINACIJE"],
        "121": [],
        "122": ["URADITI KOMBINACIJE"],
        "123": [],
        "124": ["URADITI KOMBINACIJE"],
        "125": [],
        "126": [],
        "127": ["URADITI KOMBINACIJE"],
        "128": [],
        "131": [],
        "132": [],
        "133": [],
        "134": [],
        "135": [],
        "136": ["URADITI KOMBINACIJE"],
        "137": ["URADITI KOMBINACIJE"],
        "138": [],
        "139": [],
        "140": ["URADITI KOMBINACIJE"],
        "141": [],
        "142": ["URADITI KOMBINACIJE"],
        "143": [],
        "144": [],
        "145": ["URADITI KOMBINACIJE"],
        "146": [],
        "147": [],
        "150": [],
        "151": ["URADITI KOMBINACIJE"],
        "152": [],
        "153": [],
        "154": [],
        "156": ["URADITI KOMBINACIJE"],
        "157": ["URADITI KOMBINACIJE"],
        "158": ["URADITI KOMBINACIJE"],
        "159": ["URADITI KOMBINACIJE"],
        "160": ["URADITI KOMBINACIJE"],
        "161": ["URADITI KOMBINACIJE"],
        "162": ["URADITI KOMBINACIJE"],
        "163": ["URADITI KOMBINACIJE"],
        "164": [],
        "165": [],
        "166": ["URADITI KOMBINACIJE"],
        "167": ["URADITI KOMBINACIJE"],
        "168": [],
        "169": ["URADITI KOMBINACIJE"],
        "170": ["URADITI KOMBINACIJE"],
        "171": [],
        "172": ["URADITI KOMBINACIJE"],
        "173": ["URADITI KOMBINACIJE"],
        "174": ["URADITI KOMBINACIJE"],
        "175": ["URADITI KOMBINACIJE"],
        "176": ["URADITI KOMBINACIJE"],
        "177": ["URADITI KOMBINACIJE"],
        "180": ["URADITI KOMBINACIJE"],
        "181": ["URADITI KOMBINACIJE"],
        "182": [],
        "183": ["URADITI KOMBINACIJE"],
        "184": [],
        "185": ["URADITI KOMBINACIJE"],
        "187": [],
        "188": [],
        "189": ["URADITI KOMBINACIJE"],
        "190": [],
        "191": ["URADITI KOMBINACIJE"],
        "192": ["URADITI KOMBINACIJE"],
        "193": [],
        "194": [],
        "195": [],
        "196": [],
        "197": [],
        "198": [],
        "199": ["URADITI KOMBINACIJE"],
        "200": [],
        "202": ["URADITI KOMBINACIJE"],
        "203": [],
        "204": [],
        "205": ["URADITI KOMBINACIJE"],
        "206": ["URADITI KOMBINACIJE"],
        "207": ["URADITI KOMBINACIJE"],
        "208": [],
        "209": [],
        "210": [],
        "211": [],
        "212": ["URADITI KOMBINACIJE"],
        "214": [],
        "215": ["URADITI KOMBINACIJE"],
        "216": ["URADITI KOMBINACIJE"],
        "217": [],
        "218": [],
        "219": ["URADITI KOMBINACIJE"],
        "220": [],
        "221": [],
        "222": [],
        "223": ["URADITI KOMBINACIJE"],
        "224": [],
        "225": [],
        "226": [],
        "227": [],
        "229": [],
        "230": ["URADITI KOMBINACIJE"],
        "232": ["URADITI KOMBINACIJE"],
        "233": ["URADITI KOMBINACIJE"],
        "234": [],
        "235": [],
        "237": [],
        "238": [],
        "239": [],
        "240": ["URADITI KOMBINACIJE"],
        "241": [],
        "242": [],
        "243": [],
        "244": ["URADITI KOMBINACIJE"],
        "245": [],
        "247": ["URADITI KOMBINACIJE"],
        "248": [],
        "249": ["URADITI KOMBINACIJE"],
        "250": ["URADITI KOMBINACIJE"],
        "251": [],
        "253": [],
        "254": [],
        "255": [],
        "256": [],
        "257": [],
        "258": ["URADITI KOMBINACIJE"],
        "259": [],
        "260": [],
        "261": ["URADITI KOMBINACIJE"],
        "262": [],
        "263": [],
        "264": ["URADITI KOMBINACIJE"],
        "265": [],
        "266": ["URADITI KOMBINACIJE"],
        "267": ["URADITI KOMBINACIJE"],
        "268": ["URADITI KOMBINACIJE"],
        "269": ["URADITI KOMBINACIJE"],
        "271": [],
        "272": [],
        "273": [],
        "279": [],
        "280": [],
        "281": [],
        "282": [],
        "288": [],
        "292": ["URADITI KOMBINACIJE"],
        "293": ["URADITI KOMBINACIJE"],
        "294": ["URADITI KOMBINACIJE"],
        "295": ["URADITI KOMBINACIJE"],
        "296": [],
        "297": [],
        "298": [],
        "300": [],
        "301": [],
        "302": [],
        "303": ["URADITI KOMBINACIJE"],
        "304": ["URADITI KOMBINACIJE"],
        "305": [],
        "306": [],
        "307": [],
        "308": [],
        "309": ["URADITI KOMBINACIJE"],
        "310": ["URADITI KOMBINACIJE"],
        "311": ["URADITI KOMBINACIJE"],
        "312": ["URADITI KOMBINACIJE"],
        "313": [],
        "316": [],
        "317": [],
        "319": [],
        "321": [],
        "322": [],
        "323": [],
        "325": [],
        "326": [],
        "328": [],
        "329": [],
        "330": [],
        "331": [],
        "332": [],
        "334": [],
        "335": [],
        "336": [],
        "337": ["URADITI KOMBINACIJE"],
        "338": ["URADITI KOMBINACIJE"],
        "339": ["URADITI KOMBINACIJE"],
        "340": ["URADITI KOMBINACIJE"],
        "341": [],
        "342": [],
        "343": [],
        "344": ["URADITI KOMBINACIJE"],
        "345": [],
        "346": ["URADITI KOMBINACIJE"],
        "347": ["URADITI KOMBINACIJE"],
        "348": [],
        "349": [],
        "350": [],
        "351": [],
        "352": [],
        "353": [],
        "354": [],
        "355": ["URADITI KOMBINACIJE"],
        "356": [],
        "357": [],
        "358": [],
        "359": [],
        "360": ["URADITI KOMBINACIJE"],
        "361": []
    }
};


/***/ }),

/***/ 2082:
/***/ (() => {

"use strict";



/***/ }),

/***/ 8412:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Genders = exports.Player_Models = exports.Clothing_Components = void 0;
var Clothing_Components;
(function (Clothing_Components) {
    Clothing_Components[Clothing_Components["Head"] = 0] = "Head";
    Clothing_Components[Clothing_Components["Mask"] = 1] = "Mask";
    Clothing_Components[Clothing_Components["HairStyle"] = 2] = "HairStyle";
    Clothing_Components[Clothing_Components["Torso"] = 3] = "Torso";
    Clothing_Components[Clothing_Components["Legs"] = 4] = "Legs";
    Clothing_Components[Clothing_Components["Bag"] = 5] = "Bag";
    Clothing_Components[Clothing_Components["Shoes"] = 6] = "Shoes";
    Clothing_Components[Clothing_Components["Accessorie"] = 7] = "Accessorie";
    Clothing_Components[Clothing_Components["Undershirt"] = 8] = "Undershirt";
    Clothing_Components[Clothing_Components["Armour"] = 9] = "Armour";
    Clothing_Components[Clothing_Components["Decal"] = 10] = "Decal";
    Clothing_Components[Clothing_Components["Top"] = 11] = "Top";
})(Clothing_Components = exports.Clothing_Components || (exports.Clothing_Components = {}));
exports.Player_Models = [mp.game.joaat('mp_m_freemode_01'), mp.game.joaat('mp_f_freemode_01')];
exports.Genders = {
    0x705E61F2: '0',
    0x9C9EFFD8: '1'
};


/***/ }),

/***/ 7908:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
let Active = false;
let PatrolsMap = false;
mp.events.add({
    'entityStreamIn': (Entity) => {
    },
    'render': () => {
        // if (PatrolsMap) { 
        //    mp.players.forEach((player) => { 
        //       if (player.getVariable('Faction') == police) { 
        //          browser.execute() // push ime igraca i x i y;
        //       }
        //    })
        // }
    }
});
// function Patrol (callsign, x, y) { 
//    const { x, y } = Player.position;
//    let N = 0, M = 0;
//    // 400 / 500 = N / x;
// };
mp.events.addDataHandler({
    'callsign': (Entity, NewValue, OldValue) => {
    }
});


/***/ }),

/***/ 3953:
/***/ (() => {

"use strict";

// // uraditi provere da li je chat otvoren
// var moving_speeds = [0.01, 0.1, 1.0, 5.0, 10.0];
// var moving_speed_idx = 0;
// var editing_types = ["X position", "Y position", "Height", "X Rot", "Y Rot", "Rotation"];
// var editing_type_idx = 0;
// const localplayer = mp.players.local;
// let Editing = false;
// let Object: ObjectMp | null = null;
// var sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
// var scInst = 0;
// function AddInstructionalStart() {
//     scInst = 0;
//     mp.game.graphics.drawScaleformMovieFullscreen(sc, 255, 255, 255, 0, false);
//     mp.game.graphics.pushScaleformMovieFunction(sc, "CLEAR_ALL");
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_CLEAR_SPACE");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
// }
// function AddInstructionalButton(text: string, button: number)
// {
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
//     mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     scInst++;
// }
// function AddInstructionalButtonCustom(text: string, button: string) {
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
//     mp.game.graphics.pushScaleformMovieFunctionParameterString(button);
//     mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     scInst++;
// }
// function AddInstructionalEnd(type: number) {
//     mp.game.graphics.pushScaleformMovieFunction(sc, "DRAW_INSTRUCTIONAL_BUTTONS");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_BACKGROUND_COLOUR");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
// }
// mp.events.add("client:startFurnitureEditor", function (model) {
//    Object = mp.objects.new(mp.game.joaat(model), new mp.Vector3(localplayer.position.x+1, localplayer.position.y+1, localplayer.position.z-0.5), 
//    {
// 	   rotation: new mp.Vector3(0, 0, 0),
// 	   alpha: 255,
// 	   dimension: localplayer.dimension
//    });
//    Editing = true;
// });
// mp.events.add("client:stopFurnitureEditor", function () {
//    Object?.destroy();
//    Object = null;
//    Editing = false;
// });
// function UpdateObject() {
//    if (Object == null) return;
//    let model = Object.model;
//    let position = Object.position;
//    let rot = Object.getRotation(2);
//    let pitch = Object.getPitch();
//    Object.destroy();
//    Object = mp.objects.new(model, position,
//    {
// 	   rotation: new mp.Vector3(rot.x, rot.y, rot.z),
// 	   alpha: 255,
// 	   dimension: localplayer.dimension
//    });
//    Object.setRotation(pitch, rot.y, rot.z, 2, true);
// }
// mp.keys.bind(0x26, false, function () { // UP Arrow
//    if (!Editing || Object === null) return; // uraditi proveru i da li je chat otvoren
//    switch (editing_type_idx) {
//        // pos x
//        case 0:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x + moving_speeds[moving_speed_idx], pos.y, pos.z);
//            break;
//        // pos y
//        case 1:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y + moving_speeds[moving_speed_idx], pos.z);
//            break;
//        // pos z
//        case 2:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y, pos.z + moving_speeds[moving_speed_idx]);
//            break;
//        // rot x
//        case 3:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
//            Object.setRotation(pitch + moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
//            mp.gui.chat.push("rot X" + rot);
//            break;
//        // rot y
//        case 4:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
//            Object.setRotation(pitch, rot.y + moving_speeds[moving_speed_idx], rot.z, 2, true);
//            mp.gui.chat.push("rot Y" + rot);
//            break;
//        // rot z
//        case 5:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
//            Object.setRotation(pitch, rot.y, rot.z + moving_speeds[moving_speed_idx], 2, true);
//            mp.gui.chat.push("rot Z" + rot);
//            break;
//    }
//    UpdateObject();
// });
// mp.keys.bind(0x28, false, function () { // DOWN Arrow
//    if (!Editing || Object === null) return; // uraditi proveru i da li je chat otvoren
//    switch (editing_type_idx) {
//        // pos x
//        case 0:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x - moving_speeds[moving_speed_idx], pos.y, pos.z);
//            break;
//        // pos y
//        case 1:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y - moving_speeds[moving_speed_idx], pos.z);
//            break;
//        // pos z
//        case 2:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y, pos.z - moving_speeds[moving_speed_idx]);
//            break;
//        // rot x
//        case 3:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
//            Object.setRotation(pitch - moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
//            break;
//        // rot y
//        case 4:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
//            Object.setRotation(pitch, rot.y - moving_speeds[moving_speed_idx], rot.z, 2, true);
//            break;
//        // rot z
//        case 5:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
//            Object.setRotation(pitch, rot.y, rot.z - moving_speeds[moving_speed_idx], 2, true);
//            break;
//    }
//    UpdateObject();
// });
// mp.keys.bind(0x25, false, function () { // LEFT Arrow
//    if (!Editing) return;
//    editing_type_idx--;
//    if (editing_type_idx < 0) editing_type_idx = editing_types.length - 1;
//    mp.gui.chat.push(`[DEBUG] Edit type: ${editing_types[editing_type_idx]}`);
// });
// mp.keys.bind(0x27, false, function () { // RIGHT Arrow
//    if (!Editing) return;
//    editing_type_idx++;
//    if (editing_type_idx >= editing_types.length) editing_type_idx = 0;
//    mp.gui.chat.push(`[DEBUG] Edit type: ${editing_types[editing_type_idx]}`);
// });
// mp.keys.bind(0x59, false, function () { // Y key
//    if (!Editing || Object === null) return;
//    let rot = Object.getRotation(2);
//    mp.events.callRemote("server:acceptEditFurniture", Object.model, Object.position.x, Object.position.y, Object.position.z, rot.x, rot.y, rot.z);
//    Object.destroy();
//    Object = null;
//    Editing = false;
//    mp.gui.chat.push("[DEBUG] Edit finished, furniture placed");
// });
// mp.keys.bind(0x4E, false, function () { // N key
//    if (!Editing) return;
//    Object?.destroy();
//    Object = null;
//    Editing = false;
//    //mp.events.callRemote("server:cancelEditFurniture");
//    mp.gui.chat.push("[DEBUG] Edit canceled");
// });
// mp.keys.bind(0x5A, false, function () { // Z key
//    if (!Editing || Object === null) return;
//    Object.placeOnGroundProperly();
//    UpdateObject();
//    mp.gui.chat.push("[DEBUG] Object placed on ground properly.");
// });
// mp.keys.bind(0x6B, false, function () { // Add key
//    if (!Editing) return;
//    moving_speed_idx++;
//    if (moving_speed_idx >= moving_speeds.length) moving_speed_idx = 0;
//    mp.gui.chat.push(`[DEBUG] Speed added ${moving_speed_idx}`);
// });
// mp.keys.bind(0x6D, false, function () { // Subtract key
//    if (!Editing) return;
//    moving_speed_idx--;
//    if (moving_speed_idx < 0) moving_speed_idx = moving_speeds.length - 1;
//    mp.gui.chat.push(`[DEBUG] Speed lowered ${moving_speed_idx}`);
// });
// mp.events.add('render', () => {
//     if (Object === null) return;
//     AddInstructionalStart();
//     AddInstructionalButton("Next mode", 197);
//     AddInstructionalButton("Previous mode", 196);
//     AddInstructionalButton("Moving an object", 194);
//     AddInstructionalButton("Moving an object", 195);
//     AddInstructionalButtonCustom("Increase speed", "t_+");
//     AddInstructionalButtonCustom("Decrease speed", "t_-");
// 	AddInstructionalButtonCustom("Place on ground", "t_Z");
//     AddInstructionalButtonCustom("Finish furniture", "t_Y");
//     AddInstructionalButtonCustom("Cancel", "t_N");
//     AddInstructionalEnd(1);
//    //  mp.game.graphics.drawText(`Editing mode: ${editing_types[editing_type_idx]}\nSpeed: ${moving_speeds[moving_speed_idx]}`, [0.5, 0.9], {
//    //      font: 0,
//    //      color: [255, 255, 255, 255],
//    //      scale: [0.5, 0.5],
//    //      outline: false
//    //  });
// });
// export {};


/***/ }),

/***/ 805:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
var UI_Status;
(function (UI_Status) {
    UI_Status[UI_Status["Full_Visible"] = 0] = "Full_Visible";
    UI_Status[UI_Status["Only_Chat"] = 1] = "Only_Chat";
    UI_Status[UI_Status["Chat_Hidden"] = 2] = "Chat_Hidden";
    UI_Status[UI_Status["Fully_Hidden"] = 3] = "Fully_Hidden";
})(UI_Status || (UI_Status = {}));
;
mp.events.add({
    'CLIENT::NOTIFICATION': (Message, Type, Time) => {
        Browser_1.Browser.call('BROWSER::NOTIFICATION', Message, Type, Time);
    }
});
class GAME_UI {
    constructor() {
        this.Vehicle_UI = false;
        this.Weapon_UI = false;
        this.Status = UI_Status.Fully_Hidden;
        mp.events.add('render', this.GTA_HUD);
    }
    Toggle() {
        this.Status++;
        if (this.Status > UI_Status.Fully_Hidden)
            this.Status = 0;
        switch (true) {
            case this.Status == UI_Status.Full_Visible: {
                mp.events.add('render', this.MainInterface);
                break;
            }
        }
    }
    GTA_HUD() {
        mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
        mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
        mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
        mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
        mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
        mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
        mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
        mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS
        mp.game.invoke('0x9E4CFFF989258472'); // Anti AFK CAM
        mp.game.invoke('0xF4F2C0D4EE209E20'); // Anti shake cam
        GameInterface.HIDE_CORSSAIR();
    }
    MainInterface() {
        const { x: x, y: y, z: z } = Player.position;
        const path = mp.game.pathfind.getStreetNameAtCoord(x, y, z, 0, 0);
        const Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(x, y, z));
        const Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
        const Heading = this.Headed(Player.getHeading());
    }
    HIDE_CORSSAIR() {
        const Weapon = Player.weapon;
        Weapon == 0x05FC3C11 || Weapon == 0x0C472FE2 || Weapon == 0xA914799 || Weapon == 0xC734385A || Weapon == 0x6A6C02E0 ?
            (mp.game.ui.showHudComponentThisFrame(14)) : mp.game.ui.hideHudComponentThisFrame(14);
    }
    Headed(H) {
        switch (true) {
            case (H < 30): return 'N';
            case (H < 90): return 'NW';
            case (H < 135): return 'W';
            case (H < 180): return 'SW';
            case (H < 225): return 'S';
            case (H < 270): return 'SE';
            case (H < 315): return 'E';
            case (H < 360): return 'NE';
            default: return 'N';
        }
    }
}
const GameInterface = new GAME_UI();
__webpack_unused_export__ = GameInterface;


/***/ }),

/***/ 8181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
let HouseManagment = false;
mp.events.add({
    'CLIENT::HOUSE:MANAGEMENT': () => {
        HouseManagment = !HouseManagment;
        Browser_1.Browser.call(HouseManagment ? 'BROWSER::SHOW' : `BROWSER::HIDE`, 'HouseManagement');
    },
});


/***/ }),

/***/ 2198:
/***/ (() => {

"use strict";

// import { Browser } from "./Browser";
// import { Controls } from "./Utils";
// const Player = mp.players.local;
// let Active:boolean = false;
// const ScreenResolution = mp.game.graphics.getScreenActiveResolution(100, 100);
// mp.events.add({
//    'CLIENT::INVENTORY:TOGGLE': () => { 
//       Active = !Active;
//       Browser.call('BROWSER::INVENTORY:TOGGLE', Active);
//    }
// });
// mp.events.add({
//    'client:inventory.item:drop': Drop,
//    'client:inventory.item:use': Use,
//    'client:inventory.item:give': Give,
//    'client:inventory.process.clothing': (index) => { 
//       mp.events.callRemote('server:item.clothing', index);
//    },
//    'client:inventory.weapon.select': (key, id) => { 
//       mp.events.callRemote('server:weapon.select', key, id);
//    },
//    'client:inventory.vehicle:trunk': (id, Items) => { 
//       if (browser) { 
//          browser.execute('inventory.vehicle.id = ' + id);
//          browser.execute('inventory.vehicle.items = ' + JSON.stringify(Items));
//       }
//    },
//    'client:inventory.item.trunk:get': async (vehicle, item) => { 
//       const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item.trunk:get', vehicle, item);
//       if (Inventory && Trunk) { 
//          browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
//          browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
//       }
//    },
//    'client:inventory.item:trunk': async (vehicle, item) => { 
//       const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item:trunk', vehicle, item);
//       if (Inventory && Trunk) { 
//          if (browser) { 
//             browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
//             browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
//          }
//       }
//    },
//    'client:inventory.player:nearby': () => { 
//       let Nearby = [];
//       mp.players.forEachInRange(Player.position, 4, (target) => { 
//          if (target.dimension === Player.dimension && target.remoteId != Player.remoteId) { 
//             Nearby.push({ id: target.remoteId, name: target.name });
//          }
//       })
//       browser.execute('inventory.nearbyPlayers = ' + JSON.stringify(Nearby));
//    },
//    'render': () => { 
//       if (Player.logged && Player.spawned) { 
//          mp.objects.forEach((Object) => { 
//             if (Player.hasClearLosTo(Object.handle, 17)) {
//                const PlayerPosition = Player.position;
//                const ObjectPosition = Object.position;
//                if (Object.getVariable('Item')) { 
//                   const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z)).length();
//                   const position = mp.game.graphics.world3dToScreen2d(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z + 0.15);
//                   if (position) {
//                      let x = position.x;
//                      let y = position.y;
//                      if (Distance <= 2.5) {       
//                         let scale = (Distance / 25);
//                         if (scale < 0.6) scale = 0.6;
//                         y -= (scale * (0.005 * (ScreenResolution.y / 1080))) - parseInt('0.010');
//                         const Item = Object.getVariable('Item');
//                         // mp.game.graphics.drawText(Item, [x, y], {
//                         //    font: 4,
//                         //    color: [255, 255, 255, 255],
//                         //    scale: [0.325, 0.325],
//                         //    outline: false
//                         // });
//                      }
//                   }
//                }
//             }
//          });
//       }
//    }
// });
// mp.keys.bind(Controls.KEY_I, false, function() {
//    if (Player.getVariable('Logged') && Player.getVariable('Spawned')) { 
//       if ( Player.isTypingInTextChat || Player.Cuffed ) return;
//       mp.events.call('client:inventory.toggle');
//    }
// });
// mp.keys.bind(Controls.KEY_Y, false, function() {
//    if (Player.getVariable('Logged') && Player.getVariable('Spawned')) { 
//       if (Player.vehicle || Player.getVariable('Cuffed') || mp.players.local.isTypingInTextChat) return;
//       mp.events.callRemote('server:player.inventory.item:pickup');
//    }
// });
// async function Give (Target: PlayerMp, ITEM_ID: number, Quantity: number) {
//    const Response = await mp.events.callRemoteProc('SERVER::ITEM:GIVE', Target, ITEM_ID, Quantity);
// }
// async function Use (ITEM_ID: number) { 
//    const Inventory = await mp.events.callRemoteProc('SERVER::ITEM:USE', ITEM_ID);
// }
// async function Drop (Item: number, Hash: string, quantity = 1) { 
//    let { position } = Player;
//    let heading = Player.getHeading();
//    let rotation = Player.getRotation(2);
//    let newPos = new mp.Vector3(
//       position.x + Math.cos(((heading + 90) * Math.PI) / 180) * 0.6,
//       position.y + Math.sin(((heading + 90) * Math.PI) / 180) * 0.6,
//       position.z,
//    );
//    let object = mp.objects.new(
//       mp.game.joaat(Hash),
//       new mp.Vector3(newPos.x, newPos.y, newPos.z),
//       {
//          alpha: 255,
//          rotation: new mp.Vector3(rotation.x, rotation.y, rotation.z),
//          dimension: Player.dimension,
//       },
//    );
//    while (object.handle === 0) {
//       await mp.game.waitAsync(0);
//    }
//    object.placeOnGroundProperly();
//    let fixedPosition = {
//       position: object.getCoords(false),
//       rotation: object.getRotation(2),
//    };
//    object.destroy();
//    const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:drop', Item, JSON.stringify(fixedPosition), quantity);
//    mp.game.streaming.requestAnimDict('random@domestic');
//    Player.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
// }
// export {};


/***/ }),

/***/ 1021:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Utils_1 = __webpack_require__(8675);
const Player = mp.players.local;
let browser = null, opened = false;
let Delivering = false;
mp.events.add({
    'client:job.food:orders': (Orders) => {
        if (Delivering)
            return;
        opened = !opened;
        if (opened) {
            browser = mp.browsers.new('package://jobs/jobs-interfaces/food.html');
            browser.execute('food.Orders = ' + JSON.stringify(Orders));
        }
        else {
            // Else
        }
    },
    'client:job.food.order:accept': async (i) => {
        const response = await mp.events.callRemoteProc('server:job.food.order:accept', i);
        if (response) {
            mp.events.call('client:job.food:orders');
            Delivering = true;
            const Position = new mp.Vector3(response.Position.x, response.Position.y, response.Position.z - 0.9);
            const { Checkpoint, Blip } = Utils_1.CreateInteractionSpot('Food Order', Position);
            mp.events.add('playerEnterCheckpoint', ReachOrderPoint);
            function ReachOrderPoint(Point) {
                if (Point == Checkpoint) {
                    if (Player.vehicle)
                        return;
                    Delivering = false;
                    Checkpoint.destroy();
                    Blip.destroy();
                    mp.events.callRemote('server:job.food.order:deliver', i);
                    mp.events.remove('playerEnterCheckpoint', ReachOrderPoint);
                }
            }
        }
        else {
            mp.events.call('client:job.food:orders');
            Delivering = false;
        }
    }
});


/***/ }),

/***/ 8545:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Utils_1 = __webpack_require__(8675);
const Player = mp.players.local, MAX = 25;
let DeliveredMails = 0;
mp.events.add({
    'client:job.postal:start': (deliverPos) => {
        HouseInteraction(deliverPos);
    },
});
function HouseInteraction(Position) {
    const { Checkpoint, Blip } = Utils_1.CreateInteractionSpot(`Mail Deliver No${DeliveredMails}`, Position);
    mp.events.add('playerEnterCheckpoint', OnPlayerDeliverMail);
    function OnPlayerDeliverMail(Point) {
        if (DeliveredMails == MAX) {
            //mp.events.callRemote('server:job:finish', 6); // jobId
        }
        if (Point == Checkpoint) {
            DeliveredMails++;
            Checkpoint.destroy();
            Blip.destroy();
            mp.events.remove('playerEnterCheckpoint', OnPlayerDeliverMail);
        }
    }
}
function BehindTruckInteraction() {
    const Truck = player.getVariable('Job_Veh');
    if (Truck) {
        const PosBehind = Truck.getOffsetFromInWorldCoords(0.0, -3.8, 0.0);
        const { Checkpoint, Blip } = Utils_1.CreateInteractionSpot('GoPostal Van', PosBehind);
        mp.events.add('playerEnterCheckpoint', OnPlayerTakeMail);
        function OnPlayerTakeMail(Point) {
            if (Point == Checkpoint) {
                if (Utils_1.DistanceBetweenVectors(Player.position, PosBehind) <= 0.5) {
                    Player.heading = Truck.heading;
                    Checkpoint.destroy();
                    Blip.destroy();
                    mp.events.remove('playerEnterCheckpoint', OnPlayerTakeMail);
                    // Uzima postu iz kamiona
                    // NACI ANIMACIJU
                    // Dobija objekat paketa ili pisma u ruci ( random )
                }
            }
        }
    }
}


/***/ }),

/***/ 1451:
/***/ (() => {

"use strict";

// const player = mp.players.local;
// let marker = null;
// mp.events.addDataHandler('container', (entity, newValue, oldValue) => {
//    if (entity.type === 'vehicle' && entity.model == 444583674) {
//       if (newValue !== oldValue) { 
//          container(entity, newValue);
//       }
//    }
// });
// mp.events.add({
//    'entityStreamIn': (entity) => {
//       if (entity.type === 'vehicle' && entity.model == 444583674) { 
//          if (entity.getVariable('container')) container(entity, entity.getVariable('container'));
//       }
//    },
//    'render': () => { 
//       if (player.vehicle && player.vehicle.model == 444583674) { 
//          if (player.vehicle.getVariable('container') != false) { 
//             // mp.game.controls.disableControlAction(0, 110, true); // DISABLEATI NUM 8 i 5 da kad ima =>
//             // mp.game.controls.disableControlAction(27, 111, true); // > kontenjer ne moze da podize i spusta
//          }
//       }
//    }
// })
// mp.keys.bind(0x59, false, function() {
//    if (player.logged && player.spawned) {
//       if (player.vehicle && player.vehicle.model == 444583674) { 
//          let vehicle = player.vehicle;
//          if (vehicle.container) { 
//             let frontOffset = vehicle.getOffsetFromInWorldCoords(0.0, 6.5, 0.0);
//             mp.events.callRemote('server:vehicle.detach.container', frontOffset); 
//             if (marker) marker.destroy();
//          } else { 
//             mp.events.callRemote('server:vehicle.attach.container'); 
//             marker = mp.blips.new(1, new mp.Vector3(1111.625, -3139.361, 0), { name: 'Zona za dostavu kontenjera', color: 49, shortRange: false });
//          }
//       }
//    }
// });
// function container (vehicle, value) { 
//    if (value) { 
//       vehicle.container = value;
//       vehicle.containerObject = mp.objects.new('prop_container_03a', vehicle.position, { rotation: vehicle.rotation, alpha: 255, dimension: vehicle.dimension });
//       vehicle.containerObject.notifyStreaming = true;
//       vehicle.containerObject.setNoCollision(vehicle.handle, false);
//       waitEntity(vehicle.containerObject).then(() => {
//          let position = new mp.Vector3(0.05, -0.02, 0.01);
//          vehicle.containerObject.attachTo(vehicle.handle, 0, position.x - 0.05, position.y + 6, position.z, 0, 0, 90, true, false, true, false, 2, true);
//       })
//    } else { 
//       vehicle.container = false;
//       if (vehicle.containerObject) { 
//          if (vehicle.containerObject.doesExist()) { 
//             vehicle.containerObject.destroy();
//          }
//       }
//    }
// }
// function waitEntity (entity) {
//    return new Promise(resolve => {
//       let wait = setInterval(() => {
//          if (mp.game.entity.isAnEntity(entity.handle)) {
//             clearInterval(wait);
//             resolve();
//          }
//       }, 1);
//    });
// }


/***/ }),

/***/ 3890:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
let Offer = false;
mp.events.add({
    'CLIENT::JOB:OFFER': (Info) => {
        mp.gui.chat.push(JSON.stringify(Info));
        Offer = !Offer;
        Browser_1.Browser.call(Offer ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'JobOffer');
    },
    'CLIENT::JOB:ACCEPT': (Job) => {
        mp.events.call('CLIENT::JOB:OFFER');
        mp.events.callRemote('SERVER::JOB:ACCEPT', Job);
    },
    'CLIENT::JOB:WAYPOINT': (Position) => {
        mp.game.ui.setNewWaypoint(Position.x, Position.y);
    }
});


/***/ }),

/***/ 5987:
/***/ (() => {

"use strict";

// const Player = mp.players.local;
// let Spots = [], current = null;
// let browser = null;
// mp.events.add({
//    'client:player.miner.start': Start,
//    'client:player.miner.next': Next,
//    'playerEnterCheckpoint': (checkpoint) => {
//       if (Player.Job == 2 && Spots.length > 0 && current != null) { 
//          mp.gui.chat.push('Going to next')
//          Mine();
//       } 
//    },
//    'client:player.miner:mine': () => {
//       mp.game.streaming.requestAnimDict('amb@world_human_const_drill@male@drill@base');
//       Player.taskPlayAnim('amb@world_human_const_drill@male@drill@base', 'base', 8.0, -8, -1, 48, 0, false, false, false);
//       let timer = setInterval(() => {
//          if (Player.getAnimCurrentTime('amb@world_human_const_drill@male@drill@base', 'base') > 0.95) {
//             Player.stopAnimTask('amb@world_human_const_drill@male@drill@base', 'base', 3.0);
//             clearInterval(timer);
//             timer = null;
//             if (!timer) browser.execute('mining.clicked = false')
//          }
//       }, 50);
//    }
// })
// function Start (places) { 
//    places.forEach(place => {
//       Spots.push({position: place});
//    });
//    current = 0;
//    browser = mp.browsers.new('package://jobs/jobs-interfaces/mining.html');
//    let spot = Spots[current];
//    let position = new mp.Vector3(spot.position[0], spot.position[1], spot.position[2] - 2.15)
//    spot.checkpoint = mp.checkpoints.new(47, position, 2.5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
// }
// function Mine () { 
//    mp.gui.cursor.show(true, true);
//    browser.execute('mining.toggle = true');
//    Player.taskStartScenarioInPlace('WORLD_HUMAN_CONST_DRILL', 0, true);
// }
// function Next () {    
//    Player.clearTasks();
//    let spot = Spots[current];
//    spot.checkpoint.destroy();
//    mp.gui.cursor.show(false, false);
//    browser.execute('mining.toggle = false');
//    current ++;
//    let next = Spots[current], position = new mp.Vector3(next.position[0], next.position[1], next.position[2] - 2.15);
//    current >= Spots.length ? ( Finish() ) : (
//       next.checkpoint = mp.checkpoints.new(47, position, 2.5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension })
//    )
// }
// function Finish () { 
//    current = null;
//    Spots = null;
//    if (mp.browsers.at(browser.id)) browser.destroy();
//    mp.gui.chat.push('Finished !')
// }


/***/ }),

/***/ 2666:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Utils_1 = __webpack_require__(8675);
const Player = mp.players.local;
const Max = 25;
const Depony = new mp.Vector3(-435.5779, -1704.9042, 18.06115);
let Visited = [];
let Picked = false;
const GarbageObjects = [
    'prop_dumpster_01a',
    'prop_dumpster_02b',
    'prop_dumpster_4a',
    'prop_rub_binbag_sd_01',
    'prop_cs_bin_03',
    'prop_cs_bin_01_skinned',
    'prop_cs_bin_02',
    'prop_ld_rub_binbag_01',
    'prop_cs_bin_01',
    'prop_rub_binbag_sd_02',
    'prop_ld_binbag_01',
    'prop_fbibombbin',
    'prop_cs_rub_binbag_01',
    'prop_bin_07bprop_bin_beach_01d',
    'prop_bin_beach_01d',
    'prop_bin_01a',
    'prop_recyclebin_04_a',
    'prop_bin_beach_01a',
    'prop_recyclebin_02_c',
    'prop_bin_delpiero_b',
    'zprop_bin_01a_old',
    'prop_recyclebin_03_a',
    'prop_bin_11a',
    'prop_bin_06a',
    'prop_bin_07d',
    'prop_bin_11',
    'bprop_bin_04a',
    'prop_recyclebin_02b',
    'prop_bin_delpiero',
    'prop_bin_09a',
    'prop_bin_08a',
    'prop_recyclebin_04_b',
    'prop_bin_02a',
    'prop_bin_03a',
    'prop_bin_08open',
    'prop_bin_12a',
    'prop_bin_05a',
    'prop_bin_07a',
    'prop_recyclebin_01a',
    'v_serv_tc_bin2_',
    'v_serv_tc_bin1_',
    'prop_rub_binbag_03b',
    'prop_rub_binbag_04',
    'prop_rub_binbag_08',
    'prop_rub_binbag_01',
    'prop_rub_binbag_05',
    'p_rub_binbag_test',
    'prop_rub_binbag_06',
    'prop_rub_binbag_03',
    'prop_rub_binbag_01b',
    'hei_prop_heist_binbag',
    'ng_proc_binbag_01a',
    'ng_proc_binbag_02a',
    'p_binbag_01_s',
    'prop_forsale_lrg_04'
];
mp.keys.bind(0x59, false, async function () {
    if (Player.Logged && Player.Spawned && Player.getVariable('Job') == 4 && Player.getVariable('Job_Duty') == true) {
        if (Player.vehicle || Player.Cuffed || Player.isTypingInTextChat)
            return;
        if (Visited.length == Max)
            return;
        if (Visited.length == Max - 1) {
            const { Checkpoint, Blip } = Utils_1.CreateInteractionSpot('Depony', Depony);
            mp.events.add('playerEnterCheckpoint', PlayerEnterDepony);
            function PlayerEnterDepony(Point) {
                if (Point == Checkpoint) {
                    let Truck = mp.vehicles.atRemoteId(Player.getVariable('Job_Vehicle'));
                    if (Player.vehicle == Truck) {
                        Truck.setDoorOpen(5, false, false);
                        Player.freezePosition(true);
                        Truck.freezePosition(true);
                        setTimeout(() => {
                            Player.freezePosition(false);
                            Truck.freezePosition(false);
                            Truck.setDoorShut(5, false);
                            mp.events.callRemote('server:job.garbage:finish');
                        }, 15000);
                        Checkpoint.destroy();
                        Blip.destroy();
                        mp.events.remove('playerEnterCheckpoint', PlayerEnterDepony);
                    }
                }
            }
        }
        const Garbage = await ClosestGarbage();
        if (Garbage) {
            const aPicked = AlreadyPicked();
            if (aPicked)
                return;
            Picked = true;
            mp.events.callRemote('server:character.attachment', 'prop_cs_street_binbag_01', 6286);
            Visited.push(Player.position);
            const Truck = mp.vehicles.atRemoteId(Player.getVariable('Job_Vehicle'));
            if (Truck) {
                const BehindOffset = Truck.getOffsetFromInWorldCoords(0.0, -5.15, 0.0);
                const [colshape, marker] = LittleMarker(BehindOffset);
                Truck.freezePosition(true);
                mp.events.add('playerEnterColshape', BehindGarbageTruck);
                function BehindGarbageTruck(Shape) {
                    if (Shape == colshape) {
                        if (Player.vehicle)
                            return;
                        Player.setHeading(Truck.getHeading());
                        Picked = false;
                        colshape.destroy();
                        marker.destroy();
                        Truck.freezePosition(false);
                        Truck.setDoorOpen(5, false, false);
                        mp.game.wait(500);
                        mp.events.callRemote('server:character.animation', 'anim@heists@narcotics@trash', 'throw_ranged_a_bin_bag', 49);
                        mp.game.wait(750);
                        mp.events.callRemote('server:character.attachment', false);
                        mp.game.wait(850);
                        Truck.setDoorShut(5, false);
                        mp.events.remove('playerEnterColshape', BehindGarbageTruck);
                    }
                }
            }
        }
        ;
    }
});
function ClosestGarbage() {
    const Position = Player.position;
    return new Promise((resolve) => {
        for (const Garbage of GarbageObjects) {
            const object = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 1.8, mp.game.joaat(Garbage), false, true, true);
            if (object) {
                resolve({ Object: Garbage, Position: Position });
                break;
            }
        }
    });
}
;
function AlreadyPicked() {
    if (Visited.length > 0) {
        for (const Position of Visited) {
            const Distance = mp.game.gameplay.getDistanceBetweenCoords(Player.position.x, Player.position.y, Player.position.z, Position.x, Position.y, Position.z, true);
            if (Distance < 3.5) {
                return true;
            }
        }
    }
}
;
function LittleMarker(Position) {
    const Marker = mp.markers.new(0, new mp.Vector3(Position.x, Position.y, Position.z - 0.35), 0.4, { rotation: new mp.Vector3(0, 0, 0), color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
    const Colshape = mp.colshapes.newSphere(Position.x, Position.y, Position.z, 0.75, Player.dimension);
    return [Colshape, Marker];
}
;
mp.events.addProc('client:job.garbage.trash:get', () => {
    return Visited.length;
});


/***/ }),

/***/ 7364:
/***/ (() => {

"use strict";

mp.events.add({
    'playerEnterVehicle': (Vehicle, Seat) => {
        if (Vehicle.getVariable('Job') == 7) {
            if (Seat == -1)
                return;
            const DriverHandle = Vehicle.getPedInSeat(-1);
            if (DriverHandle) {
                const Driver = mp.players.atHandle(DriverHandle);
                mp.gui.chat.push(JSON.stringify(Driver === null || Driver === void 0 ? void 0 : Driver.id));
            }
        }
    },
    'playerLeaveVehicle': (Vehicle, Seat) => {
        if (Seat == -1)
            return;
    }
});


/***/ }),

/***/ 9749:
/***/ (() => {

"use strict";

// const Player = mp.players.local;
// let Route: any = []
// let Current: boolean = false;
// let Max: number = 0
// let Distance: number = 0;
// let Browser = null
// let Finishing = false
// let Wrong = false;
// let cancel = null;
// let garage = new mp.Vector3(447.428, -591.51739, 28.0754);
// class Station { 
//    ID: number;
//    Name: string;
//    Position: Vector3Mp;
//    Checkpoint: CheckpointMp;
//    Blip: BlipMp;
//    constructor (Id: number, Name: string, Pos: Vector3Mp) { 
//       this.ID = Id;
//       this.Name = Name;
//       this.Position = new mp.Vector3(Pos.x, Pos.y, Pos.z - 1.07);
//       this.Checkpoint = mp.checkpoints.new(47, this.Position, 5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
//       this.Checkpoint.Station = this.ID;
//       let number = this.ID + 1;
//       this.Blip = mp.blips.new(1, new mp.Vector3(this.Position.x, this.Position.y, 0), { name: number + '. ' + this.Name, color: 5, shortRange: false, alpha: 0 });
//       Route.push(this)
//    }
//    delete () { 
//       this.Checkpoint.destroy();
//       this.Blip.destroy();
//       let i = Route.indexOf(this);
//       Route.splice(i, 1)
//    }
//    visible () { 
//       this.Checkpoint.setAlpha(255);
//       this.Blip.setAlpha(255);
//    }
// }
// mp.events.add({
//    'client:player.transit.start': (checkpoints) => { 
//       let stations = {};
//       for (let i in checkpoints) { 
//          let station = checkpoints[i];
//          new Station(parseInt(i), station.name, station.position);
//          stations[i] = { name: station.name, active: true, wrong: false };
//       }
//       max = route.length - 1;
//       current = 0;
//       route[current].visible();
//       browser = mp.browsers.new('package://jobs/jobs-interfaces/transit.html');
//       browser.execute('transit.toggle = true, transit.stations = ' + JSON.stringify(stations) + ';');
//    },
//    'playerEnterCheckpoint': (checkpoint) => {
//       if (player.Job == 3 && route.length > 0) { 
//          mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 1')
//          let vehicle = player.vehicle;
//          if (vehicle && vehicle.getClass() == 17 && checkpoint.station >= 0) { 
//             player.stopped = true;
//             setTimeout(() => { 
//                player.stopped = false; 
//                checkpoint.station == max && current == max ? ( Finish(checkpoint.station, true) ) : ( Next(checkpoint.station) );
//             }, 10000)
//             mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 2, Station ' + checkpoint.station)
//          }
//       }
//       if (finishing && checkpoint.finish) { 
//          checkpoint.finish.destroy();
//          checkpoint.destroy();
//          mp.events.callRemote('server:player.transit.stop', true, max, distance);
//          distance = 0, route = [], max = 0;
//       }
//    },
//    'playerExitCheckpoint': (checkpoint) => {
//       if (player.Job == 3 && player.vehicle && player.vehicle.getClass() == 17 && checkpoint.station >= 0) { 
//          if (player.stopped) { 
//             wrong = true;
//             player.stopped = false;
//          }
//       }
//    }
// })
//    // 'playerLeaveVehicle': (vehicle, seat) => {
//    //    if (player.Job == 3 && checkpoint.station) { 
//    //       if (browser && station >= 0 && station != false && mp.browsers.at(browser.id)) { 
//    //          browser.execute('transit.toggle = false'); 
//    //          cancel = setTimeout(() => { end(false); }, (5 * 60) * 1000)
//    //       }
//    //    }
//    // },
//    // 'playerEnterVehicle': (vehicle, seat) => {
//    //    if (player.Job == 3 && checkpoint.station) { 
//    //       if (vehicle.getClass() == 17) { 
//    //          browser.execute('transit.toggle = true'); 
//    //          clearTimeout(cancel)
//    //       }
//    //    }
//    // }
// function Next (i) { 
//    if (i == current) { 
//       let station = route.find( ({ id }) => id === i );
//       current ++;
//       let next = route.find( ({ id }) => id === current );
//       next.visible();
//       Distance(station.position, next.position).then((dist) => { 
//          station.delete();
//          distance += dist;
//          mp.gui.chat.push('[DEBUG] Next Station ' + current + ', Distance now ' + distance);
//          if (wrong) { 
//             browser.execute(`transit.wrong(${i})`)
//          } else { 
//             browser.execute(`transit.disable(${i})`)
//          }
//          wrong = false;
//       })
//    } else { 
//       mp.gui.chat.push('[DEBUG] Wrong Station')
//    }
// }
// async function Distance (station, next) {
//    return new mp.Vector3(station.x, station.y, station.z).subtract(new mp.Vector3(next.x, next.y, next.z)).length();
// }
// function Finish (i) { 
//    let station = route.find( ({ id }) => id === i );
//    station.delete();
//    if (mp.browsers.at(browser.id)) browser.destroy();
//    let checkpoint = mp.checkpoints.new(47, garage, 5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
//    let blip = mp.blips.new(1, new mp.Vector3(garage.x, garage.y, 0), { name: 'Los Santos Transit Garaža', color: 5, shortRange: false });
//    checkpoint.finish = blip;
//    finishing = true;
// }


/***/ }),

/***/ 551:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lobby = void 0;
const Browser_1 = __webpack_require__(2910);
const Player = mp.players.local;
mp.events.add({
    'playerReady': async () => {
        const Info = await mp.events.callRemoteProc('SERVER::PLAYER:LOBY');
        Lobby(true, Info.Position, Info.LookAt);
    },
    'CLIENT::AUTHORIZATION:PLAY': (Character) => {
        Lobby(false);
        mp.events.callRemote('SERVER::CHARACTER:PLAY', Character);
        Browser_1.Browser.call('BROWSER::SHOW', 'Chat');
    }
});
mp.events.addProc({
    'CLIENT:AUTHORIZATION:SEND_CREDENTIALS': async (Username, Password) => {
        const Response = await mp.events.callRemoteProc('SERVER::AUTHORIZATION:VERIFY', Username, Password);
        return JSON.stringify(Response);
    }
});
let Camera;
function Lobby(Toggle, Position, LookAt) {
    if (Toggle && Position && LookAt) {
        Player.position = new mp.Vector3(Position.x, Position.y + 1, Position.z);
        Player.freezePosition(true);
        Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
        Camera.setActive(true);
        Camera.setCoord(Position.x, Position.y, Position.z);
        Camera.pointAtCoord(LookAt.x, LookAt.y, LookAt.z);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        mp.game.ui.displayRadar(false);
        mp.game.graphics.transitionToBlurred(1000);
    }
    else {
        Browser_1.Browser.call('BROWSER::HIDE', 'Authorization');
        if (Camera)
            Camera.destroy();
        Player.freezePosition(false);
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
        mp.game.ui.displayRadar(true);
        mp.game.graphics.transitionFromBlurred(1000);
    }
}
exports.Lobby = Lobby;


/***/ }),

/***/ 5161:
/***/ (() => {

"use strict";

let camdir = false;
let noclip = false;
let charpos = false;
let Spectating = false;
let SpecTarget;
let Waypoint;
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
    'playerCreateWaypoint': (Position) => {
        Waypoint = { x: Position.x, y: Position.y, z: Position.z };
    },
    'playerRemoveWaypoint': () => {
        if (Waypoint)
            Waypoint.destroy();
    },
    'client:spectate': (Target, Toggle) => {
        Player.freezePosition(Toggle);
        if (Toggle) {
            if (Target && mp.players.exists(Target)) {
                SpecTarget = Target;
                Spectating = true;
                Player.attachTo(Target.handle, -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
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
            // mp.game.graphics.drawText(`X:${pos.x}    Y:${pos.y}    Z:${pos.z}`, [0.5, 0.005],
            //    {
            //       font: 4,
            //       color: [255, 255, 255, 255],
            //       scale: [1.0, 1.0],
            //       outline: true,
            //    });
        }
        if (camdir) {
            const dir = getCameraDirection();
            // mp.game.graphics.drawText(`X:${dir.x}    Y:${dir.y}    Z:${dir.z}`, [0.5, 0.05],
            //    {
            //       font: 4,
            //       color: [255, 255, 255, 255],
            //       scale: [1.0, 1.0],
            //       outline: true,
            //    });
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


/***/ }),

/***/ 7502:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Player = mp.players.local;
const Bones = {
    'RIGHT_HAND': 6286,
    'LEFT_HAND': 36029
};
mp.events.addDataHandler({
    'Attachments': (Entity, Value) => {
        if (Entity.type === 'player')
            Attach(Entity, Value);
    }
});
mp.events.add({
    'entityStreamIn': (entity) => {
        if (entity.type === 'player') {
            if (entity.getVariable('Attachments')) {
                let attachments = entity.getVariable('Attachments');
                attachments.forEach((attachment) => {
                    Attach(entity, attachment);
                });
            }
        }
    }
});
function Attach(Entity, Attachment) {
    let boneIndex = Entity.getBoneIndex(Bones[Attachment.bone]);
    mp.gui.chat.push('Model ' + JSON.stringify(Attachment.model));
    mp.gui.chat.push('Bone ' + JSON.stringify(Attachment.bone));
    mp.gui.chat.push('Bone Index ' + JSON.stringify(boneIndex));
    mp.gui.chat.push(JSON.stringify(Attachment));
}


/***/ }),

/***/ 8767:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Utils_1 = __webpack_require__(8675);
const Player = mp.players.local;
let Active = false;
mp.events.add({
    'CLIENT::BANKING:TOGGLE': () => {
        Active = !Active;
        Browser_1.Browser.call(Active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Banking');
    },
    'CLIENT::BANKING:WITHDRAW': (Amount) => {
        mp.events.callRemote('SERVER::BANKING:WITHDRAW', Amount);
    },
    'CLIENT::BANKING:DEPOSIT': (Amount) => {
        mp.events.callRemote('SERVER::BANKING:DEPOSIT', Amount);
    },
    'CLIENT::BANKING:TRANSFER': (Target, Amount) => {
        mp.events.callRemote('SERVER::BANKING:TRANSFER', Target, Amount);
    }
});
mp.keys.bind(Utils_1.Controls.KEY_Y, false, function () {
    if (Player.vehicle || Player.isTypingInTextChat || Player.getVariable('Cuffed') || !Player.getVariable('Logged') || Active)
        return;
    if (Utils_1.IsNearATM(Player.position)) {
        mp.events.call('CLIENT::BANKING:TOGGLE');
    }
});


/***/ }),

/***/ 6705:
/***/ (() => {

"use strict";

class CarryPlayer {
    constructor(remoteId, carryRemoteId) {
        this.remoteId = -1;
        this.carryRemoteId = -1;
        this.remoteId = remoteId;
        this.carryRemoteId = carryRemoteId;
    }
}
class CarryManager {
    constructor() {
        this.carryPlayers = [];
        mp.events.addDataHandler("carry", (entity, value) => {
            if (entity.type != "player")
                return false;
            mp.players.forEachInStreamRange((element) => {
                if (element != entity)
                    return false;
                if (value != undefined) {
                    var carry = this.getCarry(value);
                    if (!carry)
                        this.addCarry(entity.remoteId, value);
                }
                else {
                    var carry = this.getCarry(entity.remoteId);
                    if (carry)
                        this.removeCarry(entity.remoteId);
                }
            });
        });
        mp.events.add("entityStreamIn" /* ENTITY_STREAM_IN */, (entity) => {
            if (entity.type != "player")
                return false;
            var value = entity.getVariable("carry");
            if (value != undefined) {
                var carry = this.getCarry(value);
                if (!carry)
                    this.addCarry(entity.remoteId, value);
            }
        });
        mp.events.add("entityStreamOut" /* ENTITY_STREAM_OUT */, (entity) => {
            if (entity.type != "player")
                return false;
            var value = entity.getVariable("carry");
            if (value != undefined) {
                var carry = this.getCarry(entity.remoteId);
                if (carry)
                    this.removeCarry(entity.remoteId);
            }
        });
        setInterval(() => {
            this.carryPlayers.forEach((element) => {
                mp.players.forEachInStreamRange((target) => {
                    if (target.remoteId == element.carryRemoteId) {
                        if (mp.peds.exists(element.ped))
                            return false;
                        var player = mp.players.atRemoteId(element.remoteId);
                        var carried = mp.players.atRemoteId(element.carryRemoteId);
                        mp.events.call("client:animation:apply", player.remoteId, "missfinale_c2mcs_1", "fin_c2_mcs_1_camman", 49);
                        mp.events.call("client:animation:apply", carried.remoteId, "nm", "firemans_carry", 33);
                        carried.attachTo(player.handle, 0, 0.15, 0.27, 0.63, 0.5, 0.5, 0.0, false, false, false, false, 2, false);
                        element.ped = mp.peds.new(carried.model, player.position, 0);
                        mp.game.invoke("0xE952D6431689AD9A" /* CLONE_PED_TO_TARGET */, carried.handle, element.ped.handle);
                        element.ped.taskPlayAnim("nm", "firemans_carry", 8.0, 1.0, -1, 33, 0.0, true, true, true);
                        element.ped.attachTo(player.handle, 0, 0.25, 0.07, 0.63, 0.5, 0.5, 0.0, false, false, false, false, 2, false);
                    }
                });
            });
        }, 500);
    }
    addCarry(remoteId, carryRemoteId) {
        this.carryPlayers.push(new CarryPlayer(remoteId, carryRemoteId));
    }
    getCarry(remoteId) {
        var found = this.carryPlayers.find((element => element.remoteId == remoteId));
        if (found)
            return found;
        else
            return undefined;
    }
    removeCarry(remoteId) {
        var found = this.carryPlayers.find(element => element.remoteId == remoteId);
        if (found) {
            if (mp.peds.exists(found.ped))
                found.ped.destroy();
            var carry = mp.players.atRemoteId(found.carryRemoteId);
            if (carry)
                carry.detach(true, false);
        }
        var findIndex = this.carryPlayers.findIndex(element => element.remoteId == remoteId);
        if (findIndex != -1)
            this.carryPlayers.splice(findIndex, 1);
    }
}
var Carry = new CarryManager();


/***/ }),

/***/ 1148:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Utils_1 = __webpack_require__(8675);
const Player = mp.players.local;
mp.nametags.enabled = false;
const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);
let AntiKeySpam = false;
// BLACK SCREEN AFTER DEATH
mp.game.gameplay.setFadeOutAfterDeath(false);
// DONT REMOVE WEAPON WHEN OUT OF AMMO
mp.game.weapon.unequipEmptyWeapons = false;
Player.setCanSwitchWeapon(false);
mp.events.addDataHandler({
    'logged': (Entity, NewValue, OldValue) => {
        if (Entity && Entity.remoteId === Player.remoteId) {
            Player.Logged = NewValue;
        }
    },
    'spawned': (Entity, NewValue, OldValue) => {
        if (Entity && Entity.remoteId === Player.remoteId) {
            Player.Spawned = NewValue;
        }
    },
    'Money': (Entity, NewValue, OldValue) => {
        if (Entity && Entity.remoteId === Player.remoteId) {
            Player.Money = NewValue;
        }
    },
    'Job': (Entity, NewValue, OldValue) => {
        if (Entity && Entity.remoteId === Player.remoteId) {
            Player.Job = NewValue;
        }
    },
    'Wounded': (Entity, NewValue, OldValue) => {
        if (Entity.type == 'player') {
            Entity.Wounded = NewValue;
        }
    },
    'Seatbelt': (Entity, NewValue, OldValue) => {
        if (Entity && Entity.remoteId === Player.remoteId) {
            Player.Seatbelt = NewValue;
        }
    },
    'Ragdoll': (Entity, NewValue, OldValue) => {
        if (Entity.type == 'player' && NewValue != OldValue) {
            Interactions.Ragdoll(Entity, NewValue);
        }
    },
    'Bubble': (Entity, NewValue, OldValue) => {
        if (Entity.type == 'player' && NewValue != OldValue) {
            Player.Bubble = NewValue;
        }
    },
    'Walking_Style': (Entity, NewValue, OldValue) => {
        if (Entity.type == 'player') {
            Interactions.WalkingStyle(Entity, NewValue);
        }
    },
    'Mood': (Entity, NewValue, OldValue) => {
        if (Entity.type == 'player') {
            Interactions.FacialMood(Entity, NewValue);
        }
    },
    'Attachment': (Entity, NewValue, OldValue) => {
        if (NewValue !== OldValue) {
            if (NewValue) {
                Attachments.Add(Entity, NewValue);
            }
            else {
                Attachments.Remove(Entity);
            }
        }
    }
});
mp.events.add({
    'entityStreamIn': (Entity) => {
        if (Entity.Attachment) {
            Attachments.StreamIn(Entity, Entity.getVariable('Attachment'));
        }
        if (Entity.type == 'player' && Entity.hasVariable('Walking_Style'))
            Interactions.WalkingStyle(Entity, Entity.getVariable('Walking_Style'));
        if (Entity.type == 'player' && Entity.hasVariable('Ragdoll'))
            Interactions.Ragdoll(Entity, Entity.getVariable('Ragdoll'));
        if (Entity.type == 'player' && Entity.hasVariable('Wounded'))
            Interactions.Ragdoll(Entity, Entity.getVariable('Wounded'));
    },
    'render': () => {
        if (Player.Logged && Player.Spawned) {
            mp.players.forEach((Target) => {
                const TargetPosition = Target.position;
                const PlayerPosition = Player.position;
                const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(TargetPosition.x, TargetPosition.y, TargetPosition.z)).length();
                if (Distance < 8 && Player.id != Target.id && Player.hasClearLosTo(Target.handle, 17)) {
                    if (Target.getAlpha() != 0) {
                        const Index = Target.getBoneIndex(12844);
                        const NameTag = Target.getWorldPositionOfBone(Index);
                        const Position = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.4);
                        if (Position) {
                            let x = Position.x;
                            let y = Position.y;
                            let scale = (Distance / 25);
                            if (scale < 0.6)
                                scale = 0.6;
                            y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');
                            if (Target.hasVariable('Bubble') && Target.getVariable('Bubble')) {
                                const BubblePosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.6);
                                if (BubblePosition) {
                                    const Bubble = Target.getVariable('Bubble');
                                    // mp.game.graphics.drawText('* ' + Target.name + ' ' + Bubble.Content + '.', [BubblePosition.x, BubblePosition.y], {
                                    //    font: 4,
                                    //    color: Bubble.Color,
                                    //    scale: [0.325, 0.325],
                                    //    outline: false
                                    // });
                                }
                            }
                            if (Target.hasVariable('Wounded') && Target.getVariable('Wounded')) {
                                const WoundedPosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.75);
                                if (WoundedPosition) {
                                    const Wound = Target.getVariable('Wounded');
                                    // mp.game.graphics.drawText('(( ' + Wound.Text + ' ))', [WoundedPosition.x, WoundedPosition.y], {
                                    //    font: 4,
                                    //    color: Wound.Color,
                                    //    scale: [0.315, 0.315],
                                    //    outline: false
                                    // });
                                }
                            }
                            const Content = Target.name + ' [' + Target.remoteId + ']';
                            // mp.game.graphics.drawText(Content, [x, y], {
                            //    font: 4,
                            //    color: [255, 255, 255, 255],
                            //    scale: [0.325, 0.325],
                            //    outline: false
                            // });
                        }
                    }
                }
            });
        }
    },
    'entityModelChange': (Entity, OldModel) => {
    },
    'entityStreamOut': (Entity) => {
        if (Entity.Attachment) {
            Attachments.StreamOut(Entity);
        }
    },
    'client:player:freeze': (Toggle) => {
        Player.freezePosition(Toggle);
    },
    'client:player:rotate': (Value) => {
        Player.setHeading(Value);
    },
    'client:request:ipl': (Ipl) => {
        mp.game.streaming.requestIpl(Ipl);
    }
});
// INTERACTIONS :: REMOVE ATTACHMENT
mp.keys.bind(Utils_1.Controls.KEY_X, false, async function () {
    if (Player.Logged && Player.Spawned) {
        if (Player.isTypingInTextChat)
            return;
        if (Player.getVariable('Attachment') != null) {
            const response = await mp.events.callRemoteProc('server:character.attachment:remove');
            Player.Attachment = response;
        }
    }
});
// INTERACTIONS :: LOCK
mp.keys.bind(Utils_1.Controls.KEY_L, false, async function () {
    if (Player.Logged && Player.Spawned && Player.isTypingInTextChat == false) {
        if (AntiKeySpam)
            return;
        mp.events.callRemote('server:interactions:lock');
        AntiKeySpam = true;
        setTimeout(() => { AntiKeySpam = false; }, 4000);
    }
});
mp.keys.bind(Utils_1.Controls.KEY_Y, false, () => {
    let Vehicle; // PITATI ZAŠTO NE MOŽE VehicleMp 
    if (!Player.Logged || !Player.Spawned || Player.isTypingInTextChat || Player.Cuffed)
        return;
    if (AntiKeySpam)
        return;
    if (Player.vehicle) {
        mp.events.callRemote('server:vehicle:windows', Player.vehicle);
        AntiKeySpam = true;
        setTimeout(() => { AntiKeySpam = false; }, 2000);
    }
    else {
        mp.vehicles.forEachInRange(Player.position, 4.5, (NearbyVehicle) => {
            Vehicle = NearbyVehicle;
        });
        if (Vehicle.doesExist()) {
            const Bones = { 'boot': -1.35, 'bonnet': 2.0 };
            const Position = Player.position;
            for (const Bone in Bones) {
                const Offset = Bones[Bone];
                const { x, y, z } = Vehicle.getWorldPositionOfBone(Vehicle.getBoneIndexByName(Bone));
                const Distance = mp.game.gameplay.getDistanceBetweenCoords(Position.x, Position.y, Position.z, x, y + Offset, z, true);
                if (Distance < 1.35) {
                    mp.events.callRemote('server:vehicle:interaction', Vehicle, Bone);
                    AntiKeySpam = true;
                    setTimeout(() => { AntiKeySpam = false; }, 2000);
                }
            }
        }
    }
});
mp.events.addProc({
    'client:player.vehicle:class': () => {
        return Player.vehicle ? Player.vehicle.getClass() : null;
    }
});
const Attachments = {
    StreamIn: function (Entity, Attachment) {
        if (Attachment) {
            Attachments.Add(Entity, Attachment);
        }
    },
    StreamOut: function (Entity) {
        Attachments.Remove(Entity);
    },
    Add: function (Entity, Value) {
        Entity.Attachment = mp.objects.new(mp.game.joaat(Value.Model), Entity.position, {
            rotation: new mp.Vector3(0, 0, Entity.heading),
            alpha: 255,
            dimension: Entity.dimension
        });
        Utils_1.WaitEntity(Entity.Attachment).then(() => {
            const Bone = Entity.getBoneIndex(Value.Bone);
            Entity.Attachment.attachTo(Entity.handle, Bone, Value.Offset.X, Value.Offset.Y, Value.Offset.Z, Value.Offset.rX, Value.Offset.rY, Value.Offset.rZ, true, true, false, false, 0, Value.Rotation || false);
        });
    },
    Remove: function (Entity) {
        let Object = Entity.Attachment;
        if (Object && mp.objects.exists(Object)) {
            Object.destroy();
        }
    }
};
const Interactions = {
    WalkingStyle: async function (Entity, Style) {
        if (Style == null) {
            Entity.resetMovementClipset(0.0);
        }
        else {
            Utils_1.LoadMovementClipset(Style).then(() => {
                Entity.setMovementClipset(Style, 1.0);
            });
        }
    },
    Ragdoll: function (Entity, Value) {
        if (Value) {
            mp.gui.chat.push(JSON.stringify(Value));
            Entity.setToRagdoll(Value.Time || 5000, Value.Time || 5000, 0, true, true, true);
        }
    },
    FacialMood: function (Entity, Mood) {
        Mood == 'normal' ? Entity.clearFacialIdleAnimOverride() : mp.game.invoke('0xFFC24B988B938B38', Entity.handle, Mood, 0);
    }
};


/***/ }),

/***/ 9808:
/***/ (() => {

"use strict";

const Player = mp.players.local;
let SendToServer = true;
mp.events.add({
    'outgoingDamage': (SourceEntity, TargetEntity, SourcePlayer, Weapon, BoneIndex, Damage) => {
        // if (targetEntity.type === 'player') {
        //    if (targetEntity.getHealth() - damage < damage) { 
        //       mp.events.callRemoteProc('server:character.wounded', mp.players.at(targetEntity.id)).then((Response) => { 
        //          mp.gui.chat.push(JSON.stringify(Response));
        //          return true;
        //       });
        //    }
        // }
    },
    'incomingDamage': (SourceEntity, TargetEntity, SourcePlayer, Weapon, BoneIndex, Damage) => {
        if (TargetEntity.id == Player.id) {
            if (Player.getVariable('Wounded')) {
                mp.gui.chat.push('wounded');
            }
            else {
                let Injury = { Weapon: Weapon, Bone: BoneIndex };
                PlayerDamage.Effect(BoneIndex);
                mp.gui.chat.push('Nije wounded');
                if (SendToServer) {
                    mp.events.callRemote('server:character.injuries:add', JSON.stringify(Injury));
                    SendToServer = false;
                    setTimeout(() => { SendToServer = true; }, 1000);
                }
                //    if (Player.getHealth() - damage < damage) {
                //       mp.gui.chat.push('Zadnji hitac')
                //       return true;
                //    }
            }
        }
    }
});
class PlayerDamage {
    static Check() {
        if (Player.Logged && Player.Spawned) {
            const Injuries = Player.getVariable('Injuries');
            if (Injuries.length > 0 && Player.getSpeed() > 5) {
                if (Injuries.find(Element => Element.Bone == 4 || Element.Bone == 2)) {
                    if (SendToServer)
                        mp.events.callRemote('server:character.wounded:fall');
                }
            }
        }
        setTimeout(() => { PlayerDamage.Check(); }, 1000);
    }
    static Effect(Bone) {
        switch (Bone) {
            case 20: {
                mp.game.graphics.startScreenEffect('DefaultFlash', 1500, false);
                break;
            }
            default: {
            }
        }
    }
}
//Damage.Check();


/***/ }),

/***/ 521:
/***/ (() => {

"use strict";

let Active = false;
mp.events.add({
    'CLIENT::HELP:SHOW': (Text) => {
        Active = !Active;
    }
});


/***/ }),

/***/ 7188:
/***/ (() => {

"use strict";

// import { LoadAnimationDictionary } from "../../Utils";
// const player = mp.players.local;
// mp.events.add({
// 	'entityStreamIn': (Entity: EntityMp) => {
// 		if (Entity.type == 'player') {
// 			if (Entity.hasVariable("animData")) {
// 				const value = Entity.getVariable("animData");
// 				if (null != value) {
// 					const anim = value.split("%");
// 					LoadAnimationDictionary(anim[0]).then(() => {
// 						mp.players.exists(<PlayerMp>Entity) && 0 !== Entity.handle && (<PlayerMp>Entity).taskPlayAnim(anim[0], anim[1], 1, 0, -1, parseInt(anim[2]), 1, !1, !1, !1)
// 					})
// 				}
// 			}
// 		}
// 	},
// });
// mp.events.addDataHandler("animData", function (Entity: EntityMp, Value: any) {
// 	if (0 !== Entity.handle)
// 		if (null != Value) {
// 			const c = Value.split("%");
// 			LoadAnimationDictionary(c[0]).then(() => {
// 				mp.players.exists(<PlayerMp>Entity) && 0 !== (<PlayerMp>Entity).handle && ((<PlayerMp>Entity).clearTasksImmediately(), (<PlayerMp>Entity).taskPlayAnim(c[0], c[1], 1, 0, -1, parseInt(c[2]), 1, !1, !1, !1))
// 			})
// 		} //else a.clearTasksImmediately()
// });
// mp.keys.bind(0x20, true, function () {
// 	if (player.Logged && player.Spawned) {
// 		if (Player.hasVariable("animData")) {
// 			const value = Player.getVariable("animData");
// 			if (null != value) {
// 				const anim = value.split("%");
// 				let playing = player.isPlayingAnim(anim[0], anim[1]);
// 				if (playing) {
// 					player.stopAnimTask(anim[0], anim[1], 3.0);
// 				}
// 			}
// 		}
// 	}
// });


/***/ }),

/***/ 889:
/***/ (() => {

"use strict";

// const movementClipSet = 'move_ped_crouched';
// const strafeClipSet = 'move_ped_crouched_strafing';
// const clipSetSwitchTime = 0.25;
// const Player = mp.players.local;
// function LoadClipSet (SetName: string) {
//     mp.game.streaming.requestClipSet(SetName);
//     while (!mp.game.streaming.hasClipSetLoaded(SetName)) mp.game.waitAsync(1);
// };
// LoadClipSet(movementClipSet);
// LoadClipSet(strafeClipSet);
// mp.events.addDataHandler('crouching', (Entity: PlayerMp, Value: number) => {
//     if (Entity.type === 'player') {
//         if (Value) {
//             Entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
//             Entity.setStrafeClipset(strafeClipSet);
//         } else {
//             Entity.resetMovementClipset(clipSetSwitchTime);
//             Entity.resetStrafeClipset();
//         }
//     }
// });
// mp.events.add('entityStreamIn', (Entity: EntityMp) => {
//     if (Entity.type === 'player' && (<PlayerMp>Entity).Crouching) {
//         (<PlayerMp>Entity).setMovementClipset(movementClipSet, clipSetSwitchTime);
//         (<PlayerMp>Entity).setStrafeClipset(strafeClipSet);
//     }
// });
// mp.keys.bind(0x12, false, () => {
//     if (Player.Logged && Player.Spawned) { 
//         mp.events.callRemote('server:player.crouch');
//     }
// });


/***/ }),

/***/ 4505:
/***/ (() => {

"use strict";

// const Player = mp.players.local;
// //Fingerpointing
// let pointing: any = {
//     active: false,
//     interval: null,
//     lastSent: 0,
//     start: function () {
//         if (!this.active) {
//             if (Player.Cuffed) return;
//             this.active = true;
//             mp.game.streaming.requestAnimDict("anim@mp_point");
//             while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
//                 mp.game.wait(0);
//             }
//             mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 0, 1, 1, 1);
//             mp.players.local.setConfigFlag(36, true)
//             mp.players.local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
//             mp.game.streaming.removeAnimDict("anim@mp_point");
//             this.interval = setInterval(this.process.bind(this), 0);
//         }
//     },
//     stop: function () {
//         if (this.active) {
//             clearInterval(this.interval);
//             this.interval = null;
//             this.active = false;
//             mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop");
//             if (!mp.players.local.isInjured()) {
//                 mp.players.local.clearSecondaryTask();
//             }
//             if (!mp.players.local.isInAnyVehicle(true)) {
//                 mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 1, 1, 1, 1);
//             }
//             mp.players.local.setConfigFlag(36, false);
//             mp.players.local.clearSecondaryTask();
//             setTimeout(() => {
//                 mp.events.callRemote('server:player.finger.pointing.stop');
//             }, 2000);
//         }
//     },
//     gameplayCam: mp.cameras.new("gameplay"),
//     lastSync: 0,
//     getRelativePitch: function () {
//         let camRot = this.gameplayCam.getRot(2);
//         return camRot.x - mp.players.local.getPitch();
//     },
//     process: function () {
//         if (this.active) {
//             mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle);
//             let camPitch = this.getRelativePitch();
//             if (camPitch < -70.0) {
//                 camPitch = -70.0;
//             } else if (camPitch > 42.0) {
//                 camPitch = 42.0;
//             }
//             camPitch = (camPitch + 70.0) / 112.0;
//             let camHeading = mp.game.cam.getGameplayCamRelativeHeading();
//             let cosCamHeading = mp.game.system.cos(camHeading);
//             let sinCamHeading = mp.game.system.sin(camHeading);
//             if (camHeading < -180.0) {
//                 camHeading = -180.0;
//             } else if (camHeading > 180.0) {
//                 camHeading = 180.0;
//             }
//             camHeading = (camHeading + 180.0) / 360.0;
//             let coords = mp.players.local.getOffsetFromGivenWorldCoords((cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);
//             let BlockedVector: Vector3Mp = new mp.Vector3(coords.x, coords.y, coords.z - 0.2);
//             let BlockedVector2: Vector3Mp = new mp.Vector3(coords.x, coords.y, coords.z + 0.2);
//             let blocked = (typeof mp.raycasting.testPointToPoint(BlockedVector, BlockedVector2, mp.players.local.handle, 7) !== 'undefined');
//             mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Pitch", camPitch)
//             mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Heading", camHeading * -1.0 + 1.0)
//             mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isBlocked", blocked)
//             mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isFirstPerson", mp.game.invoke('0xee778f8c7e1142e2', mp.game.invoke('0x19cafa3c87f7c2ff')) == 4)
//             if ((Date.now() - this.lastSent) > 100) {
//                 this.lastSent = Date.now();
//                 mp.events.callRemote('server:player.finger.pointing.update', camPitch, camHeading);
//             }
//         }
//     }
// }
// mp.events.add("client:finger.pointing.update", (Id: number, CamPitch: number, CamHeading: number) => {
//     let netPlayer = getPlayerByRemoteId(Id);
//     if (netPlayer != null) {
//         if (netPlayer != mp.players.local && mp.players.exists(netPlayer)) {
//             netPlayer.LastReceivedPointing = Date.now();
//             if (!netPlayer.PointingInterval) {
//                 netPlayer.PointingInterval = setInterval((function () {
//                     if ((Date.now() - netPlayer?.LastReceivedPointing) > 1000) {
//                         clearInterval(netPlayer?.PointingInterval);
//                         if (!netPlayer) return;
//                         netPlayer.LastReceivedPointing = null;
//                         netPlayer.PointingInterval = null;
//                         mp.game.invoke("0xd01015c7316ae176", netPlayer.handle, "Stop");
//                         if (!netPlayer.isInAnyVehicle(true)) {
//                             mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 1, 1, 1, 1);
//                         }
//                         netPlayer.setConfigFlag(36, false);
//                     }
//                 }).bind(netPlayer), 500);
//                 mp.game.streaming.requestAnimDict("anim@mp_point");
//                 while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
//                     mp.game.wait(0);
//                 }
//                 mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 0, 1, 1, 1);
//                 netPlayer.setConfigFlag(36, true)
//                 netPlayer.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
//                 mp.game.streaming.removeAnimDict("anim@mp_point");
//             }
//             mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Pitch", CamPitch)
//             mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Heading", CamHeading * -1.0 + 1.0)
//             mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isBlocked", 0);
//             mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isFirstPerson", 0);
//         }
//     }
// });
// mp.keys.bind(0x42, true, () => {
//     if (mp.gui.cursor.visible || Player.isTypingInTextChat || mp.players.local.vehicle) return;
//     pointing.start();
// });
// mp.keys.bind(0x42, false, () => {
//     pointing.stop();
// });
// function getPlayerByRemoteId(RemoteID: number) {
//     let pla = mp.players.atRemoteId(RemoteID);
//     if (pla == undefined || pla == null) {
//         return null;
//     }
//     return pla;
// }


/***/ }),

/***/ 6106:
/***/ (() => {

"use strict";

// const Player = mp.players.local;
// let Browser = null, Opened = false;
// const Controls = { 
//    keyP: 0x50
// };
// mp.events.add({
//    'client:players:online': () => {
//       Opened = !Opened;
//       if (Opened) { 
//          Browser = mp.browsers.new('package://player/game-interface/onlines.html');
//          let List = utils.OnlinePlayers();
//          Browser.execute('onlines.players = ' + JSON.stringify(List));
//          Player.BrowserControls(true, true);
//       } else { 
//          if (Browser) Browser.destroy();
//          Player.BrowserControls(false, false);
//       }
//    }
// })
// mp.keys.bind(Controls.keyP, false, function() {
//    if (Player.logged && Player.spawned) {    
//       if (Player.isTypingInTextChat) return;
//       mp.events.call('client:players:online');
//    }
// });


/***/ }),

/***/ 5168:
/***/ (() => {

"use strict";

const Player = mp.players.local;
var PhoneContactActions;
(function (PhoneContactActions) {
    PhoneContactActions[PhoneContactActions["Add"] = 0] = "Add";
    PhoneContactActions[PhoneContactActions["Remove"] = 1] = "Remove";
    PhoneContactActions[PhoneContactActions["Update"] = 2] = "Update";
})(PhoneContactActions || (PhoneContactActions = {}));
mp.events.add({
    'CLIENT::PLAYER:PHONE': (Phone) => {
    },
    'CLIENT::PLAYER:PHONE:CONTACTS': (Action, Info) => {
        Info = JSON.parse(Info);
        switch (Action) {
            case PhoneContactActions.Add: {
                mp.events.callRemote('server:player.phone.contacts.add', Info.Name, Info.Number);
                break;
            }
            case PhoneContactActions.Remove: {
                mp.events.callRemote('server:player.phone.contacts.remove', Info.Id);
                break;
            }
        }
    }
});


/***/ }),

/***/ 8354:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Utils_1 = __webpack_require__(8675);
const Player = mp.players.local, CuffsModel = 'p_cs_cuffs_02_s';
mp.events.addDataHandler({
    'Cuffed': (Entity, NewValue, OldValue) => {
        if (Entity.type === 'player') {
            if (NewValue !== OldValue) {
                Cuff(Entity, NewValue);
            }
        }
    }
});
mp.events.add({
    'entityStreamIn': (Entity) => {
        if (Entity.type === 'player')
            Cuff(Entity, Entity.getVariable('Cuffed'));
    },
    'render': () => {
        if (Player.Cuffed) {
            // DISABLE SPRINT, ATTACK, AIM, JUMP
            mp.game.controls.disableControlAction(0, 24, true);
            mp.game.controls.disableControlAction(0, 25, true);
            mp.game.controls.disableControlAction(0, 21, true);
            mp.game.controls.disableControlAction(0, 55, true);
        }
    },
    'client:player:cuff': (Entity, Toggle) => {
        Cuff(Entity, Toggle);
    }
});
function Cuff(Entity, Toggle) {
    if (Toggle && Entity) {
        Entity.setEnableHandcuffs(true);
        Entity.Cuffed = true;
        Entity.Cuffs = mp.objects.new(mp.game.joaat(CuffsModel), Entity.position, {
            rotation: new mp.Vector3(0, 0, 0),
            alpha: 255,
            dimension: Entity.dimension
        });
        Entity.Cuffs.notifyStreaming = true;
        Utils_1.WaitEntity(Entity.Cuffs).then(() => {
            let bone = mp.players.local.getBoneIndex(6286);
            Entity.Cuffs.attachTo(Entity.handle, bone, -0.02, 0.06, 0.0, 75.0, 0.0, 76.0, true, true, false, false, 0, true);
        });
    }
    else {
        Entity.setEnableHandcuffs(false);
        Entity.Cuffed = false;
        if (Entity.Cuffs) {
            if (Entity.Cuffs.doesExist()) {
                Entity.Cuffs.destroy();
            }
        }
    }
}


/***/ }),

/***/ 1141:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Browser_1 = __webpack_require__(2910);
const Utils_1 = __webpack_require__(8675);
//const { Controls } = require("../../Utils");
const Player = mp.players.local;
let nearbyPlayers = (/* unused pure expression or super */ null && ([])), Active = false;
const Keys = {
    0: 0x31, 1: 0x32, 2: 0x33, 3: 0x34, 666: 0x09
};
const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);
mp.events.add({
    'client:inventory.toggle': async () => {
        Active = !Active;
        Browser_1.Browser.call('BROWSER::INVENTORY');
    },
    'client:inventory.item:drop': Drop,
    'client:inventory.item.weapon:put': Put,
    'client:inventory.item:use': Use,
    'client:inventory.item:give': Give,
    'client:inventory.item:unequip': Unequip,
    'client:inventory.process.clothing': (index) => {
        mp.events.callRemote('server:item.clothing', index);
    },
    'client:inventory.weapon.select': (key, id) => {
        mp.events.callRemote('server:weapon.select', key, id);
    },
    'client:inventory.vehicle:trunk': (id, Items) => {
        // if (browser) { 
        //    browser.execute('inventory.vehicle.id = ' + id);
        //    browser.execute('inventory.vehicle.items = ' + JSON.stringify(Items));
        // }
    },
    'client:inventory.item.trunk:get': async (vehicle, item) => {
        const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item.trunk:get', vehicle, item);
        // if (Inventory && Trunk) { 
        //    browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
        //    browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
        // }
    },
    'client:inventory.item:trunk': async (vehicle, item) => {
        const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item:trunk', vehicle, item);
        if (Inventory && Trunk) {
            // if (browser) { 
            //    browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
            //    browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
            // }
        }
    },
    'client:inventory.player:nearby': () => {
        let Nearby = [];
        mp.players.forEachInRange(Player.position, 4, (target) => {
            if (target.dimension === Player.dimension && target.remoteId != Player.remoteId) {
                Nearby.push({ id: target.remoteId, name: target.name });
            }
        });
        Browser_1.Browser.call('BROWSER::NEARBY:PLAYERS'); //browser.execute('inventory.nearbyPlayers = ' + JSON.stringify(Nearby));
    },
    'render': () => {
        if (Player.Logged && Player.Spawned) {
            mp.objects.forEach((Object) => {
                if (Player.hasClearLosTo(Object.handle, 17)) {
                    const PlayerPosition = Player.position;
                    const ObjectPosition = Object.position;
                    if (Object.getVariable('Item')) {
                        const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z)).length();
                        const position = mp.game.graphics.world3dToScreen2d(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z + 0.15);
                        if (position) {
                            let x = position.x;
                            let y = position.y;
                            if (Distance <= 2.5) {
                                let scale = (Distance / 25);
                                if (scale < 0.6)
                                    scale = 0.6;
                                y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');
                                const Item = Object.getVariable('Item');
                                mp.game.graphics.drawText(Item, [x, y], {
                                    font: 4,
                                    color: [255, 255, 255, 255],
                                    scale: [0.325, 0.325],
                                    outline: false
                                });
                            }
                        }
                    }
                }
            });
        }
    }
});
mp.keys.bind(Utils_1.Controls.KEY_I, false, function () {
    if (Player.Logged && Player.Logged) {
        if (Player.isTypingInTextChat || Player.getVariable('CUFFED'))
            return;
        mp.events.call('client:inventory.toggle');
    }
});
function WeaponSelector() {
    for (let i in Keys) {
        const key = Keys[i];
        mp.keys.bind(key, false, function () {
            if (Player.Logged && Player.Spawned) {
                if (Player.Cuffed || Player.vehicle || mp.players.local.isTypingInTextChat)
                    return;
                mp.events.callRemote('server:player.inventory.item.weapon:take', i);
            }
        });
    }
}
WeaponSelector();
mp.keys.bind(Utils_1.Controls.KEY_Y, false, function () {
    if (Player.Logged && Player.Spawned) {
        if (Player.vehicle || Player.getVariable('CUFFED') || mp.players.local.isTypingInTextChat)
            return;
        mp.events.callRemote('server:player.inventory.item:pickup');
    }
});
async function Give(target, item, quantity) {
    const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:give', target, item, quantity);
    if (Inventory) {
        Browser_1.Browser.call('');
        //browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
    }
}
async function Use(item) {
    const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:use', item);
    Browser_1.Browser.call('');
    //if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}
async function Put(weapon) {
    const Inventory = await mp.events.callRemoteProc('server:player.inventory.weapon:put', weapon);
    Browser_1.Browser.call('');
    //if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}
async function Unequip(item) {
    const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:unequip', item);
    Browser_1.Browser.call('');
    //if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}
;
async function Drop(item, hash, quantity = 1) {
    let { position } = Player;
    let heading = Player.getHeading();
    let rotation = Player.getRotation(2);
    let newPos = new mp.Vector3(position.x + Math.cos(((heading + 90) * Math.PI) / 180) * 0.6, position.y + Math.sin(((heading + 90) * Math.PI) / 180) * 0.6, position.z);
    let object = mp.objects.new(mp.game.joaat(hash), new mp.Vector3(newPos.x, newPos.y, newPos.z), {
        alpha: 255,
        rotation: new mp.Vector3(rotation.x, rotation.y, rotation.z),
        dimension: Player.dimension,
    });
    while (object.handle === 0) {
        await mp.game.waitAsync(0);
    }
    object.placeOnGroundProperly();
    let fixedPosition = {
        position: object.getCoords(false),
        rotation: object.getRotation(2),
    };
    object.destroy();
    const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:drop', item, JSON.stringify(fixedPosition), quantity);
    //browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
    mp.game.streaming.requestAnimDict('random@domestic');
    Player.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
}


/***/ }),

/***/ 8675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateInteractionSpot = exports.MoveCamera = exports.CursorData = exports.PlayerPreviewCamera = exports.GetAdress = exports.OnlinePlayers = exports.WeaponString = exports.WaitEntity = exports.LoadMovementClipset = exports.LoadAnimationDictionary = exports.DistanceBetweenVectors = exports.CompareVectors = exports.RemoveClothing = exports.DisableMoving = exports.Controls = exports.IsNearATM = void 0;
const Player_1 = __webpack_require__(8412);
const ATMS = [
    3424098598, 3168729781, 2930269768, 506770882
];
function IsNearATM(Position) {
    for (const ATM of ATMS) {
        const Nearby = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 1.8, ATM, false, true, true);
        if (Nearby) {
            return true;
        }
    }
}
exports.IsNearATM = IsNearATM;
;
exports.Controls = {
    KEY_X: 0x58,
    KEY_L: 0x4C,
    KEY_Y: 0x59,
    LEFT_ARROW: 0x25,
    RIGHT_ARROW: 0x27,
    ENTER: 0x0D,
    KEY_P: 0x50,
    KEY_I: 0x49,
    TAB: 0x09,
    NUMBER_1: 0x31,
    NUMBER_2: 0x32
};
function DisableMoving() {
    mp.game.controls.disableControlAction(0, 30, true);
    mp.game.controls.disableControlAction(0, 31, true);
    mp.game.controls.disableControlAction(0, 32, true);
    mp.game.controls.disableControlAction(0, 33, true);
    mp.game.controls.disableControlAction(0, 34, true);
    mp.game.controls.disableControlAction(0, 35, true);
}
exports.DisableMoving = DisableMoving;
function RemoveClothing(Entity) {
    const Gender = Player_1.Genders[Entity.model];
    switch (Gender) {
        case '0': {
            Entity.setComponentVariation(Player_1.Clothing_Components.Top, 15, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Torso, 15, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Legs, 61, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Shoes, 34, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Undershirt, 15, 0, 2);
            break;
        }
        case '1': {
            Entity.setComponentVariation(Player_1.Clothing_Components.Top, 15, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Torso, 15, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Legs, 17, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Shoes, 35, 0, 2);
            Entity.setComponentVariation(Player_1.Clothing_Components.Undershirt, 14, 0, 2);
            break;
        }
    }
}
exports.RemoveClothing = RemoveClothing;
;
function CompareVectors(i, x) {
    return i.x == x.x && i.y == x.y && i.z == x.z;
}
exports.CompareVectors = CompareVectors;
;
function DistanceBetweenVectors(First, Second) {
    return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}
exports.DistanceBetweenVectors = DistanceBetweenVectors;
function LoadAnimationDictionary(i) {
    if (mp.game.streaming.hasAnimDictLoaded(i))
        return Promise.resolve(true);
    return new Promise(async (resolve) => {
        mp.game.streaming.requestAnimDict(i);
        while (!mp.game.streaming.hasAnimDictLoaded(i)) {
            await mp.game.waitAsync(0);
        }
        resolve(true);
    });
}
exports.LoadAnimationDictionary = LoadAnimationDictionary;
;
function LoadMovementClipset(Clipset) {
    if (mp.game.streaming.hasClipSetLoaded(Clipset))
        return Promise.resolve(true);
    return new Promise(async (resolve) => {
        mp.game.streaming.requestClipSet(Clipset);
        while (!mp.game.streaming.hasClipSetLoaded(Clipset)) {
            await mp.game.waitAsync(10);
        }
        resolve(true);
    });
}
exports.LoadMovementClipset = LoadMovementClipset;
function WaitEntity(Entity) {
    return new Promise(resolve => {
        let wait = setInterval(() => {
            if (mp.game.entity.isAnEntity(Entity.handle)) {
                clearInterval(wait);
                resolve(true);
            }
        }, 1);
    });
}
exports.WaitEntity = WaitEntity;
function WeaponString(Weapon) {
    if (typeof Weapon !== 'undefined')
        return '0x' + Weapon.toString(16).toUpperCase();
    else
        return '0xA2719263';
}
exports.WeaponString = WeaponString;
function OnlinePlayers() {
    let List = [];
    mp.players.forEach(_Player => {
        List.push({ id: _Player.remoteId, name: _Player.name });
    });
    return List;
}
exports.OnlinePlayers = OnlinePlayers;
function GetAdress(Position) {
    const path = mp.game.pathfind.getStreetNameAtCoord(Position.x, Position.y, Position.z, 0, 0), Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(Position.x, Position.y, Position.z)), Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
    return { zone: Zone, street: Street };
}
exports.GetAdress = GetAdress;
let MovableCamera;
function PlayerPreviewCamera(Toggle) {
    if (Toggle) {
        const Player = mp.players.local;
        MovableCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
        const CameraPositon = new mp.Vector3(Player.position.x + Player.getForwardX() * 1.5, Player.position.y + Player.getForwardY() * 1.5, Player.position.z + 0.3);
        MovableCamera.setCoord(CameraPositon.x, CameraPositon.y, CameraPositon.z);
        MovableCamera.pointAtCoord(Player.position.x, Player.position.y, Player.position.z + 0.3);
        MovableCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        mp.events.add('render', MoveCamera);
        mp.events.add('CLIENT::PLAYER_CAMERA:ZOOM', ZoomCamera);
    }
    else {
        mp.events.remove('render', MoveCamera);
        mp.events.remove('CLIENT::PLAYER_CAMERA:ZOOM', ZoomCamera);
        if (MovableCamera)
            MovableCamera.destroy();
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
    }
}
exports.PlayerPreviewCamera = PlayerPreviewCamera;
function ZoomCamera(Delta) {
    const Player = mp.players.local;
    let { x, y, z } = MovableCamera.getCoord();
    if (Delta < 0) {
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
    MovableCamera.setCoord(x, y, z);
}
let [PrevX, PrevY] = mp.gui.cursor.position;
function CursorData() {
    const x = PrevX, y = PrevY;
    PrevX = mp.gui.cursor.position[0];
    PrevY = mp.gui.cursor.position[1];
    return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}
exports.CursorData = CursorData;
function MoveCamera() {
    const Player = mp.players.local;
    const Data = CursorData();
    if (!mp.keys.isDown(0x02))
        return;
    const newHeading = Player.getHeading() + Data.DeltaX * 0.15;
    Player.setHeading(newHeading);
    let { x: camPosX, y: camPosY, z: camPosZ } = MovableCamera.getCoord();
    //let { X: camPointX, Y: camPointY, Z: camPointZ } = MovableCamera.getDirection();
    camPosZ = camPosZ + Data.DeltaY * 0.001;
    const { x: charPosX, y: charPosY, z: charPosZ } = Player.getCoords(true);
    if (camPosZ < charPosZ + 0.7 && camPosZ > charPosZ - 0.8) {
        MovableCamera.setCoord(camPosX, camPosY, camPosZ);
        MovableCamera.pointAtCoord(charPosX, charPosY, camPosZ);
    }
}
exports.MoveCamera = MoveCamera;
function CreateInteractionSpot(Name, Position) {
    const Player = mp.players.local;
    const checkpoint = mp.checkpoints.new(48, Position, 2.5, { color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
    const blip = mp.blips.new(1, new mp.Vector3(Position.x, Position.y, 0), { name: Name, color: 1, shortRange: false });
    return { Checkpoint: checkpoint, Blip: blip };
}
exports.CreateInteractionSpot = CreateInteractionSpot;
;


/***/ }),

/***/ 5170:
/***/ (() => {

"use strict";

// const Player = mp.players.local;
// interface ALPR { 
//    Enabled: boolean | false,
//    Vehicle: VehicleMp | null
// }
// let Vehicles = { Front: 0, Back: 0 },
//    FMarker: MarkerMp,
//    BMarker: MarkerMp,
//    Enabled: boolean;
// mp.events.add({
//    'CLIENT::VEHICLE:ALPR': () => {
//       /*
//       FMarker = mp.markers.new(1, ForwardVehicle.position, 10,
//       {
//             direction: ForwardVehicle.position,
//             rotation: ForwardVehicle.position,
//             color: 0,
//             visible: true,
//             dimension: Player.dimension
//       });
//       BMarker = mp.markers.new(1, BackwardVehicle, 10,
//       {
//             direction: BackwardVehicle.position,
//             rotation: BackwardVehicle.position,
//             color: 0,
//             visible: true,
//             dimension: Player.dimension
//       });*/
//    },
//    'render': () => {
//       if (!Enabled || !Player.vehicle) return;
//       const Vehicle = Player.vehicle;
//       const ForwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, 10, 0.0),
//          BackwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, -10, 0.0);
//       /*
//       const ForwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, ForwardPosition), 
//             BackwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, BackwardPosition);*/
//       const ForwardVehicle = mp.raycasting.testCapsule(Vehicle.position, ForwardPosition, 2, Player, 2),
//          BackwardVehicle = mp.raycasting.testCapsule(Vehicle.position, BackwardPosition, 2, Player, 2);
//       // Returna: object: position (Entity Coordinates) , surfaceNormal, material (Entity Model) , entity (Handle)
//       if (ForwardVehicle && ForwardVehicle.entity.type == 'vehicle') {
//          Vehicles.Front = ForwardVehicle.entity;
//          const Speed = Math.round(Vehicles.Front.getSpeed() * 3.6);
//          mp.gui.chat.push(JSON.stringify(Speed));
//       }
//       if (BackwardVehicle && BackwardVehicle.entity.type == 'vehicle') {
//          Vehicles.Back = BackwardVehicle.entity;
//          const Speed = Math.round(Vehicles.Back.getSpeed() * 3.6);
//          mp.gui.chat.push(JSON.stringify(Speed));
//       }
//       if (FMarker != null) {
//          FMarker.position = ForwardVehicle.entity.position;
//       }
//       if (BMarker != null) {
//          BMarker.position = BackwardVehicle.entity.position
//       }
//    },
// })
// /* function GetVehicleInfrontOfEntity(entity)
//    local coords = GetOffsetFromEntityInWorldCoords(entity,0.0,1.0,0.3)
//    local coords2 = GetOffsetFromEntityInWorldCoords(entity, 0.0, ScanningDistance,0.0)
//    local rayhandle = CastRayPointToPoint(coords, coords2, 10, entity, 0)
//    local _, _, _, _, entityHit = GetRaycastResult(rayhandle)
//    if entityHit>0 and IsEntityAVehicle(entityHit) then
//       return entityHit
//    else
//       return nil
//    end
// end*/
// /*  let
//          mp.vehicles.forEachInRange(ForwardPosition, 5,
//             (vehicle) => {
//                DetectedVehicles.push(vehicle);
//                break;
//             }
//          );
//          mp.vehicles.forEachInRange(BackwardPosition, 5,
//             (vehicle) => {
//                DetectedVehicles.push(vehicle);
//                break;
//             }
//          );
// */


/***/ }),

/***/ 7705:
/***/ (() => {

"use strict";

// const Player = mp.players.local;
// const Instructor = mp.peds.new(
//    mp.game.joaat('a_m_y_bevhills_01'), 
//    new mp.Vector3(-761.8135, -1308.1590, 5.150),
//    -36,
//    0
// );
// Instructor.freezePosition(true);
// Instructor.setInvincible(true);
// let Test = {
//    Category: null,
//    Route: null,
//    Vehicle: null,
//    Progress: null,
//    Speedlimit: null,
//    Warns: null,
//    Point: null
// };
// mp.events.add({
//    'client:vehicle.department:menu' (player, department) { 
//       if (Test.Route != null) return;
//       opened = !opened;
//       if (opened) { 
//          browser = mp.browsers.new('package://vehicles/vehicles-interfaces/department.html');
//          browser.execute('department.Player = ' + JSON.stringify(player));
//          browser.execute('department.Quiz.Questions = ' + JSON.stringify(department.Quiz));
//          browser.execute('department.Licenses = ' + JSON.stringify(department.Licenses));
//          Player.BrowserControls(true, true);
//       } else { 
//          if (browser) browser.destroy();
//          Player.BrowserControls(false, false);
//       }
//    },
//    'client:vehicle.department.driving:start': (category) => { 
//       DrivingTest(category);
//    },
//    'playerEnterVehicle': (vehicle, seat) => { 
//       if (vehicle == Test.Vehicle && seat == -1) { 
//          StartRoute();
//       }
//    }
// })
// async function DrivingTest (category) { 
//    const [Vehicle, Route] = await mp.events.callRemoteProc('server:vehicle.department.driving:start', category);
//    Test.Vehicle = mp.vehicles.atRemoteId(Vehicle);
//    Test.Route = Route;
//    Test.Warns = 0;
//    Instructor.freezePosition(false);
//    mp.game.wait(5);
//    Instructor.taskEnterVehicle(Test.Vehicle.handle, 5000, 0, 1, 1, 0);
// };
// function Check () { 
//    const Time = mp.game.invoke('0x25223CA6B4D20B7F');
//    if (Time < 6 || Time > 20) { 
//       Instructor.setAlpha(0, false);
//       Instructor.setCollision(false, false);
//    } else { 
//       Instructor.setAlpha(255, false);
//       Instructor.setCollision(true, true);
//    }
//    setTimeout(() => { Check(); }, 30 * 1000);
// }
// Check();
// async function StartRoute () { 
//    const Point = Player.CreateInteractionSpot('Polaganje', new mp.Vector3(Test.Route[0].position.x, Test.Route[0].position.y, Test.Route[0].position.z));
//    Test.Point = Point;
//    mp.events.add('playerEnterCheckpoint', NextPoint);
// }
// function NextPoint (point) { 
//    if (Player.vehicle && Player.vehicle == Test.Vehicle && Test.Point.checkpoint == point) { 
//       Test.Point.checkpoint.destroy();
//       Test.Point.blip.destroy();
//       mp.game.wait(50);
//       if (Test.Progress == Test.Route.length - 1) {
//          mp.events.remove('playerEnterCheckpoint', NextPoint);
//          mp.gui.chat.push(JSON.stringify(Test.Vehicle.remoteId));
//          Test.Route = null, Test.Progress = null;
//          mp.events.add('playerLeaveVehicle', (vehicle, seat) => { 
//             if (vehicle == Test.Vehicle) { 
//                Instructor.taskGoStraightToCoord(-761.8135, -1308.1590, 5.150, 1, 5000, -36, 2);
//                mp.events.callRemote('server:vehicle.department.license:give', Test.Category, Test.Vehicle.remoteId);
//             }
//          });
//          // izbrisati vozilo
//          return;
//       };
//       Test.Progress ++;
//       const Position = new mp.Vector3(Test.Route[Test.Progress].position.x, Test.Route[Test.Progress].position.y, Test.Route[Test.Progress].position.z - 0.5);
//       const Point = Player.CreateInteractionSpot('Polaganje', Position);
//       Test.Point = Point;
//    }
// };


/***/ }),

/***/ 8652:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const Utils_1 = __webpack_require__(8675);
const Player = mp.players.local;
const blockedClasses = [13, 14, 15, 16, 21];
let DistanceNow;
let DistanceTemporary;
mp.game.controls.useDefaultVehicleEntering = true;
// AUTO HELMET
Player.setConfigFlag(35, false);
mp.events.add({
    'entityStreamIn': (Entity) => {
        if (Entity.type === 'vehicle') {
            if (Entity.hasVariable('IndicatorRight'))
                Entity.setIndicatorLights(0, Entity.getVariable('IndicatorRight'));
            if (Entity.hasVariable('IndicatorLeft'))
                Entity.setIndicatorLights(1, Entity.getVariable('IndicatorLeft'));
            if (Entity.hasVariable('Windows'))
                Windows(Entity, Entity.getVariable('Windows'));
            if (Entity.hasVariable('Fuel'))
                Entity.Fuel = Entity.getVariable('IndicatorLeft');
            if (Entity.hasVariable('Mileage'))
                Entity.Mileage = Entity.getVariable('Mileage');
            if (Entity.hasVariable('Hood'))
                Doors(Entity, VehicleDoors.Hood, Entity.getVariable('Hood'));
            if (Entity.hasVariable('Trunk'))
                Doors(Entity, VehicleDoors.Trunk, Entity.getVariable('Trunk'));
            if (Entity.hasVariable('Back'))
                Doors(Entity, VehicleDoors.Back, Entity.getVariable('Back'));
            if (Entity.hasVariable('Back2'))
                Doors(Entity, VehicleDoors.Back2, Entity.getVariable('Back2'));
        }
    },
    'playerEnterVehicle': (Vehicle, Seat) => {
        mp.game.vehicle.defaultEngineBehaviour = false;
        Player.setConfigFlag(429, true);
        if (Vehicle.Fuel && Seat == -1) {
            DistanceNow = Date.now();
            DistanceTemporary = 0;
            mp.events.add('render', Driving);
        }
    },
    'playerLeaveVehicle': (Vehicle, Seat) => {
        if (Seat == -1) {
            mp.events.remove('render', Driving);
            if (Vehicle)
                mp.events.callRemote('server:vehicle:update', Vehicle, Vehicle.Mileage, Vehicle.Fuel);
        }
    }
});
mp.events.addDataHandler({
    'IndicatorRight': (Entity, Value) => {
        var _a;
        if (Entity.type === 'vehicle')
            (_a = Entity) === null || _a === void 0 ? void 0 : _a.setIndicatorLights(0, (Value == null) ? false : Value);
    },
    'IndicatorLeft': (Entity, Value) => {
        var _a;
        if (Entity.type === 'vehicle')
            (_a = Entity) === null || _a === void 0 ? void 0 : _a.setIndicatorLights(1, (Value == null) ? false : Value);
    },
    'Windows': (Entity, Value) => {
        if (Entity.type === 'vehicle')
            Windows(Entity, Value);
    },
    'Trunk': (Entity, Value) => {
        if (Entity.type === 'vehicle')
            Doors(Entity, VehicleDoors.Trunk, Value);
    },
    'Hood': (Entity, Value) => {
        if (Entity.type === 'vehicle')
            Doors(Entity, VehicleDoors.Hood, Value);
    },
    'Back': (Entity, Value) => {
        if (Entity.type === 'vehicle')
            Doors(Entity, VehicleDoors.Back, Value);
    },
    'Back2': (Entity, Value) => {
        if (Entity.type === 'vehicle')
            Doors(Entity, VehicleDoors.Back2, Value);
    },
    'Fuel': (Entity, Value) => {
        if (Entity.type === 'vehicle')
            Entity.Fuel = Value;
    },
    'Mileage': (Entity, Value) => {
        if (Entity.type === 'vehicle')
            Entity.Mileage = Value;
    }
});
// Left Indicator
mp.keys.bind(Utils_1.Controls.LEFT_ARROW, false, () => {
    if (!Player.Logged)
        return;
    if (mp.players.local.isTypingInTextChat)
        return;
    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1)
        mp.events.callRemote('server:vehicle:indicators', 1);
});
// Right Indicator
mp.keys.bind(Utils_1.Controls.RIGHT_ARROW, false, () => {
    if (!Player.Logged)
        return;
    if (mp.players.local.isTypingInTextChat)
        return;
    let vehicle = mp.players.local.vehicle;
    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1)
        mp.events.callRemote('server:vehicle:indicators', 0);
});
function Driving() {
    if (Player.vehicle && Player.vehicle.getPedInSeat(-1) === Player.handle) {
        let vehicle = Player.vehicle;
        let Speed = vehicle.getSpeed() * 3.6;
        if (Date.now() >= DistanceNow + 1 && Speed > 1) {
            let Calculating = Speed * ((Date.now() - DistanceNow) / 1000);
            let Trip = Calculating / 3600;
            DistanceTemporary += Trip;
            vehicle.Mileage += (DistanceTemporary / 1000);
            DistanceNow = Date.now();
        }
        // Updating Vehicle.Mileage in GameInterface 
        //GameInterface.execute('hud.Mileage(' + vehicle.Mileage.toFixed(3) + ')');
        //GameInterface.execute('hud.Speed(' + Speed + ')');
    }
}
// SYNCING WINDOWS // PROBABLY TROUBE
function Windows(Vehicle, Value) {
    const Doors = mp.game.invoke('0x92922A607497B14D', Vehicle.handle);
    for (let i = 0; i < Doors - 2; i++) {
        let Window = Value[i];
        Window ? Vehicle.rollDownWindow(i) : Vehicle.rollUpWindow(i);
    }
}
var VehicleDoors;
(function (VehicleDoors) {
    VehicleDoors[VehicleDoors["Hood"] = 0] = "Hood";
    VehicleDoors[VehicleDoors["Trunk"] = 1] = "Trunk";
    VehicleDoors[VehicleDoors["Back"] = 2] = "Back";
    VehicleDoors[VehicleDoors["Back2"] = 3] = "Back2";
})(VehicleDoors || (VehicleDoors = {}));
function Doors(Vehicle, Index, Value) {
    let Number = 4;
    switch (Index) {
        case VehicleDoors.Hood:
            Number = 4;
            break;
        case VehicleDoors.Trunk:
            Number = 5;
            break;
        case VehicleDoors.Back:
            Number = 6;
            break;
        case VehicleDoors.Back2:
            Number = 7;
            break;
    }
    Value ? Vehicle.setDoorOpen(Number, false, false) : Vehicle.setDoorShut(Number, false);
}
;
const natives = {
    MAX_PASSENGERS: '0x2AD93716F184EDA4',
    MAX_SPEED: '0xF417C2502FFFED43',
    MAX_BRAKING: '0xDC53FD41B4ED944C',
    MAX_TRACTION: '0x539DE94D44FDFD0D',
    MAX_ACCELERATION: '0x8C044C5C84505B6A',
    MANUFACTEUR: '0xF7AF4F159FF99F97',
};


/***/ }),

/***/ 6054:
/***/ (() => {

/*
const localPlayer = mp.players.local;
const hairColors = [];
const lipstickColors = [];
const makeupColors = [];
const torsoHairComponentsToRemove = [ 3, 7, 8, 9, 11 ];
let barberInfo = undefined;

mp.events.add("playerDeath", (player) => {
	if (isBarberStarted && player.remoteId === localPlayer.remoteId) {
		onBarberFinished();
	}
});

mp.events.add("barbershop::load_info", (rawInfo) => {
	barberInfo = JSON.parse(rawInfo);

	// Hair, Makeup
	const maxColors = Math.max(mp.game.invoke("0xE5C0CF872C2AD150"), mp.game.invoke("0xD1F7CA1535D22818"));

	for (let i = 0; i < maxColors; i++) {
		if (mp.game.ped.isAValidHairColor(i)) {
			hairColors.push(i);
		}

		if (mp.game.ped.isAValidLipstickColor(i)) {
			lipstickColors.push(i);
		}

		if (mp.game.ped.isAValidBlushColor(i)) {
			makeupColors.push(i);
		}
	}
});

let currentPlace = undefined;
let isBarberStarted = false;
let playerPed;
let keeperPed;
let camera = undefined;
let stage = -1;
let scissorsObj = undefined;
let isHighlightingEnabled = false;
let currentCutAnim = undefined;
let cutSoundStarted = false;
let cutAcceptCallback = undefined;
let removedClothing = [];
let currentEyeColor;
let cutSound;

mp.events.add("render", () => {
	if (barberInfo === undefined) {
		return;
	}

	if (isBarberStarted) {
		if (stage === 0 && playerPed && playerPed.hasAnimFinished(currentPlace.animDict, "player_enterchair", 3)) {
			onPedSeat();
		}

		if (stage === 2) {
			if (keeperPed && keeperPed.hasAnimFinished(currentPlace.animDict, currentCutAnim, 3)) {
				onCutFinished();
			}

			if (sceneId !== -1) {
				const phase = mp.game.ped.getSynchronizedScenePhase(sceneId);

				if (phase >= 0.3 && phase <= 0.4 && !cutSoundStarted) {
					if (cutAcceptCallback) {
						cutAcceptCallback();
						cutAcceptCallback = undefined;
					}
					
					mp.game.audio.playSoundFromEntity(1488, cutSound, keeperPed.handle, "Barber_Sounds", false, 0);
					cutSoundStarted = true;
				} else if (phase >= 0.6 && cutSoundStarted) {
					mp.game.audio.stopSound(1488);
					cutSoundStarted = false;
				}
			}
		}

		if (stage === 3 && playerPed && playerPed.hasAnimFinished(currentPlace.animDict, "player_exitchair", 3)) {
			onBarberFinished();
		}

		mp.game.invoke("0x719FF505F097FD20");

		return;
	}

	const interior = getCurrentInterior();
	let placeIndex;

	if (interior === 0 || (placeIndex = barberInfo.interiors.indexOf(interior)) < 0) {
		if (currentPlace !== undefined) {
			onStopInteraction();
		}

		return;
	}

	const place = barberInfo.places[placeIndex];

	if(!isLocalPlayerInAngledArea(place.interaction.origin, place.interaction.edge, place.interaction.angle)) {
		onStopInteraction();
		return;
	}

	if (currentPlace === undefined) {
		onStartInteraction(place);
	}
});

mp.events.add("barbershop::startBarber", async (hairColor, highlightColor, rawHeadOverlays, eyeColor) => {
	const playerPos = localPlayer.position;
	const playerDimension = localPlayer.dimension;
	const chairInfo = currentPlace.chair;
	const exitPos = currentPlace.exit.position;

	currentHair.color = hairColor;
	currentHair.highlightColor = highlightColor;
	playerHeadOverlays = new Map(JSON.parse(rawHeadOverlays));
	currentEyeColor = eyeColor;

	playerPed = mp.peds.new(localPlayer.model, playerPos, 0, playerDimension);
	keeperPed = mp.peds.new(currentPlace.pedModel, playerPos, 0, playerDimension);
	scissorsObj = mp.objects.new(barberInfo.scissors.model, currentPlace.scissorsPosition, {
		dimension: playerDimension
	});

	while (!scissorsObj.doesExist() && !playerPed.doesExist() && !keeperPed.doesExist()) {
		mp.game.wait(0);
	}
	
	keeperPed.taskLookAt(playerPed.handle, -1, 2048, 3);

	localPlayer.cloneToTarget(playerPed.handle);
	localPlayer.position = new mp.Vector3(exitPos.x, exitPos.y, exitPos.z);
	localPlayer.setHeading(currentPlace.exit.heading);
	localPlayer.freezePosition(true);
	localPlayer.setAlpha(0);
	localPlayer.setCollision(false, false);

	playVoice("SHOP_HAIR_WHAT_WANT");
	
	await requestAnimDict(currentPlace.animDict);

	camera = mp.cameras.new("default");
		
	playerPed.taskPlayAnimAdvanced(currentPlace.animDict, "player_enterchair", chairInfo.position.x, chairInfo.position.y, 
		chairInfo.position.z, 0, 0, chairInfo.heading, 1000, -1000, -1, 5642, 0, 2, 1);
	playKeeperAnim("keeper_enterchair", "scissors_enterchair");

	const camInfo = currentPlace.cam;	
	const camPos = mp.game.object.getObjectOffsetFromCoords(camInfo.position.x, camInfo.position.y, camInfo.position.z,
		camInfo.heading, camInfo.offset.x, camInfo.offset.y, camInfo.offset.z);

	camera.setCoord(camPos.x, camPos.y, camPos.z);
	camera.pointAtCoord(camInfo.position.x, camInfo.position.y, camInfo.position.z);
	camera.setFov(47);
	
	fadeScreen(false, 50);
	camera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 3000, true, false);
});

function onStartInteraction(place) {
	currentPlace = place;
	mp.events.call("prompt.show", `Нажмите <span>Е</span>, чтобы сделать прическу или нанести макияж.`);
}

function onStopInteraction(clearPlace = true) {
	if (clearPlace) {
		currentPlace = undefined;
	}

	mp.events.call("prompt.hide");
}

const Keys = {
	PageUp: 0x21,
	PageDown: 0x22,
	Q: 0x51,
	E: 0x45,
	Space: 0x20
};

// E
mp.keys.bind(Keys.E, true, () => {
	onKeyPressed(Keys.E);

	if (currentPlace === undefined || isBarberStarted || mp.gui.cursor.visible) {
		return;
	}

	stage = 0;
	isBarberStarted = true;
	selectedMainMenuIndex = 0;

	mp.game.ui.requestAdditionalText("HAR_MNU", 9);
	mp.game.audio.requestAmbientAudioBank("SCRIPT\\Hair_Cut", false);

	instructionButtonsDrawler.init();
	onStopInteraction(false);
	fadeScreen(true, 50);
	mp.events.callRemote("barbershop::onStart");
});

// PageUp
mp.keys.bind(Keys.PageUp, true, () => {
	onKeyPressed(Keys.PageUp);
});
// PageDown
mp.keys.bind(Keys.PageDown, true, () => {
	onKeyPressed(Keys.PageDown);
});
// Q
mp.keys.bind(Keys.Q, true, () => {
	onKeyPressed(Keys.Q);
});
// Space
mp.keys.bind(Keys.Space, true, () => {
	onKeyPressed(Keys.Space);
});

function onPedSeat() {
	stage = 1;

	playBaseAnims();
	showMainMenu();

	const camInfo = currentPlace.cam;

	cameraRotator.start(camera, camInfo.position, camInfo.position, camInfo.offset, camInfo.heading);
	cameraRotator.setXBound(150, 240);
	mp.gui.cursor.visible = true;
}

function onCutFinished() {
	stage = 1;

	playBaseAnims();
	showConcreteMenu(undefined);

	instructionButtonsDrawler.setActive(true);

	if (currentMenu === 0) {
		camera.setFov(33);
	}

	cameraRotator.pause(false);
}

function onKeyPressed(key) {
	if (!isBarberStarted || currentMenu === -1 || stage !== 1) {
		return;
	}

	switch (key) {
		case Keys.Space:
			if (currentMenu === 0) { // Hair
				isHighlightingEnabled = !isHighlightingEnabled;
				showHairInstructionButtons();
				setHairColorByIndexes();
			}

			break;
		case Keys.PageDown:
		case Keys.PageUp:
			if (currentMenu === 0) { // Hair
				currentHair.selectedColorIndex = getNextValidValue(hairColors, currentHair.selectedColorIndex, key === Keys.PageDown ? -1 : 1);

				setHairColorByIndexes();
			} else if (currentHeadOverlay.id !== -1 && currentHeadOverlay.colorIndex !== -1) {
				currentHeadOverlay.colorIndex = getNextValidValue(getHeadOverlayColors(currentHeadOverlay.id), currentHeadOverlay.colorIndex, key === Keys.PageDown ? -1 : 1);

				setCurrentHeadOverlayColor();
			}
			
			break;
		case Keys.Q:
		case Keys.E:
			if (currentMenu === 0 && isHighlightingEnabled) {
				currentHair.selectedHighlightColorIndex = getNextValidValue(hairColors, currentHair.selectedHighlightColorIndex, key === Keys.Q ? -1 : 1);

				setHairColorByIndexes();
			} else if (currentHeadOverlay.id !== -1 && currentHeadOverlay.opacity !== -1) {
				currentHeadOverlay.opacity += key === Keys.Q ? -0.05 : 0.05;

				if (currentHeadOverlay.opacity > 1) {
					currentHeadOverlay.opacity = 1;
				} else if (currentHeadOverlay.opacity < 0) {
					currentHeadOverlay.opacity = 0;
				}

				setCurrentHeadOverlay();
			}

			break;
	}
}

let selectedMainMenuIndex = 0;
let currentMenu = -1;
let currentHair = {
	drawable: -1,
	color: 0,
	highlightColor: 0,
	selectedColorIndex: 0,
	selectedHighlightColorIndex: 0
};
let playerHeadOverlays = new Map();
let currentHeadOverlay = {
	id: 0,
	index: 0,
	opacity: 1,
	colorIndex: 0
};

mp.events.add("selectMenu.itemSelected", async (menuName, itemName, itemValue, itemIndex) => {
	if (!menuName.startsWith("barbershop_")) {
		return;
	}

	if (menuName === "barbershop_m_main" || menuName === "barbershop_f_main") {
		if (itemName === "Уйти") {
			onBarberStop();
			return;
		}

		selectedMainMenuIndex = itemIndex;

		if (itemName === "Макияж") {
			mp.events.call("selectMenu.show", `barbershop_makeupMenu_${localPlayer.isMale() ? "m" : "f"}`);
			instructionButtonsDrawler.setButtons(...mainInstructionButtons);
			instructionButtonsDrawler.setActive(true);
			return;
		}

		showConcreteMenu(itemName);
	} else if (menuName === "barbershop_makeupMenu_m" || menuName === "barbershop_makeupMenu_f") {
		showConcreteMenu(itemName);
	} else if (menuName === "barbershop_concrete") {
		if (currentMenu === 0) { // Hair
			const hair = getHairDrawableByIndex(itemIndex);
			const { color, highlightColor } = getSelectedColors();

			if (hair === currentHair.drawable && color === currentHair.color && highlightColor === currentHair.highlightColor) {
				return;
			}

			if (!await checkPrice(itemIndex)) {
				return;
			}

			setCurrentHair();
			setCurrentHairColor();
			setHair(hair, color, highlightColor);
			playCutAnim(() => {
				setCurrentHair();
				setCurrentHairColor();
			});
		} else if (currentMenu === 4) { // Eye color
			if (currentEyeColor === itemIndex) {
				return;
			}

			if (!await checkPrice(itemIndex)) {
				return;
			}

			playerPed.setEyeColor(currentEyeColor);
			currentEyeColor = itemIndex;
			mp.events.callRemote("barbershop::setEyeColor", currentEyeColor);
			playCutAnim(() => {
				playerPed.setEyeColor(currentEyeColor);
			}, false);
		} else if(currentHeadOverlay.id !== -1) {
			const headOverlay = playerHeadOverlays.get(currentHeadOverlay.id);
			const overlayIndex = currentHeadOverlay.index;
			const overlayOpacity = currentHeadOverlay.opacity;
			const overlayColorIndex = currentHeadOverlay.colorIndex;

			let color = 0;

			if (overlayColorIndex !== -1) {
				color = getHeadOverlayColors(currentHeadOverlay.id)[overlayColorIndex];
			}

			if (
				headOverlay[0] === overlayIndex
				&& (headOverlay[1] === overlayOpacity || overlayOpacity === -1)
				&& (headOverlay[2] === color || overlayColorIndex === -1)
			) {
				return;
			}

			if (!await checkPrice(itemIndex)) {
				return;
			}

			const currentOverlay = currentHeadOverlay.id;
			let dependentOverlayId = undefined;

			resetCurrentHeadOverlay();

			if (currentMenu === 5 || currentMenu === 6 || currentMenu === 8) {
				dependentOverlayId = currentOverlay === 4 ? 5 : 4;

				const dependentOverlay = playerHeadOverlays.get(dependentOverlayId);

				if (dependentOverlay[0] !== 255) {
					currentHeadOverlay.id = dependentOverlayId;
					resetCurrentHeadOverlay();
					currentHeadOverlay.id = currentOverlay;
				}
			}

			setHeadOverlay(overlayIndex, overlayOpacity, color, overlayColorIndex, dependentOverlayId);

			playCutAnim(() => {
				setCurrentHeadOverlay();
				setCurrentHeadOverlayColor();

				if (dependentOverlayId) {
					currentHeadOverlay.id = dependentOverlayId;
					resetCurrentHeadOverlay();
					currentHeadOverlay.id = currentOverlay;
				}
			}, currentMenu <= 3);
		}
	}
});

mp.events.add("selectMenu.itemFocusChanged", (menuName, itemName, itemValue, itemIndex, valueIndex) => {
	if (!menuName.startsWith("barbershop_")) {
		return;
	}

	if (menuName === "barbershop_concrete") {
		if (currentMenu === 0) { // Hair
			playerPed.setComponentVariation(2, getHairDrawableByIndex(itemIndex), 0, 2);
			setHairColorByIndexes();
		} else if (currentMenu === 4) { // Eye color
			playerPed.setEyeColor(itemIndex);
		} else if (currentHeadOverlay.id !== -1) {
			let value = itemIndex === 0 ? 255 : itemIndex - 1;

			if (currentMenu === 5) {
				const painting = barberInfo.facePaintings[itemIndex];

				if (painting.i !== currentHeadOverlay.id) {
					playerPed.setHeadOverlay(currentHeadOverlay.id, 255, 1);

					currentHeadOverlay.id = painting.i;

					if (currentHeadOverlay.colorIndex === -1) {
						const overlayColors = getHeadOverlayColors(currentHeadOverlay.id);

						currentHeadOverlay.colorIndex = overlayColors.length > 0 ? overlayColors.indexOf(playerHeadOverlays.get(currentHeadOverlay.id)[2]) : -1;
					}

					showItemsInstructionButtons(currentHeadOverlay.colorIndex !== -1, currentHeadOverlay.opacity !== -1);
					setCurrentHeadOverlayColor();
				}

				value = painting.v;
			} else if (currentMenu === 6) {
				playerPed.setHeadOverlay(5, 255, 1);
				value = barberInfo.eyeMakeups[itemIndex].v;
			} else if (currentMenu === 8) {
				playerPed.setHeadOverlay(4, 255, 1);
			}

			currentHeadOverlay.index = value;
			setCurrentHeadOverlay();
		}
	}
});

mp.events.add("selectMenu.backspacePressed", (menuName) => {
	if (!menuName.startsWith("barbershop_")) {
		return;
	}

	if (menuName === "barbershop_concrete") {
		if(currentMenu === 0) { // Hair
			setCurrentHair();
			setCurrentHairColor();
		} else if (currentMenu === 4) { // Eye color
			playerPed.setEyeColor(currentEyeColor);
		} else if (currentHeadOverlay.id !== -1) {
			resetCurrentHeadOverlay();

			if (currentMenu === 5 || currentMenu === 6 || currentMenu === 8) {
				const dependentOverlayId = currentHeadOverlay.id === 4 ? 5 : 4;

				currentHeadOverlay.id = dependentOverlayId;
				resetCurrentHeadOverlay();
			}
		}

		if (currentMenu === 6 || currentMenu === 7 || currentMenu === 8) {
			mp.events.call("selectMenu.show", `barbershop_makeupMenu_${localPlayer.isMale() ? "m" : "f"}`);
			instructionButtonsDrawler.setButtons(...mainInstructionButtons);
			instructionButtonsDrawler.setActive(true);
		} else {
			showMainMenu();
		}

		camera.setFov(47);
	} else if (menuName === "barbershop_makeupMenu_m" || menuName === "barbershop_makeupMenu_f") {
		showMainMenu();
	}
});

function getCurrentInterior() {
	return mp.game.invoke("0x2107BA504071A6BB", localPlayer.handle);
}

function isLocalPlayerInAngledArea(origin, edge, angle) {
	return localPlayer.isInAngledArea(origin.x, origin.y, origin.z, edge.x, edge.y, edge.z, angle, false, true, 0);
}

function fadeScreen(state, duration) {
	if (state) {
		mp.game.cam.doScreenFadeOut(duration);
	} else {
		mp.game.cam.doScreenFadeIn(duration);
	}
}

let sceneId = -1;

function createScene(looped = false) {
	if (sceneId !== -1) {
		mp.game.ped.detachSynchronizedScene(sceneId);
		mp.game.ped.disposeSynchronizedScene(sceneId);
		sceneId = -1;
	}

	const chairInfo = currentPlace.chair;

	sceneId = mp.game.ped.createSynchronizedScene(chairInfo.position.x, chairInfo.position.y, chairInfo.position.z, 0, 0, chairInfo.heading, 2);

	mp.game.invoke("0x394B9CD12435C981", sceneId, true);
	mp.game.ped.setSynchronizedSceneLooped(sceneId, looped);

	return sceneId;
}

const mainInstructionButtons = [
	{ control: 201, label: "ITEM_SELECT" },
	{ altControl: "b_114", label: "ITEM_MOV_CAM" }
];
const baseItemsInstructionButtons = [
	{ control: 201, label: "ITEM_BUY" },
	{ control: 194, label: "ITEM_BACK" },
	{ altControl: "b_114", label: "ITEM_MOV_CAM" },
];
const hairInstructionButtons = [
	...baseItemsInstructionButtons,
	{ altControl: "b_1009%b_1010", label: "ITEM_T_HCOL" },
];

function showMainMenu() {
	currentMenu = -1;
	currentHeadOverlay.id = -1;
	restoreClothes();
	mp.events.call("selectMenu.show", `barbershop_${localPlayer.isMale() ? "m" : "f"}_main`, selectedMainMenuIndex);
	instructionButtonsDrawler.setButtons(...mainInstructionButtons);
	instructionButtonsDrawler.setActive(true);
}

function showConcreteMenu(header) {
	let selectedIndex = 0;
	const items = [];

	if (header === undefined) {
		header = getMenuHeaderByIndex(currentMenu);
	} else {
		currentMenu = getUniqueMenuIndexByName(header);
	}

	if (currentMenu === 0) { // Hair
		currentHair.drawable = playerPed.getDrawableVariation(2);
		currentHair.selectedColorIndex = hairColors.indexOf(currentHair.color);
		currentHair.selectedHighlightColorIndex = hairColors.indexOf(currentHair.highlightColor);

		if (currentHair.selectedColorIndex === -1) {
			currentHair.selectedColorIndex = 0;
		}

		if (currentHair.selectedHighlightColorIndex === -1) {
			currentHair.selectedHighlightColorIndex = 0;
		}

		selectedIndex = generateHairValues(items);
		isHighlightingEnabled = currentHair.color !== currentHair.highlightColor;
		showHairInstructionButtons();
	} else if (currentMenu === 4) { // Eye color
		selectedIndex = generateEyeColorValues(items);
		instructionButtonsDrawler.setButtons(...baseItemsInstructionButtons);
		instructionButtonsDrawler.setActive(true);
	} else { // Other overlays
		currentHeadOverlay.id = getOverlayIdByCurrentMenu();

		if (currentHeadOverlay.id === -1) {
			return;
		}

		if (currentMenu === 3 && removedClothing.length === 0) { // Torso hair
			for (const componentId of torsoHairComponentsToRemove) {
				const drawable = playerPed.getDrawableVariation(componentId);
				const texture = playerPed.getTextureVariation(componentId);
				const palette = playerPed.getPaletteVariation(componentId);

				removedClothing.push({ componentId, drawable, texture, palette });

				playerPed.setComponentVariation(componentId, getNakedClothes(componentId), 0, 0);
			}
		}

		resetCurrentHeadOverlay(false);

		if (currentMenu === 5) {
			selectedIndex = generateFacePaintingValues(items);
		} else if (currentMenu === 6) {
			selectedIndex = generateEyeMakeupValues(items);
		} else {
			selectedIndex = generateHeadOverlayValues(currentHeadOverlay.id, items);
		}

		showItemsInstructionButtons(currentHeadOverlay.colorIndex !== -1, currentHeadOverlay.opacity !== -1);
		setCurrentHeadOverlayColor();
	}

	if (currentMenu !== 3) {
		camera.setFov(33);
	}

	mp.events.call("selectMenu.setSpecialItems", "barbershop_concrete", items);
	mp.events.call("selectMenu.setHeader", "barbershop_concrete", header);
	mp.events.call("selectMenu.show", "barbershop_concrete", selectedIndex);
}

function generateHairValues(collection) {
	const hairValues = getHairValues();
	const isMale = playerPed.isMale();
	let selectedIndex = 0;

	for (let i = 0; i < hairValues.length; i++) {
		if (currentHair.drawable === hairValues[i]) {
			selectedIndex = i;
		}

		const label = getHairLabel(isMale, i);
		const text = escapeHtml(mp.game.ui.getLabelText(label));

		addMenuItem(collection, text, i);
	}

	return selectedIndex;
}

function generateHeadOverlayValues(overlayId, collection) {
	let selectedIndex = 0;

	const itemsCount = currentMenu === 8 ? 7 : mp.game.ped.getNumHeadOverlayValues(overlayId);

	for (let i = 0; i < itemsCount + 1; i++) {
		if (currentHeadOverlay.index === i - 1) {
			selectedIndex = i;
		}

		const label = getHeadOverlayLabel(overlayId, i);
		const text = escapeHtml(mp.game.ui.getLabelText(label));

		addMenuItem(collection, text, i);
	}

	return selectedIndex;
}

function generateEyeColorValues(collection) {
	let selectedIndex = 0;

	for (let i = 0; i < 32; i++) {
		if (currentEyeColor === i) {
			selectedIndex = i;
		}

		const label = `FACE_E_C_${i}`;
		const text = escapeHtml(mp.game.ui.getLabelText(label));

		addMenuItem(collection, text, i);
	}

	return selectedIndex;
}

function generateFacePaintingValues(collection) {
	let selectedIndex = 0;

	for (let i = 0; i < barberInfo.facePaintings.length; i++) {
		const facePainting = barberInfo.facePaintings[i];

		if (currentHeadOverlay.index === facePainting.v && currentHeadOverlay.id === facePainting.i) {
			selectedIndex = i;
		}

		const text = escapeHtml(mp.game.ui.getLabelText(facePainting.l));

		addMenuItem(collection, text, i);
	}

	return selectedIndex;
}

function generateEyeMakeupValues(collection) {
	let selectedIndex = 0;

	for (let i = 0; i < barberInfo.eyeMakeups.length; i++) {
		const eyeMakeup = barberInfo.eyeMakeups[i];

		if (currentHeadOverlay.index === eyeMakeup.v) {
			selectedIndex = i;
		}

		const text = escapeHtml(mp.game.ui.getLabelText(eyeMakeup.l));

		addMenuItem(collection, text, i);
	}

	return selectedIndex;
}

function getHeadOverlayDefaultOpacity(overlayId) {
	switch (overlayId) {
		case 1:
		case 2:
		case 4:
		case 5:
		case 10:
			return 1;
		case 8:
			return 0.8;
		default:
			return -1;
	}
}

function getHeadOverlayColors(overlayId) {
	switch (overlayId) {
		case 1:
		case 2:
		case 10:
			return hairColors;
		case 5:
			return makeupColors;
		case 8:
			return lipstickColors;
		default:
			return [];
	}
}

const maleHairLabels = [ "CC_M_HS_0", "CC_M_HS_1", "CC_M_HS_2", "CC_M_HS_3", "CC_M_HS_4", "CC_M_HS_5", "CC_M_HS_6", "CC_M_HS_7", "CC_M_HS_8", "CC_M_HS_9", "CC_M_HS_10", "CC_M_HS_11", "CC_M_HS_12", "CC_M_HS_13", "CC_M_HS_14", "CC_M_HS_15", "CC_M_HS_16", "CC_M_HS_17", "CC_M_HS_18", "CC_M_HS_19", "CC_M_HS_20", "CC_M_HS_21", "CC_M_HS_22", "CLO_S1M_H_0_0", "CLO_S1M_H_1_0", "CLO_S1M_H_2_0", "CLO_S1M_H_3_0", "CLO_S2M_H_0_0", "CLO_S2M_H_1_0", "CLO_S2M_H_2_0", "CLO_BIM_H_0_0", "CLO_BIM_H_1_0", "CLO_BIM_H_2_0", "CLO_BIM_H_3_0", "CLO_BIM_H_4_0", "CLO_BIM_H_5_0", "CLO_GRM_H_0_0", "CLO_GRM_H_1_0" ];
const femaleHairLabels = [ "CC_F_HS_0", "CC_F_HS_1", "CC_F_HS_2", "CC_F_HS_3", "CC_F_HS_4", "CC_F_HS_5", "CC_F_HS_6", "CC_F_HS_7", "CC_F_HS_8", "CC_F_HS_9", "CC_F_HS_10", "CC_F_HS_11", "CC_F_HS_12", "CC_F_HS_13", "CC_F_HS_14", "CC_F_HS_15", "CC_F_HS_16", "CC_F_HS_17", "CC_F_HS_23", "CC_F_HS_18", "CC_F_HS_19", "CC_F_HS_20", "CC_F_HS_21", "CC_F_HS_22", "CLO_S1F_H_0_0", "CLO_S1F_H_1_0", "CLO_S1F_H_2_0", "CLO_S1F_H_3_0", "CLO_S2F_H_0_0", "CLO_S2F_H_1_0", "CLO_S2F_H_2_0", "CLO_BIF_H_0_0", "CLO_BIF_H_1_0", "CLO_BIF_H_2_0", "CLO_BIF_H_3_0", "CLO_BIF_H_4_0", "CLO_BIF_H_6_0", "CLO_BIF_H_5_0", "CLO_GRF_H_0_0", "CLO_GRF_H_1_0" ];

function getHairLabel(isMale, index) {
	if (isMale) {
		return maleHairLabels[index];
	} else {
		return femaleHairLabels[index];
	}
}

function getHeadOverlayLabel(overlayId, index) {
	switch (overlayId) {
		case 1: // Beard
			return index <= 19 ? `HAIR_BEARD${index}` : `BRD_HP_${index-20}`;
		case 2: // Eyebrows
			return index === 0 ? "NONE" : `CC_EYEBRW_${index-1}`;
		case 5: // Blush
			return index === 0 ? "NONE" : `CC_BLUSH_${index-1}`;
		case 8: // Lipstick
			return index === 0 ? "NONE" : `CC_LIPSTICK_${index-1}`;
		case 10: // Torso hair
			return `CC_BODY_1_${index}`;
		default:
			return "NONE";
	}
}

function getUniqueMenuIndexByName(name) {
	switch (name) {
		case "Причёски":
			return 0;
		case "Бороды":
			return 1;
		case "Брови":
			return 2;
		case "Грудь":
			return 3;
		case "Линзы":
			return 4;
		case "Раскраска лица":
			return 5;
		case "Глаз":
			return 6;
		case "Помада":
			return 7;
		case "Румяна":
			return 8;
		default:
			return -1;
	}
}

function getMenuHeaderByIndex(index) {
	switch (index) {
		case 0:
			return "Причёски";
		case 1:
			return "Бороды";
		case 2:
			return "Брови";
		case 3:
			return "Грудь";
		case 4:
			return "Линзы";
		case 5:
			return "Раскраска лица";
		case 6:
			return "Глаз";
		case 7:
			return "Помада";
		case 8:
			return "Румяна";
		default:
			return "NONE";
	}
}

function getOverlayIdByCurrentMenu() {
	switch (currentMenu) {
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 10;
		case 5:
			const makeupOverlay = playerHeadOverlays.get(4);

			if (makeupOverlay[0] !== 255) {
				return 4;
			}

			return playerHeadOverlays.get(5)[0] === 255 ? 4 : 5;
		case 6:
			return 4;
		case 7:
			return 8;
		case 8:
			return 5;
		default:
			return -1;
	}
}

function getHairDrawableByIndex(index) {
	return getHairValues()[index];
}

function getHairValues() {
	const genderIndex = playerPed.isMale() ? 0 : 1;

	return barberInfo.hairValues[genderIndex];
}

function showHairInstructionButtons() {
	const buttons = hairInstructionButtons.slice();

	if (isHighlightingEnabled) {
		buttons.splice(3, 0, { control: 203, label: "ITEM_X_TINT" });
		buttons.splice(4, 0, { altControl: "t_E%t_Q", label: "ITEM_B_HILI" });
	} else {
		buttons.splice(3, 0, { control: 203, label: "ITEM_X_HILI" });
	}
	
	instructionButtonsDrawler.setButtons(...buttons);
	instructionButtonsDrawler.setActive(true);
}

function showItemsInstructionButtons(showColor = false, showOpacity = false) {
	const buttons = baseItemsInstructionButtons.slice();
	let insertIndex = 3;

	if (showOpacity) {
		buttons.splice(insertIndex, 0, { altControl: "t_E%t_Q", label: "ITEM_B_OPACITY" });
		insertIndex++;
	}

	if (showColor) {
		buttons.splice(insertIndex, 0, { altControl: "b_1009%b_1010", label: "ITEM_T_COL" });
	}

	instructionButtonsDrawler.setButtons(...buttons);
	instructionButtonsDrawler.setActive(true);
}

function getNextValidValue(collection, currentValue, additionValue) {
	let value = currentValue + additionValue;

	if (value < 0) {
		value = collection.length - 1;
	}

	if (value >= collection.length) {
		value = 0;
	}

	return value;
}

function setHairColorByIndexes() {
	const { color, highlightColor } = getSelectedColors();

	playerPed.setHairColor(color, highlightColor);
}

function setHair(hair, color, highlightColor) {
	currentHair.drawable = hair;
	currentHair.color = color;
	currentHair.highlightColor = highlightColor;

	mp.events.callRemote("barbershop::setHair", currentHair.drawable, currentHair.color, currentHair.highlightColor);
}

function setCurrentHair() {
	playerPed.setComponentVariation(2, currentHair.drawable, playerPed.getTextureVariation(2), 2);
}

function setCurrentHairColor() {
	playerPed.setHairColor(currentHair.color, currentHair.highlightColor);
}

function getSelectedColors() {
	const color = hairColors[currentHair.selectedColorIndex];
	const highlightColor = isHighlightingEnabled ? hairColors[currentHair.selectedHighlightColorIndex] : color;

	return { color, highlightColor };
}

function playCutAnim(acceptCallback = undefined, withScissors = true) {
	const cutVariant = Math.random() >= 0.5 ? "a" : "b";

	currentCutAnim = getCutAnimPart() + cutVariant;

	instructionButtonsDrawler.setActive(false);

	mp.events.call("selectMenu.hide", "barbershop_concrete");
	camera.setFov(47);

	playVoice("SHOP_CUTTING_HAIR");

	if (withScissors) {
		cutSound = "Scissors";
		playKeeperAnim(currentCutAnim, currentCutAnim.replace("keeper_", "scissors_"));
	} else {
		cutSound = "Makeup";
		playKeeperAnim(currentCutAnim);
	}

	stage = 2;
	cutSoundStarted = false;

	if (acceptCallback) {
		cutAcceptCallback = acceptCallback;
	}
}

function getCutAnimPart() {
	return currentPlace.animDict.indexOf("hair_dressers") >= 0 ? "keeper_hair_cut_" : "keeper_idle_";
}

function playKeeperAnim(keeperAnim, scissorsAnim = undefined, looped = false) {
	sceneId = createScene(looped);

	keeperPed.taskSynchronizedScene(sceneId, currentPlace.animDict, keeperAnim, 1000, -1056964608, 0, 0, 1148846080, 0);

	if (scissorsAnim) {
		scissorsObj.setInvincible(false);
		scissorsObj.playSynchronizedAnim(sceneId, scissorsAnim, currentPlace.animDict, 1000, -1000, 0, 1148846080);
		scissorsObj.forceAiAndAnimationUpdate();
	} else {
		scissorsObj.setInvincible(true);
	}
}

function playBaseAnims() {
	const chairInfo = currentPlace.chair;

	playerPed.taskPlayAnimAdvanced(currentPlace.animDict, "player_base", chairInfo.position.x, chairInfo.position.y, 
		chairInfo.position.z, 0, 0, chairInfo.heading, 8, 8, -1, 5641, 0, 2, 1);
	playKeeperAnim("keeper_base", "scissors_base", true);
}

function setHeadOverlay(index, opacity, color, colorIndex, clearOverlayId) {
	const headOverlay = playerHeadOverlays.get(currentHeadOverlay.id);

	headOverlay[0] = index;
	headOverlay[1] = opacity;
	headOverlay[2] = color;
	currentHeadOverlay.index = index;
	currentHeadOverlay.opacity = opacity;
	currentHeadOverlay.colorIndex = colorIndex;

	if (clearOverlayId) {
		const clearOverlay = playerHeadOverlays.get(clearOverlayId);

		clearOverlay[0] = 255;
	}

	mp.events.callRemote("barbershop::setHeadOverlay", currentHeadOverlay.id, index, opacity, color || 0, clearOverlayId);
}

function setCurrentHeadOverlay() {
	playerPed.setHeadOverlay(currentHeadOverlay.id, currentHeadOverlay.index, currentHeadOverlay.opacity);
}

function setCurrentHeadOverlayColor() {
	if (currentHeadOverlay.colorIndex === -1) {
		return;
	}
	
	const color = getHeadOverlayColors(currentHeadOverlay.id)[currentHeadOverlay.colorIndex];

	if (typeof(color) !== "number") {
		return;
	}

	playerPed.setHeadOverlayColor(currentHeadOverlay.id, getHeadOverlayColorType(currentHeadOverlay.id), color, color);
}

function resetCurrentHeadOverlay(applyOnPed = true) {
	const headOverlay = playerHeadOverlays.get(currentHeadOverlay.id);
	const overlayColors = getHeadOverlayColors(currentHeadOverlay.id);
	const defaultOpacity = getHeadOverlayDefaultOpacity(currentHeadOverlay.id);

	currentHeadOverlay.index = headOverlay[0];
	currentHeadOverlay.opacity = defaultOpacity;
	currentHeadOverlay.colorIndex = overlayColors.length > 0 ? overlayColors.indexOf(headOverlay[2]) : -1;

	if (applyOnPed) {
		setCurrentHeadOverlay();
		setCurrentHeadOverlayColor();
	}
}

function getHeadOverlayColorType(overlayId) {
	switch (overlayId) {
		case 1: case 2: case 10:
			return 1;
		case 5: case 8:
			return 2;
		default:
			return 0;
	}
}

function getNakedClothes(componentId) {
	switch (componentId) {
		case 3:
			return 15;
		case 7:
			return 0;
		case 8:
			return 15;
		case 9:
			return 0;
		case 11:
			return 15;
		default:
			return undefined;
	}
}

function restoreClothes() {
	if (removedClothing.length === 0) {
		return;
	}

	for (const clothes of removedClothing) {
		playerPed.setComponentVariation(clothes.componentId, clothes.drawable, clothes.texture, clothes.palette);
	}

	removedClothing = [];
}

function onBarberStop(withAnim = true) {
	mp.events.call("selectMenu.hide");
	cameraRotator.pause(true);
	cameraRotator.reset();
	mp.gui.cursor.visible = false;
	instructionButtonsDrawler.dispose();

	if (withAnim) {
		const chairInfo = currentPlace.chair;

		playVoice("SHOP_GOODBYE");

		playerPed.taskPlayAnimAdvanced(currentPlace.animDict, "player_exitchair", chairInfo.position.x, chairInfo.position.y, 
			chairInfo.position.z, 0, 0, chairInfo.heading, 1000, -1000, -1, 5642, 0, 2, 1);
		playKeeperAnim("keeper_exitchair", "scissors_exitchair");

		stage = 3;
	} else {
		onBarberFinished();
	}
}

function onBarberFinished() {
	cameraRotator.stop();
	mp.game.cam.renderScriptCams(false, false, 3000, true, false);
	stage = -1;
	isBarberStarted = false;
	destroyEntities();
	mp.events.callRemote("barbershop::onStop");
	localPlayer.setCollision(true, true);
	localPlayer.freezePosition(false);
	localPlayer.setAlpha(255);
}

function destroyEntities() {
	keeperPed.destroy();
	scissorsObj.destroy();
	playerPed.destroy();
	camera.destroy();

	keeperPed = undefined;
	scissorsObj = undefined;
	playerPed = undefined;
	camera = undefined;
}

function playVoice(speechName) {
	const voice = currentPlace.pedModel === 0x418DFF92 ? "S_M_M_HAIRDRESSER_01_BLACK_MINI_01" : "S_F_M_FEMBARBER_BLACK_MINI_01";

	mp.game.audio.playAmbientSpeechWithVoice(keeperPed.handle, speechName, voice, "SPEECH_PARAMS_FORCE", false);
}

function addMenuItem(collection, itemName, itemIndex) {
	const price = getItemPrice(itemIndex);

	collection.push({ text: itemName, values: [ `${price} $` ] });
}

function getItemPrice(itemIndex) {
	const prices = barberInfo.prices[currentMenu];

	if (!Array.isArray(prices)) {
		return NaN;
	}

	return Array.isArray(prices[0]) ? prices[(localPlayer.isMale() ? 0 : 1)][itemIndex] : prices[itemIndex];
}

let checkPriceResolver;

function checkPrice(itemIndex) {
	cameraRotator.pause(true);
	cameraRotator.reset();

	return new Promise((resolve, reject) => {
		if (checkPriceResolver) {
			return reject("CheckPrice is already requested");
		}

		mp.events.call("selectMenu.hide");
		instructionButtonsDrawler.setActive(false);
		loadingPrompt.show("HUD_TRANSP", 4);

		checkPriceResolver = {
			resolve: (result) => {
				clearPriceCheck(result);
				resolve(result);
			},
			reject: (message) => {
				clearPriceCheck(false);
				reject(message);
			}
		}

		checkPriceResolver.timeout = setTimeout(() => {
			if (checkPriceResolver) {
				checkPriceResolver.reject("CheckPrice timeout");
			}
		}, 10000);

		mp.events.callRemote("barbershop::checkPrice", currentMenu, itemIndex, localPlayer.isMale());
	});
}

function clearPriceCheck(isSucces) {
	clearTimeout(checkPriceResolver.timeout);
	checkPriceResolver = undefined;
	loadingPrompt.hide();
	cameraRotator.pause(false);

	if (!isSucces) {
		showConcreteMenu(undefined);
	}
}

mp.events.add("barbershop::checkPriceResponse", (result) => {
	if(!checkPriceResolver || typeof(result) !== "boolean") {
		return;
	}

	if (isBarberStarted) {
		checkPriceResolver.resolve(result);
	} else {
		checkPriceResolver.resolve(false);
	}
});*/

/***/ }),

/***/ 368:
/***/ (() => {

// FOCUS ROLEPLAY DIAMOND CASINO - Roulette


let lpCasinoTable = null,
	casinoTableToJoin = null,
	casinoSeatToJoin = null,
	goToSeatInterval = null,
	interactingWithTable = null,
	rouletteCamera = null,
	canDoBets = true,
	betObject = null,
	closestChipSpot = null,
	interactingWithTableTimeout = null,
	rouletteData = [],
	posX = 0,
	posY = 0,
	posZ = 0;


const localPlayer = mp.players.local,
	  tableLib = "anim_casino_b@amb@casino@games@roulette@table",
	  dealerLib = "anim_casino_b@amb@casino@games@roulette@dealer",
	  dealerLibF = "anim_casino_b@amb@casino@games@roulette@dealer_female";


// U ON PLAYER ENTER CASINO PREBACITI OVO OBAVEZNO!!!!!!
mp.game.streaming.requestAnimDict(tableLib);
mp.game.streaming.requestAnimDict(dealerLib);
mp.game.streaming.requestAnimDict(dealerLibF);

mp.events.add('CLIENT::LOAD:INTERIOR', (x, y, z, ipl) => {
	const Interior = mp.game.interior.getInteriorAtCoords(x, y, z);
	if (Interior) {
		mp.game.streaming.requestIpl(ipl);
		mp.game.interior.refreshInterior(Interior);
	}
});


let tablesPos = 
[
	[ "vw_prop_casino_roulette_01", 1144.4254150390625, 269.3034973144531, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01", 1151.2305908203125, 263.14093017578125, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01b", 1148.9163818359375, 248.62892150878906, -52.03075408935547 ],
	[ "vw_prop_casino_roulette_01b", 1143.677978515625, 251.36131286621094, -52.0307502746582 ],
	[ "vw_prop_casino_roulette_01b", 1133.1802978515625, 262.3916320800781, -52.03075408935547 ], 
	[ "vw_prop_casino_roulette_01b", 1129.9976806640625, 266.93695068359375, -52.0307502746582 ] 
];

let tablesBets = 
[
	[ 500, 2500 ],
	[ 1000, 5000 ],
	[ 3000, 15000 ],
	[ 7000, 35000 ],
	[ 10000, 50000 ],
	[ 20000, 100000 ]
];

let tableSeatsPos =
[
	[-0.7, -1.28, 1, 0],
	[0.775, -1.68, 1, 0],
	[1.8, -0.63, 1, 90],
	[1.27, 1.05, 1, 180]
]

const pedModels =
[
   ["S_M_Y_Casino_01"],
   ["S_F_Y_Casino_01"],
   ["S_M_Y_Casino_01"], 
   ["S_F_Y_Casino_01"],
   ["S_M_Y_Casino_01"], 
   ["S_F_Y_Casino_01"]
];

const pedModelVariations =
[
	[ //S_M_Y_Casino_01
		[ 0, 2, 2, 0],
		[ 1, 1, 0, 0],
		[ 2, 4, 0, 0],
		[ 3, 0, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 2, 0, 0],
		[ 1, 0, 0, 0],
		[ 2, 2, 0, 0],
		[ 3, 2, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 0, 0, 0],
		[ 7, 0, 0, 0],
		[ 8, 2, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01
		[ 0, 2, 1, 0],
		[ 1, 1, 0, 0],
		[ 2, 2, 0, 0],
		[ 3, 0, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 2, 1, 0],
		[ 1, 0, 0, 0],
		[ 2, 2, 1, 0],
		[ 3, 3, 3, 0],
		[ 4, 1, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 3, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01
		[ 0, 4, 2, 0],
		[ 1, 1, 0, 0],
		[ 2, 3, 0, 0],
		[ 3, 0, 0, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 4, 0, 0],
		[ 1, 0, 0, 0],
		[ 2, 4, 0, 0],
		[ 3, 2, 1, 0],
		[ 4, 1, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 1, 0, 0],
		[ 8, 2, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01 (not used)
		[ 0, 4, 0, 0],
		[ 1, 1, 0, 0],
		[ 2, 0, 0, 0],
		[ 3, 0, 0, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	]
]

// Loading IPL 
//mp.game.streaming.requestIpl('vw_casino_main');
//mp.game.streaming.requestIpl('vw_dlc_casino_door');
//mp.game.streaming.requestIpl('hei_dlc_windows_casino');
//mp.game.streaming.requestIpl('hei_dlc_casino_door');
//mp.game.streaming.requestIpl('hei_dlc_casino_aircon');
//mp.game.streaming.requestIpl('vw_casino_garage');
//mp.game.streaming.requestIpl('vw_casino_carpark');
//mp.game.streaming.requestIpl('vw_casino_penthouse');


//mp.game.invoke('0xC1F1920BAF281317');

// Creating blip
mp.blips.new(679, new mp.Vector3(935.8140869140625, 46.942176818847656, 81.09580993652344), { name: "Diamond Casino & Resort", color: 4, shortRange: true, scale: 1.0 });

for(var i=0; i < tablesPos.length; i++)
{
	rouletteData[i] = {};
	rouletteData[i].table = mp.objects.new(mp.game.joaat(tablesPos[i][0]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2], tablesPos[i][3]));
	rouletteData[i].ball = mp.objects.new(87196104, new mp.Vector3(tablesPos[i][1]+posX, tablesPos[i][2]+posY, tablesPos[i][3]+posZ)); // mp.objects.new(87196104, new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]));
	rouletteData[i].ped = mp.peds.new(mp.game.joaat(pedModels[i]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2]+0.7, tablesPos[i][3]+1), 180, 0); //-0.001587
	rouletteData[i].label = mp.labels.new(`${tablesBets[i][0]}~n~${tablesBets[i][1]}`, new mp.Vector3(tablesPos[i][1],tablesPos[i][2], tablesPos[i][3]), { los: false, font: 1, drawDistance: 5 })
	rouletteData[i].ped.croupier = i;
	//mp.game.invoke('0x971DA0055324D033', rouletteData[i].table.handle, 3);
	
	for(var c=0; c < tableSeatsPos.length; c++)
	{
		var newShape = mp.colshapes.newSphere(tablesPos[i][1]+tableSeatsPos[c][0], tablesPos[i][2]+tableSeatsPos[c][1], tablesPos[i][3]+tableSeatsPos[c][2], 0.5);
		newShape.casinoTable = i;
		newShape.seatID = c;
	}
	
	for(var c=0; c < pedModelVariations[i].length; c++)
	{
		rouletteData[i].ped.setComponentVariation(pedModelVariations[i][c][0], pedModelVariations[i][c][1], pedModelVariations[i][c][2], pedModelVariations[i][c][3]);
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(shape.casinoTable !== undefined && lpCasinoTable == null && interactingWithTable == null)
	{
		casinoTableToJoin = shape.casinoTable;
		casinoSeatToJoin = shape.seatID;

		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
		mp.game.graphics.notify(`Pritisnite ~b~E~s~ da sednete.`);
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(shape.casinoTable !== undefined)
	{
		casinoTableToJoin = null;
		casinoSeatToJoin = null;
	}
});

mp.events.add('playerDeath', (player) => 
{
	if(player == localPlayer) 
	{
		if(interactingWithTable != null) interactingWithTable = null;
		if(BLOCK_CONTROLS_DURING_ANIMATION) BLOCK_CONTROLS_DURING_ANIMATION = false;
		if(rouletteCamera != null) destroyRouletteCamera();
		if(canDoBets) canDoBets = false;
	}
});

mp.events.add("initRoulette", () => 
{
	mp.events.add("render", rouletteRender);
	
	mp.events.add('entityStreamIn', (entity) => {
		if(entity.type == "ped" && entity.croupier != null) 
		{
			if(entity.model == mp.game.joaat('S_M_Y_Casino_01')) entity.taskPlayAnim(dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else entity.taskPlayAnim(dealerLibF, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			
			var id = entity.croupier;
			
			rouletteData[id].ball.position = new mp.Vector3(tablesPos[id][1]-0.734742, tablesPos[id][2]-0.36617, tablesPos[id][3]); // rouletteData[id].ball.position = new mp.Vector3(tablesPos[id][1]-0.734742, tablesPos[id][2]-0.16617, tablesPos[id][3]);
			
			for(var c=0; c < pedModelVariations[id].length; c++)
			{
				entity.setComponentVariation(pedModelVariations[id][c][0], pedModelVariations[id][c][1], pedModelVariations[id][c][2], pedModelVariations[id][c][3]);
			}
		}
	});
});

mp.events.add("playerSitAtCasinoTable", (player, tableID) => {
	
	if(player == localPlayer) 
	{
		lpCasinoTable = casinoTableToJoin;
		BLOCK_CONTROLS_DURING_ANIMATION = true;
		
		//showAlert('alert-blue', 'ЛКМ - сделать/повысить ставку</br>ПКМ - убрать/понизить ставку</br>F - вид на стол');
	}
	else
	{
		rouletteData[tableID].table.setNoCollision(player.handle, false);
	}
});

mp.events.add("rouletteAllowBets", (toggle) => {
	
	canDoBets = toggle;
	if(toggle) mp.game.graphics.notify("Place your bets.");
	else mp.game.graphics.notify("No more bets.");
});

mp.events.add('render', () => 
{
	//AddInstructionalButtonCustom("Toggle bet camera", "t_F");

	if(canDoBets && rouletteCamera && betObject == null)
	{
		betObject = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1], tablesPos[lpCasinoTable][2], tablesPos[lpCasinoTable][3]));
		betObject.setCollision(false, false);
	}
	
	if(betObject != null)
	{
		if(!canDoBets || rouletteCamera == null)
		{
			betObject.destroy();
			betObject = null;
			clearTableMarkers();
		}
	}
	
	if(rouletteCamera != null && lpCasinoTable != null)
	{
		if(betObject != null)
		{
			if(mp.game.controls.isDisabledControlJustReleased(0, 25) && !mp.gui.cursor.visible) // ПКМ
			{
				if(closestChipSpot != null) mp.events.callRemote("removeRouletteBet", closestChipSpot);
			}
			
			if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // ЛКМ
			{
				if(closestChipSpot != null) mp.events.callRemote("makeRouletteBet", closestChipSpot, parseInt(500));
			}
			
			let drawObj = getCameraHitCoord();
			if(drawObj != null)
			{
				// let height = betObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
				//drawObj.position.z += height / 2;
				drawObj.position.z = tablesPos[lpCasinoTable][3]+0.95;
				betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, drawObj.position.z, false, false, false);
				
				getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
			}
		}
		
		let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
		let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
		
		let leftAxisX = 0;
		let leftAxisY = 0;
		
		let pos = rouletteCamera.getCoord();
		let rr = rouletteCamera.getDirection();
		let vector = new mp.Vector3(0, 0, 0);
		vector.x = rr.x * leftAxisY;
		vector.y = rr.y * leftAxisY;
		vector.z = rr.z * leftAxisY;
		
		let upVector = new mp.Vector3(0, 0, 1);
		let rightVector = getCrossProduct(getNormalizedVector(rr), getNormalizedVector(upVector));
		rightVector.x *= leftAxisX * 0.5;
		rightVector.y *= leftAxisX * 0.5;
		rightVector.z *= leftAxisX * 0.5;
		
		let rot = rouletteCamera.getRot(2);
		
		let rotx = rot.x + rightAxisY * -5.0;
		if(rotx > 89) rotx = 89;
		if(rotx < -89) rotx = -89;
		
		rouletteCamera.setRot(rotx, 0.0, rot.z + rightAxisX * -5.0, 2);
	}
});
/*
anim_casino_b@amb@casino@games@roulette@dealer idle
anim_casino_b@amb@casino@games@roulette@dealer no_more_bets
anim_casino_b@amb@casino@games@roulette@dealer clear_chips_intro
anim_casino_b@amb@casino@games@roulette@dealer clear_chips_outro
anim_casino_b@amb@casino@games@roulette@dealer spin_wheel
Table:
anim_casino_b@amb@casino@games@roulette@table    intro_ball
anim_casino_b@amb@casino@games@roulette@table    intro_wheel
anim_casino_b@amb@casino@games@roulette@table    loop_ball
anim_casino_b@amb@casino@games@roulette@table    loop_wheel
Za završetak:
anim_casino_b@amb@casino@games@roulette@table   exit_${BROJ_DOBIJENE_LOPTICE}_wheel
anim_casino_b@amb@casino@games@roulette@table   exit_${BROJ_DOBIJENE_LOPTICE}_ball
*/

/*

mp.events.add('spin_wheel', function(tb, needSpins, endTable, endBall){
    RouletteTables[tb].table.playAnim("intro_wheel", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 131072);
    RouletteTables[tb].table.forceAiAndAnimationUpdate();
    const ballPos = RouletteTables[tb].table.getWorldPositionOfBone(RouletteTables[tb].table.getBoneIndexByName("Roulette_Wheel"));
    RouletteTables[tb].ball.position = ballPos;

    RouletteTables[tb].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);
    const ballRot = RouletteTables[tb].table.getRotation(2);
    RouletteTables[tb].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1)
    //RouletteTables[tb].ball.rotation = new mp.Vector3(0.0, 0.0, 0);

    RouletteTables[tb].ball.playAnim("intro_ball", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, false, 0, 136704); // loop, freezeLastFrame, ?
    RouletteTables[tb].ball.forceAiAndAnimationUpdate();

    RouletteTables[tb].spins = 0;
    RouletteTables[tb].lastSpinTime = 0;
    RouletteTables[tb].needSpins = needSpins;
    RouletteTables[tb].endTable = endTable;
    RouletteTables[tb].endBall = endBall;


*/

mp.events.add("spinRouletteWheel", (table, needSpins, endTable, endBall) => {
	rouletteData[table].table.playAnim("intro_wheel", tableLib, 1000.0, false, true, true, 0, 136702); // loop, freezeLastFrame, ?
	rouletteData[table].table.forceAiAndAnimationUpdate();
	

	const ballPos = rouletteData[table].table.getWorldPositionOfBone(rouletteData[table].table.getBoneIndexByName("Roulette_Wheel"));
	rouletteData[table].ball.position = ballPos; //new mp.Vector3(tablesPos[table][1]-0.734742, tablesPos[table][2]-0.26617, tablesPos[table][3]+1.0715); 
	rouletteData[table].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);

	//rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
	const ballRot = rouletteData[table].table.getRotation(2);
    rouletteData[table].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1)
	
	rouletteData[table].ball.playAnim("intro_ball", tableLib, 1000.0, false, true, false, 0, 136704); // loop, freezeLastFrame, ?
	rouletteData[table].ball.forceAiAndAnimationUpdate();

	rouletteData[table].spins = 0;
	rouletteData[table].lastSpinTime = 0;
	rouletteData[table].needSpins = needSpins;

	rouletteNumber(table);

	if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) {
		rouletteData[table].ped.taskPlayAnim(dealerLib, "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
	}
	else {
		rouletteData[table].ped.taskPlayAnim(dealerLibF, "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
	}
	
	
	setTimeout(
		function()
		{
			if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else rouletteData[table].ped.taskPlayAnim(dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
		}, 8000
	);
});

mp.events.add("clearRouletteTable", (table) => 
{
	if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(dealerLib, "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
	else rouletteData[table].ped.taskPlayAnim(dealerLib+"_female", "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
	
	setTimeout(
		function()
		{
			if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else rouletteData[table].ped.taskPlayAnim(dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
		}, 2000
	);
});

mp.keys.bind(0x45, true, () =>  // E
{
	if(mp.gui.cursor.visible || interactingWithTable != null) return false;
	
	if(lpCasinoTable != null)
	{
		//mp.events.callRemote("leaveCasinoSeat");
		rouletteData[lpCasinoTable].table.setCollision(true, false);
		interactingWithTable = lpCasinoTable;
		lpCasinoTable = null;
		BLOCK_CONTROLS_DURING_ANIMATION = false;
		if(rouletteCamera != null) destroyRouletteCamera();
		if(canDoBets) canDoBets = false;
		
		interactingWithTableTimeout = setTimeout(
			function()
			{
				interactingWithTable = null;
				interactingWithTableTimeout = null;
			},4500
		);
	}
	else
	{
		if(casinoTableToJoin == null) return false;
		
		interactingWithTable = casinoTableToJoin;
		
		rouletteData[casinoTableToJoin].table.setCollision(false, false);
		
		localPlayer.position = new mp.Vector3(tablesPos[casinoTableToJoin][1]+tableSeatsPos[casinoSeatToJoin][0], tablesPos[casinoTableToJoin][2]+tableSeatsPos[casinoSeatToJoin][1], tablesPos[casinoTableToJoin][3]+tableSeatsPos[casinoSeatToJoin][2]);
		localPlayer.setHeading(tableSeatsPos[casinoSeatToJoin][3]);
		
		mp.events.call("playerSitAtCasinoTable", localPlayer, casinoTableToJoin);
		
		interactingWithTableTimeout = setTimeout(
			function()
			{
				interactingWithTable = null;
				interactingWithTableTimeout = null;
			},5500
		);
		
		// localPlayer.taskGoStraightToCoord(
			// tablesPos[casinoTableToJoin][1]+tableSeatsPos[casinoSeatToJoin][0],
			// tablesPos[casinoTableToJoin][2]+tableSeatsPos[casinoSeatToJoin][1],
			// tablesPos[casinoTableToJoin][3]+tableSeatsPos[casinoSeatToJoin][2],
			// 1.15, // speed
			// 3000, // timeout
			// tableSeatsPos[casinoSeatToJoin][3], // heading
			// 0.5 // slide (?)
		// );
		
		// setTimeout(
			// function()
			// {
				// if(goToSeatInterval != null)
				// {
					// clearInterval(goToSeatInterval);
					// goToSeatInterval = null;
				// }
			// },3000
		// );
		
		// goToSeatInterval = setInterval(checkPlayerCanSit, 200, casinoTableToJoin, casinoSeatToJoin);
	}	
});

mp.keys.bind(0x46, true, () =>  // F
{		
	if(interactingWithTable != null || lpCasinoTable == null) return;
	
	if(rouletteCamera != null)
	{
		destroyRouletteCamera();
	}
	else
	{
		createRouletteCamera();
		//mp.events.call('initRoulette');
		mp.events.call("spinRouletteWheel", lpCasinoTable, 1, "exit_7_wheel", "exit_7_ball");

        
	}
});

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function rouletteNumber(rouletteId)
{
	let random = getRandomInt(1, 38);
	if(random < 0 || random > 38) { rouletteNumber(rouletteId); return; } 
	rouletteData[rouletteId].endBall = `exit_${random}_ball`;
	rouletteData[rouletteId].endTable = `exit_${random}_wheel`;

}

/*
function rouletteRender() 
{

	for(var i=0; i < rouletteData.length; i++)
	{
		if(rouletteData[i].table.isPlayingAnim(tableLib, "intro_wheel", 3))
		{
			if(rouletteData[i].table.getAnimCurrentTime(tableLib, "intro_wheel") > 0.9425)
			{
				rouletteData[i].table.playAnim("loop_wheel", tableLib, 1000.0, true, true, true, 0, 13704);
				rouletteData[i].table.forceAiAndAnimationUpdate();
			}
		}
		
		if(rouletteData[i].ball.isPlayingAnim(tableLib, "intro_ball", 3))
		{
			if(rouletteData[i].ball.getAnimCurrentTime(tableLib, "intro_ball") > 0.99)
			{
				/*
				rouletteData[i].ball.position = new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.36617, tablesPos[i][3]+1.0715); // new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]+1.0715);
				rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				

				const ballPos = rouletteData[i].table.getWorldPositionOfBone(rouletteData[i].table.getBoneIndexByName("Roulette_Wheel"));
				rouletteData[i].ball.position = ballPos; //new mp.Vector3(tablesPos[table][1]-0.734742, tablesPos[table][2]-0.26617, tablesPos[table][3]+1.0715); 
				rouletteData[i].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);

				//rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				const ballRot = rouletteData[i].table.getRotation(2);
				rouletteData[i].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1);

				rouletteData[i].ball.playAnim("loop_ball", tableLib, 1000.0, true, true, false, 0, 13704);
				rouletteData[i].ball.forceAiAndAnimationUpdate();
			}
		}
		
		if(rouletteData[i].table.isPlayingAnim(tableLib, "loop_wheel", 3))
		{
			if(rouletteData[i].table.getAnimCurrentTime(tableLib, "loop_wheel") >= 0.99 && Date.now()-rouletteData[i].lastSpinTime > 1000)
			{
				rouletteData[i].spins++;
				rouletteData[i].lastSpinTime = Date.now();
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins-1)
			{
				rouletteData[i].ball.setAnimSpeed(tableLib, "loop_ball", 0.71);
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins && rouletteData[i].table.getAnimCurrentTime(tableLib, "loop_wheel") > 0.99)
			{
				rouletteData[i].table.playAnim(rouletteData[i].endTable, tableLib, 1000.0, false, true, true, 0, 1148846080);
				rouletteData[i].table.forceAiAndAnimationUpdate();
				
				
				rouletteData[i].ball.position = new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.36617, tablesPos[i][3]+1.0715); // new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]+1.0715);
				rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				

				const ballPos = rouletteData[i].table.getWorldPositionOfBone(rouletteData[i].table.getBoneIndexByName("Roulette_Wheel"));
				rouletteData[i].ball.position = ballPos; //new mp.Vector3(tablesPos[table][1]-0.734742, tablesPos[table][2]-0.26617, tablesPos[table][3]+1.0715); 
				rouletteData[i].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);

				//rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				const ballRot = rouletteData[i].table.getRotation(2);
				rouletteData[i].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1);

				rouletteData[i].ball.playAnim(rouletteData[i].endBall, tableLib, 1000.0, false, true, true, 0, 1148846080);
				rouletteData[i].ball.forceAiAndAnimationUpdate();
			}
		}
		
	}
}
*/


mp.events.add('render', rouletteRender);
function rouletteRender() 
{
	for(var i=0; i < rouletteData.length; i++)
	{
		if(rouletteData[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel", 3))
		{
			if(rouletteData[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel") > 0.9425)
			{
				rouletteData[i].table.playAnim("loop_wheel", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, true, 0, 131072);
			}
		}
		
		if(rouletteData[i].ball.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_ball", 3))
		{
			if(rouletteData[i].ball.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_ball") > 0.99)
			{
                const ballPos = rouletteData[i].table.getWorldPositionOfBone(rouletteData[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = rouletteData[i].table.getRotation(2);
				rouletteData[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				rouletteData[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				
				rouletteData[i].ball.playAnim("loop_ball", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, false, 0, 136704);
			}
		}
		
		if(rouletteData[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel", 3))
		{
			
			if(rouletteData[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") >= 0.9 && Date.now()-rouletteData[i].lastSpinTime > 1000)
			{
				rouletteData[i].spins++;
				rouletteData[i].lastSpinTime = Date.now();
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins-1)
			{
				rouletteData[i].ball.setAnimSpeed("anim_casino_b@amb@casino@games@roulette@table", "loop_ball", 0.70);
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins && rouletteData[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") > 0.99)
			{
                rouletteData[i].table.playAnim(rouletteData[i].endTable, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 131072);
				
                const ballPos = rouletteData[i].table.getWorldPositionOfBone(rouletteData[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = rouletteData[i].table.getRotation(2);
				rouletteData[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				rouletteData[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				rouletteData[i].ball.playAnim(rouletteData[i].endBall, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 136704);
			}
		}
	}
}

createRouletteCamera = () => 
{
	rouletteCamera = mp.cameras.new('default', new mp.Vector3(tablesPos[lpCasinoTable][1], tablesPos[lpCasinoTable][2]-1, tablesPos[lpCasinoTable][3]+3), new mp.Vector3(0,0,0), 45);
	rouletteCamera.setRot(-75.0, 0.0, 0.0, 2);
	rouletteCamera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
}

destroyRouletteCamera = () => 
{
	rouletteCamera.destroy(true);
	rouletteCamera = null;
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
}

getCameraHitCoord = () =>
{
	let position = rouletteCamera.getCoord();
	let direction = rouletteCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
	let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);
	
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}

getNormalizedVector = (vector) =>
{
	let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
	vector.x = vector.x / mag;
	vector.y = vector.y / mag;
	vector.z = vector.z / mag;
	return vector;
}

getCrossProduct = (v1, v2) =>
{
	let vector = new mp.Vector3(0, 0, 0);
	vector.x = v1.y * v2.z - v1.z * v2.y;
	vector.y = v1.z * v2.x - v1.x * v2.z;
	vector.z = v1.x * v2.y - v1.y * v2.x;
	return vector;
}

getClosestChipSpot = (vector) =>
{
	var spot = null;
	var prevDistance = 0.05;
	var dist = null;
	
	for(var i=0; i < tableChipsOffsets.length; i++)
	{
		//dist = mp.Vector3.getDistanceBetweenPoints3D(vector, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[i][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[i][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[i][2]));
		dist = mp.game.gameplay.getDistanceBetweenCoords(vector.x, vector.y, vector.z, tablesPos[lpCasinoTable][1]+tableChipsOffsets[i][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[i][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[i][2], true);
		if(dist <= prevDistance)
		{
			spot = i;
			prevDistance = dist;
		}
	}
	
	if(spot != closestChipSpot)
	{
		closestChipSpot = spot;
		clearTableMarkers();
		
		if(spot != null)
		{
			var key = null;
			var obj = null;
			for(var i=0; i < tableChipsOffsets[spot][3].length; i++)
			{
				key = tableChipsOffsets[spot][3][i];
				if(key == "00" || key == "0")
				{
					obj = mp.objects.new(269022546, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableMarkersOffsets[key][0], tablesPos[lpCasinoTable][2]+tableMarkersOffsets[key][1], tablesPos[lpCasinoTable][3]+tableMarkersOffsets[key][2]));
					obj.setCollision(false, false);
					tableMarkers.push(obj);
				}
				else
				{
					tableMarkers.push(mp.objects.new(3267450776, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableMarkersOffsets[key][0], tablesPos[lpCasinoTable][2]+tableMarkersOffsets[key][1], tablesPos[lpCasinoTable][3]+tableMarkersOffsets[key][2])));
				}
			}
		}
	}	
}

let tableMarkers = [];
const tableMarkersOffsets =
{
	"0": [-0.137451171875, -0.146942138671875, 0.9449996948242188],
	"00": [-0.1387939453125, 0.10546875, 0.9449996948242188],
	"1": [-0.0560302734375, -0.1898193359375, 0.9449996948242188],
	"2": [-0.0567626953125, -0.024017333984375, 0.9449996948242188],
	"3": [-0.056884765625, 0.141632080078125, 0.9449996948242188],
	"4": [0.02392578125, -0.187347412109375, 0.9449996948242188],
	"5": [0.0240478515625, -0.02471923828125, 0.9449996948242188],
	"6": [0.02392578125, 0.1422119140625, 0.9449996948242188],
	"7": [0.1038818359375, -0.18902587890625, 0.9449996948242188],
	"8": [0.1044921875, -0.023834228515625, 0.9449996948242188],
	"9": [0.10546875, 0.1419677734375, 0.9449996948242188],
	"10": [0.18701171875, -0.188385009765625, 0.9449996948242188],
	"11": [0.18603515625, -0.0238037109375, 0.9449996948242188],
	"12": [0.1851806640625, 0.143157958984375, 0.9449996948242188],
	"13": [0.2677001953125, -0.18780517578125, 0.9449996948242188],
	"14": [0.26806640625, -0.02301025390625, 0.9449996948242188],
	"15": [0.26611328125, 0.143310546875, 0.9449996948242188],
	"16": [0.3497314453125, -0.18829345703125, 0.9449996948242188],
	"17": [0.349609375, -0.023101806640625, 0.9449996948242188],
	"18": [0.3497314453125, 0.142242431640625, 0.9449996948242188],
	"19": [0.4307861328125, -0.18829345703125, 0.9449996948242188],
	"20": [0.4312744140625, -0.02392578125, 0.9449996948242188],
	"21": [0.431884765625, 0.1416015625, 0.9449996948242188],
	"22": [0.51220703125, -0.188873291015625, 0.9449996948242188],
	"23": [0.5123291015625, -0.023773193359375, 0.9449996948242188],
	"24": [0.511962890625, 0.14215087890625, 0.9449996948242188],
	"25": [0.5931396484375, -0.18890380859375, 0.9449996948242188],
	"26": [0.59375, -0.023651123046875, 0.9449996948242188],
	"27": [0.59375, 0.14080810546875, 0.9449996948242188],
	"28": [0.67529296875, -0.189849853515625, 0.9449996948242188],
	"29": [0.6751708984375, -0.02337646484375, 0.9449996948242188],
	"30": [0.674560546875, 0.141845703125, 0.9449996948242188],
	"31": [0.756591796875, -0.18798828125, 0.9449996948242188],
	"32": [0.7547607421875, -0.0234375, 0.9449996948242188],
	"33": [0.7554931640625, 0.14263916015625, 0.9449996948242188],
	"34": [0.836669921875, -0.188323974609375, 0.9449996948242188],
	"35": [0.8365478515625, -0.0244140625, 0.9449996948242188],
	"36": [0.8359375, 0.14276123046875, 0.9449996948242188]
};

const tableChipsOffsets =
[
	[-0.154541015625, -0.150604248046875, 0.9449996948242188, ["0"]],
	[-0.1561279296875, 0.11505126953125, 0.9449996948242188, ["00"]],
	[-0.059326171875, -0.18701171875, 0.9449996948242188, ["1"]],
	[-0.058349609375, -0.019378662109375, 0.9449996948242188, ["2"]],
	[-0.0587158203125, 0.142059326171875, 0.9449996948242188, ["3"]],
	[0.02294921875, -0.1920166015625, 0.9449996948242188, ["4"]],
	[0.023193359375, -0.01947021484375, 0.9449996948242188, ["5"]],
	[0.024658203125, 0.147369384765625, 0.9449996948242188, ["6"]],
	[0.105224609375, -0.1876220703125, 0.9449996948242188, ["7"]],
	[0.1055908203125, -0.028472900390625, 0.9449996948242188, ["8"]],
	[0.10400390625, 0.147430419921875, 0.9449996948242188, ["9"]],
	[0.187744140625, -0.191802978515625, 0.9449996948242188, ["10"]],
	[0.1866455078125, -0.02667236328125, 0.9449996948242188, ["11"]],
	[0.1842041015625, 0.145965576171875, 0.9449996948242188, ["12"]],
	[0.2696533203125, -0.182464599609375, 0.9449996948242188, ["13"]],
	[0.265869140625, -0.027862548828125, 0.9449996948242188, ["14"]],
	[0.2667236328125, 0.138946533203125, 0.9449996948242188, ["15"]],
	[0.35009765625, -0.186126708984375, 0.9449996948242188, ["16"]],
	[0.348876953125, -0.027740478515625, 0.9449996948242188, ["17"]],
	[0.3497314453125, 0.14715576171875, 0.9449996948242188, ["18"]],
	[0.43212890625, -0.17864990234375, 0.9449996948242188, ["19"]],
	[0.4337158203125, -0.02508544921875, 0.9449996948242188, ["20"]],
	[0.430419921875, 0.138336181640625, 0.9449996948242188, ["21"]],
	[0.51416015625, -0.18603515625, 0.9449996948242188, ["22"]],
	[0.5135498046875, -0.02301025390625, 0.9449996948242188, ["23"]],
	[0.5146484375, 0.14239501953125, 0.9449996948242188, ["24"]],
	[0.59130859375, -0.192413330078125, 0.9449996948242188, ["25"]],
	[0.596923828125, -0.022216796875, 0.9449996948242188, ["26"]],
	[0.5924072265625, 0.14385986328125, 0.9449996948242188, ["27"]],
	[0.6749267578125, -0.187286376953125, 0.9449996948242188, ["28"]],
	[0.67431640625, -0.0262451171875, 0.9449996948242188, ["29"]],
	[0.6756591796875, 0.140594482421875, 0.9449996948242188, ["30"]],
	[0.7542724609375, -0.19415283203125, 0.9449996948242188, ["31"]],
	[0.7542724609375, -0.01898193359375, 0.9449996948242188, ["32"]],
	[0.75439453125, 0.1448974609375, 0.9449996948242188, ["33"]],
	[0.8392333984375, -0.18951416015625, 0.9449996948242188, ["34"]],
	[0.837646484375, -0.023468017578125, 0.9449996948242188, ["35"]],
	[0.8380126953125, 0.14227294921875, 0.9449996948242188, ["36"]],
	[-0.1368408203125, -0.02099609375, 0.9449996948242188, ["0","00"]],
	[-0.055419921875, -0.105804443359375, 0.9449996948242188, ["1","2"]],
	[-0.0567626953125, 0.058624267578125, 0.9449996948242188, ["2","3"]],
	[0.02587890625, -0.10498046875, 0.9449996948242188, ["4","5"]],
	[0.0244140625, 0.058837890625, 0.9449996948242188, ["5","6"]],
	[0.100341796875, -0.10382080078125, 0.9449996948242188, ["7","8"]],
	[0.1064453125, 0.06011962890625, 0.9449996948242188, ["8","9"]],
	[0.19189453125, -0.1060791015625, 0.9449996948242188, ["10","11"]],
	[0.1856689453125, 0.05438232421875, 0.9449996948242188, ["11","12"]],
	[0.27099609375, -0.10870361328125, 0.9449996948242188, ["13","14"]],
	[0.2667236328125, 0.058502197265625, 0.9449996948242188, ["14","15"]],
	[0.3463134765625, -0.107696533203125, 0.9449996948242188, ["16","17"]],
	[0.34814453125, 0.0556640625, 0.9449996948242188, ["17","18"]],
	[0.42822265625, -0.109130859375, 0.9449996948242188, ["19","20"]],
	[0.4302978515625, 0.0550537109375, 0.9449996948242188, ["20","21"]],
	[0.511474609375, -0.107421875, 0.9449996948242188, ["22","23"]],
	[0.512451171875, 0.0614013671875, 0.9449996948242188, ["23","24"]],
	[0.5980224609375, -0.107147216796875, 0.9449996948242188, ["25","26"]],
	[0.596435546875, 0.0574951171875, 0.9449996948242188, ["26","27"]],
	[0.673828125, -0.106903076171875, 0.9449996948242188, ["28","29"]],
	[0.6751708984375, 0.058685302734375, 0.9449996948242188, ["29","30"]],
	[0.7532958984375, -0.1102294921875, 0.9449996948242188, ["31","32"]],
	[0.750244140625, 0.06103515625, 0.9449996948242188, ["32","33"]],
	[0.834716796875, -0.108978271484375, 0.9449996948242188, ["34","35"]],
	[0.836181640625, 0.05828857421875, 0.9449996948242188, ["35","36"]],
	[-0.0167236328125, -0.187042236328125, 0.9449996948242188, ["1","4"]],
	[-0.0167236328125, -0.02154541015625, 0.9449996948242188, ["2","5"]],
	[-0.0164794921875, 0.140350341796875, 0.9449996948242188, ["3","6"]],
	[0.064453125, -0.1865234375, 0.9449996948242188, ["4","7"]],
	[0.06494140625, -0.01727294921875, 0.9449996948242188, ["5","8"]],
	[0.068603515625, 0.13873291015625, 0.9449996948242188, ["6","9"]],
	[0.144287109375, -0.184173583984375, 0.9449996948242188, ["7","10"]],
	[0.14501953125, -0.024139404296875, 0.9449996948242188, ["8","11"]],
	[0.14501953125, 0.136993408203125, 0.9449996948242188, ["9","12"]],
	[0.2291259765625, -0.18670654296875, 0.9449996948242188, ["10","13"]],
	[0.227783203125, -0.0242919921875, 0.9449996948242188, ["11","14"]],
	[0.2286376953125, 0.14398193359375, 0.9449996948242188, ["12","15"]],
	[0.308349609375, -0.18792724609375, 0.9449996948242188, ["13","16"]],
	[0.308837890625, -0.02374267578125, 0.9449996948242188, ["14","17"]],
	[0.3099365234375, 0.14410400390625, 0.9449996948242188, ["15","18"]],
	[0.39111328125, -0.192230224609375, 0.9449996948242188, ["16","19"]],
	[0.390869140625, -0.0189208984375, 0.9449996948242188, ["17","20"]],
	[0.39111328125, 0.146514892578125, 0.9449996948242188, ["18","21"]],
	[0.470947265625, -0.188690185546875, 0.9449996948242188, ["19","22"]],
	[0.4705810546875, -0.0205078125, 0.9449996948242188, ["20","23"]],
	[0.4725341796875, 0.140167236328125, 0.9449996948242188, ["21","24"]],
	[0.5491943359375, -0.189666748046875, 0.9449996948242188, ["22","25"]],
	[0.548095703125, -0.022552490234375, 0.9449996948242188, ["23","26"]],
	[0.553955078125, 0.1446533203125, 0.9449996948242188, ["24","27"]],
	[0.6324462890625, -0.191131591796875, 0.9449996948242188, ["25","28"]],
	[0.635498046875, -0.0224609375, 0.9449996948242188, ["26","29"]],
	[0.6392822265625, 0.139190673828125, 0.9449996948242188, ["27","30"]],
	[0.71533203125, -0.187042236328125, 0.9449996948242188, ["28","31"]],
	[0.7181396484375, -0.02447509765625, 0.9449996948242188, ["29","32"]],
	[0.7152099609375, 0.138153076171875, 0.9449996948242188, ["30","33"]],
	[0.7969970703125, -0.1904296875, 0.9449996948242188, ["31","34"]],
	[0.7955322265625, -0.024871826171875, 0.9449996948242188, ["32","35"]],
	[0.7960205078125, 0.137664794921875, 0.9449996948242188, ["33","36"]],
	[-0.0560302734375, -0.271240234375, 0.9449996948242188, ["1","2","3"]],
	[0.024658203125, -0.271392822265625, 0.9449996948242188, ["4","5","6"]],
	[0.1051025390625, -0.272125244140625, 0.9449996948242188, ["7","8","9"]],
	[0.1898193359375, -0.27001953125, 0.9449996948242188, ["10","11","12"]],
	[0.2696533203125, -0.271697998046875, 0.9449996948242188, ["13","14","15"]],
	[0.351318359375, -0.268096923828125, 0.9449996948242188, ["16","17","18"]],
	[0.4287109375, -0.269561767578125, 0.9449996948242188, ["19","20","21"]],
	[0.5098876953125, -0.2716064453125, 0.9449996948242188, ["22","23","24"]],
	[0.5960693359375, -0.271148681640625, 0.9449996948242188, ["25","26","27"]],
	[0.67724609375, -0.268524169921875, 0.9449996948242188, ["28","29","30"]],
	[0.7523193359375, -0.27227783203125, 0.9449996948242188, ["31","32","33"]],
	[0.8382568359375, -0.272125244140625, 0.9449996948242188, ["34","35","36"]],
	[-0.017333984375, -0.106170654296875, 0.9449996948242188, ["1","2","4","5"]],
	[-0.0162353515625, 0.060882568359375, 0.9449996948242188, ["2","3","5","6"]],
	[0.06591796875, -0.110107421875, 0.9449996948242188, ["4","5","7","8"]],
	[0.0653076171875, 0.060028076171875, 0.9449996948242188, ["5","6","8","9"]],
	[0.146484375, -0.10888671875, 0.9449996948242188, ["7","8","10","11"]],
	[0.1451416015625, 0.057159423828125, 0.9449996948242188, ["8","9","11","12"]],
	[0.22705078125, -0.1092529296875, 0.9449996948242188, ["10","11","13","14"]],
	[0.22802734375, 0.059356689453125, 0.9449996948242188, ["11","12","14","15"]],
	[0.307373046875, -0.1043701171875, 0.9449996948242188, ["13","14","16","17"]],
	[0.309814453125, 0.05584716796875, 0.9449996948242188, ["14","15","17","18"]],
	[0.3919677734375, -0.111083984375, 0.9449996948242188, ["16","17","19","20"]],
	[0.3924560546875, 0.0596923828125, 0.9449996948242188, ["17","18","20","21"]],
	[0.471923828125, -0.1044921875, 0.9449996948242188, ["19","20","22","23"]],
	[0.4698486328125, 0.060028076171875, 0.9449996948242188, ["20","21","23","24"]],
	[0.5531005859375, -0.106170654296875, 0.9449996948242188, ["22","23","25","26"]],
	[0.5546875, 0.059417724609375, 0.9449996948242188, ["23","24","26","27"]],
	[0.633544921875, -0.101531982421875, 0.9449996948242188, ["25","26","28","29"]],
	[0.6337890625, 0.0579833984375, 0.9449996948242188, ["26","27","29","30"]],
	[0.7156982421875, -0.106292724609375, 0.9449996948242188, ["28","29","31","32"]],
	[0.7158203125, 0.0604248046875, 0.9449996948242188, ["29","30","32","33"]],
	[0.7947998046875, -0.108642578125, 0.9449996948242188, ["31","32","34","35"]],
	[0.7952880859375, 0.059051513671875, 0.9449996948242188, ["32","33","35","36"]],
	[-0.099609375, -0.2711181640625, 0.9449996948242188, ["0","00","1","2","3"]],
	[-0.0147705078125, -0.27154541015625, 0.9449996948242188, ["1","2","3","4","5","6"]],
	[0.064697265625, -0.270263671875, 0.9449996948242188, ["4","5","6","7","8","9"]],
	[0.144775390625, -0.271209716796875, 0.9449996948242188, ["7","8","9","10","11","12"]],
	[0.226806640625, -0.27142333984375, 0.9449996948242188, ["10","11","12","13","14","15"]],
	[0.306396484375, -0.27142333984375, 0.9449996948242188, ["13","14","15","16","17","18"]],
	[0.3895263671875, -0.27099609375, 0.9449996948242188, ["16","17","18","19","20","21"]],
	[0.468017578125, -0.275238037109375, 0.9449996948242188, ["19","20","21","22","23","24"]],
	[0.5509033203125, -0.2738037109375, 0.9449996948242188, ["22","23","24","25","26","27"]],
	[0.6336669921875, -0.27386474609375, 0.9449996948242188, ["25","26","27","28","29","30"]],
	[0.7144775390625, -0.272186279296875, 0.9449996948242188, ["28","29","30","31","32","33"]],
	[0.7935791015625, -0.272918701171875, 0.9449996948242188, ["31","32","33","34","35","36"]],
	[0.0643310546875, -0.304718017578125, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12"]], //1st12
	[0.392822265625, -0.304779052734375, 0.9449996948242188, ["13","14","15","16","17","18","19","20","21","22","23","24"]],//2nd12
	[0.712158203125, -0.30303955078125, 0.9449996948242188, ["25","26","27","28","29","30","31","32","33","34","35","36"]],//3rd12
	[0.9222412109375, -0.185882568359375, 0.9449996948242188, ["1","4","7","10","13","16","19","22","25","28","31","34"]],//2to1
	[0.9229736328125, -0.0181884765625, 0.9449996948242188, ["2","5","8","11","14","17","20","23","26","29","32","35"]],//2to1
	[0.9248046875, 0.14849853515625, 0.9449996948242188, ["3","6","9","12","15","18","21","24","27","30","33","36"]],//2to1
	[-0.011474609375, -0.378875732421875, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]],//1-18
	[0.142822265625, -0.375732421875, 0.9449996948242188, ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]], //even
	[0.308349609375, -0.37542724609375, 0.9449996948242188, ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]],//red
	[0.4713134765625, -0.376861572265625, 0.9449996948242188, ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]],//black
	[0.6341552734375, -0.376495361328125, 0.9449996948242188, ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]],//odd
	[0.7926025390625, -0.382232666015625, 0.9449996948242188, ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]]//19-36
];

clearTableMarkers = () =>
{
	for(var i=0; i < tableMarkers.length; i++)
	{
		tableMarkers[i].destroy();
	}
	tableMarkers = [];
}

mp.events.add("chipsserver", (toggle, cheapprop) => {
	if(money <=15000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver2", (toggle,money) => {
	
		if(money <=15000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver3", (toggle,money) => {
	
	if(money <=15000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver4", (toggle,money) => {
	
	if(money <=15000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver5", (toggle,money) => {
	
	if(money <=15000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("deleteObjectsd", () => {
	
	objectg.destroy();
	objectg = null;
	
});
mp.events.add("deleteObjectsd2", () => {
    objectgg.destroy();
	objectgg = null;
});
mp.events.add("deleteObjectsd3", () => {
    objectggg.destroy();
	objectggg = null;
});
mp.events.add("deleteObjectsd4", () => {

    objectgggg.destroy();
	objectgggg = null;

});
mp.events.add("deleteObjectsd5", () => {

    objectggggg.destroy();
	objectggggg = null;
});
/*
mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
	mp.gui.chat.push("Mouse X:" + x + " | Mouse Y:" + y); // Displays mouse position on click.
	
	const camera = mp.cameras.new("gameplay");
	var entity = GetPlayerClickData(x, y, camera.getDirection());
	mp.gui.chat.push(`1`);
	if (entity != null) {
		mp.gui.chat.push(`Nasao ${entity}`);
	}
	mp.gui.chat.push(`2`);

});


GetPlayerClickData = (x, y, direction) =>
{
	 let pos3d = mp.game.graphics.screen2dToWorld3d(new mp.Vector3(x, y, 0));
    let farAway = new mp.Vector3((direction.x * 150) + pos3d.x, (direction.y * 150) + pos3d.y, (direction.z * 150) + pos3d.z);
    let hitData = mp.raycasting.testPointToPoint(pos3d, farAway, mp.players.local);
    
    if(hitData != undefined)
    {
        return hitData;
    }
    return null;
}*/

/*
mp.game.streaming.requestIpl('vw_casino_main');
mp.game.streaming.requestIpl('vw_casino_garage');
mp.game.streaming.requestIpl('vw_casino_penthouse');
mp.game.streaming.requestIpl('hei_dlc_windows_casino');
mp.game.streaming.requestIpl('hei_dlc_casino_door');
*/
/*
const CASINO_INTERIOR = mp.game.interior.getInteriorAtCoords(1295.000, 230.000, -50.000);
const CASINO_PROPS = [
	'vw_prop_vw_luckylight_on ',
	'vw_prop_vw_luckywheel_02a',
	'casino_manager_default',
	'casino_manager_workout'
];

for (const PROP of CASINO_PROPS) {
    mp.game.interior.enableInteriorProp(CASINO_INTERIOR, PROP);
}

mp.game.interior.refreshInterior(CASINO_INTERIOR);
*/

/***/ }),

/***/ 5415:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

mp.Vector3.getDistanceBetweenPoints3D = function (v1, v2) {
  return Math.abs(
    Math.sqrt(
      Math.pow(v2.x - v1.x, 2) +
        Math.pow(v2.y - v1.y, 2) +
        Math.pow(v2.z - v1.z, 2)
    )
  );
}; // function calculating the distance between two points in the space X; Y; Z;

//global.chren = mp.browsers.new('package://browser/modules/Bets/chren.html')
let lpCasinoTable = null;
let casinoTableToJoin = null;
let casinoSeatToJoin = null;
let goToSeatInterval = null;
let interactingWithTable = null;
let rouletteCamera = null;
let canDoBets = false;
let betObject = null;
let closestChipSpot = null;
let interactingWithTableTimeout = null;
var objectg = null;
var objectgg = null;
var objectggg = null;
var objectgggg = null;
var objectggggg = null;


mp.blips.new(617, new mp.Vector3(935.8140869140625, 46.942176818847656, 81.09580993652344), { name: "Diamond Casino", color: 83, shortRange: true, scale: 1.0 });


let tablesPos = 
[
	[ "vw_prop_casino_roulette_01", 1144.4254150390625, 269.3034973144531, -52.880850830078125 ],
	[ "vw_prop_casino_roulette_01", 1151.2305908203125, 263.14093017578125, -52.880850830078125 ],
	[ "vw_prop_casino_roulette_01b", 1148.9163818359375, 248.62892150878906, -52.08075408935547 ],
	[ "vw_prop_casino_roulette_01b", 1143.677978515625, 251.36131286621094, -52.0807502746582 ],
	[ "vw_prop_casino_roulette_01b", 1133.1802978515625, 262.3916320800781, -52.08075408935547 ], 
	[ "vw_prop_casino_roulette_01b", 1129.9976806640625, 266.93695068359375, -52.0807502746582 ], 
];

let tablesBets = 
(/* unused pure expression or super */ null && ([
	[ 5000, 50000 ],
	[ 10000, 200000 ],
	[ 10000, 500000 ],
	[ 20000, 500000 ],
	[ 50000, 1000000 ],
	[ 100000, 1000000 ]
]));

let pedModels =
[
	"S_M_Y_Casino_01", "S_F_Y_Casino_01", "S_M_Y_Casino_01", "S_F_Y_Casino_01", "S_M_Y_Casino_01", "S_F_Y_Casino_01"
]


__webpack_require__.g.loadAnim = function(dict)
{
	new Promise((resolve, reject) => {

		const timer = setInterval(() => {

			if(mp.game.streaming.hasAnimDictLoaded(dict))
			{
				//mp.gui.chat.push(`Anim ${dict} has been loaded!`);
				clearInterval(timer);
				resolve();
			}
			else
			{
				//mp.gui.chat.push(`Anim ${dict} is not loaded`);
				mp.game.streaming.requestAnimDict(dict);
			}

		}, 300);
	});
}





//chips change
mp.peds.new(mp.game.joaat("S_F_Y_Casino_01"), new mp.Vector3(1117.7528076171875, 220.12098693847656, -49.43511962890625), 90.0, 0);
//mp.labels.new("Beverly", new mp.Vector3(1117.7528076171875, 220.12098693847656, -49.43511962890625+1.1), { los: true, font: 0, drawDistance: 5.0 } );



// [ //barman m
	// [ 0, 3, 0, 0],
	// [ 1, 1, 0, 0],
	// [ 2, 3, 0, 0],
	// [ 3, 1, 0, 0],
	// [ 4, 0, 0, 0],
	// [ 6, 1, 0, 0],
	// [ 7, 2, 0, 0],
	// [ 8, 3, 0, 0],
	// [ 10, 1, 0, 0],
	// [ 11, 1, 0, 0],
// ],
// [ //barman m
		// [ 0, 2, 0, 0],
		// [ 1, 1, 0, 0],
		// [ 2, 3, 0, 0],
		// [ 3, 1, 3, 0],
		// [ 4, 0, 0, 0],
		// [ 6, 1, 0, 0],
		// [ 7, 2, 0, 0],
		// [ 8, 3, 0, 0],
		// [ 10, 1, 0, 0],
		// [ 11, 1, 0, 0],
	// ]
	// [//barman m
		// [ 0, 4, 1, 0],
		// [ 1, 1, 0, 0],
		// [ 2, 4, 0, 0],
		// [ 3, 1, 0, 0],
		// [ 4, 0, 0, 0],
		// [ 6, 1, 0, 0],
		// [ 7, 2, 0, 0],
		// [ 8, 3, 0, 0],
		// [ 10, 1, 0, 0],
		// [ 11, 1, 0, 0],
	// ]
	// [//barman f
		// [ 0, 1, 1, 0],
		// [ 1, 0, 0, 0],
		// [ 2, 1, 0, 0],
		// [ 3, 0, 3, 0],
		// [ 4, 0, 0, 0],
		// [ 6, 0, 0, 0],
		// [ 7, 0, 0, 0],
		// [ 8, 0, 0, 0],
		// [ 10, 0, 0, 0],
		// [ 11, 0, 0, 0],
	// ]
	// [//barman f
		// [ 0, 1, 1, 0],
		// [ 1, 0, 0, 0],
		// [ 2, 1, 1, 0],
		// [ 3, 1, 3, 0],
		// [ 4, 0, 0, 0],
		// [ 6, 0, 0, 0],
		// [ 7, 2, 0, 0],
		// [ 8, 1, 0, 0],
		// [ 10, 0, 0, 0],
		// [ 11, 0, 0, 0],
	// ]
	// [//barman f
		// [ 0, 3, 0, 0],
		// [ 1, 0, 0, 0],
		// [ 2, 3, 0, 0],
		// [ 3, 0, 1, 0],
		// [ 4, 1, 0, 0],
		// [ 6, 1, 0, 0],
		// [ 7, 1, 0, 0],
		// [ 8, 0, 0, 0],
		// [ 10, 0, 0, 0],
		// [ 11, 0, 0, 0],
	// ]
	// [//barman f
		// [ 0, 3, 1, 0],
		// [ 1, 0, 0, 0],
		// [ 2, 3, 1, 0],
		// [ 3, 1, 1, 0],
		// [ 4, 1, 0, 0],
		// [ 6, 1, 0, 0],
		// [ 7, 2, 0, 0],
		// [ 8, 1, 0, 0],
		// [ 10, 0, 0, 0],
		// [ 11, 0, 0, 0],
	// ]

let pedModelVariations =
[
	[ //S_M_Y_Casino_01
		[ 0, 2, 2, 0],
		[ 1, 1, 0, 0],
		[ 2, 4, 0, 0],
		[ 3, 0, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 2, 0, 0],
		[ 1, 0, 0, 0],
		[ 2, 2, 0, 0],
		[ 3, 2, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 0, 0, 0],
		[ 7, 0, 0, 0],
		[ 8, 2, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01
		[ 0, 2, 1, 0],
		[ 1, 1, 0, 0],
		[ 2, 2, 0, 0],
		[ 3, 0, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 2, 1, 0],
		[ 1, 0, 0, 0],
		[ 2, 2, 1, 0],
		[ 3, 3, 3, 0],
		[ 4, 1, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 3, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01
		[ 0, 4, 2, 0],
		[ 1, 1, 0, 0],
		[ 2, 3, 0, 0],
		[ 3, 0, 0, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 4, 0, 0],
		[ 1, 0, 0, 0],
		[ 2, 4, 0, 0],
		[ 3, 2, 1, 0],
		[ 4, 1, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 1, 0, 0],
		[ 8, 2, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01 (not used)
		[ 0, 4, 0, 0],
		[ 1, 1, 0, 0],
		[ 2, 0, 0, 0],
		[ 3, 0, 0, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	]
]

let tableSeatsPos =
[
	[-0.7, -1.28, 1, 0],
	[0.775, -1.68, 1, 0],
	[1.88, -0.63, 1, 90],
	[1.27, 1.05, 1, 180]
]



let tablebetsnew =
[
   [ 5000, 15000, 25000, 35000, 50000 ],
   [ 10000, 50000, 100000, 150000, 200000 ],
   [ 10000, 50000, 100000, 150000, 200000 ],
   [ 20000, 100000, 200000, 350000, 500000 ],
   [ 50000, 250000, 500000, 750000, 1000000 ],
   [ 100000, 250000, 500000, 750000, 1000000 ]
];



let money = 0;
let bet = 0;
mp.keys.bind(0x44, true, () =>  // D
{
    //if(!localplayer.getVariable('ingames')) return;
    if(bet >= 4) bet = 0;
    else bet++;
    money = tablebetsnew[lpCasinoTable][bet];
    //chren.execute(`chren.bet='${money}'`);
	mp.gui.chat.push(`Bet is: ${money}`);
});
mp.keys.bind(0x41, true, () =>  // A
{
    //if(!localplayer.getVariable('ingames')) return;
    if(bet == 0) bet = 4;
    else bet--;
    money = tablebetsnew[lpCasinoTable][bet];
    //chren.execute(`chren.bet='${money}'`);
	mp.gui.chat.push(`Bet is: ${money}`);
});


mp.events.add('casinomoney', function (temp, amount) {
    let balance = temp.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    //chren.execute(`chren.balance='${balance}'`);
	mp.gui.chat.push(`Balance is: ${balance}`);
});
mp.events.add('seatsactive',() => {
	if(casinoTableToJoin != null){
     rouletteData[casinoTableToJoin].table.setCollision(false, false);
     money = tablebetsnew[casinoTableToJoin][0];
	 //chren.execute('chren.show = true');
	 //chren.execute(`chren.minbet='${tablesBets[casinoTableToJoin][0]}'`);
	 //chren.execute(`chren.maxbet='${tablesBets[casinoTableToJoin][1]}'`);
	 //chren.execute(`chren.bet='${money}'`);
	 mp.events.call('showHUD', false);
	}
});



mp.events.add('seatsdisable', () => {
	 //chren.execute('chren.show = false');
	 mp.events.call('showHUD', true);
});



let rouletteData = [];

for(var i=0; i < tablesPos.length; i++)
{
	rouletteData[i] = {};
	rouletteData[i].table = mp.objects.new(mp.game.joaat(tablesPos[i][0]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2], tablesPos[i][3]));
	rouletteData[i].ball = mp.objects.new(87196104, new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]));
	rouletteData[i].ped = mp.peds.new(mp.game.joaat(pedModels[i]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2]+0.7, tablesPos[i][3]+1), 180, 0); //-0.001587
	rouletteData[i].ped.croupier = i;
	
	for(var c=0; c < tableSeatsPos.length; c++)
	{
		var newShape = mp.colshapes.newSphere(tablesPos[i][1]+tableSeatsPos[c][0], tablesPos[i][2]+tableSeatsPos[c][1], tablesPos[i][3]+tableSeatsPos[c][2], 0.8);
		mp.markers.new(1, new mp.Vector3(tablesPos[i][1]+tableSeatsPos[c][0], tablesPos[i][2]+tableSeatsPos[c][1], tablesPos[i][3]+tableSeatsPos[c][2]-1.7), 0.1);
		color = [239, 22, 14, 1];
		newShape.casinoTable = i;
		newShape.seatID = c;
	}
	
	for(var c=0; c < pedModelVariations[i].length; c++)
	{
		rouletteData[i].ped.setComponentVariation(pedModelVariations[i][c][0], pedModelVariations[i][c][1], pedModelVariations[i][c][2], pedModelVariations[i][c][3]);
	}
}

mp.events.add('playerEnterColshape', (shape) => {

	if(shape.casinoTable !== undefined && lpCasinoTable == null && interactingWithTable == null)
	{
		casinoTableToJoin = shape.casinoTable;
		casinoSeatToJoin = shape.seatID;

		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
        mp.gui.execute(`HUD.hint=true`);
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(shape.casinoTable !== undefined)
	{
		casinoTableToJoin = null;
		casinoSeatToJoin = null;
	}
});







let animInfo = null;
mp.events.add("initRoulette", (jsonString) => 
{
	animInfo = JSON.parse(jsonString);
	
	loadAnim(animInfo.tableLib);
	loadAnim(animInfo.dealerLib);
	loadAnim(animInfo.dealerLib+"_female");
	
	mp.events.add("render", rouletteRender);
	
	mp.events.add('entityStreamIn', (entity) => {
		if(entity.type == "ped" && entity.croupier != null) 
		{
			if(entity.model == mp.game.joaat('S_M_Y_Casino_01')) entity.taskPlayAnim(animInfo.dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else entity.taskPlayAnim(animInfo.dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			
			
			
			var id = entity.croupier;
			
			rouletteData[id].ball.position = new mp.Vector3(tablesPos[id][1]-0.734742, tablesPos[id][2]-0.16617, tablesPos[id][3]);
			
			for(var c=0; c < pedModelVariations[id].length; c++)
			{
				entity.setComponentVariation(pedModelVariations[id][c][0], pedModelVariations[id][c][1], pedModelVariations[id][c][2], pedModelVariations[id][c][3]);
			}
		}
	});
});

function rouletteRender() 
{
	
	for(var i=0; i < rouletteData.length; i++)
	{
		if(rouletteData[i].table.isPlayingAnim(animInfo.tableLib, animInfo.tableStart, 3))
		{
			if(rouletteData[i].table.getAnimCurrentTime(animInfo.tableLib, animInfo.tableStart) > 0.9425)
			{
				rouletteData[i].table.playAnim(animInfo.tableMain, animInfo.tableLib, 1000.0, true, true, true, 0, animInfo.speed);
			}
		}
		
		if(rouletteData[i].ball.isPlayingAnim(animInfo.tableLib, animInfo.ballStart, 3))
		{
			if(rouletteData[i].ball.getAnimCurrentTime(animInfo.tableLib, animInfo.ballStart) > 0.99)
			{
				rouletteData[i].ball.position = new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]+1.0715);
				rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, animInfo.ballRot);
				
				rouletteData[i].ball.playAnim(animInfo.ballMain, animInfo.tableLib, 1000.0, true, true, false, 0, animInfo.speed);
			}
		}
		
		if(rouletteData[i].table.isPlayingAnim(animInfo.tableLib, animInfo.tableMain, 3))
		{
			
			if(rouletteData[i].table.getAnimCurrentTime(animInfo.tableLib, animInfo.tableMain) >= 0.9 && Date.now()-rouletteData[i].lastSpinTime > 1000)
			{
				rouletteData[i].spins++;
				rouletteData[i].lastSpinTime = Date.now();
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins-1)
			{
				rouletteData[i].ball.setAnimSpeed(animInfo.tableLib, animInfo.ballMain, 0.71);
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins && rouletteData[i].table.getAnimCurrentTime(animInfo.tableLib, animInfo.tableMain) > 0.99)
			{
				rouletteData[i].table.playAnim(rouletteData[i].endTable, animInfo.tableLib, 1000.0, false, true, true, 0, animInfo.speed);
				
				rouletteData[i].ball.position = new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]+1.0715);
				rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, animInfo.ballRot);
				rouletteData[i].ball.playAnim(rouletteData[i].endBall, animInfo.tableLib, 1000.0, false, true, true, 0, animInfo.speed);
			}
		}
	}
}




mp.keys.bind(0x45, true, () =>  // E
{
		
	if(mp.players.local.isDead() || mp.gui.cursor.visible || interactingWithTable != null) return false;
	
	if(lpCasinoTable != null)
	{
		mp.events.callRemote("leaveCasinoSeat",casinoTableToJoin,casinoSeatToJoin);
		interactingWithTable = lpCasinoTable;
		rouletteData[lpCasinoTable].table.setCollision(true, false);
		lpCasinoTable = null;
		if(rouletteCamera != null) destroyRouletteCamera();
		if(canDoBets) canDoBets = false;
		interactingWithTableTimeout = setTimeout(
			function()
			{
				interactingWithTable = null;
				interactingWithTableTimeout = null;
			},2000
		);
	}
	else
	{
		if(casinoTableToJoin == null) return false;
		
		interactingWithTable = casinoTableToJoin;
		money = tablebetsnew[casinoTableToJoin][0];
		
		//mp.players.local.position = new mp.Vector3(tablesPos[casinoTableToJoin][1]+tableSeatsPos[casinoSeatToJoin][0], tablesPos[casinoTableToJoin][2]+tableSeatsPos[casinoSeatToJoin][1], tablesPos[casinoTableToJoin][3]+tableSeatsPos[casinoSeatToJoin][2]);
		mp.players.local.setHeading(tableSeatsPos[casinoSeatToJoin][3]);
		
		
		mp.events.callRemote("occupyCasinoSeat", casinoTableToJoin, casinoSeatToJoin);
		
		interactingWithTableTimeout = setTimeout(
			function()
			{
				interactingWithTable = null;
				interactingWithTableTimeout = null;
				//rouletteData[lpCasinoTable].table.setCollision(true, false);
			},2000
		);
		
		// mp.players.local.taskGoStraightToCoord(
			// tablesPos[casinoTableToJoin][1]+tableSeatsPos[casinoSeatToJoin][0],
			// tablesPos[casinoTableToJoin][2]+tableSeatsPos[casinoSeatToJoin][1],
			// tablesPos[casinoTableToJoin][3]+tableSeatsPos[casinoSeatToJoin][2],
			// 1.15, // speed
			// 3000, // timeout
			// tableSeatsPos[casinoSeatToJoin][3], // heading
			// 0.5 // slide (?)
		// );
		
		// setTimeout(
			// function()
			// {
				// if(goToSeatInterval != null)
				// {
					// clearInterval(goToSeatInterval);
					// goToSeatInterval = null;
				// }
			// },3000
		// );
		
		// goToSeatInterval = setInterval(checkPlayerCanSit, 200, casinoTableToJoin, casinoSeatToJoin);
	}	
});






mp.events.add("cancelInteractingWithTable", () => 
{
	rouletteData[interactingWithTable].table.setCollision(true, false);
	interactingWithTable = null;
	if(interactingWithTableTimeout != null)
	{
		clearTimeout(interactingWithTableTimeout);
		interactingWithTableTimeout = null;
	}
});

// function checkPlayerCanSit(table, seat)
// {
	// var heading = mp.players.local.getHeading();
	// if(mp.Vector3.getDistanceBetweenPoints3D(mp.players.local.position, new mp.Vector3(tablesPos[table][1]+tableSeatsPos[seat][0], tablesPos[table][2]+tableSeatsPos[seat][1], tablesPos[table][3]+tableSeatsPos[seat][2])) < 0.01 )
	// {
		// mp.players.local.setHeading(tableSeatsPos[seat][3]);
		// mp.events.callRemote("occupyCasinoSeat", table, seat);
		// clearInterval(goToSeatInterval);
		// goToSeatInterval = null;
		
		// interactingWithTableTimeout = setTimeout(
			// function()
			// {
				// interactingWithTable = null;
				// interactingWithTableTimeout = null;
			// },5500
		// );
	// }
// }

mp.events.add('playerDeath', (player) => 
{
	if(player == mp.players.local) 
	{
		if(interactingWithTable != null) interactingWithTable = null;
		if(rouletteCamera != null) destroyRouletteCamera();
		if(canDoBets) canDoBets = false;
	}
});





mp.events.add("playerSitAtCasinoTable", (player, tableID) => {
	
	if(player == mp.players.local) 
	{
		lpCasinoTable = casinoTableToJoin;
		//mp.game.graphics.notify(`~g~ЛКМ - сделать ставку J - вид на стол`);
	}
	else
	{
		rouletteData[tableID].table.setNoCollision(player.handle, false);
	}
});

// mp.events.add("playerLeaveCasinoTable", (player, tableID) => {
	
	// rouletteData[tableID].table.setCollision(true, false);
// });

mp.events.add("rouletteAllowBets", (toggle) => {
	
	canDoBets = toggle;
	//if(toggle) mp.gui.execute(`HUD.hint=true`);
	//else mp.gui.execute(`HUD.hint=true`);
});
mp.events.add("chipsserver", (toggle, cheapprop) => {
	if(money <=15000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver2", (toggle,money) => {
	
		if(money <=15000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectgg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver3", (toggle,money) => {
	
	if(money <=15000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver4", (toggle,money) => {
	
	if(money <=15000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectgggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("chipsserver5", (toggle,money) => {
	
	if(money <=15000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=20000 && money <= 80000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money >=90000 && money <= 190000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
	if(money <=350000 && money >= 200000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_500dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money <=800000 && money >= 400000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_5kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
    if(money >=800000)
	{
	objectggggg = mp.objects.new(mp.game.joaat("vw_prop_chip_10kdollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[toggle][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[toggle][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[toggle][2]))
	}
});
mp.events.add("deleteObjectsd", () => {
	
	objectg.destroy();
	objectg = null;
	
});
mp.events.add("deleteObjectsd2", () => {
    objectgg.destroy();
	objectgg = null;
});
mp.events.add("deleteObjectsd3", () => {
    objectggg.destroy();
	objectggg = null;
});
mp.events.add("deleteObjectsd4", () => {

    objectgggg.destroy();
	objectgggg = null;

});
mp.events.add("deleteObjectsd5", () => {

    objectggggg.destroy();
	objectggggg = null;
});







mp.events.add("spinRouletteWheel", (table, needSpins, endTable, endBall) => {
	
	rouletteData[table].table.playAnim(animInfo.tableStart, animInfo.tableLib, 1000.0, false, true, true, 0, animInfo.speed); // loop, freezeLastFrame, ?
	
	rouletteData[table].ball.position = new mp.Vector3(tablesPos[table][1]-0.734742, tablesPos[table][2]-0.16617, tablesPos[table][3]+1.0715);
	rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, animInfo.ballRot);
	
	rouletteData[table].ball.playAnim(animInfo.ballStart, animInfo.tableLib, 1000.0, false, true, false, 0, animInfo.speed); // loop, freezeLastFrame, ?
	rouletteData[table].spins = 0;
	rouletteData[table].lastSpinTime = 0;
	rouletteData[table].needSpins = needSpins;
	rouletteData[table].endTable = endTable;
	rouletteData[table].endBall = endBall;
	
	if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib, "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
	else rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib+"_female", "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
	
	setTimeout(
		function()
		{
			if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
		}, 8000
	);
});

mp.events.add("clearRouletteTable", (table) => 
{
	if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib, "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
	else rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib+"_female", "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
	
	setTimeout(
		function()
		{
			if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else rouletteData[table].ped.taskPlayAnim(animInfo.dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
		}, 2000
	);
});










 











mp.keys.bind(0x4A, true, () =>  // J
{
		
	if(mp.players.local.isDead() || mp.gui.cursor.visible || interactingWithTable != null || lpCasinoTable == null) return false;
	
	if(rouletteCamera != null)
	{
		destroyRouletteCamera();
	}
	else
	{
		rouletteCamera = mp.cameras.new('default', new mp.Vector3(tablesPos[lpCasinoTable][1]+0.3, tablesPos[lpCasinoTable][2]-0.9, tablesPos[lpCasinoTable][3]+3.5), new mp.Vector3(0,0,0), 45);
		rouletteCamera.setRot(-70.0, 0.0, 0.0, 2);
		rouletteCamera.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
	}	
});

function destroyRouletteCamera()
{
	rouletteCamera.destroy(true);
	rouletteCamera = null;
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
}

mp.events.add('render', () => 
{
	if(canDoBets && rouletteCamera && betObject == null)
	{
		betObject = mp.objects.new(mp.game.joaat("vw_prop_chip_50dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1], tablesPos[lpCasinoTable][2], tablesPos[lpCasinoTable][3]));
	    betObject.setCollision(false, false);
	}
	
	if(betObject != null)
	{
		if(!canDoBets || rouletteCamera == null)
		{
			betObject.destroy();
			betObject = null;
			clearTableMarkers();
		}
	}
	
	if(rouletteCamera != null && lpCasinoTable != null)
	{
		if(betObject != null)
		{
			if(mp.game.controls.isDisabledControlJustReleased(0, 25) && !mp.gui.cursor.visible) // RMB
			{
				if(closestChipSpot != null)
				{
					mp.events.callRemote("removeRouletteBet", closestChipSpot);
				}
			}
			
			if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // LMB
			{
				if(closestChipSpot != null)
				{
					mp.events.callRemote("makeRouletteBet", closestChipSpot, money ); // , tableChipsOffsets[closestChipSpot][3]
				}
				
			}
			
			let drawObj = getCameraHitCoord();
			if(drawObj != null)
			{
				// let height = betObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
				//drawObj.position.z += height / 2;
				drawObj.position.z = tablesPos[lpCasinoTable][3]+0.95;
				betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, drawObj.position.z, false, false, false);
				
				getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
			}
		}
		
		let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
		let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
		
		let leftAxisX = 0;
		let leftAxisY = 0;
		
		let pos = rouletteCamera.getCoord();
		let rr = rouletteCamera.getDirection();
		let vector = new mp.Vector3(0, 0, 0);
		vector.x = rr.x * leftAxisY;
		vector.y = rr.y * leftAxisY;
		vector.z = rr.z * leftAxisY;
		
		let upVector = new mp.Vector3(0, 0, 1);
		let rightVector = getCrossProduct(getNormalizedVector(rr), getNormalizedVector(upVector));
		rightVector.x *= leftAxisX * 0.5;
		rightVector.y *= leftAxisX * 0.5;
		rightVector.z *= leftAxisX * 0.5;
		
		let rot = rouletteCamera.getRot(2);
		
		let rotx = rot.x + rightAxisY * -5.0;
		let rotz = rot.z + rightAxisX * -5.0;
		if(rotz > 50) rotz = 50;
		if(rotz < -50) rotz = -50;
		if(rotx > -69) rotx = -69;
		if(rotx < -84) rotx = -84;
		rouletteCamera.setRot(rotx, 0.0, rotz, 2);
	}
});





function getCameraHitCoord()
{
	let position = rouletteCamera.getCoord();
	let direction = rouletteCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
	let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);
	
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}

function getNormalizedVector(vector)
{
	let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
	vector.x = vector.x / mag;
	vector.y = vector.y / mag;
	vector.z = vector.z / mag;
	return vector;
}

function getCrossProduct(v1, v2)
{
	let vector = new mp.Vector3(0, 0, 0);
	vector.x = v1.y * v2.z - v1.z * v2.y;
	vector.y = v1.z * v2.x - v1.x * v2.z;
	vector.z = v1.x * v2.y - v1.y * v2.x;
	return vector;
}







let tableMarkers = [];
const tableMarkersOffsets =
{
	"0": [-0.137451171875, -0.146942138671875, 0.9449996948242188],
	"00": [-0.1387939453125, 0.10546875, 0.9449996948242188],
	"1": [-0.0560302734375, -0.1898193359375, 0.9449996948242188],
	"2": [-0.0567626953125, -0.024017333984375, 0.9449996948242188],
	"3": [-0.056884765625, 0.141632080078125, 0.9449996948242188],
	"4": [0.02392578125, -0.187347412109375, 0.9449996948242188],
	"5": [0.0240478515625, -0.02471923828125, 0.9449996948242188],
	"6": [0.02392578125, 0.1422119140625, 0.9449996948242188],
	"7": [0.1038818359375, -0.18902587890625, 0.9449996948242188],
	"8": [0.1044921875, -0.023834228515625, 0.9449996948242188],
	"9": [0.10546875, 0.1419677734375, 0.9449996948242188],
	"10": [0.18701171875, -0.188385009765625, 0.9449996948242188],
	"11": [0.18603515625, -0.0238037109375, 0.9449996948242188],
	"12": [0.1851806640625, 0.143157958984375, 0.9449996948242188],
	"13": [0.2677001953125, -0.18780517578125, 0.9449996948242188],
	"14": [0.26806640625, -0.02301025390625, 0.9449996948242188],
	"15": [0.26611328125, 0.143310546875, 0.9449996948242188],
	"16": [0.3497314453125, -0.18829345703125, 0.9449996948242188],
	"17": [0.349609375, -0.023101806640625, 0.9449996948242188],
	"18": [0.3497314453125, 0.142242431640625, 0.9449996948242188],
	"19": [0.4307861328125, -0.18829345703125, 0.9449996948242188],
	"20": [0.4312744140625, -0.02392578125, 0.9449996948242188],
	"21": [0.431884765625, 0.1416015625, 0.9449996948242188],
	"22": [0.51220703125, -0.188873291015625, 0.9449996948242188],
	"23": [0.5123291015625, -0.023773193359375, 0.9449996948242188],
	"24": [0.511962890625, 0.14215087890625, 0.9449996948242188],
	"25": [0.5931396484375, -0.18890380859375, 0.9449996948242188],
	"26": [0.59375, -0.023651123046875, 0.9449996948242188],
	"27": [0.59375, 0.14080810546875, 0.9449996948242188],
	"28": [0.67529296875, -0.189849853515625, 0.9449996948242188],
	"29": [0.6751708984375, -0.02337646484375, 0.9449996948242188],
	"30": [0.674560546875, 0.141845703125, 0.9449996948242188],
	"31": [0.756591796875, -0.18798828125, 0.9449996948242188],
	"32": [0.7547607421875, -0.0234375, 0.9449996948242188],
	"33": [0.7554931640625, 0.14263916015625, 0.9449996948242188],
	"34": [0.836669921875, -0.188323974609375, 0.9449996948242188],
	"35": [0.8365478515625, -0.0244140625, 0.9449996948242188],
	"36": [0.8359375, 0.14276123046875, 0.9449996948242188]
};

const tableChipsOffsets =
[
	[-0.154541015625, -0.150604248046875, 0.9449996948242188, ["0"]],
	[-0.1561279296875, 0.11505126953125, 0.9449996948242188, ["00"]],
	[-0.059326171875, -0.18701171875, 0.9449996948242188, ["1"]],
	[-0.058349609375, -0.019378662109375, 0.9449996948242188, ["2"]],
	[-0.0587158203125, 0.142059326171875, 0.9449996948242188, ["3"]],
	[0.02294921875, -0.1920166015625, 0.9449996948242188, ["4"]],
	[0.023193359375, -0.01947021484375, 0.9449996948242188, ["5"]],
	[0.024658203125, 0.147369384765625, 0.9449996948242188, ["6"]],
	[0.105224609375, -0.1876220703125, 0.9449996948242188, ["7"]],
	[0.1055908203125, -0.028472900390625, 0.9449996948242188, ["8"]],
	[0.10400390625, 0.147430419921875, 0.9449996948242188, ["9"]],
	[0.187744140625, -0.191802978515625, 0.9449996948242188, ["10"]],
	[0.1866455078125, -0.02667236328125, 0.9449996948242188, ["11"]],
	[0.1842041015625, 0.145965576171875, 0.9449996948242188, ["12"]],
	[0.2696533203125, -0.182464599609375, 0.9449996948242188, ["13"]],
	[0.265869140625, -0.027862548828125, 0.9449996948242188, ["14"]],
	[0.2667236328125, 0.138946533203125, 0.9449996948242188, ["15"]],
	[0.35009765625, -0.186126708984375, 0.9449996948242188, ["16"]],
	[0.348876953125, -0.027740478515625, 0.9449996948242188, ["17"]],
	[0.3497314453125, 0.14715576171875, 0.9449996948242188, ["18"]],
	[0.43212890625, -0.17864990234375, 0.9449996948242188, ["19"]],
	[0.4337158203125, -0.02508544921875, 0.9449996948242188, ["20"]],
	[0.430419921875, 0.138336181640625, 0.9449996948242188, ["21"]],
	[0.51416015625, -0.18603515625, 0.9449996948242188, ["22"]],
	[0.5135498046875, -0.02301025390625, 0.9449996948242188, ["23"]],
	[0.5146484375, 0.14239501953125, 0.9449996948242188, ["24"]],
	[0.59130859375, -0.192413330078125, 0.9449996948242188, ["25"]],
	[0.596923828125, -0.022216796875, 0.9449996948242188, ["26"]],
	[0.5924072265625, 0.14385986328125, 0.9449996948242188, ["27"]],
	[0.6749267578125, -0.187286376953125, 0.9449996948242188, ["28"]],
	[0.67431640625, -0.0262451171875, 0.9449996948242188, ["29"]],
	[0.6756591796875, 0.140594482421875, 0.9449996948242188, ["30"]],
	[0.7542724609375, -0.19415283203125, 0.9449996948242188, ["31"]],
	[0.7542724609375, -0.01898193359375, 0.9449996948242188, ["32"]],
	[0.75439453125, 0.1448974609375, 0.9449996948242188, ["33"]],
	[0.8392333984375, -0.18951416015625, 0.9449996948242188, ["34"]],
	[0.837646484375, -0.023468017578125, 0.9449996948242188, ["35"]],
	[0.8380126953125, 0.14227294921875, 0.9449996948242188, ["36"]],
	[0.0643310546875, -0.304718017578125, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12"]], //1st12
	[0.392822265625, -0.304779052734375, 0.9449996948242188, ["13","14","15","16","17","18","19","20","21","22","23","24"]],//2nd12
	[0.712158203125, -0.30303955078125, 0.9449996948242188, ["25","26","27","28","29","30","31","32","33","34","35","36"]],//3rd12
	[0.9222412109375, -0.185882568359375, 0.9449996948242188, ["1","4","7","10","13","16","19","22","25","28","31","34"]],//2to1
	[0.9229736328125, -0.0181884765625, 0.9449996948242188, ["2","5","8","11","14","17","20","23","26","29","32","35"]],//2to1
	[0.9248046875, 0.14849853515625, 0.9449996948242188, ["3","6","9","12","15","18","21","24","27","30","33","36"]],//2to1
	[-0.011474609375, -0.378875732421875, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]],//1-18
	[0.142822265625, -0.375732421875, 0.9449996948242188, ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]], //even
	[0.308349609375, -0.37542724609375, 0.9449996948242188, ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]],//red
	[0.4713134765625, -0.376861572265625, 0.9449996948242188, ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]],//black
	[0.6341552734375, -0.376495361328125, 0.9449996948242188, ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]],//odd
	[0.7926025390625, -0.382232666015625, 0.9449996948242188, ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]],//19-36
	[-0.1368408203125, -0.02099609375, 0.9449996948242188, ["0","00"]],
	[-0.055419921875, -0.105804443359375, 0.9449996948242188, ["1","2"]],
	[-0.0567626953125, 0.058624267578125, 0.9449996948242188, ["2","3"]],
	[0.02587890625, -0.10498046875, 0.9449996948242188, ["4","5"]],
	[0.0244140625, 0.058837890625, 0.9449996948242188, ["5","6"]],
	[0.100341796875, -0.10382080078125, 0.9449996948242188, ["7","8"]],
	[0.1064453125, 0.06011962890625, 0.9449996948242188, ["8","9"]],
	[0.19189453125, -0.1060791015625, 0.9449996948242188, ["10","11"]],
	[0.1856689453125, 0.05438232421875, 0.9449996948242188, ["11","12"]],
	[0.27099609375, -0.10870361328125, 0.9449996948242188, ["13","14"]],
	[0.2667236328125, 0.058502197265625, 0.9449996948242188, ["14","15"]],
	[0.3463134765625, -0.107696533203125, 0.9449996948242188, ["16","17"]],
	[0.34814453125, 0.0556640625, 0.9449996948242188, ["17","18"]],
	[0.42822265625, -0.109130859375, 0.9449996948242188, ["19","20"]],
	[0.4302978515625, 0.0550537109375, 0.9449996948242188, ["20","21"]],
	[0.511474609375, -0.107421875, 0.9449996948242188, ["22","23"]],
	[0.512451171875, 0.0614013671875, 0.9449996948242188, ["23","24"]],
	[0.5980224609375, -0.107147216796875, 0.9449996948242188, ["25","26"]],
	[0.596435546875, 0.0574951171875, 0.9449996948242188, ["26","27"]],
	[0.673828125, -0.106903076171875, 0.9449996948242188, ["28","29"]],
	[0.6751708984375, 0.058685302734375, 0.9449996948242188, ["29","30"]],
	[0.7532958984375, -0.1102294921875, 0.9449996948242188, ["31","32"]],
	[0.750244140625, 0.06103515625, 0.9449996948242188, ["32","33"]],
	[0.834716796875, -0.108978271484375, 0.9449996948242188, ["34","35"]],
	[0.836181640625, 0.05828857421875, 0.9449996948242188, ["35","36"]],
	[-0.0167236328125, -0.187042236328125, 0.9449996948242188, ["1","4"]],
	[-0.0167236328125, -0.02154541015625, 0.9449996948242188, ["2","5"]],
	[-0.0164794921875, 0.140350341796875, 0.9449996948242188, ["3","6"]],
	[0.064453125, -0.1865234375, 0.9449996948242188, ["4","7"]],
	[0.06494140625, -0.01727294921875, 0.9449996948242188, ["5","8"]],
	[0.068603515625, 0.13873291015625, 0.9449996948242188, ["6","9"]],
	[0.144287109375, -0.184173583984375, 0.9449996948242188, ["7","10"]],
	[0.14501953125, -0.024139404296875, 0.9449996948242188, ["8","11"]],
	[0.14501953125, 0.136993408203125, 0.9449996948242188, ["9","12"]],
	[0.2291259765625, -0.18670654296875, 0.9449996948242188, ["10","13"]],
	[0.227783203125, -0.0242919921875, 0.9449996948242188, ["11","14"]],
	[0.2286376953125, 0.14398193359375, 0.9449996948242188, ["12","15"]],
	[0.308349609375, -0.18792724609375, 0.9449996948242188, ["13","16"]],
	[0.308837890625, -0.02374267578125, 0.9449996948242188, ["14","17"]],
	[0.3099365234375, 0.14410400390625, 0.9449996948242188, ["15","18"]],
	[0.39111328125, -0.192230224609375, 0.9449996948242188, ["16","19"]],
	[0.390869140625, -0.0189208984375, 0.9449996948242188, ["17","20"]],
	[0.39111328125, 0.146514892578125, 0.9449996948242188, ["18","21"]],
	[0.470947265625, -0.188690185546875, 0.9449996948242188, ["19","22"]],
	[0.4705810546875, -0.0205078125, 0.9449996948242188, ["20","23"]],
	[0.4725341796875, 0.140167236328125, 0.9449996948242188, ["21","24"]],
	[0.5491943359375, -0.189666748046875, 0.9449996948242188, ["22","25"]],
	[0.548095703125, -0.022552490234375, 0.9449996948242188, ["23","26"]],
	[0.553955078125, 0.1446533203125, 0.9449996948242188, ["24","27"]],
	[0.6324462890625, -0.191131591796875, 0.9449996948242188, ["25","28"]],
	[0.635498046875, -0.0224609375, 0.9449996948242188, ["26","29"]],
	[0.6392822265625, 0.139190673828125, 0.9449996948242188, ["27","30"]],
	[0.71533203125, -0.187042236328125, 0.9449996948242188, ["28","31"]],
	[0.7181396484375, -0.02447509765625, 0.9449996948242188, ["29","32"]],
	[0.7152099609375, 0.138153076171875, 0.9449996948242188, ["30","33"]],
	[0.7969970703125, -0.1904296875, 0.9449996948242188, ["31","34"]],
	[0.7955322265625, -0.024871826171875, 0.9449996948242188, ["32","35"]],
	[0.7960205078125, 0.137664794921875, 0.9449996948242188, ["33","36"]],
	[-0.0560302734375, -0.271240234375, 0.9449996948242188, ["1","2","3"]],
	[0.024658203125, -0.271392822265625, 0.9449996948242188, ["4","5","6"]],
	[0.1051025390625, -0.272125244140625, 0.9449996948242188, ["7","8","9"]],
	[0.1898193359375, -0.27001953125, 0.9449996948242188, ["10","11","12"]],
	[0.2696533203125, -0.271697998046875, 0.9449996948242188, ["13","14","15"]],
	[0.351318359375, -0.268096923828125, 0.9449996948242188, ["16","17","18"]],
	[0.4287109375, -0.269561767578125, 0.9449996948242188, ["19","20","21"]],
	[0.5098876953125, -0.2716064453125, 0.9449996948242188, ["22","23","24"]],
	[0.5960693359375, -0.271148681640625, 0.9449996948242188, ["25","26","27"]],
	[0.67724609375, -0.268524169921875, 0.9449996948242188, ["28","29","30"]],
	[0.7523193359375, -0.27227783203125, 0.9449996948242188, ["31","32","33"]],
	[0.8382568359375, -0.272125244140625, 0.9449996948242188, ["34","35","36"]],
	[-0.017333984375, -0.106170654296875, 0.9449996948242188, ["1","2","4","5"]],
	[-0.0162353515625, 0.060882568359375, 0.9449996948242188, ["2","3","5","6"]],
	[0.06591796875, -0.110107421875, 0.9449996948242188, ["4","5","7","8"]],
	[0.0653076171875, 0.060028076171875, 0.9449996948242188, ["5","6","8","9"]],
	[0.146484375, -0.10888671875, 0.9449996948242188, ["7","8","10","11"]],
	[0.1451416015625, 0.057159423828125, 0.9449996948242188, ["8","9","11","12"]],
	[0.22705078125, -0.1092529296875, 0.9449996948242188, ["10","11","13","14"]],
	[0.22802734375, 0.059356689453125, 0.9449996948242188, ["11","12","14","15"]],
	[0.307373046875, -0.1043701171875, 0.9449996948242188, ["13","14","16","17"]],
	[0.309814453125, 0.05584716796875, 0.9449996948242188, ["14","15","17","18"]],
	[0.3919677734375, -0.111083984375, 0.9449996948242188, ["16","17","19","20"]],
	[0.3924560546875, 0.0596923828125, 0.9449996948242188, ["17","18","20","21"]],
	[0.471923828125, -0.1044921875, 0.9449996948242188, ["19","20","22","23"]],
	[0.4698486328125, 0.060028076171875, 0.9449996948242188, ["20","21","23","24"]],
	[0.5531005859375, -0.106170654296875, 0.9449996948242188, ["22","23","25","26"]],
	[0.5546875, 0.059417724609375, 0.9449996948242188, ["23","24","26","27"]],
	[0.633544921875, -0.101531982421875, 0.9449996948242188, ["25","26","28","29"]],
	[0.6337890625, 0.0579833984375, 0.9449996948242188, ["26","27","29","30"]],
	[0.7156982421875, -0.106292724609375, 0.9449996948242188, ["28","29","31","32"]],
	[0.7158203125, 0.0604248046875, 0.9449996948242188, ["29","30","32","33"]],
	[0.7947998046875, -0.108642578125, 0.9449996948242188, ["31","32","34","35"]],
	[0.7952880859375, 0.059051513671875, 0.9449996948242188, ["32","33","35","36"]],
	[-0.099609375, -0.2711181640625, 0.9449996948242188, ["0","00","1","2","3"]],
	[-0.0147705078125, -0.27154541015625, 0.9449996948242188, ["1","2","3","4","5","6"]],
	[0.064697265625, -0.270263671875, 0.9449996948242188, ["4","5","6","7","8","9"]],
	[0.144775390625, -0.271209716796875, 0.9449996948242188, ["7","8","9","10","11","12"]],
	[0.226806640625, -0.27142333984375, 0.9449996948242188, ["10","11","12","13","14","15"]],
	[0.306396484375, -0.27142333984375, 0.9449996948242188, ["13","14","15","16","17","18"]],
	[0.3895263671875, -0.27099609375, 0.9449996948242188, ["16","17","18","19","20","21"]],
	[0.468017578125, -0.275238037109375, 0.9449996948242188, ["19","20","21","22","23","24"]],
	[0.5509033203125, -0.2738037109375, 0.9449996948242188, ["22","23","24","25","26","27"]],
	[0.6336669921875, -0.27386474609375, 0.9449996948242188, ["25","26","27","28","29","30"]],
	[0.7144775390625, -0.272186279296875, 0.9449996948242188, ["28","29","30","31","32","33"]],
	[0.7935791015625, -0.272918701171875, 0.9449996948242188, ["31","32","33","34","35","36"]]
];


function clearTableMarkers()
{
	for(var i=0; i < tableMarkers.length; i++)
	{
		tableMarkers[i].destroy();
	}
	tableMarkers = [];
}

function getClosestChipSpot(vector)
{
	var spot = null;
	var prevDistance = 0.05;
	var dist = null;
	
	for(var i=0; i < tableChipsOffsets.length; i++)
	{
		dist = mp.Vector3.getDistanceBetweenPoints3D(vector, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[i][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[i][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[i][2]));
		if(dist <= prevDistance)
		{
			spot = i;
			prevDistance = dist;
		}
	}
	
	if(spot != closestChipSpot)
	{
		closestChipSpot = spot;
		clearTableMarkers();
		
		if(spot != null)
		{
			var key = null;
			var obj = null;
			for(var i=0; i < tableChipsOffsets[spot][3].length; i++)
			{
				key = tableChipsOffsets[spot][3][i];
				if(key == "00" || key == "0")
				{
					obj = mp.objects.new(269022546, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableMarkersOffsets[key][0], tablesPos[lpCasinoTable][2]+tableMarkersOffsets[key][1], tablesPos[lpCasinoTable][3]+tableMarkersOffsets[key][2]));
					tableMarkers.push(obj);
				}
				else
				{
					tableMarkers.push(mp.objects.new(3267450776, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableMarkersOffsets[key][0], tablesPos[lpCasinoTable][2]+tableMarkersOffsets[key][1], tablesPos[lpCasinoTable][3]+tableMarkersOffsets[key][2])));
				}
			}
		}
	}
	
}





/***/ }),

/***/ 3678:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"0":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"1":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"2":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"3":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"4":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"5":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"6":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"7":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"8":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"9":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"10":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"11":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"12":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"13":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"14":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"15":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"16":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"17":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"18":{"0":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":15,"BestTorsoTexture":0}},"19":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"20":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"21":{"0":{"BestTorsoDrawable":16,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":16,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":16,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":16,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":16,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":16,"BestTorsoTexture":5}},"22":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"23":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"24":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"25":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"26":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"27":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"28":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"29":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"30":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"31":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"32":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"33":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"34":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"35":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"36":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"37":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"38":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"39":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"40":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"41":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"42":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"43":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"44":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"45":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"46":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"47":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"48":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"49":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"50":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"51":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"52":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"53":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"54":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"55":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"56":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"57":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"58":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"59":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"60":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"61":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"62":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"63":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"64":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"65":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"66":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"67":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"68":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"69":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"70":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"71":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"72":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"73":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"74":{"0":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":15,"BestTorsoTexture":0}},"75":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"76":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"77":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"78":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"79":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"80":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"81":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"82":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"83":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"84":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"85":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"86":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"87":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"88":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"89":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"90":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"91":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"92":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"93":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"94":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"95":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"96":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"97":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"98":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"99":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"100":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"101":{"0":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":15,"BestTorsoTexture":0}},"102":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"103":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"104":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"105":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"106":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"107":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"108":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"109":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"110":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"111":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"112":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"113":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"114":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"115":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"116":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"117":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"118":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"119":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"120":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"16":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"121":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"122":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"123":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"124":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"125":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"126":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"127":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"128":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"129":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"130":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"131":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"132":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"133":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"134":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"135":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"136":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"137":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"138":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"139":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"140":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"141":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"142":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"143":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"144":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"145":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"146":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"147":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"148":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"149":{"0":{"BestTorsoDrawable":128,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":128,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":128,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":128,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":128,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":128,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":128,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":128,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":128,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":128,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":128,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":128,"BestTorsoTexture":11},"12":{"BestTorsoDrawable":128,"BestTorsoTexture":12},"13":{"BestTorsoDrawable":128,"BestTorsoTexture":13},"14":{"BestTorsoDrawable":128,"BestTorsoTexture":14},"15":{"BestTorsoDrawable":128,"BestTorsoTexture":15}},"150":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"151":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"152":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"153":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"154":{"0":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":129,"BestTorsoTexture":0}},"155":{"0":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":130,"BestTorsoTexture":0}},"156":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"157":{"0":{"BestTorsoDrawable":132,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":132,"BestTorsoTexture":0}},"158":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"159":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"160":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"161":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"162":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"163":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"164":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"165":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"166":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"167":{"0":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":129,"BestTorsoTexture":0}},"168":{"0":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":161,"BestTorsoTexture":0}},"169":{"0":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":153,"BestTorsoTexture":0}},"170":{"0":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":15,"BestTorsoTexture":0}},"171":{"0":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":153,"BestTorsoTexture":0}},"172":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"173":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"174":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"175":{"0":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":129,"BestTorsoTexture":0}},"176":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"177":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"178":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"179":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"180":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"181":{"0":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":129,"BestTorsoTexture":0}},"182":{"0":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":130,"BestTorsoTexture":0}},"183":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"184":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"185":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"186":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"187":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"188":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"189":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"190":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"191":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"192":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"193":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"194":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"195":{"0":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":153,"BestTorsoTexture":0}},"196":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"197":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"198":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"199":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"200":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"201":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"202":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"203":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"204":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"205":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"206":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"207":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"208":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"209":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"210":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"211":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"212":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"213":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"214":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"215":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"216":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"217":{"0":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"218":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"219":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"220":{"0":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":129,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"221":{"0":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":161,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"222":{"0":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":153,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"223":{"0":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"224":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"225":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"226":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"227":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"228":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"229":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"230":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"231":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"232":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"233":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"234":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"235":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"236":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"237":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"238":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"239":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"240":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"241":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"242":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"243":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"244":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"245":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"246":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"247":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"248":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"249":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"250":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"251":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"252":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"253":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"254":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"255":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"256":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"257":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"258":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"259":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"260":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"261":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"262":{"0":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":7,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":7,"BestTorsoTexture":0}},"263":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"264":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"24":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"25":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"265":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"266":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"267":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"268":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"24":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"25":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"269":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"270":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"271":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"272":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"273":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"274":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"275":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"276":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"277":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"278":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"279":{"0":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":15,"BestTorsoTexture":0}},"280":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"281":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"282":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"283":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"284":{"0":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":15,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":15,"BestTorsoTexture":0}},"285":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"286":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"287":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"288":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"289":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"290":{"0":{"BestTorsoDrawable":205,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":205,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":205,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":205,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":205,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":205,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":205,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":205,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":205,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":205,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":205,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":205,"BestTorsoTexture":11}},"291":{"0":{"BestTorsoDrawable":206,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":206,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":206,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":206,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":206,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":206,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":206,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":206,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":206,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":206,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":206,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":206,"BestTorsoTexture":11},"12":{"BestTorsoDrawable":206,"BestTorsoTexture":12},"13":{"BestTorsoDrawable":206,"BestTorsoTexture":13},"14":{"BestTorsoDrawable":206,"BestTorsoTexture":14},"15":{"BestTorsoDrawable":206,"BestTorsoTexture":15},"16":{"BestTorsoDrawable":206,"BestTorsoTexture":16},"17":{"BestTorsoDrawable":206,"BestTorsoTexture":17}},"292":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"293":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"294":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"295":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"296":{"0":{"BestTorsoDrawable":207,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":207,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":207,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":207,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":207,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":207,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":207,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":207,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":207,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":207,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":207,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":207,"BestTorsoTexture":11}},"297":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"298":{"0":{"BestTorsoDrawable":18,"BestTorsoTexture":0}},"299":{"0":{"BestTorsoDrawable":208,"BestTorsoTexture":0}},"300":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"301":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"302":{"0":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":131,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":131,"BestTorsoTexture":0}},"303":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"304":{"0":{"BestTorsoDrawable":209,"BestTorsoTexture":0}},"305":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"306":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"307":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"308":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"309":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"310":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"311":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"312":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"313":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"314":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"315":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"316":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"317":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"318":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"319":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"320":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"321":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"322":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"323":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"324":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"325":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"326":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"327":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"328":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"329":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"330":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"331":{"0":{"BestTorsoDrawable":18,"BestTorsoTexture":0}},"332":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"333":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"334":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"335":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"336":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"337":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"338":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"339":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"340":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"341":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"342":{"0":{"BestTorsoDrawable":130,"BestTorsoTexture":0}},"343":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"344":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"345":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"346":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"347":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"348":{"0":{"BestTorsoDrawable":210,"BestTorsoTexture":0}},"349":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"350":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"351":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"352":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"353":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"354":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"16":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"17":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"18":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"19":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"24":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"355":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"356":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"357":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"358":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"359":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"360":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"361":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"362":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"363":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"364":{"0":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":229,"BestTorsoTexture":0}},"365":{"0":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":229,"BestTorsoTexture":0}},"366":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"367":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"368":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"369":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"370":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"371":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"372":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":9,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"373":{"0":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":229,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":229,"BestTorsoTexture":0}},"374":{"0":{"BestTorsoDrawable":9,"BestTorsoTexture":0}},"375":{"0":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":130,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":130,"BestTorsoTexture":0}},"376":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"377":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"378":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"379":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"380":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0}}}');

/***/ }),

/***/ 9293:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"0":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"1":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"2":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"3":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"4":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"5":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"6":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"7":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"8":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"9":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"10":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"11":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"12":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"13":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"14":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"15":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"16":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"17":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"18":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"19":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"20":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"21":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"22":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"23":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"24":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"25":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"26":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"27":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"28":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"29":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"30":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"31":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"32":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"33":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"34":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"35":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"36":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"37":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"38":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"39":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"40":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"41":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"42":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"43":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"44":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"45":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"46":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"47":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"48":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"49":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"50":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"51":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"52":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"53":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"54":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"55":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"56":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"57":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"58":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"59":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"60":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"61":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"62":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"63":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"64":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"65":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"66":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"67":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"68":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"69":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"70":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"71":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"72":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"73":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"74":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"75":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"76":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"77":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"78":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"79":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"80":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"81":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"82":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"83":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"84":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"85":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"86":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"87":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"88":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"89":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"90":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"91":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"92":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"93":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"94":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"95":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"96":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"97":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"98":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"99":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"100":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"101":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"102":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"103":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"104":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"105":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"106":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"107":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"108":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"109":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"110":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"111":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"112":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"113":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"114":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"115":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"116":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"117":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"118":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"119":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"120":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"121":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"122":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"123":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"124":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"125":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"126":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"127":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"128":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"129":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"130":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"131":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"132":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"133":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"134":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"135":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"136":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"137":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"138":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"139":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"140":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"141":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"142":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"143":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"144":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"145":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"146":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"147":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"148":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"149":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"150":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"151":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"152":{"0":{"BestTorsoDrawable":111,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":111,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":111,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":111,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":111,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":111,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":111,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":111,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":111,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":111,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":111,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":111,"BestTorsoTexture":11},"12":{"BestTorsoDrawable":111,"BestTorsoTexture":12},"13":{"BestTorsoDrawable":111,"BestTorsoTexture":13},"14":{"BestTorsoDrawable":111,"BestTorsoTexture":14},"15":{"BestTorsoDrawable":111,"BestTorsoTexture":15}},"153":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"154":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"155":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"156":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"157":{"0":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":112,"BestTorsoTexture":0}},"158":{"0":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":113,"BestTorsoTexture":0}},"159":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0}},"160":{"0":{"BestTorsoDrawable":115,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":115,"BestTorsoTexture":0}},"161":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"162":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":114,"BestTorsoTexture":0}},"163":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"164":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"165":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"166":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"167":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"168":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0}},"169":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"170":{"0":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":112,"BestTorsoTexture":0}},"171":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"172":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"173":{"0":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":112,"BestTorsoTexture":0}},"174":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"175":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":114,"BestTorsoTexture":0}},"176":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0}},"177":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"178":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"179":{"0":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":112,"BestTorsoTexture":0}},"180":{"0":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":113,"BestTorsoTexture":0}},"181":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"182":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"183":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"184":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"185":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"186":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"187":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"188":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"189":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"190":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"191":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"192":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"193":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"194":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"195":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"196":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"197":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"198":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"199":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"200":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"201":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"202":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":114,"BestTorsoTexture":0}},"203":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"204":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"205":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":114,"BestTorsoTexture":0}},"206":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"207":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"208":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"209":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"210":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"211":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"212":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"213":{"0":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":113,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"214":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"215":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"216":{"0":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":112,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"217":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"218":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"219":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"220":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"221":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"222":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"223":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"224":{"0":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":12,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"225":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"226":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"227":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"228":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"229":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"230":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"231":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"232":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"233":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"234":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"235":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"236":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"237":{"0":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":5,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":5,"BestTorsoTexture":0}},"238":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"239":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"240":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"241":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"242":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"243":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"244":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"245":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"246":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"247":{"0":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":114,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":114,"BestTorsoTexture":0}},"248":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"249":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"250":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"251":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"252":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"253":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"254":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"255":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"256":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"257":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"258":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"259":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"260":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"261":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"262":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"263":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"264":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"265":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"266":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"267":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"268":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"269":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"270":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"271":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"272":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"273":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"274":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"275":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"276":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"277":{"0":{"BestTorsoDrawable":164,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":164,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":164,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":164,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":164,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":164,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":164,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":164,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":164,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":164,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":164,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":164,"BestTorsoTexture":11}},"278":{"0":{"BestTorsoDrawable":165,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":165,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":165,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":165,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":165,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":165,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":165,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":165,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":165,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":165,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":165,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":165,"BestTorsoTexture":11},"12":{"BestTorsoDrawable":165,"BestTorsoTexture":12},"13":{"BestTorsoDrawable":165,"BestTorsoTexture":13},"14":{"BestTorsoDrawable":165,"BestTorsoTexture":14},"15":{"BestTorsoDrawable":165,"BestTorsoTexture":15},"16":{"BestTorsoDrawable":165,"BestTorsoTexture":16},"17":{"BestTorsoDrawable":165,"BestTorsoTexture":17}},"279":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"280":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"281":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"282":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"283":{"0":{"BestTorsoDrawable":166,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":166,"BestTorsoTexture":1},"2":{"BestTorsoDrawable":166,"BestTorsoTexture":2},"3":{"BestTorsoDrawable":166,"BestTorsoTexture":3},"4":{"BestTorsoDrawable":166,"BestTorsoTexture":4},"5":{"BestTorsoDrawable":166,"BestTorsoTexture":5},"6":{"BestTorsoDrawable":166,"BestTorsoTexture":6},"7":{"BestTorsoDrawable":166,"BestTorsoTexture":7},"8":{"BestTorsoDrawable":166,"BestTorsoTexture":8},"9":{"BestTorsoDrawable":166,"BestTorsoTexture":9},"10":{"BestTorsoDrawable":166,"BestTorsoTexture":10},"11":{"BestTorsoDrawable":166,"BestTorsoTexture":11}},"284":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"285":{"0":{"BestTorsoDrawable":17,"BestTorsoTexture":0}},"286":{"0":{"BestTorsoDrawable":167,"BestTorsoTexture":0}},"287":{"0":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":3,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":3,"BestTorsoTexture":0}},"288":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"289":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"290":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"291":{"0":{"BestTorsoDrawable":168,"BestTorsoTexture":0}},"292":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"293":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"294":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"295":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"296":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"297":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"298":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"299":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"300":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"301":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"302":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"303":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"304":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"305":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"306":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"307":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"308":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"309":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"310":{"0":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":14,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":14,"BestTorsoTexture":0}},"311":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"312":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"313":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"314":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"315":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"316":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"317":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"318":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"319":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"320":{"0":{"BestTorsoDrawable":17,"BestTorsoTexture":0}},"321":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"322":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"323":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"324":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"325":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"326":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"327":{"0":{"BestTorsoDrawable":113,"BestTorsoTexture":0}},"328":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"329":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"330":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"331":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"332":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"333":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"334":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"335":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":8,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"336":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"337":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"338":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"339":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"9":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"10":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"11":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"12":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"13":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"14":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"15":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"16":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"17":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"18":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"19":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"20":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"21":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"22":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"23":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"340":{"0":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"1":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"2":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"3":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"4":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"5":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"6":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"7":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1},"8":{"BestTorsoDrawable":-1,"BestTorsoTexture":-1}},"341":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"342":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"343":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"344":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"345":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"346":{"0":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":184,"BestTorsoTexture":0}},"347":{"0":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":184,"BestTorsoTexture":0}},"348":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"349":{"0":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":1,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":1,"BestTorsoTexture":0}},"350":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"351":{"0":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":0,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":0,"BestTorsoTexture":0}},"352":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"353":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":4,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"354":{"0":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":11,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":11,"BestTorsoTexture":0}},"355":{"0":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"10":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"11":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"12":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"13":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"14":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"15":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"16":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"17":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"18":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"19":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"20":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"21":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"22":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"23":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"24":{"BestTorsoDrawable":184,"BestTorsoTexture":0},"25":{"BestTorsoDrawable":184,"BestTorsoTexture":0}},"356":{"0":{"BestTorsoDrawable":8,"BestTorsoTexture":0}},"357":{"0":{"BestTorsoDrawable":2,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":2,"BestTorsoTexture":0}},"358":{"0":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"1":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"2":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"3":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"4":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"5":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"6":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"7":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"8":{"BestTorsoDrawable":6,"BestTorsoTexture":0},"9":{"BestTorsoDrawable":6,"BestTorsoTexture":0}},"359":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"360":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"361":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}},"362":{"0":{"BestTorsoDrawable":4,"BestTorsoTexture":0}}}');

/***/ }),

/***/ 537:
/***/ (() => {

const player = mp.players.local;

const FishingObject = mp.game.joaat('prop_fishing_rod_01');

function isPlayerInOrLookingAtWater() {
   var forward = player.getForwardVector();
   var hitData = getCameraHitCoord();

   if (player.isInWater())
   {
      mp.gui.chat.push('i in water');
      return true;
   } 

   if (hitData == 435688960) {
      mp.gui.chat.push('i see water');
      return true;
   }
   else {
      mp.gui.chat.push(`${JSON.stringify(hitData)}`);
      return false;
   }
}
/*
setInterval(async () => {
   if (!player) return;
   isPlayerInOrLookingAtWater();
}, 1000);*/

function getCameraHitCoord () {
	let position = player.getCoord();
	let direction = player.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
	let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);
	
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}


/***/ }),

/***/ 3499:
/***/ (() => {



const Player = mp.players.local;
let browser = null, opened = false, camera = null;

const Login = { 
   Position: new mp.Vector3(-1400.48, -1699.92, 5.00),
   CameraPosition: new mp.Vector3(-1400.48, -1699.92, 3.06),
   LookAt: new mp.Vector3(-1387.16, -1685.1, 5.37)
}


mp.events.add({
   'client:player.login:show': () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/game-interface/auth.html');
         Player.BrowserControls(true, true);
         Player.freezePosition(true);
         Player.LoginCamera(true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
         Player.freezePosition(false);
         Player.LoginCamera(false);
         mp.game.ui.displayRadar(true);
      }
   },

   'client:player.login:credentials': (username, password) => { 
      mp.events.callRemoteProc('server:player.login:credentials', username, password).then((Info) => { 
         browser.execute('start.Init(' + JSON.stringify(Info) + ')');
      }).catch((error) => { 
         browser.execute('start.Notify(\"' + error +'\");');
      });
   },

   'client:player.character:select': (character) => { 
      mp.game.cam.doScreenFadeOut(3000);
      setTimeout(() => {
         mp.events.call('client:player.login:show');
         mp.events.callRemote('server:player.character:select', character);
         mp.game.cam.doScreenFadeIn(3000);
      }, 3000);
   },

   'client:player.character:creator': () => { 
      mp.events.call('client:player.login:show');
      mp.events.call('client:player.character.creator:show');
   },

   'client:player.character:delete': async (character) => { 
      let response = await mp.events.callRemoteProc('server:player.character:delete', character);
      response ? ( browser.execute('start.Delete(' + character + ');')) : ( browser.execute('start.Notify(`Došlo je do greške pri brisanju karaktera !`);'));
   }
});


function LoginCamera (toggle) { 
   if (toggle) { 
      camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Player.position = Login.Position;
      camera.setActive(true);
      camera.setCoord(Login.CameraPosition.x, Login.CameraPosition.y, Login.CameraPosition.z);
      camera.pointAtCoord(Login.LookAt.x, Login.LookAt.y, Login.LookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
   } else { 
      if (camera) camera.destroy();
      camera = null;
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
   }
}

function Discord (status, string) { 
   mp.discord.update(status, string);
}


Player.Discord = Discord;
Player.LoginCamera = LoginCamera;

/***/ }),

/***/ 2929:
/***/ (() => {


// const player = mp.players.local;
// let onlinePlayers = mp.players.length;
// // let playerHUD = mp.browsers.new('package://player/hud-interface/hud.html'), isDriving = false;


// let screenshotBrowser = false, photoName = null,
// 	ScreenShotTimer = false;


// mp.events.add({
// 	'client:hud.show': (show) => {
// 		if (show)  {
// 			playerHUD.execute(`hud.toggle = true;`); 
// 			setInterval(() => { updatePlayerHud(); }, 1000);
// 		}
// 		else { 
// 			playerHUD.execute(`hud.toggle = false;`); 
// 		}
// 	},

// 	'client:player.notification:show': (message, type, time) => {
// 		playerHUD.execute(`hud.notification(\"${message}\", \"${type}\", \"${time}\");`);
// 	}
// })


// updatePlayerHud = () => { 
// 	let street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0),
// 		zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z)),
// 		streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName),
// 		heading = getPlayerHeading();
// 	playerHUD.execute(
// 		`hud.location.street = \"${streetName}\", hud.location.zone = \"${zoneName}\", 
// 		hud.location.heading = \"${heading}\", hud.money = \"${player.money}\",
// 		hud.onlinePlayers =  \"${onlinePlayers}\", hud.id = \"${player.remoteId}\";`
// 	); 
// }

// mp.keys.bind(0x77, true, function () {  //F8-Key
// 	var date = new Date();
// 	photoName = "focusrp-" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + "-" + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds() + ".png";
// 	mp.gui.takeScreenshot(`${photoName}`, 1, 10, 0);
// 	if (!ScreenShotTimer) { 
// 		mp.events.call("client:screenshot.taken");
// 		ScreenShotTimer = true;
// 		setTimeout(() => { ScreenShotTimer = false; }, 6000);
// 	}
// });

// getPlayerHeading = () => { 
// 	let heading = player.getHeading(), headingString;
// 	if (heading >= 0 && heading <= 30) { headingString = "N"; }
// 	else if (heading >= 30 && heading <= 90) { headingString = "NW"; }
// 	else if (heading >= 90 && heading <= 135) { headingString = "W"; }
// 	else if (heading >= 135 && heading <= 180) { headingString = "SW"; }
// 	else if (heading >= 180 && heading <= 225) { headingString = "S"; }
// 	else if (heading >= 225 && heading <= 270) { headingString = "SE"; }
// 	else if (heading >= 270 && heading <= 315) { headingString = "E" ; }
// 	else if (heading >= 315 && heading <= 360) { headingString = "NE"; }
// 	return headingString;
// }

// mp.events.add({
// 	'render': () => { // hiding default GTA Hud
// 		mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
// 		mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
// 		mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
// 		mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
// 		mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
// 		mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
// 		mp.game.ui.hideHudComponentThisFrame(14); // CROSSHAIR
// 		mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
// 		mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS

	
// 		mp.game.invoke('0x9E4CFFF989258472');
// 		mp.game.invoke('0xF4F2C0D4EE209E20');

// 		// disable tab weapon wheel // ENABLE LATER
// 		// mp.game.controls.disableControlAction(32, 37, true); 


// 		// show Crosshair if player is aiming with AWP
// 		let playerWeapon = player.weapon;
// 		if (playerWeapon == '0x05FC3C11' || playerWeapon == '0x0C472FE2' || playerWeapon == '0xA914799' || playerWeapon == '0xC734385A' || playerWeapon == '0x6A6C02E0') {
// 			mp.game.ui.showHudComponentThisFrame(14);
// 		}
	

//       // FINISH
// 		// if (playerWeapon != mp.game.joaat('weapon_unarmed')) { 
// 		// 	if (player.weapon == 0 || player.isActiveInScenario()) return;
// 		// 	let ammoCount = getAmmoCount(playerWeapon);
// 		// 	let weapon = getWeaponString();
// 		// 	playerHUD.execute(`hud.weapon.have = true, hud.weapon.ammo = ${ammoCount}, hud.weapon.hash = \"${weapon}\";`); 
// 		// } else if (playerWeapon == mp.game.joaat('weapon_unarmed')) { 
// 		// 	playerHUD.execute(`hud.weapon.have = false;`);
// 		// }

// 		// update veh speed if driver
// 		if (player.vehicle && isDriving) { vehicle() }

// 	},

// 	'client:hud.vehicle': (toggle) => { 
// 		playerHUD.execute(`hud.vehicle.driving = ${toggle};`); 
// 		isDriving = toggle;
// 	},

// 	'client:hud.black_screen': () => { 
// 		playerHUD.execute(`hud.black_screen = !hud.black_screen;`); 
// 	},

// 	'client:screenshot.taken': () => {
// 		screenshotBrowser = mp.browsers.new("package://player/hud-interface/screen.html");
// 	},

// 	'browserDomReady': (browser) => {
// 		if(browser != screenshotBrowser) return;
// 		screenshotBrowser.call("client:screenshot.receive", `http://screenshots/${photoName}`);
//   },

//   'client:screenshot.send.to.server': (base64) => {
// 		let street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);
// 		let zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z));
// 		let streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName);
// 		mp.events.callRemote('server:disord.screenshot:send', base64, zoneName, streetName);
// 		setTimeout(() => {
// 			screenshotBrowser.destroy();
// 			screenshotBrowser = false;
// 		}, 6500);
// 	},

// })

// vehicle = () => { 
// 	let vehicle = player.vehicle;
// 	let vehicleSpeed = vehicle.getSpeed();
// 	let lights = vehicle.getLightsState(1, 1);
// 	let lightsStatus = 0;
// 	vehicleSpeed = vehicleSpeed * 3.6;


// 	playerHUD.execute(`hud.vehicle.speed = ${vehicleSpeed}, hud.vehicle.lights = ${lightsStatus};`); 
// }



// function getAmmoInClip (weaponHash){
// 	if (hasWeapon(weaponHash)){
// 		let clipCount = mp.game.invoke("0xA38DCFFCEA8962FA", mp.players.local.handle, parseInt(weaponHash) >> 0, 0)
// 		if (clipCount > 360) clipCount = null 
// 		return clipCount
// 	}
// 	return 0
// }

// // Modifying default GTA escape menu

// mp.game.gxt.set('PM_PAUSE_HDR', 'Focus Roleplay'); 
// mp.game.gxt.set('PM_CASH', '$~500000~'); // Pare







/***/ }),

/***/ 1880:
/***/ (() => {



// //mp.gui.chat.show(false);

// const Player = mp.players.local;

// // let browser = mp.browsers.new('package://player/game-interface/main.html');
// //let Chat = mp.browsers.new('package://player/game-interface/chat.html');
// //Chat.markAsChat();

// let active = false, Timer = null;
// let Radar = true;

// let InterfaceStatus = 0;

// global.GameInterface = browser;

// mp.keys.bind(0x76, true, function() {
//    if (Player.logged && Player.spawned) { 
//       InterfaceStatus ++;
//       if (InterfaceStatus > 2) InterfaceStatus = 0;
//       switch (InterfaceStatus) { 
//          case 0: {
//             active = true;
//             browser.execute('hud.toggle = true;');
//             Chat.execute('chat.Toggle = true;');
//             mp.game.ui.displayRadar(true);
//             break;
//          } 
//          case 1: { 
//             Chat.execute('chat.Toggle = false;'); 
//             break;
//          }
//          case 2: { 
//             active = false;
//             browser.execute('hud.toggle = false;');
//             mp.game.ui.displayRadar(false);
//             break; 
//          }
//       }
//    }
// });

// mp.events.add({
//    'client:player.interface:toggle': () => { 
//       active = !active;
//       browser.execute('hud.toggle = !hud.toggle;');
//       if (active) 
//          Timer = setInterval(Update, 1000);
//       else
//          if (Timer) clearInterval(Timer);
//    },

//    'client:player.interface:notification': Notify,

//    'client:player.interface:instructions': Instructions,

//    'client:player.interface:black': () => { browser.execute('hud.black = !hud.black;'); },

//    'render': () => { 
//       HideDefault();

//       if (Player.vehicle) Vehicle();

//       // if (Player.weapon != mp.game.joaat('weapon_unarmed')) { 
//       //    let Weapon = utils.weaponString(Player.weapon);
//       //    let ammoCount = getAmmoCount(Player.weapon);
//       //    browser.execute('hud.weapon.hash = \"' + Weapon + '\", hud.weapon.ammo = ')
//       // } else if (Player.weapon == mp.game.joaat('weapon_unarmed')) { 
//       //    browser.execute('hud.weapon.hash = null;')
//       // }
//    },

//    'playerEnterVehicle': (vehicle, seat) => { 
//       if (seat == -1) {
//          if (browser) browser.execute('hud.Vehicle(true);')
//       }
//    },

//    'playerLeaveVehicle': (vehicle, seat) => { 
//       if (seat == -1) {
//          if (browser) browser.execute('hud.Vehicle(false);')
//       }
//    },

   
// 	'client:clone.ped' : (toggle) => {
//       mp.gui.chat.push('even pozvan')
// 		cloneLocalPedToScreen(toggle);
// 	}
		
// });




// function Update () { 
//    if (browser) { 
//       browser.execute('hud.players = ' + mp.players.length + ', hud.money = ' + Player.Money + ', hud.id = ' + Player.remoteId + ';');
//       LocationUpdate();
//    }
// }


// function getGear (i) { 
//    let vehicle = Player.vehicle;

//    if (i == 0 && !vehicle.isStopped()) return 'R';
//    else if (i == 0) return 'N';
//    else return i;
// }


// function Vehicle () { 
//    let vehicle = Player.vehicle;
//    let Speed = vehicle.getSpeed() * 3.6;
//    let Gear = getGear(vehicle.gear).toString();
//    let Lights = vehicle.getLightsState(1, 1);
//    let Indicators = [vehicle.getVariable('IndicatorLeft'), vehicle.getVariable('IndicatorRight')];
//    let EngineFailure = vehicle.getEngineHealth() < 300 ? true : false;
//    // Mileage, Fuel...

//    browser.execute('hud.Fuel(' + (100 - Speed) + ')');
//    browser.execute('hud.vehicle.gear = \"' + Gear + '\";');
//    browser.execute('hud.vehicle.indicators = ' + JSON.stringify(Indicators));
//    browser.execute('hud.vehicle.engine_failure = ' + EngineFailure);
//    browser.execute('hud.vehicle.lights = ' + JSON.stringify(Lights));
//    browser.execute('hud.seatbelt = ' + Player.getVariable('Seatbelt'));
// }

// function Notify (message, type, time = 4) { 
//    if (browser) browser.execute('hud.Notification(\"' + message + '\", \"' + type + '\", ' + time + ');')
// }

// function Instructions (content, time = 4) { 
//    if (browser) browser.execute('hud.Instructions(\"' + content + '\", ' + time + ');')
// }

// function hasWeapon (weaponHash){
// 	return mp.game.invoke("0x8DECB02F88F428BC", mp.players.local.handle, parseInt(weaponHash) >> 0, 0)
// }


// function getAmmoCount (weaponHash){
// 	if (hasWeapon(weaponHash)){
// 		let ammoCount = mp.game.invoke("0x015A522136D7F951", mp.players.local.handle, parseInt(weaponHash) >> 0)
// 		if (ammoCount > 999) ammoCount = null
// 		return ammoCount
// 	}
// 	return 0
// }


// function getHeading () { 
//    let H = Player.getHeading(), Heading;
//    switch (true) {
//       case (H < 30): Heading = 'N'; break;
//       case (H < 90): Heading = 'NW'; break;
//       case (H < 135): Heading = 'W'; break;
//       case (H < 180): Heading = 'SW'; break;
//       case (H < 225): Heading = 'S'; break;
//       case (H < 270): Heading = 'SE'; break;
//       case (H < 315): Heading = 'E'; break;
//       case (H < 360): Heading = 'NE'; break;
//       default: Heading = 'N'; break;
//    }
//    return Heading;
// }


// function LocationUpdate () { 

//       Heading = getHeading();

//    browser.execute('hud.location.street = \"' + Street + '\";');
//    browser.execute('hud.location.zone = \"' + Zone + '\";');
//    browser.execute('hud.location.heading = \"' + Heading + '\";');
// }


// mp.game.gxt.set('PM_PAUSE_HDR', 'Focus Roleplay'); 


// function HideDefault () {


//    // mp.game.controls.disableControlAction(1, 263, true);
//    mp.game.controls.disableControlAction(1, 140, true);
//    // mp.game.controls.disableControlAction(1, 141, true); // Q Heavy Attack mele


//    // disable tab weapon wheel
//    mp.game.controls.disableControlAction(32, 37, true); 

//    // show Crosshair if player is aiming with AWP
//    let playerWeapon = Player.weapon;
//    if (playerWeapon == '0x05FC3C11' || playerWeapon == '0x0C472FE2' || playerWeapon == '0xA914799' || playerWeapon == '0xC734385A' || playerWeapon == '0x6A6C02E0') {
//       mp.game.ui.showHudComponentThisFrame(14);
//    }
// }



/***/ }),

/***/ 3351:
/***/ (() => {



const player = mp.players.local;
// let browser = mp.browsers.new('package://player/phone-interface/phone.html'), opened = false;


mp.events.add({
   'client:player.phone': (phone) => { 
      if (!opened) { 
         opened = true;
         browser.execute('phone.toggle = true');
      } else { 
         opened = false;
         browser.execute('phone.toggle = false');
      }
   },

   

   'client:player.phone.contacts': (action, info) => { 
      info = JSON.parse(info)
      switch (action) { 
         case 'add': { mp.events.callRemote('server:player.phone.contacts.add', info.name, info.number); break; }
         case 'remove': { mp.events.callRemote('server:player.phone.contacts.remove', info.id); break; }
      }
   }
})




/***/ }),

/***/ 8689:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { Controls } = __webpack_require__(8675);


const Player = mp.players.local;

let browsers = { licenses: null, identity: null };
let opened = { licenses: false, identity: false };


mp.events.add({
   'client:player.documents:show': (Document, Info) => { 
      switch (Document) { 
         case 'identity': { 
            opened.identity = !opened.identity;
            if (opened.identity) { 
               browsers.identity = mp.browsers.new('package://player/documents/documents-interfaces/identity.html');
               browsers.identity.execute('identity.player = ' + JSON.stringify(Info));
            } else { 
               if (browsers.identity) browsers.identity.destroy();
            }
            break;
         }

         case 'licenses': { 
            opened.licenses = !opened.licenses;
            if (opened.licenses) { 
               browsers.licenses = mp.browsers.new('package://player/documents/documents-interfaces/licenses.html');
               browsers.licenses.execute('licenses.player = ' + JSON.stringify(Info));
            } else { 
               if (browsers.licenses) browsers.licenses.destroy();
            }
            break;
         }
      }
   }
})


mp.keys.bind(Controls.ENTER, false, function(e) {
   if (Player.logged && Player.spawned) { 
      if (Player.isTypingInTextChat) return;
      if (opened.identity) mp.events.call('client:player.documents:show', 'identity');
      if (opened.licenses) mp.events.call('client:player.documents:show', 'licenses');
   }
});

/***/ }),

/***/ 5639:
/***/ (() => {




const VehiclesList = [
"chimera","carbonrs","faggio2","youga","glendale","bf400","kalahari","trophytruck","coquette","boxville","elegy","speedo4","gburrito2","hexer","stafford","surano","cliffhanger","lynx","fusilade","khamelion","romero","fcr","lectro","comet5","bruiser","boxville5","drafter","surfer","cog552","ruston","speedo2","buffalo2","gargoyle","sovereign","alpha","sanchez","defiler","monster4","pariah","oppressor","intruder","burrito","cog55","rrocket","pony","sultan","sandking2","youga2","ninef","blista2","bobcatxl","specter2","verlierer2","sentinel3","hotring","superd","bfinjection","rumpo","technical2","marshall","caracara","hakuchou","bestiagts","technical3","warrener","paragon2","rumpo3","paradise","schafter4","sanctus","comet4","rancherxl","akuma","monster3","stratum","rapidgt","bison","streiter","enduro","dloader","washington","diablous2","thrust","issi7","ratbike","camper","specter","tropos","dune3","fugitive","gb200","schafter6","taco","daemon","futo","esskey","brutus3","menacer","oppressor2","insurgent2","carbonizzare","brutus","bagger","blazer","avarus","technical","rebel2","bruiser3","primo2","cognoscenti","comet3","feltzer2","stretch","insurgent3","asterope","surge","brutus2","premier","emperor","insurgent","neon","faggio","deathbike2","asea","seven70","gburrito","bruiser2","double","dune","neo","nightblade","blazer5","riata","raiden","manchez","schafter3","brawler","zr3803","stanier","ninef2","sanchez2","bodhi2","daemon2","deathbike3","kuruma","vindicator","caracara2","surfer2","jester","ingot","faggio3","blazer3","flashgt","schafter2","dubsta3","rebel","sandking","primo","minivan2","jester2","zr3802","furoregt","tampa2","comet2","banshee","zombiea","tailgater","locust","pcj","ruffian","bati2","schafter5","monster","dune4","speedo","omnis","fcr2","schwarzer","monster5","raptor","trophytruck2","nemesis","massacro2","wolfsbane","vortex","cognoscenti2","blista3","zombieb","elegy2","schlagen","paragon","blazer4","revolter","shotaro","penumbra","hellion","bifta","italigto","dune5","minivan","buffalo","rcbandito","hakuchou2","diablous","jester3","jugular","innovation","massacro","vader","kamacho","journey","limo2","bati","freecrawler","blazer2","deathbike","regina"
];

let Current = 0;
let Vehicle = null;

const Positions = {
   Vehicle: new mp.Vector3(-1573.966796875, -365.6707763671875, 202.30532836914062),
   Camera: new mp.Vector3(-1574.472412109375, -375.8471984863281, 203.66571044921875),
   CameraLook: new mp.Vector3(-1573.966796875, -365.6707763671875, 202.30532836914062)
}

const Player = mp.players.local;

mp.events.add({

   'CLIENT:PLAYER.PEDSHOT': () => { 
      let pedHeadShot;
      if (pedHeadShot == null) {
          pedHeadShot = mp.players.local.registerheadshot();
          mp.gui.chat.push(`pedHeadShot: ${pedHeadShot}`);
      }
      
      mp.events.add('render', () => {
          if (pedHeadShot == null) {
              pedHeadShot = mp.players.local.registerheadshot();
              mp.gui.chat.push(`pedHeadShot: ${pedHeadShot}`);
          }
          if (mp.game.ped.isPedheadshotValid(pedHeadShot) && mp.game.ped.isPedheadshotReady(pedHeadShot)) {
              const headshotTexture = mp.game.ped.getPedheadshotTxdString(pedHeadShot);
         
              mp.game.graphics.drawSprite(headshotTexture, headshotTexture, 0.5, 0.5, 0.1, 0.1, 0, 255, 255, 255, 100);
          }
      });
   },
   
   'CLIENT::VEHICLES:SCREENSHOT': async () => { 
      Player.position = new mp.Vector3(-1570.5236, -384.4845, 202.98943);
      mp.game.ui.displayRadar(false);
      Player.freezePosition(true);

      mp.game.wait(100);

      mp.gui.chat.push('slikanje pokrenuto');
      let Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true);
      Camera.setCoord(Positions.Camera.x, Positions.Camera.y, Positions.Camera.z);
      Camera.pointAtCoord(Positions.CameraLook.x, Positions.CameraLook.y, Positions.CameraLook.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      
      mp.game.wait(50);

      do {
         if (Vehicle) { 
            Vehicle.model = mp.game.joaat(VehiclesList[Current]);
            Vehicle.setColours(132, 132);
            Vehicle.freezePosition(true);
            Vehicle.numberPlateType = 1;
         } else { 
            Vehicle = mp.vehicles.new(mp.game.joaat(VehiclesList[Current]), Positions.Vehicle, {
               numberPlate: 'focus', heading: 138,
            });
            Vehicle.freezePosition(true);
            mp.game.wait(30);
            Vehicle.setColours(132, 132);
         }
         mp.game.wait(50);
         mp.gui.takeScreenshot(VehiclesList[Current] + '.png', 1, 100, 0);
         mp.game.wait(40);
         Current ++;
      } while (Current != VehiclesList.length -1);


      if (Camera) Camera.destroy();
      if (Vehicle) Vehicle.destroy();
      mp.gui.chat.push('slikanje zavrseno');
      Camera = null;
      Vehicle = null;
      Current = 0;
      Player.freezePosition(false);
      mp.game.ui.displayRadar(true);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);

   }
})

/***/ }),

/***/ 5568:
/***/ (() => {








// CLIENTSIDE / inventory.js




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(2910);
/******/ 	__webpack_require__(6054);
/******/ 	__webpack_require__(9633);
/******/ 	__webpack_require__(1252);
/******/ 	__webpack_require__(7588);
/******/ 	__webpack_require__(8621);
/******/ 	__webpack_require__(7313);
/******/ 	__webpack_require__(3568);
/******/ 	__webpack_require__(8574);
/******/ 	__webpack_require__(1235);
/******/ 	__webpack_require__(5415);
/******/ 	__webpack_require__(7724);
/******/ 	__webpack_require__(9232);
/******/ 	__webpack_require__(6142);
/******/ 	__webpack_require__(368);
/******/ 	__webpack_require__(9745);
/******/ 	__webpack_require__(2291);
/******/ 	__webpack_require__(1828);
/******/ 	__webpack_require__(7845);
/******/ 	__webpack_require__(8934);
/******/ 	__webpack_require__(2082);
/******/ 	__webpack_require__(8412);
/******/ 	__webpack_require__(7908);
/******/ 	__webpack_require__(3953);
/******/ 	__webpack_require__(805);
/******/ 	__webpack_require__(8181);
/******/ 	__webpack_require__(2198);
/******/ 	__webpack_require__(537);
/******/ 	__webpack_require__(1021);
/******/ 	__webpack_require__(8545);
/******/ 	__webpack_require__(1451);
/******/ 	__webpack_require__(3890);
/******/ 	__webpack_require__(5987);
/******/ 	__webpack_require__(2666);
/******/ 	__webpack_require__(7364);
/******/ 	__webpack_require__(9749);
/******/ 	__webpack_require__(551);
/******/ 	__webpack_require__(5161);
/******/ 	__webpack_require__(7502);
/******/ 	__webpack_require__(3499);
/******/ 	__webpack_require__(8767);
/******/ 	__webpack_require__(6705);
/******/ 	__webpack_require__(1148);
/******/ 	__webpack_require__(9808);
/******/ 	__webpack_require__(8689);
/******/ 	__webpack_require__(521);
/******/ 	__webpack_require__(2929);
/******/ 	__webpack_require__(7188);
/******/ 	__webpack_require__(889);
/******/ 	__webpack_require__(4505);
/******/ 	__webpack_require__(1880);
/******/ 	__webpack_require__(1141);
/******/ 	__webpack_require__(6106);
/******/ 	__webpack_require__(3351);
/******/ 	__webpack_require__(5168);
/******/ 	__webpack_require__(8354);
/******/ 	__webpack_require__(5639);
/******/ 	__webpack_require__(5568);
/******/ 	__webpack_require__(8675);
/******/ 	__webpack_require__(5170);
/******/ 	__webpack_require__(7705);
/******/ 	var __webpack_exports__ = __webpack_require__(8652);
/******/ 	
/******/ })()
;