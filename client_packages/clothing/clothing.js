
// module.exports = { 
//   appearance = [ 

//   ],

//   clohing = [ 
//     male = [
//       masks = { id: 1, min: 0, max: 189 },
//       hairStyles = { id: 2, min: 0, max: 74 },
//       torsos = { id: 3, min: 0, max: 194 },
//       legs = { id: 4, min: 0, max: 132},
//       bags = { id: 5, min: 0, max: 88 },
//       shoes = { id: 6, min: 0, max: 97 },
//       accessories = { id: 7, min: 0, max: 150 },
//       undershirts = { id: 8, min: 0, max: 177 },
//       armours = { id: 9, min: 0, max: 55 },
//       tops = { id: 11, min: 0, max: 361 }
//     ],
//     female = [
//       masks = { id: 1, min: 0, max: 189 },
//       hairStyles = { id: 2, min: 0, max: 78 },
//       torsos = { id: 3, min: 0, max: 239 },
//       legs = { id: 4, min: 0, max: 139 },
//       bags = { id: 5, min: 0, max: 88 },
//       shoes = { id: 6, min: 0, max: 101 },
//       accessories = { id: 7, min: 0, max: 110 },
//       undershirts = { id: 8, min: 0, max: 215 },
//       armours = { id: 9, min: 0, max: 55 },
//       tops = { id: 11, min: 0, max: 380 }
//     ],
//   ],

//   props = [ 
//     male = [
//       hats = { id: 0, min: 0, max: 152 },
//       glasses = { id: 1, min: 0, max: 33 },
//       ears = { id: 2, min: 0, max: 40 },
//       watches = { id: 6, min: 0, max: 40 },
//       bracelets = { id: 7, min: 0, max: 8 }
//     ],
//     female = [
//       hats = { id: 0, min: 0, max: 151 },
//       glasses = { id: 1, min: 0, max: 35 },
//       ears = { id: 2, min: 0, max: 21 },
//       watches = { id: 6, min: 0, max: 29 },
//       bracelets = { id: 7, min: 0, max: 15 }
//     ]
//   ]
// }

// mp.keys.bind(0x55, false, function() {
//   if(!player.isRagdoll()) {
//     mp.players.local.setToRagdoll(10000, 10000, 0, true, true, true);
//   }
//   else { 
//     mp.players.local.resetRagdollTimer();
//     mp.players.local.giveRagdollControl(true);
//     mp.players.local.setToRagdoll(500, 500, 0, true, true, true);
//   } 
// });

// mp_m_freemode_01
// mp_f_freemode_01

var player =  mp.players.local, clothingCEF, frontPlayerCamera;

mp.events.add({

    'client:showClothing': () => {
        player.freezePosition(true);
        clothingCEF = mp.browsers.new('package://clothing/clothing-interface/clothing.html');
        setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
        mp.game.ui.displayRadar(false);
        mp.events.call('client:setCameraInfrontPlayer', true);
    },

    'client:clothingPreview': (index, value) => {
        let palette = player.getPaletteVariation(index);
        player.setComponentVariation(index, value, 0, palette);
    },

    'client:disableClothingPreview': (clothingFinished) => {
        mp.game.ui.displayRadar(true);
        player.freezePosition(false);
        mp.events.callRemote('server:updatePlayerClothing', clothingFinished);
        clothingCEF.destroy();
        setTimeout(() => { mp.gui.cursor.show(false, false); }, 1000);
        mp.events.call('client:setCameraInfrontPlayer', false);
    },

    'client:rotateCharacter': (value) => {
        player.setHeading(value);
    },

    'client:setCameraInfrontPlayer': (status) => {
        if(status) {
          frontPlayerCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 30);
          var position = player.position;
          frontPlayerCamera.setActive(true);
          frontPlayerCamera.setCoord(position.x, position.y + 4, position.z);
          frontPlayerCamera.pointAtCoord(position.x, position.y, position.z);
          mp.game.cam.renderScriptCams(true, false, 0, true, false);
        }
        else { 
          frontPlayerCamera.destroy();
          mp.game.cam.renderScriptCams(false, false, 0, false, false);
        }
    },

})




