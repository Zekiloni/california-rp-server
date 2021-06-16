'use strict';


const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
const { DataTypes } = require('sequelize');


frp.Accounts = frp.Database.define('account', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Username: { type: DataTypes.STRING, unique: true },
      Email: { type: DataTypes.STRING, unique: true },
      Password: { type: DataTypes.STRING },
      Administrator: { type: DataTypes.INTEGER, defaultValue: 0 },
      Admin_Code: { type: DataTypes.INTEGER, defaultValue: 0 },
      Login_Date: { type: DataTypes.DATE },
      IP_Adress: { type: DataTypes.STRING },
      Social_Club: { type: DataTypes.STRING, unique: true },
      Hardwer: { type: DataTypes.STRING, unique: true },
      Warns: { type: DataTypes.INTEGER, defaultValue: 0 },
      Donator: { type: DataTypes.INTEGER, defaultValue: 0 },
      Coins: { type: DataTypes.INTEGER, defaultValue: 0 },
      Online: { type: DataTypes.INTEGER, defaultValue: false },
      Last_Character: { type: DataTypes.INTEGER, defaultValue: 0 }
      
   }, 
   {
      timestamps: true,
      underscrored: true,
      createdAt: "Register_Date",
      updatedAt: "Update_Date"
   }
);


frp.Accounts.beforeCreate(async (account, options) => {
   const hashed = await bcrypt.hash(account.Password, salt);
   account.Password = hashed;
});


frp.Accounts.prototype.login = function (password) {
   return bcrypt.compareSync(password, this.Password);
};


frp.Accounts.prototype.SetLogged = async function (player, value, character) {
   this.Online = value;
   this.Last_Character = character;
   this.Login_Date = frp.Database.literal('CURRENT_TIMESTAMP');
   this.IP_Adress = player.ip;
   
   if (this.Hardwer == null || this.Social_Club == null) {
      this.Hardwer = player.serial;
      this.Social_Club = player.socialClub;
   }

   await this.save();
   this.Logged = value;
   player.setVariable('logged', this.Logged);
};

frp.Accounts.prototype.SetAdmin = async function (player, value) {
   this.Administrator = value;
   this.Admin_Code = frp.Main.GenerateNumber(5);
   
   player.sendMessage(`Dodeljen vam je admin level ${value}.
                       Admin kod: ${this.Admin_Code}, zapišite negde svoj admin kod.`, frp.Globals.Colors.info);
   await this.save();
};


(async () => {
   frp.Accounts.sync();

   // await frp.Accounts.create({ Username: 'Zekiloni', Password: 'test', Administrator: 6 });
   // await frp.Accounts.create({ Username: 'Kopra', Password: 'test', Administrator: 6 });
   // await frp.Accounts.create({ Username: 'Petron', Password: 'test', Administrator: 5 });
   // await frp.Accounts.create({ Username: 'The Primus', Password: 'test', Administrator: 4 });
   // await frp.Accounts.create({ Username: 'Batocanin', Password: 'test', Administrator: 4 });
   // await frp.Accounts.create({ Username: 'Bolic', Password: 'test', Administrator: 4 });
   // await frp.Accounts.create({ Username: 'GranTH', Password: 'test', Administrator: 4 });
   // await frp.Accounts.create({ Username: 'Knife', Password: 'test', Administrator: 6 });
   // await frp.Accounts.create({ Username: 'Hawkins', Password: 'test', Administrator: 4 });
   // await frp.Accounts.create({ Username: 'bluakt', Password: 'test', Administrator: 4 });
   // await frp.Accounts.create({ Username: 'Valele', Password: 'test', Administrator: 3 });

})();

