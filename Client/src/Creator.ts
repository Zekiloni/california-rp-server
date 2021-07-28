

import { Browser } from './Browser';
import { Clothing_Components, Genders, Player_Models } from './Data/Player';
import { Lobby } from './Lobby';
import {  DisableMoving, PlayerPreviewCamera, RemoveClothing } from './Utils';
import Female_Torsos from './Data/Female_Torsos.json';
import Male_Torsos from './Data/Male_Torsos.json';

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
            Player.setHeading(0);
            mp.game.time.setClockTime(Info.Time, 0, 0);
            Player.freezePosition(true);
            mp.events.add('render', DisableMoving);
            RemoveClothing(Player);
            mp.game.ui.displayRadar(false);
            PlayerPreviewCamera(true);
         });
      },

      'CLIENT::CREATOR:FINISH': async (Character: object, Appearance: JSON, Clothing: JSON) => {
         const Created:boolean = await mp.events.callRemoteProc('SERVER::CREATOR:FINISH', Character, Appearance, Clothing);
         if (Created) { 
            Active = false;
            mp.events.remove('render', DisableMoving);
            Player.freezePosition(false);
            PlayerPreviewCamera(false);
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
         RemoveClothing(Player);
      },

      'CLIENT::CREATOR:HAIR': (Style: number, Color: number, Highlights: number) => {
         Player.setComponentVariation(2, Style, 0, 0)
         Player.setHairColor(Color, Highlights);
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
         Player.eyeColour = Color;
      },

      'client:player.character.creator:beard': (x: string) => {
         x = JSON.parse(x);
         Player.setHeadOverlay(1, parseInt(x[0]), 1.0, parseInt(x[1]), 0);
      },

      'client:player.character.creator:overlay': (i: number, e: number, x: number) => {
         Player.setHeadOverlay(i, e, 1.0, x, 0);
      },

      'client:player.character.creator:blend': (x: string) => {
         x = JSON.parse(x);
         Player.setHeadBlendData(parseInt(x[0]), parseInt(x[1]), 0, parseInt(x[2]), parseInt(x[3]), 0, parseFloat(x[4]), parseFloat(x[5]), 0, true);
      },

      'client:player.character.creator:clothing': (i: number, d: number) => {
         Player.setComponentVariation(i, d, 0, 2);
      }
   })

