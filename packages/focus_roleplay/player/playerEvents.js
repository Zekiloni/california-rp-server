

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

      if (shape.job != 0) {
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
      account.sendProxMessage(player, CHAT_RADIUS.IC, `${player.name}: ${text}`, 'FFFFFF', 'E6E6E6', 'C8C8C8', 'AAAAAA', '6E6E6E');
    },

    'server:updatePlayerClothing': (player, clothingFinished) => {
        account.updateClothing(player, clothingFinished);
    },

    'server:updatePlayerCustomization': (player, overlaysFinished, faceFeatures, blendData) => {
        account.updateOverlays(player, overlaysFinished);
        account.updateFaceFeatures(player, faceFeatures)
        account.updateBlendData(player, blendData);
    },

    'playerCommand': (player, command) => {
        if(!player.loggedIn) return player.ouputChatBox('Morate biti ulogovani da biste koristili komande');
    },

    'server:playerBanking': (player) => { 
      player.call(`client:showATM`, [player.name, player.data.cash, player.databaseID]);
    },

    'server:acceptJobOffer': (player, jobID) => { 
      console.log(`prihvatio ponudu ${jobID}`)
      let job = JOBS.find( ({ID}) => ID === jobID);
      player.job = jobID;
      account.notification(player, `Uspešno ste se zaposlili kao ${job.NAME}.`, NOTIFY_SUCCESS, 4);
    }
});
