

const Player = mp.players.local;
let browser = null, opened = false;

const Creator = { 
   Position: new mp.Vector3(-148.7210, -956.6942, 254.1313),
   Heading: -72.69,
   Camera: new mp.Vector3(-148.7210, -956.6942, 254.1313)
}

const Genders = [ mp.game.joaat('mp_m_freemode_01'), mp.game.joaat('mp_f_freemode_01') ];

let Hair = [0, 0, 0];

mp.events.add({
   'client:player.character.creator:show': () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/start-interfaces/creator.html');
         Player.position = Creator.Position;
         Player.setHeading(Creator.Heading);
         Player.BrowserControls(true, true);
         Player.freezePosition(true);
         mp.game.invoke('0x419594E137637120', true, Player.handle, true);
         mp.game.ui.displayRadar(false);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
         Player.freezePosition(false);
         mp.game.ui.displayRadar(true);
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

         if (mp.keys.isDown(37) === true) {
            let heading = Player.getHeading();
            Player.setHeading(heading - 2)
         } else if (mp.keys.isDown(39) === true) {
            let heading = Player.getHeading();
            Player.setHeading(heading + 1.5)
         }
         //mp.game.invoke('0x8BBACBF51DA047A8', Player.handle);
      }
   },

   'client:player.character.creator:gender': (x) => { 
      Player.model = Genders[x];
   },

   'client:player.character.creator:eyes': (x) => { 
      Player.setEyeColor(x);
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
      Player.setFaceFeature(i, x); 
   },

   'client:player.character.creator:blend': (x) => { 
      x = JSON.parse(x);
      Player.setHeadBlendData(parseInt(x[0]), parseInt(x[1]), 0, parseInt(x[2]), parseInt(x[3]), 0, parseFloat(x[4]), parseFloat(x[5]), 0, true);

   }





})


