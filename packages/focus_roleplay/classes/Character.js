
mp.characters = {};

class Character { 
   constructor (p) { 
      this.id = p.character;
      this.account = p.account;
      this.first_name = p.first_name;
      this.last_name = p.last_name;
      this.birth = p.birth;
      this.sex = p.sex;
      this.origin = p.origin;
      this.faction = p.faction || 0;
      this.leader = p.leader || 0;
      this.rank = p.rank || 'None';
      this.frequency = p.frequency || 0;
      this.job = p.job || 0;
      this.health = p.health;
      this.armour = p.armour;
      this.money = p.money || 0;
      this.bank_account = p.bank_account || 0;
      this.hunger = p.hunger || 100;
      this.thirst = p.thirst || 100;
      this.licenses = p.licenses || 'None';
      this.weapon_skill = p.weapon_skill || 'None';
      this.job_skill = p.job_skill || 0;
      this.clothing = p.clothing || 'None';
      this.screenshot = p.screenshot || 0;
      this.experience = p.experience; 
      this.hours = p.hours;
      this.last_positon = p.last_postion;
      this.spawn_point = p.spawn_point;

      this.working = { 
         salary: p.salary || 0,
         times: p.working_times || 0,
      }

      this.mood = p.mood || 'normal';
      this.walking_style = p.walking_style || 'normal';
      this.animation = p.animation || null;

      this.mute = p.mute || 0;

      
      this.blindfolded = false;
      this.cuffed = false;
      this.duty = false;
      this.inviteRequest = 0;
      this.casinoSlot = -1;
      this.casinoRoulette = -1;

      this.tog ={
         hud: false,
         ooc: false,
         ads: false,
         admin_chat: false,
      }

      mp.characters[this.id] = this;
   }

   setName (player) { 
      player.name = this.first_name + ' ' + this.last_name;
   }

   spawn (player) { 
      switch (this.spawn_point) { 
         case 0: player.position = mp.settings.defaultSpawn; break;
         case 1: player.position = this.last_positon; break;
         default: player.position = mp.settings.defaultSpawn; break;
      }
   }

   screenShot (player, toggle) { 
      this.screenshot = toggle;
      player.setVariable('screenshot', this.screenshot);
   }

   setHealth (player, value) { 
      this.health = value;
      player.health = this.health;
   } 

   setArmour (player, value) { 
      this.armour  = value;
      player.armour  = this.armour;
   } 

   setDuty (player, toggle) { 
      this.duty = toggle;
      player.setVariable('duty', this.duty);
   }

   // SINHRONIIZACIJA ANIMACIJA
   Animation (player, animation) { 
      this.animation = animation;
      player.setVariable('animation', this.animation);
      if (this.animation != null) { 
         player.call('client:player.animation', [animation.name, animation.dictionary, animation.flag, animation.time]) // (animName, animDict, flag = 0, time = 5)
      }
   }

   setMoney (player, amount) { 
      this.money = amount;
      player.setVariable('money', this.money);
   }

   giveMoney (player, amount) { 
      this.money += amount;
      player.setVariable('money', this.money);
   }

   setMood (player, mood) { 
      this.mood = mood;
      player.setVariable('mood', this.mood);
   }

   setWalkingStyle (player, style) { 
      this.walking_style = style;
      player.setVariable('walking_style', this.walking_style);
   }

   Cuff (player) { 
      this.cuffed = !this.cuffed;
      player.setVariable('cuffed', this.cuffed);
   }

   payDay (player) { 


   }
}

const genders = [ 
   mp.joaat('mp_m_freemode_01'), 
   mp.joaat('mp_f_freemode_01')  
];

class Appearance { 
   constructor (appearance) { 
      this.gender = appearance.gender;
      this.blendData = appearance.blendData;
      this.hair = appearance.hair;
      this.beard = appearance.beard;
      this.eyeColor = appearance.eyeColor;
      this.faceFeatures = appearance.faceFeatures;
   }

