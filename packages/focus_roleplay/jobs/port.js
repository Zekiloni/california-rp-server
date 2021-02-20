

const HANDLER_VEH_POINT = { position: [851.60418, -2942.36010, 5.22658], rotation: [-0.0529914, 0.009985, -94.208023] },
   DOWN_OFFSET = 0.5,
   UP_OFFSET = 3,
   DROPZONE_POINT = [1119.51806, -3142.53393, 5.26680];

let portContainers = new Map([ 
   [1, { position: [858.7689, -2926.11914, 5.2264], rotation: [0.0467959, 0.01862500, -92.3342] }],
   [2, { position: [870.7026, -2926.32714, 5.2270], rotation: [-0.0717803, -0.007079, -89.4799] }],
   [3, { position: [889.9401, -2926.15454, 5.2146], rotation: [-0.1071529, -0.022891, -89.4974] }],  
   [4, { position: [910.0266, -2925.97851, 5.2142], rotation: [-0.1027628, -0.000219, -89.4885] }], 
   [5, { position: [925.7468, -2925.81713, 5.2177], rotation: [-0.0835634, 0.0236140, -89.3605] }], 
   [6, { position: [910.1923, -2914.47070, 5.2150], rotation: [-0.0990968, -0.001266, 87.97956] }], 
   [7, { position: [887.1997, -2914.36376, 5.2163], rotation: [-0.0961092, -0.007568, 90.36054] }],
   [8, { position: [867.2453, -2914.49121, 5.2176], rotation: [-0.1004520, -0.000604, 90.34505] }]
])

global.dropZoneContainers = [];

const CONTAINER_TYPES = ['Maloprodajne Zalihe', 'Oprema za Oruzije i Municija', 'Namestaj i Pokucstvo'],
      refreshInterval = 1200 * 1000,
      MAX_CONTAINERS_PER_PLAYER = 5; // 20 minutes


var container = { 

   load: () => { 
      portContainers.forEach((container) => {
         console.log('1')
         let type = Math.floor(Math.random() * CONTAINER_TYPES.length),
            pos = new mp.Vector3(container.position[0], container.position[1], container.position[2] - DOWN_OFFSET),
            rot = new mp.Vector3(container.rotation[0], container.rotation[1], container.rotation[2]),
            labelPos = new mp.Vector3(container.position[0], container.position[1], container.position[2] + UP_OFFSET);
         container.type = CONTAINER_TYPES[type];
         container.object = mp.objects.new('prop_container_03a', pos, { rotation: rot, alpha: 255, dimension: 0 });
         container.label = mp.labels.new(CONTAINER_TYPES[type], labelPos, { los: false, font: 0, drawDistance: 10 });
         container.exist = true;
         container.attached = false;
      })
   },

   refresh: () => { 
      let loadCoutner = 0;
      portContainers.forEach((container ) => { 
         if (!container.exist) { 
            let type = Math.floor(Math.random() * CONTAINER_TYPES.length),
               pos = new mp.Vector3(container.position[0], container.position[1], container.position[2] - DOWN_OFFSET),
               rot = new mp.Vector3(container.rotation[0], container.rotation[1], container.rotation[2]),
               labelPos = new mp.Vector3(container.position[0], container.position[1], container.position[2] + UP_OFFSET);
            container.type = CONTAINER_TYPES[type];
            container.object =  mp.objects.new('prop_container_03a', pos, { rotation: rot, alpha: 255, dimension: 0 });
            container.label = mp.labels.new(CONTAINER_TYPES[type], labelPos, { los: false, font: 0, drawDistance: 10 });
            container.exist = true;
            container.attached = false;
            loadCoutner ++;
         }
      })
      core.terminal(3, `Refreshing Containers, ${loadCoutner} refreshed of ${portContainers.size}`)
   },

   delete: (container) => { 
      container.exist = false;
      container.type = null;
      container.attached = false;
   },

   attach: (player, cont) => { 
      if (player.data.container) return account.notification(player, 'Već imate zakačen kontenjer.', NOTIFY_ERROR, 4)
      cont.attached = player.id;
      player.data.container = cont;
      cont.object.destroy();
      cont.label.destroy();

      mp.players.forEachInRange(player.position, 100, (target) => { 
         target.call('client:syncHandlerContainer', [player, 'prop_container_03a'])
      })
   },

   near: (player) => { 
      let nearContainer = null;
      portContainers.forEach((container) => { 
         let contPos = new mp.Vector3(container.position[0], container.position[1], container.position[2])
         player.dist(contPos) < 8 ?  nearContainer = container : false ;
      })
      return nearContainer;
   },

   deliver: (player) => { 
      let dropZone = new mp.Vector3(DROPZONE_POINT[0], DROPZONE_POINT[1], DROPZONE_POINT[2])
      if (player.dist(dropZone) > 20) return account.notification(player, 'Ne nalazite se u zoni za dostavu.', NOTIFY_ERROR, 4)
      
      mp.players.forEachInRange(player.position, 100, (target) => { 
         target.call('client:detachHandlerContainer', [player])
      })

      let rC = Math.floor(Math.random() * 15),
         rr = Math.floor(Math.random() * 20)
         pos = new mp.Vector3(DROPZONE_POINT[0] + rC, DROPZONE_POINT[1] + rC, DROPZONE_POINT[2] - DOWN_OFFSET),
         labelPos = new mp.Vector3(pos.x, pos.y, pos.z + UP_OFFSET),
         rot = new mp.Vector3(0, 0, rC * rr)
      
      let dropCont =  [
         type = player.data.container.type,
         object = mp.objects.new('prop_container_03a', pos, { rotation: rot, alpha: 255, dimension: 0 }),
         label = mp.labels.new(player.data.container.type, labelPos, { los: false, font: 0, drawDistance: 10 })
      ]
         
      dropZoneContainers.push({dropCont})
      console.log(dropZoneContainers)

      container.delete(player.data.container)
      setTimeout(() => { player.data.container = false; }, 500);
      
      player.jobCount ++;
      player.salary += 50;
      if (player.jobCount >= MAX_CONTAINERS_PER_PLAYER) { 
         port.finish(player)
      }
   },
}
 
