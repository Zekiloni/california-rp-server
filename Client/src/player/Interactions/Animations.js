

const player = mp.players.local;


mp.events.add({
	'entityStreamIn' : (entity) =>  {
		 if(entity.type == 'player')
		 {
			if (entity.hasVariable("animData")) {
			  const value = entity.getVariable("animData");
			  if (null != value) {
					const anim = value.split("%");
					loadAnimDict(anim[0], function() {
						 mp.players.exists(entity) && 0 !== entity.handle && entity.taskPlayAnim(anim[0], anim[1], 1, 0, -1, parseInt(anim[2]), 1, !1, !1, !1)
					})
			  }
			}          
		 }
	},
});


mp.events.addDataHandler("animData", function(a, b) {
	if (0 !== a.handle)
		 if (null != b) {
			  const c = b.split("%");
			  loadAnimDict(c[0], function() {
					mp.players.exists(a) && 0 !== a.handle && (a.clearTasksImmediately(), a.taskPlayAnim(c[0], c[1], 1, 0, -1, parseInt(c[2]), 1, !1, !1, !1))
			  })
		 } //else a.clearTasksImmediately()
});

mp.keys.bind(0x20, true, function() {
	if (player.logged && player.spawned) { 
		if (entity.hasVariable("animData")) {
			const value = entity.getVariable("animData");
			if (null != value) {
				const anim = value.split("%");
				let playing = player.isPlayingAnim(anim[0], anim[1]);
				if (playing) { 
					player.stopAnimTask(anim[0], anim[1], 3.0);
				}
			}
		}
	}
});