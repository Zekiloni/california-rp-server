// FOCUS ROLEPLAY DIAMOND CASINO - Roulette


let lpCasinoTable = null,
	casinoTableToJoin = null,
	casinoSeatToJoin = null,
	goToSeatInterval = null,
	interactingWithTable = null,
	rouletteCamera = null,
	canDoBets = true,
	betObject = null,
	closestChipSpot = null,
	interactingWithTableTimeout = null,
	rouletteData = [],
	posX = 0,
	posY = 0,
	posZ = 0;


const localPlayer = mp.players.local,
	  tableLib = "anim_casino_b@amb@casino@games@roulette@table",
	  dealerLib = "anim_casino_b@amb@casino@games@roulette@dealer",
	  dealerLibF = "anim_casino_b@amb@casino@games@roulette@dealer_female";


// U ON PLAYER ENTER CASINO PREBACITI OVO OBAVEZNO!!!!!!
mp.game.streaming.requestAnimDict(tableLib);
mp.game.streaming.requestAnimDict(dealerLib);
mp.game.streaming.requestAnimDict(dealerLibF);
mp.game.streaming.requestIpl('vw_casino_main');


const tablesPos = 
[
	[ "vw_prop_casino_roulette_01", 1144.4254150390625, 269.3034973144531, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01", 1151.2305908203125, 263.14093017578125, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01b", 1148.9163818359375, 248.62892150878906, -52.03075408935547 ],
	[ "vw_prop_casino_roulette_01b", 1143.677978515625, 251.36131286621094, -52.0307502746582 ],
	[ "vw_prop_casino_roulette_01b", 1133.1802978515625, 262.3916320800781, -52.03075408935547 ], 
	[ "vw_prop_casino_roulette_01b", 1129.9976806640625, 266.93695068359375, -52.0307502746582 ] 
];

const tablesBets = 
[
	[ 500, 2500 ],
	[ 1000, 5000 ],
	[ 3000, 15000 ],
	[ 7000, 35000 ],
	[ 10000, 50000 ],
	[ 20000, 100000 ]
];

const tableSeatsPos =
[
	[-0.7, -1.28, 1, 0],
	[0.775, -1.68, 1, 0],
	[1.8, -0.63, 1, 90],
	[1.27, 1.05, 1, 180]
]

const pedModels =
[
   ["S_M_Y_Casino_01"],
   ["S_F_Y_Casino_01"],
   ["S_M_Y_Casino_01"], 
   ["S_F_Y_Casino_01"],
   ["S_M_Y_Casino_01"], 
   ["S_F_Y_Casino_01"]
];

