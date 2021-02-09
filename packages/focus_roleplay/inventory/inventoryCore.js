
var itemModel = require('./itemModel');

global.items = require('./itemList');
global.inventoryItems = [];

module.exports = { 
    loadItems: async() => { 
        var result = await db.aQuery("SELECT * FROM `inventory`");
        result.forEach(function (res) {
            let itemPos, itemSpecs;
            if (res.itemPos) { itemPos = JSON.parse(res.itemPos); }
            if (res.itemSpecs) { itemSpecs = JSON.parse(res.itemSpecs); }
            
            let itemData = INVENTORY_ITEMS.find( ({name}) => name === res.itemName);

            let item = new itemModel(
                res.ID, res.itemName,
                itemData.type, itemData.hash,
                itemData.weight, res.itemQuantity,
                res.itemEntity, res.itemOwner,
                res.itemDimension, itemPos, itemSpecs
            )
        });
        core.terminal(3, `${result.length} items were loaded !`);
    },
   
    createItem: (name, type, hash, weight, quant = 1, entity, owner, dimension, pos, specs = 0) => { 
        var posArr = {x: pos.x, y: pos.y, z: pos.z - 0.93};
        let position = JSON.stringify(posArr)
        db.query("INSERT INTO `inventory` (itemName, itemHash, itemQuantity, itemEntity, itemOwner, itemDimension, itemPos, itemSpecs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name, hash, quant, entity, owner, dimension, position, specs], function (error, res, fields) {
            if (error) return core.terminal(1, error);
            let id = res.insertId;
            var posArr = {x: pos.x, y: pos.y, z: pos.z - 0.93};
            let item = new itemModel(id, name, type, hash, weight, quant, entity, owner, dimension, posArr)
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
            inventory.deleteItem(itemID)
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
        let playerCurrentItems = inventory.getPlayerInventory(player);
        let currentItem = playerCurrentItems.find( ({ name }) => name === item );
        let inventoryItem = INVENTORY_ITEMS.find( ({name}) => name === item);
        if (quantity > 0) {
            if (currentItem) { 
                currentItem.quantity += quantity;
                inventory.itemUpdate(currentItem);
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
                inventory.deleteItem(currentItem.ID);
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
                playerInv.push({ id: r.id, name: r.name, quantity: r.quantity, hash: r.hash})
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
            inventory.itemUpdate(pickUpObject);
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
            dropObject.owner = -1;
            dropObject.position = objPos;
            dropObject.dimension = player.dimension;
            inventory.itemUpdate(dropObject);
            account.notification(player, `Bacili ste <b>${dropObject.name} [${dropObject.quantity}]</b> na pod.`, NOTIFY_SUCCESS, 4);
            account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} baca ${dropObject.name} na pod.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
            player.playAnimation(DROPING_ANIM.DICT, DROPING_ANIM.ANIM, 1, 0);
        }
    },

    useItem: (player, itemID) => { 
        let item = inventoryItems.find( ({id}) => id === parseInt(itemID));
        let string = '';
        if (item) { 
            if (item.type == ITEM_TYPE_FOOD) { 
                player.playAnimation('amb@code_human_wander_eating_donut@male@idle_a', 'idle_c', 1, 49);
                setTimeout(() => { player.stopAnimation(); }, 7000)
                string = `You eated ${item.name}`;
            } 
            else if (item.type == ITEM_TYPE_WEAPON) { 
                let weap = INVENTORY_ITEMS.find( ({name}) => name === item.name);
                player.giveWeapon(mp.joaat(weap.weapon), 300);
                string = `You took the ${item.name} from inventory`;
            } // .... and moreee and moree
            else if (item.type == ITEM_TYPE_DRINK) { 
                player.playAnimation('amb@world_human_drinking@beer@male@idle_a', 'idle_c', 1, 49);
                setTimeout(() => { player.stopAnimation(); }, 7000)
            }

            inventory.deleteItem(itemID)
            player.outputChatBox(string);

        } else { player.outputChatBox(`Item doesn't exist.`); }
    },

    itemUpdate: function (itemModel) {
        if (itemModel != null) {
            let pos = JSON.stringify(itemModel.position)
            db.query("UPDATE `inventory` SET itemQuantity = ?, itemOwner = ?, itemEntity = ?, itemDimension = ?, itemPos = ? WHERE `ID` = ?", [itemModel.quantity, itemModel.owner, itemModel.entity, itemModel.dimension, pos, itemModel.id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
    },

    giveItem: function (player, item, target, quantity) { // sada ovde imamo igraca, objekat predmeta, primaoca i kolicinu
        let targetInventory = inventory.getPlayerInventory(target); 
        let targetItem = targetInventory.find( ({name}) => name === item.name);

        if (targetItem) { 
            console.log('predmet vec postoji dodana kolicina')
            console.log(`trenutna kolicina ${targetItem.quantity}, dodana kolicina je ${quantity}`);
            console.log("targetItem.quantity" + targetItem.quantity);
            targetItem.quantity = targetItem.quantity + quantity; // OVO POGLEDAJ
            console.log("quantity" + quantity);
            console.log("ukupno:" + targetItem.quantity)
            targetItem.owner = target.databaseID; 
            targetItem.entity = ITEM_ENTITY_PLAYER;
            console.log(`nova kolicina ${quantity}`)
            inventory.itemUpdate(targetItem)
        } else { 
            console.log('ne postoji kreiran je')
            inventory.addItem(target, item.name, quantity);
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
