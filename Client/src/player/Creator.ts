

import { Browser } from '../browser';
import { Clothing_Components, Genders, Player_Models } from '../data/Player';
import { Lobby } from './lobby';
import {  DisableMoving, PlayerPreviewCamera, removeClothing } from '../utils';
import Female_Torsos from '../data/FEMALE_TORSOS.json';
import Male_Torsos from '../data/MALE_TORSOS.json';
import { Clothing_Combinations } from '../data/Clothing_Combinations';


const Player = mp.players.local;

let Active: boolean = false;

mp.events.add(
   {
      'CLIENT::CREATOR:START': () => {
         Active = true;
         mp.events.callRemoteProc('SERVER::CREATOR:INFO').then((Info) => { 
            Lobby(false);
            Browser.call('BROWSER::SHOW', 'Creator');
            Player.position = Info.Position;
            Browser.call('BROWSER::CREATOR:TOPS', JSON.stringify(Clothing_Combinations[0]));
            Player.setHeading(0);
            mp.game.time.setClockTime(Info.Time, 0, 0);
            Player.freezePosition(true);
            mp.events.add('render', DisableMoving);
            removeClothing(Player);
            mp.game.ui.displayRadar(false);
            PlayerPreviewCamera(true);
         });
      },

      'CLIENT::CREATOR:FINISH': async (Character: string, Appearance: string) => {
         const Created: boolean = await mp.events.callRemoteProc('SERVER::CREATOR:FINISH', Character, Appearance);
         mp.console.logInfo("nije proso", true, true); // When pressing F11, you should now see a message saying "example"
         if (Created) { 
            mp.console.logInfo("kreiran", true, true); // When pressing F11, you should now see a message saying "example"
            Active = false;
            mp.events.remove('render', DisableMoving);
            Player.freezePosition(false);
            PlayerPreviewCamera(false);
            Browser.call('BROWSER::HIDE', 'Creator');
         } 

      },

      'CLIENT::CREATOR:BLEND': (shapeM: number, shapeF: number, skinM: number, skinF: number, shapeMix: number, skinMix: number) => { 
         Player.setHeadBlendData(shapeM, shapeF, 0, skinM, skinF, 0, shapeMix, skinMix, 0, true);
      },

      'CLIENT::CREATOR:FACE': (Index: number, Value: number) => { 
         Player.setFaceFeature(Index, Value);
      },

      'CLIENT::CREATOR:GENDER': (x: number) => {
         Player.model = Player_Models[x];
         removeClothing(Player);
         // Browser.call('BROWSER::CREATOR:TOPS', JSON.stringify(Clothing_Combinations[0]));
      },

      'CLIENT::CREATOR:HAIR': (Style: number, Color: number, Highlights: number) => {
         if (Style == 23) Style = 24;
         Player.setComponentVariation(2, Style, 0, 0)
         Player.setHairColor(Color, Highlights);
      },

      'CLIENT::CREATOR:OVERLAY': (i: number, e: number, x: number) => {
         Player.setHeadOverlay(i, e, 1.0, 0, 0);
      },

      'CLIENT::CREATOR:CLOTHING': (Component: number, Drawable: number) => { 
         Player.setComponentVariation(Component, Drawable, 0, 2);
         if (Component == Clothing_Components.Top) { 
            const Gender = Genders[Player.model];
            
            switch (Gender) { 
               case '0': { 
                  if (Male_Torsos[String(Drawable) as keyof typeof Male_Torsos] != undefined || Male_Torsos[String(Drawable) as keyof typeof Male_Torsos][0] != undefined) {
                     const Torso = Male_Torsos[String(Drawable) as keyof typeof Male_Torsos][0].BestTorsoDrawable;
                     if (Torso != -1) Player.setComponentVariation(Clothing_Components.Torso, Torso, 0, 2);
                  }
                  break;
               }

               case '1': {
                  if (Female_Torsos[String(Drawable) as keyof typeof Female_Torsos] != undefined || Female_Torsos[String(Drawable) as keyof typeof Female_Torsos][0] != undefined) {
                     const Torso = Female_Torsos[String(Drawable) as keyof typeof Female_Torsos][0].BestTorsoDrawable;
                     if (Torso != -1) Player.setComponentVariation(Clothing_Components.Torso, Torso, 0, 2);
                  }
                  break;
               }
            }
         }
      },

      'CLIENT::CREATOR:EYES_COLOR': (Color: number) => {
         Player.setEyeColor(Color);
      },

      'CLIENT::CREATOR:BEARD': (Style: number, Color: number) => {
         Player.setHeadOverlay(1, Style, 1.0, Color, 0);
      }
   }
);

mp.events.addProc(
   {
      'CLIENT::TOP:COMBINATIONS': (Gender: number, Top: number) => { 
         return Clothing_Combinations[Gender][Top];
      }
   }
);