const pedModelVariations =
[
	[ //S_M_Y_Casino_01
		[ 0, 2, 2, 0],
		[ 1, 1, 0, 0],
		[ 2, 4, 0, 0],
		[ 3, 0, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 2, 0, 0],
		[ 1, 0, 0, 0],
		[ 2, 2, 0, 0],
		[ 3, 2, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 0, 0, 0],
		[ 7, 0, 0, 0],
		[ 8, 2, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01
		[ 0, 2, 1, 0],
		[ 1, 1, 0, 0],
		[ 2, 2, 0, 0],
		[ 3, 0, 3, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 2, 1, 0],
		[ 1, 0, 0, 0],
		[ 2, 2, 1, 0],
		[ 3, 3, 3, 0],
		[ 4, 1, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 3, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01
		[ 0, 4, 2, 0],
		[ 1, 1, 0, 0],
		[ 2, 3, 0, 0],
		[ 3, 0, 0, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	],
	[//S_F_Y_Casino_01
		[ 0, 4, 0, 0],
		[ 1, 0, 0, 0],
		[ 2, 4, 0, 0],
		[ 3, 2, 1, 0],
		[ 4, 1, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 1, 0, 0],
		[ 8, 2, 0, 0],
		[ 10, 0, 0, 0],
		[ 11, 0, 0, 0]
	],
	[ //S_M_Y_Casino_01 (not used)
		[ 0, 4, 0, 0],
		[ 1, 1, 0, 0],
		[ 2, 0, 0, 0],
		[ 3, 0, 0, 0],
		[ 4, 0, 0, 0],
		[ 6, 1, 0, 0],
		[ 7, 2, 0, 0],
		[ 8, 1, 0, 0],
		[ 10, 1, 0, 0],
		[ 11, 1, 0, 0]
	]
]

// Loading IPL 
//mp.game.streaming.requestIpl('vw_casino_main');
//mp.game.streaming.requestIpl('vw_dlc_casino_door');
//mp.game.streaming.requestIpl('hei_dlc_windows_casino');
//mp.game.streaming.requestIpl('hei_dlc_casino_door');
//mp.game.streaming.requestIpl('hei_dlc_casino_aircon');
//mp.game.streaming.requestIpl('vw_casino_garage');
//mp.game.streaming.requestIpl('vw_casino_carpark');
//mp.game.streaming.requestIpl('vw_casino_penthouse');


//mp.game.invoke('0xC1F1920BAF281317');

// Creating blip
mp.blips.new(679, new mp.Vector3(935.8140869140625, 46.942176818847656, 81.09580993652344), { name: "Diamond Casino & Resort", color: 4, shortRange: true, scale: 1.0 });

for(var i=0; i < tablesPos.length; i++)
{
	rouletteData[i] = {};
	rouletteData[i].table = mp.objects.new(mp.game.joaat(tablesPos[i][0]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2], tablesPos[i][3]));
	rouletteData[i].ball = mp.objects.new(87196104, new mp.Vector3(tablesPos[i][1]+posX, tablesPos[i][2]+posY, tablesPos[i][3]+posZ)); // mp.objects.new(87196104, new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]));
	rouletteData[i].ped = mp.peds.new(mp.game.joaat(pedModels[i]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2]+0.7, tablesPos[i][3]+1), 180, 0); //-0.001587
	rouletteData[i].label = mp.labels.new(`${tablesBets[i][0]}~n~${tablesBets[i][1]}`, new mp.Vector3(tablesPos[i][1],tablesPos[i][2], tablesPos[i][3]), { los: false, font: 1, drawDistance: 5 })
	rouletteData[i].ped.croupier = i;
	//mp.game.invoke('0x971DA0055324D033', rouletteData[i].table.handle, 3);
	
	for(var c=0; c < tableSeatsPos.length; c++)
	{
		var newShape = mp.colshapes.newSphere(tablesPos[i][1]+tableSeatsPos[c][0], tablesPos[i][2]+tableSeatsPos[c][1], tablesPos[i][3]+tableSeatsPos[c][2], 0.5);
		newShape.casinoTable = i;
		newShape.seatID = c;
	}
	
	for(var c=0; c < pedModelVariations[i].length; c++)
	{
		rouletteData[i].ped.setComponentVariation(pedModelVariations[i][c][0], pedModelVariations[i][c][1], pedModelVariations[i][c][2], pedModelVariations[i][c][3]);
	}
}

mp.events.add('playerEnterColshape', (shape) => {
	if(shape.casinoTable !== undefined && lpCasinoTable == null && interactingWithTable == null)
	{
		casinoTableToJoin = shape.casinoTable;
		casinoSeatToJoin = shape.seatID;

		mp.game.audio.playSound(-1, "BACK", "HUD_AMMO_SHOP_SOUNDSET", true, 0, true);
		mp.game.graphics.notify(`Pritisnite ~b~E~s~ da sednete.`);
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(shape.casinoTable !== undefined)
	{
		casinoTableToJoin = null;
		casinoSeatToJoin = null;
	}
});

mp.events.add('playerDeath', (player) => 
{
	if(player == localPlayer) 
	{
		if(interactingWithTable != null) interactingWithTable = null;
		if(BLOCK_CONTROLS_DURING_ANIMATION) BLOCK_CONTROLS_DURING_ANIMATION = false;
		if(rouletteCamera != null) destroyRouletteCamera();
		if(canDoBets) canDoBets = false;
	}
});

mp.events.add("initRoulette", () => 
{
	mp.events.add("render", rouletteRender);
	
	mp.events.add('entityStreamIn', (entity) => {
		if(entity.type == "ped" && entity.croupier != null) 
		{
			if(entity.model == mp.game.joaat('S_M_Y_Casino_01')) entity.taskPlayAnim(dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else entity.taskPlayAnim(dealerLibF, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			
			var id = entity.croupier;
			
			rouletteData[id].ball.position = new mp.Vector3(tablesPos[id][1]-0.734742, tablesPos[id][2]-0.36617, tablesPos[id][3]); // rouletteData[id].ball.position = new mp.Vector3(tablesPos[id][1]-0.734742, tablesPos[id][2]-0.16617, tablesPos[id][3]);
			
			for(var c=0; c < pedModelVariations[id].length; c++)
			{
				entity.setComponentVariation(pedModelVariations[id][c][0], pedModelVariations[id][c][1], pedModelVariations[id][c][2], pedModelVariations[id][c][3]);
			}
		}
	});
});

mp.events.add("playerSitAtCasinoTable", (player, tableID) => {
	
	if(player == localPlayer) 
	{
		lpCasinoTable = casinoTableToJoin;
		BLOCK_CONTROLS_DURING_ANIMATION = true;
		
		//showAlert('alert-blue', 'ЛКМ - сделать/повысить ставку</br>ПКМ - убрать/понизить ставку</br>F - вид на стол');
	}
	else
	{
		rouletteData[tableID].table.setNoCollision(player.handle, false);
	}
});

mp.events.add("rouletteAllowBets", (toggle) => {
	
	canDoBets = toggle;
	if(toggle) mp.game.graphics.notify("Place your bets.");
	else mp.game.graphics.notify("No more bets.");
});

mp.events.add('render', () => 
{
	//AddInstructionalButtonCustom("Toggle bet camera", "t_F");

	if(canDoBets && rouletteCamera && betObject == null)
	{
		betObject = mp.objects.new(mp.game.joaat("vw_prop_chip_100dollar_x1"), new mp.Vector3(tablesPos[lpCasinoTable][1], tablesPos[lpCasinoTable][2], tablesPos[lpCasinoTable][3]));
		betObject.setCollision(false, false);
	}
	
	if(betObject != null)
	{
		if(!canDoBets || rouletteCamera == null)
		{
			betObject.destroy();
			betObject = null;
			clearTableMarkers();
		}
	}
	
	if(rouletteCamera != null && lpCasinoTable != null)
	{
		if(betObject != null)
		{
			if(mp.game.controls.isDisabledControlJustReleased(0, 25) && !mp.gui.cursor.visible) // ПКМ
			{
				if(closestChipSpot != null) mp.events.callRemote("removeRouletteBet", closestChipSpot);
			}
			
			if(mp.game.controls.isDisabledControlJustReleased(0, 24) && !mp.gui.cursor.visible) // ЛКМ
			{
				if(closestChipSpot != null) mp.events.callRemote("makeRouletteBet", closestChipSpot);
			}
			
			let drawObj = getCameraHitCoord();
			if(drawObj != null)
			{
				// let height = betObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
				//drawObj.position.z += height / 2;
				drawObj.position.z = tablesPos[lpCasinoTable][3]+0.95;
				betObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, drawObj.position.z, false, false, false);
				
				getClosestChipSpot(new mp.Vector3(drawObj.position.x, drawObj.position.y, drawObj.position.z));
			}
		}
		
		let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
		let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
		
		let leftAxisX = 0;
		let leftAxisY = 0;
		
		let pos = rouletteCamera.getCoord();
		let rr = rouletteCamera.getDirection();
		let vector = new mp.Vector3(0, 0, 0);
		vector.x = rr.x * leftAxisY;
		vector.y = rr.y * leftAxisY;
		vector.z = rr.z * leftAxisY;
		
		let upVector = new mp.Vector3(0, 0, 1);
		let rightVector = getCrossProduct(getNormalizedVector(rr), getNormalizedVector(upVector));
		rightVector.x *= leftAxisX * 0.5;
		rightVector.y *= leftAxisX * 0.5;
		rightVector.z *= leftAxisX * 0.5;
		
		let rot = rouletteCamera.getRot(2);
		
		let rotx = rot.x + rightAxisY * -5.0;
		if(rotx > 89) rotx = 89;
		if(rotx < -89) rotx = -89;
		
		rouletteCamera.setRot(rotx, 0.0, rot.z + rightAxisX * -5.0, 2);
	}
});
/*
anim_casino_b@amb@casino@games@roulette@dealer idle
anim_casino_b@amb@casino@games@roulette@dealer no_more_bets
anim_casino_b@amb@casino@games@roulette@dealer clear_chips_intro
anim_casino_b@amb@casino@games@roulette@dealer clear_chips_outro
anim_casino_b@amb@casino@games@roulette@dealer spin_wheel
Table:
anim_casino_b@amb@casino@games@roulette@table    intro_ball
anim_casino_b@amb@casino@games@roulette@table    intro_wheel
anim_casino_b@amb@casino@games@roulette@table    loop_ball
anim_casino_b@amb@casino@games@roulette@table    loop_wheel
Za završetak:
anim_casino_b@amb@casino@games@roulette@table   exit_${BROJ_DOBIJENE_LOPTICE}_wheel
anim_casino_b@amb@casino@games@roulette@table   exit_${BROJ_DOBIJENE_LOPTICE}_ball
*/

/*

mp.events.add('spin_wheel', function(tb, needSpins, endTable, endBall){
    RouletteTables[tb].table.playAnim("intro_wheel", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, true, 0, 131072);
    RouletteTables[tb].table.forceAiAndAnimationUpdate();
    const ballPos = RouletteTables[tb].table.getWorldPositionOfBone(RouletteTables[tb].table.getBoneIndexByName("Roulette_Wheel"));
    RouletteTables[tb].ball.position = ballPos;

    RouletteTables[tb].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);
    const ballRot = RouletteTables[tb].table.getRotation(2);
    RouletteTables[tb].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1)
    //RouletteTables[tb].ball.rotation = new mp.Vector3(0.0, 0.0, 0);

    RouletteTables[tb].ball.playAnim("intro_ball", "anim_casino_b@amb@casino@games@roulette@table", 1000.0, false, true, false, 0, 136704); // loop, freezeLastFrame, ?
    RouletteTables[tb].ball.forceAiAndAnimationUpdate();

    RouletteTables[tb].spins = 0;
    RouletteTables[tb].lastSpinTime = 0;
    RouletteTables[tb].needSpins = needSpins;
    RouletteTables[tb].endTable = endTable;
    RouletteTables[tb].endBall = endBall;


*/

mp.events.add("spinRouletteWheel", (table, needSpins, endTable, endBall) => {
	rouletteData[table].table.playAnim("intro_wheel", tableLib, 1000.0, false, true, true, 0, 136702); // loop, freezeLastFrame, ?
	rouletteData[table].table.forceAiAndAnimationUpdate();
	

	const ballPos = rouletteData[table].table.getWorldPositionOfBone(rouletteData[table].table.getBoneIndexByName("Roulette_Wheel"));
	rouletteData[table].ball.position = ballPos; //new mp.Vector3(tablesPos[table][1]-0.734742, tablesPos[table][2]-0.26617, tablesPos[table][3]+1.0715); 
	rouletteData[table].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);

	//rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
	const ballRot = rouletteData[table].table.getRotation(2);
    rouletteData[table].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1)
	
	rouletteData[table].ball.playAnim("intro_ball", tableLib, 1000.0, false, true, false, 0, 136704); // loop, freezeLastFrame, ?
	rouletteData[table].ball.forceAiAndAnimationUpdate();

	rouletteData[table].spins = 0;
	rouletteData[table].lastSpinTime = 0;
	rouletteData[table].needSpins = needSpins;

	rouletteNumber(table);

	if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) {
		rouletteData[table].ped.taskPlayAnim(dealerLib, "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
	}
	else {
		rouletteData[table].ped.taskPlayAnim(dealerLibF, "spin_wheel", 8.0, 1, -1, 2, 0.0, false, false, false);
	}
	
	
	setTimeout(
		function()
		{
			if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else rouletteData[table].ped.taskPlayAnim(dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
		}, 8000
	);
});

mp.events.add("clearRouletteTable", (table) => 
{
	if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(dealerLib, "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
	else rouletteData[table].ped.taskPlayAnim(dealerLib+"_female", "clear_chips_zone2", 8.0, 1, -1, 2, 0.0, false, false, false);
	
	setTimeout(
		function()
		{
			if(rouletteData[table].ped.model == mp.game.joaat('S_M_Y_Casino_01')) rouletteData[table].ped.taskPlayAnim(dealerLib, "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
			else rouletteData[table].ped.taskPlayAnim(dealerLib+"_female", "idle", 8.0, 1, -1, 1, 0.0, false, false, false);
		}, 2000
	);
});

mp.keys.bind(0x45, true, () =>  // E
{
	if(mp.gui.cursor.visible || interactingWithTable != null) return false;
	
	if(lpCasinoTable != null)
	{
		//mp.events.callRemote("leaveCasinoSeat");
		rouletteData[lpCasinoTable].table.setCollision(true, false);
		interactingWithTable = lpCasinoTable;
		lpCasinoTable = null;
		BLOCK_CONTROLS_DURING_ANIMATION = false;
		if(rouletteCamera != null) destroyRouletteCamera();
		if(canDoBets) canDoBets = false;
		
		interactingWithTableTimeout = setTimeout(
			function()
			{
				interactingWithTable = null;
				interactingWithTableTimeout = null;
			},4500
		);
	}
	else
	{
		if(casinoTableToJoin == null) return false;
		
		interactingWithTable = casinoTableToJoin;
		
		rouletteData[casinoTableToJoin].table.setCollision(false, false);
		
		localPlayer.position = new mp.Vector3(tablesPos[casinoTableToJoin][1]+tableSeatsPos[casinoSeatToJoin][0], tablesPos[casinoTableToJoin][2]+tableSeatsPos[casinoSeatToJoin][1], tablesPos[casinoTableToJoin][3]+tableSeatsPos[casinoSeatToJoin][2]);
		localPlayer.setHeading(tableSeatsPos[casinoSeatToJoin][3]);
		
		mp.events.call("playerSitAtCasinoTable", localPlayer, casinoTableToJoin);
		
		interactingWithTableTimeout = setTimeout(
			function()
			{
				interactingWithTable = null;
				interactingWithTableTimeout = null;
			},5500
		);
		
		// localPlayer.taskGoStraightToCoord(
			// tablesPos[casinoTableToJoin][1]+tableSeatsPos[casinoSeatToJoin][0],
			// tablesPos[casinoTableToJoin][2]+tableSeatsPos[casinoSeatToJoin][1],
			// tablesPos[casinoTableToJoin][3]+tableSeatsPos[casinoSeatToJoin][2],
			// 1.15, // speed
			// 3000, // timeout
			// tableSeatsPos[casinoSeatToJoin][3], // heading
			// 0.5 // slide (?)
		// );
		
		// setTimeout(
			// function()
			// {
				// if(goToSeatInterval != null)
				// {
					// clearInterval(goToSeatInterval);
					// goToSeatInterval = null;
				// }
			// },3000
		// );
		
		// goToSeatInterval = setInterval(checkPlayerCanSit, 200, casinoTableToJoin, casinoSeatToJoin);
	}	
});

mp.keys.bind(0x46, true, () =>  // F
{		
	if(interactingWithTable != null || lpCasinoTable == null) return;
	
	if(rouletteCamera != null)
	{
		destroyRouletteCamera();
	}
	else
	{
		createRouletteCamera();
		mp.events.call('initRoulette');
		mp.events.call("spinRouletteWheel", lpCasinoTable, 1, "exit_7_wheel", "exit_7_ball");
	}
});

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function rouletteNumber(rouletteId)
{
	let random = getRandomInt(1, 38);
	if(random < 0 || random > 38) { rouletteNumber(rouletteId); return; } 
	rouletteData[rouletteId].endBall = `exit_${random}_ball`;
	rouletteData[rouletteId].endTable = `exit_${random}_wheel`;

}

function rouletteRender() 
{

	for(var i=0; i < rouletteData.length; i++)
	{
		if(rouletteData[i].table.isPlayingAnim(tableLib, "intro_wheel", 3))
		{
			if(rouletteData[i].table.getAnimCurrentTime(tableLib, "intro_wheel") > 0.9425)
			{
				rouletteData[i].table.playAnim("loop_wheel", tableLib, 1000.0, true, true, true, 0, 13704);
				rouletteData[i].table.forceAiAndAnimationUpdate();
			}
		}
		
		if(rouletteData[i].ball.isPlayingAnim(tableLib, "intro_ball", 3))
		{
			if(rouletteData[i].ball.getAnimCurrentTime(tableLib, "intro_ball") > 0.99)
			{
				/*
				rouletteData[i].ball.position = new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.36617, tablesPos[i][3]+1.0715); // new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]+1.0715);
				rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				*/

				const ballPos = rouletteData[i].table.getWorldPositionOfBone(rouletteData[i].table.getBoneIndexByName("Roulette_Wheel"));
				rouletteData[i].ball.position = ballPos; //new mp.Vector3(tablesPos[table][1]-0.734742, tablesPos[table][2]-0.26617, tablesPos[table][3]+1.0715); 
				rouletteData[i].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);

				//rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				const ballRot = rouletteData[i].table.getRotation(2);
				rouletteData[i].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1);

				rouletteData[i].ball.playAnim("loop_ball", tableLib, 1000.0, true, true, false, 0, 13704);
				rouletteData[i].ball.forceAiAndAnimationUpdate();
			}
		}
		
		if(rouletteData[i].table.isPlayingAnim(tableLib, "loop_wheel", 3))
		{
			if(rouletteData[i].table.getAnimCurrentTime(tableLib, "loop_wheel") >= 0.99 && Date.now()-rouletteData[i].lastSpinTime > 1000)
			{
				rouletteData[i].spins++;
				rouletteData[i].lastSpinTime = Date.now();
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins-1)
			{
				rouletteData[i].ball.setAnimSpeed(tableLib, "loop_ball", 0.71);
			}
			if(rouletteData[i].spins == rouletteData[i].needSpins && rouletteData[i].table.getAnimCurrentTime(tableLib, "loop_wheel") > 0.99)
			{
				rouletteData[i].table.playAnim(rouletteData[i].endTable, tableLib, 1000.0, false, true, true, 0, 1148846080);
				rouletteData[i].table.forceAiAndAnimationUpdate();
				
				/*
				rouletteData[i].ball.position = new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.36617, tablesPos[i][3]+1.0715); // new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]+1.0715);
				rouletteData[i].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				*/

				const ballPos = rouletteData[i].table.getWorldPositionOfBone(rouletteData[i].table.getBoneIndexByName("Roulette_Wheel"));
				rouletteData[i].ball.position = ballPos; //new mp.Vector3(tablesPos[table][1]-0.734742, tablesPos[table][2]-0.26617, tablesPos[table][3]+1.0715); 
				rouletteData[i].ball.setCoordsNoOffset(ballPos.x, ballPos.y, ballPos.z, !1, !1, !1);

				//rouletteData[table].ball.rotation = new mp.Vector3(0.0, 0.0, 32.6);
				const ballRot = rouletteData[i].table.getRotation(2);
				rouletteData[i].ball.setRotation(ballRot.x, ballRot.y, ballRot.z + 90, 2, !1);

				rouletteData[i].ball.playAnim(rouletteData[i].endBall, tableLib, 1000.0, false, true, true, 0, 1148846080);
				rouletteData[i].ball.forceAiAndAnimationUpdate();
			}
		}
		
	}
}

createRouletteCamera = () => 
{
	rouletteCamera = mp.cameras.new('default', new mp.Vector3(tablesPos[lpCasinoTable][1], tablesPos[lpCasinoTable][2]-1, tablesPos[lpCasinoTable][3]+3), new mp.Vector3(0,0,0), 45);
	rouletteCamera.setRot(-75.0, 0.0, 0.0, 2);
	rouletteCamera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
}

destroyRouletteCamera = () => 
{
	rouletteCamera.destroy(true);
	rouletteCamera = null;
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
}

getCameraHitCoord = () =>
{
	let position = rouletteCamera.getCoord();
	let direction = rouletteCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
	let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);
	
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}

getNormalizedVector = (vector) =>
{
	let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
	vector.x = vector.x / mag;
	vector.y = vector.y / mag;
	vector.z = vector.z / mag;
	return vector;
}

getCrossProduct = (v1, v2) =>
{
	let vector = new mp.Vector3(0, 0, 0);
	vector.x = v1.y * v2.z - v1.z * v2.y;
	vector.y = v1.z * v2.x - v1.x * v2.z;
	vector.z = v1.x * v2.y - v1.y * v2.x;
	return vector;
}

getClosestChipSpot = (vector) =>
{
	var spot = null;
	var prevDistance = 0.05;
	var dist = null;
	
	for(var i=0; i < tableChipsOffsets.length; i++)
	{
		//dist = mp.Vector3.getDistanceBetweenPoints3D(vector, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableChipsOffsets[i][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[i][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[i][2]));
		dist = mp.game.gameplay.getDistanceBetweenCoords(vector.x, vector.y, vector.z, tablesPos[lpCasinoTable][1]+tableChipsOffsets[i][0], tablesPos[lpCasinoTable][2]+tableChipsOffsets[i][1], tablesPos[lpCasinoTable][3]+tableChipsOffsets[i][2], true);
		if(dist <= prevDistance)
		{
			spot = i;
			prevDistance = dist;
		}
	}
	
	if(spot != closestChipSpot)
	{
		closestChipSpot = spot;
		clearTableMarkers();
		
		if(spot != null)
		{
			var key = null;
			var obj = null;
			for(var i=0; i < tableChipsOffsets[spot][3].length; i++)
			{
				key = tableChipsOffsets[spot][3][i];
				if(key == "00" || key == "0")
				{
					obj = mp.objects.new(269022546, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableMarkersOffsets[key][0], tablesPos[lpCasinoTable][2]+tableMarkersOffsets[key][1], tablesPos[lpCasinoTable][3]+tableMarkersOffsets[key][2]));
					obj.setCollision(false, false);
					tableMarkers.push(obj);
				}
				else
				{
					tableMarkers.push(mp.objects.new(3267450776, new mp.Vector3(tablesPos[lpCasinoTable][1]+tableMarkersOffsets[key][0], tablesPos[lpCasinoTable][2]+tableMarkersOffsets[key][1], tablesPos[lpCasinoTable][3]+tableMarkersOffsets[key][2])));
				}
			}
		}
	}	
}

