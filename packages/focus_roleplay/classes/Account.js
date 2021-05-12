

mp.accounts = {}

class Account { 
   constructor (params) { 
      this.id = params.id;
      this.Username = params.username;
      this.Email = params.email;
      this.Register = params.register_date;
      this.last_login = params.last_login;
      this.Adress = params.ip;
      this.social_club = params.social;
      this.Administrator = params.admin;
      this.Donator = params.donator;
      this.Coins = params.coins || 0;
      this.Warns = params.warns;

      mp.accounts[this.id] = this;
   }
   
   isAdmin = (x) => { 
      this.admin >= x ? true : false;
   }

}

module.exports = Account;







