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
}