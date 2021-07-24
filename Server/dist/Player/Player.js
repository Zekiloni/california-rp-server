"use strict";
mp.Player.prototype.Notification = function (Message, Type, Time = 4) {
    this.call('CLIENT::NOTIFICATION', [Message, Type, Time]);
};
