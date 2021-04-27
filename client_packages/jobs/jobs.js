


const player = mp.players.local;
var jobOfferCEF;

mp.events.add({

   'client:player.job.offer': (jobId, jobName, jobLoc, jobDesc) => {
       jobOfferCEF = mp.browsers.new('package://jobs/job-offer/job.html');
       jobOfferCEF.execute(`jobOffer(\"${jobId}\", \"${jobName}\", \"${jobLoc}\",  \"${jobDesc}\");`); 
       setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
   },

   'client:closeJobOffer': () => {
       jobOfferCEF.destroy();
       setTimeout(() => { mp.gui.cursor.show(false, false); }, 1000);
   },

   'client:player.job.accept': (jobId) => { 
      mp.events.callRemote('server:acceptJobOffer', parseInt(jobId));
   },

   'client:createjobWaypoint': (x, y) => { 
        mp.game.ui.setNewWaypoint(x, y);
   },

   'client:createJobMarker': (type = 1, position, radius = 10, color, dimension = 0) => { 
       let pos = position;
        mp.checkpoints.new(type, new mp.Vector3(pos.x, pos.y, pos.z - 1.5), radius,
        {
            color: [ color.r, color.g, color.b, color.a ],
            visible: true,
            dimension: dimension
        });
   },

    'client:destroyJobMarker': (marker) => { marker.destroy(); },

    'client:createJobBlip': (sprite = 1, position, name = 'A321', color = 36, alpha = 255, shortRange, rotation = 0, dimension = 0) => { 
        let jobBlip = mp.blips.new(sprite, new mp.Vector3(position.x, position.y, 0),
        {
            name: name,
            color: color,
            alpha, alpha,
            shortRange: shortRange,
            rotation: rotation,
            dimension: dimension,
        });
    },

    'client:destroyJobBlip': (blip) => { blip.destroy(); }
});
