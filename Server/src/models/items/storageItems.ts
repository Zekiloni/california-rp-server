import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Characters } from '..';


// @Table({
//    tableName: 'storage_items', createdAt: false, updatedAt: false
// })
// class StorageItem extends Model {
//    storageId: number
//    itemId: number
// }

// @Table
// class CharacterItem extends Model {
//    characterId: number
//    itemId: number
// }

// @Table
// class Item extends Model {
//    @ForeignKey(() => StorageItem)
//    @Column
//    storageId: number

//    @ForeignKey(() => CharacterItem)
//    @Column
//    characterId: number
// }