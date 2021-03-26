const player =  mp.players.local;
let customizationCEF, customizatorOpened = false;


const genders = [ 
    mp.game.joaat('mp_m_freemode_01'), 
    mp.game.joaat('mp_f_freemode_01') 
];

mp.events.add({
    'client:showCustomization': () => {
        player.freezePosition(true);
        customizationCEF = mp.browsers.new('package://char-customization/customization-interface/creator.html');
        setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
        mp.game.ui.displayRadar(false);
        mp.events.call('client:setCameraInfrontPlayer', true);
        customizatorOpened = true;
        mp.gui.chat.activate(false);
    },

    'client:disableCustomizationPreview': (headOverlays, faceFeatures, blendData) => {
        mp.game.ui.displayRadar(true);
        mp.events.callRemote('server:updatePlayerCustomization', headOverlays, faceFeatures, blendData);
        if (mp.browsers.exists(customizationCEF)) { customizationCEF.destroy() }
        setTimeout(() => { mp.gui.cursor.show(false, false); }, 500);
        player.freezePosition(false);
        mp.events.call('client:setCameraInfrontPlayer', false);
        customizatorOpened = false;
        mp.gui.chat.activate(true);
    },

    'client:creator.faceFeature': (index, scale) => {
        player.setFaceFeature(index, scale);
    },

    'client:creator.gender': (sex) => { 
        mp.players.local.model = genders[sex];
    },

    'client:setHeadBlendDataPreview': (shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix) => {
        player.setHeadBlendData(shapeFirstID, shapeSecondID, 0, skinFirstID, skinSecondID, 0, shapeMix, skinMix, 0, false);
    },

    'render': () => { 
        if (customizatorOpened) { 
            let heading;
            if (mp.keys.isDown(65) === true) {
                heading = player.getHeading();
                player.setHeading(heading - 2)
            } else if (mp.keys.isDown(68) === true) {
                heading = player.getHeading();
                player.setHeading(heading + 1.5)
            }
        }
    },

    'client:setHeadOverlayPreview': (color, index, value) => {
        if(color){
          var oldVal = player.getHeadOverlayValue(index);
          player.setHeadOverlay(index, oldVal, 1, value, 0);
        }
        else { 
          player.setHeadOverlay(index, value, 1.0, 0, 0);
        }
    }
});

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

