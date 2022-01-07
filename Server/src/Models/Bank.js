// const { DataTypes } = require('sequelize');


// frp.Bank = frp.Database.define('bank', {
//       Number: { type: DataTypes.INTEGER, unique: true },
//       Pin: { type: DataTypes.INTEGER, allowNull: false },
//       Character: { type: DataTypes.INTEGER, allowNull: false },
//       Balance: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Savings: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Paycheck: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Credit: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Credit_Date: { type: DataTypes.DATE },
//       Active: { type: DataTypes.BOOLEAN, defaultValue: true }
//    }, {
//       timestamps: true,
//       underscrored: true,
//       createdAt: 'Created_Date',
//       updatedAt: 'Update_Date'
//    }
// );


// frp.Bank.New = async function (player) {
//    const Pin = frp.Main.GenerateNumber(4);
//    const Number;
//    frp.Bank.create({});
//    return;
// };


// frp.Bank.prototype.Withdraw = async function (player, value) {
//     let Character = await player.Character();
//     Character.GiveMoney(player, value);
//     await this.increment('Balance', { by: -value });
//     // PORUKA: Uspesno ste podigli toliko i toliko novca
// };


// frp.Bank.prototype.Deposit = async function (player, value) {
//     let Character = await player.Character();
//     Character.GiveMoney(player, -value);
//     await this.increment('Balance', { by: value });
//     // PORUKA: Uspesno ste ostavili novac
// };


// frp.Bank.prototype.Tax = async function (player, earnings) {
//    const Character = await player.Character();
//    const { Vehicles, Houses, Businesses } = await Character.Properties();

//    let Tax = 0;

//    Houses.forEach(House => {
//       Tax += (House.Price / 100) * frp.Settings.Taxes.House;
//    });

//    Vehicles.forEach(Vehicle => {
//       Tax += (Vehicle.Price / 100) * frp.Settings.Taxes.Vehicle;
//    });

//    Businesses.forEach(Business => {
//       Tax += (Business.Budget / 100) * frp.Settings.Taxes.Business;
//    });

//    if (earnings > 20) Tax += (earnings / 100) * frp.Settings.Taxes.Salary;

//    let Rest = earnings - Tax;
//    this.increment('Paycheck', { by: Rest });

//    // PORUKA: Payday je stigao, zaradio earnings, taksa je tax, ostalo earnings - tax;
// };


// frp.Bank.prototype.Payday = async function (player) {
//    let Character = await player.Character();
//    let Value = 0;
//    let Between = frp.Main.Between;

//    Value += Between(445, 455);

//    if (Character.Hours < 8) Value += Between(85, 95);

//    if (Character.Job != 0) {
//       Value += Between(75, 85);
//       Value += Character.Salary;
//       Character.Salary = 0;
//    }

//    if (this.Savings > 500) {
//       const Take = this.Savings / 50;
//       this.increment('Savings', { by: Take });
//    }

//    // OSTALA PROVERA DA LI JE U LAW / FMD FAKCIJI
//    await Character.save();
//    await this.Tax(player, Value);
// };


// frp.Bank.prototype.Transfer = async function (player, target, value) {
//     const TargetCharacter = await target.Character();
//     const Target = await frp.Bank.findOne({ where: { Number: TargetCharacter.Bank } });
//     this.increment('Balance', { by: -value });
//     Target.increment('Balance', { by: value });
//     // PORUKA: Uspesno se prebacili value na racun target
// };


// (async () => {
//     frp.Bank.sync();
// })();
