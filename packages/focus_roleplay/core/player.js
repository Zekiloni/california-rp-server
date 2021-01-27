module.exports = { 
     findPlayer: function(playerName) {
          if (playerName == parseInt(playerName))  {
              return mp.players.at(playerName);
          }
          else {
              let foundPlayer = null;
      
              mp.players.forEach((_player) => {
                if (_player.name === playerName) {
                  foundPlayer = _player;
                }
              });
      
              return foundPlayer;
          }
      }
}