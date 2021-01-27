
mp.events.add('client:screenEffect', (effect, duration) => {
    mp.game.graphics.startScreenEffect(effect, duration, false);
});