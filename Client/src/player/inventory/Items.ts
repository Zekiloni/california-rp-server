import { Browser } from '../../Browser';
import { Controls } from "../../Utils";


const Player = mp.players.local;

let Active: boolean = false;

let nearbyPlayers = [];


const Keys: any = {
   0: 0x31, 1: 0x32, 2: 0x33, 3:0x34, 666: 0x09
};

const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);



mp.events.add({

   'CLIENT::INVENTORY:TOGGLE': async () => { 
      Active = !Active; 
      Browser.call(Active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Inventory');
      if (Active) {
         const items = await mp.events.callRemoteProc('SERVER::PLAYER:ITEMS:GET');
         Browser.call('BROWSER::INVENTORY:ITEMS', items);
      }
   },

   'client:inventory.item:drop': Drop,

   'client:inventory.item.weapon:put': Put,

   'client:inventory.item:use': Use,

   'client:inventory.item:give': Give,

   'client:inventory.item:unequip': Unequip,

   'client:inventory.process.clothing': (index) => { 
      mp.events.callRemote('server:item.clothing', index);
   },

   'client:inventory.weapon.select': (key, id) => { 
      mp.events.callRemote('server:weapon.select', key, id);
   },

   'client:inventory.vehicle:trunk': (id, Items) => { 
      // if (browser) { 
      //    browser.execute('inventory.vehicle.id = ' + id);
      //    browser.execute('inventory.vehicle.items = ' + JSON.stringify(Items));
      // }
   },

   'client:inventory.item.trunk:get': async (vehicle, item) => { 
      const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item.trunk:get', vehicle, item);
      // if (Inventory && Trunk) { 
      //    browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
      //    browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
      // }
   },

   'client:inventory.item:trunk': async (vehicle, item) => { 
      const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item:trunk', vehicle, item);
      if (Inventory && Trunk) { 
         // if (browser) { 
         //    browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
         //    browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
         // }
      }
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
                        
                        y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');
                        
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
});



mp.keys.bind(Controls.KEY_I, false, function() {
   if (Player.getVariable('LOGGED_IN') && Player.getVariable('SPAWNED')) { 
      if (Player.isTypingInTextChat || Player.getVariable('CUFFED') ) return;
      mp.console.logInfo('1')
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

async function Use (item: number) { 
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:use', item);
   Browser.call('');
   //if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
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

async function Drop (item: number, hash: string, quantity = 1) { 

   let { position } = Player;
   let heading = Player.getHeading();
   let rotation = Player.getRotation(2);

   let newPos = new mp.Vector3(
      position.x + Math.cos(((heading + 90) * Math.PI) / 180) * 0.6,
      position.y + Math.sin(((heading + 90) * Math.PI) / 180) * 0.6,
      position.z,
   );

   let object = mp.objects.new(
      mp.game.joaat(hash),
      new mp.Vector3(newPos.x, newPos.y, newPos.z),
      {
         alpha: 255,
         rotation: new mp.Vector3(rotation.x, rotation.y, rotation.z),
         dimension: Player.dimension,
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

   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:drop', item, JSON.stringify(fixedPosition), quantity);
   
   //browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));

   mp.game.streaming.requestAnimDict('random@domestic');
   Player.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
}

