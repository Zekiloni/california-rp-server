import { Browser } from '../../browser';
import { animationFlags } from '../../enums/animations.flags';
import controls from '../../enums/controls';
import { loadAnimation, waitForEntity } from '../../utils';
import { playAnimation } from '../player/animation';
import { inventoryActive } from './items.Core';


let phoneActive: boolean = false;
let phoneMouse: boolean = false;

const phoneModel = 'prop_npc_phone_02';
let phoneObjects = new Map<number, ObjectMp>();

const togglePhone = (info?: string) => {
   phoneActive = !phoneActive;
   
   if (inventoryActive) {
      mp.events.call('CLIENT::INVENTORY:TOGGLE');
   }

   Browser.call(phoneActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'phone');

   if (phoneActive) {
      phoneMouse = true;
      mp.keys.bind(controls.F4, true, togglePhoneMouse);
      playPhoneAnim(mp.players.local, 'cellphone_text_out');
   } else { 
      phoneMouse = false;
      mp.keys.unbind(controls.F4, true, togglePhoneMouse);
      mp.events.callRemote('SERVER::PHONE:STOP_USING');
   }
}


const togglePhoneMouse = () => {
   phoneMouse = !phoneMouse;
   mp.gui.cursor.show(phoneMouse, phoneMouse);
}


const phoneCall = (target: EntityMp, value: any | null, oldvValue?: any | null) => {

   if (target.type != RageEnums.EntityType.PLAYER) {
      return;
   }

   const _player = <PlayerMp>target;

   mp.gui.chat.push(JSON.stringify(oldvValue))

   
   if (value == false) {
      cancelPhoneAnim(_player);
   } else { 
      const [incoming, number, inCall] = value;

      if (value && inCall == false) {
         mp.gui.chat.push('start audio');
   
         // if (mp.game.invoke(RageEnums.Natives.Audio.IS_PED_RINGTONE_PLAYING), _player.getPed()) {
         //    mp.game.invoke(RageEnums.Natives.Audio.STOP_PED_RINGTONE, _player.getPed());
         // }
      } else if (inCall == true) {
         //mp.game.invoke(RageEnums.Natives.Audio.PLAY_PED_RINGTONE, 'Remote_Ring', _player.getPed(), true);
      }

      if (_player.remoteId == mp.players.local.remoteId) {

         if (!phoneActive) {
            togglePhone();
         }
   
         Browser.call('BROWSER::PHONE:CALL', value);
      }
   }
}



const usingPhone = (entity: EntityMp, value: boolean, oldValue: boolean) => {
   if (entity.type != RageEnums.EntityType.PLAYER) {
      return;
   }
   
   const target = <PlayerMp>entity;

   if (value) { 
      playPhoneAnim(target, 'cellphone_text_out');
   } else if (!value && oldValue != false) { 
      cancelPhoneAnim(target);
      mp.gui.chat.push('Cancelphoneanim')
   }
};

const playPhoneAnim = (target: PlayerMp, animation: string) => {
   if (!target.handle) {
      return;
   }

   let animationDicionary = 'cellphone@';
   let animationName = animation;

   if (target.vehicle) {
      animationDicionary = 'anim@cellphone@in_car@ps';
   }

   const object = mp.objects.new(mp.game.joaat(phoneModel), target.position);
   const boneIndex = target.getBoneIndex(28422);

   waitForEntity(object)?.then(() => {
      object.attachTo(target.handle, boneIndex, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, true, true, false, false, 2, true);
   });
   
   phoneObjects.set(target.remoteId, object);

   playAnimation(target, animationDicionary, animationName, animationFlags.UPPER_BODY_CONTROLABLE, -1, false);
};


const cancelPhoneAnim = (target: PlayerMp) => {
   target.clearTasks();
   
   const object = phoneObjects.get(target.remoteId);

   if (object && object.doesExist()) {
      mp.gui.chat.push('object destroy')
      object.destroy();
      //phoneObjects.delete(target.remoteId);
   }
}


mp.events.addDataHandler('USING_PHONE', usingPhone);
mp.events.addDataHandler('PHONE_CALL', phoneCall);
mp.events.add('CLIENT::PHONE:TOGGLE', togglePhone);