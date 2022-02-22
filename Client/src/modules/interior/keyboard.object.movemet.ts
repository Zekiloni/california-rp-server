
// const editor = () => {
//    if (editing.active) {
//       if (editing.object) {
//          if (mp.keys.isDown(32) === true && !mp.players.local.isTypingInTextChat) { 
//             mp.gui.cursor.show(false, false);
//          } else {
//             mp.gui.cursor.show(true, true);
//          }

//          const cameraPositon = mp.cameras.new('gameplay').getCoord();
//          const hoverPosition = mp.game.graphics.screen2dToWorld3d(new mp.Vector3(mp.gui.cursor.position[0], mp.gui.cursor.position[1], 0));
//          const groundZ = mp.game.gameplay.getGroundZFor3dCoord(hoverPosition.x, hoverPosition.y, hoverPosition.z + 5, 0.0, false);
//          mp.game.graphics.drawLine(hoverPosition.x, hoverPosition.y, hoverPosition.z, hoverPosition.x, hoverPosition.y, hoverPosition.z + 2, 255, 0, 0, 255);

//          // if (mp.raycasting.testPointToPoint(cameraPositon, hoverPosition)) {
//          //    editing.object.setAlpha(100);
//          // }

//          const { position, rotation } = editing.object;

//          mp.game.graphics.drawLine(position.x - 1.5, position.y, position.z, position.x + 1.5, position.y, position.z, 0, 0, 255, 255);
//          mp.game.graphics.drawLine(position.x, position.y - 1.5, position.z, position.x, position.y + 1.0, position.z, 255, 0, 0, 255);
//          mp.game.graphics.drawLine(position.x, position.y, position.z - 1.5, position.x, position.y, position.z + 1.5, 0, 255, 0, 255);


//          if (editing.movement == Movements.MOVING) {
//             switch (true) {
//                case mp.keys.isDown(100): {
//                   editing.object.position = new mp.Vector3(position.x + editing.sensitivity, position.y, position.z);
//                   setProperlyOnGround(editing.object);
//                   break;
//                }
//                case mp.keys.isDown(102): {
//                   editing.object.position = new mp.Vector3(position.x - editing.sensitivity, position.y, position.z);
//                   setProperlyOnGround(editing.object);
//                   break;
//                }

//                case mp.keys.isDown(104): { 
//                   editing.object.position = new mp.Vector3(position.x, position.y + editing.sensitivity, position.z);
//                   setProperlyOnGround(editing.object);
//                   break;
//                }

//                case mp.keys.isDown(98): {
//                   editing.object.position = new mp.Vector3(position.x, position.y - editing.sensitivity, position.z);
//                   setProperlyOnGround(editing.object);
//                   break;
//                }

//                case mp.keys.isDown(105): {
//                   editing.object.position = new mp.Vector3(position.x, position.y, position.z + editing.sensitivity);
//                   break;
//                }

//                case mp.keys.isDown(103): {
//                   editing.object.position = new mp.Vector3(position.x, position.y, position.z - editing.sensitivity);
//                   break;
//                }
//             }
//          } else { 
//             switch (true) {
//                case mp.keys.isDown(100): {
//                   editing.object.rotation = new mp.Vector3(rotation.x + editing.sensitivity * 5, rotation.y, rotation.z);
//                   break;  
//                }

//                case mp.keys.isDown(102): {
//                   editing.object.rotation = new mp.Vector3(rotation.x - editing.sensitivity * 5, rotation.y, rotation.z);
//                   break;  
//                }

//                case mp.keys.isDown(104): {
//                   editing.object.rotation = new mp.Vector3(rotation.x, rotation.y + editing.sensitivity * 5, rotation.z);
//                   break;  
//                }

//                case mp.keys.isDown(98): {
//                   editing.object.rotation = new mp.Vector3(rotation.x, rotation.y - editing.sensitivity * 5, rotation.z);
//                   break;  
//                }

//                case mp.keys.isDown(105): {
//                   editing.object.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z + editing.sensitivity * 5);
//                   break;  
//                }

//                case mp.keys.isDown(103): {
//                   editing.object.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z - editing.sensitivity * 5);
//                   break;  
//                }
//             }
//          }
         
//       }
//    }
// };
