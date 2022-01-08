



mp.Player.prototype.Notification = function (Message: string, Type: number, Time: number = 4) {
   this.call('CLIENT::NOTIFICATION', [Message, Type, Time]);
};


mp.Player.prototype.Teleport = function (Position: Vector3Mp, Heading: number = 180) {
   this.Position = Position;
   this.Heading = Heading;
   // Safe tp
}

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