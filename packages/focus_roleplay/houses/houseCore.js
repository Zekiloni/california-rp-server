var HouseModel = require('./houseModel');

global.allHouses = [];

global.HOUSES_TYPES = [
    HOUSE_TYPE_1 = {}
]

module.exports = {

    loadAll: async function () { 
        var result = await db.aQuery("SELECT * FROM `houses`");
        result.forEach(function (res) {
            let entrancePos = JSON.parse(res.entrance);
            let interiorPos = JSON.parse(res.interior);
            let house = new HouseModel(res.ID, res.type, res.owner, res.price, res.dimension, entrancePos, interiorPos);
        });
        core.terminal(3, `${result.length} houses were loaded !`);
    },

    create: function (player, type, price, pos) {
        let entrance = JSON.stringify(player.position);
        db.query("INSERT INTO `houses` (type, price, entrance, interior) VALUES (?, ?, ?, ?)", [type, price, entrance, entrance], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            account.notification(player, `Kuca kreirana tip ${type} sa cenom ${price}$.`, NOTIFY_SUCCESS, 4);
            let id = results.insertId; 
            var posArr = {x: pos.x, y: pos.y, z: pos.z};
            let house = new HouseModel(id, type, -1, price, player.dimension, posArr, posArr);
        });
    },

    delete: function (player, house) {
        db.query("DELETE FROM `houses` WHERE `ID` = ?", [house.id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let index = allHouses.findIndex((el) => el.id === house.id);
            allHouses.splice(index, 1);
            house.label.destroy(); 
            house.blip.destroy();  
            house.marker.destroy();
        });
    },

    update: function (id, changeType, value) {
        let index = allHouses.findIndex((el) => el.id === id);
        if (changeType == 'type') { 
            allHouses[index].type = value; 
            db.query("UPDATE `houses` SET `type` = ? WHERE `ID` = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
        else if (changeType == 'owner') { 
            allHouses[index].owner = value; 
            allHouses[index].updateHouse();
            db.query("UPDATE `houses` SET owner = ? WHERE `ID` = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
        else if (changeType == 'price') { 
            allHouses[index].price = value;
            db.query("UPDATE `houses` SET price = ? WHERE `ID` = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
    },

    nearby: function (player) {
        var nearHouse = null;
        allHouses.forEach((h) => {
            let housePos = new mp.Vector3(h.entrance.x, h.entrance.y, h.entrance.z );
            if (player.dist(housePos) < 2.5) {
                nearHouse = h;
            }
        });
        if (nearHouse != null) {
            return nearHouse;
        } else {
            return false;
        }
    },
}