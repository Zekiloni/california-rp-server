var BussinesModel = require("./bizModel");

global.allBussineses = [];

module.exports = {
    type: function () {
        var types = [
            { type: 0, interior: 11, name: "24/7 Market" },
            { type: 1, interior: 22, name: "Clothing Store" },
            { type: 2, interior: 33, name: "Cafe Bar" },
            { type: 3, interior: 44, name: "Gas Station" },
        ];
        return types;
    },

    create: function (player, type, price) {
        let info = this.type();
        if (type > info.length) return player.notify(`Maksimalni tip biznisa je ${info.length}`);
        var name = info[type].name;
        let int = info[type].interior;
        let entrance = JSON.stringify(player.position);
        db.query("INSERT INTO bussineses (name, type, price, interior, entrance) VALUES (?, ?, ?, ?, ?)", [name, type, price, int, entrance], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            player.outputChatBox(`Biznis kreiran tip: ${type} sa cenom ${price} $`);
            let id = results.insertId;
            let labelPos = player.position;
            var posArr = {x: player.position.x, z: player.position.z, y: player.position.y};
            var biz = new BussinesModel(id, name, type, -1, price, posArr);
            let label = mp.labels.new(`~r~FOR SALE !~s~ ~n~${name}~n~ Price ~g~${price} $`, new mp.Vector3(labelPos.x, labelPos.y, labelPos.z),
            {
                los: true,
                font: 0,
                drawDistance: 4,
            }); 
            label.biz = id;
        });
    },

    loadAll: async function () {
        var result = await db.aQuery("SELECT * FROM `bussineses`");
        result.forEach(function (res) {
            var bizPos = JSON.parse(res.entrance);
            var biz = new BussinesModel(res.ID, res.name, res.type, res.owner, res.price, bizPos);
            let label = mp.labels.new( `~r~FOR SALE !~s~ ~n~ ${res.name} ~n~ Price ~g~${res.price} $`, new mp.Vector3(bizPos.x, bizPos.y, bizPos.z),
            {
                los: true,
                font: 0,
                drawDistance: 4,
            });
            label.biz = res.ID;
        });
        core.terminal(3, `${result.length} businesses were loaded !`);
    },

    delete: function (player, biz) {
        let bID = biz.id;
        db.query("DELETE FROM bussineses WHERE ID = ?", [biz.id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let index = allBussineses.findIndex((el) => el.id === biz.id);
            allBussineses.splice(index, 1);
        });
        mp.labels.forEach((label) => {
            if (label.biz === bID)
            { 
                label.destroy()
            }
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
            db.query("UPDATE bussineses SET name = ? WHERE ID = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
        else if (changeType == 'owner') { 
            allBussineses[index].owner = value; 
            db.query("UPDATE bussineses SET owner = ? WHERE ID = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
        else if (changeType == 'price') { 
            allBussineses[index].price = value;
            db.query("UPDATE bussineses SET price = ? WHERE ID = ?", [value, id], function (error, results, fields) {
                if (error) return core.terminal(1, error);
            });
        }
    },
};
