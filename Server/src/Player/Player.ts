

mp.Player.prototype.Notification = function (Message: string, Type: number, Time: number = 4) {
   this.call('CLIENT::NOTIFICATION', [Message, Type, Time]);
};