let tableMarkers = [];
const tableMarkersOffsets =
{
	"0": [-0.137451171875, -0.146942138671875, 0.9449996948242188],
	"00": [-0.1387939453125, 0.10546875, 0.9449996948242188],
	"1": [-0.0560302734375, -0.1898193359375, 0.9449996948242188],
	"2": [-0.0567626953125, -0.024017333984375, 0.9449996948242188],
	"3": [-0.056884765625, 0.141632080078125, 0.9449996948242188],
	"4": [0.02392578125, -0.187347412109375, 0.9449996948242188],
	"5": [0.0240478515625, -0.02471923828125, 0.9449996948242188],
	"6": [0.02392578125, 0.1422119140625, 0.9449996948242188],
	"7": [0.1038818359375, -0.18902587890625, 0.9449996948242188],
	"8": [0.1044921875, -0.023834228515625, 0.9449996948242188],
	"9": [0.10546875, 0.1419677734375, 0.9449996948242188],
	"10": [0.18701171875, -0.188385009765625, 0.9449996948242188],
	"11": [0.18603515625, -0.0238037109375, 0.9449996948242188],
	"12": [0.1851806640625, 0.143157958984375, 0.9449996948242188],
	"13": [0.2677001953125, -0.18780517578125, 0.9449996948242188],
	"14": [0.26806640625, -0.02301025390625, 0.9449996948242188],
	"15": [0.26611328125, 0.143310546875, 0.9449996948242188],
	"16": [0.3497314453125, -0.18829345703125, 0.9449996948242188],
	"17": [0.349609375, -0.023101806640625, 0.9449996948242188],
	"18": [0.3497314453125, 0.142242431640625, 0.9449996948242188],
	"19": [0.4307861328125, -0.18829345703125, 0.9449996948242188],
	"20": [0.4312744140625, -0.02392578125, 0.9449996948242188],
	"21": [0.431884765625, 0.1416015625, 0.9449996948242188],
	"22": [0.51220703125, -0.188873291015625, 0.9449996948242188],
	"23": [0.5123291015625, -0.023773193359375, 0.9449996948242188],
	"24": [0.511962890625, 0.14215087890625, 0.9449996948242188],
	"25": [0.5931396484375, -0.18890380859375, 0.9449996948242188],
	"26": [0.59375, -0.023651123046875, 0.9449996948242188],
	"27": [0.59375, 0.14080810546875, 0.9449996948242188],
	"28": [0.67529296875, -0.189849853515625, 0.9449996948242188],
	"29": [0.6751708984375, -0.02337646484375, 0.9449996948242188],
	"30": [0.674560546875, 0.141845703125, 0.9449996948242188],
	"31": [0.756591796875, -0.18798828125, 0.9449996948242188],
	"32": [0.7547607421875, -0.0234375, 0.9449996948242188],
	"33": [0.7554931640625, 0.14263916015625, 0.9449996948242188],
	"34": [0.836669921875, -0.188323974609375, 0.9449996948242188],
	"35": [0.8365478515625, -0.0244140625, 0.9449996948242188],
	"36": [0.8359375, 0.14276123046875, 0.9449996948242188]
};

