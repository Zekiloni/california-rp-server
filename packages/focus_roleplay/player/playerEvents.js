

mp.events.add('playerJoin', (player) => {
  player.call('client:showLogin');
});

mp.events.add("playerQuit", (player) => {
  account.playerQuit(player)
})

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
    'server:updatePlayerClothing': (player, clothingFinished) => {
        account.updateClothing(player.databaseID, clothingFinished);
    },

    'server:updatePlayerCustomization': (player, overlaysFinished, faceFeatures) => {
        account.updateOverlays(player.databaseID, overlaysFinished);
        account.updateFaceFeatures(player.databaseID, faceFeatures)
    },

    'playerCommand': (player, command) => {
        if(!player.loggedIn) return player.ouputChatBox('Morate biti ulogovani da biste koristili komande');
    }
});
