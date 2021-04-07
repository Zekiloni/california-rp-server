
mp.characters = {};

class Character { 
   constructor (p) { 
      this.character = p.id;
      this.account = p.account;
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
      this.clothing = d.clothing;

      this.inviteRequest = 0;

      mp.characters[this.character] = this;
   }
}

class Appearance { 
   constructor (player, blendData, hair, faceFeatures, hairColor) { 

   }
}


class Clothing  { 
   // 'hat', 'mask', 'shirt', 'bottoms', 'shoes', 'glasses', 'ear', 'backpack', 'armour', 'watch', 'bracelet'
   constructor (player, hat, mask, shirt, bottoms, shoes, glasses, ear, backpack, armour, watch, bracelet) {
      this.hat = [hat[0], hat[1]];
      this.mask = [mask[0], mask[1]];
      this.shirt = [shirt[0], shirt[1]];
      this.bottoms = [bottoms[0], bottoms[1]];
      this.shoes = [shoes[0], shoes[1]];
      this.glasses = [glasses[0], glasses[1]];
      this.ear = [ear[0], ear[1]];
      this.backpack = [backpack[0], backpack[1]];
      this.armour = [armour[0], armour[1]];
      this.watch = [watch[0], watch[1]];
      this.bracelet = [bracelet[0], bracelet[1]];

      player.setProp(0, this.hat[0], this.hat[1]);
      player.setClothes(1, this.mask[0], this.mask[1], 3);

   } 
}

module.exports = { Character, Clothing, Appearance };

