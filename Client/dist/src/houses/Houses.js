"use strict";
const player = mp.players.local;
let browser = null, opened = false, house = null;
mp.events.add({
    'client:house.management': () => {
        opened = !opened;
        if (opened) {
            setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);
            browser = mp.browsers.new('package://houses/houses-interfaces/house.html');
            player.BrowserControls(true, true);
            // let info = await mp.events.callRemoteProc('server:house.management.info', house);
            // info = JSON.stringify(info);
            // browser.execute('house.player.money = ' + player.money);
            // browser.execute('house.player.money = ' + player.money);
        }
        else {
            browser.destroy();
            player.BrowserControls(false, false);
            setTimeout(() => { mp.gui.cursor.show(false, false); }, 300);
        }
    },
    'client:house.money.update': (info) => {
        mp.events.callRemote('server:house.update', info);
    }
});
