
var loginCEF, 
    player = mp.players.local,
    loginCamera;

mp.events.add({
  'client:login.show': () => {
    loginCEF = mp.browsers.new('package://authentication/auth-interface/auth.html');
    mp.players.local.freezePosition(true);
    mp.gui.chat.activate(false);
    setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
    mp.game.ui.displayRadar(false);
    mp.events.call('client:login.enableCamera');
    mp.game.graphics.transitionToBlurred(1000);
  },

  'client:login.enableCamera': () => {
    loginCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
    mp.players.local.position = new mp.Vector3(-2022.89, -1214.94, 54.65);
    mp.players.local.freezePosition(true);
    loginCamera.setActive(true);
    loginCamera.setCoord(-2022.89, -1214.94, 49.65);
    loginCamera.pointAtCoord(-1915.13, -1180.98, 47.56);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
  },

  'client:disableLoginCamera': () => {
    loginCEF.destroy();
    loginCamera.destroy();
    mp.gui.chat.activate(true);
    mp.game.ui.displayRadar(true);
    setTimeout(() => { 
      mp.gui.cursor.show(false, false); 
      mp.events.call('client:showPlayerHUD', true);
    }, 500);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    mp.players.local.freezePosition(false);
    mp.game.graphics.transitionFromBlurred(1000);
    mp.discord.update(`Focus Roleplay`, `Igra kao ${player.name}`)
  },

  'client:login.sendCredentials':  (username, password) => {
    mp.events.callRemote('server:login.handle', username, password);
  },

  'client:login.status': (status, characters) => { 
    switch (status) { 
      case 1:
        loginCEF.execute(`error('Šifra koju ste uneli nije tačna.', '#user-password')`);
        break;

      case 2:
        loginCEF.execute(`error('Šifra koju ste uneli nije tačna.', '#user-password')`);
        break;

      case 3:
        loginCEF.execute(`selector.init(${JSON.stringify(characters)})`);
        break;

      default:
        return false;
    }
  }
});

