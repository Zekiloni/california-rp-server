

import { Browser } from '../../browser';
import { Genders, playerModels } from '../../data/Player';
import { lobby } from '../../Player/lobby';
import { disableMoving, playerPreviewCamera, removeClothing } from '../../utils';
import femaleTorsos from '../../data/FEMALE_TORSOS.json';
import maleTorsos from '../../data/MALE_TORSOS.json';
import { gameInterface, UI_Status } from '../game.UI';
import { clothingComponents } from '../../enums/clothing';
import { PedGender } from '../../enums/ped';



class characterCreator {
   static active: boolean = false;

   static start () { 
      characterCreator.active = true;
      mp.events.callRemoteProc('SERVER::CREATOR:INFO').then(async (Info) => { 

         lobby(false);
         Browser.call('BROWSER::SHOW', 'Creator');

         mp.players.local.position = Info.Position;
         mp.players.local.setHeading(0);
         mp.players.local.freezePosition(true);

         removeClothing(mp.players.local);

         mp.game.ui.displayRadar(false);
         mp.events.add('render', disableMoving);
         playerPreviewCamera(true);
         
      });
   }

   static async finish (character: string, appearance: string) { 
      const isCreated: boolean = await mp.events.callRemoteProc('SERVER::CREATOR:FINISH', character, appearance);
      if (isCreated) { 
         characterCreator.active = false;
         mp.events.remove('render', disableMoving);
         mp.players.local.freezePosition(false);
         gameInterface.mainInterface(UI_Status.VISIBLE);
         playerPreviewCamera(false);
         mp.game.audio.stopAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
         Browser.call('BROWSER::HIDE', 'Creator');
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

      const drawable = mp.players.local.getDrawableVariation(clothingComponents.Top);

      const gender = Genders[mp.players.local.model];
      switch (gender) { 
         case PedGender.Male: { 
            if (maleTorsos[String(drawable) as keyof typeof maleTorsos] != undefined || maleTorsos[String(drawable) as keyof typeof maleTorsos][0] != undefined) {
               const Torso = maleTorsos[String(drawable) as keyof typeof maleTorsos][0].BestTorsoDrawable;
               if (Torso != -1) mp.players.local.setComponentVariation(clothingComponents.Torso, Torso, 0, 2);
            }
            break;
         }

         case PedGender.Female: {
            if (femaleTorsos[String(drawable) as keyof typeof femaleTorsos] != undefined || femaleTorsos[String(drawable) as keyof typeof femaleTorsos][0] != undefined) {
               const Torso = femaleTorsos[String(drawable) as keyof typeof femaleTorsos][0].BestTorsoDrawable;
               if (Torso != -1) mp.players.local.setComponentVariation(clothingComponents.Torso, Torso, 0, 2);
            }
            break;
         }
      }

   }
}


mp.events.add(
   {
      'CLIENT::CREATOR:START': characterCreator.start,
      'CLIENT::CREATOR:FINISH': characterCreator.finish,
      'CLIENT::CREATOR:BLEND': characterCreator.changeBlend,
      'CLIENT::CREATOR:GENDER': characterCreator.changeGender,
      'CLIENT::CREATOR:HAIR': characterCreator.changeHair,
      'CLIENT::CREATOR:FACE': characterCreator.changeFaceStructure,
      'CLIENT::CREATOR:OVERLAY': characterCreator.changeOverlay,
      'CLIENT::CREATOR:CLOTHING': characterCreator.changeClothing,
      'CLIENT::CREATOR:EYES_COLOR': characterCreator.changeEyeColor,
      'CLIENT::CREATOR:BEARD': characterCreator.changeBeard

   }
);

