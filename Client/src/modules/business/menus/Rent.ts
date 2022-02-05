import { Browser } from '../../browser';

const Player = mp.players.local;

let BusinessRentMenu = false;

mp.events.add({
   'CLIENT::BUSINESS:RENT:MENU': (Business: number) => { 
      BusinessRentMenu = ! BusinessRentMenu;
      Browser.call(BusinessRentMenu ? 'BROWSER::SHOW' : `BROWSER::HIDE`, 'HouseManagement');
   }
});