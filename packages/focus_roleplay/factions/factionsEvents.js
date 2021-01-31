

mp.events.add({
   'playerEnterColshape': (player, shape) => {
      if(player.faction == FACTION_POLICE) { 
         switch(shape.name) {
            case 'weapon':
               player.call('client:showPoliceWeaponary');
               break;
   
            case 'garage':
               player.call('client:showPoliceWeaponary');
               break;
   
            default:
               return false;
          }
      }
   },

   'server:policeGiveWeapon': (player, name, weapon, ammo) => {
      let weaponHash = mp.joaat(weapon);
      player.giveWeapon(weaponHash, parseInt(ammo) || 15);
      account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} uzima ${name} iz ormarica.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
   }
});