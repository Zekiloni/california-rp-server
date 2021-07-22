"use strict";
const player = mp.players.local;
let browser = mp.browsers.new('package://player/phone-interface/phone.html'), opened = false;
mp.events.add({
    'client:player.phone': (phone) => {
        if (!opened) {
            opened = true;
            browser.execute('phone.toggle = true');
        }
        else {
            opened = false;
            browser.execute('phone.toggle = false');
        }
    },
    'client:player.phone.contacts': (action, info) => {
        info = JSON.parse(info);
        switch (action) {
            case 'add': {
                mp.events.callRemote('server:player.phone.contacts.add', info.name, info.number);
                break;
            }
            case 'remove': {
                mp.events.callRemote('server:player.phone.contacts.remove', info.id);
                break;
            }
        }
    }
});
