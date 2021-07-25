import { Groups } from "./Globals";



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

   isDonator (i: number) { 
      return i > 0 ? 'Donator ' + i : 'Ne';
   },
   
}

export default Helpers;

