module.exports = {
    exist: function (username) {
        db.query(
            "SELECT * FROM accounts WHERE username = ?",
            [username],
            function (error, results, fields) {
                if (error) return core.terminal(1, error);

                if (results && results.length) return true;
                else return false;
            }
        );
    },

    login: async function (username, password) {
        var result = await db.aQuery("SELECT * FROM `accounts` WHERE `username` = ?", username);
        if(result[0].password) {
            // core.hash('vucko', function(err, data) { // primer callbacka / povratne informacije kroz funkciju
            //     if (err) return console.log(err)
            // })
            if (result[0].password == password) {
                this.status(username, 1);
                return true;
            } else {
                return false;
            }
        }
    },

    load: async function (player, username) {
        var result = await db.aQuery("SELECT * FROM `accounts` WHERE `username` = ?", username);
        player.name = username;
        player.admin = result[0].admin;
        player.databaseID = result[0].ID;
        player.cash = result[0].cash;
        player.loggedIn = true;

        //inv.load(player)

        var lastPos = JSON.parse(result[0].lastPosition);
        player.position = new mp.Vector3(lastPos.x, lastPos.y, lastPos.z);

        var playerClothing = JSON.parse(result[0].clothing);
        playerClothing.forEach((item) => {
            player.setClothes(parseInt(item.index), parseInt(item.value), 0, 2);
        });

        var playerOverlays = JSON.parse(result[0].headOverlays);
        playerOverlays.forEach((item) => {
            player.setHeadOverlay(parseInt(item.index), [parseInt(item.value), 1.0, parseInt(item.color), 0,]);
        });
    },

    updateClothing: function (id, skin) {
        db.query("UPDATE `accounts` SET `clothing` = ? WHERE ID = ?", [skin, id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
        });
    },

    updateOverlays: function (id, overlays) {
        db.query("UPDATE `accounts` SET `headOverlays` = ? WHERE ID = ?", [overlays, id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
        });
    },

    updateFaceFeatures: function (id, face) {
        db.query("UPDATE `accounts` SET `faceFeatures` = ? WHERE ID = ?", [face, id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
        });
    },

    status: function (username, status) {
        if (status == 1) {
            db.aQuery("UPDATE `accounts` SET `lastLogin` = current_timestamp(), `online` = 1 WHERE `username` = ?", username);
        } else if (status == 0) {
            db.aQuery("UPDATE `accounts` SET `online` = 0 WHERE `username` = ?", username);
        }
    },

    lastPosition: function (id, playerPos) {
        db.query("UPDATE `accounts` SET `lastPosition` = ? WHERE `ID` = ?", [playerPos, id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
        });
    },

    lastIP: function (id, ip) {
        db.query("UPDATE `accounts` SET `ipAddress` = ? WHERE `ID` = ?", [ip, id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
        });
    },

    playerQuit: function (player) {
        core.terminal(2, `${player.name} je napustio server.`);
        this.status(player.name, 0);
        let PlayerPos = player.position;
        this.lastPosition(player.databaseID, JSON.stringify(PlayerPos));
        this.lastIP(player.databaseID, player.ip);
    },

    buyBiz: function (player, b) {
        db.query("SELECT * FROM `business` WHERE `ID` = ?", [b.id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            if (results && results.length) {
                if (player.cash < results[0].price) return player.notify("Nemate dovoljno novca.");
                if (results[0].owner != -1) return player.notify("Ovaj biznis vec ima vlasnika.");
                try { 
                    biz.update(b.id, 'owner', player.databaseID);
                } catch(e) {
                    console.log(e)
                }
                player.notify(`Kupio si biznis ~h~ ${results[0].name} ~h~ za ~g~${results[0].price}$ ~s~ .`);
            } else {
                player.notify("Doslo je do greske.");
            }
        });
    },

    getPlayer: function(targetString) {
        if(mp.players.exists(targetString)) {
            let player = mp.players.at(targetString);
            if(player.loggedIn) {
                return player;
            }
            else {
                return false;
            }           
        }
    },

    findPlayer: function(playerName) {
        let foundPlayer = null;
        if (playerName == parseInt(playerName)) {
            foundPlayer = mp.players.at(playerName);
        }
        if (!foundPlayer) {
          mp.players.forEach((_player) => {
            if (_player.name === playerName) {
                foundPlayer = _player;
            }
          });
        }
        return foundPlayer;
    }
};
