// // FOCUS ROLEPLAY DIAMOND CASINO - Slots


// const localPlayer = mp.players.local;

// let lpSlotMachine = null,
//     slotMachineToJoin = null,
//     interactingWithSlotMachine = null,
//     canSpin = false,
//     interactingWithSlotMachineTimeout = null,
//     slotMachineData = [];

// let SPINNING_TIME = []; 
// SPINNING_TIME[1] = [2000,2500,3000];
// SPINNING_TIME[2] = [2000,4000,6000];

// const reelsOffsets = 
// [
// 	[-0.115, 0.047, 1.106],
// 	[0.005, 0.047, 1.106],
// 	[0.125, 0.047, 1.106]
// ]

// let slotMachineBets = [];
// slotMachineBets[1] = 100;
// slotMachineBets[2] = 25;
// slotMachineBets[3] = 25;
// slotMachineBets[4] = 5;
// slotMachineBets[5] = 500;
// slotMachineBets[6] = 100;
// slotMachineBets[7] = 500;
// slotMachineBets[8] = 5;

// let slotMachineNames = [];
// slotMachineNames[1] = "Angel and the Knight";
// slotMachineNames[2] = "Impotent RAGE";
// slotMachineNames[3] = "Republican Space Rangers";
// slotMachineNames[4] = "Fame or Shame";
// slotMachineNames[5] = "Deity of the Sun";
// slotMachineNames[6] = "Twilight Knife";
// slotMachineNames[7] = "Diamond Miner";
// slotMachineNames[8] = "Evacuator";

