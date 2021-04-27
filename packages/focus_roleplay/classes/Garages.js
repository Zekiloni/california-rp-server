mp.garages = {};

class Garages {
   constructor(id, data) {
      this.id = id;
      this.owner = data.owner || -1;
      this.house = data.house || -1;
      this.type = data.type || 0;

      mp.garages[this.id] = this;
   }
}