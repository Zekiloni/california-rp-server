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

   mp.events.call('CLIENT::HINT', 'E', 'Waypoint Teleport', 3);

   const z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z + 100, 0.0, false);

   waypoint!.z = z +1;
};

mp.keys.bind(controls.KEY_E, true, function () {
   if (waypoint) {
      mp.events.call('SERVER::PLAYER:POSITION', waypoint);
      waypoint = null;
   }
});
