

export enum LogType {
   Error, Succes, Info
}

export class Main {

   static Terminal (Status: number, Message: string) {
      const Colors = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[37m'];
      console.log(Colors[Status] + this.DateTime() + Colors[0] + ' | ' + Message)
   }

   
   static Size (object: Object) {
      let size = 0;
      for (let key in object) {if (object.hasOwnProperty(key)) size ++; }
      return size;
   };

   static HexToDecimal (Hex: string) {
      return parseInt(Hex.replace('#', ''), 16);
   }

   static RandomRGB () {
      return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
   }

   static DateTime () {
      let now = new Date(), time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()].join('-');
      return date + ' ' + time;
   }
   
   static Between (min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   static ValidateIP (ip: string) {  
      return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) ? true : false ;  
   }  

   static GenerateNumber (n: number) {
      let add = 1, max = 12 - add;
      if (n > max) {
         return Main.GenerateNumber(max) + Main.GenerateNumber(n - max);
      }
      max = Math.pow(10, n + add);
      let min = max / 10;
      let number = Math.floor(Math.random() * (max - min + 1)) + min;
      return ("" + number).substring(add);
   }
   
   static CountDigits (n: number) {
      let count = 0;
      if (n >= 1) ++ count;
      while (n / 10 >= 1) {
         n /= 10;
         ++count;
      }
      return count;
   }

   static IsAnyVehAtPos (position: Vector3Mp, radius: number = 2) {
      let Vehicles:Array<VehicleMp> = [];
      mp.vehicles.forEachInRange(position, radius, (Vehicle: VehicleMp) => { 
         if (Vehicle) Vehicles.push(Vehicle);
      });
      return Vehicles;
   }

   static GenerateString (length: number) { 
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = ' ';
      for ( let i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
   }

   static Dollars (i: number) { 
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i);
   }

   static Help () { 
      let Admin = [], Basic = [], Faction = [], Property = [];
      for (const cmd of frp.Commands) { 

      }
   }

   static Sleep (Seconds: number) {
      return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
   }

   static IsAnyVehicleAtPoint (position, range = 2.5) {
      mp.vehicles.forEachInRange(position, range, (vehicle) => { 
         if (vehicle) { return vehicle; } else { false };
      })
   }

   static InfoColshape (position: Vector3Mp, name: string, info: string, radius: number, color, dimension = frp.Settings.default.dimension, blip = null, sprite = 4) { 
      const Colshape = mp.colshapes.newRectangle(position.x, position.y, radius, 2.0, 0);
      if (info) Colshape.OnPlayerEnter = (player) => { player.Notification(info, frp.Globals.Notification.Info, 5); };
      const Marker = mp.markers.new(27, new mp.Vector3(position.x, position.y, position.z - 0.985), radius, { color: color, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: dimension });
      const Label = mp.labels.new(name, position, { los: true, font: 0, drawDistance: radius, dimension: dimension });
      if (blip) mp.blips.new(blip, new mp.Vector3(position.x, position.y, 0), { shortRange: true, scale: 0.85, name: name, dimension: dimension });
   }

};
