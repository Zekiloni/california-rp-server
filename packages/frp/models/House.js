

const { DataTypes } = require('sequelize');

frp.Houses = frp.Database.define('House', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Type: { type: DataTypes.STRING },
      Price: { type: DataTypes.STRING },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
      Position: { type: DataTypes.TEXT, defaultValue: '{ "x" : 0, "y" : 0, "z" : 0 }' },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      Interior_Position: { type: DataTypes.TEXT },
      Interior_Dimension: { type: DataTypes.INTEGER, defaultValue: this.id },
      IPL: { type: DataTypes.STRING },
      Rent: { type: DataTypes.INTEGER, defaultValue: 0 },
      Tenants: { type: DataTypes.TEXT, defaultValue: '[]' },
      Money: { type: DataTypes.INTEGER, defaultValue: 0 },
      Sale: { type: DataTypes.INTEGER, defaultValue: 0 }

   },

   {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date",
   }
   
);


frp.Houses.prototype.init = function () { 
   if (this.colshape && this.blip) return;
   let Position = JSON.parse(this.Position);

   this.colshape = mp.colshapes.newRectangle(Position.x, Position.y, 3, 2, 0);
   this.colshape.house = this.id;
   this.blip = mp.blips.new(40, new mp.Vector3(Position.x, Position.y, Position.z), { dimension: this.Dimension, name: 'Kuca', color: 36, shortRange: true });

   this.refresh();
};

frp.Houses.prototype.refresh = function () { 
   this.Owner == 0 ? ( this.blip.color = 1 ) : ( this.blip.color = 2 );
   this.Owner == 0 ? ( this.blip.name = 'Kuca na prodaju !' ) : ( this.blip.name = 'Kuca' );
};


(async () => {

   frp.Houses.sync()

   let houses = await frp.Houses.findAll();
   houses.forEach((house) => { 
      house.init();
      //console.log(house)
   });
   
   frp.Main.Terminal(3, houses.length + ' Houses Loaded !')

})();

