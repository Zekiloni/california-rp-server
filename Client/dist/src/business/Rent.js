"use strict";
const Player = mp.players.local;
let browser = null, opened = false;
mp.events.add({
    'client:business.rent:menu': (business) => {
        opened = !opened;
        if (opened) {
            browser = mp.browsers.new('package://business/business-interfaces/rent.html');
            browser.execute('');
            Player.BrowserControls(true, true);
        }
        else {
            if (browser)
                browser.destroy();
            Player.BrowserControls(false, false);
        }
    }
});
