


const Player = mp.players.local;

let browser = null, opened = false, nearbyPlayers = [];

const Keys = {
   0: 0x31, 1: 0x32, 2: 0x33, 3:0x34, 666: 0x09
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
            if (Player.cuffed || mp.players.local.isTypingInTextChat) return;
            mp.events.callRemote('server:player.inventory.item.weapon:take', i);
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

mp.keys.bind(0x63, true, function() {
   ClonePedToScreen();
});

let Ped = null;
function ClonePedToScreen () {
   if (Ped == null) {
      mp.game.ui.setFrontendActive(true);
      mp.game.ui.activateFrontendMenu(mp.game.joaat("FE_MENU_VERSION_EMPTY"), false, -1);
      mp.game.invoke('_0x98215325A695E78A', false); // MOUSE
      mp.game.wait(50);

      const IsFrontendReady = mp.game.invoke('0x3BAB9A4E4F2FF5C7'); // IS_FRONTEND_READY_FOR_CONTROL

      while (!IsFrontendReady) {  // Freezes game
          mp.game.wait(1); 
       } 

      let PlayerPed = mp.game.player.getPed();

      Ped = mp.game.invoke('0xEF29A16337FACADB', PlayerPed, 0, false, true); // CLONE_PED
      mp.game.wait(100);

      mp.game.invoke('0xAC0BFBDC3BE00E14', Ped, 2); // GIVE_PED_TO_PAUSE_MENU
      mp.game.invoke('0xECF128344E9FF9F1', false); // SET_PAUSE_MENU_PED_SLEEP_STATE
      mp.game.invoke('0x3CA6050692BC61B0', true); // SET_PAUSE_MENU_PED_LIGHTING

      setTimeout(() => {
         mp.game.invoke('0xECF128344E9FF9F1', true); // SET_PAUSE_MENU_PED_SLEEP_STATE
      }, 1000);
   } else {  
      mp.game.invoke('0x5E62BE5DC58E9E06'); // CLEAR_PED_IN_PAUSE_MENU
      Ped = null;
      mp.game.ui.setFrontendActive(false);
   }
}



/*
async function showChar()
{
    if(ped) hideChar();
    native.setFrontendActive(true);
    native.activateFrontendMenu(alt.hash("FE_MENU_VERSION_EMPTY"), false, -1);
    native._0x98215325A695E78A(false);
    await waitFor(native.isFrontendReadyForControl);

    ped = native.clonePed(alt.Player.local.scriptID, 0, false, false);
    await waitFor(native.doesEntityExist, ped);

    native.givePedToPauseMenu(ped, 2);
    native.setPauseMenuPedLighting(true);
    native.setPauseMenuPedSleepState(false);

    alt.setTimeout(() => {
        native.setPauseMenuPedSleepState(true);
    }, 1000);
}
function hideChar()
{
    native.clearPedInPauseMenu();
    native.setFrontendActive(false);
}*/


mp.keys.bind(0x63, true, function() {
   ClonePedToScreen();
});

let Ped = null;
function ClonePedToScreen () {
   if (Ped == null) {
      mp.game.ui.setFrontendActive(true);
      mp.game.ui.activateFrontendMenu(mp.game.joaat("FE_MENU_VERSION_EMPTY"), false, -1);
      mp.game.invoke('_0x98215325A695E78A', false); // 
      mp.game.wait(50);

      const IsLoaded = mp.game.invoke('0x3BAB9A4E4F2FF5C7'); // IS_FRONTEND_READY_FOR_CONTROL

      // while (!IsLoaded) { 
      //    mp.game.waitAsync(0); 
      // } 

      let PayerPed = mp.game.player.getPed();

      Ped = mp.game.invoke('0xEF29A16337FACADB', PayerPed, 0, false, true); // CLONE_PED
      mp.game.wait(100);

      mp.game.invoke('0xAC0BFBDC3BE00E14', Ped, 2); // GIVE_PED_TO_PAUSE_MENU
      mp.game.invoke('0xECF128344E9FF9F1', false); // SET_PAUSE_MENU_PED_SLEEP_STATE
      mp.game.invoke('0x3CA6050692BC61B0', true); // SET_PAUSE_MENU_PED_LIGHTING

      setTimeout(() => {
         mp.game.invoke('0xECF128344E9FF9F1', true); // SET_PAUSE_MENU_PED_SLEEP_STATE
      }, 1000);
   } else { 
      mp.game.ui.setFrontendActive(false);
      mp.game.invoke('0x5E62BE5DC58E9E06'); // CLEAR_PED_IN_PAUSE_MENU
   }
}


