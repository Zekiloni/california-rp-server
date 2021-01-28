
var loginCEF, 
    player = mp.players.local,
    loginCam;


mp.events.add('client:showLogin', () => {
  loginCEF = mp.browsers.new('package://authentication/auth-interface/login.html');
  mp.players.local.freezePosition(true);
  //mp.game.ui.setMinimapVisible(true);
  mp.gui.chat.activate(false);
  mp.gui.chat.show(false);
  setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
  mp.game.ui.displayRadar(false);
  mp.events.call('client:enableLoginCamera');
  mp.game.graphics.transitionToBlurred(1000);
  mp.events.call("client:screenEffect", "MP_job_load", 100000);
});

mp.events.add('client:enableLoginCamera', () => {
  loginCam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
  mp.players.local.position = new mp.Vector3(-2172.62, -1027.5, 20.66);
  mp.players.local.freezePosition(true);
  loginCam.setActive(true);
  loginCam.setCoord(-2175.62, -1030.5, 20.66);
  loginCam.pointAtCoord(-2134.11, -1024.2, 20.66);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add('client:disableLoginCamera', () => {
  loginCEF.destroy();
  loginCam.destroy();
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.game.ui.displayRadar(true);
  setTimeout(() => { 
    mp.gui.cursor.show(false, false); 
    mp.events.call('client:showPlayerHUD', true);
  }, 500);
  mp.game.cam.renderScriptCams(false, false, 0, false, false);
  mp.players.local.freezePosition(false);
  mp.game.graphics.transitionFromBlurred(1000);
  mp.events.call("client:screenEffect", "MP_job_load", 1);
});

mp.events.add('client:sendLoginToServer',  (userName, password) => {
  mp.events.callRemote('server:handleLogin', userName, password);
});


mp.events.add('client:LoginStatus', (status) => { 
  if (status == 1) { 
    mp.events.call('client:disableLoginCamera');
  }
  else if (status == 2) {
    loginCEF.execute(`Upozorenje("cao");`);
  }
})
