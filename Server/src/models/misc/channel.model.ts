
import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, CreatedAt, UpdatedAt, AllowNull } from 'sequelize-typescript';
import { Items } from '@models';
import { colors, itemNames, Lang } from '@constants';


@Table
export default class channels extends Model {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Unique(true)
   @AllowNull(false)
   @Column
   frequency: string;

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

   static createFrequency (player: PlayerMp, frequency: number, password: string| null) {
      return channels.create( { frequency: frequency, password: password, owner: player.character.id } ).then(channel => {
         return channel;
      })
   }

   static doesExist (frequency: number) {
      return channels.findOne( { where: { frequency: frequency } } ).then(channel => {
         return channel ? channel : null;
      });
   }

   async changePassword (password: string) {
     await this.update('password', password);
   }
   
   async join (player: PlayerMp, radioItem: Items, frequency: string, password: string | null) {
      if (this.password != password) {
         // PORUKA: Pogresna sifra frekvencije
         return;
      }

      if (radioItem.data.frequency != '0') {
         // PORUKA: Vec ste u nekoj frekvenciji
         return;
      }

      radioItem.data.frequency = frequency;

      // PORUKA: Uspesno ste se pridruzili frekvenciji {frequency}
      await radioItem.save()
   }

   async leave (player: PlayerMp, radioItem: Items) {

      if (this.owner == player.character.id) {
         // PORUKA: Vi ste vlasnik ove frekvencije
         return;
      }

      radioItem.data.frequency = '0';
      // PORUKA: Napustili ste uspesno frekvenciju
      await radioItem.save();
   }

   async delete (player: PlayerMp) {
      if (this.owner != player.character.id) {
         // PORUKA: Niste vlasnik frekvencije
         return;
      }
      
      Items.findAll({ where: { item: itemNames.HANDHELD_RADIO }}).then(radios => {
         radios.forEach(async radio => {
            if (radio.data.frequency == this.frequency) {
               radio.data.frequency = '0';
               await radio.save()
            }
         })
      });

      // PORUKA: Frekvencija uspesno izbrisana
      await this.destroy();
   }

   send (sender: PlayerMp | null, message: string) {
      const by = sender ? sender.character.name : Lang.dispatcher;
      const freq = this.frequency.toString();
      
      mp.players.forEach(async player => {
         const equiped = await Items.hasEquiped(player, itemNames.HANDHELD_RADIO);
         if (equiped) {
            if (equiped.data.power && equiped.data.frequency == this.frequency) {
               player.sendMessage('[CH: ' + freq + '] ' + by + ': ' + message, colors.hex.RADIO);
            }
         }
      });
   }
}

