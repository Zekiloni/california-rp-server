



mp.phones = {};

class Phone { 
   constructor (character, number, contacts, messages, info) { 
      this.character = character;
      this.number = number;
      this.contacts = contacts || {};
      this.messages = messages|| [];

      if (info) { 
         this.turned = info.turned || true;
         this.melody = info.melody;
         this.background = info.background;
      }

      this.ringing = false;
      this.talking = false;

      mp.phones[number] = this;
   }

   call (number) { 
      if (mp.phones[number]) { 
         let phone = mp.phones[number], target = mp.phones.user(phone.character);
         if (target) { 
            phone.ring(target, this.number);
         }
      }
   }


   ring (player, incoming) { 
      this.ringing = true;
      // poruka nadolazeci poziv
   }

   answer () {
      
   }

   hangup () { 
      if (this.ringing) { 
         this.ringing = !this.ringing; 
      }
      else if (this.talking) { 
         this.talking = !this.talking; 
      }
   }


   contactAdd (number, name) { 
      db.query("INSERT INTO `contacts` (phone, name, number) VALUES (?, ?, ?)", [this.number, name, number], function (error, results, fields) {
         if (error) return core.terminal(1, 'Contact Adding Error ' + error);
         let contact = new Contact(this.number, name, number);
      });
   }

   contactRemove (number) { 
      db.query("DELETE * FROM `contacts` WHERE `phone` = ? AND `number` = ?", [this.number, number], function (error, results, fields) {
         if (error) return core.terminal(1, 'Contact Removing Error ' + error);
         let contact = this.contacts.find(contact => contact.number === number);
         let index = this.contacts.indexOf(contact);
         this.contacts.splice(index, 1);
      });
   }


   message (target, message) {    
      db.query("INSTERT INTO `messages` (sender, text, recipient) VALUES (?, ?, ?) ", [this.number, number, target], function (error, results, fields) {
         if (error) return core.terminal(1, 'Message Adding Error ' + error);
         new Message(results.insertedId, this.number, target, message);
      });
   }

   messageRemove (id) {
      db.query("DELETE * FROM `messages` WHERE `id` = ?", [id], function (error, results, fields) {
         if (error) return core.terminal(1, 'Message Removing Error ' + error);
         let message = this.messages.find(mes => mes.id === id);
         let index = this.contacts.indexOf(message);
         this.messages.splice(index, 1);
      });
   }

}



mp.phones.update = (phone) => { 
   let values = { 
      
   }
}

mp.phones.user = (character) => { 
   mp.players.forEach((target) => { 
      if (target.data.logged && target.data.spawned) { 
         if (player.character == character) { return target; }
      }
   })
}


mp.events.add({
   'server:player.phone.contacts.add': (player, name, number) => { 
      let character = player.getCharacter();
      this.contactAdd(character.phone.number, name, number);
   },

   'server:player.phone.contact.remove': (player, contact) => { 

   }
})
