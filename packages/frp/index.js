
global.frp = {};

frp.Settings = require('./configs/Settings');
frp.Config = require('./configs/Config');
frp.Main = require('./classes/Main');
frp.Database = require('./classes/Database');


frp.GameObjects = {
   Houses: {}, Items: {}, Businesses: {}, Vehicles: {}, TemporaryVehicles: []
};



// !!! TEST //
require('./Test');


// DATA
let Globals = require('./configs/Globals');

// MODELS 
let Logs = require('./models/Logs');

const AntiCheat = require('./classes/Anticheat');

// MODULES
const Helpers = require('./modules/Helpers');


// CLASSES
let Player = require('./classes/Player');
let Accounts = require('./classes/Account');
let Admin = require('./classes/Admin');
let Characters = require('./classes/Character');
let Savings = require('./classes/Savings');
let Discord = require('./classes/Discord');
let Commands = require('./classes/Commands');
let Doors = require('./classes/Doors');
let Inventory = require('./classes/Inventory');
let Vehicles = require('./classes/Vehicles');
let Minute = require('./classes/Minute');
let Business = require('./classes/Business');
let Weather = require('./classes/Weather');
let Jobs = require('./classes/Jobs');



// mp.events.addProc('test_proc', async (text)...) // dodavanje prcoedure
// let res = await player.callProc('test_proc', ['ok']); - pozivanje klijent procedure sa servera
// let res = await mp.events.callRemoteProc('server:player.character:delete', character); // pzoivanje server procedure sa klijenta
// Player.Nearest(); - vraca instancu najblizeg objekta


(async () => {
   const Chars = await frp.Characters.count();
   const Users = await frp.Accounts.count();
   frp.Main.Terminal(3, 'There are registered ' + Users + ' users, with ' + Chars + ' registered characters.');

})();


console.log(mp.joaat('prop_gas_pump_1d'));



const Exit = async () => {
   frp.Main.Terminal(2, 'Closing Connection, Bye-bye !');
   mp.players.broadcast('Server se gasi. Rekonektujte se na F1.');

   mp.players.forEach((player) =>  {
      player.kick('Server se gasi !')
   });

   frp.Main.Sleep(5).then(process.exit());
};


process.on('SIGHUP', Exit);
process.on('SIGQUIT', Exit);
process.on('SIGTERM', Exit);
process.on('SIGINT', Exit);

