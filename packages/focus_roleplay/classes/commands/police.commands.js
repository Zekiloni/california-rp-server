module.exports = { 
   commands: [ 
      {
         name: 'equip',
         call: (player, args) => { 
            let character = player.getCharacter();
            const weaponNames = ["weapon_stungun", "weapon_combatpistol", "weapon_nightstick", "weapon_flashlight"];
            for (let i in weaponNames){
               player.giveWeapon(mp.joaat(weaponNames[i]), 9999);
            }
            
            if (character.gender == 1) { 
               player.setClothes(11, 143, 0, 0);
               player.setClothes(8, 122, 0, 0);
               player.setClothes(4, 277, 0, 0);
               player.setClothes(6, 153, 0, 0);
               player.setClothes(3, 1, 0, 0);
            } else { 
               player.setClothes(11, 142, 0, 0);
               player.setClothes(8, 120, 0, 0);
               player.setClothes(4, 10, 0, 0);
               player.setClothes(6, 153, 0, 0);
               player.setClothes(7, 2, 0, 0);
            }

         }
      },
   ]
}