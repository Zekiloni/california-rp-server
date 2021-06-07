

function CompareVectors (i, x) { 
   return i.x == x.x && i.y == x.y && i.z == x.z;
};

function LoadAnimDict (i) { 
   if (mp.game.streaming.hasAnimDictLoaded(i)) return Promise.resolve();
   return new Promise(async resolve => { 
      mp.game.streaming.requestAnimDict(i);
      while (!mp.game.streaming.hasAnimDictLoaded(i)) { 
         await mp.game.waitAsync(25);
      }
      resolve();
   })
};

function weaponString (weapon) {
	if (typeof weapon !== 'undefined')
		return '0x' + weapon.toString(16).toUpperCase()
	else 
		return '0xA2719263'
}

global.utils = { CompareVectors, LoadAnimDict, weaponString };