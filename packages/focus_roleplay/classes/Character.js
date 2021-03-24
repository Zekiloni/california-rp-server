
mp.characters = {};

class Character { 
   /**
   * @param {Object} params
   * @param {String} params.accID
   * @param {String} params.dbid 
   * */
   constructor (params) { 
      this.account = params.accID;
      this.firstName = params.name;
      this.lastName = params.lName;
      this.age = params.age;
      this.sex = params.sex;
      this.origin = params.origin;
      this.faction = params.faction;
      this.rank = params.rank;
      this.frequency = params.freq;
      this.job = params.jobs;
      this.cash = params.cash;
      this.bankAccount = params.bank;

      mp.accounts[this.sqlid] = this;

   }

}

