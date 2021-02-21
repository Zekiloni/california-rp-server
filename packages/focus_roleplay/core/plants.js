


mp.plants = [];

const PLANT_TYPES = [ 
   { type: 'palm', name: 'Palma', model: 'apa_mp_h_acc_plant_palm_01', growTime: 3 },
   { type: 'marijuana', name: 'Kanabis', model: 'bkr_prop_weed_01_small_01a', growTime: 5 },
   { type: 'cocaina', name: 'Stabljika koke', model: 'aaaa', growTime: 10 }
];

const plantsTimer = 60; // seconds

function Plant (data) {
   this.id = data.id;
   this.type = data.type || 0;
   this.model = data.model || 'apa_mp_h_acc_plant_palm_01'
   this.contribution = data.contribution || 0.5;
   this.dimension = data.dimension || 0;
   this.position = data.position || 0;
   this.owner = data.owner || -1;
   this.progress = data.progress || 1;

   let pos = new mp.Vector3(data.position.x, data.position.y, data.position.z - 2.8), plantName = PLANT_TYPES[data.type].name, plantModel = PLANT_TYPES[data.type].model;
   this.object = mp.objects.new(plantModel, pos, { alpha: 255, dimension: data.dimension });
   this.label = mp.labels.new(plantName, new mp.Vector3(pos.x, pos.y, pos.z + 2), { los: false, font: 0, drawDistance: 3 })

   mp.plants.push(this)

   this.delete = () => { 
      this.object.destroy();
      this.label.destroy();
      let x = mp.plants.indexOf(this);
      mp.plants.splice(x, 1)
   }

   this.refresh = () => { 
      let plantName = PLANT_TYPES[this.type].name,
         plantGrow = PLANT_TYPES[this.type].growTime;
      let progress = this.progress / 60;
      this.label.text = plantName + ' '  + progress + ' / ' + plantGrow;

      if (progress < plantGrow) { 
         let pos = new mp.Vector3(this.object.position.x, this.object.position.y, this.object.position.z)
         this.object.position = new mp.Vector3(pos.x, pos.y, pos.z + 0.005)
         this.label.position = this.object.position;
      } else return false;
   }

}

var plants = {

   load: () => { 
      let counter = 0;

   },

   check: () => { 
      mp.plants.forEach(plant => {
         plant.progress ++;
         plant.refresh();
      });

      setTimeout(plants.check, plantsTimer * 1000);
   },

   create: (player, data) => { 
      let plant = PLANT_TYPES[data.type],
         contribution = core.randomInRange(10, 50);
      let p = new Plant({
         type: data.type,
         owner: player.databaseID,
         position: player.position,
         dimension: player.dimension,
         contribution: contribution
      });
   },

   delete: (player, data) => { 

   },

}

module.exports = plants;

plants.check()
plants.load()