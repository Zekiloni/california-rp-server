



export function dateTime () {
   let now = new Date(), time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()].join('-');
   return date + ' ' + time;
}

export function randMinMax (min: number, max: number) {
   return Math.floor(Math.random() * (max - min)) + min;
}

export function validateIP (ip: string) { 
   return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) ? true : false;
}

export function convertHexToDecimal (Hex: string) {
   return parseInt(Hex.replace('#', ''), 16);
}

export function createRandomRGB () {
   return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
}

export function generateString (length: number) {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let result = ' ';
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}

export function generateNumber (Min: number, Max: number) {
   Min = Math.ceil(Min);
   Max = Math.floor(Max);
   return Math.floor(Math.random() * (Max - Min + 1)) + Min;
}

export function dollars (i: number) {
   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i);
}

export function countDigits (n: number) {
   let count = 0;
   if (n >= 1) ++ count;
   while (n / 10 >= 1) {
      n /= 10;
      ++ count;
   }
   return count;
}

export function objectSize (object: Object) {
   let size = 0;
   for (let key in object) { if (object.hasOwnProperty(key)) size++; }
   return size;
};