

var BussinesModel = require('./bizModel');
global.allBussineses = [];

module.exports = {
    type: function () {
        var types = [
            { type: 0, interior: 11, blip: 52, name: "24/7 Market" },
            { type: 1, interior: 22, blip: 366, name: "Clothing Store" },
            { type: 2, interior: 33, blip: 93, name: "Cafe Bar" },
            { type: 3, interior: 44, blip: 361, name: "Gas Station" },
        ];
        return types;
    },

    create: function (player, type, price) {
        let info = this.type();
        if (type > info.length) return player.notify(`Maksimalni tip biznisa je ${info.length}`);
        var name = info[type].name;
        let int = info[type].interior;
        let entrance = JSON.stringify(player.position);
        db.query("INSERT INTO `business` (name, type, price, interior, entrance) VALUES (?, ?, ?, ?, ?)", [name, type, price, int, entrance], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            player.outputChatBox(`Biznis kreiran tip: ${type} sa cenom ${price} $`);
            let id = results.insertId; // PROVERITI OVO
            let bPos = player.position; // PROVERITI OVO
            let posArr = { x: bPos.x, y: bPos.y, z: bPos.z }; // PROVERITI OVO
            var biz = new BussinesModel(id, name, type, -1, price, posArr); // PROVERITI OVO
        });
    },

    loadAll: async function () {
        var result = await db.aQuery("SELECT * FROM `business`");
        result.forEach(function (res) {
            let bizPos = JSON.parse(res.entrance);
            let biz = new BussinesModel(res.ID, res.name, res.type, res.owner, res.price, bizPos);
        });
        core.terminal(3, `${result.length} business were loaded !`);
    },

    delete: function (player, biz) {
        let bID = biz.id;
        db.query("DELETE FROM `business` WHERE `ID` = ?", [biz.id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let index = allBussineses.findIndex((el) => el.id === biz.id);
            allBussineses.splice(index, 1);
            biz.label.destroy(); 
            biz.blip.destroy();  
        });
    },

    nearby: function (player) {
        var nearBiz = null;
        allBussineses.forEach((item) => {
            let bizPos = new mp.Vector3(item.entrance.x, item.entrance.y, item.entrance.z );
            if (player.dist(bizPos) < 2.5) {
                nearBiz = item;
            }
        });
        if (nearBiz != null) {
            return nearBiz;
        } else {
            return false;
        }
    },

    update: function (id, changeType, value) {
        let index = allBussineses.findIndex((el) => el.id === id);
        if (changeType == 'name') { 
            allBussineses[index].name = value; 
            db.query("UPDATE `business` SET `name` = ? WHERE `ID` = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
        else if (changeType == 'owner') { 
            allBussineses[index].owner = value; 
            db.query("UPDATE `business` SET owner = ? WHERE `ID` = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
        else if (changeType == 'price') { 
            allBussineses[index].price = value;
            db.query("UPDATE `business` SET price = ? WHERE `ID` = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
    },
};
