


const player = mp.players.local;
let jobOffer, offerOpened = false;

mp.events.add({

   'client:player.job.offer': (job) => {
        if (offerOpened) { 
            offerOpened = false;
            jobOffer.destroy();
            setTimeout(() => { mp.gui.cursor.show(false, false); }, 1000);
        } else { 
            jobOffer = mp.browsers.new('package://jobs/job-offer/job.html');
            offerOpened = true;
            jobOffer.execute(`offer.player = \"${player.name}\", offer.job.name = \"${job.name}\", offer.job.desc = \"${job.description}\", offer.job.id = ${job.id};`); 
            setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);
       }
   },

   'client:player.job.accept': (job) => { 
        if (offerOpened) mp.events.call('client:player.job.offer')
        mp.events.callRemote('server:player.job.accept', job);
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
