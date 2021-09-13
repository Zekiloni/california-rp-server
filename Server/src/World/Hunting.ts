import { RandomInt, DistanceBetweenVectors } from "../Global/Utils";

const AnimalSpawnPoints: Vector3Mp[] = [
   new mp.Vector3(-1725.521, 4699.659, 33.80555),
   new mp.Vector3(-1690.836, 4682.494, 24.47228),
   new mp.Vector3(-1661.219, 4650.042, 26.12522),
   new mp.Vector3(-1613.11, 4632.693, 46.37965),
   new mp.Vector3(-1569.1, 4688.946, 48.04772),
   new mp.Vector3(-1549.585, 4766.055, 60.47577),
   new mp.Vector3(-1461.021, 4702.999, 39.26906),
   new mp.Vector3(-1397.87, 4637.824, 72.12587),
   new mp.Vector3(-617.851, 5762.557, 31.45378),
   new mp.Vector3(-613.3984, 5863.435, 22.00531),
   new mp.Vector3(-512.6949, 5940.441, 34.46115),
   new mp.Vector3(-363.9753, 5921.967, 43.97315),
   new mp.Vector3(-384.0528, 5866.263, 49.28809),
   new mp.Vector3(-374.6584, 5798.462, 62.83068),
   new mp.Vector3(-448.7513, 5565.69, 71.9878),
   new mp.Vector3(-551.2087, 5167.825, 97.50465),
   new mp.Vector3(-603.5089, 5154.867, 110.1652),
   new mp.Vector3(-711.7279, 5149.544, 114.7229),
   new mp.Vector3(-711.3442, 5075.649, 138.9036),
   new mp.Vector3(-672.9759, 5042.516, 152.8032),
   new mp.Vector3(-661.6283, 4974.586, 172.7258),
   new mp.Vector3(-600.277, 4918.438, 176.7214),
   new mp.Vector3(-588.3793, 4889.981, 181.3767),
   new mp.Vector3(-549.8376, 4838.274, 183.2239),
   new mp.Vector3(-478.639, 4831.655, 209.2594),
   new mp.Vector3(-399.3954, 4865.303, 203.7752),
   new mp.Vector3(-411.9441, 4946.082, 177.4535),
   new mp.Vector3(-414.8653, 5074.294, 149.0627),
]

enum AnimalCondition {
   Alive, Injured, Dead
}

enum AnimalState {
   Fleeing, Grazing, Wandering
}

enum AnimalType {
   Deer, Boar
}

let AnimalCollection: HuntingAnimal[] = [];

export class HuntingAnimal {
   public Handle: PedMp;
   public Spawn: Vector3Mp;
   public Type: AnimalType;
   public State: AnimalState;
   public StateTimer: any;
   public StateChangeTick: number;
   public Destination: Vector3Mp;
   public UpdateState: boolean;
   public FleeingPed: PlayerMp;

   constructor(SpawnPos: Vector3Mp, Type: AnimalType) {
      const Model = HuntingAnimal.GetAnimalModelFromType(Type), Scenario = HuntingAnimal.GetAnimalScenarioFromType(Type);
      this.Handle = mp.peds.new(Model, SpawnPos, {
         dynamic: true,
         frozen: false,
         invincible: false
      });
      this.Handle.playScenario(Scenario);
      this.State = AnimalState.Grazing;

      this.StateTimer = setInterval(() => {
         HuntingAnimal.AnimalAi(this);
      }, 1000);

      AnimalCollection.push(this);
   }

   static Init () {
      for (const Position of AnimalSpawnPoints) {
         const Type = RandomInt(0, 1);
         const Animal = new HuntingAnimal(Position, Type);
         Animal.UpdateState = true;
      }
   }

   static AnimalAi(Animal: HuntingAnimal) {
      let PlayersInRadius: PlayerMp[] = [];

      mp.players.forEachInRange(Animal?.Handle?.position, 100, (Player: PlayerMp) => {
         PlayersInRadius.push(Player);
      });

      const PlayerCount = PlayersInRadius.length;
      if (PlayerCount <= 0) { return; }

      if (PlayerCount > 0 && Animal?.State != AnimalState.Fleeing) {
         Animal.State = AnimalState.Fleeing;
         Animal.FleeingPed = PlayersInRadius[0]; // Prvi igrač, po logici i najbliži (proveriti)
         Animal.UpdateState = true;

         Animal.FleeingPed.call('CLIENT::PED:SMART:FLEE:FROM:PED', [Animal.Handle, Animal.FleeingPed]);
      }

      Animal.StateChangeTick++;
      const RandomFarDestination = AnimalSpawnPoints.find(Position => DistanceBetweenVectors(Animal.Handle.position, Position) > 7);

      if (Animal.State != AnimalState.Fleeing) {
         if (Animal.StateChangeTick > 15) {
            const StateChance = RandomInt(0, 100);

            if (RandomFarDestination == undefined) return; // AnimalSpawnPoints.find(Position => DistanceBetweenVectors(Animal.Handle.position, Position) > 7);
            if (StateChance < 30) {
               const Scenario = HuntingAnimal.GetAnimalScenarioFromType(Animal.Type);
               Animal.State = AnimalState.Grazing;
               Animal.Handle.playScenario(Scenario);
            } else {
               Animal.State = AnimalState.Wandering;
               Animal.Destination = RandomFarDestination;
               Animal.UpdateState = true;
               Animal.FleeingPed.call('CLIENT::PED:SMART:FLEE:COORD', [Animal.Handle, Animal.Destination]);
            }

            Animal.StateChangeTick = 0;
         } else {
            if (Animal.StateChangeTick > 20) {
               Animal.State = AnimalState.Grazing;
               Animal.Handle.playScenario(HuntingAnimal.GetAnimalScenarioFromType(Animal.Type));
            }
         }

         if (!Animal.UpdateState) return;

         switch (Animal.State) {
            case AnimalState.Grazing:
               Animal.Handle.playScenario(HuntingAnimal.GetAnimalScenarioFromType(Animal.Type));
               break;
            case AnimalState.Wandering:
               PlayersInRadius.forEach((Player) => {
                  Player.call('CLIENT::TASK:WANDER:IN:AREA', [Animal.Handle, RandomFarDestination]);
               });

               break;
            default:
               PlayersInRadius.forEach((Player) => {
                  Player.call('CLIENT::PED:SMART:FLEE:FROM:PED', [Animal.Handle, Player]);
               })
               break;
         }
         
         Animal.UpdateState = false;
      }
   }

   static GetAnimalModelFromType(Type: AnimalType) {
      switch (Type) {
         case AnimalType.Boar:
            return RageEnums.Hashes.Ped.A_C_BOAR
         case AnimalType.Deer:
            return RageEnums.Hashes.Ped.A_C_DEER
      }
   }

   static GetAnimalScenarioFromType(Type: AnimalType) {
      switch (Type) {
         case AnimalType.Boar:
            return "WORLD_PIG_GRAZING";
         case AnimalType.Deer:
            return "WORLD_DEER_GRAZING";
      }
   }

}


