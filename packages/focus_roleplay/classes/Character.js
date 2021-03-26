
mp.characters = {};

class Character { 
   /**
   * @param {Object} p
   * @param {String} p.id
   * @param {String} p.accid 
   * @param {String} p.name 
   * @param {String} p.lname 
   * */
   constructor (p) { 
      this.character = p.charid;
      this.account = p.accid;
      this.firstName = p.name;
      this.lastName = p.lname;
      this.birth = p.birth;
      this.sex = p.sex;
      this.origin = p.origin;
      this.faction = p.faction;
      this.rank = p.rank;
      this.frequency = p.freq;
      this.job = p.jobs;
      this.cash = p.cash;
      this.salary = p.salary;
      this.bankAccount = p.bank;
      this.hunger = p.hunger;
      this.thirst = p.thirs;
      this.licenses = p.licenses;
      this.weaponSkill = p.wSkill;
      this.drivingSkill = p.dSkill;
      this.jobSkill = p.jSkill;

      this.inviteRequest = 0;
      this.cuffed = 0;
      this.freezed = 0;

      mp.accounts[this.character] = this;
   }
}


