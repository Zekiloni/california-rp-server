'use strict';

const { DataTypes } = require('sequelize');
const { ItemType, ItemEntities, ItemRegistry } = require('../classes/Items.Registry');


frp.Items = frp.Database.define('item', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Item: { type: DataTypes.STRING },
      Quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
      Entity: { type: DataTypes.INTEGER, defaultValue: -1 },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
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
      },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      GameObject: { 
         type: DataTypes.VIRTUAL,
         get () { 
            return frp.GameObjects.Items[this.getDataValue('id')];
         },
         set (x) { 
            frp.GameObjects.Items[this.getDataValue('id')] = x;
         },
         
      }
   }, 
   {
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date",
   }
);


frp.Items.New = async function (item, quantity, entity, owner, position = null, rotation = null, dimension = 0) {
   const Item = await frp.Items.create({ Item: item, Quantity: quantity, Entity: entity, Owner: owner, Position: position, Rotation: rotation, Dimension: dimension });
   await Item.Refresh();
};


frp.Items.Inventory = async function (player) {
   let Inventory = [];
   const Items = await frp.Items.findAll({ where: { Owner: player.character } });
   Items.forEach((Item) => {
      Inventory.push({ id: Item.id, name: Item.Item, quantity: Item.Quantity, entity: Item.Entity, ammo: Item.Ammo, weight: ItemRegistry[Item.Item].weight, hash: ItemRegistry[Item.Item].hash });
   });
   return Inventory;
};


frp.Items.HasItem = async function (character, item) {
   const Item = await frp.Items.findOne({ where: { Owner: character, Item: item } });
   return Item == null ? false : Item;
};


frp.Items.prototype.Refresh = function () {
   if (this.Entity == ItemEntities.Ground) {

      const Position = new mp.Vector3(this.Position.x, this.Position.y, this.Position.z);
      const Rotation = new mp.Vector3(this.Rotation.x, this.Rotation.y, this.Rotation.z);

      this.GameObject = mp.objects.new(ItemRegistry[this.Item].hash, Position, {
         rotation: Rotation,
         alpha: 255,
         dimension: this.Dimension
      });

      this.GameObject.Item = this.id;

   } else {
      if (this.GameObject) {
         this.GameObject.destroy();
      }
   }
};


frp.Items.prototype.Delete = async function () {
   this.object.destroy();
   await this.destroy();
};


frp.Items.prototype.Drop = async function (player, place, quantity = 1) {
   const Position = JSON.parse(place);
   if (this.Quantity == quantity) {
      this.Entity = ItemEntities.Ground;
      this.Position = Position.position;
      this.Rotation = Position.rotation;
      this.Dimension = player.dimension;
      this.Refresh();
   } else {
      this.increment('Quantity', { by: -quantity });
      frp.Items.New(this.Item, quantity, ItemEntities.Ground, 0, Position.position, Position.rotation, player.dimension);
   }
   // PORUKA: Bacio taj i taj predmet

   this.Last_Owner = player.character;

   await this.save();
   return frp.Items.Inventory(player);
};


frp.Items.prototype.Pickup = async function (player) {
   // PROKS PORUKA: Podigao taj i taj predmet /me
   this.Entity = ItemEntities.Player;
   this.Owner = player.character;
   this.Refresh();
   await this.save();
};


frp.Items.prototype.Give = async function (player, target, quantity) {
   if (player.dist(target.position) > 3.5) return; // PORUKA: Taj igrac se ne nalazi u vasoj blizini

   const Has = await frp.Items.HasItem(target.character, this.Item);

   console.log(this.Quantity + ' je kolicina itema, data kolicina je ' + quantity);
   if (this.Quantity == quantity) {
      this.Owner = target.character;
      await this.save();
      console.log('Item prepisan igracu.');
   } else {
      console.log('Nije data cela kolicina predmeta');
      this.increment('Quantity', { by: -quantity });
      console.log('Oduzeta je kolicina predmeta koju je igrac imao');
      if (Has && ItemRegistry[Has.Item].type != ItemType.Weapon) {
         console.log('Meta je imala vec predmet dodata je kolicina');
         Has.increment('Quantity', { by: quantity });
      } else {
         console.log('Meta nije imala predmet, napravljen joj je');
         frp.Items.New(this.Item, quantity, ItemEntities.Player, target.character);
      }
   }

   player.ProximityMessage(frp.Globals.distances.me, `* ${player.name} daje ${this.Item} ${target.name}. (( Give ))`, frp.Globals.Colors.purple);

   return frp.Items.Inventory(player);
};


frp.Items.Near = async function (player) {
   return new Promise((resolve, reject) => { 
      const Position = player.position;
      mp.objects.forEachInRange(Position, 3.0, async (object) => {
         if (object.dimension == player.dimension) {
            if (object.Item) {
               let Nearby = await frp.Items.findOne({ where: { id: object.Item }});
               if (Nearby) { 
                  resolve(Nearby);
               } else { 
                  reject(false);
               }
            }
         }
      });
   })   
};


frp.Items.prototype.Use = async function (player) {
   const Type = ItemRegistry[this.Item].type;
   if (Type == ItemType.Weapon) {
      this.Entity = ItemEntities.Wheel;
      ItemRegistry[this.Item].use(player, this.Ammo);
      await this.save();
   } else {
      const Used = await this.increment('Quantity', { by: -1 });
      console.log(Used)
      ItemRegistry[this.Item].use(player);
      // if quantity == 0 destroy item
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


