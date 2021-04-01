


class Fines { 
   new = (price, info, issuedBy, character, paid) => { 
      db.query('INSERT INTO `fines' , [], function (err, res, fields) { 
         if (err) core.terminal(1, 'Creating Fine Error ' + err);
      })
   }


   pay = (player, fine) => { 
      db.select('SELECT * FROM `fines` WHERE `id` = ?', [fine], function (err, result, field) { 
         if (err) return core.terminal(1, 'Fine Loading Error ' + err);

      })
   }

   get = async (player) => { 
      let fines = await db.aQuery('SELECT * FROM `fines` WHERE `character` = ?', player.character);
      return fines;
   }
}

mp.fines = new Fines();
