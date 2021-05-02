
const Weapons = require ('../../configs/Weapons')

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



   'Water Battle': { 
      name: 'Water Battle',
      hash: 'prop_ld_flow_bottle',
      weight: 0.03,
      type: ItemType.Drink
   },

   'Radio Prijemnik': { 
      name: 'Radio Prijemnik',
      hash: 'prop_cs_hand_radio',
      weight: 0.03,
      type: ItemType.Misc
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
   },


   // AMMOS // MUNICIJA

};


mp.ItemRegistry = {};

class Item {
   constructor (name, type, object, weight, data, use) { 
      this.name = name;
      this.type = type;
      this.hash = object;
      this.weight = weight || 0.25;
      this.use = use;

      if (data.weapon) { 
         this.weapon = data.weapon || null;
         this.ammo = data.ammo || null;
      }

      if (data.quantity) { 
         this.quantity = data.quantity;
      }

      mp.ItemRegistry[this.name] = this;
   }
}


// HRANA 

new Item ('Cheeseburger', ItemType.Weapon, 'prop_cs_burger_01', 0, false, function (player) { 
   // nahrani ga
})


new Item('iFruit Smartphone', ItemType.Misc, 'prop_player_phone_01', 0.3, function (player) { 
   let character = player.getCharacter(), phone = mp.phones[character.phone_number];
   if (!phone.turned) return; // telefon ti je ugasen
   player.call('client:player.phone', phone);
})

// AMMOS / MUNICIJA 

new Item ('9mm Catridge', ItemType.Ammo, 'w_pi_combatpistol_mag1', 0, { quantity: 32 }, function () { })
new Item ('10mm Catridge', ItemType.Ammo, 'w_pi_pistol50_mag2', 0, { quantity: 27 }, function () { })
new Item ('.357 Catridge', ItemType.Ammo, 'w_mg_mg_mag2', 0, { quantity: 15 }, function () { })
new Item ('7.62 Catridge', ItemType.Ammo, 'w_ar_specialcarbine_mag2', 0, { quantity: 70 }, function () { })
new Item ('5.56 Catridge', ItemType.Ammo, 'w_ar_carbinerifle_mag2', 0, { quantity: 70 }, function () { })
new Item ('.338 Catridge', ItemType.Ammo, 'w_sr_sniperrifle_mag1', 0, { quantity: 15 }, function () { })
new Item ('Buckshot Catridge', ItemType.Ammo, 'w_sg_heavyshotgun_mag1', 0, { quantity: 25 }, function () { })
new Item ('Slug Catridge', ItemType.Ammo, 'w_sg_heavyshotgun_mag2', 0, { quantity: 25 }, function () { })

// WEAPONS / ORUZIJE

