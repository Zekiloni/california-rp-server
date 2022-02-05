import { animationFlags } from "../../../enums/animations.flags";
import { entityType } from "../../../enums/entity";
import { playAnimation } from "../animation";


let crawling: ReturnType<typeof setInterval> | never;


const animations = { 
   falling: {
      dictionary: 'move_crawlprone2crawlfront',
      name: 'front'
   },
   moving: {
      dictionary: 'move_crawl',
      names: { forward: 'onfront_fwd', backward: 'onfront_bwd' }
   }
};


mp.events.add(RageEnums.EventKey.INCOMING_DAMAGE, incomingDamageHandler);
mp.events.addDataHandler('WOUNDED', isCrawlingHandler);


function incomingDamageHandler (
   sourceEntity: EntityMp,
   sourcePlayer: PlayerMp,
   targetEntity: EntityMp,
   weapon: number,
   boneIndex: number,
   damage: number
) {
   if (targetEntity && targetEntity.remoteId == mp.players.local.remoteId) { 
      
      const { getHealth } = mp.players.local;

      mp.events.callRemote('SERVER::INJURIES', boneIndex, weapon, damage);

      if (mp.players.local.getVariable('WOUNDED')) {
         if (damage > getHealth() - damage) {
            mp.events.callRemote('SERVER::DEATH', sourceEntity);

         }
      } else { 
         if (damage > getHealth()) {
            mp.events.callRemote('SERVER::WOUNDED');
            return true;
         }
      }
   }
};


function isCrawlingHandler (entity: EntityMp, value: boolean, oldValue: boolean) {
   if (entity.type == entityType.PLAYER) {
      if (value) { 
         crawling = setInterval(handleCrawling, 0);
         playAnimation(<PlayerMp>entity, animations.falling.dictionary, animations.falling.name, animationFlags.STOP_LAST_FRAME, -1, true);
      } else {
         clearInterval(crawling);
         (<PlayerMp>entity).clearTasks();
         (<PlayerMp>entity).clearSecondaryTask()
      }
   }
}


let animationTimeout: ReturnType<typeof setTimeout>;
let animation: string | null = null;


function handleCrawling () {
   if (!crawling) {
      return;
   }

   const rotation = mp.players.local.getRotation(2);

   mp.game.controls.disableControlAction(0, 32, true);
   mp.game.controls.disableControlAction(0, 33, true);
   mp.game.controls.disableControlAction(0, 34, true);
   mp.game.controls.disableControlAction(0, 35, true);

   if (mp.game.controls.isDisabledControlPressed(0, 34)) {
      mp.players.local.setRotation(rotation.x, rotation.y, rotation.z + 0.2, 2, true);
   }

   if (mp.game.controls.isDisabledControlPressed(0, 35)) {
      mp.players.local.setRotation(rotation.x, rotation.y, rotation.z - 0.2, 2, true);
   }

   if (mp.game.controls.isDisabledControlPressed(0, 32)) {
      if (animation) {
         return;
      };

      animation = animations.moving.names.forward;

      let time = mp.game.entity.getEntityAnimDuration(animations.moving.dictionary, animation);

      playAnimation(mp.players.local, animations.moving.dictionary, animation, animationFlags.STOP_LAST_FRAME);

      animationTimeout = setTimeout(() => {
         animation = null;
         clearTimeout(animationTimeout);
      }, (time - 0.1) * 1000);
   }

   if (mp.game.controls.isDisabledControlPressed(0, 33)) {
      if (animation) {
         return;
      }

      animation = animations.moving.names.backward;

      let time = mp.game.entity.getEntityAnimDuration(animations.moving.dictionary, animation);

      playAnimation(mp.players.local, animations.moving.dictionary, animation, animationFlags.STOP_LAST_FRAME);

      animationTimeout = setTimeout(() => {
         animation = null;
         clearTimeout(animationTimeout);
      }, (time - 0.1) * 1000);
   }
} 