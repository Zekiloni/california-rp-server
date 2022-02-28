import { animationFlags } from '../../../enums/animations.flags';
import { entityType } from '../../../enums/entity';
import { waitForEntity } from '../../../utils';
import { playAnimation } from '../../player/animation';



const config = {
   object: mp.game.joaat('p_cs_cuffs_02_s'),
   animation: {
      dictionary: 'mp_arresting',
      name: 'idle',
      flag: 49
   }
}



let cuffed: { [key: number]: ObjectMp } = {};


const checkMoving = () => {
   const isCuffed = cuffed[mp.players.local.remoteId];

   if (isCuffed) {
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_ATTACK, true);
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_AIM, true);
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_SPRINT, true);
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_DIVE, true);
   }
}


const cuffStream = (entity: EntityMp) => {
   if (entity.type != entityType.PLAYER) {
      return;
   }

   if (!entity.hasVariable('CUFFED')) {
      return;
   }

   const cuffed = entity.getVariable('CUFFED');

   cuff(entity, cuffed);
}


const cuff = (entity: EntityMp, value: boolean, oldValue?: boolean) => {
   if (entity.type != entityType.PLAYER) {
      return;
   }

   const target = <PlayerMp>entity;

   if (value) { 
      target.setEnableHandcuffs(true);

      const cuffObject = mp.objects.new(config.object, target.position, {
         rotation: new mp.Vector3(0, 0, 0),
         alpha: 255,
         dimension: target.dimension
      });

      waitForEntity(cuffObject)?.then(() => {
         const bone = mp.players.local.getBoneIndex(6286);
         cuffObject.attachTo(entity.handle, bone, -0.02, 0.06, 0.0, 75.0, 0.0, 76.0, true, true, false, false, 0, true);
      });

      playAnimation(target, config.animation.dictionary, config.animation.name, config.animation.flag, -1, false)

      cuffed[target.remoteId] = cuffObject;
   } else {
      const object = cuffed[target.remoteId];

      if (object) {
         target.clearTasks();
         object.destroy();
         delete cuffed[target.remoteId];
      }
   }
};


mp.events.add(RageEnums.EventKey.RENDER, checkMoving);
mp.events.add(RageEnums.EventKey.ENTITY_STREAM_IN, cuffStream)
mp.events.addDataHandler('CUFFED', cuff);