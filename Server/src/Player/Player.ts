

mp.Player.prototype.Notification = function (Message: string, Type: number, Time: number = 4) {
   this.call('CLIENT::NOTIFICATION', [Message, Type, Time]);
};

mp.Player.prototype.Teleport = function (Position: Vector3Mp, Heading: number = 180) {
   this.Position = Position;
   this.Heading = Heading;
   // Safe tp
}
