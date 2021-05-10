

mp.advertisements = {};

let counter = 0;
const Status = {  Active: 0, Sold: 1 }

class Advertisement { 
   constructor (character, contact, description) { 
      this.id = counter ++;
      this.character = character;
      this.contact = contact;
      this.description = description;
      this.status = Status.Active;

      mp.advertisements[this.id] = this;
   }


   delete () { 
      delete mp.advertisements[this.id];
   }

   sold () { 
      this.status = Status.Sold;
   }
}

let adverts = { 
   new (player, description) { 
      let character = player.getCharacter();
      new Advertisement(character.id, character.phone_number, description);
   },

   action (player, action, ad) { 
      let advertisement = mp.advertisements[ad];
      switch (action) { 
         case 'sold': advertisement.sold(); break;
         case 'delete': advertisement.delete(); break;
      }
   }
}

module.exports = adverts;