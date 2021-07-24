/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2910:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Browser = void 0;
exports.Browser = mp.browsers.new('localhost:8080');
// Browser.markAsChat();


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
    UI_Status[UI_Status["Chat_Hidden"] = 1] = "Chat_Hidden";
    UI_Status[UI_Status["Fully_Hidden"] = 2] = "Fully_Hidden";
})(UI_Status || (UI_Status = {}));
;
let Configuration = {
    Status: UI_Status.Fully_Hidden
};
mp.events.add({
    'CLIENT::NOTIFICATION': (Message, Type, Time) => {
        Browser_1.Browser.call('BROWSER::NOTIFICATION', Message, Type, Time);
    }
});


/***/ }),

/***/ 551:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
const Player = mp.players.local;
mp.events.add({
    'playerReady': async () => {
        const Info = await mp.events.callRemoteProc('SERVER::PLAYER:LOBY');
        Lobby(true, Info.Position, Info.LookAt);
    }
});
mp.events.addProc({
    'CLIENT:AUTHORIZATION:SEND_CREDENTIALS': async (Username, Password) => {
        const Response = await mp.events.callRemoteProc('SERVER::AUTHORIZATION:VERIFY', Username, Password);
        mp.gui.chat.push(JSON.stringify(Response));
        return Response;
    }
});
let Camera;
function Lobby(Toggle, Position, LookAt) {
    if (Toggle) {
        Player.position = new mp.Vector3(Position.x, Position.y + 1, Position.z);
        Player.freezePosition(true);
        Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
        Camera.setActive(true);
        Camera.setCoord(Position.x, Position.y, Position.z);
        Camera.pointAtCoord(LookAt.x, LookAt.y, LookAt.z);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        mp.game.ui.displayRadar(false);
    }
    else {
        if (Camera)
            Camera.destroy();
        Player.freezePosition(false);
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
        mp.game.ui.displayRadar(true);
    }
}
__webpack_unused_export__ = Lobby;


/***/ }),

/***/ 5639:
/***/ (() => {




const Vehicles = [
"chimera","carbonrs","faggio2","youga","glendale","bf400","kalahari","trophytruck","coquette","boxville","elegy","speedo4","gburrito2","hexer","stafford","surano","cliffhanger","lynx","fusilade","khamelion","romero","fcr","lectro","comet5","bruiser","boxville5","drafter","surfer","cog552","ruston","speedo2","buffalo2","gargoyle","sovereign","alpha","sanchez","defiler","monster4","pariah","oppressor","intruder","burrito","cog55","rrocket","pony","sultan","sandking2","youga2","ninef","blista2","bobcatxl","specter2","verlierer2","sentinel3","hotring","superd","bfinjection","rumpo","technical2","marshall","caracara","hakuchou","bestiagts","technical3","warrener","paragon2","rumpo3","paradise","schafter4","sanctus","comet4","rancherxl","akuma","monster3","stratum","rapidgt","bison","streiter","enduro","dloader","washington","diablous2","thrust","issi7","ratbike","camper","specter","tropos","dune3","fugitive","gb200","schafter6","taco","daemon","futo","esskey","brutus3","menacer","oppressor2","insurgent2","carbonizzare","brutus","bagger","blazer","avarus","technical","rebel2","bruiser3","primo2","cognoscenti","comet3","feltzer2","stretch","insurgent3","asterope","surge","brutus2","premier","emperor","insurgent","neon","faggio","deathbike2","asea","seven70","gburrito","bruiser2","double","dune","neo","nightblade","blazer5","riata","raiden","manchez","schafter3","brawler","zr3803","stanier","ninef2","sanchez2","bodhi2","daemon2","deathbike3","kuruma","vindicator","caracara2","surfer2","jester","ingot","faggio3","blazer3","flashgt","schafter2","dubsta3","rebel","sandking","primo","minivan2","jester2","zr3802","furoregt","tampa2","comet2","banshee","zombiea","tailgater","locust","pcj","ruffian","bati2","schafter5","monster","dune4","speedo","omnis","fcr2","schwarzer","monster5","raptor","trophytruck2","nemesis","massacro2","wolfsbane","vortex","cognoscenti2","blista3","zombieb","elegy2","schlagen","paragon","blazer4","revolter","shotaro","penumbra","hellion","bifta","italigto","dune5","minivan","buffalo","rcbandito","hakuchou2","diablous","jester3","jugular","innovation","massacro","vader","kamacho","journey","limo2","bati","freecrawler","blazer2","deathbike","regina"
];

let Current = 0;
let Vehicle = null;

const Positions = {
   Vehicle: new mp.Vector3(-1573.966796875, -365.6707763671875, 202.30532836914062),
   Camera: new mp.Vector3(-1574.472412109375, -375.8471984863281, 203.66571044921875),
   CameraLook: new mp.Vector3(-1573.966796875, -365.6707763671875, 202.30532836914062)
}



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
            Vehicle.model = mp.game.joaat(Vehicles[Current]);
            Vehicle.setColours(132, 132);
            Vehicle.freezePosition(true);
            Vehicle.numberPlateType = 1;
         } else { 
            Vehicle = mp.vehicles.new(mp.game.joaat(Vehicles[Current]), Positions.Vehicle, {
               numberPlate: 'focus', heading: 138,
            });
            Vehicle.freezePosition(true);
            mp.game.wait(30);
            Vehicle.setColours(132, 132);
         }
         mp.game.wait(50);
         mp.gui.takeScreenshot(Vehicles[Current] + '.png', 1, 100, 0);
         mp.game.wait(40);
         Current ++;
      } while (Current != Vehicles.length -1);


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




/***/ }),

/***/ 2591:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


const Player = mp.players.local;

const Server = {
   Color: {
      R: 104, G: 69, B: 234, A: 255
   }
}

function CompareVectors (i, x) { 
   return i.x == x.x && i.y == x.y && i.z == x.z;
};


function LoadAnimDict (i) { 
   if (mp.game.streaming.hasAnimDictLoaded(i)) return Promise.resolve();
   return new Promise(async resolve => { 
      mp.game.streaming.requestAnimDict(i);
      while (!mp.game.streaming.hasAnimDictLoaded(i)) { 
         await mp.game.waitAsync(0);bro
      }
      resolve();
   })
};


function LoadMovementClipset (Clipset) { 
   if (mp.game.streaming.hasClipSetLoaded(Clipset)) return Promise.resolve();
   return new Promise(async resolve => { 
      mp.game.streaming.requestClipSet(Clipset);
      while (!mp.game.streaming.hasClipSetLoaded(Clipset)) { 
         await mp.game.waitAsync(10);
      }
      resolve();
   })
}



function WaitEntity (entity) {
   return new Promise(resolve => {
      let wait = setInterval(() => {
         if (mp.game.entity.isAnEntity(entity.handle)) {
            clearInterval(wait);
            resolve();
         }
      }, 1);
   });
}

function weaponString (weapon) {
	if (typeof weapon !== 'undefined')
		return '0x' + weapon.toString(16).toUpperCase()
	else 
		return '0xA2719263'
}



function Distance (first, second) {
   return new mp.Vector3(first.x, first.y, first.z).subtract(new mp.Vector3(second.x, second.y, second.z)).length();
}


function OnlinePlayers () {
   let list = [];
   mp.players.forEach(_Player => {
      list.push({ id: _Player.remoteId, name: _Player.name }); 
   }); 
   return list;
}


function GetAdress (position) { 
   const path = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0),
      Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(position.x, position.y, position.z)),
      Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
   return { zone: Zone, street: Street };
}


function BrowserControls (freezeControls, mouse) {
   mouse ? mp.gui.chat.activate(false) : mp.gui.chat.activate(true);
   
   setTimeout(() => { mp.gui.cursor.show(freezeControls, mouse); }, 250);
}

Player.BrowserControls = BrowserControls;


let MovableCamera = null;

function PlayerPreviewCamera (toggle) { 
   if (toggle) { 
      MovableCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      const CameraPositon = new mp.Vector3(Player.position.x + Player.getForwardX() * 1.5, Player.position.y + Player.getForwardY() * 1.5, Player.position.z);
      MovableCamera.setCoord(CameraPositon.x, CameraPositon.y, CameraPositon.z);
      MovableCamera.pointAtCoord(Player.position.x, Player.position.y, Player.position.z);
      MovableCamera.setActive(true);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
   
      mp.events.add('render', MoveCamera);
      mp.events.add('client:player.camera:zoom', ZoomCamera);
   } else { 
      mp.events.remove('render', MoveCamera);
      mp.events.remove('client:player.camera:zoom', ZoomCamera);
      if (MovableCamera) MovableCamera.destroy();
      MovableCamera = null;
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
   }
}

function ZoomCamera (delta) {
   let { x, y, z } = MovableCamera.getCoord();

   if (delta < 0) { 
      x += MovableCamera.getDirection().x * 0.1;
      y += MovableCamera.getDirection().y * 0.1;
      
   } else { 
      x -= MovableCamera.getDirection().x * 0.1;
      y -= MovableCamera.getDirection().y * 0.1;
   }

   const dist = mp.game.gameplay.getDistanceBetweenCoords(Player.position.x, Player.position.y, Player.position.z, x, y, z, false);
   if (dist > 3.5 || dist < 0.3) return;

   MovableCamera.setPosition(x, y, z);
}

let [PrevX, PrevY] = mp.gui.cursor.position;

function CursorData () { 
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}

function MoveCamera () { 
   const Data = CursorData();

   if (!mp.keys.isDown(0x02)) return;
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


function CreateInteractionSpot (name, position) { 
   const checkpoint = mp.checkpoints.new(48, position, 2.5, { color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
   const blip = mp.blips.new(1, new mp.Vector3(position.x, position.y, 0), { name: name, color: 1, shortRange: false });
   return { checkpoint: checkpoint, blip: blip };
};

Player.CreateInteractionSpot = CreateInteractionSpot;


__webpack_require__.g.utils = { CompareVectors, LoadAnimDict, weaponString, Distance, OnlinePlayers, GetAdress, PlayerPreviewCamera, WaitEntity, LoadMovementClipset, Server };


/***/ }),

/***/ 994:
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

/***/ 2983:
/***/ (() => {



const Player = mp.players.local;
let browser = null, opened = false;


mp.events.add({
   'client:business:menu': (type, business) => { 
      opened = !opened;
      if (opened) { 

      } else { 

      }
   }
});


/***/ }),

/***/ 9853:
/***/ (() => {



const Player = mp.players.local;
let browser = null, opened = false;

mp.events.add({
   'client:business.clothing:menu': (info) => {
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/clothing.html');
         browser.execute('clothing.Business = ' + JSON.stringify(info));
         Player.BrowserControls(true, true);
         utils.PlayerPreviewCamera(true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
         utils.PlayerPreviewCamera(false);
         mp.events.callRemote('server:character.clothing:restart');
      }
   },
      
   'client:business.clothing:model:preview': (x, component, variation) => { 
      Player.setComponentVariation(component, variation, 0, 2);
   },

   'client:business.clothing:texture:preview': (x, component, texture) => { 
      const Variation = Player.getDrawableVariation(component);
      Player.setComponentVariation(component, Variation, texture, 2);
   },
   
   'client:business.clothing:buy': (total, items, biz) => { 
      mp.events.call('client:business.clothing:menu');
      mp.events.callRemote('server:business.clothing:buy', total, items, biz);
   }
})







/***/ }),

/***/ 3582:
/***/ (() => {



const Player = mp.players.local;
let browser = null, opened = false, Vehicle = null, camera = null;

let Point = null;

mp.events.add({
   'client:business.dealership:menu': (info) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/dealership.html');
         browser.execute('dealership.Business = ' + JSON.stringify(info));
         Player.BrowserControls(true, true);

         Point = new mp.Vector3(info.Point.x, info.Point.y, info.Point.z);

         camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
         camera.setActive(true);
         camera.setCoord(Point.x + 6, Point.y, Point.z);
         camera.pointAtCoord(Point.x, Point.y, Point.z);
         mp.game.cam.renderScriptCams(true, false, 0, true, false);
         mp.events.add('render', MoveCamera);

         Preview(info.Products[0].Model);

      } else { 
         if (browser) browser.destroy();
         if (camera) camera.destroy();
         camera = null;
         mp.game.cam.renderScriptCams(false, false, 0, false, false);
         Vehicle.destroy();
         Player.BrowserControls(false, false);
         mp.events.remove('render', MoveCamera);
      }
   },

   'client:vehicle.dealership:zoom': (delta) => { 

      let { x, y, z } = camera.getCoord();

      if (delta < 0) { 
         x += camera.getDirection().x * 0.2;
         y += camera.getDirection().y * 0.2;
         
      } else { 
         x -= camera.getDirection().x * 0.2;
         y -= camera.getDirection().y * 0.2;
      }

      const dist = mp.game.gameplay.getDistanceBetweenCoords(Vehicle.position.x, Vehicle.position.y, Vehicle.position.z, x, y, z, false);
      if (dist > 12.5 || dist < 0.8) return;

      camera.setPosition(x, y, z);
   },

   'client:business.dealership:preview': Preview,

   'client:business.dealership:customization': (primary, secondary) => { 
      Vehicle.setColours(parseInt(primary), parseInt(secondary));
   },

   'client:business.dealership.vehicle:buy': (total, model, color, biz) => { 
      mp.events.callRemote('server:business.dealership.vehicle:buy', total, model, color, biz);
   }

})

async function Preview (model) { 
   if (mp.vehicles.exists(Vehicle)) { 
      if (Vehicle.handle === 0) await mp.game.waitAsync(0);
      Vehicle.model = mp.game.joaat(model);
   } else { 
      Vehicle = mp.vehicles.new(mp.game.joaat(model), Point, { numberPlate: 'Dealership', alpha: 255, engine: false, heading: 90, dimension: Player.dimension });
   }
};


let [PrevX, PrevY] = mp.gui.cursor.position;

function CursorData () { 
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}

function MoveCamera () { 
   const Data = CursorData();

   if (!mp.keys.isDown(0x02)) return;
   const newHeading = Vehicle.getHeading() + Data.DeltaX * 0.15;
   Vehicle.setHeading(newHeading);

   let { x: camPosX, y: camPosY, z: camPosZ } = camera.getCoord();
   let { pointX: camPointX, pointY: camPointY, pointZ: camPointZ } = camera.getDirection();

   camPosZ = camPosZ + Data.DeltaY * 0.001;
   const { x: vehPosX, y: vehPosY, z: vehPosZ } = Vehicle.getCoords(true);

   if (camPosZ < vehPosZ + 1.0 && camPosZ > vehPosZ - 0.3) { 
      camera.setPosition(camPosX, camPosY, camPosZ);
      camera.pointAtCoord(vehPosX, vehPosY, camPosZ);
   }
}




/***/ }),

/***/ 3080:
/***/ (() => {




const Player = mp.players.local;

let browser = null, opened = false;

mp.events.add({
   'client:business.drinks:menu': (info) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/drinks.html');
         browser.execute('drinks.Business = ' + JSON.stringify(info));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:business.drinks:buy': (price, item, business) => { 
      mp.events.callRemote('server:business.drinks:buy', price, item, business);
   }
})

/***/ }),

/***/ 4403:
/***/ (() => {



/***/ }),

/***/ 9050:
/***/ (() => {




const Player = mp.players.local;
let browser = null, opened = false;

const Pumps = [ 1339433404, 1694452750, 1933174915, 2287735495 ];


mp.events.add({
   'client:business.gas:menu': (info) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/fuel.html');
         browser.execute('station.Business = ' + JSON.stringify(info.Business));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   }
})


mp.events.addProc({
   'client:business.gas:nearpump': async () => { 
      const Position = Player.position;
      return new Promise((resolve) => { 
         for (const Pump of Pumps) { 
            let object = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 3.0, Pump, false, true, true);
            if (object) {
               resolve(true)
               break;
            }
         }
      });
   }
});


/***/ }),

/***/ 9445:
/***/ (() => {



const Player = mp.players.local;
let browser = null, opened = false;

mp.events.add({
   'client:business.market:menu': (business) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/market.html');
         browser.execute('market.business = ' + JSON.stringify(business));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:business.market:buy': (bill, items, business) => { 
      mp.events.call('client:business.market:menu');
      mp.events.callRemote('server:bussines.market:buy', bill, items, business);
   }
});



/***/ }),

/***/ 4508:
/***/ (() => {




const Player = mp.players.local;
let browser = null, opened = false;

mp.events.add({
   'client:business.rent:menu': (business) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/rent.html');
         browser.execute('');
         Player.BrowserControls(true, true);

      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   }
})

/***/ }),

/***/ 4345:
/***/ (() => {

let canDoBets = true;
let betObject = null;
let closestChipSpot = null;
let rouletteTable = null;
let rouletteSeat = null;
let startRoullete = false;
let roulleteCam = false;
var blockControls = false;
var setBet = false;

let RouletteTables = [];

let betRoulette = [
    [],
    []
];


var CasinoPeds = [
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1145.337, 267.7967, -51.8409), Angle: 47.5},
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1149.791, 263.1628, -51.8409), Angle: 222.2},
];

var PrizePed = [
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1087.727, 221.20876, -49.220415), Angle: 178},
];

mp.blips.new(617, new mp.Vector3(935.8140869140625, 46.942176818847656, 81.09580993652344), { name: "Diamond Casino & Resort", color: 83, shortRange: true, scale: 1.0 });

const RouletteTablesSeatsHeading = (/* unused pure expression or super */ null && ([
    [45,-45,-135,-135],
    [225,135,45,45],

    [110.5,65.5,20.5, 330.5],
    [216.5,161.5,116.5, 66.5],
]));

const RouletteSeats = {
    0: "Chair_Base_04",
    1: "Chair_Base_03",
    2: "Chair_Base_02",
    3: "Chair_Base_01"
};


var CasinoPedsID = [];

var rouletteCamera = null;
var betCoords = null;

const RouletteCameraPos = [

    new mp.Vector3(1143.73, 268.9541, -52.960873 + 3.5),
    new mp.Vector3(1151.4585, 262.04517, -52.96084 + 3.5),
];


const RouletteCameraRot = [
	225,
   45
];


const RouletteCameraRotStop = [
	[-173, -112, -160],
	[13, 68, 17]
];



const RouletteTablesPos = [
    new mp.Vector3(1144.814, 268.2634, -52.8409),
    new mp.Vector3(1150.355, 262.7224, -52.8409),
];


const RouletteTablesHeading = [
    -135,
    45
];


setTimeout(function () {
for(let tbs = 0; tbs < RouletteTablesPos.length; tbs++){
    RouletteTables[tbs] = {};
    RouletteTables[tbs].table = mp.objects.new(mp.game.joaat('vw_prop_casino_roulette_01'), new mp.Vector3( RouletteTablesPos[tbs].x, RouletteTablesPos[tbs].y, RouletteTablesPos[tbs].z), {
        rotation: new mp.Vector3(0, 0, RouletteTablesHeading[tbs]),
        alpha: 255,
        dimension: 0
    });
    RouletteTables[tbs].ball = mp.objects.new(87196104, new mp.Vector3( RouletteTablesPos[tbs].x, RouletteTablesPos[tbs].y, RouletteTablesPos[tbs].z));
}
}, 1000);


setTimeout(function () {
    mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
    let n = 0;
    CasinoPeds.forEach(ped => {
        CasinoPedsID[n] = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        CasinoPedsID[n].setComponentVariation(0, 2, 1, 0);
        CasinoPedsID[n].setComponentVariation(1, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(2, 2, 0, 0);
        CasinoPedsID[n].setComponentVariation(3, 0, n + 2, 0);
        CasinoPedsID[n].setComponentVariation(4, 0, 0, 0);
        CasinoPedsID[n].setComponentVariation(6, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(7, 2, 0, 0);
        CasinoPedsID[n].setComponentVariation(8, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(10, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(11, 1, 0, 0);
        CasinoPedsID[n].setConfigFlag(185, true);
        CasinoPedsID[n].setConfigFlag(108, true);
        CasinoPedsID[n].setConfigFlag(208, true);
        CasinoPedsID[n].taskPlayAnim("anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false);
        n = n + 1;
        //CasinoPedsID[0].playFacialAnim("idle_facial", "anim_casino_b@amb@casino@games@shared@dealer@");
        //mp.game.invoke("0xEA47FE3719165B94", CasinoPedsID[0].handle, "anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)
    });
	n = 0;

	PrizePed.forEach(ped => {
		var ped = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        ped.setComponentVariation(0, 2, 1, 0);
        ped.setComponentVariation(1, 1, 0, 0);
		  ped.setComponentVariation(2, 2, 0, 0);
        ped.setComponentVariation(3, 0, n + 2, 0);
        ped.setComponentVariation(4, 0, 0, 0);
        ped.setComponentVariation(6, 1, 0, 0);
        ped.setComponentVariation(7, 2, 0, 0);
        ped.setComponentVariation(8, 1, 0, 0);
        ped.setComponentVariation(10, 1, 0, 0);
        ped.setComponentVariation(11, 1, 0, 0);
        ped.setConfigFlag(185, true);
        ped.setConfigFlag(108, true);
        ped.setConfigFlag(208, true);
	})

}, 10000);

mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@player@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@table");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@dealer");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@ped_male@seat_1@regular@01a@base");
mp.game.streaming.requestAnimDict("anim_casino_a@amb@casino@games@lucky7wheel@male");
mp.game.streaming.requestIpl("vw_casino_main");

mp.events.add('luckyWheel', (entity) => {
	let wheelPos = new mp.Vector3(1110.2651, 228.62857, -50.7558);
	
	mp.game.invoke("0x960C9FF8F616E41C", "Press ~INPUT_PICKUP~ to start shopping", true);
	entity.taskGoStraightToCoord(wheelPos.x, wheelPos.y, wheelPos.z, 1.0,  -1,  312.2,  0.0);

	setTimeout(() => {
		entity.setRotation(0.0, 0.0, 2.464141, 1, true);
		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "enter_right_to_baseidle", 8.0, -8.0, -1, 0, 0, false, false, false);
	}, 1000);

	setTimeout(() => {

		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "enter_to_armraisedidle", 8.0, -8.0, -1, 0, 0, false, false, false);
		if(entity == mp.players.local){

			setTimeout(() => {
				mp.events.callRemote('startRoll');
				entity.freezePosition(true);
				rouletteCamera = mp.cameras.new('default', new mp.Vector3(1111.015, 227.7846, -50.755825 +2.5), new mp.Vector3(0,0,0), 40);
				rouletteCamera.setRot(0.0, 0, 0, 2);
				rouletteCamera.setActive(true);
				//localplayer.freezePosition(true);
				mp.game.cam.renderScriptCams(true, true, 1500, true, false);
			}, 1000);
		}
	}, 2000);

	setTimeout(() => {

		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "armraisedidle_to_spinningidle_high", 8.0, -8.0, -1, 0, 0, false, false, false);
	}, 3000);
});

mp.events.add('delWheelCam', () => {
    rouletteCamera.destroy(true);
    rouletteCamera = null;
    mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	localplayer.freezePosition(false);
});

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
    
    CasinoPedsID[tb].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);

    setTimeout(
		function()
		{
            CasinoPedsID[tb].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);

		}, 8000
	);
});

