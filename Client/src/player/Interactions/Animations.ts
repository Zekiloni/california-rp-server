// import { LoadAnimationDictionary } from "../../Utils";

// const player = mp.players.local;


// mp.events.add({
// 	'entityStreamIn': (Entity: EntityMp) => {
// 		if (Entity.type == 'player') {
// 			if (Entity.hasVariable("animData")) {
// 				const value = Entity.getVariable("animData");
// 				if (null != value) {
// 					const anim = value.split("%");
// 					LoadAnimationDictionary(anim[0]).then(() => {
// 						mp.players.exists(<PlayerMp>Entity) && 0 !== Entity.handle && (<PlayerMp>Entity).taskPlayAnim(anim[0], anim[1], 1, 0, -1, parseInt(anim[2]), 1, !1, !1, !1)
// 					})
// 				}
// 			}
// 		}
// 	},
// });


// mp.events.addDataHandler("animData", function (Entity: EntityMp, Value: any) {
// 	if (0 !== Entity.handle)
// 		if (null != Value) {
// 			const c = Value.split("%");
// 			LoadAnimationDictionary(c[0]).then(() => {
// 				mp.players.exists(<PlayerMp>Entity) && 0 !== (<PlayerMp>Entity).handle && ((<PlayerMp>Entity).clearTasksImmediately(), (<PlayerMp>Entity).taskPlayAnim(c[0], c[1], 1, 0, -1, parseInt(c[2]), 1, !1, !1, !1))
// 			})
// 		} //else a.clearTasksImmediately()
// });

// mp.keys.bind(0x20, true, function () {
// 	if (player.Logged && player.Spawned) {
// 		if (Player.hasVariable("animData")) {
// 			const value = Player.getVariable("animData");
// 			if (null != value) {
// 				const anim = value.split("%");
// 				let playing = player.isPlayingAnim(anim[0], anim[1]);
// 				if (playing) {
// 					player.stopAnimTask(anim[0], anim[1], 3.0);
// 				}
// 			}
// 		}
// 	}
// });