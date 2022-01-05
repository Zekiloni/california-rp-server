import { Groups } from './Globals';


const Helpers = { 
   Truncate (str: string, n: number) { 
      return (str.length > n) ? str.substr(0, n-1) + '...' : str; 
   },

   Dollars (i: number) { 
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i); 
   },

   Date (i: Date) { 
      i = new Date(i); 
      return i.getDate() + '.' + (i.getMonth() + 1) + '.' + i.getFullYear() + ' - ' + i.getHours() + ':' + i.getMinutes() + ':' + i.getSeconds(); 
   },

   Group (i: keyof typeof Groups) { 
      return Groups[i];
   },

   isUpper: (str: string) => {
      return /[A-Z]/.test(str[0]);
   },

   isDonator (i: number) { 
      return i > 0 ? 'Donator ' + i : 'Ne';
   },

   Sleep (Seconds: number) {
      return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
   },

   RandomBackground () { 
      const Backgrounds = ['city-night.png'];
      let Random = Backgrounds[Math.floor(Math.random() * Backgrounds.length)];
      return Random;

   }


}

export default Helpers;

