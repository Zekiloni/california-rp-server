

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

   '9mm Municija': {
      name: '9mm Municija',
      hash: 'w_pi_combatpistol_mag2', 
      weight: 0.02,
      use: (player) => { 
         let weapon = player.weapon, bullets = 30;
         if (weapon) { 
            let ammo = player.getWeaponAmmo(weapon);
            player.setWeaponAmmo(weapon, parseInt(ammo + bullets));
         }
      }
   },

   'Cheeseburger': { 
      name: 'Cheeseburger',
      hash: 'prop_cs_burger_01',
      weight: 0.03,
      type: ItemType.Food,
      use: (player) => { 
         //player.Animation({ name: 'static', dictionary: 'amb@code_human_wander_eating_donut@male@base', flag: 49, time: 4})
         //player.playAnimation('amb@code_human_wander_eating_donut@male@base', 'static', 4, 49);
         //player.setVariable("animData", `amb@code_human_wander_eating_donut@male@base%static%49`);
      }
   },

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



   // WEAPONS // ORUZIJE 

   'Antique Cavalry Dagger': {
      name: 'Antique Cavalry Dagger', 
      hash: 'w_me_dagger',
      weapon: 'weapon_dagger', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Antique Cavalry Dagger'].weapon), ammo); 
      }
   },

   'Baseball Bat': {
         name: 'Baseball Bat', 
         hash: 'w_me_bat',
         weapon: 'weapon_bat', 
         type: ItemType.Weapon, 
         use: (player, ammo = 0) => { 
            player.giveWeapon(mp.joaat(mp.ItemRegistry['Baseball Bat'].weapon), ammo); 
         }
      },

   'Crowbar': {
         name: 'Crowbar', 
         hash: 'w_me_crowbar',
         weapon: 'weapon_crowbar', 
         type: ItemType.Weapon, 
         use: (player, ammo = 0) => { 
            player.giveWeapon(mp.joaat(mp.ItemRegistry['Crowbar'].weapon), ammo); 
         }
      },

   'Flashlight': {
         name: 'Flashlight', 
         hash: 'w_me_flashlight',
         weapon: 'weapon_flashlight', 
         type: ItemType.Weapon, 
         use: (player, ammo = 0) => { 
            player.giveWeapon(mp.joaat(mp.ItemRegistry['Flashlight'].weapon), ammo); 
         }
      },

   'Golf Club': {
         name: 'Golf Club', 
         hash: 'w_me_gclub',
         weapon: 'weapon_golfclub', 
         type: ItemType.Weapon, 
         use: (player, ammo = 0) => { 
            player.giveWeapon(mp.joaat(mp.ItemRegistry['Golf Club'].weapon), ammo); 
         }
      },

   'Hammer': {
      name: 'Hammer', 
      hash: 'w_me_hammer',
      weapon: 'weapon_hammer', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Hammer'].weapon), ammo); 
      }
   },

   'Hatchet': {
      name: 'Hatchet', 
      hash: 'w_me_hatchet',
      weapon: 'weapon_hatchet', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Hatchet'].weapon), ammo); 
      }
   },  

   'Brass Knuckles': {
      name: 'Brass Knuckles', 
      hash: 'w_me_knuckle_dmd',
      weapon: 'weapon_knuckle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Brass Knuckles'].weapon), ammo); 
      }
   },

   'Knife': {
      name: 'Knife', 
      hash: 'w_me_knife_01',
      weapon: 'weapon_knife', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Knife'].weapon), ammo); 
      }
   },

   'Machete': {
      name: 'Machete', 
      hash: 'w_me_machette_lr',
      weapon: 'weapon_machete', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Machete'].weapon), ammo); 
      }
   },

   'Switchblade': {
      name: 'Switchblade', 
      hash: 'w_me_switchblade',
      weapon: 'weapon_switchblade', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Switchblade'].weapon), ammo); 
      }
   },

   'Nightstick': {
      name: 'Nightstick', 
      hash: 'w_me_nightstick',
      weapon: 'weapon_nightstick', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Nightstick'].weapon), ammo); 
      }
   },

   'Pipe Wrench': {
      name: 'Pipe Wrench', 
      hash: 'w_me_wrench',
      weapon: 'weapon_wrench', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pipe Wrench'].weapon), ammo); 
      }
   },

   'Battle Axe': {
      name: 'Battle Axe', 
      hash: 'w_me_battleaxe',
      weapon: 'weapon_battleaxe', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Battle Axe'].weapon), ammo); 
      }
   },

   'Pool Cue': {
      name: 'Pool Cue', 
      hash: 'w_me_poolcue',
      weapon: 'weapon_poolcue', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pool Cue'].weapon), ammo); 
      }
   },

   'Pistol': {
      name: 'Pistol', 
      hash: 'w_pi_pistol',
      weapon: 'weapon_pistol', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pistol'].weapon), ammo); 
      }
   },

   'Pistol Mk II': {
      name: 'Pistol Mk II', 
      hash: 'w_pi_pistolmk2',
      weapon: 'weapon_pistol_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pistol Mk II'].weapon), ammo); 
      }
   },


   'Combat Pistol': {
      name: 'Combat Pistol', 
      hash: 'w_pi_combatpistol',
      weapon: 'weapon_combatpistol', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Combat Pistol'].weapon), ammo); 
      }
   },

   'AP Pistol': {
      name: 'AP Pistol', 
      hash: 'w_pi_appistol',
      weapon: 'weapon_appistol', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['AP Pistol'].weapon), ammo); 
      }
   },

   'Stun Gun': {
      name: 'Stun Gun', 
      hash: 'w_pi_stungun',
      weapon: 'weapon_stungun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Stun Gun'].weapon), ammo); 
      }
   },

   'Pistol .50': {
      name: 'Pistol .50', 
      hash: 'w_pi_pistol50',
      weapon: 'weapon_pistol50', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pistol .50'].weapon), ammo); 
      }
   },

   'SNS Pistol': {
      name: 'SNS Pistol', 
      hash: 'w_pi_sns_pistol',
      weapon: 'weapon_snspistol', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['SNS Pistol'].weapon), ammo); 
      }
   },


   'SNS Pistol Mk II': {
      name: 'SNS Pistol Mk II', 
      hash: 'w_pi_sns_pistolmk2',
      weapon: 'weapon_snspistol_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['SNS Pistol'].weapon), ammo); 
      }
   },


   'Heavy Pistol': {
      name: 'Heavy Pistol', 
      hash: 'w_pi_heavypistol',
      weapon: 'weapon_heavypistol', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Heavy Pistol'].weapon), ammo); 
      }
   },

   'Vintage Pistol': {
      name: 'Vintage Pistol', 
      hash: 'w_pi_vintage_pistol',
      weapon: 'weapon_vintagepistol', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Vintage Pistol'].weapon), ammo); 
      }
   },

   'Flare Gun': {
      name: 'Flare Gun', 
      hash: 'w_pi_flaregun',
      weapon: 'weapon_flaregun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Flare Gun'].weapon), ammo); 
      }
   },

   'Heavy Revolver': {
      name: 'Heavy Revolver', 
      hash: 'w_pi_revolver',
      weapon: 'weapon_revolver', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Heavy Revolver'].weapon), ammo); 
      }
   },

   'Heavy Revolver Mk II': {
      name: 'Heavy Revolver Mk II', 
      hash: 'w_pi_revolvermk2',
      weapon: 'weapon_revolver_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Heavy Revolver Mk II'].weapon), ammo); 
      }
   },

   'Navy Revolver': {
      name: 'Navy Revolver', 
      hash: 'w_pi_wep2_gun',
      weapon: 'weapon_navyrevolver', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Navy Revolver'].weapon), ammo); 
      }
   },

   'Micro SMG': {
         name: 'Micro SMG', 
         hash: 'w_sb_microsmg',
         weapon: 'weapon_microsmg', 
         type: ItemType.Weapon, 
         use: (player, ammo = 0) => { 
            player.giveWeapon(mp.joaat(mp.ItemRegistry['Micro SMG'].weapon), ammo); 
         }
      },

   'SMG': {
      name: 'SMG', 
      hash: 'w_sb_smg',
      weapon: 'weapon_smg', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['SMG'].weapon), ammo); 
      }
   },

   'SMG Mk II': {
      name: 'SMG Mk II', 
      hash: 'w_sb_smgmk2',
      weapon: 'weapon_smg_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['SMG Mk II'].weapon), ammo); 
      }
   },

   'Assault SMG': {
      name: 'Assault SMG', 
      hash: 'w_sb_assaultsmg',
      weapon: 'weapon_assaultsmg', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Assault SMG'].weapon), ammo); 
      }
   },

   'Combat PDW': {
      name: 'Combat PDW', 
      hash: 'w_sb_pdw',
      weapon: 'weapon_combatpdw', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Combat PDW'].weapon), ammo); 
      }
   },

   'Machine Pistol': {
      name: 'Machine Pistol', 
      hash: 'w_sb_compactsmg',
      weapon: 'weapon_machinepistol', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Machine Pistol'].weapon), ammo); 
      }
   },

   'Mini SMG': {
      name: 'Mini SMG', 
      hash: 'w_sb_minismg',
      weapon: 'weapon_minismg', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Mini SMG'].weapon), ammo); 
      }
   },

   'Pump Shotgun': {
      name: 'Pump Shotgun', 
      hash: 'w_sg_pumpshotgun',
      weapon: 'weapon_pumpshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pump Shotgun'].weapon), ammo); 
      }
   },

   'Pump Shotgun Mk II': {
      name: 'Pump Shotgun Mk II', 
      hash: 'w_sg_pumpshotgunmk2',
      weapon: 'weapon_pumpshotgun_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pump Shotgun Mk II'].weapon), ammo); 
      }
   },

   'Sawed-Off Shotgun': {
      name: 'Sawed-Off Shotgun', 
      hash: 'w_sg_sawnoff',
      weapon: 'weapon_sawnoffshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Sawed-Off Shotgun'].weapon), ammo); 
      }
   },

   'Assault Shotgun': {
      name: 'Assault Shotgun', 
      hash: 'w_sg_assaultshotgun',
      weapon: 'weapon_assaultshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Assault Shotgun'].weapon), ammo); 
      }
   },

   'Bullpup Shotgun': {
      name: 'Bullpup Shotgun', 
      hash: 'w_sg_bullpupshotgun',
      weapon: 'weapon_bullpupshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Bullpup Shotgun'].weapon), ammo); 
      }
   },

   'Heavy Shotgun': {
      name: 'Heavy Shotgun', 
      hash: 'w_sg_heavyshotgun',
      weapon: 'weapon_heavyshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Heavy Shotgun'].weapon), ammo); 
      }
   },

   'Musket': {
      name: 'Musket', 
      hash: 'w_ar_musket',
      weapon: 'weapon_musket', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Musket'].weapon), ammo); 
      }
   },

   'Heavy Shotgun': {
      name: 'Heavy Shotgun', 
      hash: 'w_sg_heavyshotgun',
      weapon: 'weapon_heavyshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Heavy Shotgun'].weapon), ammo); 
      }
   },

   'Double Barrel Shotgun': {
      name: 'Double Barrel Shotgun', 
      hash: 'w_sg_doublebarrel',
      weapon: 'weapon_dbshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Double Barrel Shotgun'].weapon), ammo); 
      }
   },

   'Sweeper Shotgun': {
      name: 'Sweeper Shotgun', 
      hash: 'w_sg_sweeper',
      weapon: 'weapon_autoshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Sweeper Shotgun'].weapon), ammo); 
      }
   },

   'Combat Shotgun': {
      name: 'Combat Shotgun', 
      hash: 'w_sg_pumpshotgunh4',
      weapon: 'weapon_combatshotgun', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Combat Shotgun'].weapon), ammo); 
      }
   },

   'Assault Rifle': {
      name: 'Assault Rifle', 
      hash: 'w_ar_assaultrifle',
      weapon: 'weapon_assaultrifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Assault Rifle'].weapon), ammo); 
      }
   },

   'Assault Rifle Mk II': {
      name: 'Assault Rifle Mk II', 
      hash: 'w_ar_assaultriflemk2',
      weapon: 'weapon_assaultrifle_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry[' Assault Rifle Mk II'].weapon), ammo); 
      }
   },

   'Carbine Rifle': {
      name: 'Carbine Rifle', 
      hash: 'w_ar_carbinerifle',
      weapon: 'weapon_carbinerifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Carbine Rifle'].weapon), ammo); 
      }
   },

   'Carbine Rifle Mk II': {
      name: 'Carbine Rifle Mk II', 
      hash: 'w_ar_carbineriflemk2',
      weapon: 'weapon_carbinerifle_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Carbine Rifle Mk II'].weapon), ammo); 
      }
   },

   'Advanced Rifle': {
      name: 'Advanced Rifle', 
      hash: 'w_ar_advancedrifle',
      weapon: 'weapon_advancedrifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Advanced Rifle'].weapon), ammo); 
      }
   },

   'Special Carbine': {
      name: 'Special Carbine', 
      hash: 'w_ar_specialcarbine',
      weapon: 'weapon_specialcarbine', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Special Carbine'].weapon), ammo); 
      }
   },

   'Special Carbine Mk II': {
      name: 'Special Carbine Mk II', 
      hash: 'w_ar_specialcarbinemk2',
      weapon: 'weapon_specialcarbine_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Special Carbine Mk II'].weapon), ammo); 
      }
   },

   'Bullpup Rifle': {
      name: 'Bullpup Rifle', 
      hash: 'w_ar_bullpuprifle',
      weapon: 'weapon_bullpuprifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Bullpup Rifle'].weapon), ammo); 
      }
   },

   'Bullpup Rifle Mk II': {
      name: 'Bullpup Rifle Mk II', 
      hash: 'w_ar_bullpupriflemk2',
      weapon: 'weapon_bullpuprifle_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Bullpup Rifle Mk II'].weapon), ammo); 
      }
   },

   'Compact Rifle': {
      name: 'Compact Rifle', 
      hash: 'w_ar_assaultrifle_smg',
      weapon: 'weapon_compactrifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Compact Rifle'].weapon), ammo); 
      }
   },

   'Military Rifle': {
      name: 'Military Rifle', 
      hash: 'w_ar_bullpuprifleh4',
      weapon: 'weapon_militaryrifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Military Rifle'].weapon), ammo); 
      }
   },

   'MG': {
      name: 'MG', 
      hash: 'w_mg_mg',
      weapon: 'weapon_mg', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['MG'].weapon), ammo); 
      }
   },

   'Combat MG': {
      name: 'Combat MG', 
      hash: 'w_mg_combatmg',
      weapon: 'weapon_combatmg', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Combat MG'].weapon), ammo); 
      }
   },

   'Combat MG Mk II': {
      name: 'Combat MG Mk II', 
      hash: 'w_mg_combatmgmk2',
      weapon: 'weapon_combatmg_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Combat MG Mk II'].weapon), ammo); 
      }
   },

   'Gusenberg Sweeper': {
      name: 'Gusenberg Sweeper', 
      hash: 'w_sb_gusenberg',
      weapon: 'weapon_gusenberg', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Gusenberg Sweeper'].weapon), ammo); 
      }
   },


   'Sniper Rifle': {
      name: 'Sniper Rifle', 
      hash: 'w_sr_sniperrifle',
      weapon: 'weapon_sniperrifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Sniper Rifle'].weapon), ammo); 
      }
   },

   'Heavy Sniper': {
      name: 'Heavy Sniper', 
      hash: 'w_sr_heavysniper',
      weapon: 'weapon_heavysniper', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Heavy Sniper'].weapon), ammo); 
      }
   },

   'Heavy Sniper Mk II': {
      name: 'Heavy Sniper Mk II', 
      hash: 'w_sr_heavysnipermk2',
      weapon: 'weapon_heavysniper_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Heavy Sniper Mk II'].weapon), ammo); 
      }
   },

   'Marksman Rifle': {
      name: 'Marksman Rifle', 
      hash: 'w_sr_marksmanrifle',
      weapon: 'weapon_marksmanrifle', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Marksman Rifle'].weapon), ammo); 
      }
   },

   'Marksman Rifle Mk II': {
      name: 'Marksman Rifle Mk II', 
      hash: 'w_sr_marksmanriflemk2',
      weapon: 'weapon_marksmanrifle_mk2', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Marksman Rifle Mk II'].weapon), ammo); 
      }
   },

   'Grenade': {
      name: 'Grenade', 
      hash: 'w_ex_grenadefrag',
      weapon: 'weapon_grenade', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Grenade'].weapon), ammo); 
      }
   },

   'BZ Gas': {
      name: 'BZ Gas', 
      hash: '',
      weapon: 'weapon_bzgas', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['BZ Gas'].weapon), ammo); 
      }
   },

   'Molotov Cocktail': {
      name: 'Molotov Cocktail', 
      hash: 'w_ex_molotov',
      weapon: 'weapon_molotov', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Molotov Cocktail'].weapon), ammo); 
      }
   },

   'Sticky Bomb': {
      name: 'Sticky Bomb', 
      hash: 'w_ex_pe',
      weapon: 'weapon_stickybomb', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Sticky Bomb'].weapon), ammo); 
      }
   },

   'Proximity Mines': {
      name: 'Proximity Mines', 
      hash: 'w_ex_apmine',
      weapon: 'weapon_proxmine', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Proximity Mines'].weapon), ammo); 
      }
   },

   'Pipe Bombs': {
      name: 'Pipe Bombs', 
      hash: 'w_ex_pipebomb',
      weapon: 'weapon_pipebomb', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Pipe Bombs'].weapon), ammo); 
      }
   },

   'Tear Gas': {
      name: 'Tear Gas', 
      hash: 'w_ex_grenadesmoke',
      weapon: 'weapon_smokegrenade', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Tear Gas'].weapon), ammo); 
      }
   },

   'Flare': {
      name: 'Flare', 
      hash: 'w_am_flare',
      weapon: 'weapon_flare', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Flare'].weapon), ammo); 
      }
   },

   'Jerry Can': {
      name: 'Jerry Can', 
      hash: 'w_am_jerrycan',
      weapon: 'weapon_petrolcan', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Jerry Can'].weapon), ammo); 
      }
   },

   'Parachute': {
      name: 'Parachute', 
      hash: 'p_parachute_s',
      weapon: 'gadget_parachute', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Parachute'].weapon), ammo); 
      }
   },

   'Fire Extinguisher': {
      name: 'Fire Extinguisher', 
      hash: 'w_am_fire_exting',
      weapon: 'weapon_fireextinguisher', 
      type: ItemType.Weapon, 
      use: (player, ammo = 0) => { 
         player.giveWeapon(mp.joaat(mp.ItemRegistry['Fire Extinguisher'].weapon), ammo); 
      }
   }
};


