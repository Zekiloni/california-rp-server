

const player = mp.players.local;
let interactionMenu, opened = false;

const moods = [
    { name: 'Normalna', AnimName: 'normal' },
    { name: 'Zamišljena', AnimName: 'mood_aiming_1' },
    { name: 'Ljutita', AnimName: 'mood_angry_1' },
    { name: 'Pijana', AnimName: 'mood_drunk_1' },
    { name: 'Srećna', AnimName: 'mood_happy_1' },
    { name: 'Povredjena', AnimName: 'mood_injured_1' },
    { name: 'Stresirana', AnimName: 'mood_stressed_1' },
    { name: 'Uvređena', AnimName: 'mood_sulk_1' }
];
 
function setMood(player, mood) {
    if (mood == 'normal') {
        player.clearFacialIdleAnimOverride();
    } else {
        mp.game.invoke('0xFFC24B988B938B38', player.handle, mood, 0);
    }
}

mp.events.addDataHandler('mood', (entity, value) => {
    if (entity.type === 'player') setMood(entity, value);
});

mp.events.add({
    'entityStreamIn': (entity) => {
        if (entity.type === 'player') setMood(entity, entity.getVariable('mood'));
    },

    'client:player.interactions.menu': (toggle) => { 
        if (toggle) { 
            interactionMenu = mp.browsers.new('package://player/Interactions/interactions-interface/interactions.html');
            interactionMenu.execute(`interactions.moods = ${JSON.stringify(moods)}`);
            opened = true;
            setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
        } else { 
            opened = false;
            setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
            interactionMenu.destroy();
            
        }
    },

    'client:player.mood': (mood) => { 
        mp.events.callRemote('server:player.mood', mood);
    }
});


mp.keys.bind(0x4D, false, function() {
    if (mp.players.local.isTypingInTextChat) return;
    if (player.logged && player.spawned) { 
        if (opened) { 
            mp.events.call('client:player.interactions.menu', false);
        } else { 
            mp.events.call('client:player.interactions.menu', true);
        }
    }
 });
 
