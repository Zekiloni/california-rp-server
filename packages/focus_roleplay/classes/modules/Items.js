
global.INVENTORY_ENTITIES = { 
   Ground: -1, Player: 0, Vehicle: 1, House: 2, 
   Wheel: 3, LeftHand: 4, RightHand: 5
}

const ItemType = { 
   Drug: 0, Equipable: 1, Openable: 2, Weapon: 3,
   Ammo: 4, Misc: 5, Food: 6, Drink: 7,
}

mp.ItemRegistry = { 
   'M4 Carbine Rifle': { 
      name: 'M4 Carbine Rifle',
      hash: 'w_ar_carbinerifle',
      weapon: 'weapon_carbinerifle',
      weight: 0.03,
      type: ItemType.Weapon,
      use: (player) => { 
         player.giveWeapon(mp.joaat(weapon), 0);
      }
   },
   
   'Combat Pistol': { 
      name: 'Combat Pistol',
      hash: 'w_pi_combatpistol',
      weapon: 'weapon_combatpistol',
      weight: 0.03,
      type: ItemType.Weapon
   },

   'Cheeseburger': { 
      name: 'Cheeseburger',
      hash: 'ng_proc_beerbottle_01a',
      weight: 0.03,
      type: ItemType.Food
   },

   'Water Bottle': { 
      name: 'Water Bottle',
      hash: 'ng_proc_beerbottle_01a',
      weight: 0.03,
      type: ItemType.Drink
   }
};

