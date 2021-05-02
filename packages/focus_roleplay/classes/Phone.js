



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
      player.setVariable('phone_ringing', this.ringing);
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

class Contact { 
   constructor (phone, name, number) { 
      this.name = name;
      this.number = number;

      mp.phones[phone].contacts = this; 
   }
}

class Message { 
   constructor (id, phone, target, message) { 
      this.id = id;
      this.phone = phone;
      this.target = target;
      this.message = message;

      mp.phones[phone].messages.push({ id: this.id, to: this.target, message: this.message });
      mp.phones[target].messages.push({ id: this.id, from: this.phone, message: this.message });

   }
}


new Phone(1, 111, {}, [])
new Phone(2, 123, {}, [])
new Contact(111, 'Zeki', 123)
new Contact(111, 'Mare', 321)
new Contact(111, 'Pepsi', 124)
new Message(111, 123, 'cao brate')
new Message(123, 111, 'sta ima')


setTimeout(() => { console.log(mp.phones) }, 5000);



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
