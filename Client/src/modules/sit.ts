// // import { entityData } from '@/../Server/src/globals/enums';
// import { benchesProps, benchesData } from '../data/benches';
// import { controls } from '../data/enums';


// let player = mp.players.local;

// let sitting: boolean = false;

// let currentObject: number | null;
// let currentType: string | null;


// function sit (toggle: boolean, type?: string) { 
//    if (toggle) { 
//       mp.gui.chat.push('sit toggle 1')

//       mp.game.controls.disableControlAction(1, 37, true);

//       mp.gui.chat.push('sit toggle 2')

//       mp.game.invoke('0x58A850EAEE20FAA3', currentObject);
//       mp.players.local.freezePosition(true);

//       mp.gui.chat.push('sit toggle 3')

//       const position = mp.game.invoke('0x3FEF770D40960D5A', currentObject, false)
//       const heading = mp.game.invoke('0xE83D4F9BA2A38914', currentObject);

//       Object.entries(benchesData).forEach(
//          ([key, value]) => {
//             if (key === type) {
//                mp.players.local.taskStartScenarioAtPosition(value.scenario, position.x, position.y, position.z - value.verticalOffset, heading + 100.0, 0, true, false);
//             }
//          }
//      )

//      sitting = true;

//    } else { 
//       sitting = false;
//       currentObject = null;
//       currentType = null;
      
//    }
// }

// mp.keys.bind(controls.KEY_E, true, async () => {
//    if (!player.getVariable('LOGGED') && !player.getVariable('SPAWNED')) return;
//    mp.gui.chat.push('1')

//    if (sitting) {
//       mp.gui.chat.push('2')

//       sit(false);

//    } else { 
//       mp.gui.chat.push('3')

//       for (let i in benchesProps) { 
//          const type = benchesProps[i];
//          const object = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 2.0, mp.game.joaat(type), false, false, false);

//          if (object) { 
//             currentObject = object;
//             currentType = type;
//             const used = await mp.events.callRemoteProc('SERVER::PLAYER:TRY_SIT', mp.game.invoke('0x3FEF770D40960D5A', object, false));
//             if (!used) sit(true, currentType);
//          }
//       }
//    }
// });