mp.events.add('render', () => {
    if( blockControls){
        mp.game.controls.disableControlAction(0, 257, true); // стрельба
		mp.game.controls.disableControlAction(0, 22, true);
		mp.game.controls.disableControlAction(2, 25, true);
		mp.game.controls.disableControlAction(0, 23, true); // INPUT_ENTER
		
		mp.game.controls.disableControlAction(2, 24, true);
		mp.game.controls.disableControlAction(2, 69, true);
		mp.game.controls.disableControlAction(2, 70, true);
		mp.game.controls.disableControlAction(2, 92, true);

		mp.game.controls.disableControlAction(2, 140, true);
		mp.game.controls.disableControlAction(2, 141, true);
		mp.game.controls.disableControlAction(2, 263, true);
		mp.game.controls.disableControlAction(2, 264, true);

		mp.game.controls.disableControlAction(0, 21, true);
		mp.game.controls.disableControlAction(0, 23, true);
		mp.game.controls.disableControlAction(0, 32, true);
		mp.game.controls.disableControlAction(0, 33, true);
		mp.game.controls.disableControlAction(0, 34, true);
		mp.game.controls.disableControlAction(0, 35, true);
		
    }

    if(setBet && rouletteCamera != null && rouletteTable != null && startRoullete == false && !mp.gui.cursor.visible){
        if(canDoBets && betObject == null)
        {
            betObject = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z + 0.4));
            betObject.setCollision(false, false);
        }
        if(betObject != null && canDoBets)
		{
			if(mp.game.controls.isDisabledControlJustReleased(0, 25) && !mp.gui.cursor.visible) // ПКМ
			{
				if(closestChipSpot != null) mp.events.callRemote("server_remove_roulette_bet", closestChipSpot);
			}
			
			if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // ЛКМ
			{
				if(closestChipSpot != null) mp.events.callRemote("server_make_roulette_bet", closestChipSpot);
            }

			let drawObj = getCameraHitCoord();
			if(drawObj != null)
			{
				
				// let height = betObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
				//drawObj.position.z = RouletteTablesPos[rouletteTable].z;
                //drawObj.position.z = mp.game.gameplay.getGroundZFor3dCoord(drawObj.position.x, drawObj.position.y, drawObj.position.z, parseFloat(0), false);
                getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));

                if(betCoords == null){
                    betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y,RouletteTablesPos[rouletteTable].z + 0.95, false, false, false);
                    getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
                }
                else {
                    
                    betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, RouletteTablesPos[rouletteTable].z + 0.95, false, false, false);
                    getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
                }
				
				//getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
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

		if(rotx > -57.5) rotx = -57.5;
		if(rotx < -70) rotx = -70;
		
        if(rotz < RouletteCameraRotStop[rouletteTable][0]) rotz = RouletteCameraRotStop[rouletteTable][0];
        if(rotz > RouletteCameraRotStop[rouletteTable][1]) rotz = RouletteCameraRotStop[rouletteTable][1];

        if(rotx < -69 && rotz < RouletteCameraRotStop[rouletteTable][2]) {
            rotz = RouletteCameraRotStop[rouletteTable][2];
            rotx = -69;
        }
        

        rouletteCamera.setRot(rotx, 0.0, rotz, 2);

        let cp = rouletteCamera.getRot(2);
    }    
    if(startRoullete == true && rouletteTable != null && !roulleteCam){
		
        const ballPos = RouletteTables[rouletteTable].table.getWorldPositionOfBone(RouletteTables[rouletteTable].table.getBoneIndexByName("Roulette_Wheel"));
        //rouletteCamera.setActive(false);
        //rouletteCamera.destroy();
        //rouletteCamera = mp.cameras.new('default', new mp.Vector3(ballPos.x, ballPos.y, ballPos.z+1.5), new mp.Vector3(0,0,0), 40);
        rouletteCamera.setCoord(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z+1.5);
        rouletteCamera.pointAtCoord(ballPos.x, ballPos.y, ballPos.z);
        //rouletteCamera.setRot(90.0, 0, 225, 2);
        rouletteCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 2500, true, false);
        roulleteCam = true;
    }
    if(startRoullete == false && rouletteTable != null && roulleteCam){
		
        roulleteCam = false;
        rouletteCamera.destroy();
        rouletteCamera = mp.cameras.new('default', RouletteCameraPos[rouletteTable], new mp.Vector3(0,0,0), 40);
        rouletteCamera.setRot(-63, 0, RouletteCameraRot[rouletteTable], 2);
        rouletteCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 1500, true, false);
    }
	
});

