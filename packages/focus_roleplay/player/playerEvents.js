

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

    'playerQuit': (player) => {
      account.playerQuit(player)
    },

    'playerDeath': (player, reason, killer) => {
      setTimeout(() => {
          player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544))
      }, 3000)
    },

    'playerChat': (player, text) => {
      account.sendProxMessage(player, 7.2, `${player.name}: ${text}`, 'FFFFFF', 'E6E6E6', 'C8C8C8', 'AAAAAA');
    },

    'server:updatePlayerClothing': (player, clothingFinished) => {
        account.updateClothing(player, clothingFinished);
    },

    'server:updatePlayerCustomization': (player, overlaysFinished, faceFeatures) => {
        account.updateOverlays(player, overlaysFinished);
        account.updateFaceFeatures(player, faceFeatures)
    },

    'playerCommand': (player, command) => {
        if(!player.loggedIn) return player.ouputChatBox('Morate biti ulogovani da biste koristili komande');
    }
});
