"use strict";
const Player = mp.players.local;
let browser = null, opened = false;
mp.events.add({
    'client:business.drinks:menu': (info) => {
        opened = !opened;
        if (opened) {
            browser = mp.browsers.new('package://business/business-interfaces/drinks.html');
            browser.execute('drinks.Business = ' + JSON.stringify(info));
            Player.BrowserControls(true, true);
        }
        else {
            if (browser)
                browser.destroy();
            Player.BrowserControls(false, false);
        }
    },
    'client:business.drinks:buy': (price, item, business) => {
        mp.events.callRemote('server:business.drinks:buy', price, item, business);
    }
});
