import { Browser } from '../browser';
import controls from '../enums/controls';


export enum UI_Status {
   VISIBLE,
   ONLY_CHAT,
   HIDDEN
};

export let gameIStatus: UI_Status = UI_Status.HIDDEN;

mp.game.gameplay.setFadeOutAfterDeath(false); 

mp.events.add(
   {
      'CLIENT::NOTIFICATION': (message: string, type: number, time: number) => { 
         Browser.call('BROWSER::NOTIFICATION', message, type, time);
      },

      'CLIENT::HINT': (key: string, message: string, time: number) => {
         Browser.call('BROWSER::HINT', key, message, time);
      },

      'CLIENT::HELP': (message: string, time: number) => {
         Browser.call('BROWSER::HELP', message, time);
      },

      'CLIENT::CHAT_CLEAR': () => {
         Browser.call('chat:clear');
      },

      'render': hideDefault
   }
);

mp.keys.bind(controls.F7, true, () => { 
   toggleGameInterface(gameIStatus ++);
});


export function toggleGameInterface (i: UI_Status) {
   gameIStatus = i;

   if (gameIStatus > UI_Status.HIDDEN) {
      gameIStatus = UI_Status.HIDDEN;
   }

   switch (gameIStatus) { 
      case UI_Status.VISIBLE: {
         Browser.call('BROWSER::SHOW', 'gameInterface');
         Browser.call('BROWSER::SHOW', 'chat');
         Browser.call('BROWSER::GAME_UI:PLAYER_ID', mp.players.local.remoteId);
         mp.events.add('render', updateMainInterface);
         mp.game.ui.displayRadar(true);
         break;
      }

      case UI_Status.ONLY_CHAT: { 
         Browser.call('BROWSER::HIDE', 'gameInterface');
         mp.events.remove('render', updateMainInterface);
         mp.game.ui.displayRadar(false);
         break;
      }

      case UI_Status.HIDDEN: { 
         Browser.call('BROWSER::HIDE', 'gameInterface');
         mp.events.remove('render', updateMainInterface);
         mp.game.ui.displayRadar(false);
         Browser.call('BROSER::HIDE', 'chat');
         break;
      }
   }
}


function updateMainInterface () { 
   const { x: x, y: y, z: z} = mp.players.local.position;
   const path = mp.game.pathfind.getStreetNameAtCoord(x, y, z, 0, 0);

   const zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(x, y, z));
   const street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
   const heading = getHeading(mp.players.local.getHeading());

   Browser.call('BROWSER::GAME_UI:UPDATE_PLAYERS', mp.players.length);
   Browser.call('BROWSER::GAME_UI:UPDATE_LOCATION', street, zone, heading);
}


function hideDefault () {
   mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
   mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
   mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
   mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
   mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
   mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
   mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
   mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS

   mp.game.invoke('0x9E4CFFF989258472'); // Anti AFK CAM
   mp.game.invoke('0xF4F2C0D4EE209E20'); // Anti shake cam
   
   hideCrosshair();
};


function hideCrosshair () { 
   const Weapon = mp.players.local.weapon;
   Weapon == 0x05FC3C11 || Weapon == 0x0C472FE2 || Weapon == 0xA914799 || Weapon == 0xC734385A || Weapon == 0x6A6C02E0 ? 
      (mp.game.ui.showHudComponentThisFrame(14)) : mp.game.ui.hideHudComponentThisFrame(14);
}


export function vehicleInterface (toggle: boolean) { 
   Browser.call('BROWSER::GAME_UI:VEHICLE:TOGGLE', toggle);
}

export function updatePlayerMoney (i: number) { 
   Browser.call('BROWSER::GAME_UI:UPDATE_MONEY', i);
}


export function temporaryHideInterface (hide: boolean) {
   mp.game.ui.displayRadar(!hide);
   mp.gui.chat.activate(!hide);
   Browser.call('BROWSER::GAME_UI:HIDDEN', hide);
}

mp.events.add('CLIENT::GAME_UI:HIDDEN', temporaryHideInterface);

function getHeading (h: number) { 
   switch (true) {
      case (h < 30): return 'N'; 
      case (h < 90): return 'NW'; 
      case (h < 135): return 'W';
      case (h < 180): return 'SW';
      case (h < 225): return 'S';
      case (h < 270): return 'SE';
      case (h < 315): return 'E'; 
      case (h < 360): return 'NE';
      default: return 'N';
   }
}


