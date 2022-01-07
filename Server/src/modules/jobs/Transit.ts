// import { Colors } from "../Global/Colors";

// const routes = [
//     require('../../data/bus_routes/Airport.json'),
//     require('../../data/bus_routes/Zacundo.json'),
//     require('../../data/bus_routes/Vinewood.json'),
//     require('../../data/bus_routes/Morningwood.json'),
//     require('../../data/bus_routes/Rockford.json')
// ];

// export class Bus {
//     constructor() {
//         mp.events.add({
//             'server:player.transit.start': (player, route) => {
//                 let character = player.getCharacter(), checkpoints: any = {};
//                 routes[route].Stations.forEach((s: any) => {
//                     let coords = s.StationCoords;
//                     checkpoints[s.StationIndex] = { name: s.StationName, position: new mp.Vector3(coords.X, coords.Y, coords.Z) };
//                 });
//                 character.working.duty = true;
//                 player.call('client:player.transit.start', [checkpoints]);
//             },
//             'server:player.transit.stop': (player, finished, stations, distance) => {
//                 if (finished) {
//                     let character = player.getCharacter(), money = 0;
//                     money += distance * 0.002, money += stations * 0.05;
//                     player.SendMessage('Novac za rutu ' + Math.ceil(money), Colors.info);
//                     character.working.salary += Math.ceil(money);
//                     if (player.vehicle)
//                         player.vehicle.destroy();
//                 }
//             }
//         });
//     }
// }
// /*
// mp.events.addCommand("bus", (Player: PlayerMp, Message: string, i: number) => {
//     mp.events.call('server:player.transit.start', Player, i);
// });
// */