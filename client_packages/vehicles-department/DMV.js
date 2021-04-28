

const player = mp.players.local;
let licensesBrowser, opened = false;

mp.events.add({
   'client:player.dmv.browser': () => { 
      if (!opened) { 
         licensesBrowser = mp.browsers.new('package://vehicles-department/dmv-interface/dmv.html');
         licensesBrowser.execute('dmv.player.money = ' + player.money + ', dmv.player.name = ' + player.name + ';')
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);

      } else { 
         licensesBrowser.destroy();
         opened = false;
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 1000);
      }
   },
   
   'client:player.dmv.driving': (license) => { 
      mp.events.call('client:player.dmv.browser');
      mp.events.callRemote('server:dmv.driving', license);
   }
})