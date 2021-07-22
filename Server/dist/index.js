"use strict";
global.frp = {};
frp.Settings = require('./configs/Settings');
frp.Config = require('./configs/Config');
frp.Main = require('./classes/Main');
frp.Database = require('./classes/Database');
frp.GameObjects = {
    Houses: {}, Items: {}, Businesses: {}, Vehicles: {}, TemporaryVehicles: {}, Garages: {}
};
// !!! TEST //
require('./Test');
// DATA
let Globals = require('./configs/Globals');
// MODELS 
let Logs = require('./models/Logs');
// MODULES
const Helpers = require('./modules/Helpers');
// CLASSES
let Accounts = require('./classes/Account');
let Admin = require('./classes/Admin');
let Characters = require('./classes/Character');
let Savings = require('./classes/Savings');
let Discord = require('./classes/Discord');
let Jobs = require('./classes/Jobs');
let Commands = require('./classes/Commands');
let Animals = require('./classes/Animals');
let Doors = require('./classes/Doors');
let Inventory = require('./classes/Inventory');
let Vehicles = require('./classes/Vehicles');
let Minute = require('./classes/Minute');
let Houses = require('./classes/Houses');
let Business = require('./classes/Business');
let Factions = require('./classes/Factions');
let Ambient = require('./classes/Ambient');
const AntiCheat = require('./classes/Anticheat');
// mp.events.addProc('test_proc', async (text)...) // dodavanje prcoedure
// let res = await player.callProc('test_proc', ['ok']); - pozivanje klijent procedure sa servera
// let res = await mp.events.callRemoteProc('server:player.character:delete', character); // pzoivanje server procedure sa klijenta
// Player.Nearest(); - vraca instancu najblizeg objekta
// PERFORMANCE TEST
// let Start = new Date();
// let End = new Date();
// console.log('Finished in ' + ((End - Start) / 1000));
(async () => {
    const Chars = await frp.Characters.count();
    const Users = await frp.Accounts.count();
    frp.Main.Terminal(3, 'There are registered ' + Users + ' users, with ' + Chars + ' registered characters.');
})();
const Exit = async () => {
    frp.Main.Terminal(2, 'Closing Connection, Bye-bye !');
    mp.players.broadcast('Server se gasi. Rekonektujte se na F1.');
    mp.players.forEach((player) => {
        player.kick('Server se gasi !');
    });
    frp.Main.Sleep(2.5).then(() => {
        process.exit();
    });
};
process.on('SIGHUP', Exit);
process.on('SIGQUIT', Exit);
process.on('SIGTERM', Exit);
process.on('SIGINT', Exit);
