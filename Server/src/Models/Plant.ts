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
    @Default(GrowStage.Seed)
    Stage: GrowStage;

    @Column
    Grow_Time: number;
    
    @Column
    Owner: number;

    @Column
    @Default(0)
    Fertilized: number;

    GetTotalGrowTime() {
        // IZ SEED ITEMA
    }
    
}

// 

const PlantTimer = setInterval( async () => {
    const AllPlants = await Plant.findAll();

    for (const i in AllPlants) {
        const Plant = AllPlants[i];
        if (Plant.Stage != GrowStage.Harvest_Ready) {
            AllPlants[i].Stage
        }
    }
}, 60000 * 60);