mp.events.add('render', rouletteRender);
function rouletteRender() 
{

    
	for(var i=0; i < RouletteTables.length; i++)
	{
		if(RouletteTables[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel", 3))
		{
			if(RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel") > 0.9425)
			{
				RouletteTables[i].table.playAnim("loop_wheel", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, true, 0, 131072);
			}
		}
		
		if(RouletteTables[i].ball.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_ball", 3))
		{
			if(RouletteTables[i].ball.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_ball") > 0.99)
			{
                const ballPos = RouletteTables[i].table.getWorldPositionOfBone(RouletteTables[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = RouletteTables[i].table.getRotation(2);
				RouletteTables[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				RouletteTables[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				
				RouletteTables[i].ball.playAnim("loop_ball", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, false, 0, 136704);
			}
		}
		
		if(RouletteTables[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel", 3))
		{
			
			if(RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") >= 0.9 && Date.now()-RouletteTables[i].lastSpinTime > 1000)
			{
				RouletteTables[i].spins++;
				RouletteTables[i].lastSpinTime = Date.now();
			}
			if(RouletteTables[i].spins == RouletteTables[i].needSpins-1)
			{
				RouletteTables[i].ball.setAnimSpeed("anim_casino_b@amb@casino@games@roulette@table", "loop_ball", 0.70);
			}
			if(RouletteTables[i].spins == RouletteTables[i].needSpins && RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") > 0.99)
			{
                RouletteTables[i].table.playAnim(RouletteTables[i].endTable, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 131072);
				
                const ballPos = RouletteTables[i].table.getWorldPositionOfBone(RouletteTables[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = RouletteTables[i].table.getRotation(2);
				RouletteTables[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				RouletteTables[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				RouletteTables[i].ball.playAnim(RouletteTables[i].endBall, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 136704);
			}
		}
	}
}

mp.events.add('casinoBet', (val) => {
	setBet = true;
	mp.gui.cursor.visible = false;
    mp.events.callRemote('serverSetRouletteBet', val);
});


mp.events.add('clean_chips', function( table){

    CasinoPedsID[table].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "clear_chips_intro", 3.0, 1.0, -1, 2, 0, false, false, false);

    for(let i = 0; i < betRoulette[table].length; i++)
    {
        if(betRoulette[table][i] != null)
        betRoulette[table][i].destroy();
    }

    betRoulette[table] = [];

    setTimeout(() => {
        CasinoPedsID[table].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "clear_chips_outro", 3.0, 1.0, -1, 2, 0, false, false, false);
    }, 1000);
});


mp.events.add('start_roulette', function(){
    startRoullete = true;
	//global.menu.execute(`casino.hide()`);
});

mp.events.add('stop_roulette', function(){
    startRoullete = false;
	//global.menu.execute(`casino.rest()`);
});

mp.events.add('bet_roulette', function(table, spot){
    //player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "place_bet_small", 3.0, 1.0, -1, 2, 0, false, false, false);
    let tablePos = RouletteTablesPos[table];
    let betOffset = tableChipsOffsets[spot]; 
    let newCardPos = mp.game.object.getObjectOffsetFromCoords(tablePos.x, tablePos.y, tablePos.z, RouletteTablesHeading[table], betOffset[0], betOffset[1], betOffset[2]);
   
        betRoulette[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_100dollar_x1`), new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z),
        {
            rotation: new mp.Vector3(0,0,0),
            alpha: 255,
            dimension: 0,
        }));
});

mp.events.add('seat_to_roulette_table', function(table){
		localplayer.freezePosition(true);
		rouletteTable = table;
		setBet = false;
		rouletteCamera = mp.cameras.new('default', RouletteCameraPos[table], new mp.Vector3(90,0,0), 40);
		rouletteCamera.setRot(-63, 0, RouletteCameraRot[table], 2);
	// rouletteCamera.pointAtCoord(RouletteTablesPos[table].x, RouletteTablesPos[table].y, RouletteTablesPos[table].z);
		rouletteCamera.setActive(true);
		//localplayer.freezePosition(true);
		mp.game.cam.renderScriptCams(true, true, 1500, true, false);
		blockControls = true;
});

mp.events.add('exit_roulette', function(){
    //entity.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 3.0, 1.0, 2500, 2, 0, false, false, false);
try {
		RouletteTables[rouletteTable].table.setCollision(true, false);
		rouletteCamera.destroy(true);
		rouletteCamera = null;
		rouletteTable = null;
		mp.game.cam.renderScriptCams(false, true, 1000, true, false);
		localplayer.freezePosition(false);
		blockControls = false;
		setBet = false;

		clearTableMarkers();
		if(betObject != null || betObject !== undefined){
			betObject.destroy();
			betObject = null;
		}
	}
	catch{
		
	}
});

function getCameraHitCoord()
{
	let position = rouletteCamera.getCoord();
	let direction = rouletteCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 3) + position.x, (direction.y * 3) + position.y, (direction.z * 3) + position.z);
	
    let hitData = mp.raycasting.testPointToPoint(position, farAway);
   // mp.game.graphics.drawLine(position.x, position.y, position.z, farAway.x, farAway.y, farAway.z, 255, 0, 0, 255);
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
	[0.0643310546875, -0.304718017578125, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12"]], 
	[0.392822265625, -0.304779052734375, 0.9449996948242188, ["13","14","15","16","17","18","19","20","21","22","23","24"]],
	[0.712158203125, -0.30303955078125, 0.9449996948242188, ["25","26","27","28","29","30","31","32","33","34","35","36"]],
	[0.9222412109375, -0.185882568359375, 0.9449996948242188, ["1","4","7","10","13","16","19","22","25","28","31","34"]],
	[0.9229736328125, -0.0181884765625, 0.9449996948242188, ["2","5","8","11","14","17","20","23","26","29","32","35"]],
	[0.9248046875, 0.14849853515625, 0.9449996948242188, ["3","6","9","12","15","18","21","24","27","30","33","36"]],
	[-0.011474609375, -0.378875732421875, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]],
	[0.142822265625, -0.375732421875, 0.9449996948242188, ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]],
	[0.308349609375, -0.37542724609375, 0.9449996948242188, ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]],
	[0.4713134765625, -0.376861572265625, 0.9449996948242188, ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]],
	[0.6341552734375, -0.376495361328125, 0.9449996948242188, ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]],
	[0.7926025390625, -0.382232666015625, 0.9449996948242188, ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]]
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
	var prevDistance = 0.025;
	var dist = null;

	for(var i=0; i < tableChipsOffsets.length; i++)
	{
        //dist = mp.Vector3.getDistanceBetweenPoints3D(vector, new mp.Vector3(RouletteTablesPos[0].x+tableChipsOffsets[i][0], RouletteTablesPos[0].y+tableChipsOffsets[i][1], RouletteTablesPos[0].z+tableChipsOffsets[i][2]));
        let newCordPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableChipsOffsets[i][0], tableChipsOffsets[i][1], tableChipsOffsets[i][2]);
        dist = mp.game.gameplay.getDistanceBetweenCoords(vector.x, vector.y, vector.z, newCordPos.x, newCordPos.y,newCordPos.z, false);

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
            let newBetPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableChipsOffsets[spot][0], tableChipsOffsets[spot][1], tableChipsOffsets[spot][2]);
            betCoords = newBetPos;

			for(var i=0; i < tableChipsOffsets[spot][3].length; i++)
			{
				key = tableChipsOffsets[spot][3][i];
				if(key == "00" || key == "0")
				{
                    let newCardPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableMarkersOffsets[key][0], tableMarkersOffsets[key][1], tableMarkersOffsets[key][2]);
                    
                    obj = mp.objects.new(269022546, new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z), {rotation: new mp.Vector3(0, 0, RouletteTablesHeading[rouletteTable])});
					obj.setCollision(false, false);
					tableMarkers.push(obj);
				}
				else
				{
                    let newCardPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableMarkersOffsets[key][0], tableMarkersOffsets[key][1], tableMarkersOffsets[key][2]);
                    
                   
                    tableMarkers.push(mp.objects.new(3267450776, new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z), {rotation: new mp.Vector3(0, 0, RouletteTablesHeading[rouletteTable])}));
				}
			}
		}
	}	
}
/*

mp.keys.bind(0x09, false, function () { // change bet
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true) return;

    mp.events.callRemote('serverChangeRouletteBet');
    
    lastCheck = new Date().getTime();
});*/

/***/ }),

/***/ 7193:
/***/ (() => {

// FOCUS ROLEPLAY DIAMOND CASINO - Slots


const localPlayer = mp.players.local;

let lpSlotMachine = null,
    slotMachineToJoin = null,
    interactingWithSlotMachine = null,
    canSpin = false,
    interactingWithSlotMachineTimeout = null,
    slotMachineData = [];

let SPINNING_TIME = []; 
SPINNING_TIME[1] = [2000,2500,3000];
SPINNING_TIME[2] = [2000,4000,6000];

const reelsOffsets = 
[
	[-0.115, 0.047, 1.106],
	[0.005, 0.047, 1.106],
	[0.125, 0.047, 1.106]
]

let slotMachineBets = [];
slotMachineBets[1] = 100;
slotMachineBets[2] = 25;
slotMachineBets[3] = 25;
slotMachineBets[4] = 5;
slotMachineBets[5] = 500;
slotMachineBets[6] = 100;
slotMachineBets[7] = 500;
slotMachineBets[8] = 5;

let slotMachineNames = [];
slotMachineNames[1] = "Angel and the Knight";
slotMachineNames[2] = "Impotent RAGE";
slotMachineNames[3] = "Republican Space Rangers";
slotMachineNames[4] = "Fame or Shame";
slotMachineNames[5] = "Deity of the Sun";
slotMachineNames[6] = "Twilight Knife";
slotMachineNames[7] = "Diamond Miner";
slotMachineNames[8] = "Evacuator";

const slotMachinePos =
[
	{ "type": 1, "x": 1135.1024169921875, "y": 256.709716796875, "z": -52.03075408935547, "rz": 101.998046875 },
	{ "type": 1, "x": 1120.8575439453125, "y": 233.18858337402344, "z": -50.84077453613281, "rz": -104.99775695800781 },
	{ "type": 1, "x": 1108.9188232421875, "y": 239.50234985351562, "z": -50.84078598022461, "rz": -44.99958038330078 },
	{ "type": 1, "x": 1105.031982421875, "y": 230.81637573242188, "z": -50.84077072143555, "rz": -177.001220703125 },
	{ "type": 1, "x": 1114.0848388671875, "y": 235.03343200683594, "z": -50.84077453613281, "rz": -179.00137329101562 },
	{ "type": 2, "x": 1134.7552490234375, "y": 255.9905242919922, "z": -52.03075408935547, "rz": 30.999441146850586 },
	{ "type": 2, "x": 1132.4876708984375, "y": 247.59466552734375, "z": -52.03075408935547, "rz": 88.49937438964844 },
	{ "type": 2, "x": 1109.5211181640625, "y": 239.04225158691406, "z": -50.84078598022461, "rz": -29.499794006347656 },
	{ "type": 2, "x": 1105.7384033203125, "y": 230.33175659179688, "z": -50.84077072143555, "rz": 107.99896240234375 },
	{ "type": 2, "x": 1120.756103515625, "y": 232.42312622070312, "z": -50.84077453613281, "rz": -90.49939727783203 },
	{ "type": 2, "x": 1114.8876953125, "y": 234.52394104003906, "z": -50.84077453613281, "rz": 108.99903869628906 },
	{ "type": 3, "x": 1133.948974609375, "y": 256.10711669921875, "z": -52.0307502746582, "rz": -46.99979782104492 },
	{ "type": 3, "x": 1132.41357421875, "y": 248.33412170410156, "z": -52.03075408935547, "rz": 105.99855041503906 },
	{ "type": 3, "x": 1105.5439453125, "y": 229.40882873535156, "z": -50.84077072143555, "rz": 38.49977111816406 },
	{ "type": 3, "x": 1110.232666015625, "y": 238.7513427734375, "z": -50.84078598022461, "rz": -12.999954223632812 },
	{ "type": 3, "x": 1114.5487060546875, "y": 233.68020629882812, "z": -50.84077453613281, "rz": 33.99979019165039 },
	{ "type": 3, "x": 1120.85302734375, "y": 231.6873779296875, "z": -50.84077072143555, "rz": -73.99937438964844 },
	{ "type": 4, "x": 1139.37109375, "y": 252.4561767578125, "z": -52.03075408935547, "rz": 97.49907684326172 },
	{ "type": 4, "x": 1132.109130859375, "y": 249.05078125, "z": -52.03075408935547, "rz": 118.9986801147461 },
	{ "type": 4, "x": 1133.8514404296875, "y": 256.8948669433594, "z": -52.0307502746582, "rz": -115.99858856201172 },
	{ "type": 4, "x": 1110.988037109375, "y": 238.6630401611328, "z": -50.84078598022461, "rz": 0 },
	{ "type": 4, "x": 1100.46630859375, "y": 230.39248657226562, "z": -50.84077072143555, "rz": 44.49960708618164 },
	{ "type": 4, "x": 1104.66650390625, "y": 229.47808837890625, "z": -50.84077453613281, "rz": -30.99989128112793 },
	{ "type": 4, "x": 1108.446533203125, "y": 235.39356994628906, "z": -50.84077453613281, "rz": -179.0015106201172 },
	{ "type": 4, "x": 1113.65576171875, "y": 233.69044494628906, "z": -50.84077453613281, "rz": -34.49992752075195 },
	{ "type": 4, "x": 1117.1199951171875, "y": 230.25537109375, "z": -50.84077453613281, "rz": -176.5015106201172 },
	{ "type": 4, "x": 1121.1380615234375, "y": 230.99908447265625, "z": -50.84077453613281, "rz": -58.999629974365234 },
	{ "type": 5, "x": 1134.55615234375, "y": 257.2640075683594, "z": -52.03075408935547, "rz": 170.9969940185547 },
	{ "type": 5, "x": 1138.998046875, "y": 251.7522430419922, "z": -52.03075408935547, "rz": 29.49958610534668 },
	{ "type": 5, "x": 1131.660400390625, "y": 249.63453674316406, "z": -52.03075408935547, "rz": 135.99819946289062 },
	{ "type": 5, "x": 1100.9368896484375, "y": 230.99258422851562, "z": -50.84077453613281, "rz": 59.49959945678711 },
	{ "type": 5, "x": 1111.7265625, "y": 238.75173950195312, "z": -50.84078598022461, "rz": 12.99996566772461 },
	{ "type": 5, "x": 1104.3472900390625, "y": 230.33616638183594, "z": -50.84077453613281, "rz": -106.99888610839844 },
	{ "type": 5, "x": 1109.1422119140625, "y": 234.78053283691406, "z": -50.84077453613281, "rz": 106.9991455078125 },
	{ "type": 5, "x": 1113.37841796875, "y": 234.48037719726562, "z": -50.84077072143555, "rz": -104.99906158447266 },
	{ "type": 5, "x": 1117.8211669921875, "y": 229.77664184570312, "z": -50.84077072143555, "rz": 111.9986801147461 },
	{ "type": 6, "x": 1138.1981201171875, "y": 251.86956787109375, "z": -52.03075408935547, "rz": -45.4997444152832 },
	{ "type": 6, "x": 1131.0672607421875, "y": 250.08070373535156, "z": -52.03075408935547, "rz": 149.9978790283203 },
	{ "type": 6, "x": 1112.40869140625, "y": 239.02345275878906, "z": -50.84078598022461, "rz": 30.4997615814209 },
	{ "type": 6, "x": 1121.614501953125, "y": 230.38429260253906, "z": -50.84077453613281, "rz": -45.499813079833984 },
	{ "type": 6, "x": 1117.5740966796875, "y": 228.9528045654297, "z": -50.84077072143555, "rz": 34.49982452392578 },
	{ "type": 6, "x": 1108.875244140625, "y": 233.94735717773438, "z": -50.84077453613281, "rz": 33.99979019165039 },
	{ "type": 6, "x": 1101.227783203125, "y": 231.69332885742188, "z": -50.84077453613281, "rz": 75.49949645996094 },
	{ "type": 7, "x": 1138.080810546875, "y": 252.67027282714844, "z": -52.03075408935547, "rz": -118.99893951416016 },
	{ "type": 7, "x": 1130.3834228515625, "y": 250.3516082763672, "z": -52.03075408935547, "rz": 165.49742126464844 },
	{ "type": 7, "x": 1101.32080078125, "y": 232.4326629638672, "z": -50.84077453613281, "rz": 90.99922943115234 },
	{ "type": 7, "x": 1108.02001953125, "y": 233.9359130859375, "z": -50.84077072143555, "rz": -35.499839782714844 },
	{ "type": 7, "x": 1116.7257080078125, "y": 228.941162109375, "z": -50.84077453613281, "rz": -33.499881744384766 },
	{ "type": 8, "x": 1138.8004150390625, "y": 253.02676391601562, "z": -52.03075408935547, "rz": 170.9975128173828 },
	{ "type": 8, "x": 1129.5975341796875, "y": 250.44863891601562, "z": -52.03075408935547, "rz": 179.49769592285156 },
	{ "type": 8, "x": 1113.0006103515625, "y": 239.52088928222656, "z": -50.840789794921875, "rz": 46.499603271484375 },
	{ "type": 8, "x": 1107.7371826171875, "y": 234.7730712890625, "z": -50.84077453613281, "rz": -106.99908447265625 },
	{ "type": 8, "x": 1116.4288330078125, "y": 229.7194061279297, "z": -50.84077453613281, "rz": -102.49913024902344 },
	{ "type": 8, "x": 1101.1824951171875, "y": 233.19720458984375, "z": -50.84077453613281, "rz": -50.84077453613281 }
];


for(var i=1; i <= 8; i++)
{
	mp.game.entity.createModelHideExcludingScriptObjects(1127.1312255859375, 254.82090759277344, -50.4407958984375, 300.0, mp.game.joaat("vw_prop_casino_slot_0"+i+"a"), true);
}


for(let i=0; i < slotMachinePos.length; i++)
{
	slotMachineData[i] = { spinning: [] };
	slotMachineData[i].machine = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a"), new mp.Vector3(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
	
	slotMachineData[i].reels = [];
	
	var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, 0, -1.5, 1);
	var newShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 0.25);
	newShape.casinoSlotMachime = i;
	
	for(var c=0; c < 3; c++)
	{
		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, reelsOffsets[c][0], reelsOffsets[c][1], reelsOffsets[c][2]);
		slotMachineData[i].reels[c] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
	}
}


mp.events.add('playerEnterColshape', (shape) => {

	if(shape.casinoSlotMachime !== undefined && lpSlotMachine == null && interactingWithSlotMachine == null)
	{
		slotMachineToJoin = shape.casinoSlotMachime;
		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
		mp.game.graphics.notify(`~b~${slotMachineNames[slotMachinePos[slotMachineToJoin].type]}~n~~w~Pritisnite E da igrate`);
	}
});


mp.events.add('playerExitColshape', (shape) => {
	if(shape.casinoSlotMachime !== undefined)
	{
		slotMachineToJoin = null;
	}
});



mp.keys.bind(0x45, true, () =>  // E
{
	
	if(mp.gui.cursor.visible || interactingWithSlotMachine != null) return false;
	
	if(lpSlotMachine != null)
	{
		
		mp.events.callRemote("leaveSlotMachine");
		interactingWithSlotMachine = lpSlotMachine;
		lpSlotMachine = null;
		BLOCK_CONTROLS_DURING_ANIMATION = false;
		if(canSpin) canSpin = false;
		
		interactingWithSlotMachineTimeout = setTimeout(
			function()
			{
				slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
				interactingWithSlotMachine = null;
				interactingWithSlotMachineTimeout = null;
			},4500
		);
	}
	else
	{
		if(slotMachineToJoin == null) return false;
		
		interactingWithSlotMachine = slotMachineToJoin;
		
		slotMachineData[slotMachineToJoin].machine.setCollision(false, false);
		
		var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[slotMachineToJoin].x, slotMachinePos[slotMachineToJoin].y, slotMachinePos[slotMachineToJoin].z, slotMachinePos[slotMachineToJoin].rz, 0, -1.5, 1);
		localPlayer.position = new mp.Vector3(pos.x, pos.y, pos.z);
		localPlayer.setHeading(slotMachinePos[slotMachineToJoin].rz);
		
		mp.events.callRemote("server:casino.slot.occupy", slotMachineToJoin);
		mp.events.call('client:casino.slot.occupy', localPlayer, slotMachine);
		
		interactingWithSlotMachineTimeout = setTimeout(
			function()
			{
				interactingWithSlotMachine = null;
				interactingWithSlotMachineTimeout = null;
			},5500
		);
	}	
});

/* Server-eventi
mp.events.add("server:casino.slot.occupy", (player, slotMachine) => 
{   
	if (mp.characters[player.character].slotMachine == -1) {
		mp.characters[player.character].slotMachine = slotMachine;
	}
	
});

mp.events.add("server:casino.slot.leave", (player) => 
{
	if (mp.characters[player.character].slotMachine != -1) {
		mp.characters[player.character].slotMachine = -1;
		player.call('client:casino.cancelInteractingWithSlotMachine');
	}
    
	mp.characters[player.character].slotMachine = -1;
});

mp.events.add("server:casino.slot.spin", (player, slotMachine) => 
{
    player.call('client:spinSlotMachine', mp.characters[player.character].slotMachine, JSON.stringify(player.position))
});*/


mp.events.add("client:casino.cancelInteractingWithSlotMachine", () => 
{
	slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
	interactingWithSlotMachine = null;
	if(interactingWithSlotMachineTimeout != null)
	{
		clearTimeout(interactingWithSlotMachineTimeout);
		interactingWithSlotMachineTimeout = null;
	}
});

mp.events.add("client:casino.slot.occupy", (player, machineID) => {
	if(player == localPlayer) 
	{
		lpSlotMachine = slotMachineToJoin;
		BLOCK_CONTROLS_DURING_ANIMATION = true;
		
		mp.game.graphics.notify(`Pritisnite levi klik misa(LMB) da zapocnete kockanje`);
		mp.events.call('client:slotMachineAllowSpin', true);
	}
	else
	{
		slotMachineData[machineID].machine.setNoCollision(player.handle, false);
		mp.events.call('client:slotMachineAllowSpin', true);
		
	}
});

mp.events.add("client:slotMachineAllowSpin", (toggle) => {	
	canSpin = toggle;
});


mp.events.add('playerDeath', (player) => 
{
	if(player == localPlayer) 
	{
		if(lpSlotMachine != null) lpSlotMachine = null;
		if(interactingWithSlotMachine != null) interactingWithSlotMachine = null;
		if(canSpin) canSpin = false;
	}
});


mp.events.add('render', (nametags) => {
	
	var rot = null;
	for(var machine = 0; machine < slotMachineData.length; machine++)
	{
		for(var i=0; i < 3; i++)
		{
			if(slotMachineData[machine]['spinning'][i])
			{
				rot = slotMachineData[machine].reels[i].rotation;
				slotMachineData[machine].reels[i].rotation = new mp.Vector3(rot.x+5.0, 0.0, rot.z);
			}
		}
	}
	
	if(canSpin)
	{
		if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // LMB
		{
			mp.events.callRemote("server:spinSlotMachine");
		}
	}
});


mp.events.add('client:spinSlotMachine', (id, position) => 
{
	let machine = id;
	slotMachineData[machine].endPos = JSON.parse(position);

	mp.events.call('client:slotMachineAllowSpin', false);
	
	var pos = null;
	for(var i=0; i < 3; i++)
	{
		slotMachineData[machine].reels[i].destroy();
		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[i][0], reelsOffsets[i][1], reelsOffsets[i][2]);
		slotMachineData[machine].reels[i] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"b_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[machine].rz) });
		slotMachineData[machine]['spinning'][i] = true;
	}
	
	setTimeout(
		function()
		{
			slotMachineData[machine]['spinning'][0] = null;
	
			slotMachineData[machine].reels[0].destroy();
			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[0][0], reelsOffsets[0][1], reelsOffsets[0][2]);
			slotMachineData[machine].reels[0] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[0], 0, slotMachinePos[machine].rz) });
		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][0]
	);
	setTimeout(
		function()
		{
			slotMachineData[machine]['spinning'][1] = null;
	
			slotMachineData[machine].reels[1].destroy();
			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[1][0], reelsOffsets[1][1], reelsOffsets[1][2]);
			slotMachineData[machine].reels[1] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[1], 0, slotMachinePos[machine].rz) });
		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][1]
	);
	setTimeout(
		function()
		{
			slotMachineData[machine]['spinning'][2] = null;
	
			slotMachineData[machine].reels[2].destroy();
			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[2][0], reelsOffsets[2][1], reelsOffsets[2][2]);
			slotMachineData[machine].reels[2] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[2], 0, slotMachinePos[machine].rz) });
		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][2]
	);
});

// Loading IPL 
mp.game.streaming.requestIpl('vw_casino_main');






/***/ }),

/***/ 921:
/***/ (() => {

// FOCUS ROLEPLAY DIAMOND CASINO - Slots


const localPlayer = mp.players.local;

mp.game.streaming.requestIpl('vw_casino_main');
mp.game.streaming.requestIpl('hei_dlc_windows_casino');
mp.game.streaming.requestIpl('hei_dlc_casino_door');
mp.game.streaming.requestIpl('vw_dlc_casino_door');
mp.game.streaming.requestIpl('hei_dlc_casino_aircon');



let lpSlotMachine = null,
    slotMachineToJoin = null,
    interactingWithSlotMachine = null,
    canSpin = false,
    interactingWithSlotMachineTimeout = null,
    slotMachineData = [];

let SPINNING_TIME = []; 
SPINNING_TIME[1] = [2000,2500,3000];
SPINNING_TIME[2] = [2000,4000,6000];

const reelsOffsets = 
[
	[-0.115, 0.047, 1.106],
	[0.005, 0.047, 1.106],
	[0.125, 0.047, 1.106]
]

let slotMachineBets = [];
slotMachineBets[1] = 100;
slotMachineBets[2] = 25;
slotMachineBets[3] = 25;
slotMachineBets[4] = 5;
slotMachineBets[5] = 500;
slotMachineBets[6] = 100;
slotMachineBets[7] = 500;
slotMachineBets[8] = 5;

let slotMachineNames = [];
slotMachineNames[1] = "Angel and the Knight";
slotMachineNames[2] = "Impotent RAGE";
slotMachineNames[3] = "Republican Space Rangers";
slotMachineNames[4] = "Fame or Shame";
slotMachineNames[5] = "Deity of the Sun";
slotMachineNames[6] = "Twilight Knife";
slotMachineNames[7] = "Diamond Miner";
slotMachineNames[8] = "Evacuator";

const slotMachinePos =
[
	{ "type": 1, "x": 1135.1024169921875, "y": 256.709716796875, "z": -52.03075408935547, "rz": 101.998046875 },
	{ "type": 1, "x": 1120.8575439453125, "y": 233.18858337402344, "z": -50.84077453613281, "rz": -104.99775695800781 },
	{ "type": 1, "x": 1108.9188232421875, "y": 239.50234985351562, "z": -50.84078598022461, "rz": -44.99958038330078 },
	{ "type": 1, "x": 1105.031982421875, "y": 230.81637573242188, "z": -50.84077072143555, "rz": -177.001220703125 },
	{ "type": 1, "x": 1114.0848388671875, "y": 235.03343200683594, "z": -50.84077453613281, "rz": -179.00137329101562 },
	{ "type": 2, "x": 1134.7552490234375, "y": 255.9905242919922, "z": -52.03075408935547, "rz": 30.999441146850586 },
	{ "type": 2, "x": 1132.4876708984375, "y": 247.59466552734375, "z": -52.03075408935547, "rz": 88.49937438964844 },
	{ "type": 2, "x": 1109.5211181640625, "y": 239.04225158691406, "z": -50.84078598022461, "rz": -29.499794006347656 },
	{ "type": 2, "x": 1105.7384033203125, "y": 230.33175659179688, "z": -50.84077072143555, "rz": 107.99896240234375 },
	{ "type": 2, "x": 1120.756103515625, "y": 232.42312622070312, "z": -50.84077453613281, "rz": -90.49939727783203 },
	{ "type": 2, "x": 1114.8876953125, "y": 234.52394104003906, "z": -50.84077453613281, "rz": 108.99903869628906 },
	{ "type": 3, "x": 1133.948974609375, "y": 256.10711669921875, "z": -52.0307502746582, "rz": -46.99979782104492 },
	{ "type": 3, "x": 1132.41357421875, "y": 248.33412170410156, "z": -52.03075408935547, "rz": 105.99855041503906 },
	{ "type": 3, "x": 1105.5439453125, "y": 229.40882873535156, "z": -50.84077072143555, "rz": 38.49977111816406 },
	{ "type": 3, "x": 1110.232666015625, "y": 238.7513427734375, "z": -50.84078598022461, "rz": -12.999954223632812 },
	{ "type": 3, "x": 1114.5487060546875, "y": 233.68020629882812, "z": -50.84077453613281, "rz": 33.99979019165039 },
	{ "type": 3, "x": 1120.85302734375, "y": 231.6873779296875, "z": -50.84077072143555, "rz": -73.99937438964844 },
	{ "type": 4, "x": 1139.37109375, "y": 252.4561767578125, "z": -52.03075408935547, "rz": 97.49907684326172 },
	{ "type": 4, "x": 1132.109130859375, "y": 249.05078125, "z": -52.03075408935547, "rz": 118.9986801147461 },
	{ "type": 4, "x": 1133.8514404296875, "y": 256.8948669433594, "z": -52.0307502746582, "rz": -115.99858856201172 },
	{ "type": 4, "x": 1110.988037109375, "y": 238.6630401611328, "z": -50.84078598022461, "rz": 0 },
	{ "type": 4, "x": 1100.46630859375, "y": 230.39248657226562, "z": -50.84077072143555, "rz": 44.49960708618164 },
	{ "type": 4, "x": 1104.66650390625, "y": 229.47808837890625, "z": -50.84077453613281, "rz": -30.99989128112793 },
	{ "type": 4, "x": 1108.446533203125, "y": 235.39356994628906, "z": -50.84077453613281, "rz": -179.0015106201172 },
	{ "type": 4, "x": 1113.65576171875, "y": 233.69044494628906, "z": -50.84077453613281, "rz": -34.49992752075195 },
	{ "type": 4, "x": 1117.1199951171875, "y": 230.25537109375, "z": -50.84077453613281, "rz": -176.5015106201172 },
	{ "type": 4, "x": 1121.1380615234375, "y": 230.99908447265625, "z": -50.84077453613281, "rz": -58.999629974365234 },
	{ "type": 5, "x": 1134.55615234375, "y": 257.2640075683594, "z": -52.03075408935547, "rz": 170.9969940185547 },
	{ "type": 5, "x": 1138.998046875, "y": 251.7522430419922, "z": -52.03075408935547, "rz": 29.49958610534668 },
	{ "type": 5, "x": 1131.660400390625, "y": 249.63453674316406, "z": -52.03075408935547, "rz": 135.99819946289062 },
	{ "type": 5, "x": 1100.9368896484375, "y": 230.99258422851562, "z": -50.84077453613281, "rz": 59.49959945678711 },
	{ "type": 5, "x": 1111.7265625, "y": 238.75173950195312, "z": -50.84078598022461, "rz": 12.99996566772461 },
	{ "type": 5, "x": 1104.3472900390625, "y": 230.33616638183594, "z": -50.84077453613281, "rz": -106.99888610839844 },
	{ "type": 5, "x": 1109.1422119140625, "y": 234.78053283691406, "z": -50.84077453613281, "rz": 106.9991455078125 },
	{ "type": 5, "x": 1113.37841796875, "y": 234.48037719726562, "z": -50.84077072143555, "rz": -104.99906158447266 },
	{ "type": 5, "x": 1117.8211669921875, "y": 229.77664184570312, "z": -50.84077072143555, "rz": 111.9986801147461 },
	{ "type": 6, "x": 1138.1981201171875, "y": 251.86956787109375, "z": -52.03075408935547, "rz": -45.4997444152832 },
	{ "type": 6, "x": 1131.0672607421875, "y": 250.08070373535156, "z": -52.03075408935547, "rz": 149.9978790283203 },
	{ "type": 6, "x": 1112.40869140625, "y": 239.02345275878906, "z": -50.84078598022461, "rz": 30.4997615814209 },
	{ "type": 6, "x": 1121.614501953125, "y": 230.38429260253906, "z": -50.84077453613281, "rz": -45.499813079833984 },
	{ "type": 6, "x": 1117.5740966796875, "y": 228.9528045654297, "z": -50.84077072143555, "rz": 34.49982452392578 },
	{ "type": 6, "x": 1108.875244140625, "y": 233.94735717773438, "z": -50.84077453613281, "rz": 33.99979019165039 },
	{ "type": 6, "x": 1101.227783203125, "y": 231.69332885742188, "z": -50.84077453613281, "rz": 75.49949645996094 },
	{ "type": 7, "x": 1138.080810546875, "y": 252.67027282714844, "z": -52.03075408935547, "rz": -118.99893951416016 },
	{ "type": 7, "x": 1130.3834228515625, "y": 250.3516082763672, "z": -52.03075408935547, "rz": 165.49742126464844 },
	{ "type": 7, "x": 1101.32080078125, "y": 232.4326629638672, "z": -50.84077453613281, "rz": 90.99922943115234 },
	{ "type": 7, "x": 1108.02001953125, "y": 233.9359130859375, "z": -50.84077072143555, "rz": -35.499839782714844 },
	{ "type": 7, "x": 1116.7257080078125, "y": 228.941162109375, "z": -50.84077453613281, "rz": -33.499881744384766 },
	{ "type": 8, "x": 1138.8004150390625, "y": 253.02676391601562, "z": -52.03075408935547, "rz": 170.9975128173828 },
	{ "type": 8, "x": 1129.5975341796875, "y": 250.44863891601562, "z": -52.03075408935547, "rz": 179.49769592285156 },
	{ "type": 8, "x": 1113.0006103515625, "y": 239.52088928222656, "z": -50.840789794921875, "rz": 46.499603271484375 },
	{ "type": 8, "x": 1107.7371826171875, "y": 234.7730712890625, "z": -50.84077453613281, "rz": -106.99908447265625 },
	{ "type": 8, "x": 1116.4288330078125, "y": 229.7194061279297, "z": -50.84077453613281, "rz": -102.49913024902344 },
	{ "type": 8, "x": 1101.1824951171875, "y": 233.19720458984375, "z": -50.84077453613281, "rz": -50.84077453613281 }
];


for(var i=1; i <= 8; i++)
{
	mp.game.entity.createModelHideExcludingScriptObjects(1127.1312255859375, 254.82090759277344, -50.4407958984375, 300.0, mp.game.joaat("vw_prop_casino_slot_0"+i+"a"), true);
}


for(let i=0; i < slotMachinePos.length; i++)
{
	slotMachineData[i] = { spinning: [] };
	slotMachineData[i].machine = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a"), new mp.Vector3(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
	
	slotMachineData[i].reels = [];
	
	var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, 0, -1.5, 1);
	var newShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 0.25);
	newShape.casinoSlotMachime = i;
	
	for(var c=0; c < 3; c++)
	{
		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, reelsOffsets[c][0], reelsOffsets[c][1], reelsOffsets[c][2]);
		slotMachineData[i].reels[c] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
	}
}


mp.events.add('playerEnterColshape', (shape) => {

	if(shape.casinoSlotMachime !== undefined && lpSlotMachine == null && interactingWithSlotMachine == null)
	{
		slotMachineToJoin = shape.casinoSlotMachime;
		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
		mp.game.graphics.notify(`~b~${slotMachineNames[slotMachinePos[slotMachineToJoin].type]}~n~~w~Pritisnite E da igrate`);
	}
});


mp.events.add('playerExitColshape', (shape) => {
	if(shape.casinoSlotMachime !== undefined)
	{
		slotMachineToJoin = null;
	}
});



mp.keys.bind(0x45, true, () =>  // E
{
	//if(mp.gui.cursor.visible || interactingWithSlotMachine != null) return false;
	
	if (lpSlotMachine != null)
	{

		
		mp.events.callRemote("leaveSlotMachine");
		interactingWithSlotMachine = lpSlotMachine;
		lpSlotMachine = null;
		BLOCK_CONTROLS_DURING_ANIMATION = false;
		if(canSpin) canSpin = false;
		
		interactingWithSlotMachineTimeout = setTimeout(
			function()
			{
				slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
				interactingWithSlotMachine = null;
				interactingWithSlotMachineTimeout = null;
			},4500
		);
	}
	else
	{

		if(slotMachineToJoin == null) return false;

		interactingWithSlotMachine = slotMachineToJoin;
		
		slotMachineData[slotMachineToJoin].machine.setCollision(false, false);
		
		var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[slotMachineToJoin].x, slotMachinePos[slotMachineToJoin].y, slotMachinePos[slotMachineToJoin].z, slotMachinePos[slotMachineToJoin].rz, 0, -1.5, 1);
		localPlayer.position = new mp.Vector3(pos.x, pos.y, pos.z);
		localPlayer.setHeading(slotMachinePos[slotMachineToJoin].rz);
		
		mp.events.callRemote("server:casino.slot.occupy", slotMachineToJoin);
		mp.events.call('client:casino.slot.occupy', localPlayer, slotMachine);
		
		interactingWithSlotMachineTimeout = setTimeout(
			function()
			{
				interactingWithSlotMachine = null;
				interactingWithSlotMachineTimeout = null;
			},5500
		);
	}	
});

mp.events.add("client:casino.cancelInteractingWithSlotMachine", () => 
{
	slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
	interactingWithSlotMachine = null;
	if(interactingWithSlotMachineTimeout != null)
	{
		clearTimeout(interactingWithSlotMachineTimeout);
		interactingWithSlotMachineTimeout = null;
	}
});

mp.events.add("client:casino.slot.occupy", (player, machineID) => {
	if(player == localPlayer) 
	{
		lpSlotMachine = slotMachineToJoin;
		BLOCK_CONTROLS_DURING_ANIMATION = true;
		
		mp.game.graphics.notify(`Pritisnite levi klik misa(LMB) da zapocnete kockanje`);
		mp.events.call('client:slotMachineAllowSpin', true);
	}
	else
	{
		slotMachineData[machineID].machine.setNoCollision(player.handle, false);
		mp.events.call('client:slotMachineAllowSpin', true);
		
	}
});

mp.events.add("client:slotMachineAllowSpin", (toggle) => {	
	canSpin = toggle;
});


mp.events.add('playerDeath', (player) => 
{
	if(player == localPlayer) 
	{
		if(lpSlotMachine != null) lpSlotMachine = null;
		if(interactingWithSlotMachine != null) interactingWithSlotMachine = null;
		if(canSpin) canSpin = false;
	}
});


mp.events.add('render', (nametags) => {
	
	var rot = null;
	for(var machine = 0; machine < slotMachineData.length; machine++)
	{
		for(var i=0; i < 3; i++)
		{
			if(slotMachineData[machine]['spinning'][i])
			{
				rot = slotMachineData[machine].reels[i].rotation;
				slotMachineData[machine].reels[i].rotation = new mp.Vector3(rot.x+5.0, 0.0, rot.z);
			}
		}
	}
	
	if(canSpin)
	{
		if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // LMB
		{
			mp.events.callRemote("server:spinSlotMachine");
		}
	}
});


mp.events.add('client:spinSlotMachine', (id, position) => 
{
	let machine = id;
	slotMachineData[machine].endPos = JSON.parse(position);

	mp.events.call('client:slotMachineAllowSpin', false);
	
	var pos = null;
	for(var i=0; i < 3; i++)
	{
		slotMachineData[machine].reels[i].destroy();
		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[i][0], reelsOffsets[i][1], reelsOffsets[i][2]);
		slotMachineData[machine].reels[i] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"b_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[machine].rz) });
		slotMachineData[machine]['spinning'][i] = true;
	}
	
	setTimeout(
		function()
		{
			slotMachineData[machine]['spinning'][0] = null;
	
			slotMachineData[machine].reels[0].destroy();
			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[0][0], reelsOffsets[0][1], reelsOffsets[0][2]);
			slotMachineData[machine].reels[0] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[0], 0, slotMachinePos[machine].rz) });
		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][0]
	);
	setTimeout(
		function()
		{
			slotMachineData[machine]['spinning'][1] = null;
	
			slotMachineData[machine].reels[1].destroy();
			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[1][0], reelsOffsets[1][1], reelsOffsets[1][2]);
			slotMachineData[machine].reels[1] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[1], 0, slotMachinePos[machine].rz) });
		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][1]
	);
	setTimeout(
		function()
		{
			slotMachineData[machine]['spinning'][2] = null;
	
			slotMachineData[machine].reels[2].destroy();
			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[2][0], reelsOffsets[2][1], reelsOffsets[2][2]);
			slotMachineData[machine].reels[2] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[2], 0, slotMachinePos[machine].rz) });
		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][2]
	);
});






/***/ }),

/***/ 8680:
/***/ (() => {

// FOCUS ROLEPLAY DIAMOND CASINO - Slots


const localPlayer = mp.players.local;

let lpSlotMachine = null,
    slotMachineToJoin = null,
    interactingWithSlotMachine = null,
    canSpin = false,
    interactingWithSlotMachineTimeout = null,
    slotMachineData = [];

let SPINNING_TIME = []; 
SPINNING_TIME[1] = [2000,2500,3000];
SPINNING_TIME[2] = [2000,4000,6000];

const reelsOffsets = 
[
	[-0.115, 0.047, 1.106],
	[0.005, 0.047, 1.106],
	[0.125, 0.047, 1.106]
]

let slotMachineBets = [];
slotMachineBets[1] = 100;
slotMachineBets[2] = 25;
slotMachineBets[3] = 25;
slotMachineBets[4] = 5;
slotMachineBets[5] = 500;
slotMachineBets[6] = 100;
slotMachineBets[7] = 500;
slotMachineBets[8] = 5;

let slotMachineNames = [];
slotMachineNames[1] = "Angel and the Knight";
slotMachineNames[2] = "Impotent RAGE";
slotMachineNames[3] = "Republican Space Rangers";
slotMachineNames[4] = "Fame or Shame";
slotMachineNames[5] = "Deity of the Sun";
slotMachineNames[6] = "Twilight Knife";
slotMachineNames[7] = "Diamond Miner";
slotMachineNames[8] = "Evacuator";

const slotMachinePos =
[
	{ "type": 1, "x": 1135.1024169921875, "y": 256.709716796875, "z": -52.03075408935547, "rz": 101.998046875 },
	{ "type": 1, "x": 1120.8575439453125, "y": 233.18858337402344, "z": -50.84077453613281, "rz": -104.99775695800781 },
	{ "type": 1, "x": 1108.9188232421875, "y": 239.50234985351562, "z": -50.84078598022461, "rz": -44.99958038330078 },
	{ "type": 1, "x": 1105.031982421875, "y": 230.81637573242188, "z": -50.84077072143555, "rz": -177.001220703125 },
	{ "type": 1, "x": 1114.0848388671875, "y": 235.03343200683594, "z": -50.84077453613281, "rz": -179.00137329101562 },
	{ "type": 2, "x": 1134.7552490234375, "y": 255.9905242919922, "z": -52.03075408935547, "rz": 30.999441146850586 },
	{ "type": 2, "x": 1132.4876708984375, "y": 247.59466552734375, "z": -52.03075408935547, "rz": 88.49937438964844 },
	{ "type": 2, "x": 1109.5211181640625, "y": 239.04225158691406, "z": -50.84078598022461, "rz": -29.499794006347656 },
	{ "type": 2, "x": 1105.7384033203125, "y": 230.33175659179688, "z": -50.84077072143555, "rz": 107.99896240234375 },
	{ "type": 2, "x": 1120.756103515625, "y": 232.42312622070312, "z": -50.84077453613281, "rz": -90.49939727783203 },
	{ "type": 2, "x": 1114.8876953125, "y": 234.52394104003906, "z": -50.84077453613281, "rz": 108.99903869628906 },
	{ "type": 3, "x": 1133.948974609375, "y": 256.10711669921875, "z": -52.0307502746582, "rz": -46.99979782104492 },
	{ "type": 3, "x": 1132.41357421875, "y": 248.33412170410156, "z": -52.03075408935547, "rz": 105.99855041503906 },
	{ "type": 3, "x": 1105.5439453125, "y": 229.40882873535156, "z": -50.84077072143555, "rz": 38.49977111816406 },
	{ "type": 3, "x": 1110.232666015625, "y": 238.7513427734375, "z": -50.84078598022461, "rz": -12.999954223632812 },
	{ "type": 3, "x": 1114.5487060546875, "y": 233.68020629882812, "z": -50.84077453613281, "rz": 33.99979019165039 },
	{ "type": 3, "x": 1120.85302734375, "y": 231.6873779296875, "z": -50.84077072143555, "rz": -73.99937438964844 },
	{ "type": 4, "x": 1139.37109375, "y": 252.4561767578125, "z": -52.03075408935547, "rz": 97.49907684326172 },
	{ "type": 4, "x": 1132.109130859375, "y": 249.05078125, "z": -52.03075408935547, "rz": 118.9986801147461 },
	{ "type": 4, "x": 1133.8514404296875, "y": 256.8948669433594, "z": -52.0307502746582, "rz": -115.99858856201172 },
	{ "type": 4, "x": 1110.988037109375, "y": 238.6630401611328, "z": -50.84078598022461, "rz": 0 },
	{ "type": 4, "x": 1100.46630859375, "y": 230.39248657226562, "z": -50.84077072143555, "rz": 44.49960708618164 },
	{ "type": 4, "x": 1104.66650390625, "y": 229.47808837890625, "z": -50.84077453613281, "rz": -30.99989128112793 },
	{ "type": 4, "x": 1108.446533203125, "y": 235.39356994628906, "z": -50.84077453613281, "rz": -179.0015106201172 },
	{ "type": 4, "x": 1113.65576171875, "y": 233.69044494628906, "z": -50.84077453613281, "rz": -34.49992752075195 },
	{ "type": 4, "x": 1117.1199951171875, "y": 230.25537109375, "z": -50.84077453613281, "rz": -176.5015106201172 },
	{ "type": 4, "x": 1121.1380615234375, "y": 230.99908447265625, "z": -50.84077453613281, "rz": -58.999629974365234 },
	{ "type": 5, "x": 1134.55615234375, "y": 257.2640075683594, "z": -52.03075408935547, "rz": 170.9969940185547 },
	{ "type": 5, "x": 1138.998046875, "y": 251.7522430419922, "z": -52.03075408935547, "rz": 29.49958610534668 },
	{ "type": 5, "x": 1131.660400390625, "y": 249.63453674316406, "z": -52.03075408935547, "rz": 135.99819946289062 },
	{ "type": 5, "x": 1100.9368896484375, "y": 230.99258422851562, "z": -50.84077453613281, "rz": 59.49959945678711 },
	{ "type": 5, "x": 1111.7265625, "y": 238.75173950195312, "z": -50.84078598022461, "rz": 12.99996566772461 },
	{ "type": 5, "x": 1104.3472900390625, "y": 230.33616638183594, "z": -50.84077453613281, "rz": -106.99888610839844 },
	{ "type": 5, "x": 1109.1422119140625, "y": 234.78053283691406, "z": -50.84077453613281, "rz": 106.9991455078125 },
	{ "type": 5, "x": 1113.37841796875, "y": 234.48037719726562, "z": -50.84077072143555, "rz": -104.99906158447266 },
	{ "type": 5, "x": 1117.8211669921875, "y": 229.77664184570312, "z": -50.84077072143555, "rz": 111.9986801147461 },
	{ "type": 6, "x": 1138.1981201171875, "y": 251.86956787109375, "z": -52.03075408935547, "rz": -45.4997444152832 },
	{ "type": 6, "x": 1131.0672607421875, "y": 250.08070373535156, "z": -52.03075408935547, "rz": 149.9978790283203 },
	{ "type": 6, "x": 1112.40869140625, "y": 239.02345275878906, "z": -50.84078598022461, "rz": 30.4997615814209 },
	{ "type": 6, "x": 1121.614501953125, "y": 230.38429260253906, "z": -50.84077453613281, "rz": -45.499813079833984 },
	{ "type": 6, "x": 1117.5740966796875, "y": 228.9528045654297, "z": -50.84077072143555, "rz": 34.49982452392578 },
	{ "type": 6, "x": 1108.875244140625, "y": 233.94735717773438, "z": -50.84077453613281, "rz": 33.99979019165039 },
	{ "type": 6, "x": 1101.227783203125, "y": 231.69332885742188, "z": -50.84077453613281, "rz": 75.49949645996094 },
	{ "type": 7, "x": 1138.080810546875, "y": 252.67027282714844, "z": -52.03075408935547, "rz": -118.99893951416016 },
	{ "type": 7, "x": 1130.3834228515625, "y": 250.3516082763672, "z": -52.03075408935547, "rz": 165.49742126464844 },
	{ "type": 7, "x": 1101.32080078125, "y": 232.4326629638672, "z": -50.84077453613281, "rz": 90.99922943115234 },
	{ "type": 7, "x": 1108.02001953125, "y": 233.9359130859375, "z": -50.84077072143555, "rz": -35.499839782714844 },
	{ "type": 7, "x": 1116.7257080078125, "y": 228.941162109375, "z": -50.84077453613281, "rz": -33.499881744384766 },
	{ "type": 8, "x": 1138.8004150390625, "y": 253.02676391601562, "z": -52.03075408935547, "rz": 170.9975128173828 },
	{ "type": 8, "x": 1129.5975341796875, "y": 250.44863891601562, "z": -52.03075408935547, "rz": 179.49769592285156 },
	{ "type": 8, "x": 1113.0006103515625, "y": 239.52088928222656, "z": -50.840789794921875, "rz": 46.499603271484375 },
	{ "type": 8, "x": 1107.7371826171875, "y": 234.7730712890625, "z": -50.84077453613281, "rz": -106.99908447265625 },
	{ "type": 8, "x": 1116.4288330078125, "y": 229.7194061279297, "z": -50.84077453613281, "rz": -102.49913024902344 },
	{ "type": 8, "x": 1101.1824951171875, "y": 233.19720458984375, "z": -50.84077453613281, "rz": -50.84077453613281 }
];


for(var i=1; i <= 8; i++)
{
	mp.game.entity.createModelHideExcludingScriptObjects(1127.1312255859375, 254.82090759277344, -50.4407958984375, 300.0, mp.game.joaat("vw_prop_casino_slot_0"+i+"a"), true);
}


for(let i=0; i < slotMachinePos.length; i++)
{
	slotMachineData[i] = { spinning: [] };
	slotMachineData[i].machine = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a"), new mp.Vector3(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
	
	slotMachineData[i].reels = [];
	
	var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, 0, -1.5, 1);
	var newShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
	newShape.casinoSlotMachime = i;
	
	for(var c=0; c < 3; c++)
	{
		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, reelsOffsets[c][0], reelsOffsets[c][1], reelsOffsets[c][2]);
		slotMachineData[i].reels[c] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
	}
}


mp.events.add('playerEnterColshape', (shape) => {

	if(shape.casinoSlotMachime !== undefined && lpSlotMachine == null && interactingWithSlotMachine == null)
	{
		slotMachineToJoin = shape.casinoSlotMachime;
		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
		mp.game.graphics.notify(`~b~${slotMachineNames[slotMachinePos[slotMachineToJoin].type]}~n~~w~Pritisnite E da igrate`);
		mp.gui.chat.push('shape ' + shape.casinoSlotMachime);
	}
});


mp.events.add('playerExitColshape', (shape) => {
	if(shape.casinoSlotMachime !== undefined)
	{
		slotMachineToJoin = null;
	}
});



mp.keys.bind(0x45, true, () =>  // E
{
	mp.gui.chat.push('1');
	if(mp.gui.cursor.visible || interactingWithSlotMachine != null) return false;
	mp.gui.chat.push('2');
	if(lpSlotMachine != null)
	{
		mp.gui.chat.push('3');
		mp.events.callRemote("leaveSlotMachine");
		interactingWithSlotMachine = lpSlotMachine;
		lpSlotMachine = null;
		BLOCK_CONTROLS_DURING_ANIMATION = false;
		if(canSpin) canSpin = false;
		mp.gui.chat.push('4');
		interactingWithSlotMachineTimeout = setTimeout(
			function()
			{
				mp.gui.chat.push('5');
				slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
				interactingWithSlotMachine = null;
				interactingWithSlotMachineTimeout = null;
			},4500
		);
	}
	else
	{
		mp.gui.chat.push('6');
		//if(slotMachineToJoin == null) return false;
		mp.gui.chat.push('7');
		interactingWithSlotMachine = slotMachineToJoin;
		mp.gui.chat.push('8');
		slotMachineData[slotMachineToJoin].machine.setCollision(false, false);
		mp.gui.chat.push('9');
		var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[slotMachineToJoin].x, slotMachinePos[slotMachineToJoin].y, slotMachinePos[slotMachineToJoin].z, slotMachinePos[slotMachineToJoin].rz, 0, -1.5, 1);
		localPlayer.position = new mp.Vector3(pos.x, pos.y, pos.z);
		localPlayer.setHeading(slotMachinePos[slotMachineToJoin].rz);
		mp.gui.chat.push('10');
		mp.events.callRemote("server:casino.slot.occupy", slotMachineToJoin);
		mp.events.call('client:casino.slot.occupy', localPlayer, slotMachine);
		mp.gui.chat.push('11');
		interactingWithSlotMachineTimeout = setTimeout(
			function()
			{
				mp.gui.chat.push('12');
				interactingWithSlotMachine = null;
				interactingWithSlotMachineTimeout = null;
			},5500
		);
	}
	mp.gui.chat.push('13');	
});


mp.events.add("client:casino.cancelInteractingWithSlotMachine", () => 
{
	slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
	interactingWithSlotMachine = null;
	if(interactingWithSlotMachineTimeout != null)
	{
		clearTimeout(interactingWithSlotMachineTimeout);
		interactingWithSlotMachineTimeout = null;
	}
});

mp.events.add("client:casino.slot.occupy", (player, machineID) => {
	if(player == localPlayer) 
	{
		lpSlotMachine = slotMachineToJoin;
		BLOCK_CONTROLS_DURING_ANIMATION = true;
		
		mp.game.graphics.notify(`Pritisnite levi klik misa(LMB) da zapocnete kockanje`);
		mp.events.call('client:slotMachineAllowSpin', true);
	}
	else
	{
		slotMachineData[machineID].machine.setNoCollision(player.handle, false);
		mp.events.call('client:slotMachineAllowSpin', true);
		
	}
});

mp.events.add("client:slotMachineAllowSpin", (toggle) => {	
	canSpin = toggle;
});


mp.events.add('playerDeath', (player) => 
{
	if(player == localPlayer) 
	{
		if(lpSlotMachine != null) lpSlotMachine = null;
		if(interactingWithSlotMachine != null) interactingWithSlotMachine = null;
		if(canSpin) canSpin = false;
	}
});


mp.events.add('render', (nametags) => {
	
	var rot = null;
	for(var machine = 0; machine < slotMachineData.length; machine++)
	{
		for(var i=0; i < 3; i++)
		{
			if(slotMachineData[machine]['spinning'][i])
			{
				rot = slotMachineData[machine].reels[i].rotation;
				slotMachineData[machine].reels[i].rotation = new mp.Vector3(rot.x+5.0, 0.0, rot.z);
			}
		}
	}
	
	if(canSpin)
	{
		if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // LMB
		{
			mp.events.callRemote("server:casino.slot.spin");
		}
	}
});


mp.events.add('client:spinSlotMachine', (id, position) => 
{
	try {
		let machine = id;
		let endPos = JSON.parse(position);
		slotMachineData[machine].endPos = endPos;

		mp.events.call('client:slotMachineAllowSpin', false);
		
		var pos = null;
		for(var i=0; i < 3; i++)
		{
			slotMachineData[machine].reels[i].destroy();
			pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[i][0], reelsOffsets[i][1], reelsOffsets[i][2]);
			slotMachineData[machine].reels[i] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"b_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[machine].rz) });
			slotMachineData[machine]['spinning'][i] = true;
		}
		
		setTimeout(
			function()
			{
				slotMachineData[machine]['spinning'][0] = null;
		
				slotMachineData[machine].reels[0].destroy();
				var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[0][0], reelsOffsets[0][1], reelsOffsets[0][2]);
				slotMachineData[machine].reels[0] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[0], 0, slotMachinePos[machine].rz) });
			}, SPINNING_TIME[slotMachineData[machine].endPos[3]][0]
		);
		setTimeout(
			function()
			{
				slotMachineData[machine]['spinning'][1] = null;
		
				slotMachineData[machine].reels[1].destroy();
				var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[1][0], reelsOffsets[1][1], reelsOffsets[1][2]);
				slotMachineData[machine].reels[1] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[1], 0, slotMachinePos[machine].rz) });
			}, SPINNING_TIME[slotMachineData[machine].endPos[3]][1]
		);
		setTimeout(
			function()
			{
				slotMachineData[machine]['spinning'][2] = null;
		
				slotMachineData[machine].reels[2].destroy();
				var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[2][0], reelsOffsets[2][1], reelsOffsets[2][2]);
				slotMachineData[machine].reels[2] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[2], 0, slotMachinePos[machine].rz) });
			}, SPINNING_TIME[slotMachineData[machine].endPos[3]][2]
		);
	}
	catch(e) {
		console.log(e);
	}
});

// Loading IPL 
mp.game.streaming.requestIpl('vw_casino_main');






/***/ }),

/***/ 9417:
/***/ (() => {

let canDoBets = true,
	 betObject = null,
	 closestChipSpot = null,
	 rouletteTable = null,
	 rouletteSeat = null,
	 startRoullete = false,
	 roulleteCam = false,
	 blockControls = false,
	 setBet = false;
	 CasinoPedsID = [],
    rouletteCamera = null,
    betCoords = null,
	 RouletteTables = [];

let betRoulette = [
    [],
    []
];

const CasinoPeds = [
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1145.337, 267.7967, -51.8409), Angle: 47.5},
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1149.791, 263.1628, -51.8409), Angle: 222.2},
];

const PrizePed = [
    {Hash: 0x1422D45B, Pos: new mp.Vector3(1087.727, 221.20876, -49.220415), Angle: 178},
];

const CasinoBlip = mp.blips.new(617, new mp.Vector3(935.8140869140625, 46.942176818847656, 81.09580993652344), { name: "Diamond Casino & Resort", color: 83, shortRange: true, scale: 1.0 });

const RouletteTablesSeatsHeading = (/* unused pure expression or super */ null && ([
    [45,-45,-135,-135],
    [225,135,45,45],

    [110.5,65.5,20.5, 330.5],
    [216.5,161.5,116.5, 66.5],
]));

const RouletteSeats = {
    0: "Chair_Base_04",
    1: "Chair_Base_03",
    2: "Chair_Base_02",
    3: "Chair_Base_01"
};

const RouletteCameraPos = [

    new mp.Vector3(1143.73, 268.9541, -52.960873 + 3.5),
    new mp.Vector3(1151.4585, 262.04517, -52.96084 + 3.5),
];


const RouletteCameraRot = [
	225,
   45
];


const RouletteCameraRotStop = [
	[-173, -112, -160],
	[13, 68, 17]
];



const RouletteTablesPos = [
    new mp.Vector3(1144.814, 268.2634, -52.8409),
    new mp.Vector3(1150.355, 262.7224, -52.8409),
];


const RouletteTablesHeading = [
    -135,
    45
];


setTimeout(function () {
	for(let tbs = 0; tbs < RouletteTablesPos.length; tbs++){
		RouletteTables[tbs] = {};
		RouletteTables[tbs].table = mp.objects.new(mp.game.joaat('vw_prop_casino_roulette_01'), new mp.Vector3( RouletteTablesPos[tbs].x, RouletteTablesPos[tbs].y, RouletteTablesPos[tbs].z), {
			rotation: new mp.Vector3(0, 0, RouletteTablesHeading[tbs]),
			alpha: 255,
			dimension: 0
		});
		RouletteTables[tbs].ball = mp.objects.new(87196104, new mp.Vector3( RouletteTablesPos[tbs].x, RouletteTablesPos[tbs].y, RouletteTablesPos[tbs].z));
	}
}, 1000);


setTimeout(function () {
    mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
    let n = 0;
    CasinoPeds.forEach(ped => {
        CasinoPedsID[n] = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        CasinoPedsID[n].setComponentVariation(0, 2, 1, 0);
        CasinoPedsID[n].setComponentVariation(1, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(2, 2, 0, 0);
        CasinoPedsID[n].setComponentVariation(3, 0, n + 2, 0);
        CasinoPedsID[n].setComponentVariation(4, 0, 0, 0);
        CasinoPedsID[n].setComponentVariation(6, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(7, 2, 0, 0);
        CasinoPedsID[n].setComponentVariation(8, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(10, 1, 0, 0);
        CasinoPedsID[n].setComponentVariation(11, 1, 0, 0);
        CasinoPedsID[n].setConfigFlag(185, true);
        CasinoPedsID[n].setConfigFlag(108, true);
        CasinoPedsID[n].setConfigFlag(208, true);
        CasinoPedsID[n].taskPlayAnim("anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false);
        n = n + 1;
        //CasinoPedsID[0].playFacialAnim("idle_facial", "anim_casino_b@amb@casino@games@shared@dealer@");
        //mp.game.invoke("0xEA47FE3719165B94", CasinoPedsID[0].handle, "anim_casino_b@amb@casino@games@shared@dealer@", "idle", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)
    });
	n = 0;

	PrizePed.forEach(ped => {
		var ped = mp.peds.new(ped.Hash, ped.Pos, ped.Angle, 0);
        ped.setComponentVariation(0, 2, 1, 0);
        ped.setComponentVariation(1, 1, 0, 0);
		ped.setComponentVariation(2, 2, 0, 0);
        ped.setComponentVariation(3, 0, n + 2, 0);
        ped.setComponentVariation(4, 0, 0, 0);
        ped.setComponentVariation(6, 1, 0, 0);
        ped.setComponentVariation(7, 2, 0, 0);
        ped.setComponentVariation(8, 1, 0, 0);
        ped.setComponentVariation(10, 1, 0, 0);
        ped.setComponentVariation(11, 1, 0, 0);
        ped.setConfigFlag(185, true);
        ped.setConfigFlag(108, true);
        ped.setConfigFlag(208, true);
	})

}, 10000);

mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@dealer@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@shared@player@");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@table");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@dealer");
mp.game.streaming.requestAnimDict("anim_casino_b@amb@casino@games@roulette@ped_male@seat_1@regular@01a@base");
mp.game.streaming.requestAnimDict("anim_casino_a@amb@casino@games@lucky7wheel@male");
mp.game.streaming.requestIpl("vw_casino_main");

mp.events.add('luckyWheel', (entity) => {
	let wheelPos = new mp.Vector3(1110.2651, 228.62857, -50.7558);
	
	mp.game.invoke("0x960C9FF8F616E41C", "Press ~INPUT_PICKUP~ to start shopping", true);
	entity.taskGoStraightToCoord(wheelPos.x, wheelPos.y, wheelPos.z, 1.0,  -1,  312.2,  0.0);

	setTimeout(() => {
		entity.setRotation(0.0, 0.0, 2.464141, 1, true);
		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "enter_right_to_baseidle", 8.0, -8.0, -1, 0, 0, false, false, false);
	}, 1000);

	setTimeout(() => {

		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "enter_to_armraisedidle", 8.0, -8.0, -1, 0, 0, false, false, false);
		if(entity == mp.players.local){

			setTimeout(() => {
				mp.events.callRemote('startRoll');
				entity.freezePosition(true);
				rouletteCamera = mp.cameras.new('default', new mp.Vector3(1111.015, 227.7846, -50.755825 +2.5), new mp.Vector3(0,0,0), 40);
				rouletteCamera.setRot(0.0, 0, 0, 2);
				rouletteCamera.setActive(true);
				//localplayer.freezePosition(true);
				mp.game.cam.renderScriptCams(true, true, 1500, true, false);
			}, 1000);
		}
	}, 2000);

	setTimeout(() => {

		entity.taskPlayAnim( "anim_casino_a@amb@casino@games@lucky7wheel@male", "armraisedidle_to_spinningidle_high", 8.0, -8.0, -1, 0, 0, false, false, false);
	}, 3000);
});

mp.events.add('delWheelCam', () => {
    rouletteCamera.destroy(true);
    rouletteCamera = null;
    mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	localplayer.freezePosition(false);
});

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
    
   CasinoPedsID[tb].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);

   setTimeout(
		function()
		{
            CasinoPedsID[tb].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);

		}, 8000
	);
});

mp.events.add('render', () => {
    if( blockControls) {
        mp.game.controls.disableControlAction(0, 257, true); // стрельба
		mp.game.controls.disableControlAction(0, 22, true);
		mp.game.controls.disableControlAction(2, 25, true);
		mp.game.controls.disableControlAction(0, 23, true); // INPUT_ENTER
		
		mp.game.controls.disableControlAction(2, 24, true);
		mp.game.controls.disableControlAction(2, 69, true);
		mp.game.controls.disableControlAction(2, 70, true);
		mp.game.controls.disableControlAction(2, 92, true);

		mp.game.controls.disableControlAction(2, 140, true);
		mp.game.controls.disableControlAction(2, 141, true);
		mp.game.controls.disableControlAction(2, 263, true);
		mp.game.controls.disableControlAction(2, 264, true);

		mp.game.controls.disableControlAction(0, 21, true);
		mp.game.controls.disableControlAction(0, 23, true);
		mp.game.controls.disableControlAction(0, 32, true);
		mp.game.controls.disableControlAction(0, 33, true);
		mp.game.controls.disableControlAction(0, 34, true);
		mp.game.controls.disableControlAction(0, 35, true);
    }

    if(setBet && rouletteCamera != null && rouletteTable != null && startRoullete == false && !mp.gui.cursor.visible){
        if(canDoBets && betObject == null)
        {
            betObject = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z + 0.4));
            betObject.setCollision(false, false);
        }
        if(betObject != null && canDoBets)
		{
			if(mp.game.controls.isDisabledControlJustReleased(0, 25) && !mp.gui.cursor.visible) // ПКМ
			{
				if(closestChipSpot != null) mp.events.call('bet_roulette', rouletteTable, closestChipSpot);//mp.events.callRemote("server_remove_roulette_bet", closestChipSpot);
			}
			
			if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // ЛКМ
			{
				if(closestChipSpot != null) mp.events.call('bet_roulette', rouletteTable, closestChipSpot); //mp.events.callRemote("server_make_roulette_bet", closestChipSpot);
            }

			let drawObj = getCameraHitCoord();
			if(drawObj != null)
			{
				
				// let height = betObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
				//drawObj.position.z = RouletteTablesPos[rouletteTable].z;
                //drawObj.position.z = mp.game.gameplay.getGroundZFor3dCoord(drawObj.position.x, drawObj.position.y, drawObj.position.z, parseFloat(0), false);
                getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));

				if(betCoords == null){
					betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y,RouletteTablesPos[rouletteTable].z + 0.95, false, false, false);
					getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
				}
				else {
					
					betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, RouletteTablesPos[rouletteTable].z + 0.95, false, false, false);
					getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
				}				
				//getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
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

		if(rotx > -57.5) rotx = -57.5;
		if(rotx < -70) rotx = -70;
		
        if(rotz < RouletteCameraRotStop[rouletteTable][0]) rotz = RouletteCameraRotStop[rouletteTable][0];
        if(rotz > RouletteCameraRotStop[rouletteTable][1]) rotz = RouletteCameraRotStop[rouletteTable][1];

        if(rotx < -69 && rotz < RouletteCameraRotStop[rouletteTable][2]) {
            rotz = RouletteCameraRotStop[rouletteTable][2];
            rotx = -69;
        }
        

        rouletteCamera.setRot(rotx, 0.0, rotz, 2);

        let cp = rouletteCamera.getRot(2);
    }    
    if(startRoullete == true && rouletteTable != null && !roulleteCam){
		
        const ballPos = RouletteTables[rouletteTable].table.getWorldPositionOfBone(RouletteTables[rouletteTable].table.getBoneIndexByName("Roulette_Wheel"));
        //rouletteCamera.setActive(false);
        //rouletteCamera.destroy();
        //rouletteCamera = mp.cameras.new('default', new mp.Vector3(ballPos.x, ballPos.y, ballPos.z+1.5), new mp.Vector3(0,0,0), 40);
        rouletteCamera.setCoord(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z+1.5);
        rouletteCamera.pointAtCoord(ballPos.x, ballPos.y, ballPos.z);
        //rouletteCamera.setRot(90.0, 0, 225, 2);
        rouletteCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 2500, true, false);
        roulleteCam = true;
    }
    if(startRoullete == false && rouletteTable != null && roulleteCam){
		
        roulleteCam = false;
        rouletteCamera.destroy();
        rouletteCamera = mp.cameras.new('default', RouletteCameraPos[rouletteTable], new mp.Vector3(0,0,0), 40);
        rouletteCamera.setRot(-63, 0, RouletteCameraRot[rouletteTable], 2);
        rouletteCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 1500, true, false);
    }
	
});

mp.events.add('render', rouletteRender);
function rouletteRender() 
{
	for(var i=0; i < RouletteTables.length; i++)
	{
		if(RouletteTables[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel", 3))
		{
			if(RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_wheel") > 0.9425)
			{
				RouletteTables[i].table.playAnim("loop_wheel", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, true, 0, 131072);
			}
		}
		
		if(RouletteTables[i].ball.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "intro_ball", 3))
		{
			if(RouletteTables[i].ball.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "intro_ball") > 0.99)
			{
                const ballPos = RouletteTables[i].table.getWorldPositionOfBone(RouletteTables[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = RouletteTables[i].table.getRotation(2);
				RouletteTables[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				RouletteTables[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				
				RouletteTables[i].ball.playAnim("loop_ball", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, true, true, false, 0, 136704);
			}
		}
		
		if(RouletteTables[i].table.isPlayingAnim("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel", 3))
		{
			
			if(RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") >= 0.9 && Date.now()-RouletteTables[i].lastSpinTime > 1000)
			{
				RouletteTables[i].spins++;
				RouletteTables[i].lastSpinTime = Date.now();
			}
			if(RouletteTables[i].spins == RouletteTables[i].needSpins-1)
			{
				RouletteTables[i].ball.setAnimSpeed("anim_casino_b@amb@casino@games@roulette@table", "loop_ball", 0.70);
			}
			if(RouletteTables[i].spins == RouletteTables[i].needSpins && RouletteTables[i].table.getAnimCurrentTime("anim_casino_b@amb@casino@games@roulette@table", "loop_wheel") > 0.99)
			{
                RouletteTables[i].table.playAnim(RouletteTables[i].endTable, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 131072);
				
                const ballPos = RouletteTables[i].table.getWorldPositionOfBone(RouletteTables[i].table.getBoneIndexByName("Roulette_Wheel"));
                const ballRot = RouletteTables[i].table.getRotation(2);
				RouletteTables[i].ball.position = new mp.Vector3(ballPos.x, ballPos.y, ballPos.z);
				RouletteTables[i].ball.rotation = new mp.Vector3(ballRot.x,ballRot.y,ballRot.z + 90);
				RouletteTables[i].ball.playAnim(RouletteTables[i].endBall, "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 136704);
			}
		}
	}
}

mp.events.add('casinoBet', (val) => {
	setBet = true;
	mp.gui.cursor.visible = false;
   mp.events.callRemote('serverSetRouletteBet', val);
});


mp.events.add('clean_chips', function( table){

    CasinoPedsID[table].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "clear_chips_intro", 3.0, 1.0, -1, 2, 0, false, false, false);

    for(let i = 0; i < betRoulette[table].length; i++)
    {
        if(betRoulette[table][i] != null)
        betRoulette[table][i].destroy();
    }

    betRoulette[table] = [];

    setTimeout(() => {
        CasinoPedsID[table].taskPlayAnim("anim_casino_b@amb@casino@games@roulette@dealer", "clear_chips_outro", 3.0, 1.0, -1, 2, 0, false, false, false);
    }, 1000);
});


mp.events.add('start_roulette', function(){
    startRoullete = true;
});

mp.events.add('stop_roulette', function(){
    startRoullete = false;
});

mp.events.add('bet_roulette', function(table, spot){
    //player.taskPlayAnim("anim_casino_b@amb@casino@games@blackjack@player", "place_bet_small", 3.0, 1.0, -1, 2, 0, false, false, false);
    let tablePos = RouletteTablesPos[table];
    let betOffset = tableChipsOffsets[spot]; 
    let newCardPos = mp.game.object.getObjectOffsetFromCoords(tablePos.x, tablePos.y, tablePos.z, RouletteTablesHeading[table], betOffset[0], betOffset[1], betOffset[2]);
   
	 betRoulette[table].push(mp.objects.new(mp.game.joaat(`vw_prop_chip_100dollar_x1`), new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z),
	 {
		rotation: new mp.Vector3(0,0,0),
		alpha: 255,
		dimension: 0,
	 }));
});

mp.events.add('seat_to_roulette_table', function(table){
		localplayer.freezePosition(true);
		rouletteTable = table;
		setBet = false;
		rouletteCamera = mp.cameras.new('default', RouletteCameraPos[table], new mp.Vector3(90,0,0), 40);
		rouletteCamera.setRot(-63, 0, RouletteCameraRot[table], 2);
	// rouletteCamera.pointAtCoord(RouletteTablesPos[table].x, RouletteTablesPos[table].y, RouletteTablesPos[table].z);
		rouletteCamera.setActive(true);
		//localplayer.freezePosition(true);
		mp.game.cam.renderScriptCams(true, true, 1500, true, false);
		blockControls = true;
});

mp.events.add('exit_roulette', function(){
    //entity.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "sit_exit_left", 3.0, 1.0, 2500, 2, 0, false, false, false);
try {
		RouletteTables[rouletteTable].table.setCollision(true, false);
		rouletteCamera.destroy(true);
		rouletteCamera = null;
		rouletteTable = null;
		mp.game.cam.renderScriptCams(false, true, 1000, true, false);
		localplayer.freezePosition(false);
		blockControls = false;
		setBet = false;

		clearTableMarkers();
		if(betObject != null || betObject !== undefined){
			betObject.destroy();
			betObject = null;
		}
	}
	catch(e) {
		console.log(e);
	}
});

function getCameraHitCoord()
{
	let position = rouletteCamera.getCoord();
	let direction = rouletteCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 3) + position.x, (direction.y * 3) + position.y, (direction.z * 3) + position.z);
	
    let hitData = mp.raycasting.testPointToPoint(position, farAway);
   // mp.game.graphics.drawLine(position.x, position.y, position.z, farAway.x, farAway.y, farAway.z, 255, 0, 0, 255);
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
	[0.0643310546875, -0.304718017578125, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12"]], 
	[0.392822265625, -0.304779052734375, 0.9449996948242188, ["13","14","15","16","17","18","19","20","21","22","23","24"]],
	[0.712158203125, -0.30303955078125, 0.9449996948242188, ["25","26","27","28","29","30","31","32","33","34","35","36"]],
	[0.9222412109375, -0.185882568359375, 0.9449996948242188, ["1","4","7","10","13","16","19","22","25","28","31","34"]],
	[0.9229736328125, -0.0181884765625, 0.9449996948242188, ["2","5","8","11","14","17","20","23","26","29","32","35"]],
	[0.9248046875, 0.14849853515625, 0.9449996948242188, ["3","6","9","12","15","18","21","24","27","30","33","36"]],
	[-0.011474609375, -0.378875732421875, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]],
	[0.142822265625, -0.375732421875, 0.9449996948242188, ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]],
	[0.308349609375, -0.37542724609375, 0.9449996948242188, ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]],
	[0.4713134765625, -0.376861572265625, 0.9449996948242188, ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]],
	[0.6341552734375, -0.376495361328125, 0.9449996948242188, ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]],
	[0.7926025390625, -0.382232666015625, 0.9449996948242188, ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]]
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
	var prevDistance = 0.025;
	var dist = null;

	for(var i=0; i < tableChipsOffsets.length; i++)
	{
        //dist = mp.Vector3.getDistanceBetweenPoints3D(vector, new mp.Vector3(RouletteTablesPos[0].x+tableChipsOffsets[i][0], RouletteTablesPos[0].y+tableChipsOffsets[i][1], RouletteTablesPos[0].z+tableChipsOffsets[i][2]));
        let newCordPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableChipsOffsets[i][0], tableChipsOffsets[i][1], tableChipsOffsets[i][2]);
        dist = mp.game.gameplay.getDistanceBetweenCoords(vector.x, vector.y, vector.z, newCordPos.x, newCordPos.y,newCordPos.z, false);

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
            let newBetPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableChipsOffsets[spot][0], tableChipsOffsets[spot][1], tableChipsOffsets[spot][2]);
            betCoords = newBetPos;

			for(var i=0; i < tableChipsOffsets[spot][3].length; i++)
			{
				key = tableChipsOffsets[spot][3][i];
				if(key == "00" || key == "0")
				{
                    let newCardPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableMarkersOffsets[key][0], tableMarkersOffsets[key][1], tableMarkersOffsets[key][2]);
                    
                    obj = mp.objects.new(269022546, new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z), {rotation: new mp.Vector3(0, 0, RouletteTablesHeading[rouletteTable])});
					obj.setCollision(false, false);
					tableMarkers.push(obj);
				}
				else
				{
                    let newCardPos = mp.game.object.getObjectOffsetFromCoords(RouletteTablesPos[rouletteTable].x, RouletteTablesPos[rouletteTable].y, RouletteTablesPos[rouletteTable].z, RouletteTablesHeading[rouletteTable], tableMarkersOffsets[key][0], tableMarkersOffsets[key][1], tableMarkersOffsets[key][2]);
                    
                   
                    tableMarkers.push(mp.objects.new(3267450776, new mp.Vector3(newCardPos.x, newCardPos.y, newCardPos.z), {rotation: new mp.Vector3(0, 0, RouletteTablesHeading[rouletteTable])}));
				}
			}
		}
	}	
}
/*

mp.keys.bind(0x09, false, function () { // change bet
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true) return;

    mp.events.callRemote('serverChangeRouletteBet');
    
    lastCheck = new Date().getTime();
});*/

/***/ }),

/***/ 6064:
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
mp.game.streaming.requestIpl('vw_casino_main');


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
				if(closestChipSpot != null) mp.events.callRemote("makeRouletteBet", closestChipSpot);
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
				*/

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
				
				/*
				rouletteData[i].ball.position = new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.36617, tablesPos[i][3]+1.0715); // new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]+1.0715);
				rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				*/

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

/***/ }),

/***/ 8319:
/***/ (() => {


const Player = mp.players.local;

let browser = null, opened = false;


let PatrolsMap = false;


mp.events.add({
   'entityStreamIn': (entity) => {

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
})



// function Patrol (callsign, x, y) { 

//    const { x, y } = Player.position;
   
//    let N = 0, M = 0;
   
//    // 400 / 500 = N / x;


// };



mp.events.addDataHandler({
   'callsign': (entity, newValue, oldValue) => {

   }
});






/***/ }),

/***/ 1406:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// uraditi provere da li je chat otvoren

var moving_speeds = [0.01, 0.1, 1.0, 5.0, 10.0];
var moving_speed_idx = 0;

var editing_types = ["X position", "Y position", "Height", "X Rot", "Y Rot", "Rotation"];
var editing_type_idx = 0;

const localplayer = mp.players.local;

__webpack_require__.g.editing = false;
var object = null;

var sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
var scInst = 0;

function AddInstructionalStart() {
    scInst = 0;
    mp.game.graphics.drawScaleformMovieFullscreen(sc, 255, 255, 255, 0, false);
    mp.game.graphics.pushScaleformMovieFunction(sc, "CLEAR_ALL");
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_CLEAR_SPACE");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}

function AddInstructionalButton(text, button)
{
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}

function AddInstructionalButtonCustom(text, button) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(button);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    scInst++;
}

function AddInstructionalEnd(type) {
    mp.game.graphics.pushScaleformMovieFunction(sc, "DRAW_INSTRUCTIONAL_BUTTONS");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_BACKGROUND_COLOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}

mp.events.add("client:startFurnitureEditor", function (model) {
   object = mp.objects.new(mp.game.joaat(model), new mp.Vector3(localplayer.position.x+1, localplayer.position.y+1, localplayer.position.z-0.5), 
   {
	   rotation: new mp.Vector3(0, 0, 0),
	   alpha: 255,
	   dimension: localplayer.dimension
   });
   editing = true;
});

mp.events.add("client:stopFurnitureEditor", function () {
   object.destroy();
   object = null;
   editing = false;
});

function UpdateObject() {
   if (object == null) return;
   
   let model = object.model;
   let position = object.position;
   let rot = object.getRotation(2);
   let pitch = object.getPitch();
   
   object.destroy();
   object = mp.objects.new(model, position,
   {
	   rotation: new mp.Vector3(rot.x, rot.y, rot.z),
	   alpha: 255,
	   dimension: localplayer.dimension
   });
   object.setRotation(pitch, rot.y, rot.z, 2, true);
}

mp.keys.bind(0x26, false, function () { // UP Arrow
   if (!editing || object === null) return; // uraditi proveru i da li je chat otvoren
   switch (editing_type_idx) {
       // pos x
       case 0:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x + moving_speeds[moving_speed_idx], pos.y, pos.z);
           break;
       // pos y
       case 1:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x, pos.y + moving_speeds[moving_speed_idx], pos.z);
           break;
       // pos z
       case 2:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x, pos.y, pos.z + moving_speeds[moving_speed_idx]);
           break;
       // rot x
       case 3:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
		   
           object.setRotation(pitch + moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
           mp.gui.chat.push("rot X" + rot);
           break;
       // rot y
       case 4:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
		   
           object.setRotation(pitch, rot.y + moving_speeds[moving_speed_idx], rot.z, 2, true);
           mp.gui.chat.push("rot Y" + rot);
           break;
       // rot z
       case 5:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
		   
           object.setRotation(pitch, rot.y, rot.z + moving_speeds[moving_speed_idx], 2, true);

           mp.gui.chat.push("rot Z" + rot);
           break;
   }
   UpdateObject();
});

mp.keys.bind(0x28, false, function () { // DOWN Arrow
   if (!editing || object === null) return; // uraditi proveru i da li je chat otvoren
   switch (editing_type_idx) {
       // pos x
       case 0:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x - moving_speeds[moving_speed_idx], pos.y, pos.z);
           break;
       // pos y
       case 1:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x, pos.y - moving_speeds[moving_speed_idx], pos.z);
           break;
       // pos z
       case 2:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x, pos.y, pos.z - moving_speeds[moving_speed_idx]);
           break;
       // rot x
       case 3:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
		   
           object.setRotation(pitch - moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
           break;
       // rot y
       case 4:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
		   
           object.setRotation(pitch, rot.y - moving_speeds[moving_speed_idx], rot.z, 2, true);
           break;
       // rot z
       case 5:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
		   
           object.setRotation(pitch, rot.y, rot.z - moving_speeds[moving_speed_idx], 2, true);
           break;
   }
   UpdateObject();
});

mp.keys.bind(0x25, false, function () { // LEFT Arrow
   if (!editing) return;
   
   editing_type_idx--;
   if (editing_type_idx < 0) editing_type_idx = editing_types.length - 1;
   mp.gui.chat.push(`[DEBUG] Edit type: ${editing_types[editing_type_idx]}`);
});

mp.keys.bind(0x27, false, function () { // RIGHT Arrow
   if (!editing) return;
   
   editing_type_idx++;
   if (editing_type_idx >= editing_types.length) editing_type_idx = 0;
   mp.gui.chat.push(`[DEBUG] Edit type: ${editing_types[editing_type_idx]}`);
});

mp.keys.bind(0x59, false, function () { // Y key
   if (!editing || object === null) return;
   
   let rot = object.getRotation(2);

   mp.events.callRemote("server:acceptEditFurniture", object.model, object.position.x, object.position.y, object.position.z, rot.x, rot.y, rot.z);
   
   object.destroy();
   object = null;
   editing = false;
   mp.gui.chat.push("[DEBUG] Edit finished, furniture placed");
});

mp.keys.bind(0x4E, false, function () { // N key
   if (!editing) return;
   object.destroy();
   object = null;
   editing = false;
   //mp.events.callRemote("server:cancelEditFurniture");
   mp.gui.chat.push("[DEBUG] Edit canceled");
});

mp.keys.bind(0x5A, false, function () { // Z key
   if (!editing || object === null) return;
   object.placeOnGroundProperly();
   UpdateObject();
   mp.gui.chat.push("[DEBUG] Object placed on ground properly.");
});

mp.keys.bind(0x6B, false, function () { // Add key
   if (!editing) return;
   moving_speed_idx++;
   if (moving_speed_idx >= moving_speeds.length) moving_speed_idx = 0;
   mp.gui.chat.push(`[DEBUG] Speed added ${moving_speed_idx}`);
});

mp.keys.bind(0x6D, false, function () { // Subtract key
   if (!editing) return;
   moving_speed_idx--;
   if (moving_speed_idx < 0) moving_speed_idx = moving_speeds.length - 1;
   mp.gui.chat.push(`[DEBUG] Speed lowered ${moving_speed_idx}`);
});

mp.events.add('render', () => {
    if (object === null) return;

    AddInstructionalStart();
    AddInstructionalButton("Next mode", 197);
    AddInstructionalButton("Previous mode", 196);
    AddInstructionalButton("Moving an object", 194);
    AddInstructionalButton("Moving an object", 195);
    AddInstructionalButtonCustom("Increase speed", "t_+");
    AddInstructionalButtonCustom("Decrease speed", "t_-");
	AddInstructionalButtonCustom("Place on ground", "t_Z");
    AddInstructionalButtonCustom("Finish furniture", "t_Y");
    AddInstructionalButtonCustom("Cancel", "t_N");
    AddInstructionalEnd(1);

    mp.game.graphics.drawText(`Editing mode: ${editing_types[editing_type_idx]}\nSpeed: ${moving_speeds[moving_speed_idx]}`, [0.5, 0.9], {
        font: 0,
        color: [255, 255, 255, 255],
        scale: [0.5, 0.5],
        outline: false
    });
});

/***/ }),

/***/ 2687:
/***/ (() => {


const player = mp.players.local;

let browser = null, opened = false, house = null;

mp.events.add({
   'client:house.management': () => { 
      opened = !opened;
      if (opened) { 
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);
         browser = mp.browsers.new('package://houses/houses-interfaces/house.html');
         player.BrowserControls(true, true);
         // let info = await mp.events.callRemoteProc('server:house.management.info', house);
         // info = JSON.stringify(info);
         // browser.execute('house.player.money = ' + player.money);
         // browser.execute('house.player.money = ' + player.money);
      } else { 
         browser.destroy();
         player.BrowserControls(false, false);
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 300);

      }
   },


   'client:house.money.update': (info) => { 
      mp.events.callRemote('server:house.update', info)
   }
})

/***/ }),

/***/ 9179:
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

/***/ 2816:
/***/ (() => {



const Player = mp.players.local;

let browser = null, opened = false;
let Delivering = false;

mp.events.add({

   'client:job.food:orders': (orders) => { 
      if (Delivering) return;
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://jobs/jobs-interfaces/food.html');
         browser.execute('food.Orders = ' + JSON.stringify(orders));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:job.food.order:accept': async (index) => { 
      const response = await mp.events.callRemoteProc('server:job.food.order:accept', index);
      if (response) { 
         
         mp.events.call('client:job.food:orders');

         Delivering = true;

         const Position = new mp.Vector3(response.Position.x, response.Position.y, response.Position.z - 0.9)
         const {checkpoint, blip} = Player.CreateInteractionSpot('Food Order', Position);

         mp.events.add('playerEnterCheckpoint', ReachOrderPoint);
         
         function ReachOrderPoint (point) { 
            if (point == checkpoint) { 
               if (Player.vehicle) return;
               Delivering = false;
               checkpoint.destroy();
               blip.destroy();
               mp.events.callRemote('server:job.food.order:deliver', index);
               mp.events.remove('playerEnterCheckpoint', ReachOrderPoint);
            }
         }
      } else {
         mp.events.call('client:job.food:orders');
         Delivering = false;
      }
   }
});






/***/ }),

/***/ 2387:
/***/ (() => {




const Player = mp.players.local, MAX = 25;
let DeliveredMails = 0;

mp.events.add({

   'client:job.postal:start': (deliverPos) => {
      HouseInteraction(deliverPos);
   },  
});

function HouseInteraction (position) {
   const { Checkpoint, Blip } = Player.CreateInteractionSpot(`Mail Deliver No${DeliveredMails}`, deliverPos);

   mp.events.add('playerEnterCheckpoint', OnPlayerDeliverMail);

   function OnPlayerDeliverMail (point) { 
      if (DeliveredMails == MAX) {
         //mp.events.callRemote('server:job:finish', 6); // jobId
      }
      if (point == Checkpoint) { 
         DeliveredMails++;
         Checkpoint.destroy();
         Blip.destroy();
         mp.events.remove('playerEnterCheckpoint', OnPlayerDeliverMail);
         
      }
   }
}

function BehindTruckInteraction () {
   const Truck = player.getVariable('Job_Veh');
   if (Truck) {
      const PosBehind = Truck.getOffsetFromInWorldCoords(0.0, -3.8, 0.0);
      const { Checkpoint, Blip } = Player.CreateInteractionSpot('GoPostal Van', PosBehind);

      mp.events.add('playerEnterCheckpoint', OnPlayerTakeMail);
      function OnPlayerTakeMail (point) { 
         if (point == Checkpoint) {
            if (Utils.Distance(Player.position, PosBehind) <= 0.5) {
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

/***/ 9408:
/***/ (() => {


const player = mp.players.local;
let marker = null;

mp.events.addDataHandler('container', (entity, newValue, oldValue) => {
   if (entity.type === 'vehicle' && entity.model == 444583674) {
      if (newValue !== oldValue) { 
         container(entity, newValue);
      }
   }
});

mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'vehicle' && entity.model == 444583674) { 
         if (entity.getVariable('container')) container(entity, entity.getVariable('container'));
      }
   },

   'render': () => { 
      if (player.vehicle && player.vehicle.model == 444583674) { 
         if (player.vehicle.getVariable('container') != false) { 
            // mp.game.controls.disableControlAction(0, 110, true); // DISABLEATI NUM 8 i 5 da kad ima =>
            // mp.game.controls.disableControlAction(27, 111, true); // > kontenjer ne moze da podize i spusta
         }
      }
   }
})

mp.keys.bind(0x59, false, function() {
   if (player.logged && player.spawned) {
      if (player.vehicle && player.vehicle.model == 444583674) { 
         let vehicle = player.vehicle;
         if (vehicle.container) { 
            let frontOffset = vehicle.getOffsetFromInWorldCoords(0.0, 6.5, 0.0);
            mp.events.callRemote('server:vehicle.detach.container', frontOffset); 
            if (marker) marker.destroy();
         } else { 
            mp.events.callRemote('server:vehicle.attach.container'); 
            marker = mp.blips.new(1, new mp.Vector3(1111.625, -3139.361, 0), { name: 'Zona za dostavu kontenjera', color: 49, shortRange: false });
         }
      }
   }
});

function container (vehicle, value) { 
   if (value) { 
      vehicle.container = value;
      vehicle.containerObject = mp.objects.new('prop_container_03a', vehicle.position, { rotation: vehicle.rotation, alpha: 255, dimension: vehicle.dimension });
      vehicle.containerObject.notifyStreaming = true;
      vehicle.containerObject.setNoCollision(vehicle.handle, false);
      waitEntity(vehicle.containerObject).then(() => {
         let position = new mp.Vector3(0.05, -0.02, 0.01);
         vehicle.containerObject.attachTo(vehicle.handle, 0, position.x - 0.05, position.y + 6, position.z, 0, 0, 90, true, false, true, false, 2, true);
      })
   } else { 
      vehicle.container = false;
      if (vehicle.containerObject) { 
         if (vehicle.containerObject.doesExist()) { 
            vehicle.containerObject.destroy();
         }
      }
   }
}

function waitEntity (entity) {
   return new Promise(resolve => {
      let wait = setInterval(() => {
         if (mp.game.entity.isAnEntity(entity.handle)) {
            clearInterval(wait);
            resolve();
         }
      }, 1);
   });
}


/***/ }),

/***/ 4032:
/***/ (() => {





const Player = mp.players.local;
let browser = null, opened = false;

let Direction = null;

mp.events.add({

   'client:job:offer': (info) => {
      mp.gui.chat.push(JSON.stringify(info))
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://jobs/jobs-interfaces/job.html');
         browser.execute('offer.Job = ' + JSON.stringify(info));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:job:accept': (job) => { 
      mp.events.call('client:job:offer')
      mp.events.callRemote('server:job:accept', job);
   },

   'client:job:direction': (position) => { // data = position ( i možda ime posla )
      Direction.Checkpoint != null ? RemoveDirections () : Direction.Checkpoint = mp.checkpoints.new(1, position, 3, {
            color: [ 255, 255, 255, 255 ],
            visible: true,
            dimension: player.dimension
      });
      Direction.Blip != null ? RemoveDirections () : Direction.Blip = mp.blips.new(1, new mp.Vector3(position.x, position.y, 0), {
          name: "Job",
          color: 84,
          alpha: 255,
          shortRange: true,
          dimension: player.dimension
      });
   },

   'client:job:waypoint': (position) => {
      mp.game.ui.setNewWaypoint(position.x, position.y);
   }
   
});

function RemoveDirections () {
   if (Direction == null) return;

   if (Direction.Blip != null) {
      Direction.Blip.destroy();
      Direction.Blip = null;
   }
   if (Direction.Checkpoint != null) {
      Direction.Checkpoint.destroy();
      Direction.Checkpoint = null;
   }
}

/* 
         mp.checkpoints.new(1, new mp.Vector3(position.x, position.y, position.z), 4,
            { 
                color: [ 255, 255, 255, 255 ],
                visible: true,
                dimension: player.dimension
            });
            jobCp[index].jobName = jobName;
            mp.events.call('client:set.waypoint', position);
        }
        else {
            jobBlip[index] = mp.blips.new(1, new mp.Vector3(position.x, position.y, 0),
            {
                name: jobName,
                color: 84,
                alpha: 255,
                shortRange: false,
                dimension: player.dimension
            });

*/


/***/ }),

/***/ 9247:
/***/ (() => {



const Player = mp.players.local;
let Spots = [], current = null;
let browser = null;


mp.events.add({
   'client:player.miner.start': Start,
   
   'client:player.miner.next': Next,

   'playerEnterCheckpoint': (checkpoint) => {
      if (Player.Job == 2 && Spots.length > 0 && current != null) { 
         mp.gui.chat.push('Going to next')
         Mine();
      } 
   },

   'client:player.miner:mine': () => {
      mp.game.streaming.requestAnimDict('amb@world_human_const_drill@male@drill@base');
      Player.taskPlayAnim('amb@world_human_const_drill@male@drill@base', 'base', 8.0, -8, -1, 48, 0, false, false, false);

      let timer = setInterval(() => {
         if (Player.getAnimCurrentTime('amb@world_human_const_drill@male@drill@base', 'base') > 0.95) {
            Player.stopAnimTask('amb@world_human_const_drill@male@drill@base', 'base', 3.0);
            clearInterval(timer);
            timer = null;
            if (!timer) browser.execute('mining.clicked = false')
         }
      }, 50);
   }
})


function Start (places) { 

   places.forEach(place => {
      Spots.push({position: place});
   });

   current = 0;
   browser = mp.browsers.new('package://jobs/jobs-interfaces/mining.html');

   let spot = Spots[current];
   let position = new mp.Vector3(spot.position[0], spot.position[1], spot.position[2] - 2.15)
   spot.checkpoint = mp.checkpoints.new(47, position, 2.5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
}


function Mine () { 
   mp.gui.cursor.show(true, true);
   browser.execute('mining.toggle = true');

   Player.taskStartScenarioInPlace('WORLD_HUMAN_CONST_DRILL', 0, true);
}

function Next () {    

   Player.clearTasks();

   let spot = Spots[current];
   spot.checkpoint.destroy();

   mp.gui.cursor.show(false, false);
   browser.execute('mining.toggle = false');

   current ++;
   let next = Spots[current], position = new mp.Vector3(next.position[0], next.position[1], next.position[2] - 2.15);
   
   current >= Spots.length ? ( Finish() ) : (
      next.checkpoint = mp.checkpoints.new(47, position, 2.5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension })
   )
}


function Finish () { 
   current = null;
   Spots = null;

   if (mp.browsers.at(browser.id)) browser.destroy();

   mp.gui.chat.push('Finished !')
}

/***/ }),

/***/ 2399:
/***/ (() => {



const Player = mp.players.local;

const Max = 25;
const Depony = new mp.Vector3(-435.5779, -1704.9042, 18.06115);

let Visited = [], Picked = false;


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
   if (Player.logged && Player.spawned && Player.getVariable('Job') == 4 && Player.getVariable('Job_Duty') == true) { 
      if (Player.vehicle || Player.Cuffed || Player.isTypingInTextChat) return;
      
      if (Visited.length == Max) return;

      if (Visited.length == Max - 1) { 
         const {checkpoint, blip} = Player.CreateInteractionSpot('Depony', Depony);

         mp.events.add('playerEnterCheckpoint', PlayerEnterDepony);

         function PlayerEnterDepony (point) { 
            if (point == checkpoint) { 

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

                  checkpoint.destroy();
                  blip.destroy();
                  mp.events.remove('playerEnterCheckpoint', PlayerEnterDepony);
               }
            }
         }
      }

      const Garbage = await ClosestGarbage();
      if (Garbage) { 
         const aPicked = AlreadyPicked();
         if (aPicked) return;

         Picked = true;
         mp.events.callRemote('server:character.attachment', 'prop_cs_street_binbag_01', 6286)
         Visited.push(Player.position);

         const Truck = mp.vehicles.atRemoteId(Player.getVariable('Job_Vehicle'));

         if (Truck) { 
            const BehindOffset = Truck.getOffsetFromInWorldCoords(0.0, -5.15, 0.0);
            const [colshape, marker] = LittleMarker(BehindOffset);

            Truck.freezePosition(true);
   
            mp.events.add('playerEnterColshape', BehindGarbageTruck);
   
            function BehindGarbageTruck (shape) { 
               if (shape == colshape) {        
                  
                  if (Player.vehicle) return;

                  Player.setHeading(Truck.heading);
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
      };
   }
});



function ClosestGarbage () { 
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
};


function AlreadyPicked () { 
   if (Visited.length > 0) { 
      for (const Position of Visited) { 
         const Distance = mp.game.gameplay.getDistanceBetweenCoords(Player.position.x, Player.position.y, Player.position.z, Position.x, Position.y, Position.z, true);
         if (Distance < 3.5) { 
            return true;
         }
      }
   }
};


function LittleMarker (position) { 
   const Marker = mp.markers.new(0, new mp.Vector3(position.x, position.y, position.z - 0.35), 0.4, { rotation: new mp.Vector3(0, 0, 0), color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
   const Colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 0.75, Player.dimension);
   return [Colshape, Marker]
};


mp.events.addProc('client:job.garbage.trash:get', () => {
   return Visited.length;
});







/***/ }),

/***/ 1846:
/***/ (() => {



const Player = mp.players.local;


mp.events.add({
   'playerEnterVehicle': (Vehicle, Seat) => { 
      if (Vehicle.getVariable('Job') == 7) { 
         if (Seat == -1) return;
         const Driver = Vehicle.getPedInSeat(-1);
   
         mp.gui.chat.push(JSON.stringify(Driver));
         mp.gui.chat.push(JSON.stringify(Driver.id))
      }
   },

   'playerLeaveVehicle': (Vehicle, Seat) => { 
      if (Seat == -1) return;
   }
})


/***/ }),

/***/ 4116:
/***/ (() => {



const player = mp.players.local;
let route = [], current = false, max = 0, distance = 0;
let browser = null, finishing = false, wrong = false;

let cancel = null;
let garage = new mp.Vector3(447.428, -591.51739, 28.0754);


class Station { 
   constructor (id, name, position) { 
      this.id = id;
      this.name = name;
      this.position = new mp.Vector3(parseFloat(position.x), parseFloat(position.y), parseFloat(position.z - 1.07));
      this.checkpoint = mp.checkpoints.new(47, this.position, 5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension, visible: false });
      this.checkpoint.station = this.id;
      let number = this.id + 1;
      this.blip = mp.blips.new(1, new mp.Vector3(this.position.x, this.position.y, 0), { name: number + '. ' + this.name, color: 5, shortRange: false, alpha: 0 });
      
      route.push(this)
   }

   delete () { 
      this.checkpoint.destroy();
      this.blip.destroy();
      let i = route.indexOf(this);
      route.splice(i, 1)
   }
   

   visible () { 
      this.checkpoint.visible = true;
      this.blip.setAlpha(255);
   }
}

mp.events.add({
   'client:player.transit.start': (checkpoints) => { 
      let stations = {};
      for (let i in checkpoints) { 
         let station = checkpoints[i];
         new Station(parseInt(i), station.name, station.position);
         stations[i] = { name: station.name, active: true, wrong: false };
      }

      max = route.length - 1;
      current = 0;
      route[current].visible();
      browser = mp.browsers.new('package://jobs/jobs-interfaces/transit.html');
      browser.execute('transit.toggle = true, transit.stations = ' + JSON.stringify(stations) + ';');
   },

   'playerEnterCheckpoint': (checkpoint) => {
      if (player.Job == 3 && route.length > 0) { 
         mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 1')
         let vehicle = player.vehicle;
         if (vehicle && vehicle.getClass() == 17 && checkpoint.station >= 0) { 
            player.stopped = true;
            setTimeout(() => { 
               player.stopped = false; 
               checkpoint.station == max && current == max ? ( Finish(checkpoint.station, true) ) : ( Next(checkpoint.station) );
            }, 10000)
            mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 2, Station ' + checkpoint.station)
         }
      }

      if (finishing && checkpoint.finish) { 
         checkpoint.finish.destroy();
         checkpoint.destroy();
         mp.events.callRemote('server:player.transit.stop', true, max, distance);

         distance = 0, route = [], max = 0;
      }
   },

   'playerExitCheckpoint': (checkpoint) => {
      if (player.Job == 3 && player.vehicle && player.vehicle.getClass() == 17 && checkpoint.station >= 0) { 
         if (player.stopped) { 
            wrong = true;
            player.stopped = false;
         }
      }
   }
})


   // 'playerLeaveVehicle': (vehicle, seat) => {
   //    if (player.Job == 3 && checkpoint.station) { 
   //       if (browser && station >= 0 && station != false && mp.browsers.at(browser.id)) { 
   //          browser.execute('transit.toggle = false'); 
   //          cancel = setTimeout(() => { end(false); }, (5 * 60) * 1000)
   //       }
   //    }
   // },

   // 'playerEnterVehicle': (vehicle, seat) => {
   //    if (player.Job == 3 && checkpoint.station) { 
   //       if (vehicle.getClass() == 17) { 
   //          browser.execute('transit.toggle = true'); 
   //          clearTimeout(cancel)
   //       }
   //    }
   // }

function Next (i) { 
   if (i == current) { 
      let station = route.find( ({ id }) => id === i );
      current ++;
      let next = route.find( ({ id }) => id === current );

      next.visible();

      Distance(station.position, next.position).then((dist) => { 
         station.delete();
         distance += dist;
         mp.gui.chat.push('[DEBUG] Next Station ' + current + ', Distance now ' + distance);
         if (wrong) { 
            browser.execute(`transit.wrong(${i})`)
         } else { 
            browser.execute(`transit.disable(${i})`)
         }
         wrong = false;
      })

   } else { 
      mp.gui.chat.push('[DEBUG] Wrong Station')
   }
}

async function Distance (station, next) {
   return new mp.Vector3(station.x, station.y, station.z).subtract(new mp.Vector3(next.x, next.y, next.z)).length();
}

function Finish (i) { 
   let station = route.find( ({ id }) => id === i );
   station.delete();
   if (mp.browsers.at(browser.id)) browser.destroy();

   let checkpoint = mp.checkpoints.new(47, garage, 5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
   let blip = mp.blips.new(1, new mp.Vector3(garage.x, garage.y, 0), { name: 'Los Santos Transit Garaža', color: 5, shortRange: false });
   checkpoint.finish = blip;

   finishing = true;
}


/***/ }),

/***/ 5626:
/***/ (() => {



const Player = mp.players.local;


let camdir = false,
   noclip = false,
   charpos = false,
   Spectating = false,
   SpecTarget = null,
   Waypoint = null;


mp.events.add({
   'client:player.administrator:fly': () => { 
      noclip = !noclip;
      Player.setInvincible(noclip);
      Player.freezePosition(false);
      Player.setVisible(!noclip, !noclip);
      Player.setCollision(!noclip, !noclip);
      Player.setHasGravity(!noclip);
      noclip ? Player.setMaxSpeed(0.0001) : Player.setMaxSpeed(10)
   },

   'playerCreateWaypoint': (position) => {
      Waypoint = { x: position.x, y: position.y, z: position.z };
   },

   'playerRemoveWaypoint': () => { 
      Waypoint = null;
   },

   'client:spectate': (target, toggle) => {
      localplayer.freezePosition(toggle);
      if(toggle) {
         if (target && mp.players.exists(target)) {
            SpecTarget = target;
            Spectating = true;
            Player.attachTo(target.handle,  -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
         } else { mp.events.call("client:spectate", -1, false); }
      } else {
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
         mp.game.graphics.drawText(`X:${pos.x}    Y:${pos.y}    Z:${pos.z}`, [0.5, 0.005],
         {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [1.0, 1.0],
            outline: true,
         });
      }
      if (camdir) {
         const dir = getCameraDirection();
         mp.game.graphics.drawText(`X:${dir.x}    Y:${dir.y}    Z:${dir.z}`, [0.5, 0.05],
         {
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
})

function getCameraDirection () {
   const heading = mp.game.cam.getGameplayCamRelativeHeading() + Player.getHeading();
   const pitch = mp.game.cam.getGameplayCamRot(0).x;
   let x = -Math.sin(heading * Math.PI / 180.0);
   let y = Math.cos(heading * Math.PI / 180.0);
   let z = Math.sin(pitch * Math.PI / 180.0);
   let len = Math.sqrt(x *x+y*y+z*z);
   if (len != 0) { x = x / len; y = y / len; z = z / len; }
   return new mp.Vector3(x, y, z);
};

/***/ }),

/***/ 7373:
/***/ (() => {



const Player = mp.players.local;

const bones = {
   'RIGHT_HAND': 6286,
   'LEFT_HAND': 36029
}

mp.events.addDataHandler({
   'Attachments': (entity, value) => {
       if (entity.type === 'player') Attach(entity, value);
   }
});

mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'player') { 
         if (entity.getVariable('Attachments')) {
            let attachments = entity.getVariable('Attachments');
            attachments.forEach((attachment) => { 
               Attach (entity, attachment);
            })
         }
      }
   }
});


function Attach (entity, attachment) { 
   let boneIndex = entity.getBoneIndex(bones[attachment.bone]);
   mp.gui.chat.push('Model ' + JSON.stringify(attachment.model));
   mp.gui.chat.push('Bone ' + JSON.stringify(attachment.bone));
   mp.gui.chat.push('Bone Index ' + JSON.stringify(boneIndex));

   mp.gui.chat.push(JSON.stringify(attachment));
}



/***/ }),

/***/ 4687:
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

/***/ 3886:
/***/ (() => {



const player = mp.players.local;
let browser = null, opened = false, bank = null;

const banks = { 
   506770882: 'fleeca', 3424098598: 'fleeca',
   3168729781: 'maze', 2930269768: 'maze'
}

mp.events.add({
   'client:player.banking': async () => { 
      if (opened) { 
         browser.destroy();
         opened = false;
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
      } else { 
         let account = await mp.events.callRemoteProc('server:player.banking');
         account = JSON.parse(account)
         browser = mp.browsers.new('package://player/banking-interface/atm.html');
         browser.execute(`atm.bank = \"${banks[bank]}\", atm.player.money = ${player.money}, atm.player.balance = ${account.balance}, atm.player.name = \"${player.name}\";`);
         browser.execute(`atm.player.paycheck = ${account.paycheck}, atm.player.savings = ${account.savings};`)
         browser.execute(`atm.player.pin = ${account.pin}, atm.player.number = \"${account.number}\";`)
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      }
   },

   'client:player.banking.withdraw': (bank, value) => { mp.events.callRemote('server:player.banking.withdraw', bank, value); },

   'client:player.banking.deposit': (bank, value) => { mp.events.callRemote('server:player.banking.deposit', bank, value); },

   'client:player.banking.payday': (bank, value) => { mp.events.callRemote('server:player.banking.payday', bank, value); },

   'client:player.banking.transfer': async (bank, target, value) => { 
      let transfer = await mp.events.callRemoteProc('server:player.banking.transfer', bank, target, value);
      transfer == true ? browser.execute(`atm.notify('Transakcija uspešna !')`) : browser.execute(`atm.notify('Transakcija nije uspešna, korisnik nije pronadjen !')`) 
   } 
})


mp.keys.bind(0x59, false, function() {
   if (player.logged && player.spawned) { 
      if (player.vehicle || player.cuffed || mp.players.local.isTypingInTextChat) return;
      if (isNearBank()) { mp.events.call('client:player.banking') }
   }
});

function isNearBank () { 
   let atm_1 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3424098598, false, true, true);
   let atm_2 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3168729781, false, true, true);
   let atm_3 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 2930269768, false, true, true);
   let atm_4 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 506770882, false, true, true);
   if (atm_1) { bank = 3424098598; return true; }
   else if (atm_2) { bank = 3168729781; return true; } 
   else if (atm_3) { bank = 2930269768; return true; } 
   else if (atm_4) { bank = 506770882; return true; }
   else { return false; }
}

/***/ }),

/***/ 1877:
/***/ (() => {

class CarryPlayer {
   constructor(remoteId, carryRemoteId) {
       this.remoteId = remoteId;
       this.carryRemoteId = carryRemoteId;
   }
}

class CarryManager {

   carryPlayers = [];

   constructor() {

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

       mp.events.add('entityStreamIn', (entity) => {

           if (entity.type != "player")
               return false;

           var value = entity.getVariable("carry");

           if (value != undefined) {

               var carry = this.getCarry(value);

               if (!carry)
                   this.addCarry(entity.remoteId, value);
           }

       });

       mp.events.add('client:animation.apply', (remoteId, name, dictionary, flag) => { 
         var Player = mp.players.atRemoteId(remoteId);
         if (Player != null) {
            //Player.playAnim(name, dictionary, 1, flag)
            Player.taskPlayAnim(dictionary, name, 8.0, 1.0, -1, flag, 0.0, true, true, true);
         }
     });

       

       mp.events.add('entityStreamOut', (entity) => {

           if (entity.type != "player")
               return false;

           var value = entity.getVariable("carry");

           if (value != undefined) {

               var carry = this.getCarry(entity.remoteId);

               if (carry)
                   this.removeCarry(entity.remoteId);
           }

       });

       mp.game.streaming.requestAnimDict('missfinale_c2mcs_1');
       mp.game.streaming.requestAnimDict('nm');

       setInterval(() => {

           this.carryPlayers.forEach((element) => {

               mp.players.forEachInStreamRange((target) => {

                   if (target.remoteId == element.carryRemoteId) {

                       if (mp.peds.exists(element.ped))
                           return false;

                       var player = mp.players.atRemoteId(element.remoteId);
                       var carried = mp.players.atRemoteId(element.carryRemoteId);

                       mp.events.call("client:animation.apply", player.remoteId, "missfinale_c2mcs_1", "fin_c2_mcs_1_camman", 49);
                       mp.events.call("client:animation.apply", carried.remoteId, "nm", "firemans_carry", 33);
                       carried.attachTo(player.handle, 0, 0.15, 0.27, 0.63, 0.5, 0.5, 0.0, false, false, false, false, 2, false);

                       element.ped = mp.peds.new(carried.model, player.position, 0);
                       mp.game.invoke('0xE952D6431689AD9A', carried.handle, element.ped.handle);
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

/***/ 3045:
/***/ (() => {


const Player = mp.players.local;

Player.Attachment = null;

mp.nametags.enabled = false;

const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);

let AntiKeySpam = false;

const Controls = { 
   keyX: 0x58,
   keyL: 0x4C,
   keyY: 0x59
};


// BLACK SCREEN AFTER DEATH
mp.game.gameplay.setFadeOutAfterDeath(false); 


// DONT REMOVE WEAPON WHEN OUT OF AMMO
mp.game.weapon.unequipEmptyWeapons = false;
Player.setCanSwitchWeapon(false);


mp.events.addDataHandler({
   'logged': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.logged = newValue;
      }
   },

   'spawned': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.spawned = newValue;
      }
   },

   'Money': (entity, newCash, oldCash) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Money = newCash;
      }
   },

   'Job': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Job = newValue;
      }
   },

   'Wounded': (Entity, newValue, oldValue) => {
      if (Entity.type == 'player') {
         Entity.Wounded = newValue;
      }
   },

   'Seatbelt': (entity, newValue, oldValue) => { 
      if (entity && entity.remoteId === Player.remoteId) { 
         Player.Seatbelt = newValue;
      }
   },
   
   'Ragdoll': (entity, newValue, oldValue) => { 
      if (entity.type == 'player' && newValue != oldValue) { 
         Interactions.Ragdoll(entity, newValue);
      }
   },

   'Bubble': (entity, newValue, oldValue) => {
      if (entity.type == 'player' && newValue != oldValue) {
         Player.Bubble = newValue;
      }
   },

   'Walking_Style': (Entity, Value, oldValue) => {
      if (Entity.type == 'player') {
         Interactions.WalkingStyle(Entity, Value);
      }
   },

   'Mood': (Entity, Value, oldValue) => {
      if (Entity.type == 'player') {
         Interactions.FacialMood(Entity, Value);
      }
   },

   'Attachment': (entity, valueNew, valueOld) => {
      if (valueNew !== valueOld) { 
         if (valueNew) { 
            Attachments.Add(entity, valueNew);
         } else { 
            Attachments.Remove(entity);
         }
      }
   }
});



mp.events.add({

   'entityStreamIn': (Entity) => { 
      if (Entity.Attachment) { Attachments.StreamIn(Entity, Entity.getVariable('Attachment')); }
      if (Entity.type == 'player' && Entity.hasVariable('Walking_Style')) Interactions.WalkingStyle(Entity, Entity.getVariable('Walking_Style'));
      if (Entity.type == 'player' && Entity.hasVariable('Ragdoll')) Interactions.Ragdoll(Entity, Entity.getVariable('Ragdoll'));
      if (Entity.type == 'player' && Entity.hasVariable('Wounded')) Interactions.Ragdoll(Entity, Entity.getVariable('Wounded')); 
   },

   'render': () => { 
      if (Player.logged && Player.spawned) { 
         mp.players.forEach((Target) => { 

            const TargetPosition = Target.position;
            const PlayerPosition = Player.position;

            const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(TargetPosition.x, TargetPosition.y, TargetPosition.z)).length();
            
            if (Distance < 8 && Player.id != Target.id && Player.hasClearLosTo(Target.handle, 17)) {
               if (Target.getAlpha() != 0) { 
                  
                  const Index = Target.getBoneIndex(12844)
                  const NameTag = Target.getWorldPositionOfBone(Index);

                  const Position = mp.game.graphics.world3dToScreen2d(new mp.Vector3(NameTag.x, NameTag.y, NameTag.z + 0.4));

                  if (Position) { 
                     let x = Position.x;
                     let y = Position.y;

                     let scale = (Distance / 25);
                     if (scale < 0.6) scale = 0.6;
                     
                     y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');

                     if (Target.hasVariable('Bubble') && Target.getVariable('Bubble')) { 
                        const BubblePosition = mp.game.graphics.world3dToScreen2d(new mp.Vector3(NameTag.x, NameTag.y, NameTag.z + 0.6));
                        if (BubblePosition) { 
                           const Bubble = Target.getVariable('Bubble');
                           mp.game.graphics.drawText('* ' + Target.name + ' ' + Bubble.Content + '.', [BubblePosition.x, BubblePosition.y], {
                              font: 4,
                              color: Bubble.Color,
                              scale: [0.325, 0.325],
                              outline: false
                           });
                        }
                     }

                     if (Target.hasVariable('Wounded') && Target.getVariable('Wounded')) {
                        const WoundedPosition = mp.game.graphics.world3dToScreen2d(new mp.Vector3(NameTag.x, NameTag.y, NameTag.z + 0.75));
                        if (WoundedPosition) { 
                           const Wound = Target.getVariable('Wounded');
                           mp.game.graphics.drawText('(( ' + Wound.Text + ' ))', [WoundedPosition.x, WoundedPosition.y], {
                              font: 4,
                              color: Wound.Color,
                              scale: [0.315, 0.315],
                              outline: false
                           });
                        }
                     }

                     const Content = Target.name + ' [' + Target.remoteId + ']';
   
                     mp.game.graphics.drawText(Content, [x, y], {
                        font: 4,
                        color: [255, 255, 255, 255],
                        scale: [0.325, 0.325],
                        outline: false
                     });
                  }

               }
            }

         });

      }
   },

   'entityModelChange': (entity, oldModel) => { 
   },

   'entityStreamOut': (entity) => { 
      if (entity.Attachment) { 
         Attachments.StreamOut(entity);
      }
   },

   'client:player:freeze': (toggle) => {
      Player.freezePosition(toggle);
   },

   'client:player:rotate': (value) => {
      Player.setHeading(value);
   },

   'client:request:ipl': (ipl) => { 
      mp.game.streaming.requestIpl(ipl);
   }
});


// INTERACTIONS :: REMOVE ATTACHMENT
mp.keys.bind(Controls.keyX, false, async function () {
   if (Player.logged && Player.spawned) { 
      if (Player.isTypingInTextChat) return;
      if (Player.getVariable('Attachment') != null) {
         const response = await mp.events.callRemoteProc('server:character.attachment:remove');
         Player.Attachment = response;
      }
   }
});



// INTERACTIONS :: LOCK
mp.keys.bind(Controls.keyL, false, async function () {
   if (Player.logged && Player.spawned && Player.isTypingInTextChat == false) { 
     if (AntiKeySpam) return;

      mp.events.callRemote('server:interactions:lock');

      AntiKeySpam = true;
      setTimeout(() => { AntiKeySpam = false; }, 4000);
   }
});


mp.keys.bind(Controls.keyY, false, () => {
   if (!Player.logged || !Player.spawned || Player.isTypingInTextChat || Player.Cuffed) return;
   if (AntiKeySpam) return;

   if (Player.vehicle) { 

      mp.events.callRemote('server:vehicle:windows', Player.vehicle);


      AntiKeySpam = true;
      setTimeout(() => { AntiKeySpam = false; }, 2000);

   } else { 
      let Vehicle = null;

      mp.vehicles.forEachInRange(Player.position, 4.5, (NearbyVehicle) => { 
         Vehicle = NearbyVehicle;
      });
   
      if (Vehicle) { 
   
         const Bones = { 'boot': -1.35, 'bonnet': 2.0 };
   
         const Position = Player.position;
         
         for (const Bone in Bones) { 
            const Offset = Bones[Bone];
   
            const {x, y, z} = Vehicle.getWorldPositionOfBone(Vehicle.getBoneIndexByName(Bone));
      
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

   StreamIn: function (entity, attachment) { 
      if (attachment) { 
         Attachments.Add(entity, attachment);
      }
   },

   StreamOut: function (entity) { 
      Attachments.Remove(entity);
   },

   Add: function (entity, value) { 

      entity.Attachment = mp.objects.new(mp.game.joaat(value.Model), entity.position, {
         rotation: entity.rotation,
         alpha: 255,
         dimension: entity.dimension
      });

      utils.WaitEntity(entity.Attachment).then(() => {
         const Bone = entity.getBoneIndex(value.Bone);
         entity.Attachment.attachTo(entity.handle, Bone, value.Offset.X, value.Offset.Y, value.Offset.Z, value.Offset.rX, value.Offset.rY, value.Offset.rZ, true, true, false, false, 0, value.Rotation || false);
      })

   },

   Remove: function (entity) { 
      let Object = entity.Attachment;
      if (Object && mp.objects.exists(Object)) { 
         Object.destroy();
      }
   }
};


const Interactions = { 
   WalkingStyle: async function (Entity, Style) {
      if (Style == null) { 
         Entity.resetMovementClipset(0.0);
      } else { 
         utils.LoadMovementClipset(Style).then(() => {
            Entity.setMovementClipset(Style, 1.0);
         })
      }
   },

   Ragdoll: function (Entity, Value) {
      if (Value) { 
         mp.gui.chat.push(JSON.stringify(Value))
         Entity.setToRagdoll(Value.Time || 5000, Value.Time || 5000, 0, true, true, true);
      }
   },

   FacialMood: function (Entity, Mood) { 
      Mood == 'normal' ? Entity.clearFacialIdleAnimOverride() : mp.game.invoke('0xFFC24B988B938B38', Entity.handle, Mood, 0);
   }
}




/***/ }),

/***/ 4534:
/***/ (() => {



const Player = mp.players.local;
let browser = null, opened = false;


const Creator = { 
   Position: new mp.Vector3(-612.7821044921875, 611.093261718175, 149.5516967734375),
   Heading: 20.0,
}

const Genders = [ mp.game.joaat('mp_m_freemode_01'), mp.game.joaat('mp_f_freemode_01') ];

let Hair = [0, 0, 0];

mp.events.add({
   'client:player.character.creator:show': async () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/game-interface/creator.html');
         Player.position = Creator.Position;
         Player.setHeading(Creator.Heading);
         Player.BrowserControls(true, true);
         Player.freezePosition(true);
         mp.game.ui.displayRadar(false);
         utils.PlayerPreviewCamera(true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
         Player.freezePosition(false);
         mp.game.ui.displayRadar(true);
         utils.PlayerPreviewCamera(false);
      }
   },

   'render': () => { 
      if (opened && browser) { 
         mp.game.controls.disableControlAction(0, 30, true);
         mp.game.controls.disableControlAction(0, 31, true);
         mp.game.controls.disableControlAction(0, 32, true);
         mp.game.controls.disableControlAction(0, 33, true);
         mp.game.controls.disableControlAction(0, 34, true);
         mp.game.controls.disableControlAction(0, 35, true);

      }
   },

   'client:player.character.creator:finish': async (character) => { 
      const response = await mp.events.callRemoteProc('server:player.character:create', character);
      if (response) { 
         mp.game.cam.doScreenFadeOut(4000);
         browser.execute('creator.AnimateButton()');
         setTimeout(() => { 
            mp.events.call('client:player.character.creator:show');
            mp.game.cam.doScreenFadeIn(2000);
            mp.events.callRemote('server:player.character:select', response);
         }, 5000);
      } else { 
         browser.execute('Karakter već postoji ! Odaberite drugo ime.')
      }
   },

   'client:player.character.creator:gender': (x) => { 
      Player.model = Genders[x];
   },

   'client:player.character.creator:eyes': (eyeColor) => { 
      Player.setEyeColor(eyeColor);
   } ,

   'client:player.character.creator:hair': (i, x) => { 
      Hair[i] = parseInt(x);
      switch (i) { 
         case 0: { if (x == 23 || x == 24) return; Player.setComponentVariation(2, parseInt(x), 0, 0); break; }
         case 1: { Player.setHairColor(parseInt(x), parseInt(Hair[2])); break; }
         case 2: { Player.setHairColor(parseInt(Hair[1]), parseInt(x)); break; }
      }
   },

   'client:player.character.creator:beard': (x) => { 
      x = JSON.parse(x);
      Player.setHeadOverlay(1, parseInt(x[0]), 1.0, parseInt(x[1]), 0);
   },

   'client:player.character.creator:face': (i, x) => { 
      Player.setFaceFeature(i, parseFloat(x)); 
   },

   'client:player.character.creator:overlay': (i, e, x) => { 
      Player.setHeadOverlay(parseInt(i), parseInt(e), 1.0, parseInt(x), 0);
   },

   'client:player.character.creator:blend': (x) => { 
      x = JSON.parse(x);
      Player.setHeadBlendData(parseInt(x[0]), parseInt(x[1]), 0, parseInt(x[2]), parseInt(x[3]), 0, parseFloat(x[4]), parseFloat(x[5]), 0, true);
   },

   'client:player.character.creator:clothing': (i, d) => { 
      Player.setComponentVariation(i, d, 0, 2);
   }
})



/***/ }),

/***/ 6573:
/***/ (() => {



const Player = mp.players.local;


let SendToServer = true;


mp.events.add({

   'outgoingDamage': (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
      // if (targetEntity.type === 'player') {
      //    if (targetEntity.getHealth() - damage < damage) { 
      //       mp.events.callRemoteProc('server:character.wounded', mp.players.at(targetEntity.id)).then((Response) => { 
      //          mp.gui.chat.push(JSON.stringify(Response));
      //          return true;
      //       });
      //    }
      // }
   },

   'incomingDamage': (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
      if (targetEntity.id == Player.id) { 
         
         if (Player.getVariable('Wounded')) {
            mp.gui.chat.push('wounded');

         } else { 
            let Injury = { Weapon: weapon, Bone: boneIndex };
   
            Damage.Effect(boneIndex);

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


const Damage = { 
   Check: function () { 
      if (Player.logged && Player.spawned) { 
         const Injuries = Player.getVariable('Injuries');
         if (Injuries.length > 0 && Player.getSpeed() > 5) { 
            if (Injuries.find(Element => Element.Bone == 4 || Element.Bone == 2)) {
               if (SendToServer) mp.events.callRemote('server:character.wounded:fall');
            }
         }
      }
   
      setTimeout(() => { Damage.Check(); }, 1000);
   },

   Effect: function (Bone) { 

      switch (Bone) { 
         case 20: { 
            mp.game.graphics.startScreenEffect('DefaultFlash', 1500, false);
            break;
         }

         default: {

         }
      }

   }
};

Damage.Check();





/***/ }),

/***/ 9133:
/***/ (() => {



const Player = mp.players.local;

let browser = null, opened = false;

mp.events.add({
   'client:help:show': (help) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/game-interface/help.html');
         const response = 
         Player.BrowserControls(true, true);
         
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   }
})

/***/ }),

/***/ 872:
/***/ (() => {


const player = mp.players.local;
let onlinePlayers = mp.players.length;
let playerHUD = mp.browsers.new('package://player/hud-interface/hud.html'), isDriving = false;


let screenshotBrowser = false, photoName = null,
	ScreenShotTimer = false;


mp.events.add({
	'client:hud.show': (show) => {
		if (show)  {
			playerHUD.execute(`hud.toggle = true;`); 
			setInterval(() => { updatePlayerHud(); }, 1000);
		}
		else { 
			playerHUD.execute(`hud.toggle = false;`); 
		}
	},

	'client:player.notification:show': (message, type, time) => {
		playerHUD.execute(`hud.notification(\"${message}\", \"${type}\", \"${time}\");`);
	}
})


updatePlayerHud = () => { 
	let street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0),
		zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z)),
		streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName),
		heading = getPlayerHeading();
	playerHUD.execute(
		`hud.location.street = \"${streetName}\", hud.location.zone = \"${zoneName}\", 
		hud.location.heading = \"${heading}\", hud.money = \"${player.money}\",
		hud.onlinePlayers =  \"${onlinePlayers}\", hud.id = \"${player.remoteId}\";`
	); 
}

mp.keys.bind(0x77, true, function () {  //F8-Key
	var date = new Date();
	photoName = "focusrp-" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + "-" + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds() + ".png";
	mp.gui.takeScreenshot(`${photoName}`, 1, 10, 0);
	if (!ScreenShotTimer) { 
		mp.events.call("client:screenshot.taken");
		ScreenShotTimer = true;
		setTimeout(() => { ScreenShotTimer = false; }, 6000);
	}
});

getPlayerHeading = () => { 
	let heading = player.getHeading(), headingString;
	if (heading >= 0 && heading <= 30) { headingString = "N"; }
	else if (heading >= 30 && heading <= 90) { headingString = "NW"; }
	else if (heading >= 90 && heading <= 135) { headingString = "W"; }
	else if (heading >= 135 && heading <= 180) { headingString = "SW"; }
	else if (heading >= 180 && heading <= 225) { headingString = "S"; }
	else if (heading >= 225 && heading <= 270) { headingString = "SE"; }
	else if (heading >= 270 && heading <= 315) { headingString = "E" ; }
	else if (heading >= 315 && heading <= 360) { headingString = "NE"; }
	return headingString;
}

mp.events.add({
	'render': () => { // hiding default GTA Hud
		mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
		mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
		mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
		mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
		mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
		mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
		mp.game.ui.hideHudComponentThisFrame(14); // CROSSHAIR
		mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
		mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS

	
		mp.game.invoke('0x9E4CFFF989258472');
		mp.game.invoke('0xF4F2C0D4EE209E20');

		// disable tab weapon wheel // ENABLE LATER
		// mp.game.controls.disableControlAction(32, 37, true); 


		// show Crosshair if player is aiming with AWP
		let playerWeapon = player.weapon;
		if (playerWeapon == '0x05FC3C11' || playerWeapon == '0x0C472FE2' || playerWeapon == '0xA914799' || playerWeapon == '0xC734385A' || playerWeapon == '0x6A6C02E0') {
			mp.game.ui.showHudComponentThisFrame(14);
		}
	

      // FINISH
		// if (playerWeapon != mp.game.joaat('weapon_unarmed')) { 
		// 	if (player.weapon == 0 || player.isActiveInScenario()) return;
		// 	let ammoCount = getAmmoCount(playerWeapon);
		// 	let weapon = getWeaponString();
		// 	playerHUD.execute(`hud.weapon.have = true, hud.weapon.ammo = ${ammoCount}, hud.weapon.hash = \"${weapon}\";`); 
		// } else if (playerWeapon == mp.game.joaat('weapon_unarmed')) { 
		// 	playerHUD.execute(`hud.weapon.have = false;`);
		// }

		// update veh speed if driver
		if (player.vehicle && isDriving) { vehicle() }

	},

	'client:hud.vehicle': (toggle) => { 
		playerHUD.execute(`hud.vehicle.driving = ${toggle};`); 
		isDriving = toggle;
	},

	'client:hud.black_screen': () => { 
		playerHUD.execute(`hud.black_screen = !hud.black_screen;`); 
	},

	'client:screenshot.taken': () => {
		screenshotBrowser = mp.browsers.new("package://player/hud-interface/screen.html");
	},

	'browserDomReady': (browser) => {
		if(browser != screenshotBrowser) return;
		screenshotBrowser.call("client:screenshot.receive", `http://screenshots/${photoName}`);
  },

  'client:screenshot.send.to.server': (base64) => {
		let street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);
		let zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z));
		let streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName);
		mp.events.callRemote('server:disord.screenshot:send', base64, zoneName, streetName);
		setTimeout(() => {
			screenshotBrowser.destroy();
			screenshotBrowser = false;
		}, 6500);
	},

})

vehicle = () => { 
	let vehicle = player.vehicle;
	let vehicleSpeed = vehicle.getSpeed();
	let lights = vehicle.getLightsState(1, 1);
	let lightsStatus = 0;
	vehicleSpeed = vehicleSpeed * 3.6;


	playerHUD.execute(`hud.vehicle.speed = ${vehicleSpeed}, hud.vehicle.lights = ${lightsStatus};`); 
}



function getAmmoInClip (weaponHash){
	if (hasWeapon(weaponHash)){
		let clipCount = mp.game.invoke("0xA38DCFFCEA8962FA", mp.players.local.handle, parseInt(weaponHash) >> 0, 0)
		if (clipCount > 360) clipCount = null 
		return clipCount
	}
	return 0
}

// Modifying default GTA escape menu

mp.game.gxt.set('PM_PAUSE_HDR', 'Focus Roleplay'); 
mp.game.gxt.set('PM_CASH', '$~500000~'); // Pare







/***/ }),

/***/ 1189:
/***/ (() => {



const player = mp.players.local;


mp.events.add({
	'entityStreamIn' : (entity) =>  {
		 if(entity.type == 'player')
		 {
			if (entity.hasVariable("animData")) {
			  const value = entity.getVariable("animData");
			  if (null != value) {
					const anim = value.split("%");
					loadAnimDict(anim[0], function() {
						 mp.players.exists(entity) && 0 !== entity.handle && entity.taskPlayAnim(anim[0], anim[1], 1, 0, -1, parseInt(anim[2]), 1, !1, !1, !1)
					})
			  }
			}          
		 }
	},
});


mp.events.addDataHandler("animData", function(a, b) {
	if (0 !== a.handle)
		 if (null != b) {
			  const c = b.split("%");
			  loadAnimDict(c[0], function() {
					mp.players.exists(a) && 0 !== a.handle && (a.clearTasksImmediately(), a.taskPlayAnim(c[0], c[1], 1, 0, -1, parseInt(c[2]), 1, !1, !1, !1))
			  })
		 } //else a.clearTasksImmediately()
});

mp.keys.bind(0x20, true, function() {
	if (player.logged && player.spawned) { 
		if (entity.hasVariable("animData")) {
			const value = entity.getVariable("animData");
			if (null != value) {
				const anim = value.split("%");
				let playing = player.isPlayingAnim(anim[0], anim[1]);
				if (playing) { 
					player.stopAnimTask(anim[0], anim[1], 3.0);
				}
			}
		}
	}
});

/***/ }),

/***/ 8201:
/***/ (() => {

const movementClipSet = 'move_ped_crouched';
const strafeClipSet = 'move_ped_crouched_strafing';
const clipSetSwitchTime = 0.25;
const localPlayer = mp.players.local;

const loadClipSet = (clipSetName) => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) mp.game.wait(0);
};

loadClipSet(movementClipSet);
loadClipSet(strafeClipSet);

mp.events.addDataHandler('crouching', (entity, value) => {
    if (entity.type === 'player') {
        if (value) {
            entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
            entity.setStrafeClipset(strafeClipSet);

        } else {
            entity.resetMovementClipset(clipSetSwitchTime);
            entity.resetStrafeClipset();
        }
    }
});

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'player' && entity.crouching) {
        entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
        entity.setStrafeClipset(strafeClipSet);
    }
});


mp.keys.bind(0x12, false, () => {
    if (player.logged && player.spawned) { 
        mp.events.callRemote('server:player.crouch');
    }
});

/***/ }),

/***/ 5531:
/***/ (() => {

  //Fingerpointing
  let pointing = {
   active: false,
   interval: null,
   lastSent: 0,
   start: function() {
       if (!this.active) {

            if (mp.players.local.cuffed) return; 
            
            this.active = true;

            mp.game.streaming.requestAnimDict("anim@mp_point");

            while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
                mp.game.wait(0);
            }
            mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 0, 1, 1, 1);
            mp.players.local.setConfigFlag(36, true)
            mp.players.local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
            mp.game.streaming.removeAnimDict("anim@mp_point");

            this.interval = setInterval(this.process.bind(this), 0);
       }
   },

   stop: function() {
       if (this.active) {
           clearInterval(this.interval);
           this.interval = null;

           this.active = false;



           mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop");

           if (!mp.players.local.isInjured()) {
               mp.players.local.clearSecondaryTask();
           }
           if (!mp.players.local.isInAnyVehicle(true)) {
               mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 1, 1, 1, 1);
           }
           mp.players.local.setConfigFlag(36, false);
           mp.players.local.clearSecondaryTask();

           setTimeout(() => {
               mp.events.callRemote('server:player.finger.pointing.stop');

           }, 2000);
       }
   },

   gameplayCam: mp.cameras.new("gameplay"),
   lastSync: 0,

   getRelativePitch: function() {
       let camRot = this.gameplayCam.getRot(2);

       return camRot.x - mp.players.local.getPitch();
   },

   process: function() {
       if (this.active) {
           mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle);

           let camPitch = this.getRelativePitch();

           if (camPitch < -70.0) {
               camPitch = -70.0;
           } else if (camPitch > 42.0) {
               camPitch = 42.0;
           }
           camPitch = (camPitch + 70.0) / 112.0;

           let camHeading = mp.game.cam.getGameplayCamRelativeHeading();

           let cosCamHeading = mp.game.system.cos(camHeading);
           let sinCamHeading = mp.game.system.sin(camHeading);

           if (camHeading < -180.0) {
               camHeading = -180.0;
           } else if (camHeading > 180.0) {
               camHeading = 180.0;
           }
           camHeading = (camHeading + 180.0) / 360.0;

           let coords = mp.players.local.getOffsetFromGivenWorldCoords((cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);
           let blocked = (typeof mp.raycasting.testPointToPoint([coords.x, coords.y, coords.z - 0.2], [coords.x, coords.y, coords.z + 0.2], mp.players.local.handle, 7) !== 'undefined');

           mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Pitch", camPitch)
           mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Heading", camHeading * -1.0 + 1.0)
           mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isBlocked", blocked)
           mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isFirstPerson", mp.game.invoke('0xee778f8c7e1142e2', mp.game.invoke('0x19cafa3c87f7c2ff')) == 4)

           if ((Date.now() - this.lastSent) > 100) {
               this.lastSent = Date.now();
               mp.events.callRemote('server:player.finger.pointing.update', camPitch, camHeading);
           }
       }
   }
}

mp.events.add("client:finger.pointing.update", (id, camPitch, camHeading) => {
   let netPlayer = getPlayerByRemoteId(parseInt(id));
   if (netPlayer != null) {
       if (netPlayer != mp.players.local && mp.players.exists(netPlayer)) {
           netPlayer.lastReceivedPointing = Date.now();

           if (!netPlayer.pointingInterval) {
               netPlayer.pointingInterval = setInterval((function() {
                   if ((Date.now() - netPlayer.lastReceivedPointing) > 1000) {
                       clearInterval(netPlayer.pointingInterval);

                       netPlayer.lastReceivedPointing = undefined;
                       netPlayer.pointingInterval = undefined;

                       mp.game.invoke("0xd01015c7316ae176", netPlayer.handle, "Stop");


                       if (!netPlayer.isInAnyVehicle(true)) {
                           mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 1, 1, 1, 1);
                       }
                       netPlayer.setConfigFlag(36, false);

                   }
               }).bind(netPlayer), 500);

               mp.game.streaming.requestAnimDict("anim@mp_point");

               while (!mp.game.streaming.hasAnimDictLoaded("anim@mp_point")) {
                   mp.game.wait(0);
               }



               mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 0, 1, 1, 1);
               netPlayer.setConfigFlag(36, true)
               netPlayer.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
               mp.game.streaming.removeAnimDict("anim@mp_point");
           }

           mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Pitch", camPitch)
           mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Heading", camHeading * -1.0 + 1.0)
           mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isBlocked", 0);
           mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isFirstPerson", 0);
       }
   }
});

