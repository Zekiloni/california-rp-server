const MiningOre = { 
   Gold: 30, Srebro: 20, Aluminium: 9, Coal: 3, Stone: 2
}

const MiningPoints = [
   new mp.Vector3(0, 0, 0),
   new mp.Vector3(0, 0, 0)
];

mp.events.add({
   'server:player.job.mining': (player) => {
      let invWeight = mp.item.weight(player.character),
          oreWeight = Math.floor(1, 3), // grams
          oreChance = Math.floor(0, 100),
          oreType = MiningOre.Stone,
          character = player.getCharacter();

          if (oreChance >= 50) {
             oreType = MiningOre.Coal;
          }
          else if (oreChance > 60) {
             oreType = MiningOre.Aluminium;
          }
          else if (oreChance > 75) {
             oreType = MiningOre.Silver
          }
          else if (oreChance > 95) {
             oreType = MiningOre.Gold;
          }

          player.notification(`Uspešno ste iskopali ${oreWeight} grama rude, odnesite je do mašine za preradu`, NOTIFY_SUCCSESS, 4);
      
   }
});

class Miner {
   start (player) {
      for (let i in MiningPoints) {
         let spot = MiningPoints[i];
         if (player.dist(spot) <= 5) {
            // moze
            player.call('client:player.job.mining', 1);
         }
      }
   }
}

