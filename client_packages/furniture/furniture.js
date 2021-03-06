
// uraditi provere da li je chat otvoren

var moving_speeds = [0.01, 0.1, 1.0, 5.0, 10.0];
var moving_speed_idx = 0;

var editing_types = ["X pozicija", "Y pozicija", "Visina", "X Rot", "Y Rot", "Rotiranje"];
var editing_type_idx = 0;

global.editing = false;
var object = null;

mp.events.add("client:startEditingFurniture", function (model) {
   object = mp.objects.new(mp.game.joaat(model), new mp.Vector3(localplayer.position.x+1, localplayer.position.y+1, localplayer.position.z-0.5), 
       {
           rotation: new mp.Vector3(0, 0, 0),
           alpha: 255,
           dimension: localplayer.dimension
       });
   editing = true;
});

mp.events.add("client:endEditingFurniture", function () {
   object.destroy();
   object = null;
   editing = false;
});

function UpdateObject() {
   if (object == null) return;
   var model = object.model;
   var position = object.position;
   var rot = object.getRotation(2);
   var pitch = object.getPitch();
   object.destroy();
   object = mp.objects.new(model, position,
       {
           rotation: new mp.Vector3(0, 0, 0),
           alpha: 255,
           dimension: localplayer.dimension
       });
   object.setRotation(pitch, rot.y, rot.z, 2, true);
}

mp.keys.bind(0x26, false, function () { // UP Arrow
   if (!editing) return; // uraditi proveru i da li je chat otvoren
   switch (editing_type_idx) {
       // pos x
       case 0:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x + moving_speeds[moving_speed_idx], pos.y, pos.z);
           break;
       // pos y
       case 1:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x, pos.y + moving_speeds[moving_speed_idx], pos.z);
           break;
       // pos z
       case 2:
           var pos = object.position;
           object.position = new mp.Vector3(pos.x, pos.y, pos.z + moving_speeds[moving_speed_idx]);
           break;
       // rot x
       case 3:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
           object.setRotation(pitch + moving_speeds[moving_speed_idx], rot.y, rot.z, 2, true);
           break;
       // rot y
       case 4:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
           object.setRotation(pitch, rot.y + moving_speeds[moving_speed_idx], rot.z, 2, true);
           break;
       // rot z
       case 5:
           var rot = object.getRotation(2);
           var pitch = object.getPitch();
           object.setRotation(pitch, rot.y, rot.z + moving_speeds[moving_speed_idx], 2, true);
           break;
   }
   UpdateObject();
});

mp.keys.bind(0x25, false, function () { // LEFT Arrow
   if (chatActive || !editing) return;
   editing_type_idx--;
   if (editing_type_idx < 0) editing_type_idx = editing_types.length - 1;
});

mp.keys.bind(0x27, false, function () { // RIGHT Arrow
   if (chatActive || !editing) return;
   editing_type_idx++;
   if (editing_type_idx >= editing_types.length) editing_type_idx = 0;
});

mp.keys.bind(0x59, false, function () { // Y key
   if (chatActive || !editing) return;
   var rot = object.getRotation(2);
   var pitch = object.getPitch();
   var position = new mp.Vector3(object.position.x.toFixed(3), object.position.y.toFixed(3), object.position.z.toFixed(3));
   var rotation = new mp.Vector3(rot.x.toFixed(2), rot.y.toFixed(2), rot.z.toFixed(2));
   mp.events.callRemote("server:acceptEditFurniture", position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
   object.destroy();
   object = null;
   editing = false;
});

mp.keys.bind(0x4E, false, function () { // N key
   if (chatActive || !editing) return;
   object.destroy();
   object = null;
   editing = false;
   mp.events.callRemote("server:cancelEditFurniture");
});

mp.keys.bind(0x6B, false, function () { // Add key
   if (chatActive || !editing) return;
   moving_speed_idx++;
   if (moving_speed_idx >= moving_speeds.length) moving_speed_idx = 0;
});

mp.keys.bind(0x6D, false, function () { // Subtract key
   if (chatActive || !editing) return;
   moving_speed_idx--;
   if (moving_speed_idx < 0) moving_speed_idx = moving_speeds.length - 1;
});