mp.keys.bind(0x42, true, () => {
   if (mp.gui.cursor.visible || mp.chatActive || mp.consoleActive || mp.players.local.vehicle) return;
   pointing.start();

});

mp.keys.bind(0x42, false, () => {
   pointing.stop();
});

function getPlayerByRemoteId (remoteId) {
   let pla = mp.players.atRemoteId(remoteId);
   if (pla == undefined || pla == null) {
      return null;
   }
   return pla;
}

/***/ }),

/***/ 1917:
/***/ (() => {



const player = mp.players.local;
let interactionMenu, opened = false;


 

mp.events.addDataHandler({

    'ragdoll': (entity, newValue, oldValue) => { 
        if (entity.type === 'player') { 
            if (newValue != oldValue) { 
                ragdoll(entity, newValue);
            }
        }
    }
});

mp.events.add({
    'entityStreamIn': (entity) => {
        if (entity.type === 'player') { 
            setMood(entity, entity.getVariable('Mood')); 
            setWalkingStyle(entity, entity.getVariable('Walking_Style'))
        }
    },

    'client:player.interactions.menu': (toggle) => { 
        if (toggle) { 
            interactionMenu = mp.browsers.new('package://player/Interactions/interactions-interface/interactions.html');
            interactionMenu.execute(`interactions.moods = ${JSON.stringify(moods)}`);
            opened = true;
            setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
        } else { 
            opened = false;
            setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
            interactionMenu.destroy();
            
        }
    },

    'client:player.mood': (mood) => { 
        mp.events.callRemote('server:player.mood', mood);
    },

    'client:player.scenario': Scenario,

    'client:player.walking_style': (style) => {
        mp.events.callRemote('server:player.walking_style', style);
        setMovementClipset(player, style);
     }
});


mp.keys.bind(0x4D, false, function() {
    if (mp.players.local.isTypingInTextChat) return;
    if (player.logged && player.spawned) { 
        if (opened) { 
            mp.events.call('client:player.interactions.menu', false);
        } else { 
            mp.events.call('client:player.interactions.menu', true);
        }
    }
});


function setWalkingStyle(entity, walkstyle) {
    try {
       if (walkstyle == null) entity.resetMovementClipset(0.0);
       else entity.setMovementClipset(walkstyle, 0.0);
    } catch (e) { }
}

function ragdoll (entity, status) { 
    if (status) { 
       entity.setToRagdoll(500, 500, 0, true, true, true); 
    } else { 
        entity.resetRagdollTimer();
    }
}

function Scenario (name, delay, enterAnim, time) { 
   player.taskStartScenarioInPlace(name, delay, enterAnim);
   if (time) setTimeout(() => { player.clearTasks(); }, time * 1000);
}
 


/***/ }),