   load (player) {
      player.model = genders[this.gender];
      player.setClothes(2, parseInt(this.hair[0]), 0, 2);

      if (this.gender == 0) { player.setHeadOverlay(1, [parseInt(this.beard[0]), 1.0, parseInt(this.beard[1]), 0]); }

      player.setCustomization(this.gender == 0 ? true : false, parseInt(this.blendData[0]), parseInt(this.blendData[1]), 0, parseInt(this.blendData[2]), parseInt(this.blendData[3]), 0, parseFloat(this.blendData[4]), parseFloat(this.blendData[5]), 0, parseInt(this.eyeColor), parseInt(this.hair[1]), parseInt(this.hair[2]), 
         [
            parseFloat(this.faceFeatures[0]), parseFloat(this.faceFeatures[1]),
            parseFloat(this.faceFeatures[2]), parseFloat(this.faceFeatures[3]),
            parseFloat(this.faceFeatures[4]), parseFloat(this.faceFeatures[5]), 
            parseFloat(this.faceFeatures[6]), parseFloat(this.faceFeatures[7]),
            parseFloat(this.faceFeatures[8]), parseFloat(this.faceFeatures[9]),
            parseFloat(this.faceFeatures[10]), parseFloat(this.faceFeatures[11]),
            parseFloat(this.faceFeatures[12]), parseFloat(this.faceFeatures[13]),
            parseFloat(this.faceFeatures[14]), parseFloat(this.faceFeatures[15]),
            parseFloat(this.faceFeatures[16]), parseFloat(this.faceFeatures[17]),
            parseFloat(this.faceFeatures[18]), parseFloat(this.faceFeatures[19])
         ]
      );
   }

}

class Clothing  { 
   constructor (clothing) {
      this.mask = clothing.mask;
      this.torso = clothing.torso;
      this.undershirt = clothing.undershirt;
      this.shirt = clothing.shirt;
      this.legs = clothing.legs;
      this.shoes = clothing.shoes;
      this.bags = clothing.bags;
      this.armour = clothing.armour;
      this.accessories = clothing.accessories;

      this.hat = clothing.hat || [255, 0];
      this.glasses = clothing.glasses || [255, 0];
      this.ears = clothing.ears || [255, 0];
      this.watch = clothing.watch || [255, 0];
      this.bracelet = clothing.bracelet || [255, 0];
   }
   
   load = (player) => {
      player.setProp(0, parseInt(this.hat[0]), parseInt(this.hat[1]));
      player.setProp(1, parseInt(this.glasses[0]), parseInt(this.glasses[1]));
      player.setProp(2, parseInt(this.ears[0]), parseInt(this.ears[1]));
      player.setProp(6, parseInt(this.watch[0]), parseInt(this.watch[1]));
      player.setProp(7, parseInt(this.bracelet[0]), parseInt(this.bracelet[1]));

      player.setClothes(1, parseInt(this.mask[0]), parseInt(this.mask[1]), 2);
      player.setClothes(3, parseInt(this.torso[0]), parseInt(this.torso[1]), 2);
      player.setClothes(8, parseInt(this.undershirt[0]), parseInt(this.undershirt[1]), 2);
      player.setClothes(4, parseInt(this.legs[0]), parseInt(this.legs[1]), 2);
      player.setClothes(6, parseInt(this.shoes[0]), parseInt(this.shoes[1]), 2);
      player.setClothes(5, parseInt(this.bags[0]), parseInt(this.bags[1]), 2);
      player.setClothes(9, parseInt(this.armour[0]), parseInt(this.armour[1]), 2);
      player.setClothes(7, parseInt(this.accessories[0]), parseInt(this.accessories[1]), 2);
      player.setClothes(11, parseInt(this.shirt[0]), parseInt(this.shirt[1]), 2);

      mp.characters[player.character].clothing = this;
      console.log(mp.characters[player.character].clothing)
   }
}

module.exports = { Character, Clothing, Appearance };
