"use strict";
const Player = mp.players.local;
let browsers = { licenses: null, identity: null };
let opened = { licenses: false, identity: false };
const Controls = {
    Enter: 0x0D
};
mp.events.add({
    'client:player.documents:show': (Document, Info) => {
        switch (Document) {
            case 'identity': {
                opened.identity = !opened.identity;
                if (opened.identity) {
                    browsers.identity = mp.browsers.new('package://player/documents/documents-interfaces/identity.html');
                    browsers.identity.execute('identity.player = ' + JSON.stringify(Info));
                }
                else {
                    if (browsers.identity)
                        browsers.identity.destroy();
                }
                break;
            }
            case 'licenses': {
                opened.licenses = !opened.licenses;
                if (opened.licenses) {
                    browsers.licenses = mp.browsers.new('package://player/documents/documents-interfaces/licenses.html');
                    browsers.licenses.execute('licenses.player = ' + JSON.stringify(Info));
                }
                else {
                    if (browsers.licenses)
                        browsers.licenses.destroy();
                }
                break;
            }
        }
    }
});
mp.keys.bind(Controls.Enter, false, function (e) {
    if (Player.logged && Player.spawned) {
        if (Player.isTypingInTextChat)
            return;
        if (opened.identity)
            mp.events.call('client:player.documents:show', 'identity');
        if (opened.licenses)
            mp.events.call('client:player.documents:show', 'licenses');
    }
});
