
// const Weapons = require('../data/Weapons.json');


export class Items {

   Name: string;
   Type: Items.Type[];
   Model: string;
   Weight: number;
   Description?: string;
   Carry_Model?: string;
   Weapon_Hash?: string;
   Caliber?: string;
   Component?: number;
   Consist?: string;
   Hunger?: number;
   Thirst?: number;
   Use?(): void;

   static List: { [key:string] : Items } = {};
   
   constructor (Name: string, Type: Items.Type[], Model: string, Weight: number = 0.1, Desc: string = '', Data: object = {}) { // Data: Items
      this.Name = Name;
      this.Type = Type;
      this.Model = Model;
      this.Weight = Weight;     
      this.Description = Desc;
      // this.Carry_Model = Data.Carry_Model;
      // this.Weapon_Hash = Data.Weapon_Hash;
      // this.Caliber = Data.Caliber;
      // this.Component = Data.Component;
      // this.Hunger = Data.Hunger;
      // this.Thirst = Data.Thirst;
      
      Items.List[this.Name] = this;
   }

}


export namespace Items {

   export enum Type {
      Equipable, Consumable, Openable, 
      Drink, Food, Alcohol, Drug, Weapon, 
      Ammo, Ilegal, Legal, Misc, Clothing,
      Prop, Heavy, Stackable, Usable
   }

   export enum Entity { 
      Ground, Player, Equiped,
      Left_Hand, Right_Hand, Bag,
      Vehicle, tempVehicle, House,
      Business
   }

   export const Status = { 
      Food: {
         Raw: 0, Cooked: 1
      }
   }
}


/* CLOTHING */
new Items('Mask', [Items.Type.Equipable, Items.Type.Clothing], 'prop_michael_balaclava', 0.3, 'Mask for Head');
new Items('Pants', [Items.Type.Equipable, Items.Type.Clothing], 'prop_ld_jeans_01', 0.2, 'Pants for legs');
new Items('Bag', [Items.Type.Equipable, Items.Type.Clothing], 'prop_michael_backpack', 0.45, '');
new Items('Shoes', [Items.Type.Equipable, Items.Type.Clothing], 'v_ret_ps_shoe_01', 0.15);
new Items('Accesories', [Items.Type.Equipable, Items.Type.Clothing], 'prop_cs_box_clothes', 0.3);
new Items('Undershirt', [Items.Type.Equipable, Items.Type.Clothing], 'prop_cs_tshirt_ball_01', 0.1);
new Items('Armour', [Items.Type.Equipable, Items.Type.Clothing], 'prop_bodyarmour_03', 1.25);
new Items('Tops', [Items.Type.Equipable, Items.Type.Clothing], 'prop_ld_shirt_01', 0.2); 


/* PROPS */
new Items('Hat', [Items.Type.Equipable, Items.Type.Prop], 'prop_ld_hat_01', 0.05);
new Items('Glasses', [Items.Type.Equipable, Items.Type.Prop], 'xm_prop_x17_b_glasses_01', 0.05);
new Items('Ears', [Items.Type.Equipable, Items.Type.Prop], 'v_ret_gc_ear01', 0.05);
new Items('Watch', [Items.Type.Equipable, Items.Type.Prop], 'p_watch_01', 0.1);
new Items('Bracelet', [Items.Type.Equipable, Items.Type.Prop], 'h4_prop_h4_bracelet_01a', 0.2);


/* FOOD */
new Items('Cheeseburger', [Items.Type.Food, Items.Type.Consumable], 'prop_cs_burger_01', 0.2);
new Items('Hamburger', [Items.Type.Food, Items.Type.Consumable], 'prop_cs_burger_01', 0.2);
new Items('Fries', [Items.Type.Food, Items.Type.Consumable], 'prop_food_chips', 0.15);
new Items('Pizza', [Items.Type.Food, Items.Type.Consumable], 'prop_pizza_box_02', 0.3);
new Items('Chicken Burger', [Items.Type.Food, Items.Type.Consumable], 'prop_cs_burger_01', 0.2);
new Items('Chips', [Items.Type.Food, Items.Type.Consumable], 'v_ret_ml_chips4', 0.1);
new Items('Donut', [Items.Type.Food, Items.Type.Consumable], 'prop_donut_02', 0.1);
new Items('Sandwich', [Items.Type.Food, Items.Type.Consumable], 'prop_sandwich_01');
new Items('Taco', [Items.Type.Food, Items.Type.Consumable], 'prop_taco_01', 0.2);


