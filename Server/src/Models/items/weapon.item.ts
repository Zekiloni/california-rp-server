import { itemData } from '../../globals/enums';
import Items from '../inventory.item.model';
import { baseItem, noDesc } from '../item.model';

import './ammo.item';


export const defaultWeaponType = [itemData.Type.USABLE, itemData.Type.WEAPON]

export let weapons: weaponItem[] = [];

export class weaponItem extends baseItem {
   weapon_hash: string;
   caliber?: baseItem;
   
   constructor (name: string, model: string, weapHash: string, cal?: baseItem, type?: itemData.Type[], weight: number = 0.35, description: string = noDesc) { 
      super (name, type ? defaultWeaponType.concat(type) : defaultWeaponType, model, weight, description);
      this.weapon_hash = weapHash;
      this.caliber = cal;
      
      weapons.push(this);

      console.log(this)

      this.use = async function (player: PlayerMp, item: Items) { 
         item.status = itemData.Status.EQUIPED;
         player.giveWeapon(mp.joaat(this.weapon_hash), item.data.ammo ? item.data.ammo : 0);
         await item.save();
      }
   }
}


new weaponItem(itemData.Names.COMBAT_PISTOL, 'w_pi_combatpistol', 'weapon_combatpistol', baseItem.list[itemData.Names.AMMO_9MM]);

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