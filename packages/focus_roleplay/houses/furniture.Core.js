

function Furniture (data) { 
   this.id = data.id;
   this.model = data.model;
   this.object = data.object;
   this.position = data.position;
   this.rotation = data.rotation;

   mp.furniture.push(this)

   this.delete = () => {
      this.object.destroy()
      let x = mp.furniture.indexOf(this);
      mp.furniture.splice(x, 1)
   }
}

var furniture = { 

}

module.exports = furniture;