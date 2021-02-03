var HouseModel = require('./houseModel');

global.allHouses = [];

global.HOUSES_TYPES = [
    HOUSE_TYPE_1 = {}
]

module.exports = {
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
}