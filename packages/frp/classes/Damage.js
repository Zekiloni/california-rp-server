
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



class Deathmode { 
   static async CreateCorpse (player) {
      const Character = await frp.Characters.findOne({ where: { id: player.character } });
      // player.call
   }

   constructor () { 
      mp.events.add({
         'playerDeath': function (player, reason, killer) {
            player.alpha = 0;
            player.isDead = true;
            Deathmode.CreateCorpse(player);
            player.respawnTimer = setTimeout(() => {
               if (player && mp.players.exists(player.id)) { 
                  player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
                  player.isDead = false;
               }
            }, 10 * 1000); // mp.settings.death.respawnTime
         },

         'server:player.damage': (player, healthLoss, armorLoss) => {
            
         }
      })

      
   }
}

let deathmode = new Deathmode();

class Damage { 

}

let damage = new Damage();