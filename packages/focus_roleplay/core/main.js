
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


module.exports = { 
     terminal: function (status, text) {
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
     
     timeDate: function () {
          var current = new Date(), 
          time = current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds(),         
          date = [ current.getUTCFullYear(),
                    current.getUTCMonth() + 1,
                    current.getUTCDate()].join('-');
                    
          return `${date} ${time}`;
     },

     hash: function (string) { 
          let hash = bcrypt.hashSync(string, salt);
          return hash;
     },

     compareHash: function (string, compareString) { 
          let result = bcrypt.compareSync(string, compareString);
          return result;
     },

     randomRGB: () => { 
          let rr = Math.floor(Math.random() * 255),
               gg = Math.floor(Math.random() * 256),
               bb = Math.floor(Math.random() * 256);
          return {r: rr, g: gg, b: bb}
     },

     hexToDecimal: (hex) => {
          return parseInt(hex.replace("#",""), 16)
     },

     between: (min, max) => {
          return Math.floor(Math.random() * (max - min)) + min;
     }
}

