// // uraditi provere da li je chat otvoren

// var moving_speeds = [0.01, 0.1, 1.0, 5.0, 10.0];
// var moving_speed_idx = 0;

// var editing_types = ["X position", "Y position", "Height", "X Rot", "Y Rot", "Rotation"];
// var editing_type_idx = 0;

// const localplayer = mp.players.local;

// let Editing = false;
// let Object: ObjectMp | null = null;

// var sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
// var scInst = 0;

// function AddInstructionalStart() {
//     scInst = 0;
//     mp.game.graphics.drawScaleformMovieFullscreen(sc, 255, 255, 255, 0, false);
//     mp.game.graphics.pushScaleformMovieFunction(sc, "CLEAR_ALL");
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_CLEAR_SPACE");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
// }

// function AddInstructionalButton(text: string, button: number)
// {
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
//     mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     scInst++;
// }

// function AddInstructionalButtonCustom(text: string, button: string) {
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
//     mp.game.graphics.pushScaleformMovieFunctionParameterString(button);
//     mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     scInst++;
// }

// function AddInstructionalEnd(type: number) {
//     mp.game.graphics.pushScaleformMovieFunction(sc, "DRAW_INSTRUCTIONAL_BUTTONS");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
//     mp.game.graphics.pushScaleformMovieFunction(sc, "SET_BACKGROUND_COLOUR");
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.pushScaleformMovieFunctionParameterInt(0);
//     mp.game.graphics.popScaleformMovieFunctionVoid();
// }

// mp.events.add("client:startFurnitureEditor", function (model) {
//    Object = mp.objects.new(mp.game.joaat(model), new mp.Vector3(localplayer.position.x+1, localplayer.position.y+1, localplayer.position.z-0.5), 
//    {
// 	   rotation: new mp.Vector3(0, 0, 0),
// 	   alpha: 255,
// 	   dimension: localplayer.dimension
//    });
//    Editing = true;
// });

// mp.events.add("client:stopFurnitureEditor", function () {
//    Object?.destroy();
//    Object = null;
//    Editing = false;
// });

// function UpdateObject() {
//    if (Object == null) return;
   
//    let model = Object.model;
//    let position = Object.position;
//    let rot = Object.getRotation(2);
//    let pitch = Object.getPitch();
   
//    Object.destroy();
//    Object = mp.objects.new(model, position,
//    {
// 	   rotation: new mp.Vector3(rot.x, rot.y, rot.z),
// 	   alpha: 255,
// 	   dimension: localplayer.dimension
//    });
//    Object.setRotation(pitch, rot.y, rot.z, 2, true);
// }

// mp.keys.bind(0x26, false, function () { // UP Arrow
//    if (!Editing || Object === null) return; // uraditi proveru i da li je chat otvoren
//    switch (editing_type_idx) {
//        // pos x
//        case 0:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x + moving_speeds[moving_speed_idx], pos.y, pos.z);
//            break;
//        // pos y
//        case 1:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y + moving_speeds[moving_speed_idx], pos.z);
//            break;
//        // pos z
//        case 2:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y, pos.z + moving_speeds[moving_speed_idx]);
//            break;
//        // rot x
//        case 3:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
		   
//            Object.setRotation(pitch + moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
//            mp.gui.chat.push("rot X" + rot);
//            break;
//        // rot y
//        case 4:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
		   
//            Object.setRotation(pitch, rot.y + moving_speeds[moving_speed_idx], rot.z, 2, true);
//            mp.gui.chat.push("rot Y" + rot);
//            break;
//        // rot z
//        case 5:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
		   
//            Object.setRotation(pitch, rot.y, rot.z + moving_speeds[moving_speed_idx], 2, true);

//            mp.gui.chat.push("rot Z" + rot);
//            break;
//    }
//    UpdateObject();
// });

// mp.keys.bind(0x28, false, function () { // DOWN Arrow
//    if (!Editing || Object === null) return; // uraditi proveru i da li je chat otvoren
//    switch (editing_type_idx) {
//        // pos x
//        case 0:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x - moving_speeds[moving_speed_idx], pos.y, pos.z);
//            break;
//        // pos y
//        case 1:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y - moving_speeds[moving_speed_idx], pos.z);
//            break;
//        // pos z
//        case 2:
//            var pos = Object.position;
//            Object.position = new mp.Vector3(pos.x, pos.y, pos.z - moving_speeds[moving_speed_idx]);
//            break;
//        // rot x
//        case 3:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
		   
