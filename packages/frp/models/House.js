

const { DataTypes } = require('sequelize');

const HouseTypes = require('../data/Houses.json');

module.exports = { HouseTypes };

frp.Houses = frp.Database.define('house', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Type: { type: DataTypes.STRING, defaultValue: 0 },
      Price: { type: DataTypes.INTEGER },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
      Position: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { 
            const Position = JSON.parse(this.getDataValue('Position'))
            return new mp.Vector3(Position.x, Position.y, Position.z); 
         },
         set: function (value) { this.setDataValue('Position', JSON.stringify(value)); }
      },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      Interior_Position: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { 
            const Position = JSON.parse(this.getDataValue('Interior_Position'))
            return new mp.Vector3(Position.x, Position.y, Position.z); 
         },
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
      updatedAt: 'Update_Date'
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
         colshape: mp.colshapes.newSphere(this.Position.x, this.Position.y, this.Position.z, 1.8, this.Dimension),
         blip: mp.blips.new(40, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: 'House', color: 59, shortRange: true, scale: 0.75, drawDistance: 25 }),
         marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
            color: frp.Globals.MarkerColors.Houses, 
            rotation: new mp.Vector3(0, 0, 90), 
            visible: true, 
            dimension: this.Dimension
         })
      };


      GameObjects.colshape.OnPlayerEnter = (player) => { 

         const white = frp.Globals.Colors.whitesmoke;

         player.SendMessage('[House] !{' + white + '} Kucaraaa ', frp.Globals.Colors.property);
      };

      this.GameObject = GameObjects;
   } else { 
      const BlipColor = this.Owner == 0 ? 49 : 52;   
      this.GameObject.blip.color = BlipColor;
   }
};


frp.Houses.prototype.Buy = async function (Player) { 

   if (this.Owner != 0) return Player.Notification(frp.Globals.messages.HOUSE_ALREADY_OWNER, frp.Globals.Notification.Error, 5);

   const Character = await Player.Character();
   const Houses = await Player.Properties().Houses;


   if (Houses.length == Character.Max_Houses) return; // PORUKA: Imate maksimalno kuca;
   if (this.Price > Character.Money) return Player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 5);

   Character.GiveMoney(Player, -this.Price);
   Player.Notification(frp.Globals.messages.SUCCCESSFULLY_BUYED_HOUSE, frp.Globals.Notification.Succes, 7);

   this.Owner = Character.id;

   await this.save();
};


frp.Houses.prototype.Lock = async function (Player) { 

   if (this.Owner != Player.character) return Player.Notificationn(frp.Globals.messages.YOU_DONT_HAVE_HOUSE_KEYS, frp.Globals.Notification.Error, 5);
   if (!this.Tenants.includes(Player.character)) return Player.Notificationn(frp.Globals.messages.YOU_DONT_HAVE_HOUSE_KEYS, frp.Globals.Notification.Error, 5);
   
   this.Locked = !this.Locked;
   await this.save();
};


frp.Houses.Create = async function (Player, Type, Price) { 

   if (HouseTypes[Type] == undefined) return Player.Notification(frp.Globals.messages.TYPES_ARE_IN_RANGE + '0 - ' + HouseTypes.length + '.', frp.Globals.Notification.Error, 5);

   Type = HouseTypes[Type];

   const Position = Player.position;

   frp.Houses.create({ 
      Type: Type.id, 
      Price: Price,
      Position: Position,
      Dimension: Player.dimension,
      Interior_Position: Type.Position,
      IPL: Type.IPL ? Type.IPL : null,
   });


;};



(async () => {

   await frp.Houses.sync();

   const Houses = await frp.Houses.findAll();
   Houses.forEach((House) => {
      House.Refresh();
   });

   frp.Main.Terminal(3, Houses.length + ' Houses Loaded !');
})();
