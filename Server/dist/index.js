"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("./Models/Account"));
const Character_1 = __importDefault(require("./Models/Character"));
require("./scripts/Database");
const Main_1 = require("./Server/Main");
// !!! TEST //
require('./Test');
// DATA
let Globals = require('./configs/Globals');
// MODELS 
let Logs = require('./models/Logs');
// MODULES
const Helpers = require('./modules/Managers');
// mp.events.addProc('test_proc', async (text)...) // dodavanje prcoedure
// let res = await player.callProc('test_proc', ['ok']); - pozivanje klijent procedure sa servera
// let res = await mp.events.callRemoteProc('server:player.character:delete', character); // pzoivanje server procedure sa klijenta
// Player.Nearest(); - vraca instancu najblizeg objekta
// PERFORMANCE TEST
// let Start = new Date();
// let End = new Date();
// console.log('Finished in ' + ((End - Start) / 1000));
(async () => {
    const Chars = await Character_1.default.count();
    const Users = await Account_1.default.count();
    Main_1.Main.Terminal(3, 'There are registered ' + Users + ' users, with ' + Chars + ' registered characters.');
})();
const Exit = async () => {
    Main_1.Main.Terminal(Main_1.LogType.Succes, 'Clossing Connection, Bye-bye !');
    mp.players.broadcast('Server se gasi. Rekonektujte se na F1.');
    mp.players.forEach((player) => {
        player.kick('Server se gasi !');
    });
    Main_1.Main.Sleep(2.5).then(() => {
        process.exit();
    });
};
process.on('SIGHUP', Exit);
process.on('SIGQUIT', Exit);
process.on('SIGTERM', Exit);
process.on('SIGINT', Exit);
