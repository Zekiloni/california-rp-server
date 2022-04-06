import { 
   AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, 
   PrimaryKey, Table 
} from 'sequelize-typescript';

import { Vehicles } from './vehicle';


@Table({
   tableName: 'vehicles_components', updatedAt: false
})
export class VehicleComponents extends Model {
   @AutoIncrement
   @PrimaryKey
   @Column
   id: number;

   @Column(DataType.STRING)
   name: string

   @ForeignKey(() => Vehicles)
   @Column({
      type: DataType.INTEGER, field: 'vehicle_id'
   })
   vehicleId: number;

   @BelongsTo(() => Vehicles)
   vehicle: Vehicles

   @Column({ 
      type: DataType.INTEGER, field: 'mod_type'
   })
   modType: number
   
   @Column({
      type: DataType.INTEGER, field: 'mod_index'
   })
   modIndex: number
   
   get getVehicle () {
      return mp.vehicles.toArray().find(vehicle => vehicle.instance.id == this.vehicle.id);
   }
   
   apply () {
      if (!this.getVehicle) {
         return;
      }

      this.getVehicle.setMod(this.modType, this.modIndex);
   }

   remove () {
      if (!this.getVehicle) {
         return;
      }

      this.getVehicle.setMod(this.modType, -1);
   }
}