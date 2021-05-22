

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
      if (data) { 
         this.balance = data.balance || 0;
         this.savings = data.savings || 0;
         this.paycheck = data.paycheck || 0;
      }

      this.active = true;

      mp.bank.accounts[this.number] = this;
   }


   // money transfer from paycheck to account balance
   payout (player, value) { 
      let character = player.getCharacter();
      character.giveMoney(player, parseInt(value));
      this.paycheck = 0;
      mp.bank.update(this)
   }

   // giving payday
}


class Bank { 

   constructor () { 
      mp.events.addProc({
         'server:player.banking': (player) => {
            let character = player.getCharacter();
            return JSON.stringify(this.accounts[character.bank_account])
         },

         'server:player.banking.transfer': (player, bank, recipient, value) => { 
            bank = this.accounts[bank];
            if (this.accounts[recipient]) { 
               let target = this.accounts[recipient];
               bank.transfer(target, value);
               return true;
            } else { 
               return false;
            }
         }
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




new BankAccount('321199', 323);