/***/ 9158:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



//mp.gui.chat.show(false);

const Player = mp.players.local;

let browser = mp.browsers.new('package://player/game-interface/main.html');
//let Chat = mp.browsers.new('package://player/game-interface/chat.html');
//Chat.markAsChat();

let active = false, Timer = null;
let Radar = true;

let InterfaceStatus = 0;

__webpack_require__.g.GameInterface = browser;

mp.keys.bind(0x76, true, function() {
   if (Player.logged && Player.spawned) { 
      InterfaceStatus ++;
      if (InterfaceStatus > 2) InterfaceStatus = 0;
      switch (InterfaceStatus) { 
         case 0: {
            active = true;
            browser.execute('hud.toggle = true;');
            Chat.execute('chat.Toggle = true;');
            mp.game.ui.displayRadar(true);
            break;
         } 
         case 1: { 
            Chat.execute('chat.Toggle = false;'); 
            break;
         }
         case 2: { 
            active = false;
            browser.execute('hud.toggle = false;');
            mp.game.ui.displayRadar(false);
            break; 
         }
      }
   }
});

mp.events.add({
   'client:player.interface:toggle': () => { 
      active = !active;
      browser.execute('hud.toggle = !hud.toggle;');
      if (active) 
         Timer = setInterval(Update, 1000);
      else
         if (Timer) clearInterval(Timer);
   },

   'client:player.interface:notification': Notify,

   'client:player.interface:instructions': Instructions,

   'client:player.interface:black': () => { browser.execute('hud.black = !hud.black;'); },

   'render': () => { 
      HideDefault();

      if (Player.vehicle) Vehicle();

      // if (Player.weapon != mp.game.joaat('weapon_unarmed')) { 
      //    let Weapon = utils.weaponString(Player.weapon);
      //    let ammoCount = getAmmoCount(Player.weapon);
      //    browser.execute('hud.weapon.hash = \"' + Weapon + '\", hud.weapon.ammo = ')
      // } else if (Player.weapon == mp.game.joaat('weapon_unarmed')) { 
      //    browser.execute('hud.weapon.hash = null;')
      // }
   },

   'playerEnterVehicle': (vehicle, seat) => { 
      if (seat == -1) {
         if (browser) browser.execute('hud.Vehicle(true);')
      }
   },

   'playerLeaveVehicle': (vehicle, seat) => { 
      if (seat == -1) {
         if (browser) browser.execute('hud.Vehicle(false);')
      }
   },

   
	'client:clone.ped' : (toggle) => {
      mp.gui.chat.push('even pozvan')
		cloneLocalPedToScreen(toggle);
	}
		
});




