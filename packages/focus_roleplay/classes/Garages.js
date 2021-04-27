mp.garages = {};

class Garage {
   constructor(id, data) {
      this.id = id;
      this.owner = data.owner || -1;
      this.house = data.house || -1;
      this.type = data.type || 0;
      this.vehicles = data.vehicles || []

      mp.garages[this.id] = this;
   }
}

class Garages {
   create = (type) => {
      db.query("INSERT INTO `garages` (type) VALUES (?)", 
         [type], function (error, results, fields) {
         if (error) return core.terminal(1, 'Garage Creating Error ' + error);
      });
   }

   delete = (id) => {

   }
}

   
