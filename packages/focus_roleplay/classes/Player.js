

mp.Player.prototype.notification = function (message, type, time = 4) { 
   this.call('client:notification.show', [message, type, time]);
}

mp.Player.prototype.sendMessage = function (message, color) { 
   this.outputChatBox(`!{${color}}${message}`);
}

mp.Player.prototype.isNear = function (target) { 
   if (this.dist(target.position) < 3) { return true; } 
   else return false;
}

mp.Player.prototype.nearPleayers = function (radius) { 
   let near = [];
   mp.players.forEachInRange(this.position, radius, 
      (player) => {
         near.push(player);
      }
   );
   return near;
}

mp.Player.prototype.defaultVariables = function () { 
   this.data.cuffed = false;
   this.frozen = false;
   this.data.tased = false;
   this.data.crouching = false;
   this.data.spawned = true;
}


/**
* Slanje proksimalne poruke u radius sa fade bojama
* @param {Float32Array} radius
* @param {String} message
* @param {Array} colors
*/
mp.Player.prototype.proximityMessage = function (radius, message, colors) {
   mp.players.forEachInRange(this.position, radius,
		(target) => {
			let distance = target.dist(this.position), color = colors[0];
         if (distance < radius / 8) { color = colors[0]; }
         else if (distance < radius / 6) { color = colors[1]; }
         else if (distance < radius / 4) { color = colors[2]; }
         else if (distance < radius / 2) { color = colors[3]; }
         else if (distance < radius) { color = colors[4]; }
         target.outputChatBox(`!{${color}}${message}`);
		}
	);
};

mp.Player.prototype.message = function (color, message) { 
   this.outputChatBox(`!{${color}}${message}`);
}

mp.events.add({
   'server:player.crouch': (player) => {
      player.data.crouching = !player.data.crouching;
   },

   'playerChat': (player, text) => {
      if (!player.data.logged) return;
      player.proximityMessage(7, `${player.name} kaze: ${text}`, ['FFFFFF', 'E6E6E6', 'C8C8C8', 'AAAAAA', '6E6E6E']);
    },
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
         } else if (target.name.includes(playerName)) { 
            foundPlayer = target;
         }
      });
   }
   return foundPlayer;
}

