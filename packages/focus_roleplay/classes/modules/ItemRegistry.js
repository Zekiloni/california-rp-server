
const ItemEntities = { 
   Ground: -1, Player: 0, Vehicle: 1, House: 2, 
   Wheel: 3, LeftHand: 4, RightHand: 5
}

const ItemType = { 
   Drug: 0, Equipable: 1, Openable: 2, Weapon: 3,
   Ammo: 4, Misc: 5, Food: 6, Drink: 7,
}

module.exports = { ItemType, ItemEntities }

mp.ItemRegistry = { 
   'Carbine Rifle': { 
      name: 'Carbine Rifle',
      hash: 'w_ar_carbinerifle',
      weapon: 'weapon_carbinerifle',
      weight: 0.1,
      type: ItemType.Weapon,
      use: (player) => { 
         player.giveWeapon(mp.joaat(weapon), 0);
      }
   },
   
   'Combat Pistol': { 
      name: 'Combat Pistol',
      hash: 'w_pi_combatpistol',
      weapon: 'weapon_combatpistol',
      weight: 0.08,
      caliber: '9mm Ammo',
      type: ItemType.Weapon,
      use: (player) => { 
         player.giveWeapon(mp.joaat(weapon), 0);
      }
   },

   '9mm Ammo': { 
      weight: 0.01,
      use: (player) => { 
         if (player.weapon) { 
            if (mp.ItemRegistry[player.weapon.name]) { }
         }
      }
   },

   'Cheeseburger': { 
      name: 'Cheeseburger',
      hash: 'prop_cs_burger_01',
      weight: 0.03,
      type: ItemType.Food
   },

   'Flaša Vode': { 
      name: 'Flaša Vode',
      hash: 'prop_ld_flow_bottle',
      weight: 0.03,
      type: ItemType.Drink
   },

   'Redwood Cigarete': { 
      name: 'Redwood Cigarete',
      hash: 'prop_cigar_pack_01',
      weight: 0.05,
      type: ItemType.Misc
   },

   'Upaljač': { 
      name: 'Upaljač',
      hash: 'p_cs_lighter_01',
      weight: 0.01,
      type: ItemType.Misc
   },

   'Pizza HOT': { 
      name: 'Pizza HOT',
      hash: 'prop_cigar_pack_01',
      weight: 0.09,
      type: ItemType.Food
   },

   'Pizza': { 
      name: 'Pizza',
      hash: 'prop_pizza_box_02',
      weight: 0.09,
      type: ItemType.Food
   }
};

