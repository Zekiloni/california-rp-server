
import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, CreatedAt, UpdatedAt, AllowNull } from 'sequelize-typescript';
import { inventories } from '@models';
import { itemNames } from '@constants';


@Table
export default class channels extends Model {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Unique(true)
   @AllowNull(false)
   @Column
   frequency: number;

   @AllowNull(true)
   @Column
   password: string;

   @AllowNull(false)
   @Column
   owner: number;

   @Column
   @CreatedAt
   created_At: Date;

   @Column
   @UpdatedAt
   updated_at: Date;

   static async createFrequency (player: PlayerMp, frequency: number, password: string| null) {
      const channel = await channels.create({ frequency: frequency, password: password, Owner: player.character.id });
      return channel;
   }

   static async doesExist (frequency: number) {
      const exist = await channels.findOne({ where: { frequency: frequency } });
      return exist ? exist : null;
   }

   async changePassword (password: string) {
      this.password = password;
      await this.save();
   }


   async join (player: PlayerMp, radioItem: inventories, frequency: number, password: string | null) {
      if (this.password != password) {
         // PORUKA: Pogresna sifra frekvencije
         return;
      }

      if (radioItem.data.frequency != 0) {
         // PORUKA: Vec ste u nekoj frekvenciji
         return;
      }

      radioItem.data.frequency = frequency;

      // PORUKA: Uspesno ste se pridruzili frekvenciji {frequency}
      await radioItem.save()
   }

   async leave (player: PlayerMp, radioItem: inventories) {

      if (this.owner == player.character.id) {
         // PORUKA: Vi ste vlasnik ove frekvencije
         return;
      }

      radioItem.data.frequency = 0;
      // PORUKA: Napustili ste uspesno frekvenciju
      await radioItem.save();
   }

   async delete (player: PlayerMp) {
      if (this.owner != player.character.id) {
         // PORUKA: Niste vlasnik frekvencije
         return;
      }
      
      inventories.findAll({ where: { item: itemNames.HANDHELD_RADIO }}).then(radios => {
         radios.forEach(async radio => {
            if (radio.data.frequency == this.frequency) {
               radio.data.frequency = 9;
               await radio.save()
            }
         })
      });

      // PORUKA: Frekvencija uspesno izbrisana
      await this.destroy();
   }
}

