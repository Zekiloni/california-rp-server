
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
      this.clothing = p.clothing;

      this.inviteRequest = 0;

      mp.characters[this.character] = this;
   }
}

class Appearance { 
   constructor (player, gender, blendData, hair, beard, faceFeatures, eyeColor) { 

      this.gender = gender;
      this.blendData = blendData;
      this.hair = hair;
      this.beard = beard;
      this.eyeColor = eyeColor;
      this.faceFeatures = faceFeatures;

      player.setClothes(0, this.hair[0], 0, 0);

      player.setCustomization(this.gender == 0 ? true : false, this.blendData[0], this.blendData[1], 0, this.blendData[2], this.blendData[3], 0, this.blendData[4], this.blendData[5], 0, this.eyeColor, this.hair[1], this.hair[2], 
         [
            this.faceFeatures[0], this.faceFeatures[1], this.faceFeatures[2], this.faceFeatures[3], this.faceFeatures[4], this.faceFeatures[5], 
            this.faceFeatures[6], this.faceFeatures[7], this.faceFeatures[8], this.faceFeatures[9], this.faceFeatures[10], this.faceFeatures[11], this.faceFeatures[12],
            this.faceFeatures[13], this.faceFeatures[14], this.faceFeatures[15], this.faceFeatures[16], this.faceFeatures[17], this.faceFeatures[18], this.faceFeatures[19]
         ]
      );
   }

}

// 'hat', 'mask', 'shirt', 'bottoms', 'shoes', 'glasses', 'ear', 'backpack', 'armour', 'watch', 'bracelet'
class Clothing  { 
   constructor () {
      this.hat = [0, 0];
      this.mask = [0, 0];
      this.shirt = [0, 0];
      this.undershirt = [0, 0];
      this.bottoms = [0, 0];
      this.shoes = [0, 0];
      this.glasses = [0, 0];
      this.ear = [0, 0];
      this.backpack = [0, 0];
      this.armour = [0, 0];
      this.watch = [0, 0];
      this.bracelet = [0, 0];
   }
   
   set = (player) => {
      player.setProp(0, this.hat[0], this.hat[1]);
      player.setProp(1, this.glasses[0], this.glasses[1]);
      player.setProp(2, this.ear[0], this.ear[1]);
      player.setProp(6, this.watch[0], this.watch[1]);
      player.setProp(7, this.bracelet[0], this.bracelet[1]);

      player.setClothes(1, this.mask[0], this.mask[1], 3);
      player.setClothes(4, this.bottoms[0], this.bottoms[1], 3);
      player.setClothes(5, this.backpack[0], this.backpack[1], 3);
      player.setClothes(6, this.shoes[0], this.shoes[1], 3);
      player.setClothes(8, this.undershirt[0], this.undershirt[1], 3);
      player.setClothes(9, this.armour[0], this.armour[1], 3);

      mp.characters[player.character].clothing = this;
   }
}

module.exports = { Character, Clothing, Appearance };
