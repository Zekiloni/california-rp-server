

class Fine {
   constructor(id, penalty, issuedBy, issuedTo, description, paid) {
      this.id = id;
      this.price = penalty;
      this.issuer = issuedBy;
      this.character = issuedTo;
      this.description = description;
      this.paid = paid || 0;
   } 
}

class Fines { 
   new = (price, info, issuedBy, character, paid) => { 
      db.query('INSERT INTO `fines` (price, issuer, character, description, paid) VALUES (?, ?, ?, ?, ?)' , [price, issuedBy, character, info, paid], function (err, res, fields) { 
         if (err) core.terminal(1, 'Creating Fine Error ' + err);
      })
   }

   pay = (fine) => { 
      db.query('UPDATE `fines` SET `paid` = 1 WHERE `id` = ?', [fine.id], function (err, result, field) { 
         if (err) return core.terminal(1, 'Fine Paying Error ' + err);       
      })
   }

   delete = (fineId) => {
      db.query('DELETE FROM `fines` WHERE `id` = ?', [fineId], function (err, result, field) { 
         if (err) return core.terminal(1, 'Fine Deleting Error ' + err);       
      })
   } 

   get = async (player) => { 
      let fines = await db.aQuery('SELECT * FROM `fines` WHERE `character` = ?', player.character);
      return fines;
   }
}

mp.fine = new Fines();
