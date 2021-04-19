

mp.accounts = {}

class Account { 
   /**
   * @param {Object} params
   * @param {Integer} params.dbid
   */
   constructor (params) { 
      this.id = params.id;
      this.username = params.username;
      this.email = params.email;
      this.register_date = params.register_date;
      this.last_login = params.last_login;
      this.ip_adress = params.ip;
      this.social_club = params.social;
      this.admin = params.admin;
      this.donator = params.donator;
      this.coins = params.coins || 0;
      this.warns = params.warns;

      mp.accounts[this.id] = this;
   }
   
   isAdmin = (x) => { 
      this.admin >= x ? true : false;
   }

}

module.exports = Account;