function Update () { 
   if (browser) { 
      browser.execute('hud.players = ' + mp.players.length + ', hud.money = ' + Player.Money + ', hud.id = ' + Player.remoteId + ';');
      LocationUpdate();
   }
}


function getGear (i) { 
   let vehicle = Player.vehicle;

   if (i == 0 && !vehicle.isStopped()) return 'R';
   else if (i == 0) return 'N';
   else return i;
}


function Vehicle () { 
   let vehicle = Player.vehicle;
   let Speed = vehicle.getSpeed() * 3.6;
   let Gear = getGear(vehicle.gear).toString();
   let Lights = vehicle.getLightsState(1, 1);
   let Indicators = [vehicle.getVariable('IndicatorLeft'), vehicle.getVariable('IndicatorRight')];
   let EngineFailure = vehicle.getEngineHealth() < 300 ? true : false;
   // Mileage, Fuel...

   browser.execute('hud.Fuel(' + (100 - Speed) + ')');
   browser.execute('hud.vehicle.gear = \"' + Gear + '\";');
   browser.execute('hud.vehicle.indicators = ' + JSON.stringify(Indicators));
   browser.execute('hud.vehicle.engine_failure = ' + EngineFailure);
   browser.execute('hud.vehicle.lights = ' + JSON.stringify(Lights));
   browser.execute('hud.seatbelt = ' + Player.getVariable('Seatbelt'));
}

