"use strict";
// import { Main } from "../Server/Main";
// const rp = require('request-promise');
// const hook = 'https://discord.com/api/webhooks/776875976633876490/zjzUiip35FUX5arAdjtKnpHGP4RRQ-nP9j_Frlqs63QrRC279_Uq-CHlBi3KipFWzGRx';
// const vinewoodOnline = {
//     color: '#ffcd1d',
//     url: 'https://discord.com/api/webhooks/823659820833832971/Jcpo0AcSVsTU_labTWbnO8dSLg0yxQFd9fDDYuDH5DfL6DKHFkd1FGF7tCxJCDp1STdn'
// };
// export class Discord {
//     send: any;
//     constructor() {
//         // send hook
//         this.send = (title: string, subtitle: string, message: string, color: string) => {
//             var myEmbed = {
//                 author: {
//                     name: title
//                 },
//                 title: subtitle,
//                 description: message,
//                 color: Main.HexToDecimal(color)
//             };
//             var params = {
//                 username: 'Focus Roleplay',
//                 embeds: [myEmbed]
//             };
//             var options = {
//                 method: 'POST',
//                 uri: hook,
//                 body: params,
//                 json: true
//             };
//             rp(options)
//                 .then(function (parsedBody) {
//             })
//                 .catch(function (err) {
//                 Main.Terminal(1, 'Discord send Error ' + err);
//             });
//         };
//         // screenshot
//         mp.events.add({
//             'server:disord.screenshot:send': (player, image, zone, street) => {
//                 let res = JSON.parse(image);
//                 var myEmbed = {
//                     author: {
//                         name: 'Uživo slika sa servera'
//                     },
//                     title: player.name,
//                     description: zone + ', ' + street,
//                     image: {
//                         url: res.data.image.url
//                     },
//                     color: Main.HexToDecimal(vinewoodOnline.color)
//                 };
//                 var params = {
//                     username: 'focus.online',
//                     embeds: [myEmbed]
//                 };
//                 var options = {
//                     method: 'POST',
//                     uri: vinewoodOnline.url,
//                     body: params,
//                     json: true
//                 };
//                 rp(options)
//                     .then(function (parsedBody) {
//                 })
//                     .catch(function (err) {
//                     core.terminal(1, 'Discord send Error ' + err);
//                 });
//             },
//         });
//     }
// }
// //mp.discord = new Discord();
// // mp.discord.send('Server Startovan', 'adadada', 'adada', '#fffff')