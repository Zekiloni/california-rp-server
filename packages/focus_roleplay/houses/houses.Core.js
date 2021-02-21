

mp.houses = []; 

const HOUSE_TYPES = [ 
    { num: 0, position: [0, 0, 0], ipl: 'ipl' }, 
    { num: 1, position: [5, 5, 5], ipl: 'ipl 2' }, 
]

function House (data) {
    this.id = data.id;
    this.type = data.type || 2;
    this.owner = data.owner || -1;
    this.price = data.price || -1;
    this.dimension = data.dimension || 0;
    this.entrance = data.entrance || 0;
    this.interior = data.interior || 0;
    this.ipl = data.ipl;

    let position = new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z);
    this.label = mp.labels.new('Kuca na Prodaju !', position, { los: false, font: 0, drawDistance: 3 });
    this.blip = mp.blips.new(40, position, { name: `Kuca ${this.id}`,  shortRange: true });
    this.marker = mp.markers.new(1, new mp.Vector3(position.x, position.y, position.z - 0.99), 1.1,
    { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 150], visible: true, dimension: this.dimension });
    this.owner == -1 ? ( this.label.text = 'Kuca na Prodaju !', this.blip.color = 52 ) : ( this.label.text = 'Kuca u necijem vlasnistvu !', this.blip.color = 49 ); 

    mp.houses.push(this)

    this.delete = () => {
        let x = mp.houses.indexOf(this)
        mp.houses.splice(x, 1)
        this.blip.destroy();
        this.label.destroy();
        this.marker.destroy();
    };

    this.refresh = () => { 
        this.owner == -1 ? ( this.label.text = 'Kuca na Prodaju !', this.blip.color = 52 ) : ( this.label.text = 'Kuca u necijem vlasnistvu !', this.blip.color = 49 );
    }

    this.info = () => {  return this; }
}

const houses = { 

    load: async () => { 
        let result = await db.aQuery("SELECT * FROM `houses`");
        result.forEach(function (res) {
            let entrance = JSON.parse(res.entrance),
                interior = JSON.parse(res.interior);
            let house = new House({ 
                id: res.ID,
                type: res.type,
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
        db.query("INSERT INTO `houses` (type, price, entrance, interior, ipl) VALUES (?, ?, ?, ?, ?)", [data.type, data.price, entrance, interior.position, interior.ipl], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            account.notification(player, `Kuca kreirana tip ${type} sa cenom ${price}$.`, NOTIFY_SUCCESS, 4);
            let id = results.insertId; 
            new House({ id: id, price: data.price, type: data.type, interior: interior.position, ipl: interior.ipl })
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
                if (player.data.cash < house.price) return account.notification(player, MSG_NOT_ENOGUTH_MONEY, NOTIFY_ERROR, 4); 
                if (house.owner != -1) return account.notification(player, MSG_ALREADY_OWNED, NOTIFY_ERROR, 4);
                house.owner = player.databaseID;
                house.refresh()
                account.notification(player, `Čestitamo!<br>Uspešno ste kupili kuću za <b>${results[0].price}$</b>.`, NOTIFY_SUCCESS, 5);
            } 
            else {
                account.notification(player, MSG_ERROR, NOTIFY_ERROR, 5);
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
