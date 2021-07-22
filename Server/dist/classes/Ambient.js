"use strict";
var _a;
const req = require('request-promise');
const laWeather = 'http://api.weatherapi.com/v1/current.json?key=c5aab2441e9248e49ee81903201910&q=los_angeles';
frp.World = (_a = class World {
        static Weather() {
            req(laWeather)
                .then(function (data) {
                let jsonData = JSON.parse(data), code = jsonData.current.condition.code;
                switch (code) {
                    case 1000:
                        mp.world.weather = 0;
                        break;
                    case 1003:
                        mp.world.weather = 2;
                        break;
                    case 1006:
                        mp.world.weather = 3;
                        break;
                    case 1009:
                        mp.world.weather = 5;
                        break;
                    case 1030:
                        mp.world.weather = 4;
                        break;
                    case 1063:
                        mp.world.weather = 8;
                        break;
                    case 1066:
                        mp.world.weather = 10;
                        break;
                    case 1135:
                        mp.world.weather = 4;
                        break;
                    case 1114:
                        mp.world.weather = 10;
                        break;
                    case 1117:
                        mp.world.weather = 8;
                        break;
                    case 1135:
                        mp.world.weather = 3;
                        break;
                    case 1183:
                        mp.world.weather = 8;
                        break;
                    case 1183:
                        mp.world.weather = 6;
                        break;
                    case 1189:
                        mp.world.weather = 6;
                        break;
                    case 1273:
                        mp.world.weather = 7;
                        break;
                    default: mp.world.weather = 1;
                }
                frp.Main.Terminal(3, `Server Weather is synced with Los Angeles (${jsonData.current.condition.text}) `);
            }).catch(function (err) {
                frp.Main.Terminal(3, `Server Weather, there was a problem fetching weather, ${err}.`);
            });
            setTimeout(() => { World.Weather(); }, 1800000);
        }
        static Time() {
            const Now = new Date();
            const Hours = Now.getHours(), Minutes = Now.getMinutes();
            mp.world.time.set(Hours, Minutes, 0);
            setTimeout(() => { World.Time(); }, 60000);
        }
        static Electricity(index, toggle) {
        }
    },
    _a.Object = mp.objects.new('po1_sh2_po1_sh1_antenna1', new mp.Vector3(291.2749, -1019.739, 92.42607), {
        rotation: new mp.Vector3(0, 0, 0),
        alpha: 255,
        dimension: frp.Settings.default.dimension
    }),
    _a.Current = {
        Weather: 0,
        Time: 0
    },
    _a);
frp.World.Time();
frp.World.Weather();
