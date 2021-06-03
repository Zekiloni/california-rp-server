

const { DataTypes } = require('sequelize');

const BusinessTypes = require('../data/Businesses.json');

frp.Business = frp.Database.define('Business', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Name: { type: DataTypes.STRING },
      Type: { type: DataTypes.INTEGER, defaultValue: 0 },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Price: { type: DataTypes.INTEGER, defaultValue: 0 },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
      Products: { type: DataTypes.INTEGER, defaultValue: 200 },
      Cash: { type: DataTypes.INTEGER, defaultValue: 0 },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      Position: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Position')); },
         set: function (value) { this.setDataValue('Position', JSON.stringify(value)); }
      },
      Interior: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Interior')); },
         set: function (value) { this.setDataValue('Interior', JSON.stringify(value)); }
      },
      Interior_Dimension: { type: DataTypes.INTEGER, defaultValue: this.id },
      IPL: { type: DataTypes.STRING, defaultValue: null },
      Workers: {
         type: DataTypes.TEXT, defaultValue: '[]',
         get: function () { return JSON.parse(this.getDataValue('Workers')); },
         set: function (value) { this.setDataValue('Workers', JSON.stringify(value)); }
      }
   },
   {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date",
   }
);


frp.Business.prototype.Init = async function () {
   if (this.colshape && this.blip) return;
   if (this.Position && this.Rotation) {
      this.colshape = mp.colshapes.newRectangle(this.Position.x, this.Position.y, 3, 2, 0);
      this.colshape.business = this.id;
      this.blip = mp.blips.new(40, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 36, shortRange: true });
      await this.Refresh();
   }
};


frp.Business.prototype.Refresh = async function () {
   this.Owner == 0 ? (this.blip.color = 1) : (this.blip.color = 2);
};


frp.Business.prototype.Buy = async function (player) {
   let Character = await player.Character();

   if (this.Owner != 0) return; // PORUKA: Neko vec poseduje ovaj biznis
   if (this.Price > Character.Money) return; // PORUKA: Nemate dovoljno novca

   this.Owner = Character.id;
   Character.GiveMoney(player, -this.Price);
   // PORUKA: Uspesno ste kupili biznis
   await this.save();
};


frp.Business.prototype.Sell = async function (player, target = 0, price = 0) {
   let Character = await player.Character();
   if (price == 0) price = (this.Price / 100) * 65;

   Character.GiveMoney(player, price);
   this.Owner = target;

   if (target != 0) {
      let TargetCharacter = await target.Character();
      TargetCharacter.GiveMoney(player, -price);
      // PORUKA: targetu Uspesno ste kupiili biznis od player.name za price
   }
   // PORUKA: Prodali ste biznis
   await this.save();
};


frp.Business.prototype.WorkersAdd = async function (player) {
   let Workers = this.Workers;
   Workers.push(player.character);
   this.Workers = Workers;
   // PORUKA: Uspesno ste zaposlili igraca da radi u vas biznis
   await this.save();
};


frp.Business.prototype.WorkersRemove = async function (player) {
   let Workers = this.Workers;
   let x = Workers.find(worker => worker === player);
   let i = Workers.indexOf(x);
   Workers.splice(i, 1);
   this.Workers = Workers;
   // PORUKA: Uspesno ste dali otkaz igracu koji je radio u vasem biznisu
   await this.save();
};


(async () => {
   frp.Business.sync();

   const Businesses = await frp.Business.findAll();
   Businesses.forEach(async (Bussines) => {
      await Bussines.Init();
   });

   frp.Main.Terminal(3, Businesses.length + ' Businesses Loaded !');
})();


