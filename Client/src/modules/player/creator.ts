

import { Browser } from '../../browser';
import { Genders, Player_Models } from '../../data/Player';
import { lobby } from '../../Player/lobby';
import { disableMoving, playerPreviewCamera, removeClothing } from '../../utils';
import femaleTorsos from '../../data/FEMALE_TORSOS.json';
import maleTorsos from '../../data/MALE_TORSOS.json';
import { gameInterface, UI_Status } from '../game.UI';
import { clothingComponents } from '../../enums/clothing';



class characterCreator {
   static active: boolean = false;

   static start () { 
      characterCreator.active = true;
      mp.events.callRemoteProc('SERVER::CREATOR:INFO').then(async (Info) => { 
         lobby(false);
         Browser.call('BROWSER::SHOW', 'Creator');
         player.position = Info.Position;
         player.setHeading(0);
         player.freezePosition(true);
         mp.game.audio.startAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
         mp.events.add('render', disableMoving);
         removeClothing(player);
         mp.game.ui.displayRadar(false);
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
      mp.players.local.model = Player_Models[gender];
      removeClothing(mp.players.local);
   }

   static changeBlend (shapeM: number, shapeF: number, skinM: number, skinF: number, shapeMix: number, skinMix: number) {
      player.setHeadBlendData(shapeM, shapeF, 0, skinM, skinF, 0, shapeMix, skinMix, 0, true);

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

   static changeClothing (component: number, drawable: number) { 
      mp.players.local.setComponentVariation(component, drawable, 0, 2);

      if (component == clothingComponents.Top) { 
         const gender = Genders[player.model];
         
         switch (gender) { 
            case '0': { 
               if (maleTorsos[String(drawable) as keyof typeof maleTorsos] != undefined || maleTorsos[String(drawable) as keyof typeof maleTorsos][0] != undefined) {
                  const Torso = maleTorsos[String(drawable) as keyof typeof maleTorsos][0].BestTorsoDrawable;
                  if (Torso != -1) player.setComponentVariation(clothingComponents.Torso, Torso, 0, 2);
               }
               break;
            }

            case '1': {
               if (femaleTorsos[String(drawable) as keyof typeof femaleTorsos] != undefined || femaleTorsos[String(drawable) as keyof typeof femaleTorsos][0] != undefined) {
                  const Torso = femaleTorsos[String(drawable) as keyof typeof femaleTorsos][0].BestTorsoDrawable;
                  if (Torso != -1) player.setComponentVariation(clothingComponents.Torso, Torso, 0, 2);
               }
               break;
            }
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

