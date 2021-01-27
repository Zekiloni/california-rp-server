var mysql = require('mysql');


var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'focus'
});


try {
     db.connect(function(err) {
          if (err) throw main.terminal(1, `Connection to database failed, ${err}`)
          core.terminal(3, 'Connection with MySQL succesfull !')
     });
} catch (error) {
     core.terminal(1, error)
}

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
