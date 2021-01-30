var player =  mp.players.local, customizationCEF;

mp.events.add({
    'client:showCustomization': () => {
        player.freezePosition(true);
        customizationCEF = mp.browsers.new('package://char-customization/customization-interface/customization.html');
        setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
        mp.game.ui.displayRadar(false);
        mp.events.call('client:setCameraInfrontPlayer', true);
    },

    'client:disableCustomizationPreview': (headOverlays, faceFeatures, blendData) => {
        mp.game.ui.displayRadar(true);
        mp.events.callRemote('server:updatePlayerCustomization', headOverlays, faceFeatures, blendData);
        customizationCEF.destroy();
        setTimeout(() => { mp.gui.cursor.show(false, false); }, 500);
        player.freezePosition(false);
        mp.events.call('client:setCameraInfrontPlayer', false);
    },

    'client:setFaceFeaturePreview': (index, scale) => {
        player.setFaceFeature(index, scale);
    },

    'client:setHeadBlendDataPreview': (shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix) => {
        player.setHeadBlendData(shapeFirstID, shapeSecondID, 0, skinFirstID, skinSecondID, 0, shapeMix, skinMix, 0, false);
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

