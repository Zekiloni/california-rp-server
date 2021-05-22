

function CompareVectors (i, x) { 
   return i.x == x.x && i.y == x.y && i.z == x.z;
}

global.utils = { CompareVectors };