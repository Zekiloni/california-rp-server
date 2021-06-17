


const Player = mp.players.local;

let browser = null, opened = false, nearbyPlayers = [];

const Keys = {
   0: 0x31, 1: 0x32, 2: 0x33, 3:0x34
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
   }
});


mp.keys.bind(0x49, false, function() {
   if (Player.logged && Player.spawned) { 
      if (mp.players.local.isTypingInTextChat) return;
      mp.events.call('client:inventory.toggle');
   }
});


function WeaponSelector () { 
   for (let i in Keys) {
      const key = Keys[i];
      mp.keys.bind(key, false, function() {
         if (Player.logged && Player.spawned) { 
            if (Player.vehicle || Player.cuffed || mp.players.local.isTypingInTextChat) return;
            mp.gui.chat.push(JSON.stringify(key))
         }
      });
   }
}

WeaponSelector();

mp.keys.bind(0x59, false, function() {
   if (Player.logged && Player.spawned) { 
      if (Player.vehicle || Player.cuffed || mp.players.local.isTypingInTextChat) return;
      mp.events.callRemote('server:player.inventory.item:pickup');
   }
});


async function Give (target, item, quantity) {
   const Inventory = await mp.events.callRemoteProc('server:player.inventory.item:give', target, item, quantity);
   if (Inventory) {
      mp.gui.chat.push('usaoo u if posle rezultata')
      browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
      mp.gui.chat.push(JSON.stringify(Inventory));
   }
}

async function Use (item) { 
   const Inventory = mp.events.callRemoteProc('server:player.inventory.item:use', item);
   if (browser) browser.execute('inventory.player.items = ' + JSON.stringify(Inventory));
}

function Put (item) { 
   mp.events.callRemote('server:player.inventory.item.weapon:put', item);
}

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