const tableChipsOffsets =
[
	[-0.154541015625, -0.150604248046875, 0.9449996948242188, ["0"]],
	[-0.1561279296875, 0.11505126953125, 0.9449996948242188, ["00"]],
	[-0.059326171875, -0.18701171875, 0.9449996948242188, ["1"]],
	[-0.058349609375, -0.019378662109375, 0.9449996948242188, ["2"]],
	[-0.0587158203125, 0.142059326171875, 0.9449996948242188, ["3"]],
	[0.02294921875, -0.1920166015625, 0.9449996948242188, ["4"]],
	[0.023193359375, -0.01947021484375, 0.9449996948242188, ["5"]],
	[0.024658203125, 0.147369384765625, 0.9449996948242188, ["6"]],
	[0.105224609375, -0.1876220703125, 0.9449996948242188, ["7"]],
	[0.1055908203125, -0.028472900390625, 0.9449996948242188, ["8"]],
	[0.10400390625, 0.147430419921875, 0.9449996948242188, ["9"]],
	[0.187744140625, -0.191802978515625, 0.9449996948242188, ["10"]],
	[0.1866455078125, -0.02667236328125, 0.9449996948242188, ["11"]],
	[0.1842041015625, 0.145965576171875, 0.9449996948242188, ["12"]],
	[0.2696533203125, -0.182464599609375, 0.9449996948242188, ["13"]],
	[0.265869140625, -0.027862548828125, 0.9449996948242188, ["14"]],
	[0.2667236328125, 0.138946533203125, 0.9449996948242188, ["15"]],
	[0.35009765625, -0.186126708984375, 0.9449996948242188, ["16"]],
	[0.348876953125, -0.027740478515625, 0.9449996948242188, ["17"]],
	[0.3497314453125, 0.14715576171875, 0.9449996948242188, ["18"]],
	[0.43212890625, -0.17864990234375, 0.9449996948242188, ["19"]],
	[0.4337158203125, -0.02508544921875, 0.9449996948242188, ["20"]],
	[0.430419921875, 0.138336181640625, 0.9449996948242188, ["21"]],
	[0.51416015625, -0.18603515625, 0.9449996948242188, ["22"]],
	[0.5135498046875, -0.02301025390625, 0.9449996948242188, ["23"]],
	[0.5146484375, 0.14239501953125, 0.9449996948242188, ["24"]],
	[0.59130859375, -0.192413330078125, 0.9449996948242188, ["25"]],
	[0.596923828125, -0.022216796875, 0.9449996948242188, ["26"]],
	[0.5924072265625, 0.14385986328125, 0.9449996948242188, ["27"]],
	[0.6749267578125, -0.187286376953125, 0.9449996948242188, ["28"]],
	[0.67431640625, -0.0262451171875, 0.9449996948242188, ["29"]],
	[0.6756591796875, 0.140594482421875, 0.9449996948242188, ["30"]],
	[0.7542724609375, -0.19415283203125, 0.9449996948242188, ["31"]],
	[0.7542724609375, -0.01898193359375, 0.9449996948242188, ["32"]],
	[0.75439453125, 0.1448974609375, 0.9449996948242188, ["33"]],
	[0.8392333984375, -0.18951416015625, 0.9449996948242188, ["34"]],
	[0.837646484375, -0.023468017578125, 0.9449996948242188, ["35"]],
	[0.8380126953125, 0.14227294921875, 0.9449996948242188, ["36"]],
	[-0.1368408203125, -0.02099609375, 0.9449996948242188, ["0","00"]],
	[-0.055419921875, -0.105804443359375, 0.9449996948242188, ["1","2"]],
	[-0.0567626953125, 0.058624267578125, 0.9449996948242188, ["2","3"]],
	[0.02587890625, -0.10498046875, 0.9449996948242188, ["4","5"]],
	[0.0244140625, 0.058837890625, 0.9449996948242188, ["5","6"]],
	[0.100341796875, -0.10382080078125, 0.9449996948242188, ["7","8"]],
	[0.1064453125, 0.06011962890625, 0.9449996948242188, ["8","9"]],
	[0.19189453125, -0.1060791015625, 0.9449996948242188, ["10","11"]],
	[0.1856689453125, 0.05438232421875, 0.9449996948242188, ["11","12"]],
	[0.27099609375, -0.10870361328125, 0.9449996948242188, ["13","14"]],
	[0.2667236328125, 0.058502197265625, 0.9449996948242188, ["14","15"]],
	[0.3463134765625, -0.107696533203125, 0.9449996948242188, ["16","17"]],
	[0.34814453125, 0.0556640625, 0.9449996948242188, ["17","18"]],
	[0.42822265625, -0.109130859375, 0.9449996948242188, ["19","20"]],
	[0.4302978515625, 0.0550537109375, 0.9449996948242188, ["20","21"]],
	[0.511474609375, -0.107421875, 0.9449996948242188, ["22","23"]],
	[0.512451171875, 0.0614013671875, 0.9449996948242188, ["23","24"]],
	[0.5980224609375, -0.107147216796875, 0.9449996948242188, ["25","26"]],
	[0.596435546875, 0.0574951171875, 0.9449996948242188, ["26","27"]],
	[0.673828125, -0.106903076171875, 0.9449996948242188, ["28","29"]],
	[0.6751708984375, 0.058685302734375, 0.9449996948242188, ["29","30"]],
	[0.7532958984375, -0.1102294921875, 0.9449996948242188, ["31","32"]],
	[0.750244140625, 0.06103515625, 0.9449996948242188, ["32","33"]],
	[0.834716796875, -0.108978271484375, 0.9449996948242188, ["34","35"]],
	[0.836181640625, 0.05828857421875, 0.9449996948242188, ["35","36"]],
	[-0.0167236328125, -0.187042236328125, 0.9449996948242188, ["1","4"]],
	[-0.0167236328125, -0.02154541015625, 0.9449996948242188, ["2","5"]],
	[-0.0164794921875, 0.140350341796875, 0.9449996948242188, ["3","6"]],
	[0.064453125, -0.1865234375, 0.9449996948242188, ["4","7"]],
	[0.06494140625, -0.01727294921875, 0.9449996948242188, ["5","8"]],
	[0.068603515625, 0.13873291015625, 0.9449996948242188, ["6","9"]],
	[0.144287109375, -0.184173583984375, 0.9449996948242188, ["7","10"]],
	[0.14501953125, -0.024139404296875, 0.9449996948242188, ["8","11"]],
	[0.14501953125, 0.136993408203125, 0.9449996948242188, ["9","12"]],
	[0.2291259765625, -0.18670654296875, 0.9449996948242188, ["10","13"]],
	[0.227783203125, -0.0242919921875, 0.9449996948242188, ["11","14"]],
	[0.2286376953125, 0.14398193359375, 0.9449996948242188, ["12","15"]],
	[0.308349609375, -0.18792724609375, 0.9449996948242188, ["13","16"]],
	[0.308837890625, -0.02374267578125, 0.9449996948242188, ["14","17"]],
	[0.3099365234375, 0.14410400390625, 0.9449996948242188, ["15","18"]],
	[0.39111328125, -0.192230224609375, 0.9449996948242188, ["16","19"]],
	[0.390869140625, -0.0189208984375, 0.9449996948242188, ["17","20"]],
	[0.39111328125, 0.146514892578125, 0.9449996948242188, ["18","21"]],
	[0.470947265625, -0.188690185546875, 0.9449996948242188, ["19","22"]],
	[0.4705810546875, -0.0205078125, 0.9449996948242188, ["20","23"]],
	[0.4725341796875, 0.140167236328125, 0.9449996948242188, ["21","24"]],
	[0.5491943359375, -0.189666748046875, 0.9449996948242188, ["22","25"]],
	[0.548095703125, -0.022552490234375, 0.9449996948242188, ["23","26"]],
	[0.553955078125, 0.1446533203125, 0.9449996948242188, ["24","27"]],
	[0.6324462890625, -0.191131591796875, 0.9449996948242188, ["25","28"]],
	[0.635498046875, -0.0224609375, 0.9449996948242188, ["26","29"]],
	[0.6392822265625, 0.139190673828125, 0.9449996948242188, ["27","30"]],
	[0.71533203125, -0.187042236328125, 0.9449996948242188, ["28","31"]],
	[0.7181396484375, -0.02447509765625, 0.9449996948242188, ["29","32"]],
	[0.7152099609375, 0.138153076171875, 0.9449996948242188, ["30","33"]],
	[0.7969970703125, -0.1904296875, 0.9449996948242188, ["31","34"]],
	[0.7955322265625, -0.024871826171875, 0.9449996948242188, ["32","35"]],
	[0.7960205078125, 0.137664794921875, 0.9449996948242188, ["33","36"]],
	[-0.0560302734375, -0.271240234375, 0.9449996948242188, ["1","2","3"]],
	[0.024658203125, -0.271392822265625, 0.9449996948242188, ["4","5","6"]],
	[0.1051025390625, -0.272125244140625, 0.9449996948242188, ["7","8","9"]],
	[0.1898193359375, -0.27001953125, 0.9449996948242188, ["10","11","12"]],
	[0.2696533203125, -0.271697998046875, 0.9449996948242188, ["13","14","15"]],
	[0.351318359375, -0.268096923828125, 0.9449996948242188, ["16","17","18"]],
	[0.4287109375, -0.269561767578125, 0.9449996948242188, ["19","20","21"]],
	[0.5098876953125, -0.2716064453125, 0.9449996948242188, ["22","23","24"]],
	[0.5960693359375, -0.271148681640625, 0.9449996948242188, ["25","26","27"]],
	[0.67724609375, -0.268524169921875, 0.9449996948242188, ["28","29","30"]],
	[0.7523193359375, -0.27227783203125, 0.9449996948242188, ["31","32","33"]],
	[0.8382568359375, -0.272125244140625, 0.9449996948242188, ["34","35","36"]],
	[-0.017333984375, -0.106170654296875, 0.9449996948242188, ["1","2","4","5"]],
	[-0.0162353515625, 0.060882568359375, 0.9449996948242188, ["2","3","5","6"]],
	[0.06591796875, -0.110107421875, 0.9449996948242188, ["4","5","7","8"]],
	[0.0653076171875, 0.060028076171875, 0.9449996948242188, ["5","6","8","9"]],
	[0.146484375, -0.10888671875, 0.9449996948242188, ["7","8","10","11"]],
	[0.1451416015625, 0.057159423828125, 0.9449996948242188, ["8","9","11","12"]],
	[0.22705078125, -0.1092529296875, 0.9449996948242188, ["10","11","13","14"]],
	[0.22802734375, 0.059356689453125, 0.9449996948242188, ["11","12","14","15"]],
	[0.307373046875, -0.1043701171875, 0.9449996948242188, ["13","14","16","17"]],
	[0.309814453125, 0.05584716796875, 0.9449996948242188, ["14","15","17","18"]],
	[0.3919677734375, -0.111083984375, 0.9449996948242188, ["16","17","19","20"]],
	[0.3924560546875, 0.0596923828125, 0.9449996948242188, ["17","18","20","21"]],
	[0.471923828125, -0.1044921875, 0.9449996948242188, ["19","20","22","23"]],
	[0.4698486328125, 0.060028076171875, 0.9449996948242188, ["20","21","23","24"]],
	[0.5531005859375, -0.106170654296875, 0.9449996948242188, ["22","23","25","26"]],
	[0.5546875, 0.059417724609375, 0.9449996948242188, ["23","24","26","27"]],
	[0.633544921875, -0.101531982421875, 0.9449996948242188, ["25","26","28","29"]],
	[0.6337890625, 0.0579833984375, 0.9449996948242188, ["26","27","29","30"]],
	[0.7156982421875, -0.106292724609375, 0.9449996948242188, ["28","29","31","32"]],
	[0.7158203125, 0.0604248046875, 0.9449996948242188, ["29","30","32","33"]],
	[0.7947998046875, -0.108642578125, 0.9449996948242188, ["31","32","34","35"]],
	[0.7952880859375, 0.059051513671875, 0.9449996948242188, ["32","33","35","36"]],
	[-0.099609375, -0.2711181640625, 0.9449996948242188, ["0","00","1","2","3"]],
	[-0.0147705078125, -0.27154541015625, 0.9449996948242188, ["1","2","3","4","5","6"]],
	[0.064697265625, -0.270263671875, 0.9449996948242188, ["4","5","6","7","8","9"]],
	[0.144775390625, -0.271209716796875, 0.9449996948242188, ["7","8","9","10","11","12"]],
	[0.226806640625, -0.27142333984375, 0.9449996948242188, ["10","11","12","13","14","15"]],
	[0.306396484375, -0.27142333984375, 0.9449996948242188, ["13","14","15","16","17","18"]],
	[0.3895263671875, -0.27099609375, 0.9449996948242188, ["16","17","18","19","20","21"]],
	[0.468017578125, -0.275238037109375, 0.9449996948242188, ["19","20","21","22","23","24"]],
	[0.5509033203125, -0.2738037109375, 0.9449996948242188, ["22","23","24","25","26","27"]],
	[0.6336669921875, -0.27386474609375, 0.9449996948242188, ["25","26","27","28","29","30"]],
	[0.7144775390625, -0.272186279296875, 0.9449996948242188, ["28","29","30","31","32","33"]],
	[0.7935791015625, -0.272918701171875, 0.9449996948242188, ["31","32","33","34","35","36"]],
	[0.0643310546875, -0.304718017578125, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12"]], //1st12
	[0.392822265625, -0.304779052734375, 0.9449996948242188, ["13","14","15","16","17","18","19","20","21","22","23","24"]],//2nd12
	[0.712158203125, -0.30303955078125, 0.9449996948242188, ["25","26","27","28","29","30","31","32","33","34","35","36"]],//3rd12
	[0.9222412109375, -0.185882568359375, 0.9449996948242188, ["1","4","7","10","13","16","19","22","25","28","31","34"]],//2to1
	[0.9229736328125, -0.0181884765625, 0.9449996948242188, ["2","5","8","11","14","17","20","23","26","29","32","35"]],//2to1
	[0.9248046875, 0.14849853515625, 0.9449996948242188, ["3","6","9","12","15","18","21","24","27","30","33","36"]],//2to1
	[-0.011474609375, -0.378875732421875, 0.9449996948242188, ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]],//1-18
	[0.142822265625, -0.375732421875, 0.9449996948242188, ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"]], //even
	[0.308349609375, -0.37542724609375, 0.9449996948242188, ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"]],//red
	[0.4713134765625, -0.376861572265625, 0.9449996948242188, ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]],//black
	[0.6341552734375, -0.376495361328125, 0.9449996948242188, ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"]],//odd
	[0.7926025390625, -0.382232666015625, 0.9449996948242188, ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"]]//19-36
];

clearTableMarkers = () =>
{
	for(var i=0; i < tableMarkers.length; i++)
	{
		tableMarkers[i].destroy();
	}
	tableMarkers = [];
}