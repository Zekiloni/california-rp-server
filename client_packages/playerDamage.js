
var lastHealth = 0;
var lastArmour = 0;
const localPlayer = mp.players.local;

mp.events.add('render',  function() {
  var healthLoss = 0;
  var armourLoss = 0;
  if(lastHealth != localPlayer.getHealth()) {
      healthLoss = lastHealth - localPlayer.getHealth();
      lastHealth = localPlayer.getHealth();
  }

  if(armourLoss != localPlayer.getArmour()) {
    armourLoss = lastArmour - localPlayer.getArmour();
    lastArmour = localPlayer.getArmour();
  }

  if(healthLoss > 0) {
      mp.events.callRemote('server:playerDamage', localPlayer, healthLoss, armourLoss);
  }
});