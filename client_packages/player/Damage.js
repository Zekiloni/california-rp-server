
var lastHealth = 0;
var lastArmour = 0;
var headshots = 0;
var headshotsTimer = null;
const player = mp.players.local;

mp.events.add('render', () => {
  let healthLoss = 0, armourLoss = 0;
  if (lastHealth != player.getHealth()) {
    healthLoss = lastHealth - player.getHealth();
    lastHealth = player.getHealth();
  }

  if (armourLoss != player.getArmour()) {
    armourLoss = lastArmour - player.getArmour();
    lastArmour = player.getArmour();
  }

  if (healthLoss > 0 || armourLoss > 0) {
    mp.events.callRemote('server:player.damage', player, healthLoss, armourLoss);
  }
});

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
  
  //Anti Aim 
  /* if (targetEntity.type === 'player' && boneIndex === targetEntity.getBoneIndexByName('SKEL_Head')) {
      headshots++;
      if(headshotsTimer != null) {
        clearTimeout(myVar);
        headshotsTimer = setTimeout(() => { headshots = 0; headshotsTimer = null; }, 12000);
      }
      if(headshots > 3) {
        mp.events.callRemote("server:anticheat", 1, player.name);
      }
  } */
  //mp.gui.chat.push(`sourceEntity: ${JSON.stringify(sourceEntity)} | targetEntity: ${JSON.stringify(targetEntity)} | sourcePlayer: ${JSON.stringify(sourcePlayer)} | weapon: ${weapon}, boneIndex: ${boneIndex}, damage: ${damage}`)
});