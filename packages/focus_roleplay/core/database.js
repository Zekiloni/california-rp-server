

var mysql = require('mysql');

var db = mysql.createPool({
     connectionLimit: 100,
     host     : 'localhost',
     user     : 'root',
     password : '',
     database : 'focus'
});


db.aQuery = (query, values) => { 
     return new Promise(data => {
          db.query(query, [values], function(error, result) {
               if(error) {
                    core.terminal(1, error);
                    throw error;
               }
               try { 
                    data(result);
               } catch (error) {
                    data({});
                    throw error;
               }
          })
     })
}

module.exports = db;
