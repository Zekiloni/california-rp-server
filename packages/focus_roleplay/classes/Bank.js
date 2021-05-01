

let { FactionTypes } = require('./Factions')


class BankAccount { 
   constructor (number, pin, data) { 
      this.number = number;
      this.pin = pin;
      this.balance = data.balance;
      this.savings = data.savings || 0;
      this.paycheck = data.paycheck || 0;

      mp.bank.accounts[this.number] = this;
   }


   withdraw (player, value) { 
      let character = player.getCharacter();
      character.giveMoney(player, parseInt(value));
      this.balance -= parseInt(value);
      mp.bank.update(this)
   }

   deposit (player, value) { 
      let character = player.getCharacter();
      character.giveMoney(player, -parseInt(value));
      this.balance += parseInt(value);
      mp.bank.update(this)
   }

   transfer (player, target, value) { 

   }

   payDay (player) { 
      let character = player.getCharacter(), value = 0;

      value += core.between(5, 10);

      if (character.hours < 6) { 
         value += core.between(17, 20);
      }

      if (character.job) { 
         value += core.between(5, 10);
         value += character.working.salary;

      }

      if (character.faction) { 
         if (mp.factions[character.faction].type == FactionTypes.Law) { 
            value += core.between(15, 25);
         }
      }

      if (this.savings > 0) { 

      }

      this.paycheck += value;

      this.tax(player);
   }

   tax (player) { 

      mp.bank.update(this);
   }
}

class Bank { 

   constructor () { 
      mp.events.addProc('server:player.banking', (player) => {
         let character = player.getCharacter();
         return JSON.stringify(this.accounts[character.bank_account])
      });

      mp.events.add({
         'server:player.banking.withdraw': (player, bank, value) => { 
            bank = this.accounts[bank];
            bank.withdraw(player, value)
         },

         'server:player.banking.deposit': (player, bank, value) => { 
            bank = this.accounts[bank];
            bank.deposit(player, value);
         },

         'server:player.banking.transfer': (player, bank, target, value) => { 
            bank = this.accounts[bank];
            if (this.accounts[target]) { 
               // do transfer
            }
         }
      })
   }

   accounts = {}

   load () { 
      db.query("SELECT * FROM `bank`", function (error, results, fields) { 
         if (error) return core.terminal(1, 'Bank Account Loading ' + error);
         results.forEach(result => {
            new BankAccount(result.number, result.pin, {
               balance: result.balance,
               savings: result.savings,
               paycheck: result.paycheck
            })
         });
      })
   }

   update (bank) { 
      let values = { 
         balance: bank.balance,
         savings: bank.savnigs,
         paycheck: bank.paycheck
      }

      db.query("UPDATE `bank` SET ? WHERE `number` = ?", [values, bank.number], function (error, results, fields) {
         if (error) return core.terminal(1, 'Bank Update Error ' + error);
      });
   }


   create (player) { 
      let character = player.getCharacter();
      let number = generateNumber(16), pin = generateNumber(4), idLength = countDigits(player.character);
      let last = number.substr(-idLength), final = number.replace(last, player.character);

      db.query('INSERT INTO `bank` (`number`, `pin`, `balance`, `savings`, `paycheck`) VALUES (?, ?, ?, ?, ?)', [final, pin, mp.settings.register.bank, 0, 0], function (error, results, fields) {
         if (error) return core.terminal(1, 'Bank Account Creating ' + error);
         let account = new BankAccount(final, pin, { 
            balance: mp.settings.register.bank, 
            savings: 0, 
            paycheck: 0 
         })
         character.bank_account = final;
      }); 
   }
}

mp.bank = new Bank();

mp.bank.load();

function generateNumber (n) { 
   let add = 1, max = 12 - add;     
   if ( n > max ) { return generateNumber(max) + generateNumber(n - max); }
   max        = Math.pow(10, n+add);
   let min    = max/10; 
   let number = Math.floor( Math.random() * (max - min + 1) ) + min;
   return ("" + number).substring(add); 
}

function countDigits (n) {
   let count = 0;
   if (n >= 1) ++ count;
   while (n / 10 >= 1) { n /= 10; ++ count; }
   return count;
}