// const slotMachinePos =
// [
// 	{ "type": 1, "x": 1135.1024169921875, "y": 256.709716796875, "z": -52.03075408935547, "rz": 101.998046875 },
// 	{ "type": 1, "x": 1120.8575439453125, "y": 233.18858337402344, "z": -50.84077453613281, "rz": -104.99775695800781 },
// 	{ "type": 1, "x": 1108.9188232421875, "y": 239.50234985351562, "z": -50.84078598022461, "rz": -44.99958038330078 },
// 	{ "type": 1, "x": 1105.031982421875, "y": 230.81637573242188, "z": -50.84077072143555, "rz": -177.001220703125 },
// 	{ "type": 1, "x": 1114.0848388671875, "y": 235.03343200683594, "z": -50.84077453613281, "rz": -179.00137329101562 },
// 	{ "type": 2, "x": 1134.7552490234375, "y": 255.9905242919922, "z": -52.03075408935547, "rz": 30.999441146850586 },
// 	{ "type": 2, "x": 1132.4876708984375, "y": 247.59466552734375, "z": -52.03075408935547, "rz": 88.49937438964844 },
// 	{ "type": 2, "x": 1109.5211181640625, "y": 239.04225158691406, "z": -50.84078598022461, "rz": -29.499794006347656 },
// 	{ "type": 2, "x": 1105.7384033203125, "y": 230.33175659179688, "z": -50.84077072143555, "rz": 107.99896240234375 },
// 	{ "type": 2, "x": 1120.756103515625, "y": 232.42312622070312, "z": -50.84077453613281, "rz": -90.49939727783203 },
// 	{ "type": 2, "x": 1114.8876953125, "y": 234.52394104003906, "z": -50.84077453613281, "rz": 108.99903869628906 },
// 	{ "type": 3, "x": 1133.948974609375, "y": 256.10711669921875, "z": -52.0307502746582, "rz": -46.99979782104492 },
// 	{ "type": 3, "x": 1132.41357421875, "y": 248.33412170410156, "z": -52.03075408935547, "rz": 105.99855041503906 },
// 	{ "type": 3, "x": 1105.5439453125, "y": 229.40882873535156, "z": -50.84077072143555, "rz": 38.49977111816406 },
// 	{ "type": 3, "x": 1110.232666015625, "y": 238.7513427734375, "z": -50.84078598022461, "rz": -12.999954223632812 },
// 	{ "type": 3, "x": 1114.5487060546875, "y": 233.68020629882812, "z": -50.84077453613281, "rz": 33.99979019165039 },
// 	{ "type": 3, "x": 1120.85302734375, "y": 231.6873779296875, "z": -50.84077072143555, "rz": -73.99937438964844 },
// 	{ "type": 4, "x": 1139.37109375, "y": 252.4561767578125, "z": -52.03075408935547, "rz": 97.49907684326172 },
// 	{ "type": 4, "x": 1132.109130859375, "y": 249.05078125, "z": -52.03075408935547, "rz": 118.9986801147461 },
// 	{ "type": 4, "x": 1133.8514404296875, "y": 256.8948669433594, "z": -52.0307502746582, "rz": -115.99858856201172 },
// 	{ "type": 4, "x": 1110.988037109375, "y": 238.6630401611328, "z": -50.84078598022461, "rz": 0 },
// 	{ "type": 4, "x": 1100.46630859375, "y": 230.39248657226562, "z": -50.84077072143555, "rz": 44.49960708618164 },
// 	{ "type": 4, "x": 1104.66650390625, "y": 229.47808837890625, "z": -50.84077453613281, "rz": -30.99989128112793 },
// 	{ "type": 4, "x": 1108.446533203125, "y": 235.39356994628906, "z": -50.84077453613281, "rz": -179.0015106201172 },
// 	{ "type": 4, "x": 1113.65576171875, "y": 233.69044494628906, "z": -50.84077453613281, "rz": -34.49992752075195 },
// 	{ "type": 4, "x": 1117.1199951171875, "y": 230.25537109375, "z": -50.84077453613281, "rz": -176.5015106201172 },
// 	{ "type": 4, "x": 1121.1380615234375, "y": 230.99908447265625, "z": -50.84077453613281, "rz": -58.999629974365234 },
// 	{ "type": 5, "x": 1134.55615234375, "y": 257.2640075683594, "z": -52.03075408935547, "rz": 170.9969940185547 },
// 	{ "type": 5, "x": 1138.998046875, "y": 251.7522430419922, "z": -52.03075408935547, "rz": 29.49958610534668 },
// 	{ "type": 5, "x": 1131.660400390625, "y": 249.63453674316406, "z": -52.03075408935547, "rz": 135.99819946289062 },
// 	{ "type": 5, "x": 1100.9368896484375, "y": 230.99258422851562, "z": -50.84077453613281, "rz": 59.49959945678711 },
// 	{ "type": 5, "x": 1111.7265625, "y": 238.75173950195312, "z": -50.84078598022461, "rz": 12.99996566772461 },
// 	{ "type": 5, "x": 1104.3472900390625, "y": 230.33616638183594, "z": -50.84077453613281, "rz": -106.99888610839844 },
// 	{ "type": 5, "x": 1109.1422119140625, "y": 234.78053283691406, "z": -50.84077453613281, "rz": 106.9991455078125 },
// 	{ "type": 5, "x": 1113.37841796875, "y": 234.48037719726562, "z": -50.84077072143555, "rz": -104.99906158447266 },
// 	{ "type": 5, "x": 1117.8211669921875, "y": 229.77664184570312, "z": -50.84077072143555, "rz": 111.9986801147461 },
// 	{ "type": 6, "x": 1138.1981201171875, "y": 251.86956787109375, "z": -52.03075408935547, "rz": -45.4997444152832 },
// 	{ "type": 6, "x": 1131.0672607421875, "y": 250.08070373535156, "z": -52.03075408935547, "rz": 149.9978790283203 },
// 	{ "type": 6, "x": 1112.40869140625, "y": 239.02345275878906, "z": -50.84078598022461, "rz": 30.4997615814209 },
// 	{ "type": 6, "x": 1121.614501953125, "y": 230.38429260253906, "z": -50.84077453613281, "rz": -45.499813079833984 },
// 	{ "type": 6, "x": 1117.5740966796875, "y": 228.9528045654297, "z": -50.84077072143555, "rz": 34.49982452392578 },
// 	{ "type": 6, "x": 1108.875244140625, "y": 233.94735717773438, "z": -50.84077453613281, "rz": 33.99979019165039 },
// 	{ "type": 6, "x": 1101.227783203125, "y": 231.69332885742188, "z": -50.84077453613281, "rz": 75.49949645996094 },
// 	{ "type": 7, "x": 1138.080810546875, "y": 252.67027282714844, "z": -52.03075408935547, "rz": -118.99893951416016 },
// 	{ "type": 7, "x": 1130.3834228515625, "y": 250.3516082763672, "z": -52.03075408935547, "rz": 165.49742126464844 },
// 	{ "type": 7, "x": 1101.32080078125, "y": 232.4326629638672, "z": -50.84077453613281, "rz": 90.99922943115234 },
// 	{ "type": 7, "x": 1108.02001953125, "y": 233.9359130859375, "z": -50.84077072143555, "rz": -35.499839782714844 },
// 	{ "type": 7, "x": 1116.7257080078125, "y": 228.941162109375, "z": -50.84077453613281, "rz": -33.499881744384766 },
// 	{ "type": 8, "x": 1138.8004150390625, "y": 253.02676391601562, "z": -52.03075408935547, "rz": 170.9975128173828 },
// 	{ "type": 8, "x": 1129.5975341796875, "y": 250.44863891601562, "z": -52.03075408935547, "rz": 179.49769592285156 },
// 	{ "type": 8, "x": 1113.0006103515625, "y": 239.52088928222656, "z": -50.840789794921875, "rz": 46.499603271484375 },
// 	{ "type": 8, "x": 1107.7371826171875, "y": 234.7730712890625, "z": -50.84077453613281, "rz": -106.99908447265625 },
// 	{ "type": 8, "x": 1116.4288330078125, "y": 229.7194061279297, "z": -50.84077453613281, "rz": -102.49913024902344 },
// 	{ "type": 8, "x": 1101.1824951171875, "y": 233.19720458984375, "z": -50.84077453613281, "rz": -50.84077453613281 }
// ];


