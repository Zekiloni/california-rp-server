

mp.Player.prototype.Notification = function (message, type, time = 4) {
   this.call('client:player.interface:notification', [message, type, time]);
};


mp.Player.prototype.Character = async function () {
   const character = await frp.Characters.findOne({ where: { id: this.character } });
   return character ? character : null;
};


mp.Player.prototype.Appearance = async function () { 
   const appearance = await frp.Appearances.findOne({ where: { id: this.character }});
   return appearance ? appearance : null;
};


mp.Player.prototype.Account = async function () {
   const account = await frp.Accounts.findOne({ where: { id: this.account } });
   return account ? account : null;
};


mp.Player.prototype.SendMessage = function (message, color) {
   this.outputChatBox(`!{${color}}${message}`);
};


mp.Player.prototype.IsNear = function (target) {
   return this.dist(target.position) < 3.5 ? true : false;
};

mp.Player.prototype.NearbyPlayers = function (radius) {
   let near = [];
   mp.players.forEachInRange(this.position, radius, (player) => {
      near.push(player);
   });
   return near;
};


mp.Player.prototype.Nearest = async function () { 

   const Businesses = await frp.Business.findAll();
   for (const Business of Businesses) { 
      const Position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
      if (this.dist(Position) < 3.0) return Business;
   }

   const Houses = await frp.Houses.findAll();
   for (const House of Houses) { 
      const Position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
      if (this.dist(Position) < 3.0) return House;
   }

   // const Vehicles = await frp.Vehicles.findAll();
   // for (const Vehicle of Vehicles) { 
   //    if (this.dist(Pos))
   // }
};

mp.Player.prototype.defaultVariables = function () {
   this.data.cuffed = false;
   this.frozen = false;
   this.data.tased = false;
   this.data.crouching = false;
   this.data.spawned = false;
   this.data.job = 0;
};

mp.Player.prototype.ProximityMessage = function (radius, message, colors) {
   mp.players.forEachInRange(this.position, radius, (target) => {
      const distanceGap = radius / 5;
      const distance = target.dist(this.position)
      let color = null;

      switch (true) {
         case (distance < distanceGap): color = colors[0]; break;
         case (distance < distanceGap * 2): color = colors[1]; break;
         case (distance < distanceGap * 3): color = colors[2]; break;
         case (distance < distanceGap * 4): color = colors[3]; break;
         default: color = colors[0]; break;
      }
      
      target.outputChatBox('!{' + color + '}' + message);
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
