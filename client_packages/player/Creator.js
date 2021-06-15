

const Player = mp.players.local;
let browser = null, opened = false;

let camera = null;

const Creator = { 
   Position: new mp.Vector3(-612.7821044921875, 611.093261718175, 149.5516967734375),
   Heading: 20.0,
   Camera: new mp.Vector3(-148.7210, -956.6942, 254.1313)
}

const Genders = [ mp.game.joaat('mp_m_freemode_01'), mp.game.joaat('mp_f_freemode_01') ];

let Hair = [0, 0, 0];

mp.events.add({
   'client:player.character.creator:show': async () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/start-interfaces/creator.html');
         Player.position = Creator.Position;
         Player.setHeading(Creator.Heading);
         Player.BrowserControls(true, true);
         Player.freezePosition(true);
         mp.game.ui.displayRadar(false);

         camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
         const CameraPositon = new mp.Vector3(Player.position.x + Player.getForwardX() * 1.5, Player.position.y + Player.getForwardY() * 1.5, Player.position.z);
         camera.setCoord(CameraPositon.x, CameraPositon.y, CameraPositon.z);
         camera.pointAtCoord(Player.position.x, Player.position.y, Player.position.z);
         camera.setActive(true);
         mp.game.cam.renderScriptCams(true, false, 0, true, false);
      
         mp.events.add('render', MoveCamera);

      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
         Player.freezePosition(false);
         mp.game.ui.displayRadar(true);
         mp.events.remove('render', MoveCamera);
         if (camera) camera.destroy();
         camera = null;
         mp.game.cam.renderScriptCams(false, false, 0, false, false);
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

   'client:player.character.creator:zoom': (delta) => { 

      let { x, y, z } = camera.getCoord();

      if (delta < 0) { 
         x += camera.getDirection().x * 0.1;
         y += camera.getDirection().y * 0.1;
         
      } else { 
         x -= camera.getDirection().x * 0.1;
         y -= camera.getDirection().y * 0.1;
      }

      const dist = mp.game.gameplay.getDistanceBetweenCoords(Player.position.x, Player.position.y, Player.position.z, x, y, z, false);
      if (dist > 3.5 || dist < 0.3) return;

      camera.setPosition(x, y, z);
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
   }
})



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

   let { x: camPosX, y: camPosY, z: camPosZ } = camera.getCoord();
   let { pointX: camPointX, pointY: camPointY, pointZ: camPointZ } = camera.getDirection();

   camPosZ = camPosZ + Data.DeltaY * 0.001;
   const { x: charPosX, y: charPosY, z: charPosZ } = Player.getCoords(true);

   if (camPosZ < charPosZ + 0.7 && camPosZ > charPosZ - 0.8) { 
      camera.setPosition(camPosX, camPosY, camPosZ);
      camera.pointAtCoord(charPosX, charPosY, camPosZ);
   }
}
