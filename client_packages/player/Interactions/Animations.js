

const player = mp.players.local;
let animation = { 
	name: null,
	dictionary: null
}

mp.events.add({
	'entityStreamIn': (entity) => {
	
	},

	'client:player.animation': (animName, animDict, flag, time = 5) => {
		mp.game.streaming.requestAnimDict(animDict);
		while (!mp.game.streaming.hasAnimDictLoaded(animDict)) mp.game.wait(0);
		player.taskPlayAnim(animDict, animName, 8.0, 0.0, -1, flag, 0.0, false, false, false);	
		animation.name = animName;
		animation.dictionary = animDict;
		setTimeout(() => {
			player.stopAnimTask(animDict, animName, 3.0);
		}, time * 1000);
	}
})

mp.keys.bind(0x20, true, function() {
	if (player.logged && player.spawned) { 
		let playing = player.isPlayingAnim(animation.dictionary, animation.name, 3);
		if (playing) { 
			player.stopAnimTask(animation.dictionary, animation.name, 3.0);
		}
	}
});

