import { Browser } from '../../browser';


let active: boolean = false;


mp.events.add('CLIENT::DEATHSCREEN', toggleDeathscreen);

function toggleDeathscreen (toggle: number | false){ 

   active = toggle ? true : false;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'deathScreen');
}