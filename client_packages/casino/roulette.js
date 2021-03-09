let lpCasinoTable = null;
let casinoTableToJoin = null;
let casinoSeatToJoin = null;
let goToSeatInterval = null;
let interactingWithTable = null;
let rouletteCamera = null;
let canDoBets = false;
let betObject = null;
let closestChipSpot = null;
let interactingWithTableTimeout = null;

let tablesPos = 
[
	[ "vw_prop_casino_roulette_01", 1144.4254150390625, 269.3034973144531, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01", 1151.2305908203125, 263.14093017578125, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01b", 1148.9163818359375, 248.62892150878906, -52.03075408935547 ],
	[ "vw_prop_casino_roulette_01b", 1143.677978515625, 251.36131286621094, -52.0307502746582 ],
	[ "vw_prop_casino_roulette_01b", 1133.1802978515625, 262.3916320800781, -52.03075408935547 ], 
	[ "vw_prop_casino_roulette_01b", 1129.9976806640625, 266.93695068359375, -52.0307502746582 ], 
];

let tablesBets = 
[
	[ 500, 2500 ],
	[ 1000, 5000 ],
	[ 3000, 15000 ],
	[ 7000, 35000 ],
	[ 10000, 50000 ],
	[ 20000, 100000 ]
];

let pedModels =
[
   ["S_M_Y_Casino_01"],
   ["S_F_Y_Casino_01"],
   ["S_M_Y_Casino_01"], 
   ["S_F_Y_Casino_01"],
   ["S_M_Y_Casino_01"], 
   ["S_F_Y_Casino_01"]
];

let pedModelVariations =
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

mp.game.streaming.requestIpl('vw_casino_main');
mp.blips.new(679, new mp.Vector3(935.8140869140625, 46.942176818847656, 81.09580993652344), { name: "Diamond Casino & Resort", color: 4, shortRange: true, scale: 1.0 });

let tableSeatsPos =
[
	[-0.7, -1.28, 1, 0],
	[0.775, -1.68, 1, 0],
	[1.8, -0.63, 1, 90],
	[1.27, 1.05, 1, 180]
]

let rouletteData = [];

for(var i=0; i < tablesPos.length; i++)
{
	rouletteData[i] = {};
	rouletteData[i].table = mp.objects.new(mp.game.joaat(tablesPos[i][0]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2], tablesPos[i][3]));
	rouletteData[i].ball = mp.objects.new(87196104, new mp.Vector3(tablesPos[i][1]-0.734742, tablesPos[i][2]-0.16617, tablesPos[i][3]));
	rouletteData[i].ped = mp.peds.new(mp.game.joaat(pedModels[i]), new mp.Vector3(tablesPos[i][1], tablesPos[i][2]+0.7, tablesPos[i][3]+1), 180, 0); //-0.001587
	rouletteData[i].ped.croupier = i;
	
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
		mp.game.graphics.notify(`Pritisnite ~b~[E]~s~ da sednete za sto.~n~Ulozi:~b~${tablesBets[casinoTableToJoin][0]}~s~ do ~b~${tablesBets[casinoTableToJoin][1]}~s~ $`);
	}
});

mp.events.add('playerExitColshape', (shape) => {
	if(shape.casinoTable !== undefined)
	{
		casinoTableToJoin = null;
		casinoSeatToJoin = null;
	}
});

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