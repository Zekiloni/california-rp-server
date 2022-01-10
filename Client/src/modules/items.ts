import { Browser } from '../browser';
import { screenResolution } from '../core';
import { Controls } from '../utils';


const Player = mp.players.local;

let Active: boolean = false;


const Keys: any = {
   0: 0x31, 1: 0x32, 2: 0x33, 3:0x34, 666: 0x09
};


mp.events.addProc(
   {
      'CLIENT::ITEM:INFO': async (itemName) => { 
         mp.console.logInfo('uso loginfo item ')
         const itemInfo = await mp.events.callRemoteProc('SERVER::ITEM:INFO', itemName);
         return JSON.stringify(itemInfo); 
      }
   }
);

mp.events.add(
   {

      'CLIENT::INVENTORY:TOGGLE': async () => { 
         Active = !Active; 
         Browser.call(Active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Inventory');
         if (Active) {
            const items = await mp.events.callRemoteProc('SERVER::PLAYER:ITEMS:GET');
            Browser.call('BROWSER::INVENTORY:ITEMS', items);
         }
      },
      
      'CLIENT::ITEM:DROP': async (item: any, itemInfo: any) => { 
         let { position } = Player;
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
         mp.players.forEachInRange(Player.position, 4, (target) => { 
            if (target.dimension === Player.dimension && target.remoteId != Player.remoteId) { 
               Nearby.push({ id: target.remoteId, name: target.name });
            }
         })
         Browser.call('BROWSER::NEARBY:PLAYERS'); //browser.execute('inventory.nearbyPlayers = ' + JSON.stringify(Nearby));
      },

      'render': () => { 
         if (Player.Logged && Player.Spawned) { 
            mp.objects.forEach((Object) => { 
               if (Player.hasClearLosTo(Object.handle, 17)) {
                  const PlayerPosition = Player.position;
                  const ObjectPosition = Object.position;
      
                  if (Object.getVariable('Item')) { 
                     const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z)).length();
      
                     const position = mp.game.graphics.world3dToScreen2d(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z + 0.15);

                     if (position) {
                        let x = position.x;
                        let y = position.y;
                  
                        if (Distance <= 2.5) {       
                           let scale = (Distance / 25);
                           if (scale < 0.6) scale = 0.6;
                           
                           y -= (scale * (0.005 * (screenResolution.y / 1080))) - parseInt('0.010');
                           
                           const Item = Object.getVariable('Item');
      
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



mp.keys.bind(Controls.KEY_I, false, function() {
   if (Player.getVariable('LOGGED_IN') && Player.getVariable('SPAWNED')) { 
      if (Player.isTypingInTextChat || Player.getVariable('CUFFED') ) return;
      mp.events.call('CLIENT::INVENTORY:TOGGLE');
   }
});


function WeaponSelector () { 
   for (let i in Keys) {
      const key = Keys[i];
      mp.keys.bind(key, false, function() {
         if (Player.Logged && Player.Spawned) { 
            if (Player.Cuffed || Player.vehicle || mp.players.local.isTypingInTextChat) return;
            mp.events.callRemote('server:player.inventory.item.weapon:take', i);
         }
      });
   }
}

WeaponSelector();

mp.keys.bind(Controls.KEY_Y, false, function() {
   if (Player.Logged && Player.Spawned) { 
      if (Player.vehicle || Player.getVariable('CUFFED') || mp.players.local.isTypingInTextChat) return;
      mp.events.callRemote('server:player.inventory.item:pickup');
   }
});



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

