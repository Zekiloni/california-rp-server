
global.INVENTORY_ENTITIES = { 
   Ground: -1, Player: 0, Vehicle: 1, House: 2, 
   Wheel: 3, LeftHand: 4, RightHand: 5
}

const item_types = { 
   Drug: 0, Equipable: 1, Openable: 2, Weapon: 3,
   Ammo: 4, Misc: 5, Food: 6, Drink: 7,
}

mp.itemList = { 
   'M4 Carbine Rifle': { 
      name: 'M4 Carbine Rifle',
      hash: 'w_ar_carbinerifle',
      weapon: 'weapon_carbinerifle',
      weight: 0.03,
      type: item_types.Weapon
   },
   
   'Combat Pistol': { 
      name: 'Combat Pistol',
      hash: 'w_pi_combatpistol',
      weapon: 'weapon_combatpistol',
      weight: 0.03,
      type: item_types.Weapon
   },

   'Cheeseburger': { 
      name: 'Cheeseburger',
      hash: 'ng_proc_beerbottle_01a',
      weight: 0.03,
      type: item_types.Food
   },

   'Water Bottle': { 
      name: 'Water Bottle',
      hash: 'ng_proc_beerbottle_01a',
      weight: 0.03,
      type: item_types.Drink
   }
};