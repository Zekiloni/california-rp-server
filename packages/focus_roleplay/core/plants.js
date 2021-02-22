


mp.plants = [];

const PLANT_TYPES = [ 
   { type: 'palm', name: 'Palma', model: 'apa_mp_h_acc_plant_palm_01', growTime: 3 },
   { type: 'marijuana', name: 'Kanabis', model: 'prop_weed_01', growTime: 5 },
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
   this.alreadyExist = data.alreadyExist || false;

   let pos, plantName = PLANT_TYPES[data.type].name, plantModel = PLANT_TYPES[data.type].model;
   if (this.alreadyExist == true) { 
      pos = new mp.Vector3(data.position.x, data.position.y, data.position.z);
   } else { 
      pos = new mp.Vector3(data.position.x, data.position.y, data.position.z - 2.2);
   }
   
   this.object = mp.objects.new(plantModel, pos, { alpha: 255, dimension: data.dimension });
   this.label = mp.labels.new(plantName, new mp.Vector3(pos.x, pos.y, pos.z + 0.5), { los: false, font: 0, drawDistance: 3 })

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
      this.label.text = plantName + ' '  + progress.toFixed(2) + ' / ' + plantGrow;

      if (progress < plantGrow) { 
         let pos = new mp.Vector3(this.object.position.x, this.object.position.y, this.object.position.z)
         this.object.position = new mp.Vector3(pos.x, pos.y, pos.z + 0.005)
         this.label.position = new mp.Vector3(pos.x, pos.y, pos.z + 0.010);
      } else return false;
   }

}

var plants = {

   load: async () => { 
      let result = await db.aQuery("SELECT * FROM `plants`");
      result.forEach(function (res) {
         let psJS = JSON.parse(res.position),
         position = new mp.Vector3(psJS.x, psJS.y, psJS.z)
         let p = new Plant({
            id: res.ID,
            type: res.type,
            owner: res.databaseID,
            position: position,
            dimension: res.dimension,
            contribution: res.contribution,
            alreadyExist: true
         });
      });
      core.terminal(3, `${result.length} lpants were loaded !`);
   },

   save: (plant) => { 
      let pos = JSON.stringify(plant.object.position);
      var values = {
            position: pos,
            progress: plant.progress,
      };
      db.query("UPDATE `plants` SET ? WHERE id = ?", [values, plant.id], function (error, results, fields) {
         if (error) return core.terminal(1, `Saving Plant ${error}`);
      });
   },

   check: () => { 
      mp.plants.forEach(plant => {
         plant.progress ++;
         plant.refresh();
         setTimeout(() => { plants.save(plant); }, 500);  
      });

      setTimeout(plants.check, plantsTimer * 1000);
   },

   create: (player, data) => { 
      let position = JSON.stringify(player.position),
         plant = PLANT_TYPES[data.type],
         contribution = core.randomInRange(10, 50);
      db.query("INSERT INTO `plants` (type, owner, position, contribution, dimension) VALUES (?, ?, ?, ?, ?)", [data.type, player.databaseID, position, contribution, player.dimension], function (error, results, fields) {
         if (error) return core.terminal(1, error);
         account.notification(player, `Stabljika kreirana, tip ${plant.name}.`, NOTIFY_SUCCESS, 4);
         let id = results.insertId; 
         let p = new Plant({
            id: id,
            type: data.type,
            owner: player.databaseID,
            position: player.position,
            dimension: player.dimension,
            contribution: contribution
         });
     });
   },

   delete: (player, plant) => { 
      db.query("DELETE FROM `plants` WHERE `ID` = ?", [plant.id], function (error, results, fields) {
         if (error) return core.terminal(1, error);
         plant.delete();
     });
   },

}

module.exports = plants;

plants.check()
plants.load()