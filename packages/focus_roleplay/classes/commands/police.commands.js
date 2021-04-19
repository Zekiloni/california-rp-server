module.exports = { 
   commands: [ 
      {
         name: 'equip',
         call: (player, args) => { 
            let character = player.getCharacter();
            const weaponNames = ['weapon_stungun', 'weapon_combatpistol', 'weapon_nightstick', 'weapon_flashlight', 'weapon_pumpshotgun', 'weapon_carbinerifle'];
            for (let i in weaponNames){
               player.giveWeapon(mp.joaat(weaponNames[i]), 9999);
            }
            
            if (character.gender == 1) { 
               player.setClothes(0, 0, 0, 2);
               player.setClothes(1, 0, 0, 2);
               player.setClothes(3, 14, 0, 2);
               player.setClothes(4, 34, 0, 2);
               player.setClothes(5, 0, 0, 2);
               player.setClothes(6, 25, 0, 2);
               player.setClothes(7, 0, 0, 2);
               player.setClothes(8, 35, 0, 2);
               player.setClothes(9, 0, 0, 2);
               player.setClothes(10, 0, 0, 2);
               player.setClothes(11, 48, 0, 2);
            } else { 
               player.setClothes(0, 0, 0, 2);
               player.setClothes(1, 0, 0, 2);
               player.setClothes(3, 0, 0, 2);
               player.setClothes(4, 35, 0, 2);
               player.setClothes(5, 0, 0, 2);
               player.setClothes(6, 25, 0, 2);
               player.setClothes(7, 0, 0, 2);
               player.setClothes(8, 58, 0, 2);
               player.setClothes(9, 0, 0, 2);
               player.setClothes(10, 0, 0, 2);
               player.setClothes(11, 55, 0, 2);
            }

         }
      },
   ]
}