
import { Browser } from '../browser';
import { controls } from '../data/enums';


export enum UI_Status {
   VISIBLE,
   ONLY_CHAT,
   HIDDEN
};


mp.events.add(
   {
      'CLIENT::NOTIFICATION': (message: string, type: number, time: number) => { 
         Browser.call('BROWSER::NOTIFICATION', message, type, time);
      }
   }
);


class gameUI { 

   status: UI_Status = UI_Status.HIDDEN;

   constructor () { 
      mp.events.add('render', this.GTA_HUD);

      mp.game.gameplay.setFadeOutAfterDeath(false); 

      mp.keys.bind(controls.F7, true, () => { 
         this.mainInterface(this.status ++);
      });
   }

   mainInterface (i: UI_Status) { 
      
      if (this.status > UI_Status.HIDDEN) this.status = UI_Status.HIDDEN;

      this.status = i;

      switch (this.status) { 
         case UI_Status.VISIBLE: {
            Browser.call('BROWSER::SHOW', 'GameInterface');
            Browser.call('BROWSER::SHOW', 'Chat');
            Browser.call('BROWSER::GAME_UI:PLAYER_ID', mp.players.local.remoteId);
            mp.events.add('render', this.updateMain);
            break;
         }

         case UI_Status.ONLY_CHAT: { 
            Browser.call('BROWSER::HIDE', 'GameInterface');
            mp.events.remove('render', this.updateMain);
            break;
         }

         case UI_Status.HIDDEN: { 
            Browser.call('BROSER::HIDE', 'Chat');
            break;
         }
      }
   }

   vehicleInterface (toggle: boolean) { 
      Browser.call('BROWSER::GAME_UI:VEHICLE:TOGGLE', toggle);
   }

   GTA_HUD () { 
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
      
      gameInterface.HIDE_CORSSAIR();
   }

   updateMain () { 
      const { x: x, y: y, z: z} = mp.players.local.position;
      const path = mp.game.pathfind.getStreetNameAtCoord(x, y, z, 0, 0);

      const zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(x, y, z));
      const street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
      const heading = gameInterface.whereHeaded(mp.players.local.getHeading());

      Browser.call('BROWSER::GAME_UI:UPDATE_PLAYERS', mp.players.length);
      Browser.call('BROWSER::GAME_UI:UPDATE_LOCATION', street, zone, heading);
   }

   updateMoney (i: number) { 
      Browser.call('BROWSER::GAME_UI:UPDATE_MONEY', i);
   }
   
   HIDE_CORSSAIR () { 
      const Weapon = mp.players.local.weapon;
      Weapon == 0x05FC3C11 || Weapon == 0x0C472FE2 || Weapon == 0xA914799 || Weapon == 0xC734385A || Weapon == 0x6A6C02E0 ? 
         (mp.game.ui.showHudComponentThisFrame(14)) : mp.game.ui.hideHudComponentThisFrame(14);
   }
   
   whereHeaded (h: number) { 
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

}

export const gameInterface = new gameUI();






