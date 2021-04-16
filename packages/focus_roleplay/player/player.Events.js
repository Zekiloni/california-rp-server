


mp.events.add("server:onPlayerDamageHimself", (player, healthLoss) => {
  // 
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

    'playerQuit': (player, exitType) => {
      //account.playerQuit(player);

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
          player.notification(MSG_ALREADY_EMPLOYED, NOTIFY_ERROR, 4);
        }
      }
   },

    'server:updatePlayerClothing': (player, clothingFinished) => {
        account.updateClothing(player, clothingFinished);
    },


    'server:getPlayerInventory': (player) => { 
      if (player.data.logged) { 
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
        if (!player.data.logged) return player.ouputChatBox('Morate biti ulogovani da biste koristili komande');
    },

    'server:playerBanking': (player) => { 
      player.call(`client:showATM`, [player.name, player.data.cash, player.databaseID]);
    },

    'server:acceptJobOffer': (player, jobID) => { 
      let job = JOBS.find( ({ID}) => ID === jobID);
      player.job = jobID;
      player.notification(`Uspešno ste se zaposlili kao ${job.NAME}.`, NOTIFY_SUCCESS, 4);
    },

    'server:processInventoryItem': (player, item_id, status, target, quantity) => { 
      let item = mp.items.find( ({ id }) => id === parseInt(item_id) );
      switch(status) { 
        case 'drop': 
            inventory.dropItem(player, item_id);
            break;

        case 'give': 
            let recipient = account.findPlayer(target);
            if (!recipient) return player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4) 
            inventory.giveItem(player, item, recipient, quantity) 
            break;

        case 'use': 
            inventory.useItem(player, item_id);
            break;

        default:
            return false;
      }
    },

    'playerEnterCheckpoint': (player, checkpoint) => {
      if(player.checkpoint == checkpoint) {
        player.checkpoint ++;
        mp.gui.chat.push(`[debug] Usao si u checkpont ID: ${checkpoint.ID}, ukupno: ${player.checkpoint}`);
        if(player.checkpoint >= player.maxCheckpoints) {
          player.checkpoint = 0;
          player.maxCheckpoints = 0;
          player.notification(`Uspešno ste se završili rutu.`, NOTIFY_SUCCESS, 4);
        }
        else {
          player.notification(`Sačekajte da se putnici ukrcaju.`, NOTIFY_SUCCESS, 4);
        }
      }
    }
});
