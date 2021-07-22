

import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default } from 'sequelize-typescript'

@Table
class Account extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   id: number

   @Column
   @Unique(true)
   Username: string

   @Column
   @Unique(true)
   Email: string

   @Column
   Password: string

   @Column
   @Default(0)
   Administrator: number

   @Column
   @Default(null)
   Login_Date: Date

   @Column
   @Default(null)
   IP_Adress: string

   @Column
   @Default(null)
   Social_Club: string
   
   @Column
   @Default(null)
   Hardwer: string

   @Column
   @Default(0)
   Warns: number

   @Column
   @Default(0)
   Donator: number

   @Column
   @Default(0)
   Coins: number

   @Column
   @Default(false)
   Online: boolean

   @Column
   @Default(null)
   Last_Character: number

   @Column
   Created_At: Date;

   @Column
   Updated_At: Date;

   Login () { 

   }
}



// frp.Accounts = frp.Database.define('account', {

      
//    }, 
//    {
//       timestamps: true,
//       underscrored: true,
//       createdAt: "Register_Date",
//       updatedAt: "Update_Date"
//    }
// );


// frp.Accounts.beforeCreate(async (account, options) => {
//    const Hashed = await bcrypt.hash(account.Password, salt);
//    account.Password = Hashed;
// });


// frp.Accounts.prototype.Login = function (password) {
//    return bcrypt.compareSync(password, this.Password);
// };


// frp.Accounts.prototype.SetLogged = async function (player, value, character) {
//    this.Online = value;
//    this.Last_Character = character;
//    this.Login_Date = frp.Database.literal('CURRENT_TIMESTAMP');
//    this.IP_Adress = player.ip;
   
//    if (this.Hardwer == null || this.Social_Club == null) {
//       const Already = await frp.Accounts.findOne({ where: { Social_Club: player.socialClub, Hardwer: player.serial } });
//       if (Already) player.kick('Korisnicki racun sa tim socialom vec postoji');
//       this.Hardwer = player.serial;
//       this.Social_Club = player.socialClub;
//    }

//    await this.save();
//    this.Logged = value;
//    player.setVariable('logged', this.Logged);
// };

// frp.Accounts.prototype.SetAdmin = async function (player, value) {
//    this.Administrator = value;
//    this.Admin_Code = frp.Main.GenerateNumber(5);
   
//    player.SendMessage(`Dodeljen vam je admin level ${value}.
//                        Admin kod: ${this.Admin_Code}, zapišite negde svoj admin kod.`, frp.Globals.Colors.info);
//    await this.save();
// };


// (async () => {
//    await frp.Accounts.sync({ force: true });

//    await frp.Accounts.create({ Username: 'Zekiloni', Password: 'test', Administrator: 6 });
//    // await frp.Accounts.create({ Username: 'Kopra', Password: 'test', Administrator: 6 });
//    // await frp.Accounts.create({ Username: 'Petron', Password: 'test', Administrator: 5 });
//    // await frp.Accounts.create({ Username: 'Bolic', Password: 'test', Administrator: 4 });
//    // await frp.Accounts.create({ Username: 'GranTH', Password: 'test', Administrator: 4 });
//    // await frp.Accounts.create({ Username: 'Deker', Password: 'test', Administrator: 6 });
//    // await frp.Accounts.create({ Username: 'Mile', Password: 'test', Administrator: 6 });
//    // await frp.Accounts.create({ Username: 'Tihi', Password: 'test', Administrator: 6 });

// })();

