import controls from "../../../enums/controls";


let waypoint: Vector3Mp | null = null;

mp.events.add(RageEnums.EventKey.PLAYER_CREATE_WAYPOINT, waypointCheck);
mp.events.add(RageEnums.EventKey.PLAYER_REMOVE_WAYPOINT, removeWayPoint);

function removeWayPoint () {
   if (mp.players.local.getVariable('ADMINISTRATOR') < 2) {
      return;
   }
   
   waypoint = null;
}

function waypointCheck (position: Vector3Mp)  {
   if (mp.players.local.getVariable('ADMINISTRATOR') < 2) {
      return;
   }

   mp.events.call('CLIENT::HINT', 'e', 'Waypoint Teleport', 4);
   waypoint = position;
   setTimeout(() => {
      if (waypoint) {
         waypoint = null;
      }
   }, 5000);
};

mp.keys.bind(controls.KEY_E, true, function () {
   if (waypoint) {

      if (mp.players.local.isTypingInTextChat) {
         return;
      }

      mp.players.local.position = waypoint;
      mp.game.wait(5)
      const z = mp.game.gameplay.getGroundZFor3dCoord(waypoint.x, waypoint.y, waypoint.z + 100, 0.0, false);
      waypoint = new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, z + 1);

      mp.events.callRemote('SERVER::PLAYER:POSITION', waypoint);
      waypoint = null;
   }
});
