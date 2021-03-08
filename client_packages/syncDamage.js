
var lastHealth = 0;
var lastArmour = 0;
var headshots = 0;
var headshotsTimer = null;
const player = mp.players.local;

mp.events.add('render',  function() {
  var healthLoss = 0;
  var armourLoss = 0;
  if(lastHealth != player.getHealth()) {
      healthLoss = lastHealth - player.getHealth();
      lastHealth = player.getHealth();
  }

  if(armourLoss != player.getArmour()) {
    armourLoss = lastArmour - player.getArmour();
    lastArmour = player.getArmour();
  }

  if(healthLoss > 0) {
      mp.events.callRemote('server:playerDamage', player, healthLoss, armourLoss);
  }
});

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
  /* Anti Aim 
  if (targetEntity.type === 'player' && boneIndex === 20) {
      headshots++;
      if(headshotsTimer != null) {
        clearTimeout(myVar);
        headshotsTimer = setTimeout(() => { headshots = 0; }, 120000);
      }
      if(headshots > 3) {
        mp.events.callRemote("server:anticheat", 1, player.name);
      }
  }*/

  if(targetEntity.type === 'vehicle') {
    mp.events.callRemote('server:onVehicleDamage', targetEntity, boneIndex, damage);
  }
  if(sourceEntity === targetEntity) {
    mp.events.callRemote('server:onPlayerDamageHimself', sourceEntity, damage);
  }
});