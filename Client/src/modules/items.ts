import { Browser } from '../browser';
import { screenResolution } from './core';
import { controls } from '../data/enums';


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
         Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Inventory');
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
      
         let object = mp.objects.new(
            mp.game.joaat(itemInfo.model),
            new mp.Vector3(newPos.x, newPos.y, newPos.z),
            {
               alpha: 255,
               rotation: new mp.Vector3(rotation.x, rotation.y, rotation.z),
               dimension: mp.players.local.dimension,
            },
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

         // mp.players.local.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
      },

      'CLIENT::ITEM:GIVE': Give,

      'CLIENT::ITEM:USE': async (item: any) => { 
         const newInventory = await mp.events.callRemoteProc('SERVER::ITEM:USE', JSON.parse(item).id);
         Browser.call('BROWSER::INVENTORY:ITEMS', newInventory);

      },

      'client:inventory.player:nearby': () => { 
         let Nearby: object[] = [];
         mp.players.forEachInRange(player.position, 4, (target) => { 
            if (target.dimension === player.dimension && target.remoteId != player.remoteId) { 
               Nearby.push({ id: target.remoteId, name: target.name });
            }
         })
         Browser.call('BROWSER::NEARBY:PLAYERS'); //browser.execute('inventory.nearbyPlayers = ' + JSON.stringify(Nearby));
      },

      'render': () => { 
         if (player.getVariable('LOGGED_IN') && player.getVariable('SPAWNED')) { 
            mp.objects.forEach((object) => { 
               if (player.hasClearLosTo(object.handle, 17)) {
                  if (object.getVariable('ITEM')) { 

                     const { position } = player;


                     const objectPosition = object.position;

                     const distance = new mp.Vector3(position.x, position.y, position.z).subtract(new mp.Vector3(objectPosition.x, objectPosition.y, objectPosition.z)).length();

                     let { x, y } = mp.game.graphics.world3dToScreen2d(objectPosition.x, objectPosition.y, objectPosition.z + 0.15);

                     if (x && y) {
                  
                        if (distance <= 4.5) {      
                           
                           mp.game.graphics.drawLine(position.x, position.y, position.z, object.position.x, object.position.y, object.position.z, 0, 255, 0, 255);

                           let scale = (distance / 25);
                           if (scale < 0.6) scale = 0.6;
                           
                           y -= (scale * (0.005 * (screenResolution.y / 1080))) - parseInt('0.010');
                           
                           // const Item = Object.getVariable('Item');
      
                           // mp.game.graphics.drawText(Item, [x, y], {
                           //    font: 4,
                           //    color: [255, 255, 255, 255],
                           //    scale: [0.325, 0.325],
                           //    outline: false
                           // });
                        }
                     }
                  }
               }
            });
         }
      }
   }
);


mp.keys.bind(controls.KEY_I, true, function() {
   if (player.getVariable('LOGGED_IN') && player.getVariable('SPAWNED')) { 
      if (player.isTypingInTextChat || player.getVariable('CUFFED') ) return;
      mp.events.call('CLIENT::INVENTORY:TOGGLE');
   }
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

// function WeaponSelector () { 
//    for (let i in Keys) {
//       const key = Keys[i];
//       mp.keys.bind(key, false, function() {
//          if (Player.Logged && Player.Spawned) { 
//             if (Player.Cuffed || Player.vehicle || mp.players.local.isTypingInTextChat) return;
//             mp.events.callRemote('server:player.inventory.item.weapon:take', i);
//          }
//       });
//    }
// }

// WeaponSelector();

// mp.keys.bind(Controls.KEY_Y, false, function() {
//    if (Player.Logged && Player.Spawned) { 
//       if (Player.vehicle || Player.getVariable('CUFFED') || mp.players.local.isTypingInTextChat) return;
//       mp.events.callRemote('server:player.inventory.item:pickup');
//    }
// });



async function Give (target: PlayerMp, item: number, quantity: number) {
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:give', target, item, quantity);
   if (Inventory) {
      Browser.call('');
      //browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
   }
}


async function Put (weapon: number) { 
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.weapon:put', weapon);
   Browser.call('');
   //if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}


async function Unequip (item: number) {
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:unequip', item);
   Browser.call('');
   //if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
};

