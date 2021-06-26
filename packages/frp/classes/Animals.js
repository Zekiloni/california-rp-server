


const Zone = {
   
}

class Animals {
   static All = [];

   constructor (model, position) { 
      this.model = model;
      this.position = new mp.Vector3(position.x, position.y, position.z);

      Animals.All.push(this);
   }

   static New (model, position) { 
      new Animals(model, position);
   };
}

