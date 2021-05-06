
const player = mp.players.local;

let browser = mp.browsers.new('package://houses/houses-interfaces/house.html'),
   opened = false, house = null;

mp.events.add({
   'client:player.house.management': () => { 
      browser.execute('house.toggle = !house.toggle');
      opened = !opened;
      if (opened) { 
         let info = await mp.events.callRemoteProc('server:house.management.info', house);
         info = JSON.stringify(info);
         browser.execute('house.player.money = ' + player.money);
         browser.execute('house.player.money = ' + player.money);
      }
   },


   'client:player.house.money.update': (info) => { 
      mp.events.callRemote('server:house.update', info)
   }
})