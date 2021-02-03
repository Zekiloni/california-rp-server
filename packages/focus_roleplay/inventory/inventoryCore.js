
var itemModel = require('./itemModel');

global.items = require('./itemList');
global.inventoryItems = [];

module.exports = { 
    loadItems: async() => { 
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
   
    createItem: (name, type, hash, weight, quant = 1, entity, owner, dimension, pos, specs = 0) => { 
        db.query("INSERT INTO `inventory` (itemName, itemType, itemHash, itemQuantity, itemEntity, itemOwner, itemDimension, itemPos, itemSpecs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, type, hash, quant, entity, owner, dimension, JSON.stringify(pos), specs], function (error, res, fields) {
            if (error) return core.terminal(1, error);
            let id = res.insertId;
            var posArr = {x: pos.x, y: pos.y, z: pos.z};
            let item = new itemModel(id, name, type, hash, weight, quant, entity, owner, dimension, posArr)
            console.log(item.info())
        });
    },

    destroyItem: (player, item) => { 
        let itemID = item.id;
        db.query("DELETE FROM `inventory` WHERE `ID` = ?", [itemID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let index = inventoryItems.findIndex((el) => el.id === itemID);
            inventoryItems.splice(index, 1);
            item.label.destroy();
            item.object.destroy();
            inv.deleteItem(itemID)
        });
    },

    deleteItem: (itemID) => { 
        db.query("DELETE FROM `inventory` WHERE `ID` = ?", [itemID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let index = inventoryItems.findIndex((el) => el.id === itemID);
            inventoryItems.splice(index, 1);
        });
    },
    // name, type, hash, weight, quant = 1, entity, owner, dimension, pos, specs
    addItem: (player, item, quantity) => {
        let playerCurrentItems = this.getPlayerInventory(player);
        let currentItem = playerCurrentItems.find( ({ name }) => name === item );
        let inventoryItem = INVENTORY_ITEMS.find( ({name}) => name === item);
        if (quantity > 0) {
            if (currentItem) { 
                currentItem.quantity += quantity;
                this.itemUpdate(currentItem);
            }
            else {
                if (inventoryItem) {
                    db.query("INSERT INTO `inventory` (itemName, itemType, itemHash, itemQuantity, itemEntity, itemOwner, itemDimension, itemPos, itemSpecs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [itemToGive.name, itemToGive.type, itemToGive.hash, itemToGive.quantity, itemToGive.entity, itemToGive.owner, itemToGive.dimension, 0, 0], function (error, result, fields) {
                        if (error) return core.terminal(1, error);
                        let itemToGive = new itemModel();
                        itemToGive.id = result.insertId;
                        itemToGive.name = inventoryItem.name;
                        itemToGive.type = inventoryItem.type;
                        itemToGive.hash = inventoryItem.hash;
                        itemToGive.weight = inventoryItem.weight;
                        itemToGive.quantity = quantity;
                        itemToGive.entity = ITEM_ENTITY_PLAYER;
                        itemToGive.owner = player.databaseID;
                    });
                }
            }
        }
        else if (quantity < 0) {
            if (currentItem.quantity <= 0) {
                this.deleteItem(currentItem.ID);
            }
        }
        
    },

    findItem: (item) => { 
        let res = null;
        INVENTORY_ITEMS.forEach(function (i) {
            if (i.name.includes(item)) { 
                res = i;
            }
            else { 
                return false;
            }
        })
        return res;
    },

    getPlayerInventory: (player) => { 
        let id = player.databaseID;
        let playerInv = [];
        inventoryItems.forEach(function (r) {
            if(r.owner == id) {
                playerInv.push(r)
            }
        })
        return playerInv;
    },

    pickUpItem: (player, pickUpObject) => {
        if (pickUpObject) {
            pickUpObject.entity = ITEM_ENTITY_PLAYER;
            pickUpObject.owner = player.databaseID;
            pickUpObject.label.destroy();
            pickUpObject.object.destroy();
            inv.itemUpdate(pickUpObject);
            account.notification(player, `Podigli ste <b>${pickUpObject.name} [${pickUpObject.quantity}]</b> sa poda.`, NOTIFY_SUCCESS, 4);
            account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} podize ${pickUpObject.name} sa poda.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
            
        }
        else {
            account.notification(player, "Nisi u blizini ni jednog predmeta.", NOTIFY_ERROR, 4);
        }
    },

    dropItem: function (player, itemID) {
        let dropObject = inventoryItems.find( ({ id }) => id === parseInt(itemID) );
        if (dropObject) {
            let objPos = new mp.Vector3(player.position.x, player.position.y, player.position.z - 0.93);
            dropObject.object = mp.objects.new(dropObject.hash, objPos,
            {   rotation: new mp.Vector3(-90, 0, 0),
                alpha: 255,
                dimension: player.dimension
            });
            dropObject.label = mp.labels.new(`${dropObject.name}~n~~h~${dropObject.quantity}`, objPos,
            {   los: true,
                font: 0,
                drawDistance: 3
            });
            dropObject.entity = ITEM_ENTITY_GROUND;
            dropObject.owner = 0;
            dropObject.position = objPos;
            dropObject.dimension = player.dimension;
            inv.itemUpdate(dropObject);
            account.notification(player, `Bacili ste <b>${dropObject.name} [${dropObject.quantity}]</b> na pod.`, NOTIFY_SUCCESS, 4);
            account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} baca ${dropObject.name} na pod.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
        }
    },

    itemUpdate: function (itemModel) {
        if (itemModel != null) {
            let pos = JSON.stringify(itemModel.position)
            db.query("UPDATE `inventory`SET itemQuantity = ?, itemOwner = ?, itemEntity = ?, itemDimension = ?, itemPos = ? WHERE `ID` = ?", [itemModel.quantity, itemModel.owner, itemModel.entity, itemModel.dimension, pos, itemModel.id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
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