function Notify (message, type, time = 4) { 
   if (browser) browser.execute('hud.Notification(\"' + message + '\", \"' + type + '\", ' + time + ');')
}

function Instructions (content, time = 4) { 
   if (browser) browser.execute('hud.Instructions(\"' + content + '\", ' + time + ');')
}

function hasWeapon (weaponHash){
	return mp.game.invoke("0x8DECB02F88F428BC", mp.players.local.handle, parseInt(weaponHash) >> 0, 0)
}


function getAmmoCount (weaponHash){
	if (hasWeapon(weaponHash)){
		let ammoCount = mp.game.invoke("0x015A522136D7F951", mp.players.local.handle, parseInt(weaponHash) >> 0)
		if (ammoCount > 999) ammoCount = null
		return ammoCount
	}
	return 0
}


function getHeading () { 
   let H = Player.getHeading(), Heading;
   switch (true) {
      case (H < 30): Heading = 'N'; break;
      case (H < 90): Heading = 'NW'; break;
      case (H < 135): Heading = 'W'; break;
      case (H < 180): Heading = 'SW'; break;
      case (H < 225): Heading = 'S'; break;
      case (H < 270): Heading = 'SE'; break;
      case (H < 315): Heading = 'E'; break;
      case (H < 360): Heading = 'NE'; break;
      default: Heading = 'N'; break;
   }
   return Heading;
}