/* DRINKS */
new Items('Coffe', [Items.Type.Drink, Items.Type.Consumable], 'prop_fib_coffee', 0.1);
new Items('Soda Can', [Items.Type.Drink, Items.Type.Consumable], 'ng_proc_sodacan_01b', 0.3);
new Items('Cola Can', [Items.Type.Drink, Items.Type.Consumable], 'ng_proc_sodacan_01a', 0.3);
new Items('Water Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_ld_flow_bottle', 0.25);
new Items('Energy Drink', [Items.Type.Drink, Items.Type.Consumable], 'prop_energy_drink', 0.2);
new Items('Juice Cup', [Items.Type.Drink, Items.Type.Consumable], 'ng_proc_sodacup_01c', 0.15);
new Items('Beer Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_cs_beer_bot_02', 0.3);
new Items('Whiskey Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_whiskey_bottle', 0.6);
new Items('Vodka Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_vodka_bottle', 0.5);
new Items('Tequila Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_tequila_bottle', 0.45);
new Items('Gin Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_macbeth', 0.4);
new Items('Brandy Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_brandy', 0.5);
new Items('Rum Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_rum_bottle', 0.4);
new Items('Cognac Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_cognac', 0.6);
new Items('Wine Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_richard', 0.7);
new Items('Milk', [Items.Type.Drink, Items.Type.Consumable], 'prop_cs_milk_01', 0.6);


// // MISCELLANEOUS
// new Item('Handheld Radio', ItemType.Misc, 'prop_cs_hand_radio', 0.2, false, false);
// new Item('Smartphone', ItemType.Misc, 'prop_amb_phone', 0.2, false, false);
// new Item('Phone', ItemType.Misc, 'prop_v_m_phone_01', 0.2, false, function (player) { });
// new Item('Boombox', ItemType.Misc, 'prop_boombox_01', 0.5, false, function (player) { });
// new Item('Lighter', ItemType.Misc, 'p_cs_lighter_01', 0.05, false, function (player) { });
// new Item('Cigarettes', ItemType.Misc, 'prop_cigar_pack_01', 0.01, false, function (player) { });
// new Item('Rope', ItemType.Misc, 'prop_stag_do_rope', 0.05, false, function (player) { });
// new Item('Jerrycan', ItemType.Misc, 'w_am_jerrycan', 0.4, false, function (player) { });
// new Item('Papers', ItemType.Misc, 'p_cs_papers_01', 0.01, false, function (player) { });
// new Item('Medkit', ItemType.Misc, 'prop_ld_health_pack', 0.6, false, function (player) { });
// new Item('Handcuffs', ItemType.Misc, 'prop_cs_cuffs_01', 0.2, false, function (player) { });
// new Item('Toolbox', ItemType.Misc, 'v_ind_cs_toolbox2', 0.8, false, function (player) { });
// new Item('Fishing Rod', ItemType.Misc, 'prop_fishing_rod_01', 0.5, false, function (player) { });
// new Item('Fish Bait', ItemType.Misc, 'ng_proc_paintcan02a', 0.3, false, function (player) { });
// new Item('Baking Soda', ItemType.Misc, 'bkr_prop_coke_bakingsoda', 0.6, false, function (player) { });
// new Item('Hydrochloric Acid', ItemType.Misc, 'bkr_prop_meth_sacid', 0.6, false, function (player) { });


// // OPENABLE
// new Item('Pack of Beers', ItemType.Openable, 'v_ret_ml_beerpis1', 1.2, { quantity: 6, inside: 'Beer Bottle' }, function (player) { });


