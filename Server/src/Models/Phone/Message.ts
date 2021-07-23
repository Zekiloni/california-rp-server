import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey } from 'sequelize-typescript';

export default class Message extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    ID: number;
 
    @Column
    //@ForeignKey(() => SimCard)
    @AllowNull(false)
    Sim_Number_From: number;
 
    @Column
    //@ForeignKey(() => SimCard)
    @AllowNull(false)
    Sim_Number_To: number;
 
    @Column
    @AllowNull(false)
    Message: string;

    @Column
    @UpdatedAt
    Created_At: Date;

    @Column
    @UpdatedAt
    Updated_At: Date;
 }

 /* frp.Messages.Send = function (phone, target, message) { 
   frp.Messages.new({ Phone: phone, Target: target, message: message });
};




frp.Messages.prototype.Readed = function () { 
   this.Readed = true;
   await this.save();
};



(async () => {
   frp.Messages.sync();
   frp.Contacts.sync();
})();*/
 
 