function LocationUpdate () { 
   const path = mp.game.pathfind.getStreetNameAtCoord(Player.position.x, Player.position.y, Player.position.z, 0, 0),
      Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(Player.position.x, Player.position.y, Player.position.z)),
      Street = mp.game.ui.getStreetNameFromHashKey(path.streetName),
      Heading = getHeading();

   browser.execute('hud.location.street = \"' + Street + '\";');
   browser.execute('hud.location.zone = \"' + Zone + '\";');
   browser.execute('hud.location.heading = \"' + Heading + '\";');
}


mp.game.gxt.set('PM_PAUSE_HDR', 'Focus Roleplay'); 


function HideDefault () {
   mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
   mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
   mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
   mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
   mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
   mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
   mp.game.ui.hideHudComponentThisFrame(14); // CROSSHAIR
   mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
   mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS

   mp.game.invoke('0x9E4CFFF989258472');
   mp.game.invoke('0xF4F2C0D4EE209E20');

   // mp.game.controls.disableControlAction(1, 263, true);
   mp.game.controls.disableControlAction(1, 140, true);
   // mp.game.controls.disableControlAction(1, 141, true); // Q Heavy Attack mele


   // disable tab weapon wheel
   mp.game.controls.disableControlAction(32, 37, true); 

   // show Crosshair if player is aiming with AWP
   let playerWeapon = Player.weapon;
   if (playerWeapon == '0x05FC3C11' || playerWeapon == '0x0C472FE2' || playerWeapon == '0xA914799' || playerWeapon == '0xC734385A' || playerWeapon == '0x6A6C02E0') {
      mp.game.ui.showHudComponentThisFrame(14);
   }
}



/***/ }),

/***/ 1500:
/***/ (() => {



const Player = mp.players.local;

let Browser = null, Opened = false;

const Controls = { 
   keyP: 0x50
};


mp.events.add({
   'client:players:online': () => {
      Opened = !Opened;
      if (Opened) { 
         Browser = mp.browsers.new('package://player/game-interface/onlines.html');
         let List = utils.OnlinePlayers();
         Browser.execute('onlines.players = ' + JSON.stringify(List));
         Player.BrowserControls(true, true);
      } else { 
         if (Browser) Browser.destroy();
         Player.BrowserControls(false, false);
      }
   }
})


mp.keys.bind(Controls.keyP, false, function() {
   if (Player.logged && Player.spawned) {    
      if (Player.isTypingInTextChat) return;
      mp.events.call('client:players:online');
   }
});



/***/ }),

/***/ 141:
/***/ (() => {



const player = mp.players.local;
let browser = mp.browsers.new('package://player/phone-interface/phone.html'), opened = false;


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

/***/ 8083:
/***/ (() => {



const Player = mp.players.local;


mp.events.addDataHandler({
   'Cuffed': (entity, newValue, oldValue) => {
      if (entity.type === 'player') {
         if (newValue !== oldValue) { 
            Cuff(entity, newValue);
         }
      }
   }
});


mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'player') Cuff(entity, entity.getVariable('Cuffed'));
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

   'client:player:cuff': (entity, toggle) => { 
      Cuff(entity, toggle);
   }

});


function Cuff (entity, toggle) { 
   if (toggle) { 
      entity.setEnableHandcuffs(true);
      entity.Cuffed = true;

      entity.cuffs = mp.objects.new(mp.game.joaat('p_cs_cuffs_02_s'), entity.position, {
         rotation: new mp.Vector3(0, 0, 0),
         alpha: 255,
         dimension: entity.dimension
      });

      entity.cuffs.notifyStreaming = true;
      utils.WaitEntity(entity.cuffs).then(() => {
         let bone = mp.players.local.getBoneIndex(6286);
         entity.cuffs.attachTo(entity.handle, bone, -0.02, 0.06, 0.0, 75.0, 0.0, 76.0, true, true, false, false, 0, true);
      })
   }
   else {
      entity.setEnableHandcuffs(false);
      entity.Cuffed = false;
      if (entity.cuffs) { 
         if (entity.cuffs.doesExist()) { 
            entity.cuffs.destroy();
         }
      }
   }
}




/***/ }),

/***/ 555:
/***/ (() => {



const Player = mp.players.local;

let browsers = { licenses: null, identity: null };
let opened = { licenses: false, identity: false };


const Controls = { 
   Enter: 0x0D
};


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


mp.keys.bind(Controls.Enter, false, function(e) {
   if (Player.logged && Player.spawned) { 
      if (Player.isTypingInTextChat) return;
      if (opened.identity) mp.events.call('client:player.documents:show', 'identity');
      if (opened.licenses) mp.events.call('client:player.documents:show', 'licenses');
   }
});

/***/ }),

/***/ 7304:
/***/ (() => {




const Player = mp.players.local;

let browser = null, opened = false, nearbyPlayers = (/* unused pure expression or super */ null && ([]));

const Keys = {
   0: 0x31, 1: 0x32, 2: 0x33, 3:0x34, 666: 0x09
};

const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);

const Controls = { 
   keyY: 0x59,
   keyI: 0x49
};

mp.events.add({

   'client:inventory.toggle': async () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/inventory/inventory-interface/Inventory.html');
         const Inventory = await mp.events.callRemoteProc('server:player.inventory:get');
         browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
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
      if (browser) { 
         browser.execute('inventory.vehicle.id = ' + id);
         browser.execute('inventory.vehicle.items = ' + JSON.stringify(Items));
      }
   },

   'client:inventory.item.trunk:get': async (vehicle, item) => { 
      const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item.trunk:get', vehicle, item);
      if (Inventory && Trunk) { 
         browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
         browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
      }
   },

   'client:inventory.item:trunk': async (vehicle, item) => { 
      const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item:trunk', vehicle, item);
      if (Inventory && Trunk) { 
         if (browser) { 
            browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
            browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
         }
      }
   },

   'client:inventory.player:nearby': () => { 
      let Nearby = [];
      mp.players.forEachInRange(Player.position, 4, (target) => { 
         if (target.dimension === Player.dimension && target.remoteId != Player.remoteId) { 
            Nearby.push({ id: target.remoteId, name: target.name });
         }
      })
      browser.execute('inventory.nearbyPlayers = ' + JSON.stringify(Nearby));
   },

   'render': () => { 
      if (Player.logged && Player.spawned) { 
         mp.objects.forEach((Object) => { 
            if (Player.hasClearLosTo(Object.handle, 17)) {
               const PlayerPosition = Player.position;
               const ObjectPosition = Object.position;
   
               if (Object.getVariable('Item')) { 
                  const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z)).length();
     
                  const position = mp.game.graphics.world3dToScreen2d(new mp.Vector3(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z + 0.15));

                  if (position) {
                     let x = position.x;
                     let y = position.y;
               
                     if (Distance <= 2.5) {       
                        let scale = (Distance / 25);
                        if (scale < 0.6) scale = 0.6;
                        
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


mp.keys.bind(Controls.keyI, false, function() {
   if ( Player.logged && Player.spawned ) { 
      if ( Player.isTypingInTextChat || Player.Cuffed ) return;
      mp.events.call('client:inventory.toggle');
   }
});


function WeaponSelector () { 
   for (let i in Keys) {
      const key = Keys[i];
      mp.keys.bind(key, false, function() {
         if (Player.logged && Player.spawned) { 
            if (Player.cuffed || Player.vehicle || mp.players.local.isTypingInTextChat) return;
            mp.events.callRemote('server:player.inventory.item.weapon:take', i);
         }
      });
   }
}

WeaponSelector();

mp.keys.bind(Controls.keyY, false, function() {
   if (Player.logged && Player.spawned) { 
      if (Player.vehicle || Player.cuffed || mp.players.local.isTypingInTextChat) return;
      mp.events.callRemote('server:player.inventory.item:pickup');
   }
});



async function Give (target, item, quantity) {
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:give', target, item, quantity);
   if (Inventory) {
      browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
   }
}

async function Use (item) { 
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:use', item);
   if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}

async function Put (weapon) { 
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.weapon:put', weapon);
   if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}


async function Unequip (item) {
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:unequip', item);
   if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
};

async function Drop (item, hash, quantity = 1) { 

   let { position } = Player;
   let heading = Player.getHeading();
   let rotation = Player.getRotation(2);

   let newPos = new mp.Vector3(
      position.x + Math.cos(((heading + 90) * Math.PI) / 180) * 0.6,
      position.y + Math.sin(((heading + 90) * Math.PI) / 180) * 0.6,
      position.z,
   );

   let object = mp.objects.new(
      mp.game.joaat(hash),
      new mp.Vector3(newPos.x, newPos.y, newPos.z),
      {
         alpha: 255,
         rotation: new mp.Vector3(rotation.x, rotation.y, rotation.z),
         dimension: Player.dimension,
      },
   );

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
   browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));

   mp.game.streaming.requestAnimDict('random@domestic');
   Player.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
}



/***/ }),

/***/ 8178:
/***/ (() => {



const Player = mp.players.local;
let Vehicles = { Front: null, Back: null }, browser = null, opened = false;

mp.events.add({

   'client:vehicle.alpr': () => {      
      opened = true;
      FMarker = mp.markers.new(1, ForwardVehicle.position, 10,
      {
            direction: ForwardVehicle.position,
            rotation: ForwardVehicle.position,
            color: 0,
            visible: true,
            dimension: Player.dimension
      });
      BMarker = mp.markers.new(1, BackwardVehicle, 10,
      {
            direction: BackwardVehicle.position,
            rotation: BackwardVehicle.position,
            color: 0,
            visible: true,
            dimension: Player.dimension
      });
   },

   'render': () => {
      if (opened && Player.vehicle) {
         ALPR();
      }
      
   },
})


/* function GetVehicleInfrontOfEntity(entity)
	local coords = GetOffsetFromEntityInWorldCoords(entity,0.0,1.0,0.3)
	local coords2 = GetOffsetFromEntityInWorldCoords(entity, 0.0, ScanningDistance,0.0)
	local rayhandle = CastRayPointToPoint(coords, coords2, 10, entity, 0)
	local _, _, _, _, entityHit = GetRaycastResult(rayhandle)
	if entityHit>0 and IsEntityAVehicle(entityHit) then
		return entityHit
	else
		return nil
	end
end*/


function ALPR () {
   let FMarker = null,
       BMarker = null;
   const Vehicle = Player.vehicle;
   const ForwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, 10, 0.0),
         BackwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, -10, 0.0);
   /*
   const ForwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, ForwardPosition), 
         BackwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, BackwardPosition);*/

   const ForwardVehicle = mp.raycasting.testCapsule(Vehicle.position, ForwardPosition, 2, Player, 2), 
         BackwardVehicle = mp.raycasting.testCapsule(Vehicle.position, BackwardPosition, 2, Player, 2);

   // Returna: object: position (Entity Coordinates) , surfaceNormal, material (Entity Model) , entity (Handle)

   if (ForwardVehicle && ForwardVehicle.entity.type == 'vehicle' ) { 
      Vehicles.Front = ForwardVehicle.entity;
      const Speed = Math.round(Vehicles.Front.getSpeed() * 3.6);
      mp.gui.chat.push(JSON.stringify(Speed));
   } 
   if (BackwardVehicle && BackwardVehicle.entity.type == 'vehicle' ) { 
      Vehicles.Back = BackwardVehicle.entity; 
      const Speed = Math.round(Vehicles.Back.getSpeed() * 3.6);
      mp.gui.chat.push(JSON.stringify(Speed));
   }

   if (FMarker != null) {
      FMarker.position = ForwardVehicle.entity.position;
   }

   if (BMarker != null) {
      BMarker.position = BackwardVehicle.entity.position
   }
   
   

}

/*  let 

         mp.vehicles.forEachInRange(ForwardPosition, 5,
            (vehicle) => {
               DetectedVehicles.push(vehicle);
               break;
            }
         );
         mp.vehicles.forEachInRange(BackwardPosition, 5,
            (vehicle) => {
               DetectedVehicles.push(vehicle);
               break;
            }
         );
*/


/***/ }),

/***/ 6687:
/***/ (() => {




const Player = mp.players.local;
let browser = null, opened = false;

const Instructor = mp.peds.new(
   mp.game.joaat('a_m_y_bevhills_01'), 
   new mp.Vector3(-761.8135, -1308.1590, 5.150),
   -36,
   0
);

Instructor.freezePosition(true);
Instructor.setInvincible(true);


let Test = {
   Category: null,
   Route: null,
   Vehicle: null,
   Progress: null,
   Speedlimit: null,
   Warns: null,
   Point: null
};


mp.events.add({
   'client:vehicle.department:menu' (player, department) { 
      if (Test.Route != null) return;
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://vehicles/vehicles-interfaces/department.html');
         browser.execute('department.Player = ' + JSON.stringify(player));
         browser.execute('department.Quiz.Questions = ' + JSON.stringify(department.Quiz));
         browser.execute('department.Licenses = ' + JSON.stringify(department.Licenses));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:vehicle.department.driving:start': (category) => { 
      DrivingTest(category);
   },

   'playerEnterVehicle': (vehicle, seat) => { 
      if (vehicle == Test.Vehicle && seat == -1) { 
         StartRoute();
      }
   }
})


async function DrivingTest (category) { 
   const [Vehicle, Route] = await mp.events.callRemoteProc('server:vehicle.department.driving:start', category);
   Test.Vehicle = mp.vehicles.atRemoteId(Vehicle);
   Test.Route = Route;
   Test.Warns = 0;

   Instructor.freezePosition(false);
   mp.game.wait(5);
   Instructor.taskEnterVehicle(Test.Vehicle.handle, 5000, 0, 1, 1, 0);
};


function Check () { 

   const Time = mp.game.invoke('0x25223CA6B4D20B7F');

   if (Time < 6 || Time > 20) { 
      Instructor.setAlpha(0, false);
      Instructor.setCollision(false, false);
   } else { 
      Instructor.setAlpha(255, false);
      Instructor.setCollision(true, true);
   }
   setTimeout(() => { Check(); }, 30 * 1000);
}

Check();

async function StartRoute () { 

   const Point = Player.CreateInteractionSpot('Polaganje', new mp.Vector3(Test.Route[0].position.x, Test.Route[0].position.y, Test.Route[0].position.z));
   Test.Point = Point;

   mp.events.add('playerEnterCheckpoint', NextPoint);
}

function NextPoint (point) { 
   if (Player.vehicle && Player.vehicle == Test.Vehicle && Test.Point.checkpoint == point) { 

      Test.Point.checkpoint.destroy();
      Test.Point.blip.destroy();

      mp.game.wait(50);

      if (Test.Progress == Test.Route.length - 1) {
         mp.events.remove('playerEnterCheckpoint', NextPoint);
         mp.gui.chat.push(JSON.stringify(Test.Vehicle.remoteId));
         Test.Route = null, Test.Progress = null;

         mp.events.add('playerLeaveVehicle', (vehicle, seat) => { 
            if (vehicle == Test.Vehicle) { 
               Instructor.taskGoStraightToCoord(-761.8135, -1308.1590, 5.150, 1, 5000, -36, 2);
               mp.events.callRemote('server:vehicle.department.license:give', Test.Category, Test.Vehicle.remoteId);
            }
         });
         // izbrisati vozilo
         return;
      };

      Test.Progress ++;

      const Position = new mp.Vector3(Test.Route[Test.Progress].position.x, Test.Route[Test.Progress].position.y, Test.Route[Test.Progress].position.z - 0.5);
      const Point = Player.CreateInteractionSpot('Polaganje', Position);
      Test.Point = Point;
   }
};

/***/ }),

/***/ 8878:
/***/ (() => {


const Player = mp.players.local;
const blockedClasses = [13, 14, 15, 16, 21]; 

let DistanceNow = null;
let DistanceTemporary;

mp.game.controls.useDefaultVehicleEntering = true;

// AUTO HELMET
Player.setConfigFlag(35, false);


const Controls = {
   arrowLeft: 3,
   arrowRight: 3,
   keyY: 0x59
};


mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'vehicle') {
         if (entity.hasVariable('IndicatorRight')) entity.setIndicatorLights(0, entity.getVariable('IndicatorRight'));
         if (entity.hasVariable('IndicatorLeft')) entity.setIndicatorLights(1, entity.getVariable('IndicatorLeft')); 
         if (entity.hasVariable('Windows')) Windows(entity, entity.getVariable('Windows'));
         if (entity.hasVariable('Fuel')) entity.Fuel = entity.getVariable('IndicatorLeft');
         if (entity.hasVariable('Mileage')) entity.Mileage = entity.getVariable('Mileage');
         if (entity.hasVariable('Hood')) Doors(entity, 'hood', entity.getVariable('Hood'));
         if (entity.hasVariable('Trunk')) Doors(entity, 'trunk', entity.getVariable('Trunk'));
         if (entity.hasVariable('Back')) Doors(entity, 'back', entity.getVariable('Back'));
         if (entity.hasVariable('Back2')) Doors(entity, 'back2', entity.getVariable('Back2'));
      }
   },

   'playerEnterVehicle': (vehicle, seat) => { 
      mp.game.vehicle.defaultEngineBehaviour = false;
      Player.setConfigFlag(429, true);

      if (vehicle.Fuel && seat == -1) { 
         DistanceNow = Date.now();
         DistanceTemporary = 0;
         mp.events.add('render', Driving);
      }
   },

   'playerLeaveVehicle': (Vehicle, seat) => { 
      if (seat == -1) { 
         mp.events.remove('render', Driving);
         if (Vehicle) mp.events.callRemote('server:vehicle:update', Vehicle, Vehicle.Mileage, Vehicle.Fuel);
      }
   }
});


mp.events.addDataHandler({
   'IndicatorRight': (entity, value) => {
      if (entity.type === 'vehicle') entity.setIndicatorLights(0, (value == null) ? false : value);
   },

   'IndicatorLeft': (entity, value) => {
      if (entity.type === 'vehicle') entity.setIndicatorLights(1, (value == null) ? false : value);
   },

   'Windows': (entity, value) => { 
      if (entity.type === 'vehicle') Windows(entity, value);
   },

   'Trunk': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'trunk', value);
   },

   'Hood': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'hood', value);
   },

   'Back': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'back', value);
   },

   'Back2': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'back2', value);
   },

   'Fuel': (entity, value) => { 
      if (entity.type === 'vehicle') entity.Fuel = value;
   },

   'Mileage': (entity, value) => { 
      if (entity.type === 'vehicle') entity.Mileage = value;
   }
});


// Left Indicator
mp.keys.bind(Controls.arrowLeft, false, () => {
   if (!Player.logged) return;
   if (mp.players.local.isTypingInTextChat) return;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 1);
});


// Right Indicator
mp.keys.bind(Controls.arrowRight, false, () => {
   if (!Player.logged) return;
   if (mp.players.local.isTypingInTextChat) return;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 0);
});



function Driving () { 
   if (Player.vehicle && Player.vehicle.getPedInSeat(-1) === Player.handle) { 
      let vehicle = Player.vehicle;
      let Speed = vehicle.getSpeed() * 3.6;

      if (Date.now() >= DistanceNow + 1 && Speed > 1) { 
         let Calculating = Speed * ((Date.now() - DistanceNow) / 1000);
         let Trip = parseFloat(Calculating / 3600);

         DistanceTemporary += Trip; 

         vehicle.Mileage += (DistanceTemporary / 1000);
         DistanceNow = Date.now();
      }   

      // Updating Vehicle.Mileage in GameInterface 
      GameInterface.execute('hud.Mileage(' + vehicle.Mileage.toFixed(3) + ')');
      GameInterface.execute('hud.Speed(' + Speed + ')');

   }
}


// SYNCING WINDOWS // PROBABLY TROUBE
function Windows (vehicle, value) { 
   const Doors = mp.game.invoke('0x92922A607497B14D', vehicle.handle);
   for (let i = 0; i < Doors - 2; i ++) { 
      let Window = value[i];
      Window ? vehicle.rollDownWindow(i) : vehicle.rollUpWindow(i);
   }
}


function Doors (vehicle, index, value) { 
   let Number = 4;
   switch (index) {
      case 'hood': Number = 4; break;
      case 'trunk': Number = 5; break;
      case 'back': Number = 6; break;
      case 'back2': Number = 7; break;
   }
   value ? vehicle.setDoorOpen(Number, false, false) : vehicle.setDoorShut(Number, false);
};



const natives = { 
   MAX_PASSENGERS: '0x2AD93716F184EDA4',
   MAX_SPEED: '0xF417C2502FFFED43',
   MAX_BRAKING: '0xDC53FD41B4ED944C',
   MAX_TRACTION: '0x539DE94D44FDFD0D',
   MAX_ACCELERATION: '0x8C044C5C84505B6A',
   MANUFACTEUR: '0xF7AF4F159FF99F97',
};


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__(994);
/******/ 	__webpack_require__(2983);
/******/ 	__webpack_require__(9853);
/******/ 	__webpack_require__(3582);
/******/ 	__webpack_require__(3080);
/******/ 	__webpack_require__(4403);
/******/ 	__webpack_require__(9050);
/******/ 	__webpack_require__(9445);
/******/ 	__webpack_require__(4508);
/******/ 	__webpack_require__(4345);
/******/ 	__webpack_require__(921);
/******/ 	__webpack_require__(9417);
/******/ 	__webpack_require__(8680);
/******/ 	__webpack_require__(6064);
/******/ 	__webpack_require__(7193);
/******/ 	__webpack_require__(8319);
/******/ 	__webpack_require__(1406);
/******/ 	__webpack_require__(805);
/******/ 	__webpack_require__(2687);
/******/ 	__webpack_require__(9179);
/******/ 	__webpack_require__(2816);
/******/ 	__webpack_require__(2387);
/******/ 	__webpack_require__(9408);
/******/ 	__webpack_require__(4032);
/******/ 	__webpack_require__(9247);
/******/ 	__webpack_require__(2399);
/******/ 	__webpack_require__(1846);
/******/ 	__webpack_require__(4116);
/******/ 	__webpack_require__(551);
/******/ 	__webpack_require__(5626);
/******/ 	__webpack_require__(7373);
/******/ 	__webpack_require__(4687);
/******/ 	__webpack_require__(3886);
/******/ 	__webpack_require__(1877);
/******/ 	__webpack_require__(3045);
/******/ 	__webpack_require__(4534);
/******/ 	__webpack_require__(6573);
/******/ 	__webpack_require__(555);
/******/ 	__webpack_require__(9133);
/******/ 	__webpack_require__(872);
/******/ 	__webpack_require__(1189);
/******/ 	__webpack_require__(8201);
/******/ 	__webpack_require__(5531);
/******/ 	__webpack_require__(1917);
/******/ 	__webpack_require__(9158);
/******/ 	__webpack_require__(7304);
/******/ 	__webpack_require__(1500);
/******/ 	__webpack_require__(141);
/******/ 	__webpack_require__(8083);
/******/ 	__webpack_require__(5639);
/******/ 	__webpack_require__(5568);
/******/ 	__webpack_require__(2591);
/******/ 	__webpack_require__(8178);
/******/ 	__webpack_require__(6687);
/******/ 	var __webpack_exports__ = __webpack_require__(8878);
/******/ 	
/******/ })()
;