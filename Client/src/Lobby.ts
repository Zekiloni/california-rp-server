import { Browser } from "./Browser";


const Player = mp.players.local;


mp.events.add(
   {
      'playerReady': async () => {
         const Info = await mp.events.callRemoteProc('SERVER::PLAYER:LOBY');
         Lobby(true, Info.Position, Info.LookAt);
      },

      'CLIENT::AUTHORIZATION:PLAY': (Character: number) => { 
         Lobby(false);
         mp.events.callRemote('SERVER::CHARACTER:PLAY', Character);
         Browser.call('BROWSER::SHOW', 'Chat');
      }
   }
);


mp.events.addProc(
   {
      'CLIENT:AUTHORIZATION:SEND_CREDENTIALS': async (Username: string, Password: string) => { 
         const Response = await mp.events.callRemoteProc('SERVER::AUTHORIZATION:VERIFY', Username, Password);
         return JSON.stringify(Response);
      }
   }
);


let Camera: CameraMp;


export function Lobby (Toggle: boolean, Position?: Vector3Mp, LookAt?: Vector3Mp) { 
   if (Toggle && Position && LookAt) { 
      Player.position = new mp.Vector3(Position.x, Position.y + 1, Position.z);
      Player.freezePosition(true);
      Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true)
      Camera.setCoord(Position.x, Position.y, Position.z);
      Camera.pointAtCoord(LookAt.x, LookAt.y, LookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      mp.game.ui.displayRadar(false);
      mp.game.graphics.transitionToBlurred(1000)
   } else { 
      Browser.call('BROWSER::HIDE', 'Authorization');
      if (Camera) Camera.destroy();
      Player.freezePosition(false);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.game.ui.displayRadar(true);
      mp.game.graphics.transitionFromBlurred(1000)
   }
}