// for(var i=1; i <= 8; i++)
// {
// 	mp.game.entity.createModelHideExcludingScriptObjects(1127.1312255859375, 254.82090759277344, -50.4407958984375, 300.0, mp.game.joaat("vw_prop_casino_slot_0"+i+"a"), true);
// }


// for(let i=0; i < slotMachinePos.length; i++)
// {
// 	slotMachineData[i] = { spinning: [] };
// 	slotMachineData[i].machine = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a"), new mp.Vector3(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
	
// 	slotMachineData[i].reels = [];
	
// 	var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, 0, -1.5, 1);
// 	var newShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 0.25);
// 	newShape.casinoSlotMachime = i;
	
// 	for(var c=0; c < 3; c++)
// 	{
// 		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[i].x, slotMachinePos[i].y, slotMachinePos[i].z, slotMachinePos[i].rz, reelsOffsets[c][0], reelsOffsets[c][1], reelsOffsets[c][2]);
// 		slotMachineData[i].reels[c] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[i].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[i].rz) });
// 	}
// }


// mp.events.add('playerEnterColshape', (shape) => {

// 	if(shape.casinoSlotMachime !== undefined && lpSlotMachine == null && interactingWithSlotMachine == null)
// 	{
// 		slotMachineToJoin = shape.casinoSlotMachime;
// 		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
// 		mp.game.graphics.notify(`~b~${slotMachineNames[slotMachinePos[slotMachineToJoin].type]}~n~~w~Pritisnite E da igrate`);
// 	}
// });


// mp.events.add('playerExitColshape', (shape) => {
// 	if(shape.casinoSlotMachime !== undefined)
// 	{
// 		slotMachineToJoin = null;
// 	}
// });



// mp.keys.bind(0x45, true, () =>  // E
// {
	
// 	if(mp.gui.cursor.visible || interactingWithSlotMachine != null) return false;
	
// 	if(lpSlotMachine != null)
// 	{
		
// 		mp.events.callRemote("leaveSlotMachine");
// 		interactingWithSlotMachine = lpSlotMachine;
// 		lpSlotMachine = null;
// 		BLOCK_CONTROLS_DURING_ANIMATION = false;
// 		if(canSpin) canSpin = false;
		
// 		interactingWithSlotMachineTimeout = setTimeout(
// 			function()
// 			{
// 				slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
// 				interactingWithSlotMachine = null;
// 				interactingWithSlotMachineTimeout = null;
// 			},4500
// 		);
// 	}
// 	else
// 	{
// 		if(slotMachineToJoin == null) return false;
		
// 		interactingWithSlotMachine = slotMachineToJoin;
		
// 		slotMachineData[slotMachineToJoin].machine.setCollision(false, false);
		
// 		var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[slotMachineToJoin].x, slotMachinePos[slotMachineToJoin].y, slotMachinePos[slotMachineToJoin].z, slotMachinePos[slotMachineToJoin].rz, 0, -1.5, 1);
// 		localPlayer.position = new mp.Vector3(pos.x, pos.y, pos.z);
// 		localPlayer.setHeading(slotMachinePos[slotMachineToJoin].rz);
		
// 		mp.events.callRemote("server:casino.slot.occupy", slotMachineToJoin);
// 		mp.events.call('client:casino.slot.occupy', localPlayer, slotMachine);
		
// 		interactingWithSlotMachineTimeout = setTimeout(
// 			function()
// 			{
// 				interactingWithSlotMachine = null;
// 				interactingWithSlotMachineTimeout = null;
// 			},5500
// 		);
// 	}	
// });

// /* Server-eventi
// mp.events.add("server:casino.slot.occupy", (player, slotMachine) => 
// {   
// 	if (mp.characters[player.character].slotMachine == -1) {
// 		mp.characters[player.character].slotMachine = slotMachine;
// 	}
	
// });

// mp.events.add("server:casino.slot.leave", (player) => 
// {
// 	if (mp.characters[player.character].slotMachine != -1) {
// 		mp.characters[player.character].slotMachine = -1;
// 		player.call('client:casino.cancelInteractingWithSlotMachine');
// 	}
    
// 	mp.characters[player.character].slotMachine = -1;
// });

// mp.events.add("server:casino.slot.spin", (player, slotMachine) => 
// {
//     player.call('client:spinSlotMachine', mp.characters[player.character].slotMachine, JSON.stringify(player.position))
// });*/


