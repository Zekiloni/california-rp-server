const player = mp.players.local;

const FishingObject = mp.joaat('prop_fishing_rod_01');

function isPlayerInOrLookingAtWater() {
   var forward = player.getForwardVector();
   var hitData = getCameraHitCoord();

   if (player.isInWater())
   {
      mp.gui.chat.push('i in water');
      return true;
   } 

   if (hitData == 435688960) {
      mp.gui.chat.push('i see water');
      return true;
   }
   else {
      mp.gui.chat.push(`${JSON.stringify(hitData)}`);
      return false;
   }
}

setInterval(async () => {
   if (!player) return;
   isPlayerInOrLookingAtWater();
}, 1000);

function getCameraHitCoord () {
	let position = player.getCoord();
	let direction = player.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
	let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);
	
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}