// // AMMUNITION
// new Item('9mm Ammo', ItemType.Ammo, 'prop_ld_ammo_pack_01', 0.9, false, function (player) { });
// new Item('5.56×45mm Ammo', ItemType.Ammo, 'prop_ld_ammo_pack_03', 1.05, false, function (player) { });
// new Item('12ga Slug Ammo', ItemType.Ammo, 'prop_ld_ammo_pack_02', 0.9, false, function (player) { });


// // WEAPONS / ORUZIJE

// new Item('Antique Cavalry Dagger', ItemType.Weapon, 'w_me_dagger', 0, { weapon: 'weapon_dagger' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Baseball Bat', ItemType.Weapon, 'w_me_bat', 0, { weapon: 'weapon_bat' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Crowbar', ItemType.Weapon, 'w_me_crowbar', 0, { weapon: 'weapon_crowbar' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Flashlight', ItemType.Weapon, 'w_me_flashlight', 0, { weapon: 'weapon_flashlight' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Golf Club', ItemType.Weapon, 'w_me_gclub', 0, { weapon: 'weapon_golfclub' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });

// new Item('Hammer', ItemType.Weapon, 'w_me_hammer', 0.3, { weapon: 'weapon_hammer' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });

// new Item('Hatchet', ItemType.Weapon, 'w_me_hatchet', 1.0, { weapon: 'weapon_hatchet' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });

// new Item('Brass Knuckles', ItemType.Weapon, 'w_me_knuckle_dmd', 0.3, { weapon: 'weapon_knuckle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });

