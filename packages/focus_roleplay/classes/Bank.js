

let { FactionTypes } = require('./Factions');


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

   // money transfer from paycheck to account balance
   payout (player, value) { 
      let character = player.getCharacter();
      character.giveMoney(player, parseInt(value));
      this.paycheck = 0;
      mp.bank.update(this)
   }


   // giving payday
   payDay (player) { 
      let character = player.getCharacter(), value = 0;

      value += core.between(20, 35);

      if (character.hours < 6) { 
         value += core.between(20, 25);
      }

      if (character.job) { 
         value += core.between(15, 25);
         value += character.working.salary;

      }

      if (character.faction) { 
         let factionType = mp.factions[character.faction].type;
         if (factionType == FactionTypes.Law || factionType == FactionTypes.Fmd) { 
            value += core.between(20, 30);
         } else if (factionType == FactionTypes.Gov) { 
            value += core.between(30, 45);
         }
      }

      if (this.savings > 0) { 
         let earnings = this.savings / 50;
         this.savings += earnings;
      }

      this.paycheck += value;

      this.tax(player, value);
   }

   tax (player, earnings) { 
      let character = player.getCharacter();
      let percent = 12, salaryTax = (earnings / 100) * percent;
      let TAX = 0;

      let properties = character.property();

      if (properties.houses.length > 0) { 
         properties.houses.forEach((house) => { 
            TAX += (house.price / 100) * 0.25;
         })
      }

      if (properties.vehicles.length > 0) { 
         properties.vehicles.forEach((veh) => { 
            TAX += (veh.price / 100) * 0.1;
         })
      }

      if (properties.business.length > 0) { 
         properties.business.forEach((biz) => { 
            TAX += (biz.budget / 100) * 3.5;
         })
      }

      if (earnings > 20) { 
         TAX += salaryTax;
      }


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
         },

         'server:player.banking.payday': (player, bank, value) => { 
            bank = this.accounts[bank];
            bank.payout(player, value);
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


