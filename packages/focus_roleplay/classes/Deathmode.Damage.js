



class Deathmode { 
   constructor () { 
      mp.events.add({
         'playerDeath': function (player, reason, killer) {
            player.isDead = true;
            player.respawnTimer = setTimeout(() => {
                player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
                player.isDead = false;
            }, mp.settings.death.respawnTime * 1000);
          }
      })
   }
}

let Deathmode = new Deathmode();

class Damage { 

}

let Damage = new Damage();