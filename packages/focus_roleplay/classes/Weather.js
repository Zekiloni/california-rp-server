
const req = require('request-promise');
const laWeather = 'http://api.weatherapi.com/v1/current.json?key=c5aab2441e9248e49ee81903201910&q=los_angeles';


class Weather { 
   sync = () => { 
      setInterval(() => { 
         req(laWeather)
         .then(function(data) {
           let jsonData = JSON.parse(data)
           let code = jsonData.current.condition.code
       
           switch (code) {
               case 1000:
                 mp.world.weather = 0
                 break;
               case 1003:
                 mp.world.weather = 2
                 break;
               case 1006:
                 mp.world.weather = 2
                 break;
               case 1066:
                 mp.world.weather = 10
                 break;
               case 1135:
                 mp.world.weather = 4
                 break;
               case 1183:
                 mp.world.weather = 6
                 break;
               case 1189:
                 mp.world.weather = 6
                 break;
               case 1273:
                 mp.world.weather = 7
                 break;
               default:
                 mp.world.weather = 1
             }
       
           core.terminal(3, `Server Weather is synced with Los Angeles (${jsonData.current.condition.text}) `)
         })
         .catch(function(err){
           core.terminal(1, `Server Weather, there was a problem fetching weather, ${err}.`)
         }); 
      }, 3600000)
   }
}

mp.weather = new Weather();
mp.weather.sync();