

let { FactionTypes } = require('./Factions');



// EKONOMIJA 

// NAPOMENA !! ZA OVE PROCENE SU KORISCENE NAJVECE VREDNOSTI PLATA

// PROSEK PLATA NA POSLU KOJE MOZE DA ODRADI PO PROCENI 20 PUTA U SATU
// SU OD 15 - 20 $, STO JE UKUPNO: 400 $
// OD UKUPNO ZARADJENIH 590 DOLARA, IGRAC KOJI SE PREBIO OD POSLA, IMA MANJE OD 8 SATI OSTACEMU POSLE TAKSE 520$

// POSLE 8 SATI IGRA KONSTANTNOG POSLA I SOCIJALNE POMOCI MOZE ZARADITI 4160$ (GRINDUJE) 

// IGRAC KOJI IMA VISE OD 8 SATI IGRE KOJI RADI KONSTANTNO ZARADI POSLE TAKSE 430$

// IGRAC KOJI NIJE ZAPOZLEN (NE RADI NISTA) KAO POCETNIIK MOZE ZARADITI PO SATU POSLE TAKSE 124$, ZA OSAM SATI 990$

// IGRAC KOJI JE ZAPOSLEN A NE RADI NISTA KAO POCETNIK MOZE ZARADITI PO SATU POSLE TAKSE 175$, ZA OSAM SATI IGRE 1400$

// IGRAC KOJI NIJE POCETNIK, ZAPOSLEN A NE RADI NISTA MOZE ZARADITI PO SATU POSLE TAKSE 80$ (imati na umu da je on pre mozda radio a dobijao je bonus :) )

// POLICAJAC / BOLNICAR KAO POCETNIK (bez character job (side posla)) POSLE TAKSE PO SATU ZARADI 210$, ZA OSAM SATI 1680$
// POLICAJAC / BOLNICAR KAO POCETNIK (koji je pametan i ima side job i abusa to) POSLE TAKSEE PO SATU ZARADI 255$, ZA OSAM SATI 2040$
// POLICAJAC / BOLNICAR KOJI IMA VISE OD 8 SATI IGRE (bez side joba) POSLE TAKSE PO SATU ZARADI 125$
// POLICAJAC / BOLNICAR KOJI IMA VISE OD 8 SATI IGRE (sa side job) POSLE TAKSE PO SATU ZARADI 170$

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

      value += core.between(665, 680);

      if (character.hours < 8) { 
         value += core.between(95, 105);
      }

      if (character.job) { 
         value += core.between(75, 80);
         value += character.working.salary;
      }

      if (character.faction) { 
         let factionType = mp.factions[character.faction].type;
         if (factionType == FactionTypes.Law || factionType == FactionTypes.Fmd) { 
            value += core.between(75, 95);
            if (mp.factions[character.faction].leader == character.id) { 
               value += core.between(50, 65);
            }
         } else if (factionType == FactionTypes.Gov) { 
            value += core.between(90, 105);
            if (mp.factions[character.faction].leader == character.id) { 
               value += core.between(100, 105);
            }
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
      let percent = 5, salaryTax = (earnings / 100) * percent;
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

