
const moods = [
    { Name: 'Normal', AnimName: null },
    { Name: 'Aiming', AnimName: 'mood_aiming_1' },
    { Name: 'Angry', AnimName: 'mood_angry_1' },
    { Name: 'Drunk', AnimName: 'mood_drunk_1' },
    { Name: 'Happy', AnimName: 'mood_happy_1' },
    { Name: 'Injured', AnimName: 'mood_injured_1' },
    { Name: 'Stressed', AnimName: 'mood_stressed_1' },
    { Name: 'Sulking', AnimName: 'mood_sulk_1' },
];
 
function setMood(player, mood) {
    if (!mood) {
        player.clearFacialIdleAnimOverride();
    } else {
        mp.game.invoke('0xFFC24B988B938B38', player.handle, mood, 0);
    }
}

mp.events.addDataHandler('mood', (entity, value) => {
    if (entity.type === "player") setMood(entity, value);
});

mp.events.add({
    'entityStreamIn': (entity) => {
        if (entity.type === "player") setMood(entity, entity.getVariable('mood'));
    },

    'client:player.mood': (mood) => { 
        mp.events.callRemote("server:player.mood", mood);
    }
});

