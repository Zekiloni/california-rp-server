
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


module.exports = { 
     
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




     between: (min, max) => {
          return Math.floor(Math.random() * (max - min)) + min;
     }
}

