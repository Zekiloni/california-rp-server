mp.garages = {};

class Garage {
   constructor(id, data) {
      this.id = id;
      this.entrance = data.entrance;
      this.type = data.type;
      this.owner = data.owner || -1;
      this.house = data.house || -1;
      this.vehicles = data.vehicles || [];

      this.colShape = mp.colshapes.newRectangle(entrance.x, entrance.y, 3, 3, 0);

      if (this.house == -1) {
         
      }

      mp.garages[this.id] = this;
   }
}

class Garages {
   create = (player, type) => {
      db.query("INSERT INTO `garages` (entrance, type) VALUES (?, ?)", [JSON.stringify(player.position), type], function (error, results, fields) {
         if (error) return core.terminal(1, 'Garage Creating Error ' + error);
      });
   }

   delete = (id) => {

   }
}

   
