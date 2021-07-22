"use strict";
const Player = mp.players.local;
let browser = null, opened = false;
const Pumps = [1339433404, 1694452750, 1933174915, 2287735495];
mp.events.add({
    'client:business.gas:menu': (info) => {
        opened = !opened;
        if (opened) {
            browser = mp.browsers.new('package://business/business-interfaces/fuel.html');
            browser.execute('station.Business = ' + JSON.stringify(info.Business));
            Player.BrowserControls(true, true);
        }
        else {
            if (browser)
                browser.destroy();
            Player.BrowserControls(false, false);
        }
    }
});
mp.events.addProc({
    'client:business.gas:nearpump': async () => {
        const Position = Player.position;
        return new Promise((resolve) => {
            for (const Pump of Pumps) {
                let object = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 3.0, Pump, false, true, true);
                if (object) {
                    resolve(true);
                    break;
                }
            }
        });
    }
});
