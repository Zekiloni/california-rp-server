'use strict';

const { DataTypes } = require('sequelize');
const { ItemType, ItemEntities, ItemRegistry } = require('../classes/Items.Registry');


frp.Items = frp.Database.define('Item', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Item: { type: DataTypes.STRING },
      Quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
      Entity: { type: DataTypes.INTEGER, defaultValue: -1 },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      isWeapon: { type: DataTypes.TEXT, defaultValue: false },
      Ammo: { type: DataTypes.INTEGER, defaultValue: 0 },
      Last_Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
      Position: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Position')); },
         set: function (value) { this.setDataValue('Position', JSON.stringify(value)); }
      },
      Rotation: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Rotation')); },
         set: function (value) { this.setDataValue('Rotation', JSON.stringify(value)); }
      }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date",
   }
);


frp.Items.New = async function (item, quantity, entity, owner, position = null, rotation = null, dimension = 0) {
   const Item = await frp.Items.create({ Item: item, Quantity: quantity, Entity: entity, Owner: owner, Position: position, Rotation: rotation });
   Item.Refresh();
};


frp.Items.Inventory = async function (player) {
   let Inventory = [];
   let Items = await frp.Items.findAll({ where: { Owner: player.character } });
   Items.forEach((Item) => {
      Inventory.push(Item);
   });
   return Inventory;
};


frp.Items.HasItem = async function (player, item) {
   let Item = await frp.Items.findOne({ where: { Owner: player.character, Item: item } });
   return Item == null ? false : Item;
};


frp.Items.prototype.Refresh = function () {
   if (this.Entity == ItemEntities.Ground) {
      const Position = this.Position;
      const Rotation = this.Rotation;
      this.object = mp.objects.new(ItemRegistry[this.Item].hash, new mp.Vector3(Position.x, Position.y, Position.z), {
         rotation: new mp.Vector3(Rotation.x, Rotation.y, Rotation.z),
         alpha: 255,
         dimension: this.Dimension
      });
      this.object.Item = this.id;
      this.object.notifyStreaming = true;
   } else {
      if (this.object) {
         this.object.destroy();
      }
   }
};


frp.Items.prototype.Delete = async function () {
   this.object.destroy();
   await this.destroy();
};


frp.Items.prototype.Drop = async function (player, quantity = 1, place) {
   const Position = JSON.parse(place);
   if (this.Quantity == quantity) {
      this.Entity = ItemEntities.Ground;
      this.Position = Position.position;
      this.Rotation = Position.rotation;
      this.Dimension = player.dimension;
      this.Refresh();
   } else {
      this.Quantity -= Quantity;
      frp.Items.New(this.Item, quantity, ItemEntities.Ground, 0, Position.position, Position.rotation, player.dimension);
   }
   // PORUKA: Bacio taj i taj predmet
   await this.save();
};


frp.Items.prototype.Pickup = async function (player) {
   // PROKS PORUKA: Podigao taj i taj predmet /me
   this.Entity = ItemEntities.Player;
   this.Owner = player.character;
   this.Refresh();
   await this.save();
};


frp.Items.prototype.Give = async function (player, target, quantity) {
   if (player.dist(target.position) < 2.5) return; // PORUKA: Taj igrac se ne nalazi u vasoj blizini
   let Has = await frp.Items.HasItem(target, this.Item);

   if (this.Quantity == quantity) {
      this.Owner = target.character;
   } else {
      this.Quantity -= Quantity;
      if (Has) {
         Has.Quantity += quantity;
      } else {
         frp.Items.New(this.Item, quantity, ItemEntities.Player, target.character);
      }
   }

   // PORUKA: Taj igrac je dao taj predmet tom i tom
   await this.save();
};


frp.Items.Near = async function (player) {
   const Position = player.position;
   mp.objects.forEachInRange(Position, 3.0, async (Object) => {
      if (Object.Dimension == player.dimension) {
         if (Object.Item) {
            let Near = await frp.Items.findOne({ where: { id: object.Item } });
            return Near;
         }
      }
   });
};


frp.Items.prototype.Use = async function (player) {
   const Type = ItemRegistry[this.Item].type;
   if (Type == ItemType.Ammo) {
      // giive ammo current weapo
   }
};


frp.Items.Clear = async function (player) {
   let Character = await player.Character();
   const Items = await frp.Items.findAll({ where: { Owner: Character.id } });

   Items.forEach(async (Item) => {
      await Item.destroy();
   });
};


frp.Items.Weight = async function (player) {
   const Inventory = await frp.Items.Inventory(player);
   let Weight = 0;
   
   Inventory.forEach((Item) => {
      Weight += ItemRegistry[Item.Item].weight;
   });

   return Weight;
};


(async () => {

   frp.Items.sync();

   const Items = await frp.Items.findAll();
   Items.forEach((Item) => {
      Item.Refresh();
   });

   frp.Main.Terminal(3, Items.length + ' Items Loaded !');
})();
