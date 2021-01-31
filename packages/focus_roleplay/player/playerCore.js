module.exports = {
    exist: function (username) {
        db.query("SELECT * FROM accounts WHERE username = ?", [username], function (error, results, fields) {
            if (error) return core.terminal(1, error);

            if (results && results.length) return true;
            else return false;
        });
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
        player.data.cash = result[0].cash;
        player.data.bank = result[0].bank;
        player.data.savings = result[0].savings;
        player.data.credit = result[0].credit;
        player.job = result[0].job;
        player.faction = result[0].faction;
        player.rank = result[0].factionRank;
        player.radioFreq = result[0].radioFreq;
        player.inviteRequest = 0;
        player.loggedIn = true;
        player.duty = false;

        if (result[0].lastPosition != 0) { 
            let lastPos = JSON.parse(result[0].lastPosition);
            player.position = new mp.Vector3(lastPos.x, lastPos.y, lastPos.z);
        }
        if(result[0].headBlendData != 0) { 
            let blendData = JSON.parse(result[0].headBlendData);
            player.setHeadBlend(parseInt(blendData.shapeFirst), parseInt(blendData.shapeSecond), 0, 
                                parseInt(blendData.skinFirst), parseInt(blendData.skinSecond), 0, 
                                parseFloat(blendData.shapeMix), parseFloat(blendData.skinMix), 0);
        }
        if (result[0].clothing != 0) {
            let playerClothing = JSON.parse(result[0].clothing);
            playerClothing.forEach((item) => {
                player.setClothes(parseInt(item.index), parseInt(item.value), 0, 2);
            });
        }
        if (result[0].headOverlays != 0) {
            let playerOverlays = JSON.parse(result[0].headOverlays);
            playerOverlays.forEach((item) => {
                player.setHeadOverlay(parseInt(item.index), [parseInt(item.value), 1.0, parseInt(item.color), 0]);
            });
        }

    },

    save: function (player) { 
        let PlayerPos = JSON.stringify(player.position);
        var values = {
            ipAddress: player.ip,
            admin: player.admin,
            cash: player.data.cash,
            bank: player.data.bank,
            savings: player.data.savings,
            credit: player.data.credit,
            lastPosition: PlayerPos,
            job: player.job,
            faction: player.faction,
            factionRank: player.rank,
            radioFreq: player.radioFreq
        };
        db.query("UPDATE accounts SET ? WHERE id = ?", [values, player.databaseID], function (error, results, fields) {
            if (error) return core.terminal(1, `Saving Account ${error}`);
        });
    },

    updateClothing: function (player, skin) {
        db.query("UPDATE `accounts` SET `clothing` = ? WHERE ID = ?", [skin, player.databaseID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let clothing = JSON.parse(skin);
            clothing.forEach((item) => {
                player.setClothes(parseInt(item.index), parseInt(item.value), 0, 2);
            });
        });
    },

    updateOverlays: function (player, overlays) {
        db.query("UPDATE `accounts` SET `headOverlays` = ? WHERE ID = ?", [overlays, player.databaseID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let headOverlays = JSON.parse(overlays);
            headOverlays.forEach((item) => {
                player.setHeadOverlay(parseInt(item.index), [parseInt(item.value), 1.0, parseInt(item.color), 0]);
            });
        });
    },

    updateFaceFeatures: function (player, face) {
        db.query("UPDATE `accounts` SET `faceFeatures` = ? WHERE ID = ?", [face, player.databaseID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let faceFeatures = JSON.parse(face);
            faceFeatures.forEach((item) => {
                player.setFaceFeature(parseInt(item.index), parseFloat(item.value));
            });
        });
    },

    updateBlendData: function (player, blendData) {
        db.query("UPDATE `accounts` SET `headBlendData` = ? WHERE ID = ?", [blendData, player.databaseID], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            let blend = JSON.parse(blendData);
            player.setHeadBlend(parseInt(blend.shapeFirst), parseInt(blend.shapeSecond), 0, 
            parseInt(blend.skinFirst), parseInt(blend.skinSecond), 0, 
            parseFloat(blend.shapeMix), parseFloat(blend.skinMix), 0);
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
        this.save(player);
    },

    buyBiz: function (player, b) {
        db.query("SELECT * FROM `business` WHERE `ID` = ?", [b.id], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            if (results && results.length) {
                if (player.data.cash < results[0].price) return player.notify("Nemate dovoljno novca.");
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

    findPlayer: function (playerName) {
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
    },

    playerNearTarget: function (player, target) { 
        if (player.dist(target.position) < 2.5) { return true; } 
        else return false;
    },

    sendProxMessage: function (player, radius, message, color_1, color_2, color_3, color_4, color_5) {
        player.outputChatBox(`!{${color_1}}${message}`)
        mp.players.forEach(
             (target, id) => {
              if (target.dist(player.position) < radius / 8) { } 
              else if (target.dist(player.position) < radius / 6) { target.outputChatBox(`!{${color_2}}${message}`); } 
              else if (target.dist(player.position) < radius / 4) { target.outputChatBox(`!{${color_3}}${message}`); } 
              else if (target.dist(player.position) < radius / 2) { target.outputChatBox(`!{${color_4}}${message}`); } 
              else if (target.dist(player.position) < radius) { target.outputChatBox(`!{${color_5}}${message}`); }
             }
        );
    },

    sendFactionMessage: function (player, message) {
        if(player.faction == 0) player.outputChatBox('Niste ni u jednoj fakciji.');
        mp.players.forEach(
            (target, id) => {
             if (target.faction == player.faction) { 
                target.outputChatBox(`!{${CHAT_COLORS.FACTION}}(( ${player.rank} ${player.name} [${player.id}]: ${message} ))`);
             } 
        })
    },

    sendChatBuble: function (player, radius, message) {
        console.log('sendChatBuble pozvan')
        mp.players.forEach(
            (target, id) => {
             if (target.dist(player.position) < radius) { 
                console.log('igrac')
                target.call('client:sendChatBubble', [radius, message, player]);
             } 
        });
    }
};
