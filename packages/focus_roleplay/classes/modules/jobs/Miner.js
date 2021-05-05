const MiningOre = { 
   Gold: 30, Srebro: 20, Aluminium: 9, Coal: 3, Stone: 2
}

const MiningPoints = [
   new mp.Vector3(0, 0, 0),
   new mp.Vector3(0, 0, 0)
];

const OreProcessingPoints = [
   new mp.Vector3(0, 0, 0),
   new mp.Vector3(0, 0, 0)
]

mp.events.add({
   'server:player.job.mining': (player, stage) => {
      let invWeight = mp.item.weight(player.character), // Napraviti proveru da li igrač može da ponese sa sobom te rude, ako ima previše stvari sa sobom zabraniti onemogućiti? Možda?
          oreWeight = Math.floor(1, 3), // grams
          oreType = -1,
          oreChance =  0,
          character = player.getCharacter();

         switch (stage)
         {
            case 1:
               oreChance = Math.floor(0, 100);
               oreType = MiningOre.Stone;

               switch (oreChance)
               {
                  case oreChance >= 50:
                     oreType = MiningOre.Coal;
                     break;
                  case oreChance > 60:
                     oreType = MiningOre.Aluminium;
                     break;
                  case oreChance > 75:
                     oreType = MiningOre.Silver
                     break;
                  case oreChance > 95:
                     oreType = MiningOre.Gold;
                     break;

               }
            break;
         case 2:
               for (let i in OreProcessingPoints) {
                  if (player.dist(OreProcessingPoints[i]) < 3) {

                     break;
                  }
               }
            break;
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

