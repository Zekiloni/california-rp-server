import { Browser } from '../browser';
import { gameInterface, UI_Status } from '../game.UI';


const Player = mp.players.local;

let Camera: CameraMp;


mp.events.add(
   {
      'playerReady': async () => {
         const Info = await mp.events.callRemoteProc('SERVER::PLAYER:LOBY');
         Lobby(true, Info.Position, Info.LookAt, Info.Time);
      },

      'CLIENT::CHARACTER:PLAY': (character: number, spawnPoint: number) => { 
         Lobby(false);
         Browser.call('BROWSER::SHOW', 'Chat');
         mp.events.callRemote('SERVER::CHARACTER:PLAY', character, spawnPoint);
         gameInterface.toggle(UI_Status.Full_Visible);
      }
   }
);


mp.events.addProc(
   {
      'CLIENT::AUTHORIZATION:SEND': async (username: string, password: string) => { 
         const accountInfo = await mp.events.callRemoteProc('SERVER::AUTHORIZATION:VERIFY', username, password);
         return JSON.stringify(accountInfo);
      },

      'CLIENT::CHARACTER:SPAWNS': async (id: number) => { 
         const spawnPoints = await mp.events.callRemoteProc('SERVER::CHARACTER:SPAWNS', id);
         return JSON.stringify(spawnPoints);
      }
   }
);


export function Lobby (Toggle: boolean, Position?: Vector3Mp, LookAt?: Vector3Mp, Time?: number) { 
   if (Toggle && Position && LookAt && Time) { 
      Player.position = new mp.Vector3(Position.x, Position.y + 1, Position.z);
      Player.freezePosition(true);
      Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true)
      Camera.setCoord(Position.x, Position.y, Position.z);
      mp.game.time.setClockTime(Time, 0, 0);
      Camera.pointAtCoord(LookAt.x, LookAt.y, LookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      mp.game.ui.displayRadar(false);
      mp.game.graphics.transitionToBlurred(1000)
   } else { 
      Browser.call('BROWSER::HIDE', 'Lobby');
      if (Camera) Camera.destroy();
      Player.freezePosition(false);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.game.ui.displayRadar(true);
      mp.game.graphics.transitionFromBlurred(1000)
   }
}