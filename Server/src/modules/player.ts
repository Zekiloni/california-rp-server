



mp.Player.prototype.sendNotification = function (message: string, type: number, time: number = 4) {
   this.call('CLIENT::NOTIFICATION', [message, type, time]);
};


mp.Player.prototype.sendHint = function (key: string, message: string, time: number) {
   this.call('CLIENT::HINT', [key, message, time]);
};


mp.Player.prototype.sendMessage = function (message: string, color: string) {
   this.outputChatBox('!{' + color + '}' + message);
};


mp.players.find = (searchQuery: any) => {
   let foundPlayer = null;
   if (searchQuery == parseInt(searchQuery)) {
      foundPlayer = mp.players.at(searchQuery);
   }
   if (!foundPlayer) {
      mp.players.forEach((target) => {
         if (target.name === searchQuery) {
            foundPlayer = target;
         }
         else if (target.name.includes(searchQuery)) {
            foundPlayer = target;
         }
      });
   }
   return foundPlayer;
};

