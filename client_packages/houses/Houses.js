
const player = mp.players.local;

let browser = mp.browsers.new('package://houses/houses-interfaces/house.html'),
   opened = false, house = null;

mp.events.add({
   'client:house.management': () => { 
      browser.execute('house.toggle = !house.toggle');
      opened = !opened;
      if (opened) { 
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);
         // let info = await mp.events.callRemoteProc('server:house.management.info', house);
         // info = JSON.stringify(info);
         // browser.execute('house.player.money = ' + player.money);
         // browser.execute('house.player.money = ' + player.money);
      } else { 
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 300);

      }
   },


   'client:house.money.update': (info) => { 
      mp.events.callRemote('server:house.update', info)
   }
})