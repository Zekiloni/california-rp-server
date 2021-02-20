
const fs = require("fs");
var jobs = require('./jobs')

var portJob = require('./port')

var routesDir = 'packages/focus_roleplay/jobs/bus-routes/';

module.exports = { 

   initJobs: function () {
      let counter = 0;
      JOBS.forEach(function (job) {
         let markerPos = job.POINT;
         let label = mp.labels.new(`${job.NAME}~n~${job.LOC}`, new mp.Vector3(markerPos.x, markerPos.y, markerPos.z), { los: true, font: 0, drawDistance: 4});

         let marker = mp.markers.new(27, new mp.Vector3(markerPos.x, markerPos.y, markerPos.z - 0.99), 1,
         { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 255], visible: true, dimension: 0 });
         let jobPoint = mp.colshapes.newRectangle(markerPos.x, markerPos.y, 1.5, 2, 0)
         jobPoint.job = job.ID;

         if (job.BLIP) { 
            let jobBlip = mp.blips.new(job.BLIP, new mp.Vector3(markerPos.x, markerPos.y, markerPos.z), { name: job.LOC, color: 36, shortRange: false });
         }

         counter ++;
     });
     core.terminal(3, `${counter} Jobs Loaded !`)
   },

   loadBusRoutes: function (name) { 
      let rawdata = fs.readFileSync(routesDir + `${name}.json`);
      let stations = JSON.parse(rawdata);
      busRoute.push(stations);
      let index = player.checkpoint;
      stations.Stations.forEach((station) => {
         player.maxCheckpoints ++;
      })
   },

   createBusRouteCheckpoint: function() {
      player.call('client:createCheckpoint', busRoute[index].X, busRoute[index].Y, busRoute[index].Z);
   },
   
}
var busRoute = [];