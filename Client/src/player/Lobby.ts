import { Browser } from '../browser';
import { gameInterface, UI_Status } from '../modules/game.UI';



let Camera: CameraMp;


mp.events.add(
   {
      'playerReady': async () => {
         const Info = await mp.events.callRemoteProc('SERVER::PLAYER:LOBY');
         lobby(true, Info.Position, Info.LookAt, Info.Time);
      },

      'CLIENT::CHARACTER:PLAY': (character: number, spawnPoint: number) => { 
         lobby(false);
         mp.events.callRemote('SERVER::CHARACTER:PLAY', character, spawnPoint);
         gameInterface.mainInterface(UI_Status.VISIBLE);
      }
   }
);


mp.events.addProc(
   {
      'CLIENT::AUTHORIZATION:SEND': async (username: string, password: string) => { 
         const accountInfo = await mp.events.callRemoteProc('SERVER::AUTHORIZATION:VERIFY', username, password);
         mp.console.logInfo(JSON.stringify(accountInfo))
         return JSON.stringify(accountInfo);
      },

      'CLIENT::CHARACTER:SPAWNS': async (id: number) => { 
         const spawnPoints = await mp.events.callRemoteProc('SERVER::CHARACTER:SPAWNS', id);
         return JSON.stringify(spawnPoints);
      }
   }
);


export function lobby (Toggle: boolean, Position?: Vector3Mp, LookAt?: Vector3Mp, Time?: number) { 
   if (Toggle && Position && LookAt && Time) { 
      mp.players.local.position = new mp.Vector3(Position.x, Position.y + 1, Position.z);
      mp.players.local.freezePosition(true);
      Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true)
      Camera.setCoord(Position.x, Position.y, Position.z);
      Camera.pointAtCoord(LookAt.x, LookAt.y, LookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      mp.game.ui.displayRadar(false);
      mp.game.graphics.transitionToBlurred(1000);
      mp.game.audio.startAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
   } else { 
      Browser.call('BROWSER::HIDE', 'Lobby');
      if (Camera) Camera.destroy();
      mp.players.local.freezePosition(false);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.game.graphics.transitionFromBlurred(1000);
      mp.game.audio.stopAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
   }
}