container.load();
setInterval(() => { container.refresh(); }, refreshInterval);

var port = { 
   start: (player, job) => { 
      player.duty = true;
      switch(job) { 
         case 1: 
            let pos = HANDLER_VEH_POINT.position,
               color = core.randomRGB();
            let vehicle = mp.vehicles.new(mp.joaat('handler'), new mp.Vector3(pos[0], pos[1], pos[2]),
            { color: [[color.r, color.g, color.b], [color.r, color.g, color.b]], heading: HANDLER_VEH_POINT.rotation[2], engine: false });
            vehicle.job = JOB_LS_PORT.ID;
            break;

         case 2:
            break;

         default:
            return false;
      }
   },

   stop: (player) => { 
      if (!player.duty) return false;
      player.duty = false;
      if (player.jobCount > 0) { 

      } else return false;
   },

   finish: (player) => { 
   
   },
}


mp.events.addCommand({
   'port': (player, fullText) => {
      if (player.job != JOB_LS_PORT.ID) return account.notification(player, MSG_UNEMPLOYED, NOTIFY_ERROR, 4);
      if (!fullText) return false;
      let args = fullText.split(' '),
         action = args[0];
      switch(action) {
         case 'load':
            if (player.duty) return account.notification(player, MSG_ALREADY_WORKING, NOTIFY_ERROR, 4);
            port.start(player, 1)
            break;
         case 'delivery':
            if (player.duty) return account.notification(player, MSG_ALREADY_WORKING, NOTIFY_ERROR, 4);
            port.start(player, 2)
            break;   
         default:
            return account.notification(player, `Nepoznat argument koomande <b>/port</b> (load, unload, deliver)`, NOTIFY_INFO, 4);
      }
   }
});

mp.events.add({
   'server:checkForContainers': (player) => { 
      let nearbyCont = container.near(player)
      if (nearbyCont) { 
         container.attach(player, nearbyCont);
      } else { 
         console.log('oh no')
         return false;
      }
   },

   'server:dettachContainer': (player) => {  container.deliver(player) },
})





