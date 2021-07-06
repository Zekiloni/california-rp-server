
/* 

   *Corpse system by Kopra
 

mp.characters[player.character].corpse = mp.peds.new(mp.game.joaat('mp_m_freemode_01'), player.position, 0, ped => {
    // Called when the ped is streamed in
    ped.setAlpha(255);
    ped.freezePosition(true);
    ped.setInvincible(false);
    ped.setProofs(false, false, false, false, false, false, false, false);
    player.cloneToTarget(mp.characters[player.character].corpse.handle);
    // Dodati animaciju kako leži na podu
}, 0);

*/



class Damage { 

   static Configuration = { 
      RespawnTime: 3 * 60 * 1000
   }

   constructor () { 
      mp.events.add({
         'playerDeath': async function (Player, Reason, Killer) {

            const Character = await Player.Character();
            Player.RespawnTimer = setTimeout(() => {
               
               if (Player && Player.RespawnTimer != null) { 
                  Character.SetHealth(Player, frp.Settings.default.health);
                  Character.Wound(Player, false);
               }

            }, Damage.Configuration.RespawnTime);

            
         },

         'server:player:damage': (player, sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
            
         }
      });
   }
}

Damage();