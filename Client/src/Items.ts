import { Browser } from "./Browser";
import { Controls } from "./Utils";



const Player = mp.players.local;

let Active:boolean = false;

const ScreenResolution = mp.game.graphics.getScreenActiveResolution(100, 100);


mp.events.add({
   'CLIENT::INVENTORY:TOGGLE': () => { 
      Active = !Active;
      Browser.call('BROWSER::INVENTORY:TOGGLE', Active);
   }
});



mp.events.add({

   'client:inventory.item:drop': Drop,

   'client:inventory.item:use': Use,

   'client:inventory.item:give': Give,


   'client:inventory.process.clothing': (index) => { 
      mp.events.callRemote('server:item.clothing', index);
   },

   'client:inventory.weapon.select': (key, id) => { 
      mp.events.callRemote('server:weapon.select', key, id);
   },

   'client:inventory.vehicle:trunk': (id, Items) => { 
      if (browser) { 
         browser.execute('inventory.vehicle.id = ' + id);
         browser.execute('inventory.vehicle.items = ' + JSON.stringify(Items));
      }
   },

   'client:inventory.item.trunk:get': async (vehicle, item) => { 
      const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item.trunk:get', vehicle, item);
      if (Inventory && Trunk) { 
         browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
         browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
      }
   },

   'client:inventory.item:trunk': async (vehicle, item) => { 
      const [Inventory, Trunk] = await mp.events.callRemoteProc('server:inventory.item:trunk', vehicle, item);
      if (Inventory && Trunk) { 
         if (browser) { 
            browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
            browser.execute('inventory.vehicle.items = ' + JSON.stringify(Trunk));
         }
      }
   },

   'client:inventory.player:nearby': () => { 
      let Nearby = [];
      mp.players.forEachInRange(Player.position, 4, (target) => { 
         if (target.dimension === Player.dimension && target.remoteId != Player.remoteId) { 
            Nearby.push({ id: target.remoteId, name: target.name });
         }
      })
      browser.execute('inventory.nearbyPlayers = ' + JSON.stringify(Nearby));
   },

   'render': () => { 
      if (Player.logged && Player.spawned) { 
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
                        
                        y -= (scale * (0.005 * (ScreenResolution.y / 1080))) - parseInt('0.010');
                        
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
   if (Player.getVariable('Logged') && Player.getVariable('Spawned')) { 
      if ( Player.isTypingInTextChat || Player.Cuffed ) return;
      mp.events.call('client:inventory.toggle');
   }
});


mp.keys.bind(Controls.KEY_Y, false, function() {
   if (Player.getVariable('Logged') && Player.getVariable('Spawned')) { 
      if (Player.vehicle || Player.getVariable('Cuffed') || mp.players.local.isTypingInTextChat) return;
      mp.events.callRemote('server:player.inventory.item:pickup');
   }
});


async function Give (Target: PlayerMp, ITEM_ID: number, Quantity: number) {
   const Response = await mp.events.callRemoteProc('SERVER::ITEM:GIVE', Target, ITEM_ID, Quantity);
}

async function Use (ITEM_ID: number) { 
   const Inventory = await mp.events.callRemoteProc('SERVER::ITEM:USE', ITEM_ID);
}


async function Drop (Item: number, Hash: string, quantity = 1) { 

   let { position } = Player;
   let heading = Player.getHeading();
   let rotation = Player.getRotation(2);

   let newPos = new mp.Vector3(
      position.x + Math.cos(((heading + 90) * Math.PI) / 180) * 0.6,
      position.y + Math.sin(((heading + 90) * Math.PI) / 180) * 0.6,
      position.z,
   );

   let object = mp.objects.new(
      mp.game.joaat(Hash),
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

   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:drop', Item, JSON.stringify(fixedPosition), quantity);

   mp.game.streaming.requestAnimDict('random@domestic');
   Player.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
}


export {};