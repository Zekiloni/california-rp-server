mp.Player.prototype.notification = function (message, type, time = 4) {
    this.call('client:notification.show', [message, type, time]);
};
mp.Player.prototype.Character = async function () {
    if (this.character) {
        let character = await frp.Characters.findOne({ where: { id: this.character } });
        return character;
    }
};
mp.Player.prototype.Account = async function () {
    if (this.account) {
        let account = await frp.Accounts.findOne({ where: { id: this.account } });
        return account;
    }
};
mp.Player.prototype.sendMessage = function (message, color) {
    this.outputChatBox(`!{${color}}${message}`);
};
mp.Player.prototype.isNear = function (target) {
    return this.dist(target.position) < 3 ? true : false;
};
mp.Player.prototype.nearPleayers = function (radius) {
    let near = [];
    mp.players.forEachInRange(this.position, radius, (player) => {
        near.push(player);
    });
    return near;
};
mp.Player.prototype.defaultVariables = function () {
    this.data.cuffed = false;
    this.frozen = false;
    this.data.tased = false;
    this.data.crouching = false;
    this.data.spawned = true;
    this.data.job = 0;
};
mp.Player.prototype.ProximityMessage = function (radius, message, colors) {
    mp.players.forEachInRange(this.position, radius, (target) => {
        let distanceGap = radius / 5;
        let distance = target.dist(this.position), color = colors[0];
        if (distance < distanceGap) {
            color = colors[0];
        }
        else if (distance < distanceGap * 2) {
            color = colors[1];
        }
        else if (distance < distanceGap * 3) {
            color = colors[2];
        }
        else if (distance < distanceGap * 4) {
            color = colors[3];
        }
        else {
            color = colors[3];
        }
        target.outputChatBox(`!{${color}}${message}`);
    });
};
mp.Player.prototype.message = function (color, message) {
    this.outputChatBox(`!{${color}}${message}`);
};
mp.events.add({
    'playerChat': (player, text) => {
        if (player.data.logged && player.data.spawned) {
            player.ProximityMessage(7, player.name + ' kaze: ' + text, frp.Globals.Colors.white);
        }
    }
});
mp.players.find = (playerName) => {
    let foundPlayer = null;
    if (playerName == parseInt(playerName)) {
        foundPlayer = mp.players.at(playerName);
    }
    if (!foundPlayer) {
        mp.players.forEach((target) => {
            if (target.name === playerName) {
                foundPlayer = target;
            }
            else if (target.name.includes(playerName)) {
                foundPlayer = target;
            }
        });
    }
    return foundPlayer;
};
mp.events.add("server:onPlayerDamageHimself", (player, healthLoss) => {
    // 
});
