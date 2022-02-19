

import { Browser } from '../../browser';
import { playerModels } from '../../data/Player';
import { lobby } from './lobby';
import { disableMoving, getBestTorso, playerPreviewCamera, removeClothing } from '../../utils';
import { toggleGameInterface, UI_Status } from '../game.UI';
import { clothingComponents } from '../../enums/clothing';


class CharacterCreator {
   static active: boolean = false;

   static start () { 
      CharacterCreator.active = true;
      mp.events.callRemoteProc('SERVER::CREATOR:INFO').then(async (info) => { 
         lobby(false);
         Browser.call('BROWSER::SHOW', 'characterCreator');

         mp.players.local.position = info.position;
         mp.players.local.setHeading(0);
         mp.players.local.freezePosition(true);

         removeClothing(mp.players.local);
         mp.events.add('render', disableMoving);
         playerPreviewCamera(true);
      });
   }

   static async finish (character: string, appearance: string) { 
      const isCreated = await mp.events.callRemoteProc('SERVER::CREATOR:FINISH', character, appearance);

      if (isCreated) { 
         CharacterCreator.active = false;
         
         mp.events.remove('render', disableMoving);
         mp.players.local.freezePosition(false);
         toggleGameInterface(UI_Status.VISIBLE);
         playerPreviewCamera(false);
         Browser.call('BROWSER::HIDE', 'characterCreator');
      } 
   }

   static changeGender (gender: number) { 
      mp.players.local.model = playerModels[gender];
      removeClothing(mp.players.local);
   }

   static changeBlend (shapeM: number, shapeF: number, skinM: number, skinF: number, shapeMix: number, skinMix: number) {
      mp.players.local.setHeadBlendData(shapeM, shapeF, 0, skinM, skinF, 0, shapeMix, skinMix, 0, true);
   }

   static changeFaceStructure (i: number, value: number) {
      mp.players.local.setFaceFeature(i, value);
   }

   static changeHair (style: number, color: number, highlight: number) {
      if (style == 23) style = 24;
      mp.players.local.setComponentVariation(2, style, 0, 0)
      mp.players.local.setHairColor(color, highlight);
   }

   static changeOverlay (id: number, index: number) {
      mp.players.local.setHeadOverlay(id, index, 1.0, 0, 0);
   }

   static changeEyeColor (color: number) { 
      mp.players.local.setEyeColor(color);
   }

   static changeBeard (style: number, color: number) { 
      mp.players.local.setHeadOverlay(1, style, 1.0, color, 0);
   }

   static changeClothing (outfit: string) { 

      outfit = JSON.parse(outfit);

      const components = [11, 8, 4, 6];
      
      components.forEach((component, i) => { 
         mp.players.local.setComponentVariation(component, parseInt(outfit[i]), 0, 2);
      });

      const bestTorso = getBestTorso();
      
      if (bestTorso && bestTorso != -1) {
         mp.players.local.setComponentVariation(clothingComponents.TORSO, bestTorso!, 0, 2);
      }
   }
};


mp.events.add(
   {
      'CLIENT::CREATOR:START': CharacterCreator.start,
      'CLIENT::CREATOR:FINISH': CharacterCreator.finish,
      'CLIENT::CREATOR:BLEND': CharacterCreator.changeBlend,
      'CLIENT::CREATOR:GENDER': CharacterCreator.changeGender,
      'CLIENT::CREATOR:HAIR': CharacterCreator.changeHair,
      'CLIENT::CREATOR:FACE': CharacterCreator.changeFaceStructure,
      'CLIENT::CREATOR:OVERLAY': CharacterCreator.changeOverlay,
      'CLIENT::CREATOR:CLOTHING': CharacterCreator.changeClothing,
      'CLIENT::CREATOR:EYES_COLOR': CharacterCreator.changeEyeColor,
      'CLIENT::CREATOR:BEARD': CharacterCreator.changeBeard
   }
);

