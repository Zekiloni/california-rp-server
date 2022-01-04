import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, IsUUID, Length, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Messages } from '../Global/Messages';
import { Globals } from '../Global/Globals';

enum GrowStage {
    Seed, Small_Plant,
    Medium_Plant, Big_Plant, Harvest_Ready
}

enum Specie {
    Cannabis, Coca, Opium
}

@Table
export default class Plant extends Model {

    @PrimaryKey
    @AutoIncrement
    ID: number;

    @Column
    Type: Specie;

    @Column
    @Default(0)
    StagePoint: number;

    @Column
    Grow_Time: number;

    @Column
    Owner: number;

    @Column
    Position: Vector3Mp;

    @Column
    @Default(0)
    Fertilized: number;

    @Column
    @Default(50)
    Water: number;

    CurrentStage: GrowStage;
    ObjectModels: string[];
    GameObjects: ObjectMp[]; // [0] - Saksija | [1] - Biljka 

    GetTotalGrowTime() {
        // IZ SEED ITEMA
    }

    Die() {
        // ADD Dead plants LOG
        for (let i = 0; i < this.GameObjects.length; i++) {
            this.GameObjects[i].destroy();
        }
        this.GameObjects = [];
        this.destroy();
    }

    Refresh() {

        this.GameObjects[1].destroy(); // Unistimo biljku pa je odma napravimo da izgleda kao da raste

        switch (this.CurrentStage) {
            case GrowStage.Small_Plant:
                this.GameObjects[1] = mp.objects.new(mp.joaat(this.ObjectModels[0]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Medium_Plant:
                this.GameObjects[1] = mp.objects.new(mp.joaat(this.ObjectModels[1]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Big_Plant:
                this.GameObjects[1] = mp.objects.new(mp.joaat(this.ObjectModels[2]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
        }
    }

    Plant (Player: PlayerMp, Type: Specie, ) {
        // Provera da li ima seed item
        // Namestiti da ne moze svuda da se planta
        //
        const GrowTime = Plant.GetPlantGrowTime(Type);
        Plant.create({Type: Type, Owner: Player.Character, Grow_Time: GrowTime, Position: new mp.Vector3(Player.position.x + 0.2, Player.position.y + 0.3, Player.position.z)});
        
    }

    Harvest(Player: PlayerMp) {
        if (this.CurrentStage != GrowStage.Harvest_Ready) return Player.Notification(Messages.NOT_READY_FOR_HARVEST, Globals.Notification.Error, 6);

        switch (this.Type) {
            case Specie.Cannabis:
                // Daje svež kanabis koji se suši pa prodaje ili puši
                break;
            case Specie.Coca:
                // Daje sveže listove koji se prerađuju dalje
                break;
            case Specie.Opium:
                // Daje sveže semenke koje idu dalje na preradu
                break;
        }

        if (this.GameObjects.length > 0) {
            for (let i = 0; i < this.GameObjects.length; i++) {
                this.GameObjects[i].destroy();
            }
        }
        
        this.destroy();
    }

    static GetPlantGrowTime (Type: Specie) { // Vraća u satima
        switch (Type) {
            case Specie.Cannabis:
                return 72;
            case Specie.Coca:
                return 96;
            case Specie.Opium:
                return 96;
        }
    }



}



const PlantTimer = setInterval(async () => {
    const AllPlants = await Plant.findAll();

    for (const i in AllPlants) {
        const Plant = AllPlants[i];


        // Svako zalivanje dodaje 5 vode a svaki sat se gubi 0.3 vode, znači ako biljka ne bude zalivena nakon 16h umire.
        Plant.Water -= 0.3;
        if (Plant.Water <= 0) {
            Plant.Die();
        }

        // Proveravamo ukoliko je biljka nađubrena, ako jeste onda dobija ukupno 2 pointa po satu, ako nije onda dobija 1, znači ako se drži non stop nađubrena skoro duplo brže raste
        // Opada za 0.5 svaki sat a jedno đubrenje dodaje 1.5
        if (Plant.Fertilized > 0 && Plant.StagePoint != GrowStage.Harvest_Ready) {
            Plant.Fertilized -= 0.5;
            Plant.StagePoint += 0.1;
        } 

        // Dodaje 0.1 stage pointa
        if (Plant.StagePoint != GrowStage.Harvest_Ready) {
            Plant.StagePoint += 0.1;
        }

        switch (true) {
            case Plant.StagePoint > 0 && Plant.StagePoint <= 1:
                Plant.CurrentStage = GrowStage.Seed;
                break;
            case Plant.StagePoint > 1 && Plant.StagePoint <= 2:
                Plant.CurrentStage = GrowStage.Small_Plant;
                break;
            case Plant.StagePoint > 2 && Plant.StagePoint <= 3:
                Plant.CurrentStage = GrowStage.Medium_Plant;
                break;
            case Plant.StagePoint > 3 && Plant.StagePoint <= 4:
                Plant.CurrentStage = GrowStage.Big_Plant;
                break;
            case Plant.StagePoint > 4 && Plant.StagePoint <= 5:
                Plant.CurrentStage = GrowStage.Harvest_Ready;
                break;
        }

        Plant.Refresh();

    }
}, 60000 * 60);
