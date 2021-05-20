

global.frp = {};

frp.Settings = require('./configs/Settings');
frp.Config = require('./configs/Config');
frp.Main = require('./classes/Main');
frp.Database = require('./classes/Database');


// !!! TEST //
require('./Test');

// DATA
let Globals = require('./configs/Globals');

// MODELS 
let Logs = require('./models/Logs');
let Accounts = require('./models/Account');
let Bans = require('./models/Ban');
let Appearances = require('./models/Appearance');
let Characters = require('./models/Character');
let Channels = require('./models/Channel');
let Houses = require('./models/House');


// CLASSES
let Authentication = require('./classes/Authentication');
let Savings = require('./classes/Savings');
let Discord = require('./classes/Discord');
let Commands = require('./classes/Commands');
let Doors = require('./classes/Doors');
let Items = require('./classes/Items');
let Minute = require('./classes/Minute');
let Player = require('./classes/Player');

let Weather = require('./classes/Weather');

let Jobs = require('./classes/Jobs')
// let Vehicles;

// let Business;



const Exit = async () => { 
   frp.Main.Terminal(2, 'Closing Connection, Bye-bye !');
   await mp.players.broadcast(`!{red}Server se gasi. Pridružite se na F1.`);
   for (let player of mp.players.toArray()) {
      player.kick('Server se gasi...');
   };
   // await - send broadcast to players
   process.exit();
}

process.on('SIGHUP', Exit);
process.on('SIGQUIT', Exit);
process.on('SIGTERM', Exit);
process.on('SIGINT', Exit);


mp.events.addCommand("koo", (player, fullText) => {
	
   player.outputChatBox('Position ' + JSON.stringify(player.position))
   player.outputChatBox('Heading ' + JSON.stringify(player.heading))
   player.outputChatBox('Rotation ' + JSON.stringify(player.rotation))

});