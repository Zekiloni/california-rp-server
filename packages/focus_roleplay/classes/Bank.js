

mp.bankAccouts = {}

class Bank { 
   constructor (data) { 
      this.number = data.number;
      this.pin = data.pin;
      this.balance = data.balance;
      this.savings = data.savings;

      mp.bankAccouts[this.number] = this;
   }

   withdraw = (player, value) => { 
      this.balance -= value;
      player.character.cash += value;
   }

   deposit = (player, value) => { 
      this.balance += value;
      player.character.cash -= value;
   }

   transfer = (player, target, value) => { 
      // ....
   }
}