const { DataTypes, BOOLEAN } = require('sequelize');
const { ItemEntities } = require('../classes/Items.Registry');

let Appearance = require('./Appearance');


frp.Characters = frp.Database.define('character', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Account: { type: DataTypes.INTEGER, allowNull: false },
      Name: { type: DataTypes.STRING, unique: true },
      Gender: { type: DataTypes.TINYINT, defaultValue: 0 },
      Birth: { type: DataTypes.DATEONLY },
      Origin: { type: DataTypes.STRING, defaultValue: 'Los Santos' },

      Faction: { type: DataTypes.INTEGER, defaultValue: 0 },
      Faction_Rank: { type: DataTypes.STRING, defaultValue: 'none' },
      Faction_Perms: { type: DataTypes.INTEGER, defaultValue: 0 },
      Job: { type: DataTypes.INTEGER, defaultValue: 0 },
      Money: { type: DataTypes.INTEGER, defaultValue: 3000 },
      Salary: { type: DataTypes.INTEGER, defaultValue: 0 },

      Health: { type: DataTypes.INTEGER, defaultValue: 100 },
      Armour: { type: DataTypes.INTEGER, defaultValue: 100 },
      Hunger: { type: DataTypes.INTEGER, defaultValue: 100 },
      Thirst: { type: DataTypes.INTEGER, defaultValue: 100 },
      Wounded: { 
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Wounded')); },
         set: function (value) { this.setDataValue('Wounded', JSON.stringify(value)); }
      },
      

      Last_Position: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Last_Position')); },
         set: function (value) { this.setDataValue('Last_Position', JSON.stringify(value)); }
      },
      Spawn_Point: { type: DataTypes.INTEGER, defaultValue: 0 },
      Inside: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Inside')); },
         set: function (value) { this.setDataValue('Inside', JSON.stringify(value)); }
      },

      Muted: { type: DataTypes.INTEGER, defaultValue: 0 },
      Hours: { type: DataTypes.INTEGER, defaultValue: 0 },
      Minutes: { type: DataTypes.INTEGER, defaultValue: 0 },
      Mood: { type: DataTypes.STRING, defaultValue: 'normal' },
      Walking_Style: { type: DataTypes.STRING, defaultValue: 'normal' },

      Phone: { type: DataTypes.INTEGER, defaultValue: 0 },
      Frequency: { type: DataTypes.INTEGER, defaultValue: 0 },
      Licenses: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Licenses')); },
         set: function (value) { this.setDataValue('Licenses', JSON.stringify(value)); }
      },
      Cuffed: { type: DataTypes.BOOLEAN, defaultValue: false },
      Freezed: { type: DataTypes.BOOLEAN, defaultValue: false },
      Mask: { type: DataTypes.INTEGER, defaultValue: 0 },
      Masked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Rented_Vehicle: { 
         type: DataTypes.VIRTUAL, defaultValue: null,
         get () { return frp.GameObjects.TemporaryVehicles.find(vehicle => vehicle.character === this.getDataValue('id')); },
         set (x) { frp.GameObjects.TemporaryVehicles.push(x); }
      } 
   }, {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: 'Register_Date',
      updatedAt: 'Update_Date'
   }
);


frp.Characters.prototype.Spawn = async function (player) {
   let account = await player.Account();

   try { 
      await account.SetLogged(player, true, this.id);
   } catch (e) { 
      console.log(e);
   }
   player.character = this.id;
   player.name = this.Name;
   player.setVariable('spawned', true);

   // setting money & health
   this.SetHealth(player, this.Health);
   this.SetMoney(player, this.Money);

   player.setVariable('Job', this.Job);


   player.data.Wounded = this.Wounded;
   if (this.Wounded) { 

   }
   
   player.data.Bubble = null;
   player.data.Seatbelt = false;

   await player.call('client:player.interface:toggle');
   await player.Notification('Dobrodošli na Focus Roleplay ! Uživajte u igri.', frp.Globals.Notification.Info, 4);

   // Applying appearance & clothing
   const Appearance = await frp.Appearances.findOne({ where: { Character: this.id } });
   if (Appearance) Appearance.Apply(player, this.Gender);
   
   // spawning player on desired point
   switch (this.Spawn_Point) {
      case 0: {
         player.position = frp.Settings.default.spawn;
         player.heading = frp.Settings.default.heading;
         player.dimension = frp.Settings.default.dimension;
         break;
      }
      case 1: {
         const Position = this.Last_Position;
         if (this.Last_Position) 
            player.position = new mp.Vector3(Position.x, Position.y, Position.z);
            player.dimension = frp.Settings.default.dimension; // promeniti posle na last dimension
         break;
      }
      case 2: {
         break;
      }
   }
};


