

mp.Player.prototype.notification = function (message, type, time) { 
   this.call('client:notification.show', [message, type, time]);
}

mp.Player.prototype.message.info = function (message) { 
   this.outputChatBox(message);
}

mp.Player.prototype.isNear = function (target) { 
   if (this.dist(target.position) < 3) { return true; } 
   else return false;
}

mp.Player.prototype.nearPleayers = (radius) => { 
   let near = [];
   mp.players.forEachInRange(this.position, radius, 
      (player) => {
         near.push(player);
      }
   );
   return near;
}

mp.Player.prototype.variables = () => { 
   this.data.cuffed = false;
   this.data.frozen = false;
   this.data.crouching = false;
}

mp.events.add("server:toggleCrouch", (player) => {
   player.data.crouching = !player.data.crouching;
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

