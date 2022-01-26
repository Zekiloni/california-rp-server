import { Browser } from '../../browser';
import { screenResolution } from '../core';
import controls from '../../enums/controls';
import { playAnimation } from '../player/animations';
import { animationFlags } from '../../enums/animations.flags';


const player = mp.players.local;

let active: boolean = false;


mp.events.addProc(
   {
      'CLIENT::ITEM:INFO': async (itemName) => { 
         const itemInfo = await mp.events.callRemoteProc('SERVER::ITEM:INFO', itemName);
         return JSON.stringify(itemInfo); 
      }
   }
);

mp.events.add(
   {

      'CLIENT::INVENTORY:TOGGLE': async () => { 
         active = !active; 
         Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'inventory');
         if (active) {
            const items = await mp.events.callRemoteProc('SERVER::PLAYER:ITEMS:GET');
            Browser.call('BROWSER::INVENTORY:ITEMS', items);
         }
      },
      
      'CLIENT::ITEM:DROP': async (item: any, itemInfo: any) => { 
         let { position } = player;
         let heading = mp.players.local.getHeading();
         let rotation = mp.players.local.getRotation(2);

         itemInfo = JSON.parse(itemInfo);

         let newPos = new mp.Vector3(
            position.x + Math.cos(((heading + 90) * Math.PI) / 180) * 0.6,
            position.y + Math.sin(((heading + 90) * Math.PI) / 180) * 0.6,
            position.z,
         );
      
         let object = mp.objects.new(mp.game.joaat(itemInfo.model), new mp.Vector3(newPos.x, newPos.y, newPos.z), 
            { alpha: 255, rotation: new mp.Vector3(rotation.x, rotation.y, rotation.z), dimension: mp.players.local.dimension }
         );
      
         while (object.handle === 0) {
            await mp.game.waitAsync(0);
         }
      
         object.placeOnGroundProperly();
      
         let fixedPosition = {
            position: object.getCoords(false),
            rotation: object.getRotation(2),
         };
      
         object.destroy();
      
         const newInventory = await mp.events.callRemoteProc('SERVER::ITEM:DROP', JSON.parse(item).id, JSON.stringify(fixedPosition));
         if (newInventory) Browser.call('BROWSER::INVENTORY:ITEMS', newInventory);
      
         // mp.game.streaming.requestAnimDict('random@domestic');

         // // mp.players.forEachInStreamRange((_player) => {
         // //    _player.call('')
         // // });

         playAnimation(mp.players.local, 'random@domestic', 'pickup_low', animationFlags.NORMAL);
         // mp.players.local.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
      },

      'CLIENT::ITEM:USE': async (item: any) => { 
         const newInventory = await mp.events.callRemoteProc('SERVER::ITEM:USE', JSON.parse(item).id);
         Browser.call('BROWSER::INVENTORY:ITEMS', newInventory);
      },

      'CLIENT::ITEM:GIVE': (item, iteminfo, quantity) => { Browser.call('BROWSER::INVENTORY:GIVE_ITEM', item); },

      'render': () => { 
         if (player.getVariable('LOGGED_IN') && player.getVariable('SPAWNED')) { 
            mp.objects.forEach((object) => { 
               if (player.hasClearLosTo(object.handle, 17)) {
                  if (object.getVariable('ITEM')) {

                  }
               }
            });
         }
      }
   }
);


mp.keys.bind(controls.KEY_I, true, function() {

   if (!mp.players.local.getVariable('LOGGED_IN')) { 
      return;
   }

   if (!mp.players.local.getVariable('SPAWNED')) {
      return;
   }

   
   if (mp.players.local.isTypingInTextChat || mp.players.local.getVariable('CUFFED')) { 
      return;
   }


   mp.events.call('CLIENT::INVENTORY:TOGGLE');

});

mp.keys.bind(controls.KEY_E, true, function() {
   if (player.getVariable('LOGGED_IN') && player.getVariable('SPAWNED')) { 
      if (player.isTypingInTextChat || player.getVariable('CUFFED') ) return;
      mp.objects.forEachInRange(player.position, 2, async object => { 
         if (object.getVariable('ITEM')) {
            const newInventory = await mp.events.callRemoteProc('SERVER::ITEM:PICKUP', object.getVariable('ITEM').id);
            if (active && newInventory) Browser.call('BROWSER::INVENTORY:ITEMS', newInventory);
            return;
         }
      });
   }
});
