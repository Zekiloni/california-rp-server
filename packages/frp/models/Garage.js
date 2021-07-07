const { DataTypes } = require('sequelize');

const GarageTypes = require('../data/Garages.json')

frp.Garages = frp.Database.define('garage', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Type: { type: DataTypes.INTEGER, defaultValue: 0 }, // 0 - Mala | 1 - Srednja | 2 - Velika | Mala max 1 vozilo, Srednja max 2 vozila, Velika max 4 vozila
      Price: { type: DataTypes.STRING },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
      Entrance: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Entrance')); },
         set: function (value) { this.setDataValue('Entrance', JSON.stringify(value)); }
      },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      Interior_Dimension: { type: DataTypes.INTEGER, defaultValue: this.id },
      Vehicles: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Vehicles')); },
         set: function (value) { this.setDataValue('Vehicles', JSON.stringify(value)); } // SQL IDEVI VOZILA
      },
      GameObject: { 
         type: DataTypes.VIRTUAL, defaultValue: null,
         get () { return frp.GameObjects.Garages[this.getDataValue('id')]; },
         set (x) { frp.GameObjects.Garages[this.getDataValue('id')] = x; }
      }
   }, {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date',
   }
);


frp.Garages.afterCreate(async (Garage, Options) => {
   Garages.Refresh();
});


frp.Garages.afterDestroy(async (Garage, Options) => {
   if (Garages.GameObject) {
      Garages.GameObject.colshape.destroy();
      Garages.GameObject.blip.destroy();
      Garages.GameObject.marker.destroy(); 
   }
});

/* frp.Items.prototype.Delete = async function () {
   this.object.destroy();
   await this.destroy();
}; */

frp.Garages.prototype.Refresh = function () {

   if (this.GameObject == null) { 
      const GameObjects = { 
         colshape: mp.colshapes.newSphere(this.Position.x, this.Position.y, this.Position.z, 3, this.Dimension),
         blip: mp.blips.new(50, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
         marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 2.5, {
            color: frp.Globals.MarkerColors.Garages, 
            rotation: new mp.Vector3(0, 0, 90), 
            visible: true, 
            dimension: this.Dimension
         })
      };


      GameObjects.colshape.OnPlayerEnter = (player) => { 
         const Price = frp.Main.Dollars(this.Price);
         const ForSale = this.Owner == 0 ? 'Na prodaju !' : 'Garaža je u privatnom vlasništvu';
         const Locked = this.Locked ? 'Zatvorena' : 'Otvorena';

         if (player.vehicle) {
            if (this.Owner == player.character) {
               // Park vehicle function
            } else {
               player.SendMessage('Garaža nije u tvom vlasništvu.'); 
            }
         }
         else {
            if (!this.Locked) {
               // PlayerEnterGarage(plazer)
            } else {
               player.Notification(frp.Globals.messages.IS_LOCKED, frp.Globals.Notification.Error, 4);
            }
         }
         //const white = frp.Globals.Colors.whitesmoke;

         /* player.SendMessage('[House] !{' + white + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', frp.Globals.Colors.property);
         player.SendMessage('[House] !{' + white + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', frp.Globals.Colors.property);
         player.SendMessage((this.Walk_in ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy house' : ''), frp.Globals.Colors.whitesmoke); */
      };

      this.GameObject = GameObjects;
   }
};

frp.Garages.prototype.Refresh = function () {
   this.Owner == 0 ? (this.blip.color = 1) : (this.blip.color = 2);
   this.Owner == 0 ? (this.blip.name = 'Garaža je na prodaju !') : (this.blip.name = 'Garaza');
};

frp.Garages.New = async function (player, type, price) { 
   const Garage = await frp.Garages.create({ Type: type, Price: price, Position: player.position });
   Garage.Init();
};

frp.Garages.prototype.ParkVehicle = async function(vehicle) { // OVDE NASTAVITI
   let ParkedVehicles = [];
   // Pushati vozilo (vehicle) u this.Vehicle
   this.Vehicles = 0;
};

(async () => {

   await frp.Garages.sync();

   const Garages = await frp.Garages.findAll();
   Garages.forEach((Garage) => {
      Garage.Refresh();
   });

   frp.Main.Terminal(3, Garage.length + ' Garages Loaded !');
})();