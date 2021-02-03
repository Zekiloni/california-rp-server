
module.exports = class houseModel { 
     constructor(houseID, houseName, houseType, houseOwner, housePrice, houseDimension, housePos, houseBlip, houseLabel) {
         this.id = houseID;
         this.type = houseType || 2; // 0 - Mala kuca 1 - Srednja 2 - Velika kuca 3 - Vila
         this.owner = houseOwner || -1;
         this.price = housePrice || -1;
         this.dimension = houseDimension || 0;
         this.position = housePos || 0;
         this.blip = houseBlip || 0;
         this.label = houseLabel || 0;
 
         let pos = new mp.Vector3(this.position.x, this.position.y, this.position.z);
         if (houseOwner == -1) {       
             this.label = mp.labels.new('~w~Kuca je na prodaju.', pos,
             {
                 los: false,
                 font: 0,
                 drawDistance: 3
             });
             this.blip = mp.blips.new(40, pos,
             {
               name: houseName,
               color: 52, 
               shortRange: true,
             });
         }
         else {
          this.label = mp.labels.new('~m~Kuca u necijem vlasnistvu.', pos,
          {
               los: false,
               font: 0,
               drawDistance: 3
          });
          this.blip = mp.blips.new(40, pos,
          {
               name: houseName,
               color: 49, 
               shortRange: true,
          });
        }
        allHouses.push(this);
    }
    info () {
        return this;
    }
}
 
 