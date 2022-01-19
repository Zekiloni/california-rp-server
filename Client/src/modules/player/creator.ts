

import { Browser } from '../../browser';
import { Clothing_Components, Genders, Player_Models } from '../../data/Player';
import { lobby } from '../../Player/lobby';
import {  DisableMoving, PlayerPreviewCamera, removeClothing } from '../../utils';
import Female_Torsos from '../../data/FEMALE_TORSOS.json';
import Male_Torsos from '../../data/MALE_TORSOS.json';
import { Clothing_Combinations } from '../../data/Clothing_Combinations';
import { gameInterface, UI_Status } from '../game.UI';


const Player = mp.players.local;

let Active: boolean = false;

mp.events.add(
   {
      'CLIENT::CREATOR:START': () => {
         Active = true;
         mp.events.callRemoteProc('SERVER::CREATOR:INFO').then((Info) => { 
            lobby(false);
            Browser.call('BROWSER::SHOW', 'Creator');
            Player.position = Info.Position;
            Player.setHeading(0);
            Player.freezePosition(true);
            mp.game.audio.startAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
            mp.events.add('render', DisableMoving);
            removeClothing(Player);
            mp.game.ui.displayRadar(false);
            PlayerPreviewCamera(true);
         });
      },

      'CLIENT::CREATOR:FINISH': async (Character: string, Appearance: string) => {
         const Created: boolean = await mp.events.callRemoteProc('SERVER::CREATOR:FINISH', Character, Appearance);
         if (Created) { 
            Active = false;
            mp.events.remove('render', DisableMoving);
            Player.freezePosition(false);
            gameInterface.mainInterface(UI_Status.VISIBLE);
            PlayerPreviewCamera(false);
            mp.game.audio.stopAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
            Browser.call('BROWSER::HIDE', 'Creator');
         } 

      },

      'CLIENT::CREATOR:BLEND': (shapeM: number, shapeF: number, skinM: number, skinF: number, shapeMix: number, skinMix: number) => { 
         Player.setHeadBlendData(shapeM, shapeF, 0, skinM, skinF, 0, shapeMix, skinMix, 0, true);
      },

      'CLIENT::CREATOR:FACE': (i: number, value: number) => { 
         Player.setFaceFeature(i, value);
      },

      'CLIENT::CREATOR:GENDER': (x: number) => {
         Player.model = Player_Models[x];
         removeClothing(Player);
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

      'CLIENT::CREATOR:EYES_COLOR': (color: number) => {
         Player.setEyeColor(color);
      },

      'CLIENT::CREATOR:BEARD': (style: number, color: number) => {
         Player.setHeadOverlay(1, style, 1.0, color, 0);
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

