


class BankAccount { 
   constructor (number, pin, data) { 
      this.number = number;
      this.pin = pin;
      this.balance = data.balance;
      this.savings = data.savings || 0;
      this.paycheck = data.paycheck || 0;

      console.log(this)
      mp.bank.accounts[this.number] = this;
   }
}

class Bank { 

   constructor () { 
      mp.events.addProc('server:player.banking', (player) => {
         let character = player.getCharacter();
         return JSON.stringify(this.accounts[character.bank_account])
      });
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


