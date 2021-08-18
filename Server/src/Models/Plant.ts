import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, IsUUID, Length, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

enum GrowStage {
    Seed, Small_Plant,
    Medium_Plant, Big_Plant, Harvest_Ready
}

@Table
export default class Plant extends Model {

    @PrimaryKey
    @AutoIncrement
    ID: number;

    @Column
    Model: string;

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
    GameObject: ObjectMp;

    GetTotalGrowTime() {
        // IZ SEED ITEMA
    }

    Die() {
        this.GameObject.destroy();
        this.destroy();
    }

    Refresh() {
        if (this.GameObject != null) this.GameObject.destroy();
        switch(this.CurrentStage) {
            case GrowStage.Small_Plant:
                this.GameObject = mp.objects.new(mp.joaat(this.ObjectModels[0]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Medium_Plant:
                this.GameObject = mp.objects.new(mp.joaat(this.ObjectModels[1]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Big_Plant:
                this.GameObject = mp.objects.new(mp.joaat(this.ObjectModels[2]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
        }
    }

}

// 

const PlantTimer = setInterval(async () => {
    const AllPlants = await Plant.findAll();

    for (const i in AllPlants) {
        const Plant = AllPlants[i];
        
        Plant.Water--;
        if (Plant.Water <= 0) {
            Plant.Die();
        }

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