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
   waypoint = position;
};

mp.keys.bind(controls.KEY_E, true, function () {
   if (waypoint) {
      mp.players.local.position = waypoint;

      const z = mp.game.gameplay.getGroundZFor3dCoord(waypoint.x, waypoint.y, waypoint.z + 100, 0.0, false);
      waypoint = new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, z + 1);

      mp.events.callRemote('SERVER::PLAYER:POSITION', waypoint);
      mp.gui.chat.push('tp')
      waypoint = null;
   }
});