// new Item('Knife', ItemType.Weapon, 'w_me_knife_01', 0.35, { weapon: 'weapon_knife' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Machete', ItemType.Weapon, 'w_me_machete_lr', 0.5, { weapon: 'weapon_machete' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Switchblade', ItemType.Weapon, 'w_me_switchblade', 0.25, { weapon: 'weapon_switchblade' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Nightstick', ItemType.Weapon, 'w_me_nightstick', 0.4, { weapon: 'weapon_nightstick' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pipe Wrench', ItemType.Weapon, 'w_me_wrench', 0.4, { weapon: 'weapon_wrench' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Battle Axe', ItemType.Weapon, 'w_me_battleaxe', 0.6, { weapon: 'weapon_battleaxe' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pool Cue', ItemType.Weapon, 'w_me_poolcue', 0.3, { weapon: 'weapon_poolcue' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pistol', ItemType.Weapon, 'w_pi_pistol', 1.0, { weapon: 'weapon_pistol' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pistol Mk II', ItemType.Weapon, 'w_pi_pistolmk2', 1.1, { weapon: 'weapon_pistol_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Combat Pistol', ItemType.Weapon, 'w_pi_combatpistol', 0.8, { weapon: 'weapon_combatpistol' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('AP Pistol', ItemType.Weapon, 'w_pi_appistol', 1.3, { weapon: 'weapon_appistol' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Stun Gun', ItemType.Weapon, 'w_pi_stungun', 0.25, { weapon: 'weapon_stungun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pistol .50', ItemType.Weapon, 'w_pi_pistol50', 1.8, { weapon: 'weapon_pistol50', ammo: '.50 Catridge' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('SNS Pistol', ItemType.Weapon, 'w_pi_sns_pistol', 0.9, { weapon: 'weapon_snspistol', ammo: '9mm Catridge' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('SNS Pistol Mk II', ItemType.Weapon, 'w_pi_sns_pistolmk2', 1.2, { weapon: 'weapon_snspistol_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Heavy Pistol', ItemType.Weapon, 'w_pi_heavypistol', 1.6, { weapon: 'weapon_heavypistol' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Vintage Pistol', ItemType.Weapon, 'w_pi_vintage_pistol', 1.7, { weapon: 'weapon_vintagepistol' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Flare Gun', ItemType.Weapon, 'w_pi_flaregun', 0.3, { weapon: 'weapon_flaregun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Heavy Revolver', ItemType.Weapon, 'w_pi_revolver', 2.0, { weapon: 'weapon_revolver' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Navy Revolver', ItemType.Weapon, 'w_pi_revolvermk2', 2.3, { weapon: 'weapon_navyrevolver' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Heavy Revolver Mk II', ItemType.Weapon, 'w_pi_revolvermk2', 2.4, { weapon: 'weapon_revolver_mk2' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Micro SMG', ItemType.Weapon, 'w_sb_microsmg', 1.5, { weapon: 'weapon_microsmg' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('SMG', ItemType.Weapon, 'w_sb_smg', 1.65, { weapon: 'weapon_smg' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('SMG MK II', ItemType.Weapon, ' w_sb_smgmk2', 2.4, { weapon: 'weapon_smg_mk2' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Assault SMG', ItemType.Weapon, 'w_sb_assaultsmg', 4.0, { weapon: 'weapon_assaultsmg' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Combat PDW', ItemType.Weapon, 'w_sb_pdw', 3.6, { weapon: 'weapon_combatpdw' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Machine Pistol', ItemType.Weapon, 'w_sb_compactsmg', 2.7, { weapon: 'weapon_machinepistol' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Mini SMG', ItemType.Weapon, 'w_sb_minismg', 2.1, { weapon: 'weapon_minismg' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pump Shotgun', ItemType.Weapon, 'w_sg_pumpshotgun', 3.3, { weapon: 'weapon_pumpshotgun' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pump Shotgun Mk II', ItemType.Weapon, 'w_sg_pumpshotgunmk2', 3.6, { weapon: 'weapon_pumpshotgun_mk2' }, function (player, ammo = 0) {
//    player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Sawed-Off Shotgun', ItemType.Weapon, 'w_sg_sawnoff', 3.1, { weapon: 'weapon_sawnoffshotgun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Assault Shotgun', ItemType.Weapon, 'w_sg_assaultshotgun', 4.6, { weapon: 'weapon_assaultshotgun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Bullpup Shotgun', ItemType.Weapon, 'w_sg_bullpupshotgun', 4.35, { weapon: 'weapon_bullpupshotgun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Musket', ItemType.Weapon, 'w_ar_musket', 9.0, { weapon: 'weapon_musket' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Heavy Shotgun', ItemType.Weapon, 'w_sg_heavyshotgun', 7.3, { weapon: 'weapon_heavyshotgun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Double Barrel Shotgun', ItemType.Weapon, 'w_sg_doublebarrel', 4.5, { weapon: 'weapon_dbshotgun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Sweeper Shotgun', ItemType.Weapon, 'w_sg_sweeper', 8.5, { weapon: 'weapon_autoshotgun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Combat Shotgun', ItemType.Weapon, 'w_sg_pumpshotgunh4', 6.3, { weapon: 'weapon_combatshotgun' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Assault Rifle', ItemType.Weapon, 'w_ar_assaultrifle', 4.0, { weapon: 'weapon_assaultrifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Assault Rifle Mk II', ItemType.Weapon, 'w_ar_assaultriflemk2', 4.5, { weapon: 'weapon_assaultrifle_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Carbine Rifle', ItemType.Weapon, 'w_ar_carbinerifle', 3.5, { weapon: 'weapon_carbinerifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Carbine Rifle Mk II', ItemType.Weapon, 'w_ar_carbineriflemk2', 3.75, { weapon: 'weapon_carbinerifle_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Advanced Rifle', ItemType.Weapon, 'w_ar_advancedrifle', 3.7, { weapon: 'weapon_advancedrifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Special Carbine', ItemType.Weapon, 'w_ar_specialcarbine', 4.0, { weapon: 'weapon_specialcarbine' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Special Carbine Mk II', ItemType.Weapon, 'w_ar_specialcarbinemk2', 4.25, { weapon: 'weapon_specialcarbine_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Bullpup Rifle', ItemType.Weapon, 'w_ar_bullpuprifle', 5.5, { weapon: 'weapon_bullpuprifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Bullpup Rifle Mk II', ItemType.Weapon, 'w_ar_bullpupriflemk2', 5.65, { weapon: 'weapon_bullpuprifle_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Compact Rifle', ItemType.Weapon, 'w_ar_assaultrifle_smg', 3.0, { weapon: 'weapon_compactrifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Military Rifle', ItemType.Weapon, 'w_ar_bullpuprifleh4', 4.2, { weapon: 'weapon_militaryrifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('MG', ItemType.Weapon, 'w_mg_mg', 10.0, { weapon: 'weapon_mg' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Combat MG', ItemType.Weapon, 'w_mg_combatmg', 11.5, { weapon: 'weapon_combatmg' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Combat MG Mk II', ItemType.Weapon, 'w_mg_combatmgmk2', 11.7, { weapon: 'weapon_combatmg_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Gusenberg Sweeper', ItemType.Weapon, 'w_sb_gusenberg', 9.0, { weapon: 'weapon_gusenberg' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Sniper Rifle', ItemType.Weapon, 'w_sr_sniperrifle', 9.5, { weapon: 'weapon_sniperrifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Heavy Sniper', ItemType.Weapon, 'w_sr_heavysniper', 10.0, { weapon: 'weapon_heavysniper' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Heavy Sniper Mk II', ItemType.Weapon, 'w_sr_heavysnipermk2', 10.75, { weapon: 'weapon_heavysniper_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Marksman Rifle', ItemType.Weapon, 'w_sr_marksmanrifle', 10.5, { weapon: 'weapon_marksmanrifle' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Marksman Rifle Mk II', ItemType.Weapon, 'w_sr_marksmanriflemk2', 12.0, { weapon: 'weapon_marksmanrifle_mk2' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Grenade', ItemType.Weapon, 'w_ex_grenadefrag', 0.4, { weapon: 'weapon_grenade' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('BZ Gas', ItemType.Weapon, 'prop_gas_grenade', 0.3, { weapon: 'weapon_bzgas' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Molotov Cocktail', ItemType.Weapon, 'w_ex_molotov', 0.5, { weapon: 'weapon_molotov' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Sticky Bomb', ItemType.Weapon, 'w_ex_pe', 0.6, { weapon: 'weapon_stickybomb' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Proximity Mines', ItemType.Weapon, 'w_ex_apmine', 0.7, { weapon: 'weapon_proxmine' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Pipe Bombs', ItemType.Weapon, 'w_ex_pipebomb', 0.45, { weapon: 'weapon_pipebomb' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Tear Gas', ItemType.Weapon, 'w_ex_grenadesmoke', 0.3, { weapon: 'weapon_smokegrenade' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Flare', ItemType.Weapon, 'w_am_flare', 0.25, { weapon: 'weapon_flare' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Jerry Can', ItemType.Weapon, 'w_am_jerrycan', 0.6, { weapon: 'weapon_petrolcan' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Parachute', ItemType.Weapon, 'p_parachute_s', 0.5, { weapon: 'gadget_parachute' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });
// new Item('Fire Extinguisher', ItemType.Weapon, 'w_am_fire_exting', 1.0, { weapon: 'weapon_fireextingusher' }, function (player, ammo = 0) {
//     player.giveWeapon(mp.joaat(this.weapon), ammo);
// });


// // mp.ItemRegistry = {};


// function weaponNameByHash(i) {
//     let query = "0x" + i.toString(16).toUpperCase();
//     for (let f in Weapons) {
//         let w = Weapons[f];
//         if (w === query) {
//             return 'weapon_' + f;
//         }
//     }
// }


// function isAmmoValid(weapon, ammo) {
//     let name = weaponNameByHash(weapon);
//     for (let i in mp.ItemRegistry) {
//         let item = mp.ItemRegistry[i];
//         if (item.weapon && item.weapon == name) {
//             if (item.ammo && item.ammo == ammo) {
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         }
//     }
// }


// mp.Player.prototype.giveAmmo = function (quantity, catridge) {
//     let weapon = this.weapon;
//     if (weapon) {
//         let valid = isAmmoValid(this.weapon, catridge);
//         if (valid) {
//             let ammo = this.getWeaponAmmo(weapon);
//             this.setWeaponAmmo(weapon, parseInt(ammo + quantity));
//         }
//         else {
//             return false;
//         }
//     }
//     else {
//         return false;
//     }
// };


// module.exports = { ItemType, ItemEntities, ItemRegistry };
