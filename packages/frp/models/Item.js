
'use strict';

const { DataTypes } = require('sequelize');
const { ItemType, ItemEntities, ItemRegistry } = require('../classes/Items');


/**
* Item Model / Items Class - Array
* @model
* @function constructor
* @return {Function} Enter functions.
* @memberof Items
*/

frp.Items = frp.Database.define('Item', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Item: { type: DataTypes.STRING },
      Quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
      Entity: { type: DataTypes.INTEGER, defaultValue: -1 },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Position: { type: DataTypes.TEXT, defaultValue: null },
      Rotation: { type: DataTypes.TEXT, defaultValue: null },
      isWeapon: { type: DataTypes.TEXT, defaultValue: false },
      Ammo: { type: DataTypes.INTEGER, }
   },

   {
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date",
   }
);



frp.Items.HasItem = async function (player, item) { 
   let Character = await player.Character();
   let Item = await frp.Items.findOne({ where: { Owner: Character.id, Item: item } });
   return Item == null ? false : true;
};


frp.Items.Inventory = async function (player) { 
   let Character = await player.Character();
   const Inventory = [];
   
   let Items = await frp.Items.findAll({ where: { Owner: Character.id }});
   
};

/**
* Refresh the Item, creating object if needed
* @instance
* @function refresh
* @return {Function} Enter functions.
* @memberof Items
*/

frp.Items.prototype.Refresh = function () { 
   if (this.Entity == ItemEntities.Ground) { 

      const position = JSON.parse(this.Position);
      const rotation = JSON.parse(this.Rotation);

      this.object = mp.objects.new(ItemRegistry[this.Item].hash, new mp.Vector3(position.x, position.y, position.z), {
         rotation: new mp.Vector3(rotation.x, rotation.y, rotation.z),
         alpha: 255,
         dimension: this.Dimension
      });

      this.object.item = this.id;
      this.object.notifyStreaming = true;
   } else { 
      if (this.object) { 
         this.object.destroy();
      }
   }
};

/**
* Deleting instance of Item 
* @instance
* @function delete
* @return {Function} Enter functions.
* @memberof Items
*/


frp.Items.prototype.delete = async function () { 
   this.object.destroy();
   await this.destroy();
};



/**
* Loading All Items
* @method
* @function load
* @return {Function} Enter functions.
* @memberof Items
*/

(async () => { 
   frp.Items.sync();

   let Items = await frp.Items.findAll();
   Items.forEach((Item) => { 
      Item.Refresh();
   });
})();


/**
* Creating instance of Item
* @method
* @function create
* @return {Function} Enter functions.
* @memberof Items
*/

frp.Items.create = async function (player, name, quantity, entity, owner) { 
   const Item = await frp.Items.create({ Item: name, Quantity: quantity, Entity: entity, Owner: owner  });
   Item.Refresh();
};

