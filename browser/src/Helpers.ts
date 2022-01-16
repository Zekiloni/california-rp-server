import { Groups } from './globals';


const Helpers = { 

   dateTime: () => { 
      let date = new Date();
      let utc = date.getTime() + (date.getTimezoneOffset() * 60000);

      return new Date(utc + (3600000 * + 1));
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

   Sleep (Seconds: number) {
      return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
   }

}

export default Helpers;

