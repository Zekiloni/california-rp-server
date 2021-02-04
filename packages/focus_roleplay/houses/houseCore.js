var HouseModel = require('./houseModel');

global.allHouses = [];

global.HOUSES_TYPES = [
    HOUSE_TYPE_1 = {}
]

module.exports = {
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