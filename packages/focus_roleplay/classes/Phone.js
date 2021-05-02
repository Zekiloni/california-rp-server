



mp.phones = {};

class Phone { 
   constructor (character, number, contacts, messages, info) { 
      this.character = character;
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
}

class Contact { 
   constructor (phone, name, number) { 
      this.name = name;
      this.number = number;

      mp.phones[phone].contacts = this; 
   }
}

class Message { 
   constructor (phone, target, message) { 
      this.phone = phone;
      this.target = target;
      this.message = message;

      mp.phones[phone].messages.push({ to: this.target, message: this.message });
      mp.phones[target].messages.push({ from: this.phone, message: this.message });

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
