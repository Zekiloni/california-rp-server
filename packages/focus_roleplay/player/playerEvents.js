

mp.events.add("server:playerDamage", (player, healthLoss, armorLoss) => {
  // armorLoss - hp
});

mp.events.add('server:handleLogin', async (player, username, password) => {
  var login = await account.login(username, password)

  if (login) { 
    await player.call('client:LoginStatus', [1])
    await account.load(player, username)
  }
  else { 
    await player.call('client:LoginStatus', [2])
  }
})

mp.events.add({

    'playerJoin': (player) => {
      player.call('client:showLogin');
    },

    'playerQuit': (player, exitType) => {
      account.playerQuit(player);

      switch(exitType)
      {
        case 'disconnect':
          account.sendProxMessage(player, 7, `(( ${player.name} je samovoljno napustio server. ))`, '6E6E6E', '6E6E6E', '6E6E6E', '6E6E6E', '6E6E6E');
          break;
        case 'timeout':
          account.sendProxMessage(player, 7, `(( ${player.name} je izgubio konekciju sa serverom. ))`, '6E6E6E', '6E6E6E', '6E6E6E', '6E6E6E', '6E6E6E');
          break;
        case 'kicked':
          account.sendProxMessage(player, 7, `(( ${player.name} je kikovan/banovan sa servera. ))`, '6E6E6E', '6E6E6E', '6E6E6E', '6E6E6E', '6E6E6E');
          break; 
      }
    },

    'playerEnterColshape': (player, shape) => {
      if (player.faction == FACTION_LSPD.ID) { 
         switch(shape.name) {
            case 'equip':
               player.call('client:showPoliceEquipment');
               break;

            case 'weapon':
               player.call('client:showPoliceWeaponary');
               break;
   
            case 'garage':
               player.call('client:showPoliceVehicles');
               break;
   
            default:
               return false;
          }
      }

      if (shape.job) {
        if (player.job == 0) { 
          let jobData = JOBS.find( ({ID}) => ID === shape.job);
          player.call('client:showJobOffer', [jobData.ID, jobData.NAME, jobData.LOC, jobData.DESC]);
        } else { 
          account.notification(player, MSG_ALREADY_EMPLOYED, NOTIFY_ERROR, 4);
        }
      }
   },

    'playerDeath': (player, reason, killer) => {
      player.isDead = true;
      player.respawnTimer = setTimeout(() => {
          player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
          player.isDead = false;
      }, 60000)
    },

    'playerChat': (player, text) => {
      if (!player.data.loggedIn) return;
      account.sendProxMessage(player, CHAT_RADIUS.IC, `${player.name}: ${text}`, 'FFFFFF', 'E6E6E6', 'C8C8C8', 'AAAAAA', '6E6E6E');
    },

    'server:updatePlayerClothing': (player, clothingFinished) => {
        account.updateClothing(player, clothingFinished);
    },

    'server:getPlayerInventory': (player) => { 
      if (player.data.loggedIn) { 
        let pInventory = inventory.getPlayerInventory(player)
        player.call('client:openInventory', [pInventory])
      } else { 
        return false; 
      }
    },

    'server:updatePlayerCustomization': (player, overlaysFinished, faceFeatures, blendData) => {
        account.updateOverlays(player, overlaysFinished);
        account.updateFaceFeatures(player, faceFeatures)
        account.updateBlendData(player, blendData);
    },

    'playerCommand': (player, command) => {
        if (!player.data.loggedIn) return player.ouputChatBox('Morate biti ulogovani da biste koristili komande');
    },

    'server:playerBanking': (player) => { 
      player.call(`client:showATM`, [player.name, player.data.cash, player.databaseID]);
    },

    'server:acceptJobOffer': (player, jobID) => { 
      let job = JOBS.find( ({ID}) => ID === jobID);
      player.job = jobID;
      account.notification(player, `Uspešno ste se zaposlili kao ${job.NAME}.`, NOTIFY_SUCCESS, 4);
    },

    'server:processInventoryItem': (player, item_id, status, target, quantity) => { 
      let item = inventoryItems.find( ({ id }) => id === parseInt(item_id) );
      switch(status) { 
        case 'drop': 
            inventory.dropItem(player, item_id);
            break;

        case 'give': 
            let recipient = account.findPlayer(target);
            if (!recipient) return account.notification(player, MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4) 
            inventory.giveItem(player, item, recipient, quantity) 
            break;

        case 'use': 
            inventory.useItem(player, item_id);
            break;

        default:
            return false;
      }
    },

    'server:vehicleEngine': (player, vehicle) => { 
      if (vehicle.engine) { 
        vehicle.engine = false;
        account.notification(player, MSG_ENGINE_OFF, NOTIFY_ERROR, 4); 
      } else { 
        setTimeout(() => { vehicle.engine = true; }, 2500); 
        account.notification(player, MSG_ENGINE_ON, NOTIFY_SUCCESS, 4);
      }
    },

    'playerEnterVehicle': (player, vehicle, seat) => { 
      if (seat == 0) { player.call('client:showVehicleHUD', [true]); }
      if (vehicle.job) { if (vehicle.job != player.job) return player.removeFromVehicle(); }
    },

    'server:vehicleIndicators': (player, indicatorID) => {
      let vehicle = player.vehicle;
      if (vehicle && player.seat == 0) {
        switch (indicatorID) {
          case 0:
            vehicle.data.IndicatorRight = !vehicle.data.IndicatorRight; // right
            break;
          case 1:
            vehicle.data.IndicatorLeft = !vehicle.data.IndicatorLeft; // left
            break;
        }
      }
    },

    'playerExitVehicle': (player, vehicle) => { 
      player.call('client:showVehicleHUD', [false])
    },

    'playerEnterCheckpoint': (player, checkpoint) => {
      if(player.checkpoint == checkpoint) {
        player.checkpoint ++;
        mp.gui.chat.push(`[debug] Usao si u checkpont ID: ${checkpoint.ID}, ukupno: ${player.checkpoint}`);
        if(player.checkpoint >= player.maxCheckpoints) {
          player.checkpoint = 0;
          player.maxCheckpoints = 0;
          account.notification(player, `Uspešno ste se završili rutu.`, NOTIFY_SUCCESS, 4);
        }
        else {
          account.notification(player, `Sačekajte da se putnici ukrcaju.`, NOTIFY_SUCCESS, 4);
        }
      }
    }
});
