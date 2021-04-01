const houses = require("../houses/houses.Core");

const HOUSE_TYPES = [ 
   // Rockstar interiors
   { type: 0, name: 'Low End Apartment', position: [261.4586, -998.8196, -99.00863] }, 
   { type: 1, name: 'Medium End Apartment', position: [347.2686, -999.2955, -99.19622] },
   { type: 2, name: 'High End Apartment', position: [347.2686, -999.2955, -99.19622] },
   // Custom interiors
];

mp.houses = {};

class Houses {
   constructor(h) {
        this.id = h.id;
        this.type = h.type || 0;
        this.owner = h.owner || -1;
        this.price = h.price || -1;
        this.dimension = h.dimension || 0;
        this.entrance = h.entrance || 0;
        this.interior = h.interior || 0;
        this.ipl = h.ipl;

        mp.houses[this.id] = this;

        this.delete = () => {
         let x = mp.houses.indexOf(this)
         mp.houses.splice(x, 1)
         this.blip.destroy();
         this.marker.destroy();
     }

     load = async () => { 
      let result = await db.aQuery("SELECT * FROM `houses`");
      result.forEach(function (res) {
          let entrance = JSON.parse(res.entrance),
              interior = JSON.parse(res.interior);
          let house = new Houses({ 
              id: res.ID,
              type: parseInt(res.type),
              owner: res.owner,
              price: res.price,
              dimension: res.dimension,
              entrance: entrance,
              interior: interior,
              ipl: res.ipl
          });
      });
      core.terminal(3, `${result.length} houses were loaded !`);

            create = (player, data) => { 
            let entrance = JSON.stringify(player.position), interior = HOUSE_TYPES[data.type];
            let intPos = JSON.stringify({x: interior.position[0], y: interior.position[1], z: interior.position[2]})
            db.query("INSERT INTO `houses` (type, price, entrance, interior, ipl) VALUES (?, ?, ?, ?, ?)", [data.type, data.price, entrance, intPos, interior.ipl], function (error, results, fields) {
               if (error) return core.terminal(1, error);
               player.notification(`Kuca kreirana tip ${interior.name} sa cenom ${data.price}$.`, NOTIFY_SUCCESS, 4);
               let id = results.insertId; 
               let h = new Houses({ id: id, price: data.price, type: data.type, entrance: player.position, interior: interior.position, ipl: interior.ipl })
               h.refresh();
            });
            remove = (house) => { 
               db.query("DELETE FROM `houses` WHERE `ID` = ?", [house.id], function (error, results, fields) {
                  if (error) return core.terminal(1, error);
                  Houses.delete();
               });
            } 
            near = (player) => { 
               let result = null;
               mp.houses.forEach(house => {
                  player.dist(house.marker.position) < 2.5 ? ( result = house ) : ( result = false )
               });
            return result;
            }
         }
      }
   }
}