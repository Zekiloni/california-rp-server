"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const Colors_1 = require("../Global/Colors");
const routes = [
    require('../../data/bus_routes/Airport.json'),
    require('../../data/bus_routes/Zacundo.json'),
    require('../../data/bus_routes/Vinewood.json'),
    require('../../data/bus_routes/Morningwood.json'),
    require('../../data/bus_routes/Rockford.json')
];
class Bus {
    constructor() {
        mp.events.add({
            'server:player.transit.start': (player, route) => {
                let character = player.getCharacter(), checkpoints = {};
                routes[route].Stations.forEach((s) => {
                    let coords = s.StationCoords;
                    checkpoints[s.StationIndex] = { name: s.StationName, position: new mp.Vector3(coords.X, coords.Y, coords.Z) };
                });
                character.working.duty = true;
                player.call('client:player.transit.start', [checkpoints]);
            },
            'server:player.transit.stop': (player, finished, stations, distance) => {
                if (finished) {
                    let character = player.getCharacter(), money = 0;
                    money += distance * 0.002, money += stations * 0.05;
                    player.SendMessage('Novac za rutu ' + Math.ceil(money), Colors_1.Colors.info);
                    character.working.salary += Math.ceil(money);
                    if (player.vehicle)
                        player.vehicle.destroy();
                }
            }
        });
    }
}
exports.Bus = Bus;
/*
mp.events.addCommand("bus", (Player: PlayerMp, Message: string, i: number) => {
    mp.events.call('server:player.transit.start', Player, i);
});
*/ 
