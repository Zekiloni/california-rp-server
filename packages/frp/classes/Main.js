module.exports = class Main {

   static Terminal (status, msg) {
      const colors = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[37m'];
      let time = this.DateTime();
      switch (status) {
         case 1: {
            return console.error(`${colors[0]}[ERROR - ${time}]${colors[3]} ${msg}`);
         }
         case 2: {
            return console.log(`${colors[1]}[INFO - ${time}]${colors[3]} ${msg}`);
         }
         case 3: {
            return console.log(`${colors[2]}[SUCCESS - ${time}]${colors[3]} ${msg}`);
         }
         case 4: {
            return console.log(`${colors[1]}[WARNING - ${time}]${colors[3]} ${msg}`);
         }
      }
   }

   static Logger (type, message, account = 0, character = 0, participant = 0) {
      frp.Logs.create({ Type: Types[type], Account: account, Character: character, Participant: participant, Message: message });
   }
   
  static Size (object) {
      let size = 0, key;
      for (key in object) {
        if (object.hasOwnProperty(key)) size ++;
      }
      return size;
    };

   static HexToDecimal (hex) {
      return parseInt(hex.replace('#', ''), 16);
   }

   static RandomRGB () {
      return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
   }

   static DateTime () {
      let now = new Date(), time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()].join('-');
      return date + ' ' + time;
   }
   
   static Between (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   static ValidateIP (ip) {  
      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {  
         return true;
      } else { 
         return false; 
      }  
   }  

   static GenerateNumber (n) {
      let add = 1, max = 12 - add;
      if (n > max) {
         return GenerateNumber(max) + GenerateNumber(n - max);
      }
      max = Math.pow(10, n + add);
      let min = max / 10;
      let number = Math.floor(Math.random() * (max - min + 1)) + min;
      return ("" + number).substring(add);
   }
   
   static CountDigits (n) {
      let count = 0;
      if (n >= 1) ++ count;
      while (n / 10 >= 1) {
         n /= 10;
         ++count;
      }
      return count;
   }

   static IsAnyVehAtPos (position) {
      mp.vehicles.forEachInRange(position, 2.5, (vehicle) => { 
         if (vehicle) { return vehicle; } else { false };
      })
   }

   static GenerateString (length) { 
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = ' ';
      for ( let i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
   }

   static Dollars (i) { 
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i);
   }

   static Help () { 
      let Admin = [], Basic = [], Faction = [], Property = [];
      for (const cmd of frp.Commands) { 

      }
   }

   static Sleep (s) {
      return new Promise(resolve => setTimeout(resolve, s * 1000));
   }

   static IsAnyVehicleAtPoint (position) {
      mp.vehicles.forEachInRange(position, 3.0, (vehicle) => { 
         if (vehicle) { return vehicle; } else { false };
      })
   }

   static Range (start, end, step) {
      return (
         Array.from(
            Array.from(
            Array(Math.ceil(
               (end - start) / step
            )).keys()
            ),
            x => start + x * step
         )
      );
   }
};
