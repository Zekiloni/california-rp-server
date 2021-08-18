import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, IsUUID, Length, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

enum GrowStage {
    Seed, Seedling, Small_Plant,
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
    Stage: number;

    @Column
    Grow_Time: number;
    
    @Column
    Owner: number;

    @Column
    @Default(0)
    Fertilized: number;

    @Column
    @Default(50)
    Water: number;

    GetTotalGrowTime() {
        // IZ SEED ITEMA
    }

    Die() {
        this.destroy();
    }
    
}

// 

const PlantTimer = setInterval( async () => {
    const AllPlants = await Plant.findAll();

    for (const i in AllPlants) {
        const Plant = AllPlants[i];
        Plant.Water--;
        if (Plant.Stage != GrowStage.Harvest_Ready) {
            AllPlants[i].Stage += 0.1;
        }
    }
}, 60000 * 60);