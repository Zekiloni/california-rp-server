

mp.Player.prototype.notification = function (message, type, time) { 
   this.call('client:notification.show', [message, type, time]);
}