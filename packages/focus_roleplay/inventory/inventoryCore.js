
var itemModel = require('./itemModel');

global.items = require('./itemList')
global.inventoryItems = [];

module.exports = { 
    loadItems: async function() { 
        var result = await db.aQuery("SELECT * FROM `inventory`");
        result.forEach(function (res) {
            let itemPos = JSON.parse(res.itemPos);
            let itemSpecs = JSON.parse(res.itemSpecs);

            let item = new itemModel(
                res.ID, res.itemName,
                res.itemType, res.itemHash,
                res.itemWeight, res.itemQuantity,
                res.itemEntity, res.itemOwner,
                res.itemDimension, itemPos, itemSpecs,
                0, 0
            )
        });
        core.terminal(3, `${result.length} items were loaded !`);
    },
   
    create: function(name, type, hash, weight, quant = 1, entity, owner, dimension, pos, specs = 0) { 
        db.query("INSERT INTO `inventory` (itemName, itemType, itemHash, itemWeight, itemQuantity, itemEntity, itemOwner, itemDimension, itemPos, itemSpecs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, type, hash, weight, quant, entity, owner, dimension, JSON.stringify(pos), specs], function (error, res, fields) {
            if (error) return core.terminal(1, error);
            let id = res.insertId;
            var posArr = {x: pos.x, y: pos.y, z: pos.z};
            let item = new itemModel(id, name, type, hash, weight, quant, entity, owner, dimension, posArr)
            console.log(item.info())
        });
    },

    playerInventory: function(player) { 
        let id = player.databaseID;
        let playerInv = [];
        inventoryItems.forEach(function (r) {
            if(r.owner == id) {
                playerInv.push(r)
            }
        })
        return playerInv;
    }


}
