
import { Browser } from './Browser';

const Player = mp.players.local;

enum UI_Status {
   Full_Visible,
   Only_Chat,
   Chat_Hidden,
   Fully_Hidden
};


mp.events.add(
   {
      'CLIENT::NOTIFICATION': (Message: string, Type: number, Time: number) => { 
         Browser.call('BROWSER::NOTIFICATION', Message, Type, Time);
      }
   }
);


class GAME_UI { 

   Vehicle_UI: boolean = false;
   Weapon_UI: boolean = false;
   Status: UI_Status = UI_Status.Fully_Hidden;

   constructor () { 
      mp.events.add('render', this.GTA_HUD);
   }

   Toggle () { 
      this.Status ++;
      if (this.Status > UI_Status.Fully_Hidden) this.Status = 0;

      switch (true) { 
         case this.Status == UI_Status.Full_Visible: {
            mp.events.add('render', this.MainInterface);
            break;
         }
      }
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

      mp.game.invoke('0x9E4CFFF989258472');
      mp.game.invoke('0xF4F2C0D4EE209E20');
      
      GameInterface.HIDE_CORSSAIR();
   }

   MainInterface () { 

      const { x: x, y: y, z: z} = Player.position;
      const path = mp.game.pathfind.getStreetNameAtCoord(x, y, z, 0, 0);

      const Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(x, y, z));
      const Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
      const Heading = this.Headed(Player.getHeading());
      
   }
   
   HIDE_CORSSAIR () { 
      const Weapon = Player.weapon;
      Weapon == 0x05FC3C11 || Weapon == 0x0C472FE2 || Weapon == 0xA914799 || Weapon == 0xC734385A || Weapon == 0x6A6C02E0 ? 
         (mp.game.ui.showHudComponentThisFrame(14)) : mp.game.ui.hideHudComponentThisFrame(14);
   }
   
   Headed (H: number) { 
      switch (true) {
         case (H < 30): return 'N'; 
         case (H < 90): return 'NW'; 
         case (H < 135): return 'W';
         case (H < 180): return 'SW';
         case (H < 225): return 'S';
         case (H < 270): return 'SE';
         case (H < 315): return 'E'; 
         case (H < 360): return 'NE';
         default: return 'N';
      }
   }

}

const GameInterface = new GAME_UI();

export default GameInterface;





