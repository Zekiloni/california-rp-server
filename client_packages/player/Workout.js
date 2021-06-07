const Player = mp.players.local,
      PushUps = "PROP_HUMAN_MUSCLE_CHIN_UPS_PRISON",
      MuscleFlex = "WORLD_HUMAN_MUSCLE_FLEX",
      FreeWeight = "WORLD_HUMAN_MUSCLE_FREE_WEIGHTS";

const WorkOutsPosition = 
[
	[ PushUps, -1200.0215, -1571.1099, 4.609491,  -142.87233],
   [ PushUps, -1253.491, -1601.6979, 4.145817, -146.83147],
   [ PushUps, -1252.6029, -1603.16, 4.121914, -146.75699],
   [ PushUps, -1251.3278, -1604.863, 4.136363, -147.14659],
   [ PushUps, -1225.2164, -1600.3909, 4.1673646, -92.69842]
];

let isTraining = false,
    workout = null,
    lpWorkout = null;

mp.keys.bind(0x59, false, function() { // Y
   if (Player.logged && Player.spawned) { 
      if (Player.vehicle || Player.cuffed || Player.isTypingInTextChat || lpWorkout == null) return;
      isTraining = !isTraining;
   }
});

setInterval(() => {
   if (isTraining && workout == null) {
      for(var c=0; c < WorkOutsPosition.length; c++) {
         if (mp.game.system.vdist(Player.position.x, Player.position.y, Player.position.z, WorkOutsPosition[c][1], WorkOutsPosition[c][2], WorkOutsPosition[c][3]) <= 0.3) {
            Player.taskStartScenarioAtPosition(WorkOutsPosition[c][0], WorkOutsPosition[c][1], WorkOutsPosition[c][2], WorkOutsPosition[c][3], WorkOutsPosition[c][4], 0, 1, 1);
            workout = c;
            break;
         }
      }
   }
   else { Player.stopAnimation(); lpWorkout = null; workout = null;}
}, 1000);

setTimeout(() => {
   for(var c=0; c < WorkOutsPosition.length; c++) {
		var newShape = mp.colshapes.newSphere(WorkOutsPosition[i][1], WorkOutsPosition[i][2], WorkOutsPosition[i][3], 0.5);
		newShape.workout = i;
	}
}, 1000);



mp.events.add({
   /*'render': () => { 

      
      if(mp.game.controls.isDisabledControlJustReleased(0, 24) && isTraining &&!mp.gui.cursor.visible) { // Left Click
         
      }

   },*/

   'playerEnterColshape': (shape) => {
      if (shape.workout != null) {
         lpWorkout = shape;
         mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
         mp.game.graphics.notify(`Pritisnite ~b~Y~s~ da započnete ili zaustavite vežbanje.`);
      }
   }, 

   'playerExitColshape': (shape) => {
      if (lpWorkout != null) {
         lpWorkout = null;
      }
   }

})