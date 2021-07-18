


const Player = mp.players.local;


mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
   // 1. Da li je boneIndex glava
   // 1.1 Ako jeste, da li ima helmet? => Da/Ne => Da(Blokiraj hit i ukloni helmet)

   // 2. Da li je boneIndex stomak? => Da/Ne => Da(Napraviti wounded state gde igrac krvari)

   mp.gui.chat.push(JSON.stringify(targetEntity.type));
   if (targetEntity.type === 'player') { 
      mp.events.callRemote('server:player:damage', sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage);
   }

});