frp.Characters.prototype.SetHealth = async function (player, value) {
   this.Health = value;
   player.health = this.Health;
   await this.save();
};


frp.Characters.prototype.SetSpawn = async function (point) {
   this.Spawn_Point = point;
   await this.save();
};


frp.Characters.prototype.Wound = async function (player, info = null) { 
   if (this.Wounded) { 
      // play animation / freeze
   } else { 
      // put info and wound him
   }
};


frp.Characters.prototype.SetArmour = async function (player, value) {
   this.Armour = value;
   player.armour = this.Armour;
   await this.save();
};


frp.Characters.prototype.GiveMoney = async function (player, value) {
   let Money = await this.increment('Money', { by: value });
   await player.setVariable('Money', this.Money + value);
};


frp.Characters.prototype.SetMoney = async function (player, value) {
   this.Money = value;
   player.setVariable('Money', value);
   await this.save();
};


frp.Characters.prototype.SetMood = function (player, mood) { 
   this.Mood = mood;
   player.setVariable('Mood', mood);
};


frp.Characters.prototype.SetWalkingStyle = function (player, style) {
   this.Walking_Style = style;
   player.setVariable('Walking_Style', style);
};


frp.Characters.prototype.Cuff = function (player) { 
   this.Cuffed = !this.Cuffed;
   player.setVariable('Cuffed', this.Cuffed);
   return this.Cuffed;
};


frp.Characters.prototype.UnRentVehicle = function (player) {
   if (this.Rented_Vehicle && this.Rented_Vehicle.Timer) {
      clearTimeout(this.Rented_Vehicle.Timer);
      this.Rented_Vehicle.destroy();
   }
}

frp.Characters.prototype.ExtendRent = function (player, minutes) {
   if (this.Rented_Vehicle && this.Rented_Vehicle.Timer) {
      clearTimeout(this.Rented_Vehicle.Timer);
      this.Rented_Vehicle.Timer = setTimeout(() => {
         frp.Characters.prototype.UnRentVehicle(player);
      }, 60000 * minutes);
   }
}

frp.Characters.prototype.RentVehicle = function (player, model, business, minutes = 30) {
   if (frp.Main.IsAnyVehAtPos(business.Vehicle_Point)) {
      const Vehicle = mp.vehicles.new(model, business.Vehicle_Point,
      {
            heading: 180,
            numberPlate: 'RENT',
            alpha: 255,
            color: 0,
            locked: true,
            engine: false,
            dimension: player.dimension
      });
      this.Rented_Vehicle = Vehicle;
      this.Rented_Vehicle.Timer = setTimeout(() => {
         frp.Characters.prototype.UnRentVehicle(player);
      }, 60000 * minutes);
   } else { player.notification('Mesto za isporuku vozila je trenutno zauzeto.', NOTIFY_ERROR, 4); }
};

frp.Characters.prototype.Enter = async function (player, type, id) { 
   switch (type) { 
      case 'house': { 
         const House = await frp.Houses.findOne({ where: { id: id }});
         player.position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
         player.dimension = House.Interior_Dimension;
         if (House.IPL != null) player.call('client:interior:request.ipl', House.IPL);
         break;
      }

      case 'business': { 
         const Business = await frp.Business.findOne({ where: { id: id }});
         player.position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
         player.dimension = Business.Interior_Dimension;
         if (Business.IPL != null) player.call('client:interior:request.ipl', Business.IPL);
         break;
      }

      case 'entrance': { 
         const Entrance = frp.Entrances[id];
         player.position = new mp.Vector3(Entrance.Position.x, Entrance.Position.y, Entrance.Position.z);
         player.dimension = Entrance.Interior_Dimension;

         break;
      }

      default:
         return;
   }

   let Inside = { type: type, id: id };
   this.Inside = Inside
   player.Inside = Inside;
   await this.save();
};


frp.Characters.prototype.Exit = async function (player) { 
   if (player.Inside)  {
      const Inside = player.Inside;
      player.Inside = null;
      this.Inside = null;

      switch (Inside.type) { 
         case 'house': { 
            const House = await frp.Houses.findOne({ where: { id: Inside.id }});
            player.position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
            player.dimension = House.Dimension;
            if (House.IPL != null) player.call('client:interior:request.ipl', House.IPL);
            break;
         }
   
         case 'business': { 
            const Business = await frp.Business.findOne({ where: { id: Inside.id }});
            player.position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
            player.dimension = Business.Dimension;
            if (Business.IPL != null) player.call('client:interior:request.ipl', Business.IPL);
            break;
         }
   
         case 'entrance': { 
            const Entrance = frp.Entrances[Inside.id];
            player.position = new mp.Vector3(Entrance.Position.x, Entrance.Position.y, Entrance.Position.z);
            player.dimension = Entrance.Dimension;
   
            break;
         }
   
         default:
            return;
      }
      
   }

   await this.save();
};


