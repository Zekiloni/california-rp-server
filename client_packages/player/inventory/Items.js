


const Player = mp.players.local;

let browser = null, opened = false, nearbyPlayers = [];

const Keys = {
   0: 0x31, 1: 0x32, 2: 0x33, 3:0x34, 666: 0x09
};

const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);

const Controls = { 
   keyY: 0x59
}

mp.events.add({

   'client:inventory.toggle': async () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/inventory/inventory-interface/Inventory.html');
         const Inventory = await mp.events.callRemoteProc('server:player.inventory:get');
         browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
         Player.BrowserControls(true, true);

      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
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
     
                  const position = mp.game.graphics.world3dToScreen2d(new mp.Vector3(ObjectPosition.x, ObjectPosition.y, ObjectPosition.z + 0.15));

                  if (position) {
                     let x = position.x;
                     let y = position.y;
               
                     if (Distance <= 2.5) {       
                        let scale = (Distance / 25);
                        if (scale < 0.6) scale = 0.6;
                        
                        y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');
                        
                        const Item = Object.getVariable('Item');
   
                        mp.game.graphics.drawText(Item, [x, y],
                        {
                           font: 4,
                           color: [255, 255, 255, 255],
                           scale: [0.325, 0.325],
                           outline: false
                        });
                     }
                  }
               }
            }
         });
      }
   }
});


mp.keys.bind(0x49, false, function() {
   if (Player.logged && Player.spawned) { 
      if (mp.players.local.isTypingInTextChat) return;
      mp.events.call('client:inventory.toggle');
      ClonePedToScreen();
      mp.events.call('client:inventory.toggle');
      mp.events.call('client:inventory.toggle');
   }
});


function WeaponSelector () { 
   for (let i in Keys) {
      const key = Keys[i];
      mp.keys.bind(key, false, function() {
         if (Player.logged && Player.spawned) { 
            if (Player.cuffed || Player.vehicle || mp.players.local.isTypingInTextChat) return;
            mp.events.callRemote('server:player.inventory.item.weapon:take', i);
         }
      });
   }
}

WeaponSelector();

mp.keys.bind(Controls.keyY, false, function() {
   if (Player.logged && Player.spawned) { 
      if (Player.vehicle || Player.cuffed || mp.players.local.isTypingInTextChat) return;
      mp.events.callRemote('server:player.inventory.item:pickup');
   }
});



async function Give (target, item, quantity) {
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:give', target, item, quantity);
   if (Inventory) {
      browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
   }
}

async function Use (item) { 
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:use', item);
   if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}

async function Put (weapon) { 
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.weapon:put', weapon);
   if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}


async function Unequip (item) {
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:unequip', item);
   if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
};

async function Drop (item, hash, quantity = 1) { 

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
   browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));

   mp.game.streaming.requestAnimDict('random@domestic');
   Player.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);
}

