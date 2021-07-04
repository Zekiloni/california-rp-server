

const Player = mp.players.local;
let browser = null, opened = false, camera = null;

const Login = { 
   Position: new mp.Vector3(-1400.48, -1699.92, 5.00),
   CameraPosition: new mp.Vector3(-1400.48, -1699.92, 3.06),
   LookAt: new mp.Vector3(-1387.16, -1685.1, 5.37)
}


mp.events.add({
   'client:player.login:show': () => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/game-interface/auth.html');
         Player.BrowserControls(true, true);
         Player.freezePosition(true);
         Player.LoginCamera(true);
         mp.game.ui.displayRadar(false);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
         Player.freezePosition(false);
         Player.LoginCamera(false);
         mp.game.ui.displayRadar(true);
      }
   },

   'client:player.login:credentials': async (username, password) => { 
      try {
         const response = await mp.events.callRemoteProc('server:player.login:credentials', username, password);
         mp.gui.chat.push(JSON.stringify(response));
         browser.execute('start.Init(' + JSON.stringify(response) + ')');
      } catch (e) {
         mp.gui.chat.push(e);
         browser.execute('start.Notify(\"' + e +'\");');
      }

      // mp.events.callRemoteProc('server:player.login:credentials', username, password).then((Info) => { 
      //    mp.gui.chat.push(JSON.stringify(Info));
      //    browser.execute('start.Init(' + JSON.stringify(Info) + ')');
      // }).catch((Error) => {
      //    mp.gui.chat.push('greska');
      //    browser.execute('start.Notify(\"' + Error +'\");');
      //    mp.gui.chat.push(JSON.stringify(Error));
      // });
      // mp.gui.chat.push('Zavrseno');
   },

   'client:player.character:select': (character) => { 
      mp.game.cam.doScreenFadeOut(3000);
      setTimeout(() => {
         mp.events.call('client:player.login:show');
         mp.events.callRemote('server:player.character:select', character);
         mp.game.cam.doScreenFadeIn(3000);
      }, 3000);
   },

   'client:player.character:creator': () => { 
      mp.events.call('client:player.login:show');
      mp.events.call('client:player.character.creator:show');
   },

   'client:player.character:delete': async (character) => { 
      let response = await mp.events.callRemoteProc('server:player.character:delete', character);
      response ? ( browser.execute('start.Delete(' + character + ');')) : ( browser.execute('start.Notify(`Došlo je do greške pri brisanju karaktera !`);'));
   }
});


function LoginCamera (toggle) { 
   if (toggle) { 
      camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Player.position = Login.Position;
      camera.setActive(true);
      camera.setCoord(Login.CameraPosition.x, Login.CameraPosition.y, Login.CameraPosition.z);
      camera.pointAtCoord(Login.LookAt.x, Login.LookAt.y, Login.LookAt.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
   } else { 
      if (camera) camera.destroy();
      camera = null;
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
   }
}

function Discord (status, string) { 
   mp.discord.update(status, string);
}


Player.Discord = Discord;
Player.LoginCamera = LoginCamera;