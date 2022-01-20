import { Browser } from '../../browser';

const Player = mp.players.local;

let HouseManagment = false

mp.events.add({
   'CLIENT::HOUSE:MANAGEMENT': () => { 
      HouseManagment = !HouseManagment;
      Browser.call(HouseManagment ? 'BROWSER::SHOW' : `BROWSER::HIDE`, 'HouseManagement');
   },
})