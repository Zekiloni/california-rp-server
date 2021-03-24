

mp.accounts = {}

class Account { 
   /**
   * @param {Object} params
   * @param {Object} params.player
   * @param {Integer} params.dbid
   */
   constructor (params) { 
      this.sqlid = params.dbid;
      this.username = params.username;
      this.registerDate = params.regDate;
      this.lastLogin = params.lastLog;
      this.ipAdress = params.ip;
      this.admin = params.adminLvl;
      this.gameMaster = params.gameMaster;
      this.experience = params.xp; 
      this.hours = params.hours;
      this.caracters = [];

      mp.accounts[this.sqlid] = this;
   }
   
   isAdmin = (x) => { 
      this.admin >= x ? true : false;
   }
}








