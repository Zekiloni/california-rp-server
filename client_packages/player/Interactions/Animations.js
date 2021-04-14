

const player = mp.players.local;

mp.events.add({
	'entityStreamIn': (entity) => {
	
	},

	'client:player.animation': (animation, dictionary) => {
		mp.game.streaming.requestAnimDict(dictionary);
		while (!mp.game.streaming.hasAnimDictLoaded(dictionary)) mp.game.wait(0);
		player.taskPlayAnim(dictionary, animation, 8.0, 0.0, -1, 0, 0.0, false, false, false);
		
	}
})