// mp.events.add("client:casino.cancelInteractingWithSlotMachine", () => 
// {
// 	slotMachineData[interactingWithSlotMachine].machine.setCollision(true, false);
// 	interactingWithSlotMachine = null;
// 	if(interactingWithSlotMachineTimeout != null)
// 	{
// 		clearTimeout(interactingWithSlotMachineTimeout);
// 		interactingWithSlotMachineTimeout = null;
// 	}
// });

// mp.events.add("client:casino.slot.occupy", (player, machineID) => {
// 	if(player == localPlayer) 
// 	{
// 		lpSlotMachine = slotMachineToJoin;
// 		BLOCK_CONTROLS_DURING_ANIMATION = true;
		
// 		mp.game.graphics.notify(`Pritisnite levi klik misa(LMB) da zapocnete kockanje`);
// 		mp.events.call('client:slotMachineAllowSpin', true);
// 	}
// 	else
// 	{
// 		slotMachineData[machineID].machine.setNoCollision(player.handle, false);
// 		mp.events.call('client:slotMachineAllowSpin', true);
		
// 	}
// });

// mp.events.add("client:slotMachineAllowSpin", (toggle) => {	
// 	canSpin = toggle;
// });


// mp.events.add('playerDeath', (player) => 
// {
// 	if(player == localPlayer) 
// 	{
// 		if(lpSlotMachine != null) lpSlotMachine = null;
// 		if(interactingWithSlotMachine != null) interactingWithSlotMachine = null;
// 		if(canSpin) canSpin = false;
// 	}
// });


// mp.events.add('render', (nametags) => {
	
// 	var rot = null;
// 	for(var machine = 0; machine < slotMachineData.length; machine++)
// 	{
// 		for(var i=0; i < 3; i++)
// 		{
// 			if(slotMachineData[machine]['spinning'][i])
// 			{
// 				rot = slotMachineData[machine].reels[i].rotation;
// 				slotMachineData[machine].reels[i].rotation = new mp.Vector3(rot.x+5.0, 0.0, rot.z);
// 			}
// 		}
// 	}
	
// 	if(canSpin)
// 	{
// 		if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // LMB
// 		{
// 			mp.events.callRemote("server:spinSlotMachine");
// 		}
// 	}
// });


// mp.events.add('client:spinSlotMachine', (id, position) => 
// {
// 	let machine = id;
// 	slotMachineData[machine].endPos = JSON.parse(position);

// 	mp.events.call('client:slotMachineAllowSpin', false);
	
// 	var pos = null;
// 	for(var i=0; i < 3; i++)
// 	{
// 		slotMachineData[machine].reels[i].destroy();
// 		pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[i][0], reelsOffsets[i][1], reelsOffsets[i][2]);
// 		slotMachineData[machine].reels[i] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"b_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(0, 0, slotMachinePos[machine].rz) });
// 		slotMachineData[machine]['spinning'][i] = true;
// 	}
	
// 	setTimeout(
// 		function()
// 		{
// 			slotMachineData[machine]['spinning'][0] = null;
	
// 			slotMachineData[machine].reels[0].destroy();
// 			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[0][0], reelsOffsets[0][1], reelsOffsets[0][2]);
// 			slotMachineData[machine].reels[0] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[0], 0, slotMachinePos[machine].rz) });
// 		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][0]
// 	);
// 	setTimeout(
// 		function()
// 		{
// 			slotMachineData[machine]['spinning'][1] = null;
	
// 			slotMachineData[machine].reels[1].destroy();
// 			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[1][0], reelsOffsets[1][1], reelsOffsets[1][2]);
// 			slotMachineData[machine].reels[1] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[1], 0, slotMachinePos[machine].rz) });
// 		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][1]
// 	);
// 	setTimeout(
// 		function()
// 		{
// 			slotMachineData[machine]['spinning'][2] = null;
	
// 			slotMachineData[machine].reels[2].destroy();
// 			var pos = mp.game.object.getObjectOffsetFromCoords(slotMachinePos[machine].x, slotMachinePos[machine].y, slotMachinePos[machine].z, slotMachinePos[machine].rz, reelsOffsets[2][0], reelsOffsets[2][1], reelsOffsets[2][2]);
// 			slotMachineData[machine].reels[2] = mp.objects.new(mp.game.joaat("vw_prop_casino_slot_0"+slotMachinePos[machine].type+"a_reels"), new mp.Vector3(pos.x, pos.y, pos.z), { rotation: new mp.Vector3(slotMachineData[machine].endPos[2], 0, slotMachinePos[machine].rz) });
// 		}, SPINNING_TIME[slotMachineData[machine].endPos[3]][2]
// 	);
// });

// // Loading IPL 
// mp.game.streaming.requestIpl('vw_casino_main');




