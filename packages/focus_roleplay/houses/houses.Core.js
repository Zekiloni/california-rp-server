

mp.houses = []; 

const HOUSE_TYPES = [ 
    { type: 0, name: 'Low End Apartment', position: [261.4586, -998.8196, -99.00863] }, 
    { type: 1, name: 'Medium End Apartment', position: [347.2686, -999.2955, -99.19622] }, 
]

class House { 
    constructor (data) { 
        this.id = data.id;
        this.type = data.type || 0;
        this.owner = data.owner || -1;
        this.price = data.price || -1;
        this.dimension = data.dimension || 0;
        this.entrance = data.entrance || 0;
        this.interior = data.interior || 0;
        this.ipl = data.ipl;
    
        let position = new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z);
        this.blip = mp.blips.new(40, position, { name: `Kuca`,  shortRange: true });
        this.marker = mp.markers.new(1, new mp.Vector3(position.x, position.y, position.z - 0.99), 1.1,
        { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 150], visible: true, dimension: this.dimension });
    
        mp.houses.push(this) 
    }

    delete = () => {
        let x = mp.houses.indexOf(this)
        mp.houses.splice(x, 1)
        this.blip.destroy();
        this.marker.destroy();
    };

    info = () => { return this; }
}


// mp.events.add(RageEnums.EventKey.PLAYER_ENTER_COLSHAPE, (player, colshape) => { 
//     let house = mp.houses.filter(house => house.colshape === colshape);
// })


var houses = { 
    load: async () => { 
        let result = await db.aQuery("SELECT * FROM `houses`");
        result.forEach(function (res) {
            let entrance = JSON.parse(res.entrance),
                interior = JSON.parse(res.interior);
            let house = new House({ 
                id: res.ID,
                type: parseInt(res.type),
                owner: res.owner,
                price: res.price,
                dimension: res.dimension,
                entrance: entrance,
                interior: interior,
                ipl: res.ipl
            });
        });
        core.terminal(3, `${result.length} houses were loaded !`);
    },
    
    create: (player, data) => { 
        let entrance = JSON.stringify(player.position), interior = HOUSE_TYPES[data.type];
        let intPos = JSON.stringify({x: interior.position[0], y: interior.position[1], z: interior.position[2]})
        db.query("INSERT INTO `houses` (type, price, entrance, interior, ipl) VALUES (?, ?, ?, ?, ?)", [data.type, data.price, entrance, intPos, interior.ipl], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            player.notification(`Kuca kreirana tip ${interior.name} sa cenom ${data.price}$.`, NOTIFY_SUCCESS, 4);
            let id = results.insertId; 
            let h = new House({ id: id, price: data.price, type: data.type, entrance: player.position, interior: interior.position, ipl: interior.ipl })
            h.refresh();
        });
        
    },

    delete: (player, house) => { 
        db.query("DELETE FROM `houses` WHERE `ID` = ?", [house.id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            house.delete();
        });
    },

    near: (player) => { 
        let result = null;
        mp.houses.forEach(house => {
            player.dist(house.marker.position) < 2.5 ? ( result = house ) : ( result = false )
        });
        return result;
    },

    buy: (player, house) => {
        db.query('SELECT * FROM `houses` WHERE `ID` = ?', [house.id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            if (results && results.length) {
                if (player.data.cash < house.price) return player.notification(MSG_NOT_ENOGUTH_MONEY, NOTIFY_ERROR, 4); 
                if (house.owner != -1) return player.notification(MSG_ALREADY_OWNED, NOTIFY_ERROR, 4);
                house.owner = player.databaseID;
                player.notification(`Čestitamo!<br>Uspešno ste kupili kuću za <b>${results[0].price}$</b>.`, NOTIFY_SUCCESS, 5);
            } 
            else {
                player.notification(MSG_ERROR, NOTIFY_ERROR, 5);
            }
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
}

module.exports = houses;

houses.load();


