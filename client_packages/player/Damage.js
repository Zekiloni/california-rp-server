
let lastHealth = 0;
let lastArmour = 0;
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


mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
  // 1. Da li je boneIndex glava
  // 1.1 Ako jeste, da li ima helmet? => Da/Ne => Da(Blokiraj hit i ukloni helmet)

  // 2. Da li je boneIndex stomak? => Da/Ne => Da(Napraviti wounded state gde igrac krvari)

});

let PedOnGround = null;
mp.events.add('client:corpse', () => {

  if (PedOnGround == null) {
    let CurrentPed = mp.game.player.getPed();
    PedOnGround = mp.peds.new(
      mp.game.joaat('MP_F_Freemode_01'), 
      player.position,
      player.rotation,
      player.dimension
  );
    PedOnGround = mp.game.invoke('0xEF29A16337FACADB', CurrentPed, 0, false, true);
    PedOnGround.setToRagdoll(5000, 5000, 0, true, true, true);
  } else { }
});