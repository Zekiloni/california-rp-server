

const player = mp.players.local;
let anim = { 
	name: null,
	dictionary: null
}

// 'bank': (entity, newBank, oldBank) => {
// 	if (entity && entity.remoteId === player.remoteId && newBank !== oldBank) {
// 		player.bank = newBank;
// 	}

// SINHRONIIZACIJA ANIMACIJA

mp.events.addDataHandler('animation', function(entity, newValue) {
	if (0 !== entity.handle)
		if (null != newValue) {
			while (!mp.game.streaming.hasAnimDictLoaded(newValue.dictionary)) mp.game.wait(0);
			mp.players.exists(entity) && 0 !== entity.handle && (entity.clearTasksImmediately(), entity.taskPlayAnim(newValue.dictionary, newValue.name, 1, 0, -1, parseInt(newValue.flag), 1, !1, !1, !1))
		} //else a.clearTasksImmediately()
});

mp.events.add({
	// SINHRONIIZACIJA ANIMACIJA

	'entityStreamIn': (entity) => {
		if (entity.type == 'player')
		{
			if (entity.hasVariable('animation')) {
            let animation = entity.getVariable('animation');
				if (null != animation) {
					while (!mp.game.streaming.hasAnimDictLoaded(animation.dictionary)) mp.game.wait(0);
					mp.players.exists(entity) && 0 !== entity.handle && (entity.clearTasksImmediately(), entity.taskPlayAnim(animation.dictionary, animation.name, 1, 0, -1, parseInt(animation.flag), 1, !1, !1, !1))
				}
			}
		}
	},

	// SINHRONIIZACIJA ANIMACIJA

	'client:player.animation': (animName, animDict, flag = 0, time = 5) => {
		mp.game.streaming.requestAnimDict(animDict);
		while (!mp.game.streaming.hasAnimDictLoaded(animDict)) mp.game.wait(0);
		player.taskPlayAnim(animDict, animName, 8.0, 0.0, -1, flag, 0.0, false, false, false);	
		anim.name = animName;
		anim.dictionary = animDict;
		setTimeout(() => {
			player.stopAnimTask(animDict, animName, 3.0);
		}, time * 1000);
	}
})

mp.keys.bind(0x20, true, function() {
	if (player.logged && player.spawned) { 
		if (anim.dictionary != null && anim.name != null) { 
			let playing = player.isPlayingAnim(anim.dictionary, anim.name, 3);
			if (playing) { 
				player.stopAnimTask(anim.dictionary, anim.name, 3.0);
				anim.dictionary = null, anim.name = null;
			}
		}
	}
});

