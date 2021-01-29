
module.exports = { 
     terminal: function(status, text) {
          var colors = [
              red = "\x1b[31m",
              yellow = "\x1b[33m",
              white = "\x1b[37m",
              green = "\x1b[32m"
          ]
          var time = this.timeDate();
           switch(status) {
                 case 1: { return console.error(`${red}[ERROR - ${time}]${white} ${text}`) }
                 case 2: { return console.log(`${yellow}[INFO - ${time}]${white} ${text}`) }
                 case 3: { return console.log(`${green}[SUCCESS - ${time}]${white} ${text}`) }
                 case 4: { return console.log(`${yellow}[WARNING - ${time}]${white} ${text}`) }
           }
      },
     
     timeDate: function() {
          var current = new Date(), 
          time = current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds(),         
          date = [ current.getUTCFullYear(),
                    current.getUTCMonth() + 1,
                    current.getUTCDate()].join('-');
                    
          return `${date} ${time}`;
     },

     createLog: function (type, account = 0, play = 0, target = 0, message = 'empty', data = 'empty') { 
          let info = JSON.stringify(data)
          db.query("INSERT INTO `logs` (type, account, player, target, message, data, dateTime) VALUES (?, ?, ?, ?, ?, ?, current_timestamp())", [type, account, play, target, message, info], function (error, results, fields) {
               if (error) return core.terminal(1, error);
               let id = results.insertId;    
          });
     }
}

