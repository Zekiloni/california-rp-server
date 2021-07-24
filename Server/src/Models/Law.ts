import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey, AfterCreate, AfterDestroy, DataType } from 'sequelize-typescript';

@Table
export class Warrant extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   ID: number;

   @Unique(true)
   @AllowNull(false)
   @Column
   Name: number;

   @AllowNull(false)
   @Column(DataType.ARRAY)
   Type: number;

   @AllowNull(false)
   @Column
   Status: number;

   @AllowNull(false)
   @Column
   @Default('Unknown')
   Address: string;

   @AllowNull(false)
   @Column
   @Default('')
   Note: string;

   @AllowNull(false)
   @Column
   Issuer_Id: number;

   @CreatedAt
   Created_At: Date;

   @UpdatedAt
   Updated_At: Date;

}

export class Ticket extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   ID: number;

   @Unique(true)
   @AllowNull(false)
   @Column
   Name: number;

   @AllowNull(false)
   @Column(DataType.ARRAY)
   Type: number;

   @AllowNull(false)
   @Column
   Status: number;

   @AllowNull(false)
   @Column
   @Default('Unknown')
   Address: string;

   @AllowNull(false)
   @Column
   @Default('')
   Note: string;

   @AllowNull(false)
   @Column
   Issuer_Id: number;

   @CreatedAt
   Created_At: Date;

   @UpdatedAt
   Updated_At: Date;
}

(async () => { 

   await Warrant.sync();
   await Ticket.sync();

})();