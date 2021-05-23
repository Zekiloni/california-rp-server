

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

global.utils = { CompareVectors, LoadAnimDict };