

const { DataTypes } = require('sequelize');

const HouseTypes = require('../data/Houses.json')

frp.Houses = frp.Database.define('house', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Type: { type: DataTypes.STRING },
      Price: { type: DataTypes.STRING },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
      Position: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Position')); },
         set: function (value) { this.setDataValue('Position', JSON.stringify(value)); }
      },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      Interior_Position: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Interior_Position')); },
         set: function (value) { this.setDataValue('Interior_Position', JSON.stringify(value)); }
      },
      Interior_Dimension: { type: DataTypes.INTEGER, defaultValue: this.id },
      IPL: { type: DataTypes.STRING },
      Rent: { type: DataTypes.INTEGER, defaultValue: 0 },
      Tenants: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Tenants')); },
         set: function (value) { this.setDataValue('Tenants', JSON.stringify(value)); }
      },
      Money: { type: DataTypes.INTEGER, defaultValue: 0 },
      On_Sale: { type: DataTypes.INTEGER, defaultValue: 0 },
      GameObject: { 
         type: DataTypes.VIRTUAL, defaultValue: null,
         get () { return frp.GameObjects.Houses[this.getDataValue('id')]; },
         set (x) { frp.GameObjects.Houses[this.getDataValue('id')] = x; }
      }
   }, {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date',
   }
);


frp.Houses.afterCreate(async (House, Options) => {
   House.Refresh();
});


frp.Houses.afterDestroy(async (House, Options) => {
   if (House.GameObject) {
      House.GameObject.colshape.destroy();
      House.GameObject.blip.destroy();
      House.GameObject.marker.destroy();
   }
});


frp.Houses.prototype.Refresh = function () {

   if (this.GameObject == null) { 
      const GameObjects = { 
         colshape: mp.colshapes.newRectangle(this.Position.x, this.Position.y, 2.5, 2.0, this.Dimension),
         blip: mp.blips.new(Sprite, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
         marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 2.5, {
            color: frp.Globals.MarkerColors.Houses, 
            rotation: new mp.Vector3(0, 0, 90), 
            visible: true, 
            dimension: this.Dimension
         })
      };


      GameObjects.colshape.OnPlayerEnter = (player) => { 
         const Price = frp.Main.Dollars(this.Price);
         const ForSale = this.Owner == 0 ? 'Na prodaju !' : 'Biznis u vlasništvu';
         const Locked = this.Locked ? 'Zatvoren' : 'Otvoren';

         const white = frp.Globals.Colors.whitesmoke;

         player.SendMessage('[House] !{' + white + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', frp.Globals.Colors.property);
         player.SendMessage('[House] !{' + white + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', frp.Globals.Colors.property);
         player.SendMessage((this.Walk_in ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy house' : ''), frp.Globals.Colors.whitesmoke);
      };

      this.GameObject = GameObjects;
   }
};


frp.Houses.prototype.Refresh = function () {
   this.Owner == 0 ? (this.blip.color = 1) : (this.blip.color = 2);
   this.Owner == 0 ? (this.blip.name = 'Kuca na prodaju !') : (this.blip.name = 'Kuca');
};

frp.Houses.New = async function (player, type, price) { 
   const Position = player.position;
   const House = await frp.Houses.create({ Type: type, Price: price, Position: Position });
   House.Init();
;};


(async () => {

   frp.Houses.sync();

   const Houses = await frp.Houses.findAll();
   Houses.forEach((House) => {
      House.Refresh();
   });

   frp.Main.Terminal(3, Houses.length + ' Houses Loaded !');
})();
