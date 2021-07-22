"use strict";
const Player = mp.players.local;
let browser = null, opened = false;
mp.events.add({
    'client:business.market:menu': (business) => {
        opened = !opened;
        if (opened) {
            browser = mp.browsers.new('package://business/business-interfaces/market.html');
            browser.execute('market.business = ' + JSON.stringify(business));
            Player.BrowserControls(true, true);
        }
        else {
            if (browser)
                browser.destroy();
            Player.BrowserControls(false, false);
        }
    },
    'client:business.market:buy': (bill, items, business) => {
        mp.events.call('client:business.market:menu');
        mp.events.callRemote('server:bussines.market:buy', bill, items, business);
    }
});
