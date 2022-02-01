import { Browser } from '../../browser';
import { gameInterface, UI_Status } from '../game.UI';


let Camera: CameraMp;


mp.events.add(
   {
      'playerReady': async () => {
         const info = await mp.events.callRemoteProc('SERVER::PLAYER:LOBY');
         lobby(true, info.position, info.look_At);
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


export function lobby (toggle: boolean, position?: Vector3Mp, lookAt?: Vector3Mp) { 
   mp.console.logInfo(JSON.stringify(toggle))
   mp.console.logInfo(JSON.stringify(position))
   mp.console.logInfo(JSON.stringify(lookAt))

   if (toggle && position && lookAt) { 
      mp.players.local.position = new mp.Vector3(position.x, position.y + 1, position.z);
      mp.players.local.freezePosition(true);
      Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true)
      Camera.setCoord(position.x, position.y, position.z);
      mp.console.logInfo('toggle true')
      Camera.pointAtCoord(lookAt.x, lookAt.y, lookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      mp.game.ui.displayRadar(false);
      mp.game.graphics.transitionToBlurred(1000);
      mp.game.audio.startAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
   } else { 
      mp.console.logInfo('toggle false')
      Browser.call('BROWSER::HIDE', 'lobby');
      if (Camera) Camera.destroy();
      mp.players.local.freezePosition(false);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.game.graphics.transitionFromBlurred(1000);
      mp.game.audio.stopAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
   }
}