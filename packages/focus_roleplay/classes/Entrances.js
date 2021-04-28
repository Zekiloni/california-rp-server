


let entrances = {};

class Entrance {
   constructor (name, position, dimension, interior, blip, color) {
      this.name = name;
      this.position = new mp.Vector3(position.x, position.y, position.z);
      this.interior = new mp.Vector3(interior.x, interior.y, interior.z);
      this.dimension = dimension;
      this.colshape = mp.colshapes.newRectangle(this.position.x, this.position.y, 3, 2, 0);
      this.colshape.entrance = this.name;

      if (blip)  {
         let blip_position = new mp.Vector3(this.position.x, this.position.y, 0.0)
         this.blip = mp.blips.new(blip, blip_position, {
               name: this.name,
               color: color || 0,
               alpha: 255,
               shortRange: true,
               dimension: this.dimension,
               radius: 255.0,
         });
      }

      entrances[this.name] = this;
   }
}

mp.events.add({
   'playerEnterColshape': (player, shape) => { 
      if (player.vehicle) return;
      if (shape.entrance) { 
         let entrance = entrances[shape.entrance];
         if (entrance) { player.near = { type: 'entrance', id: entrance.name }; }
      }
   },

   'playerExitColshape': (player, shape) => {
      if (player.near) { 
         if (shape.entrance) { player.near = null; }   
      }
   }
})


// model ulaza 
// new Entrance('Departman Motornih Vozila', { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 0, 0, 0);