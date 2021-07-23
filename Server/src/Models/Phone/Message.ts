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
  MessageText: string;

  @Column
  @AllowNull(false)
  @Default(false)
  Readed: boolean;

  @Column
  @UpdatedAt
  Created_At: Date;

  @Column
  @UpdatedAt
  Updated_At: Date;

  static async Send(NumberFrom: number, NumberTo: number, Text: string) {
    const NewSMS = Message.create({ Sim_Number_From: NumberFrom, Sim_Number_To: NumberTo, MessageText: Text })
  }

  async Seen () {
    this.Readed = true;
    await this.save();
  }
}

(async () => {
  await Message.sync();
})();


