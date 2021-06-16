
const { DataTypes } = require('sequelize');


frp.Bans = frp.Database.define('ban', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Account: { type: DataTypes.INTEGER, defaultValue: null },
      Character: { type: DataTypes.INTEGER, defaultValue: null },
      IP: { type: DataTypes.STRING },
      Hardwer: { type: DataTypes.STRING },
      Social: { type: DataTypes.STRING },
      Issuer: { type: DataTypes.INTEGER, defaultValue: 0 },
      Reason: { type: DataTypes.STRING, defaultValue: 'Server' },
      Date: { type: DataTypes.STRING, defaultValue: Date.now() },
      Expiring: { type: DataTypes.STRING, defaultValue: Date.now() }
   }, {
      timestamps: false,
      underscrored: true,
      createdAt: false,
      updatedAt: false
   }
);


frp.Bans.prototype.New = async function (player, target, reason, date, expiring) { 
   let IP = frp.Main.ValidateIP(target);

   if (IP) { 
      let Account = await frp.Accounts.findOne({ where: { IP_Adress: IP } });
      if (Account) { 
         frp.Bans.create({ Account: Account.id, IP: IP, Hardwer: Account.Hardwer, Social: Account.Social_Club, Date: date, Expiring: expiring, Issuer: player.account });

      } else { 
         frp.Bans.create({ IP: IP, Reason: reason, Date: date, Expiring: expiring, Issuer: Issuer });

      }
   } else { 
      let Online = mp.players.find(target);
      if (Online) { 
         let Character = await frp.Characters.findOne({ where: { id: online.character }});
         let Account = await frp.Characters.findOne({ where: { id: online.account }});

         frp.Bans.create({ Account: Account.id, Character: Character.id, IP: player.ip, Hardwer: Account.Hardwer, Social: Account.Social_Club, Date: date, Expiring: expiring, Issuer: player.account });
         Online.kick(reason);
      } else { 
         let Account = await frp.Characters.findOne({ where: { Name: target }});

         if (Character) { 

         } else if (Account) { 

         }

      }
   }
};


(async () => {
    frp.Bans.sync();
})();
