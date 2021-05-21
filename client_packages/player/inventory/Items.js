


const Player = mp.players.local;
let browser = null, opened = false, nearbyPlayers = [];


mp.events.add({
   'client:inventory.toggle': (toggle, items = 0, weapons = 0) => {
      if (toggle) { 
         items = JSON.stringify(items)
         weapons = JSON.stringify(weapons)
         // mp.game.graphics.transitionToBlurred(500);
         browser.execute(`inventory.player.items = ${items}`);
         browser.execute(`inventory.player.weapons = ${weapons}`)
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      } else { 
         // mp.game.graphics.transitionFromBlurred(300);
      }
  },


  'client:inventory.toggle': () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/inventory/inventory-interface/inventory.html');
         Player.BrowserControls(true, true);

      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);

      }
  },

  'client:inventory.item.drop': Drop,

  'server:inventory.weapon.put': Put,

  'client:inventory.item.use': Use,

  'client:inventory.process.clothing': (index) => { 
      mp.events.callRemote('server:item.clothing', index);
   },

   'client:inventory.weapon.select': (key, id) => { 
      mp.events.callRemote('server:weapon.select', key, id);
   },

  'entityStreamIn': (entity) => {
      if (entity.type === 'object') {
         if (entity.item) { 
         }
      }
  }
})

mp.keys.bind(0x49, false, function() {
   if (Player.logged && Player.spawned) { 
      if (!opened) {
         if (mp.players.local.isTypingInTextChat) return;
         mp.events.callRemote('server:inventory.get');
      } else { 
         mp.events.call('client:inventory.toggle', false);
      }
   }
});

mp.keys.bind(0x59, false, function() {
   if (Player.logged && Player.spawned) { 
      if (Player.vehicle || Player.cuffed || mp.players.local.isTypingInTextChat) return;
      mp.events.callRemote('server:item.pickup');
   }
});


function Use (item) { 
   mp.events.callRemote('server:item.use', item);
}

function Put (item) { 
   mp.events.callRemote('server:item.weapon.put', item);
}

async function Drop (item, hash, quantity) { 

   let { position } = mp.players.local;
   let heading = mp.players.local.getHeading();
   let rotation = mp.players.local.getRotation(2);

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

   mp.game.streaming.requestAnimDict('random@domestic');
   Player.taskPlayAnim('random@domestic', 'pickup_low', 8.0, -8, -1, 48, 0, false, false, false);

   mp.events.callRemote('server:item.drop', item, quantity, JSON.stringify(fixedPosition));
}



