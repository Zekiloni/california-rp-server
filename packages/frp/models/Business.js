

const { DataTypes } = require('sequelize');

const BusinessTypes = require('../data/Businesses.json');

frp.Business = frp.Database.define('business', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Name: { type: DataTypes.STRING },
      Type: { type: DataTypes.INTEGER, defaultValue: 0 },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Walk_in: { type: DataTypes.BOOLEAN, defaultValue: false },
      Price: { type: DataTypes.INTEGER, defaultValue: 0 },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
      Budget: { type: DataTypes.INTEGER, defaultValue: 0 },
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
      },
      Products: { 
         type: DataTypes.TEXT, defaultValue: '{}',
         get: function () { return JSON.parse(this.getDataValue('Products')); },
         set: function (value) { this.setDataValue('Products', JSON.stringify(value)); }
      },
      GameObject: { 
         type: DataTypes.VIRTUAL, defaultValue: null,
         get () { 
            return frp.GameObjects.Businesses[this.getDataValue('id')];
         },
         set (x) { 
            frp.GameObjects.Businesses[this.getDataValue('id')] = x;
         }
      }
   },
   {
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date',
   }
);



frp.Business.New = async function (player, type, walkin, price) {

   if (!BusinessTypes[type]) return;

   const Position = player.position;
   const Dimension = player.dimension;
   const Walk_in = walkin == 1 ? true : false;
   const Default = BusinessTypes[type];

   const Business = await frp.Business.create({ Name: Default.name, Type: type, Price: price, Walk_in: Walk_in, Products: Default.products, Position: Position, Dimension: Dimension });
};


frp.Business.afterCreate(async (Business, Options) => {
   Business.Refresh();
});


frp.Business.prototype.Refresh = function () {

   const Info = BusinessTypes[this.Type];

   if (this.GameObject == null) { 
      const GameObjects = { 
         colshape: mp.colshapes.newRectangle(this.Position.x, this.Position.y, 3, 2, 0),
         blip: mp.blips.new(Info.blip, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
      };


      mp.events.add('playerEnterColshape', (player, shape) => { 
         if (shape.id == GameObjects.colshape.id) { 
            player.SendMessage('Biznis ' + this.Name + ', id ' + this.id + ', cena ' + this.Price, frp.Globals.Colors.info);
            console.log(this);
            console.log(shape);  
         }
      });


      if (Info.color) GameObjects.blip.color = Info.color;

      this.GameObject = GameObjects;
   } 
};


frp.Business.prototype.Buy = async function (player) {
   const Character = await player.Character();

   if (this.Owner != 0) return; // PORUKA: Neko vec poseduje ovaj biznis
   if (this.Price > Character.Money) return; // PORUKA: Nemate dovoljno novca

   this.Owner = Character.id;
   Character.GiveMoney(player, -this.Price);
   // PORUKA: Uspesno ste kupili biznis
   await this.save();
};


frp.Business.prototype.Menu = async function (player) { 
   console.log('menu', 1)
   switch (this.Type) { 
      case frp.Globals.Business.Types.VehicleDealership: { 
         player.call('client:business:menu', ['dealership', this]);
         break;
      }

      case frp.Globals.Business.Types.Rent: { 
         player.call('client:business:menu', ['rent', this]);
         break;
      }

      case frp.Globals.Business.Types.Restaurant: { 
         player.call('client:business:menu', ['restaurant', this]);
         break;
      }

      case frp.Globals.Business.Types.Cafe: { 
         player.call('client:business:menu', ['drinks', this]);
         break;
      }

      case frp.Globals.Business.Types.NightClub: { 
         player.call('client:business:menu', ['drinks', this]);
         break;
      }

      case frp.Globals.Business.Types.Clothing: { 
         player.call('client:business:menu', ['clothing']);
         break;
      }
      
      default:
         player.call('client:business.market:menu', [this]); console.log('menu market', 1)

   }
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


frp.Business.prototype.AddProduct = async function (player, product, multiplier, amount = 5) {
   let Products = this.Products;
   Products[product] = { price: multiplier, supplies: amount };
   this.Products = Products;
   // PORUKA: Uspesno ste dodali produkt u vas bizni
   await this.save();
   return this.Products;
};

frp.Business.prototype.EditProduct = async function (player, product, multiplier) {
   let Products = this.Products;
   Products[product] = multiplier;
   this.Products = Products;
   // PORUKA: Uspesno ste editovali produkt
   await this.save();
};

frp.Business.prototype.RemoveProduct = async function (player, product) {
   let Products = this.Products;
   delete Products[product];
   this.Products = Products;
   // PORUKA: Uspesno ste izbrisali produkt
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
   await frp.Business.sync();

   const Businesses = await frp.Business.findAll();
   Businesses.forEach((Bussines) => {
      Bussines.Refresh();
   });


   frp.Main.Terminal(3, Businesses.length + ' Businesses Loaded !');
})();