//            Object.setRotation(pitch - moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
//            break;
//        // rot y
//        case 4:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
		   
//            Object.setRotation(pitch, rot.y - moving_speeds[moving_speed_idx], rot.z, 2, true);
//            break;
//        // rot z
//        case 5:
//            var rot = Object.getRotation(2);
//            var pitch = Object.getPitch();
		   
//            Object.setRotation(pitch, rot.y, rot.z - moving_speeds[moving_speed_idx], 2, true);
//            break;
//    }
//    UpdateObject();
// });

// mp.keys.bind(0x25, false, function () { // LEFT Arrow
//    if (!Editing) return;
   
//    editing_type_idx--;
//    if (editing_type_idx < 0) editing_type_idx = editing_types.length - 1;
//    mp.gui.chat.push(`[DEBUG] Edit type: ${editing_types[editing_type_idx]}`);
// });

// mp.keys.bind(0x27, false, function () { // RIGHT Arrow
//    if (!Editing) return;
   
//    editing_type_idx++;
//    if (editing_type_idx >= editing_types.length) editing_type_idx = 0;
//    mp.gui.chat.push(`[DEBUG] Edit type: ${editing_types[editing_type_idx]}`);
// });

// mp.keys.bind(0x59, false, function () { // Y key
//    if (!Editing || Object === null) return;
   
//    let rot = Object.getRotation(2);

//    mp.events.callRemote("server:acceptEditFurniture", Object.model, Object.position.x, Object.position.y, Object.position.z, rot.x, rot.y, rot.z);
   
//    Object.destroy();
//    Object = null;
//    Editing = false;
//    mp.gui.chat.push("[DEBUG] Edit finished, furniture placed");
// });

// mp.keys.bind(0x4E, false, function () { // N key
//    if (!Editing) return;
//    Object?.destroy();
//    Object = null;
//    Editing = false;
//    //mp.events.callRemote("server:cancelEditFurniture");
//    mp.gui.chat.push("[DEBUG] Edit canceled");
// });

// mp.keys.bind(0x5A, false, function () { // Z key
//    if (!Editing || Object === null) return;
//    Object.placeOnGroundProperly();
//    UpdateObject();
//    mp.gui.chat.push("[DEBUG] Object placed on ground properly.");
// });

// mp.keys.bind(0x6B, false, function () { // Add key
//    if (!Editing) return;
//    moving_speed_idx++;
//    if (moving_speed_idx >= moving_speeds.length) moving_speed_idx = 0;
//    mp.gui.chat.push(`[DEBUG] Speed added ${moving_speed_idx}`);
// });

// mp.keys.bind(0x6D, false, function () { // Subtract key
//    if (!Editing) return;
//    moving_speed_idx--;
//    if (moving_speed_idx < 0) moving_speed_idx = moving_speeds.length - 1;
//    mp.gui.chat.push(`[DEBUG] Speed lowered ${moving_speed_idx}`);
// });

// mp.events.add('render', () => {
//     if (Object === null) return;

//     AddInstructionalStart();
//     AddInstructionalButton("Next mode", 197);
//     AddInstructionalButton("Previous mode", 196);
//     AddInstructionalButton("Moving an object", 194);
//     AddInstructionalButton("Moving an object", 195);
//     AddInstructionalButtonCustom("Increase speed", "t_+");
//     AddInstructionalButtonCustom("Decrease speed", "t_-");
// 	AddInstructionalButtonCustom("Place on ground", "t_Z");
//     AddInstructionalButtonCustom("Finish furniture", "t_Y");
//     AddInstructionalButtonCustom("Cancel", "t_N");
//     AddInstructionalEnd(1);

//    //  mp.game.graphics.drawText(`Editing mode: ${editing_types[editing_type_idx]}\nSpeed: ${moving_speeds[moving_speed_idx]}`, [0.5, 0.9], {
//    //      font: 0,
//    //      color: [255, 255, 255, 255],
//    //      scale: [0.5, 0.5],
//    //      outline: false
//    //  });
// });

// export {};
