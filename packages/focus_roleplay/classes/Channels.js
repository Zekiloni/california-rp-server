

mp.frequencies = {};

class Frequency  { 
   constructor (freq, password, owner) { 
      this.frequency = freq;
      this.password = password;
      this.owner = owner;

      mp.frequencies[this.frequency] = this;
   }
}


class Channels { 
   load = () => { 
      db.query("SELECT * FROM `channels`", function (err, result, fields) { 
         if (err) return core.terminal(1, 'Channels Loading Error ' + err);
         let counter = 0;
         if (result.length > 0) { 
            result.forEach(ch => {
               new Frequency(ch.frequency, ch.password, ch.owner);
               counter ++;
            });
         }
         core.terminal(3, counter + ' Channels loaded')
      })
   }

   create = (player, frequency) => { 

   }

   exist = (freq) => { 
      if (mp.frequencies[freq]) {
         return mp.frequencies[freq];
      } else { 
         return false;
      }
   }
}

mp.channels = new Channels();

mp.channels.load()