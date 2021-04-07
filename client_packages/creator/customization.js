
const player = mp.players.local;
let customizationCEF = null, 
    customizatorOpened = false,
    bodyCam = null,
    bodyCamStart = null;


const genders = [ 
    mp.game.joaat('mp_m_freemode_01'), 
    mp.game.joaat('mp_f_freemode_01') 
];


getCameraOffset = (pos, angle, dist) => {
    angle = angle * 0.0174533;
    pos.y = pos.y + dist * Math.sin(angle);
    pos.x = pos.x + dist * Math.cos(angle);
    return pos;
}

mp.events.add({

    'client:creator.show': () => {
        player.freezePosition(true);
        if (customizatorOpened == true) return;
        mp.gui.chat.push('opened')
        customizationCEF = mp.browsers.new('package://creator/creator-interface/creator.html');
        setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
        mp.game.ui.displayRadar(false);
        mp.events.call('client:creator.cam', true);
        customizatorOpened = true;
        mp.gui.chat.activate(false);
        player.setComponentVariation(11, 15, 0, 0);
        player.setComponentVariation(3, 15, 0, 0);
        player.setComponentVariation(8, 15, 0, 0);

    },

    'client:creator.finish': (headOverlays, faceFeatures, blendData) => {
        mp.game.ui.displayRadar(true);
        mp.events.callRemote('server:updatePlayerCustomization', headOverlays, faceFeatures, blendData);
        if (mp.browsers.exists(customizationCEF)) { customizationCEF.destroy() }
        setTimeout(() => { mp.gui.cursor.show(false, false); }, 500);
        player.freezePosition(false);
        mp.events.call('client:creator.cam', false);
        customizatorOpened = false;
        mp.gui.chat.activate(true);
    },


    'client:creator.cam': (toggle) => {
        if(toggle) {
            bodyCamStart = player.position;
            let camValues = { Angle: player.getRotation(2).z + 90, Dist: 2.6, Height: 0.2 };
            let pos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
            bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
            bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
            bodyCam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 500, true, false);
        }
        else {
            if (bodyCam == null) return;
            bodyCam.setActive(false);
            bodyCam.destroy();
            mp.game.cam.renderScriptCams(false, false, 3000, true, true);
            
            bodyCam = null;
        }
	    player.taskPlayAnim("amb@world_human_guard_patrol@male@base", "base", 8.0, 1, -1, 1, 0.0, false, false, false);
    },

    'client:creator.cam.set': (flag) => {
        let camValues = { Angle: 0, Dist: 1, Height: 0.2 };
        switch(flag)
        {
            case 0: // Torso
            {
                camValues = { Angle: 0, Dist: 2.6, Height: 0.2 };
                break;
            }
            case 1: // Head
            {
                camValues = { Angle: 0, Dist: 1, Height: 0.5 };
                break;
            }
            case 2: // Hair / Bear / Eyebrows
            {
                camValues = { Angle: 0, Dist: 0.5, Height: 0.7 };
                break;
            }
            case 3: // chesthair
            {
                camValues = { Angle: 0, Dist: 1, Height: 0.2 };
                break;
            }
        }
	    const camPos = getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), player.getRotation(2).z + 90 + camValues.Angle, camValues.Dist);
        bodyCam.setCoord(camPos.x, camPos.y, camPos.z);
	    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    },

    'client:creator.preview.faceFeature': (index, scale) => { 
        player.setFaceFeature(parseInt(index), parseFloat(scale)); 
        mp.events.call('client:creator.cam.set', 2);
    },

    'client:creator.gender': (sex) => {  mp.players.local.model = genders[sex]; },

    'client:creator.blendDataPrevieew': (shapeFirstID, shapeSecondID, skinFirstID, skinSecondID, shapeMix, skinMix) => {
        player.setHeadBlendData(shapeFirstID, shapeSecondID, 0, skinFirstID, skinSecondID, 0, shapeMix, skinMix, 0, false);
        mp.events.call('client:creator.cam.set', 1);
    },

    'client:creator.preview.faceFeature': (index, scale) => { 
        player.setFaceFeature(parseInt(index), parseFloat(scale)); 
        mp.events.call('client:creator.cam.set', 2);
    },

    'client:creator.preview.clothing': (clothing) => { 
        clothing = JSON.parse(clothing); 
        player.setComponentVariation(11, parseInt(clothing[0].value), parseInt(clothing[0].color), 0);
        player.setComponentVariation(4, parseInt(clothing[1].value), parseInt(clothing[1].color), 0);
        player.setComponentVariation(6, parseInt(clothing[2].value), parseInt(clothing[2].color), 0);
        clothing[0].value > 5 ? ( player.setComponentVariation(3, 2, 0, 0) ) : ( player.setComponentVariation(3, 15, 0, 0) )
        // majca = 0, pantalone = 1, patike = 2
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

    'client:creator.preview.headOverlay': (color, index, value) => {
        if(color){
          var oldVal = player.getHeadOverlayValue(index);
          player.setHeadOverlay(index, oldVal, 1, value, 0);
          mp.events.call('client:creator.cam.set', 1);
        }
        else { 
          player.setHeadOverlay(index, value, 1.0, 0, 0);
          mp.events.call('client:creator.cam.set', 1);
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

