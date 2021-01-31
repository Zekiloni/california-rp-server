module.exports = { 

    SendMessage: function(player, message, type, time = 1000, place = "bottomRight") {
        player.call('ReceiveNotification', message, type, time, place);
    },
    
    SendMessageToAll: function(message, type, time = 1000, place = "bottomRight") {
        mp.players.forEach( (player, id) => { player.call('ReceiveNotification', message, type, time, place);  } );
    },
    
    SendInfoMessage: function(player, message, time = 1000, place = "bottomRight") {
        player.call('ReceiveNotification', message, "info", time, place);
    },
    
    SendErrorMessage: function(player, message, time = 1000, place = "bottomRight") {
        player.call('ReceiveNotification', message, "error", time, place);
    },
    
    SendSuccessMessage: function(player, message, time = 1000, place = "bottomRight") {
        player.call('ReceiveNotification', message, "success", time, place);
    },

    SendWarningMessage: function(player, message, time = 1000, place = "bottomRight") {
        player.call('ReceiveNotification', message, "warning", time, place);
    },
    
    SendInfoMessageToAll: function(message, time = 1000, place = "bottomRight") {
        mp.players.forEach( (player, id) => { player.call('ReceiveNotification', message, "info", time, place);  } );
    },
    
    SendErrorMessageToAll: function(message, time = 1000, place = "bottomRight") {
        mp.players.forEach( (player, id) => { player.call('ReceiveNotification', message, "error", time, place);  } );
    },
    
    SendSuccessMessageToAll: function(message, time = 1000, place = "bottomRight") {
        mp.players.forEach( (player, id) => { player.call('ReceiveNotification', message, "success", time, place);  } );
    },

    SendWarningMessageToAll: function(message, time = 1000, place = "bottomRight") {
        mp.players.forEach( (player, id) => { player.call('ReceiveNotification', message, "warning", time, place);  } );
    }
}
