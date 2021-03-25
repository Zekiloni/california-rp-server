

mp.accounts = {}

class Account { 
   /**
   * @param {Object} params
   * @param {Object} params.player
   * @param {Integer} params.dbid
   */
   constructor (params) { 
      this.sqlid = params.sqlid;
      this.username = params.username;
      this.registerDate = params.regDate;
      this.lastLogin = params.lastLog;
      this.ipAdress = params.ip;
      this.admin = params.admin;
      this.experience = params.xp; 
      this.hours = params.hours;
      this.donator = params.donator;
      this.characters = [];

      mp.accounts[this.sqlid] = this;

      console.log(this)
   }
   
   isAdmin = (x) => { 
      this.admin >= x ? true : false;
   }

}

module.exports = Account;







