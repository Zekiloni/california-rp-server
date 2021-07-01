const plants = require("../core/plants");

mp.events.addCommand({



   'vehtune': (player, fullText, modType, modIndex) => {
      if(player.admin < 3) return player.notification(MSG_NOT_ALLOWED, NOTIFY_ERROR, 4);
      if (!player.vehicle) return player.notification('Morate biti u vozilu za koriscenje ove komande.', NOTIFY_ERROR, 4)
      
      player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
      player.outputChatBox(`Tip moda ${modType} sa indeksom moda ${modIndex} je postavljen.`);
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
   }

});