new Item ('Antique Cavalry Dagger', ItemType.Weapon, 'w_me_dagger', 0, { weapon: 'weapon_dagger' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Baseball Bat', ItemType.Weapon, 'w_me_bat', 0, { weapon: 'weapon_bat' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Crowbar', ItemType.Weapon, 'w_me_crowbar', 0, { weapon: 'weapon_crowbar' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Flashlight', ItemType.Weapon, 'w_me_flashlight', 0, { weapon: 'weapon_flashlight' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Golf Club', ItemType.Weapon, 'w_me_gclub', 0, { weapon: 'weapon_golfclub' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Hammer', ItemType.Weapon, 'w_me_hammer', 0, { weapon: 'weapon_hammer' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Hatchet', ItemType.Weapon, 'w_me_hatchet', 0, { weapon: 'weapon_hatchet' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Brass Knuckles', ItemType.Weapon, 'w_me_knuckle_dmd', 0, { weapon: 'weapon_knuckle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Knife', ItemType.Weapon, 'w_me_knife_01', 0, { weapon: 'weapon_knife' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
new Item ('Machete', ItemType.Weapon, 'w_me_machete_lr', 0, { weapon: 'weapon_machete' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Switchblade', ItemType.Weapon, 'w_me_switchblade', 0, { weapon: 'weapon_switchblade' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Nightstick', ItemType.Weapon, 'w_me_nightstick', 0, { weapon: 'weapon_nightstick' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pipe Wrench', ItemType.Weapon, 'w_me_wrench', 0, { weapon: 'weapon_wrench' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Battle Axe', ItemType.Weapon, 'w_me_battleaxe', 0, { weapon: 'weapon_battleaxe' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pool Cue', ItemType.Weapon, 'w_me_poolcue', 0, { weapon: 'weapon_poolcue' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pistol', ItemType.Weapon, 'w_pi_pistol', 0, { weapon: 'weapon_pistol' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pistol Mk II', ItemType.Weapon, 'w_pi_pistolmk2', 0, { weapon: 'weapon_pistol_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Combat Pistol', ItemType.Weapon, 'w_pi_combatpistol', 0, { weapon: 'weapon_combatpistol' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('AP Pistol', ItemType.Weapon, 'w_pi_appistol', 0, { weapon: 'weapon_appistol' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Stun Gun', ItemType.Weapon, 'w_pi_stungun', 0, { weapon: 'weapon_stungun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pistol .50', ItemType.Weapon, 'w_pi_pistol50', 0, { weapon: 'weapon_pistol50', ammo: '.50 Catridge' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})

 
new Item ('SNS Pistol', ItemType.Weapon, 'w_pi_sns_pistol', 0, { weapon: 'weapon_snspistol', ammo: '9mm Catridge' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('SNS Pistol Mk II', ItemType.Weapon, 'w_pi_sns_pistolmk2', 0, { weapon: 'weapon_snspistol_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Heavy Pistol', ItemType.Weapon, 'w_pi_heavypistol', 0, { weapon: 'weapon_heavypistol' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Vintage Pistol', ItemType.Weapon, 'w_pi_vintage_pistol', 0, { weapon: 'weapon_vintagepistol' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Flare Gun', ItemType.Weapon, 'w_pi_flaregun', 0, { weapon: 'weapon_flaregun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Heavy Revolver', ItemType.Weapon, 'w_pi_revolver', 0, { weapon: 'weapon_revolver' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Navy Revolver', ItemType.Weapon, 'w_pi_revolvermk2', 0, { weapon: 'weapon_navyrevolver' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})

new Item ('Heavy Revolver Mk II', ItemType.Weapon, 'w_pi_revolvermk2', 0, { weapon: 'weapon_revolver_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Micro SMG', ItemType.Weapon, 'w_sb_microsmg', 0, { weapon: 'weapon_microsmg' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('SMG', ItemType.Weapon, 'w_sb_smg', 0, { weapon: 'weapon_smg' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('SMG MK II', ItemType.Weapon, ' w_sb_smgmk2', 0, { weapon: 'weapon_smg_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Assault SMG', ItemType.Weapon, 'w_sb_assaultsmg', 0, { weapon: 'weapon_assaultsmg' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Combat PDW', ItemType.Weapon, 'w_sb_pdw', 0, { weapon: 'weapon_combatpdw' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Machine Pistol', ItemType.Weapon, 'w_sb_compactsmg', 0, { weapon: 'weapon_machinepistol' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Mini SMG', ItemType.Weapon, 'w_sb_minismg', 0, { weapon: 'weapon_minismg' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pump Shotgun', ItemType.Weapon, 'w_sg_pumpshotgun', 0, { weapon: 'weapon_pumpshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pump Shotgun Mk II', ItemType.Weapon, 'w_sg_pumpshotgunmk2', 0, { weapon: 'weapon_pumpshotgun_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Sawed-Off Shotgun', ItemType.Weapon, 'w_sg_sawnoff', 0, { weapon: 'weapon_sawnoffshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Assault Shotgun', ItemType.Weapon, 'w_sg_assaultshotgun', 0, { weapon: 'weapon_assaultshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Bullpup Shotgun', ItemType.Weapon, 'w_sg_bullpupshotgun', 0, { weapon: 'weapon_bullpupshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Musket', ItemType.Weapon, 'w_ar_musket', 0, { weapon: 'weapon_musket' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Heavy Shotgun', ItemType.Weapon, 'w_sg_heavyshotgun', 0, { weapon: 'weapon_heavyshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Double Barrel Shotgun', ItemType.Weapon, 'w_sg_doublebarrel', 0, { weapon: 'weapon_dbshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Sweeper Shotgun', ItemType.Weapon, 'w_sg_sweeper', 0, { weapon: 'weapon_autoshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Combat Shotgun', ItemType.Weapon, 'w_sg_pumpshotgunh4', 0, { weapon: 'weapon_combatshotgun' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Assault Rifle', ItemType.Weapon, 'w_ar_assaultrifle', 0, { weapon: 'weapon_assaultrifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Assault Rifle Mk II', ItemType.Weapon, 'w_ar_assaultriflemk2', 0, { weapon: 'weapon_assaultrifle_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Carbine Rifle', ItemType.Weapon, 'w_ar_carbinerifle', 0, { weapon: 'weapon_carbinerifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Carbine Rifle Mk II', ItemType.Weapon, 'w_ar_carbineriflemk2', 0, { weapon: 'weapon_carbinerifle_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Advanced Rifle', ItemType.Weapon, 'w_ar_advancedrifle', 0, { weapon: 'weapon_advancedrifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Special Carbine', ItemType.Weapon, 'w_ar_specialcarbine', 0, { weapon: 'weapon_specialcarbine' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Special Carbine Mk II', ItemType.Weapon, 'w_ar_specialcarbinemk2', 0, { weapon: 'weapon_specialcarbine_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Bullpup Rifle', ItemType.Weapon, 'w_ar_bullpuprifle', 0, { weapon: 'weapon_bullpuprifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Bullpup Rifle Mk II', ItemType.Weapon, 'w_ar_bullpupriflemk2', 0, { weapon: 'weapon_bullpuprifle_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Compact Rifle', ItemType.Weapon, 'w_ar_assaultrifle_smg', 0, { weapon: 'weapon_compactrifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Military Rifle', ItemType.Weapon, 'w_ar_bullpuprifleh4', 0, { weapon: 'weapon_militaryrifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('MG', ItemType.Weapon, 'w_mg_mg', 0, { weapon: 'weapon_mg' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Combat MG', ItemType.Weapon, 'w_mg_combatmg', 0, { weapon: 'weapon_combatmg' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Combat MG Mk II', ItemType.Weapon, 'w_mg_combatmgmk2', 0, { weapon: 'weapon_combatmg_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Gusenberg Sweeper', ItemType.Weapon, 'w_sb_gusenberg', 0, { weapon: 'weapon_gusenberg' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Sniper Rifle', ItemType.Weapon, 'w_sr_sniperrifle', 0, { weapon: 'weapon_sniperrifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Heavy Sniper', ItemType.Weapon, 'w_sr_heavysniper', 0, { weapon: 'weapon_heavysniper' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Heavy Sniper Mk II', ItemType.Weapon, 'w_sr_heavysnipermk2', 0, { weapon: 'weapon_heavysniper_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Marksman Rifle', ItemType.Weapon, 'w_sr_marksmanrifle', 0, { weapon: 'weapon_marksmanrifle' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Marksman Rifle Mk II', ItemType.Weapon, 'w_sr_marksmanriflemk2', 0, { weapon: 'weapon_marksmanrifle_mk2' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Grenade', ItemType.Weapon, 'w_ex_grenadefrag', 0, { weapon: 'weapon_grenade' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('BZ Gas', ItemType.Weapon, 'prop_gas_grenade', 0, { weapon: 'weapon_bzgas' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Molotov Cocktail', ItemType.Weapon, 'w_ex_molotov', 0, { weapon: 'weapon_molotov' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Sticky Bomb', ItemType.Weapon, 'w_ex_pe', 0, { weapon: 'weapon_stickybomb' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Proximity Mines', ItemType.Weapon, 'w_ex_apmine', 0, { weapon: 'weapon_proxmine' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Pipe Bombs', ItemType.Weapon, 'w_ex_pipebomb', 0, { weapon: 'weapon_pipebomb' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Tear Gas', ItemType.Weapon, 'w_ex_grenadesmoke', 0, { weapon: 'weapon_smokegrenade' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Flare', ItemType.Weapon, 'w_am_flare', 0, { weapon: 'weapon_flare' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Jerry Can', ItemType.Weapon, 'w_am_jerrycan', 0, { weapon: 'weapon_petrolcan' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Parachute', ItemType.Weapon, 'p_parachute_s', 0, { weapon: 'gadget_parachute' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})
 
new Item ('Fire Extinguisher', ItemType.Weapon, 'w_am_fire_exting', 0, { weapon: 'weapon_fireextingusher' }, function (player, ammo = 0) { 
   player.giveWeapon(mp.joaat(this.weapon), ammo); 
})

// mp.ItemRegistry = {};




function weaponNameByHash (i) {
   let query = "0x" + i.toString(16).toUpperCase()
   for (let f in Weapons) { 
      let w = Weapons[f];
      if (w === query) { 
         return 'weapon_' + f;
      }
   }
}


function isAmmoValid (weapon, ammo) { 
   let name = weaponNameByHash(weapon);
   for (let i in mp.ItemRegistry) { 
      let item = mp.ItemRegistry[i];
      if (item.weapon && item.weapon == name) { 
         if (item.ammo && item.ammo == ammo) { 
            return true;
         } else {
            return false;
         }
      }
   }
}


mp.Player.prototype.giveAmmo = function (quantity, catridge) { 
   let weapon = this.weapon;
   if (weapon) { 
      let valid = isAmmoValid(this.weapon, catridge)
      if (valid) { 
         let ammo = this.getWeaponAmmo(weapon);
         this.setWeaponAmmo(weapon, parseInt(ammo + quantity));
      } else {
         return false;
      }
   } else { 
      return false;
   }
}

