import { Browser } from '../../../browser';


let isDeatScreenActive: boolean = false;

function deathScreen (toggle: number | false){ 

   isDeatScreenActive = toggle ? true : false;
   Browser.call(isDeatScreenActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'deathScreen');
}


mp.events.add('CLIENT::DEATHSCREEN', deathScreen);
