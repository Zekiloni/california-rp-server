let rouletteEnd = -1;
let lastTenWiningNumbers = [];
let tablesBets =
[
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]
]

let tablesPos = 
[
	[ "vw_prop_casino_roulette_01", 1144.4254150390625, 269.3034973144531, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01", 1151.2305908203125, 263.14093017578125, -52.840850830078125 ],
	[ "vw_prop_casino_roulette_01b", 1148.9163818359375, 248.62892150878906, -52.03075408935547 ],
	[ "vw_prop_casino_roulette_01b", 1143.677978515625, 251.36131286621094, -52.0307502746582 ],
	[ "vw_prop_casino_roulette_01b", 1133.1802978515625, 262.3916320800781, -52.03075408935547 ], 
	[ "vw_prop_casino_roulette_01b", 1129.9976806640625, 266.93695068359375, -52.0307502746582 ], 
];

mp.events.add('server:occupyCasinoSeat', (player, casinoTable, casinoSeat) => {//mp.events.callRemote("server:occupyCasinoSeat", casinoTableToJoin, casinoSeatToJoin);
   if(player.data.casinoTable === -1 && player.data.casinoSeat === -1) {
      player.data.casinoTable = casinoTable;
      player.data.casinoSeat = casinoSeat;
   }
});

mp.events.add('server:leaveCasinoSeat', (player) => {
   if(player.data.casinoTable !== -1 && player.data.casinoSeat !== -1) {
      player.data.casinoTable = -1;
      player.data.casinoSeat = -1;
   }
});

spinRouletteWheel = (player) => {
   rouletteEnd = Math.floor(Math.random() * 38);
   
   if(lastTenWiningNumbers.length > 9) {
      lastTenWiningNumbers = [];
   }
   lastTenWiningNumbers.push(rouletteEnd);
   
   if(rouletteEnd >= 0 && rouletteEnd <= 38) {
      mp.players.callInDimension(0, "client:spinRouletteWheel", player.rouletteTable, 10, `exit_${rouletteEnd}_wheel`, `exit_${rouletteEnd}_ball`);
   }
}

/*
addBets = (player, table, amount) => {
   tablesBets[table][1]
}
*/
