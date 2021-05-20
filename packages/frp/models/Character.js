
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
      Bank: { type: DataTypes.BIGINT, defaultValue: 0 },

      Health: { type: DataTypes.INTEGER, defaultValue: 100 },
      Armour: { type: DataTypes.INTEGER, defaultValue: 100 },
      Hunger: { type: DataTypes.INTEGER, defaultValue: 100 },
      Thirst: { type: DataTypes.INTEGER, defaultValue: 100 },

      Last_Position: { type: DataTypes.TEXT },
      Spawn_Point: { type: DataTypes.INTEGER, defaultValue: 0 },
      Inside: { type: DataTypes.TEXT, defaultValue: 'no' },

      Muted: { type: DataTypes.INTEGER, defaultValue: 0 },
      Hours: { type: DataTypes.INTEGER, defaultValue: 0 },
      Minutes: { type: DataTypes.INTEGER, defaultValue: 0 },

      Mood: { type: DataTypes.STRING, defaultValue: 'normal' },
      Walking_Style: { type: DataTypes.STRING, defaultValue: 'normal' },

      Phone: { type: DataTypes.INTEGER, defaultValue: 0 },
      Radio: { type: DataTypes.INTEGER, defaultValue: 0 },

      Cuffed: { type: DataTypes.BOOLEAN, defaultValue: false },
      Freezed: { type: DataTypes.BOOLEAN, defaultValue: false },

      Mask: { type: DataTypes.INTEGER, defaultValue: 0 },
      Masked: { type: DataTypes.BOOLEAN, defaultValue: false }

   },
   {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "Register_Date",
      updatedAt: "Update_Date"
   }
);

(async () => { 
   frp.Characters.sync();
})();


/**
* Spawning Player and Assigning Character to Player
* @instance
* @function spawn
* @return {Function} Enter functions.
* @memberof Characters
*/

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
   let Appearance = await frp.Appearances.findOne({ where: { id: this.id } });
   Appearance.Apply(this, player);

   // spawning player on desired point
   switch (this.Spawn_Point) { 
      case 0: { 
         player.position = frp.Settings.default.spawn;
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

frp.Characters.prototype.SetHealth = function (player, value) { 
   this.Health = value;
   player.health = this.Health;
};

frp.Characters.prototype.SetArmour = function (player, value) { 
   this.Armour = value;
   player.armour = this.Armour;
};

frp.Characters.prototype.GiveMoney = function (player, value) { 
   this.Money += value;
   player.setVariable('Money', this.Money);
};

frp.Characters.prototype.SetMoney = function (player, value) { 
   this.Money = value;
   player.setVariable('Money', this.Money);
};

frp.Characters.prototype.SetJob = function (player, value) { 
   this.Job = value;
   player.setVariable('Job', this.Job);
};



// METODE KLASE

frp.Characters.SaveAll = function () { 

};



// frp.Characters.create({ Name: 'Zachary Parker', Account: 2 });
// frp.Characters.create({ Name: 'Valele Gay', Account: 2 });