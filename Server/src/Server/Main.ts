import { Globals } from "../Global/Globals";
import { Settings } from "./Settings";
let Path = require('path');
var scriptName = Path.basename(__filename);


export enum LogType {
   Error, Succes, Info
}

export enum ExceptionType {
   Null
}

export class Main {

   static Terminal(Status: number, Message: string) {
      const Colors = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[0m'];

      console.log(Colors[Status] + this.DateTime() + Colors[3] + ' | ' + Message)
   }

   static Exception(Type: ExceptionType, FileName: string, Message?: string) {
      this.Terminal(0, `[${FileName}] ` + Message);
      // Upis u log
   }

   static Size(object: Object) {
      let size = 0;
      for (let key in object) { if (object.hasOwnProperty(key)) size++; }
      return size;
   };

   static HexToDecimal(Hex: string) {
      return parseInt(Hex.replace('#', ''), 16);
   }

   static RandomRGB() {
      return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
   }

   static DateTime() {
      let now = new Date(), time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()].join('-');
      return date + ' ' + time;
   }

   static Between(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   static ValidateIP(ip: string) {
      return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) ? true : false;
   }

   static CountDigits(n: number) {
      let count = 0;
      if (n >= 1) ++count;
      while (n / 10 >= 1) {
         n /= 10;
         ++count;
      }
      return count;
   }

   static IsAnyVehAtPos(position: Vector3Mp, radius: number = 2, dimension = 0) {
      let Vehicles: Array<VehicleMp> = [];
      mp.vehicles.forEachInRange(position, radius, (Vehicle: VehicleMp) => {
         if (Vehicle && Vehicle.dimension == dimension) Vehicles.push(Vehicle);
      });
      return Vehicles;
   }

   static GenerateString(length: number) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = ' ';
      for (let i = 0; i < length; i++) {
         result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
   }

   /* NIJE OVO TAJ KOJ SI TI KORISTIO :(
   static GenerateNumber(Min: number, Max: number) {
      Min = Math.ceil(Min);
      Max = Math.floor(Max);
      return Math.floor(Math.random() * (Max - Min + 1)) + Min;
   }*/

   static Dollars(i: number) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i);
   }


   static Sleep(Seconds: number) {
      return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
   }

   static InfoColshape(Position: Vector3Mp, Name: string, Info: string, Radius: number, Color: RGBA, Dimension: number = Settings.Default.dimension, Blip: any = false, Sprite: number = 4) {

      const Colshape = mp.colshapes.newRectangle(Position.x, Position.y, Radius, 2.0, 0);

      if (Info)
         Colshape.OnPlayerEnter = (Player: PlayerMp) => { Player.Notification(Info, Globals.Notification.Info, 5); };

      mp.markers.new(27, new mp.Vector3(Position.x, Position.y, Position.z - 0.985), Radius, {
         color: Color, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: Dimension
      });

      mp.labels.new(Name, Position, { los: true, font: 0, drawDistance: Radius, dimension: Dimension });

      if (Blip)
         mp.blips.new(Blip, new mp.Vector3(Position.x, Position.y, 0), { shortRange: true, scale: 0.85, name: Name, dimension: Dimension });
   }

};
