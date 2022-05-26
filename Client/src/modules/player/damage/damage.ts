

function incomingDamageHandler (
   sourceEntity: EntityMp,
   sourcePlayer: PlayerMp,
   targetEntity: EntityMp,
   weapon: number,
   boneIndex: number,
   damage: number
) {
   if (targetEntity && targetEntity.remoteId == mp.players.local.remoteId) { 
      mp.events.callRemote('SERVER::INJURIES', boneIndex, weapon, damage);
      
      if (mp.players.local.getVariable('WOUNDED')) {
         if (damage > mp.players.local.getHealth() - damage) {
            mp.events.callRemote('SERVER::DEATH', sourceEntity);
         }
      } else { 
         if (damage > mp.players.local.getHealth()) {
            mp.events.callRemote('SERVER::WOUNDED');
         }
      }
   }
};

mp.events.add(RageEnums.EventKey.INCOMING_DAMAGE, incomingDamageHandler);