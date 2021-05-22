

const { DataTypes } = require('sequelize');

frp.Bank = frp.Database.define('Bank', {
      Number: { type: DataTypes.INTEGER, unique: true },
      Pin: { type: DataTypes.INTEGER, allowNull: false },
      Balance: { type: DataTypes.INTEGER, defaultValue: 0 },
      Savings: { type: DataTypes.INTEGER, defaultValue: 0 },
      Paycheck: { type: DataTypes.INTEGER, defaultValue: 0 },
      Credit: { type: DataTypes.INTEGER, defaultValue: 0 },
      Active: { type: DataTypes.BOOLEAN, defaultValue: true }

   },

   {
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date"
   }
);


frp.Bank.prototype.Withdraw = async function (player, value) { 
   let Character = await player.Character();

   Character.GiveMoney(player, value);
   await this.increment('Balance', { by: -value });
   // PORUKA: Uspesno ste podigli toliko i toliko novca
};


frp.Bank.prototype.Deposit = async function (player, value) { 
   let Character = await player.Character();

   Character.GiveMoney(player, -value);
   await this.increment('Balance', { by: value });
   // PORUKA: Uspesno ste ostavili novac
};


frp.Bank.prototype.Transfer = async function (player, target, value) { 

   const TargetCharacter = await target.Character();
   const Target = await frp.Bank.findOne({ where: { Number: TargetCharacter.Bank } });

   this.increment('Balance', { by: -value });
   Target.increment('Balance', { by: value });

   // PORUKA: Uspesno se prebacili value na racun target
};


(async () => { 
   frp.Bank.sync();
})();