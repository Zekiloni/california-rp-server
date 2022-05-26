import { animationFlags } from "../../enums/animations.flags";
import controls from "../../enums/controls";
import { isAnimationFinished, isPlayingAnim, playAnimation, stopAnimation } from "../player/animation";
import { createAttachment, removeAttachment } from "../player/attahments";



interface PTarget {
   item: string
   position: Vector3Mp
}

enum ScannerState {
   DEFAULT, NEARBY, CLOSE
}

let prospecting: null | ReturnType<typeof setInterval> = null;
let targets: PTarget[] = [];
let scanning: boolean = false;

function startProspecting (points?: PTarget[]) {
   if (points && !prospecting) {
      targets = points;
      prospecting = setInterval(prospect, 1000);
      mp.events.add(RageEnums.EventKey.RENDER, scanner);
      mp.gui.chat.push('start')
      createAttachment(mp.players.local, 'scanner', 'w_am_digiscanner', 18905, new mp.Vector3(0.15, 0.1, 0.0), new mp.Vector3(270.0, 90.0, 80.0));
      playAnimation(mp.players.local, 'mini@golfai', 'wood_idle_a', animationFlags.UPPER_BODY_CONTROLABLE);
      scanning = true;
      mp.keys.bind(controls.KEY_Y, true, dig);
   } else {
      clearInterval(prospecting!);
      prospecting = null;
      scanning = false;
      targets = [];
      mp.gui.chat.push('stop');
      mp.events.remove(RageEnums.EventKey.RENDER, scanner);
      removeAttachment(mp.players.local, 'scanner');
      mp.players.local.clearTasks();
      mp.keys.unbind(controls.KEY_Y, true, dig);
   }
}


function closestItem (x: number, y: number, z: number) {
   return targets.reduce(
      (first, second) => 
         mp.game.system.vdist(x, y, z, first.position.x, first.position.y, first.position.z) < mp.game.system.vdist(x, y, z, second.position.x, second.position.y, second.position.z) ? first : second
   ); 
}


function prospect () {
   mp.game.audio.playSoundFrontend(-1, 'ATM_WINDOW', 'HUD_FRONTEND_DEFAULT_SOUNDSET', false);
}


async function dig () {
   if (prospecting) {
      const { x, y, z } = mp.players.local.position;

      const closest = closestItem(x, y, z);

      if (mp.game.system.vdist(x, y, z, closest.position.x, closest.position.y, closest.position.z) > 1) {
         return;
      }

      scanning = false;
      stopAnimation(mp.players.local, 'mini@golfai', 'wood_idle_a');
      
      playAnimation(mp.players.local, 'amb@world_human_gardener_plant@male@enter', 'enter', animationFlags.NORMAL);
      mp.game.waitAsync(100);

      while (isAnimationFinished(mp.players.local, 'amb@world_human_gardener_plant@male@enter', 'enter')) {
         mp.game.waitAsync(0);
      }

      playAnimation(mp.players.local, 'amb@world_human_gardener_plant@male@base', 'base', animationFlags.NORMAL);
      mp.game.waitAsync(100);
      
      while (await isPlayingAnim(mp.players.local, 'amb@world_human_gardener_plant@male@base', 'base')) {
         mp.game.waitAsync(0)
      }

      playAnimation(mp.players.local, 'amb@world_human_gardener_plant@male@exit', 'exit', animationFlags.NORMAL);
      mp.game.waitAsync(100);

      while (await isPlayingAnim(mp.players.local, 'amb@world_human_gardener_plant@male@exit', 'exit')) {
         mp.game.waitAsync(0);
      }

      scanning = true;
      playAnimation(mp.players.local, 'mini@golfai', 'wood_idle_a', animationFlags.UPPER_BODY_CONTROLABLE);
      
      const index = targets.indexOf(closest);

      mp.gui.chat.push('You found ' + JSON.stringify(closest.item));
      targets.splice(index, 1);
   }
}


function scanner () {
   if (prospecting && scanning) {

      let { x, y, z} = new mp.Vector3(
         mp.players.local.position.x + (mp.players.local.getForwardX() * 0.75),
         mp.players.local.position.y + (mp.players.local.getForwardY() * 0.75),
         mp.players.local.position.z - 0.85
      )

      const closest = closestItem(x, y, z);
      let distance;
      
      let color = [150, 255, 150];
      
      if (closest) {
         distance = mp.game.system.vdist(x, y, z, closest.position.x, closest.position.y, closest.position.z);

         if (distance < 1) {
            color = [255, 150, 150];
            mp.game.graphics.drawMarker(1, x, y, z, 0, 0, 0, 0, 0, 0, 0.3, 0.3, 0.1, color[0], color[1], color[2], 200, false, false, 2, false, null, null, false);
            mp.game.graphics.drawMarker(1, x, y, z, 0, 0, 0, 0, 0, 0, 0.6, 0.6, 0.1, color[0], color[1], color[2], 200, false, false, 2, false, null, null, false);
         } else if (distance > 1 && distance < 3) {
            color = [255, 255, 150];
            mp.game.graphics.drawMarker(1, x, y, z, 0, 0, 0, 0, 0, 0, 0.6, 0.6, 0.1, color[0], color[1], color[2], 200, false, false, 2, false, null, null, false);
         } else {
            color = [150, 255, 150];
         }
      }

      targets.forEach(
         (target) => mp.game.graphics.drawLine(target.position.x, target.position.y, target.position.z - 0.5, target.position.x, target.position.y, target.position.z + 0.15, 205, 205, 205, 200)
      );

      if (closest && distance && distance < 1) {

         mp.game.audio.playSoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
      }

      mp.game.graphics.drawMarker(1, x, y, z, 0, 0, 0, 0, 0, 0, 0.9, 0.9, 0.1, color[0], color[1], color[2], 200, false, false, 2, false, null, null, false);
   }
}


mp.events.add('CLIENT::PROSPECTING_INITIALIZE', startProspecting);
