
import { AfterCreate, AfterDestroy, AutoIncrement, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

import { factionConfig } from '@configs';
import { factionPoints } from '@interfaces';

@Table
export class factions extends Model {

   static objects = new Map<number, factionPoints>()

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default(factionConfig.type.LEO)
   @Column
   type: factionConfig.type

   @Unique(true)
   @Column
   name: string

   @Column
   description: string

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('spawn_Point')); }
   })   
   spawn_Point: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('vehicle_Point')); }
   })   
   vehicle_Point: Vector3Mp

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('garage_point')); }
   })   
   garage_point: Vector3Mp

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('equipment_point')); }
      }
   )   
   equipment_point: Vector3Mp

   @Column(
      {
         type: DataType.JSON,
         get () { return JSON.parse(this.getDataValue('equipment')); }
      }
   )   
   equipment: string[]

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date

   get object (): factionPoints | never { 
      return factions.objects.get(this.id)!;
   }

   set object (object: factionPoints) { 
      factions.objects.set(this.id, object);
   }

   @AfterCreate
   static afterCreating (faction: factions) {
      faction.refresh();
   }

   @AfterDestroy
   static afterDestroying (faction: factions) {

   }

   refresh () {
      if (!this.object) {
         return;
      }

      this.object.vehicle_Point = {
         
      }
   }

}