frp.Characters.prototype.SetAdmin = async function (level) { 
   this.Admin = level;
   await this.save();
};


frp.Characters.prototype.Buy = async function (player, Nearest, action) { 

   console.log('buy', 1)
   if (action) { 
      console.log('akcija ' + action);
      console.log('buy action', 1)


   } else { 
      console.log('buy', 2)

      switch (true) { 
         case Nearest instanceof frp.Business: {
            console.log('buy', 3)
            Nearest.Menu(player);
            break;
         }
   
         case Nearest instanceof frp.Houses: { 
            console.log('buy', 4)

            break;
         }
   
         default: console.log('nidje');
      }
      console.log('buy', 5)

   }
   console.log('buy', 6)

};


frp.Characters.prototype.SetJob = function (player, value) {
   this.Job = value;
   player.setVariable('Job', value);
   await this.save();
};


frp.Characters.prototype.LicenseAdd = async function (license) {
   let Licenses = this.Licenses;
   Licenses.push(license);
   this.Licenses = Licenses;
   await this.save();
};


frp.Characters.prototype.RemoveLicense = async function (license) {
   let Licenses = this.Licenses;
   let x = Licenses.find(name => name === license);
   let i = Licenses.indexOf(x);
   Licenses.splice(i, 1);
   this.Licenses = Licenses;
   await this.save();
};


frp.Characters.prototype.Properties = async function () {
   const Houses = await frp.Houses.findAll({ where: { Owner: this.id } });
   const Businesses = await frp.Business.findAll({ where: { Owner: this.id } });
   const Vehicles = await frp.Business.findAll({ where: { Owner: this.id } });
   return { Vehicles: Vehicles, Houses: Houses, Businesses: Businesses };
};

frp.Characters.prototype.Appearance = async function () { 
   const appearance = await frp.Appearances.findOne({ where: { Character: this.id }});
   return appearance ? appearance : null;
};

frp.Characters.afterCreate(async (Character, Options) => {
   const Appearance = await frp.Appearances.findOne({ where: { Character: Character.id }});
   if (Appearance) { 
      Appearance.destroy();
   }
});

frp.Characters.New = async function (player, Character) { 
   // const Bank = await frp.Bank.New(player);

   console.log(Character);

   const Created = await frp.Characters.create({
      Account: player.account, Name: Character.First_Name + ' ' + Character.Last_Name,
      Birth: Character.Birth, Origin: Character.Origin, Gender: Character.Gender, 
      Armour: 0, Health: 100
   });

   const Appearance = await frp.Appearances.create({
      Character: Created.id, Blend_Data: Character.Blend, Overlays: Character.Overlays, 
      Overlays_Colors: Character.Overlays_Colors, Hair: Character.Hair, Beard: Character.Beard, 
      Eyes: Character.Eyes, Face_Features: Character.Face
   });

   Character.Clothing.forEach(async (Clothing) => { 
      const [item, value] = Clothing;
      const Cloth = await frp.Items.New(item, 1, ItemEntities.Equiped, Created.id, null, null, 0, 0, { Drawable: value, Texture: 0 });
      Cloth.Equip(player);
   })

   if (Created) return Created;

};


(async () => {
   frp.Characters.sync();

   // await frp.Characters.create({ Name: 'Zachary Parker', Account: 1 });
   // await frp.Characters.create({ Name: 'Tester 1', Account: 2 });
   // await frp.Characters.create({ Name: 'Tester Dva', Account: 3 });
   // await frp.Characters.create({ Name: 'Tester Tri', Account: 4 });
   // await frp.Characters.create({ Name: 'Tester Cetri', Account: 5 });
   // await frp.Characters.create({ Name: 'Tester Pet', Account: 6 });
   // await frp.Characters.create({ Name: 'Tester Sest', Account: 7 });
   // await frp.Characters.create({ Name: 'Tester Sedam', Account: 8 });
   // await frp.Characters.create({ Name: 'Tester Osam', Account: 9 });
   // await frp.Characters.create({ Name: 'Tester Devet', Account: 10 });
   // await frp.Characters.create({ Name: 'Tester Deset', Account: 11 });

})();


