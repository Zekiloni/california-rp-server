const { DataTypes } = require('sequelize');
frp.Characters = frp.Database.define('Character', {
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
      Masked: { type: DataTypes.BOOLEAN, defaultValue: false }
   }, {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "Register_Date",
      updatedAt: "Update_Date"
   }
);


frp.Characters.prototype.Spawn = async function (player) {
   let account = await player.Account();

   account.SetLogged(player, true, this.id);
   player.character = this.id;
   player.name = this.Name;
   player.setVariable('spawned', true);

   // setting money & health
   this.SetHealth(player, this.Health);
   this.SetMoney(player, this.Money);

   // aplyying appearance & clothing
   //let Appearance = await frp.Appearances.findOne({ where: { id: this.id } });
   // Appearance.Apply(this, player);
   // spawning player on desired point

   switch (this.Spawn_Point) {
      case 0: {
         player.position = frp.Settings.default.spawn;
         player.dimension = frp.Settings.default.dimension;
         break;
      }
      case 1: {
         const Position = JSON.parse(this.Last_Position);
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


frp.Characters.prototype.SetArmour = async function (player, value) {
   this.Armour = value;
   player.armour = this.Armour;
   await this.save();
};


frp.Characters.prototype.GiveMoney = async function (player, value) {
   let Money = await this.increment('Money', { by: value });
   await player.setVariable('Money', this.Money);
};


frp.Characters.prototype.SetMoney = async function (player, value) {
   this.Money = value;
   player.setVariable('Money', this.Money);
   await this.save();
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


frp.Characters.prototype.SetJob = function (player, value) {
   this.Job = value;
   player.setVariable('Job', this.Job);
};


frp.Characters.prototype.LicenseAdd = function (license) {
   let Licenses = this.Licenses;
   Licenses.push(license);
   this.Licenses = Licenses;
};


frp.Characters.prototype.RemoveLicense = function (license) {
   let Licenses = this.Licenses;
   let x = Licenses.find(name => name === license);
   let i = Licenses.indexOf(x);
   Licenses.splice(i, 1);
   this.Licenses = Licenses;
};


frp.Characters.prototype.Properties = async function () {
   const Houses = await frp.Houses.findAll({ where: { Owner: this.id } });
   const Businesses = await frp.Business.findAll({ where: { Owner: this.id } });
   const Vehicles = await frp.Business.findAll({ where: { Owner: this.id } });
   return { Vehicles: Vehicles, Houses: Houses, Businesses: Businesses };
};


frp.Characters.New = async function (player, informations) { 
   const Character = JSON.parse(informations);

   const Bank = await frp.Bank.New(player);


   let NewCharacter = await frp.Characters.create({
      Name: Character.First_Name + ' ' + Character.Last_Name,
      Birth: Character.Birth, Origin: Character.Origin,
      Gender: Character.Gender, Armour: 0, Health: 100
   });

   let NewAppearance = await frp.Appearances.create({
      Character: NewCharacter.id, 
      Hair: Appearance.Hair, Beard: Appearance.Beard, Eyes: Appearance.Eyes,
      Shirt: Appearance.Shirt, Undershirt: Appearance.Undershirt, 
      Legs: Appearance.Legs, Shoes: Appearance.Shoes, 
      Bags: [0, 0], Armour: [0, 0], Mask: [0, 0], 
   });


   await Character.Spawn(player);
};


(async () => {
   frp.Characters.sync();

 //  await frp.Characters.create({ Name: 'Zachary Parker', Account: 2, Licenses: ["Driving", "Driving"] });

})();


//   frp.Characters.create({ Name: 'Valele Gipsy', Account: 2 });
//    frp.Characters.create({ Name: 'Pepsi Gay', Account: 2, Licenses: ["Driving"] });
