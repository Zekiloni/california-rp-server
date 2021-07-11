

// let Terminal = require('../modules/jobs/Jetsam');
// let Transit = require('../modules/jobs/Transit');
// let Miner = require('../modules/jobs/Miner');

require('../modules/jobs/Sanitation');
require('../modules/jobs/Food');


const List = {
   1: { 
      id: 1, name: 'Jetsam Terminal', description: 'Forklift Driver',
      point: new mp.Vector3(816.988, -2977.546, 6.020), blip: 569, sprite: 78,
   },

   2: {
      id: 2, name: 'Los Santos Mine', description: 'Miner',
      point: new mp.Vector3(2706.490, 2777.513, 37.878), blip: 527, sprite: 44,
   },

   3: {
      id: 3, name: 'Los Santos Transit', description: 'Bus Driver',
      point: new mp.Vector3(435.0450, -646.1735, 28.7349), blip: 513, sprite: 66,
   },

   4: {
      id: 4, name: 'Deptartment of Sanitation', description: 'Garbage man.',
      point: new mp.Vector3(-321.5518, -1545.599, 31.020), blip: 318, sprite: 52,
   },

   5: { 
      id: 5, name: 'Department of Power & Water', description: 'Electrician / Plumber',
      point: new mp.Vector3(678.4655, 73.924, 83.1535), blip: 398, sprite: 3
   },

   6: { 
      id: 6, name: 'The 69th Street Diner', description: 'Food Delivery',
      point: new mp.Vector3(146.37088, -1522.3398, 29.1416), blip: 103, sprite: 60
   }
}


mp.events.add({
   'server:job:accept': async (player, i) => { 
      const Job = frp.Jobs.Job[i];
      Job.Take(player);
   }
})


frp.Jobs = class Jobs { 

   static Job = {};

   constructor (id, name, description, position, blip) { 
      this.id = id;
      this.name = name;
      this.description = description;
      this.position = position;

      this.blip = mp.blips.new(blip[0], this.position, { name: this.name, color: blip[1], shortRange: true, scale: 0.8 });
      this.colshape = mp.colshapes.newRectangle(this.position.x, this.position.y, 2.0, 2.0, 0),
      this.marker = mp.markers.new(1, new mp.Vector3(this.position.x, this.position.y, this.position.z -0.98), 1.5, {
         color: frp.Globals.MarkerColors.Job, 
         rotation: new mp.Vector3(0, 0, 90), 
         visible: true, 
         dimension: frp.Settings.default.dimension
      });

      this.colshape.OnPlayerEnter = async (player) => { 
         const Character = await player.Character();
         if (Character.Job != frp.Globals.Jobs.Unemployed) return;
         player.Notification(this.name + ', ' + this.description + '.<br>' + '/takejob', frp.Globals.Notification.Info, 5);
      }
      
      Jobs.Job[id] = this;
   }

   static Init () { 
      for (const i in List) { 
         const Job = List[i];
         new Jobs(Job.id, Job.name, Job.description, Job.point, [Job.blip, Job.sprite]);
      }
   }

   static Nearest (player) {
      for (const i in frp.Jobs.Job) { 
         const Job = frp.Jobs.Job[i];
         if (player.dist(Job.position) < 3) return Job;
      }
   }
};


frp.Jobs.prototype.Take = async function (player) { 
   const Character = await player.Character();

   player.Notification(frp.Globals.messages.SUCCESFULLY_JOB + this.description, frp.Globals.Notification.Succes, 5);
   Character.SetJob(player, this.id);
};


frp.Jobs.prototype.Quit = async function (player) { 
   const Character = await player.Character();
   if (Character.Job == frp.Globals.Jobs.Unemployed) return player.Notification(frp.Globals.messages.UNEMPLOYED, frp.Globals.Notification.Error, 5);

};


frp.Jobs.Init();

