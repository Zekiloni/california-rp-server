

const logTypes = { 
   SERVER: 0,
   PLAYER: 1,
   ADMIN: 2,
   MONEY: 3,
   SELL: 4,
}

class Log {
   constructor (type, account, play, target, message) { 
      db.query("INSERT INTO `logs` (type, account, player, target, message, data, dateTime) VALUES (?, ?, ?, ?, ?, ?, current_timestamp())", 
      [type, account, play, target, message, info], function (error, results, fields) {
         if (error) return core.terminal(1, 'Log Error ' + error);
         let id = results.insertId;
      });
   }
}

mp.logs = (type, account = 0, player = 0, target = 0, message = 'no', data = 'no') => { 
   new Log(type, account, player, target, message, data);
}
