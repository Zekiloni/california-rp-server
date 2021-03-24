const fs = require("fs");
const plants = require("../core/plants");
const savedPosition = "savedPositions.txt";

mp.events.addCommand({

   'kick': (player, fullText) => {
      if(player.admin < 1) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
   },

   'ban': (player, fullText) => {
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
   },

   'gethere': (player, fullText, target) => {
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      if(!target) return player.outputChatBox('Koriscenje /gethere [igrac]'); 

      let recipient = account.findPlayer(target);
      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      recipient.position = player.position;
      recipient.outputChatBox(`${player.name} vas je teleportovao do njega !`);
      player.outputChatBox(`Teleportovali ste ${recipient.name} do sebe !`);
   },

   'goto': (player, fullText, target) => {
      if(player.admin < 1) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      if(!target) return player.outputChatBox('Koriscenje /goto [igrac]'); 

      let recipient = account.findPlayer(target);
      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      player.position = recipient.position;
      recipient.outputChatBox(`${player.name} se teleportovao do vas !`);
      player.outputChatBox(`Teleportovani ste se do ${recipient.name} !`);
   },

   'revive': (player, fullText, target) => { 
      if (player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      if (!target) return player.outputChatBox('Koriscenje /revive [igrac]'); 

      let recipient = account.findPlayer(target);
      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      let position = recipient.position;
      clearTimeout(recipient.respawnTimer)
      recipient.isDead = false;
      setTimeout(() => { recipient.spawn(position); }, 700)
      recipient.outputChatBox(`${player.name} vas je oziveo !`);
      player.outputChatBox(`Oziveli ste ${recipient.name} !`);
   },

   'makeadmin': (player, fullText, target, adminLevel) => { 
      let level = parseInt(adminLevel);
      let recipient = account.findPlayer(target);
      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      recipient.admin = level;
      recipient.outputChatBox(`${player.name} vam je dao admina level ${level}.`);
      player.outputChatBox(`Dali ste igracu ${recipient.name} admina level ${level}.`);
   },

   'setmoney': (player, fullText, target, money) => {
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);

      let cash = parseInt(money);
      let recipient = account.findPlayer(target);
      if (!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      recipient.data.cash = cash;
      recipient.outputChatBox(`${player.name} vam je ostavio novac na ${money}$.`);
      player.outputChatBox(`Postavili ste ${recipient.name} novac na ${money}$.`);
   },

   'givemoney': (player, fullText, target, money) => {
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);

      let recipient = account.findPlayer(target);
      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      let cash = parseInt(money);

      recipient.data.cash += cash;
      recipient.outputChatBox(`${player.name} vam je dao novca ${cash} $.`);
      player.outputChatBox(`Dali ste igracu ${recipient.name} novca ${cash}.`);
   },

   'cash': (player, fullText) => { 
      player.outputChatBox(`pare kola kucke ${player.data.cash}.`);
   },

   'pos': (player, name = 'unnamed position') => {
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let pos = (player.vehicle) ? player.vehicle.position : player.position;
      let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;
  
      fs.appendFile(savedPosition, `Position: ${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"} - ${name}\r\n`, (err) => {
          if (err) {
              core.terminal(1, `Saving Position Error: ${err.message}`);
          } else {
              player.outputChatBox(`Trenutna pozicija: ${name} { X: ${player.position.x}, Y: ${player.position.y}, Z: ${player.position.z} }.`);
          }
      });
      
   },

   'givegun': (player, fullText, target, weapon = 'weapon_unarmed', ammo = 0) => {
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let weaponHash = mp.joaat(weapon);
      let recipient = account.findPlayer(target);

      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      recipient.giveWeapon(weaponHash, parseInt(ammo) || 500);
      recipient.outputChatBox(`${player.name} vam je dao oruzije ${weapon} sa ${ammo} metaka.`);
      player.outputChatBox(`Dali ste igracu ${recipient.name} oruzije ${weapon} sa ${ammo} metaka`);
   },

   'disarm': (player, fullText, target) => {
      if(player.admin < 3) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let recipient = account.findPlayer(target);

      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      recipient.removeAllWeapons();
      recipient.outputChatBox(`${player.name} vam je oduzeo vasa oruzija.`);
      player.outputChatBox(`Oduzeli ste sva oruzija ${recipient.name}.`);
   },

   'customization': (player, fullText) => {
      if(player.admin < 3) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      player.call("client:showCustomization");
   },

   'clothing': (player, fullText) => {
      if(player.admin < 3) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      player.call("client:showClothing");
   },

   'createveh': (player, fullText, model, c1r = 0, c1g = 0, c1b = 0, c2r = 0, c2g = 0, c2b = 0) => {
      if(player.admin < 3) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      mp.vehicles.create( { 
         model: model, position: player.position, rotation: player.heading,
         color: [{r: c1r, g: c1g, b: c1b}, {r: c1r, g: c1g, b: c1b}], owner: -1 } 
      );
   }, 

   'vehtune': (player, fullText, modType, modIndex) => {
      if(player.admin < 3) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      if (!player.vehicle) return player.notification('Morate biti u vozilu za koriscenje ove komande.', NOTIFY_ERROR, 4)
      
      player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
      player.outputChatBox(`Tip moda ${modType} sa indeksom moda ${modIndex} je postavljen.`);
   },

   'giveitem': (player, fullText) => {
      if (fullText) { 
         if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
         let args = fullText.split(' ');
         let quantity = args[0];
         let itemNameFull = args.slice(1).join(' ');
         
         console.log(`ime predmeta za davanje je ${itemNameFull}, kolicina ${quantity}`)
         inventoryCore.addItem(player, itemNameFull, quantity);
      }
   },

   'freeze': (player, fullText, target) => {
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);

      let recipient = account.findPlayer(target);
      if(!recipient) return player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4);
      recipient.frozen ? ( 
         recipient.frozen = false,
         recipient.call('client:freezePlayer', [false]),
         player.notification(`Odledili ste ${recipient.name} !`, NOTIFY_SUCCESS, 4),
         recipient.notification(recipient, `Admin ${player.name} vas je odledio !`, NOTIFY_SUCCESS, 4)
      ) : ( 
         recipient.frozen = true,
         recipient.call('client:freezePlayer', [true]),
         player.notification(`Zaledili ste ${recipient.name} !`, NOTIFY_SUCCESS, 4),
         recipient.notification(`Admin ${player.name} vas je zaledio !`, NOTIFY_SUCCESS, 4)
      );
   },

   'kill': (player, fullText, target) => { 
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let recipient = account.findPlayer(target);
      if(recipient) {
         recipient.health = 0;
         recipient.outputChatBox('Ubijeni ste od strane administratora.');

         player.outputChatBox(`Ubili ste igraca ${recipient.name}`);
      }
      else {
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4);
      }
      
   },

   'time': (player, fulltext, hour, minute, second) => {
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      mp.world.time.set(hour, minute, second);
   }, 

   'sethp': (player, fullText, target, health) => { 
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let recipient = account.findPlayer(target);
      let healthToSet = parseInt(health);
      if(healthToSet > 0 && healthToSet <= 100 ) {
         if(recipient) {
            recipient.health = healthToSet;
            recipient.outputChatBox(`Administrator vam je podesio helte na ${healthToSet}.`);
         }
         else { 
            player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4);
         }
      }
      else {
         player.notification('Minimalna vrednost 1 a maksimalna 100.', NOTIFY_ERROR, 4);
      }
   },

   'setarmour': (player, fullText, target, armour) => { 
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let recipient = account.findPlayer(target);
      let armourToSet = parseInt(armour);
      if(armourToSet > 0 && armourToSet <= 100 ) {
         if(recipient) {
            recipient.armour = armourToSet;
            recipient.outputChatBox(`Administrator vam je podesio armor na ${armourToSet}.`);
         }
         else { 
            player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4);
         }
      }
      else {
         player.notification('Minimalna vrednost 1 a maksimalna 100.', NOTIFY_ERROR, 4);
      }
   },

   'fixveh': (player, fullText) => {
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let vehToFix = player.vehicle;
      if(!vehToFix) 
         return player.notification('Morate biti u vozilu.', NOTIFY_ERROR, 4);
      else
         vehToFix.repair();
   },

   'a': (player, fullText) => { 
      if(player.admin < 1) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      account.sendAdminMessage(fullText);
   },

   'createbiz': (player, fullText, type, price) => {
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      business.create(player, type, price);
   },

   'createitem': (player, full, name, quant) => {
      if (player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let foundItem = inventory.findItem(name);
      if (foundItem) { 
         inventory.createItem(foundItem.name, foundItem.type, foundItem.hash, 0.12, quant, -1, -1, player.dimension, player.position);
      } else { 
         player.notification(MSG_ITEM_DOESNT_EXIST, NOTIFY_ERROR, 4);
      }
         
   },
   
   'destroyitem': (player, text) => {
      if(player.admin < 2) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let item = inventory.nearItem(player);
      if (item) {
          inventory.destroyItem(player, item);
      } 
   },

   'createhouse': (player, fullText, type, price) => {
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      houses.create(player, { type: type, price: price });
   },
   
   'destroyhouse': (player, fullText) => {
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let h = house.nearby(player);
      if (h) {
         house.delete(player, h);
      }
   },


   'createplant': (player, fullText, plant) => { 
      plants.create(player, { type: plant })
   },

   'destroybiz': (player, fullText) => {
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let bussines = business.nearby(player);
      if (bussines) {
          player.outputChatBox(`Nearest biz ${bussines.id} !`);
          business.delete(player, bussines);
      }
   },

   'editbiz': (player, fullText) => { 
      if(player.admin < 4) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      let bussines = business.nearby(player);
      if(bussines) {

      }
   },

});

