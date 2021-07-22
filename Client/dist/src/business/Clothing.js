"use strict";
const Player = mp.players.local;
let browser = null, opened = false;
mp.events.add({
    'client:business.clothing:menu': (info) => {
        opened = !opened;
        if (opened) {
            browser = mp.browsers.new('package://business/business-interfaces/clothing.html');
            browser.execute('clothing.Business = ' + JSON.stringify(info));
            Player.BrowserControls(true, true);
            utils.PlayerPreviewCamera(true);
        }
        else {
            if (browser)
                browser.destroy();
            Player.BrowserControls(false, false);
            utils.PlayerPreviewCamera(false);
            mp.events.callRemote('server:character.clothing:restart');
        }
    },
    'client:business.clothing:model:preview': (x, component, variation) => {
        Player.setComponentVariation(component, variation, 0, 2);
    },
    'client:business.clothing:texture:preview': (x, component, texture) => {
        const Variation = Player.getDrawableVariation(component);
        Player.setComponentVariation(component, Variation, texture, 2);
    },
    'client:business.clothing:buy': (total, items, biz) => {
        mp.events.call('client:business.clothing:menu');
        mp.events.callRemote('server:business.clothing:buy', total, items, biz);
    }
});
