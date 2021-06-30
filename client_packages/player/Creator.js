

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

