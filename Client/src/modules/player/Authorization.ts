import { Browser } from '../../browser';
import { toggleGameInterface, UI_Status } from '../game.UI';


const authConfig = {
   position: new mp.Vector3(-1166.37, -1415.4, 6.92),
   lookAt: new mp.Vector3(-1183.94, -1426.47, 6.8)
}


let loginCamera: CameraMp | null = null;


export function lobby (toggle: boolean) {
   if (toggle) {
      Browser.call('BROWSER::SHOW', 'authorization');
      mp.players.local.position = authConfig.position;

      mp.players.local.freezePosition(true);
      mp.players.local.setAlpha(0);

      loginCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      loginCamera.setActive(true)
      loginCamera.setCoord(authConfig.position.x, authConfig.position.y, authConfig.position.z);
      loginCamera.pointAtCoord(authConfig.lookAt.x, authConfig.lookAt.y, authConfig.lookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);

      mp.game.ui.displayRadar(false);

      mp.game.audio.startAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
   } else {
      Browser.call('BROWSER::HIDE', 'authorization');

      if (loginCamera) 
         loginCamera.destroy();
      
      mp.game.cam.renderScriptCams(false, false, 0, false, false);

      mp.players.local.freezePosition(false);
      mp.players.local.setAlpha(255);
   }
}


function authorization (username: string, password: string) {
   return mp.events.callRemoteProc('SERVER::AUTHORIZATION:VERIFY', username, password).then(
      account => JSON.stringify(account)
   );
}


function selectCharacter (id: number) {
   return mp.events.callRemoteProc('SERVER::CHARACTER:SPAWNS', id).then(
      characterSpawns => JSON.stringify(characterSpawns)
   );
}


function play (character: number, spawnType: number, spawnID?: number) {
   lobby(false);

   mp.events.callRemote('SERVER::CHARACTER:PLAY', character, spawnType, spawnID);
   toggleGameInterface(UI_Status.VISIBLE);
}


mp.events.add('showPlayerAuthorization', lobby);
mp.events.add('clientCharacterPlay', play);
mp.events.addProc('clientAuthorizationSend', authorization);
mp.events.addProc('clientGetCharacterSpawns', selectCharacter);