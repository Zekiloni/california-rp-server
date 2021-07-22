

const Player:PlayerMp = mp.players.local;


mp.events.add({
   'playerReady': () => {
      mp.events.callRemoteProc('SERVER::PLAYER:LOBY').then((Info) => { 
         Lobby(true, Info.Position, Info.LookAt);
      });
   }
});

mp.events.addProc({
   'CLIENT:AUTHORIZATION:SEND_CREDENTIALS': (Username: string, Password: string) => { 
      mp.events.callRemoteProc('SERVER::AUTHORIZATION:VERIFY', Username, Password);
   }
})


let Camera: CameraMp;

export function Lobby (Toggle: boolean, Position: Vector3Mp, LookAt: Vector3Mp) { 
   if (Toggle) { 
      Player.position = new mp.Vector3(Position.x, Position.y + 1, Position.z);
      Player.freezePosition(true);
      Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true)
      Camera.setCoord(Position.x, Position.y, Position.z);
      Camera.pointAtCoord(LookAt.x, LookAt.y, LookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      mp.game.ui.displayRadar(false);
   } else { 
      if (Camera) Camera.destroy();
      Player.freezePosition(false);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.game.ui.displayRadar(true);
   }
}