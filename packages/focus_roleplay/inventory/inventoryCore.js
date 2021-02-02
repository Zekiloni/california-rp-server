
var itemModel = require('./itemModel');

global.items = require('./itemList');
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
   
    createItem: function(name, type, hash, weight, quant = 1, entity, owner, dimension, pos, specs = 0) { 
        db.query("INSERT INTO `inventory` (itemName, itemType, itemHash, itemQuantity, itemEntity, itemOwner, itemDimension, itemPos, itemSpecs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, type, hash, weight, quant, entity, owner, dimension, JSON.stringify(pos), specs], function (error, res, fields) {
            if (error) return core.terminal(1, error);
            let id = res.insertId;
            var posArr = {x: pos.x, y: pos.y, z: pos.z};
            let item = new itemModel(id, name, type, hash, weight, quant, entity, owner, dimension, posArr)
            console.log(item.info())
        });
    },

    destroyItem: function(player, item) { 
        let itemID = item.id;
        db.query("DELETE FROM `inventory` WHERE `ID` = ?", [itemID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let index = inventoryItems.findIndex((el) => el.id === itemID);
            inventoryItems.splice(index, 1);
            item.label.destroy();
            item.object.destroy();
        });
    },

    deleteItem: function(itemID) { 
        db.query("DELETE FROM `inventory` WHERE `ID` = ?", [itemID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let index = inventoryItems.findIndex((el) => el.id === itemID);
            inventoryItems.splice(index, 1);
        });
    },
    // name, type, hash, weight, quant = 1, entity, owner, dimension, pos, specs
    addItem: function(player, item, quantity) {
        let playerCurrentItems = this.getPlayerInventory(player);
        let currentItem = playerCurrentItems.find( ({ name }) => name === item );
        let inventoryItem = INVENTORY_ITEMS.find( ({name}) => name === item);
        if (quantity > 0) {
            if(currentItem) { 
                currentItem.quantity += quantity;
                this.updateItem(currentItem);
            }
            else {
                if (inventoryItem) {
                    let itemToGive = new itemModel();
                    itemToGive.name = inventoryItem.name;
                    itemToGive.type = inventoryItem.type;
                    itemToGive.hash = inventoryItem.hash;
                    itemToGive.weight = inventoryItem.weight;
                    itemToGive.quantity = quantity;
                    itemToGive.entity = ITEM_ENTITY_PLAYER;
                    itemToGive.owner = player.databaseID;
                    console.log(itemToGive);
                }
            }
        }
        else if (quantity < 0) {
            if (currentItem.quantity <= 0) {
                this.deleteItem(currentItem.ID);
            }
        }
        
    },

    findItem: function (item) { 
        let res = null;
        INVENTORY_ITEMS.forEach(function (i) {
            if (i.name.includes(item)) { 
                res = i;
            }
        })
        return res;
    },

    updateItem: function (itemModel) {
        if(itemModel != null) {
            db.query("UPDATE `inventory` SET itemQuantity = ?, itemOwner = ?, itemEntity = ?, itemDimension = ?, itemPos = ?, WHEERE `ID` = ?", [itemModel.itemQuantity, itemModel.itemOwner, itemModel.itemEntity, itemModel.itemDimension, itemModel.itemPos, itemModel.id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
    },

    getPlayerInventory: function(player) { 
        let id = player.databaseID;
        let playerInv = [];
        inventoryItems.forEach(function (r) {
            if(r.owner == id) {
                playerInv.push(r)
            }
        })
        return playerInv;
    },

    nearItem: function (player) {
        let nearItem = null;
        inventoryItems.forEach((item) => {
            let itemPos = new mp.Vector3(item.position.x, item.position.y, item.position.z );
            if(item.entity ==  -1) {
                if (player.dist(itemPos) < 2.5) {
                    nearItem = item;
                }
            }
        });
        if (nearItem != null) {
            return nearItem;
        } 
        else {
            return false;
        }
    },


}
