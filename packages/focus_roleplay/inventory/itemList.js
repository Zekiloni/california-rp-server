 
global.ITEM_TYPES = [
   ITEM_TYPE_DRUG = 0,
   ITEM_TYPE_EQUIPABLE = 1,
   ITEM_TYPE_OPENABLE = 2,
   ITEM_TYPE_WEAPON = 3,
   ITEM_TYPE_AMMO = 4,
   ITEM_TYPE_MISC = 5,
   ITEM_TYPE_FOOD = 6,
   ITEM_TYPE_DRINK =  7, 
]; Object.freeze(ITEM_TYPES);

global.PLAYER_MAX_INVENTORY = 15.00;

global.INVENTORY_ITEMS = [
   CARBINE_RIFLE = { name: 'M4 Carbine Rifle', hash: 'w_ar_carbinerifle', weight: 1.2, type: ITEM_TYPE_WEAPON, weapon: 'weapon_carbinerifle' },
   COMBAT_PISTOL = { name: 'Combat Pistol', hash: 'w_pi_combatpistol', weight: 1.2, type: ITEM_TYPE_WEAPON, weapon: 'weapon_combatpistol' },
   DRUG_COCAINE = { name: 'Kokain', hash: 'bkr_prop_coke_mixtube_03', weight: 0.1, type: ITEM_TYPE_DRUG },
   DRUG_JOINT = { name: 'Srolani dzoint', hash: 'p_amb_joint_01', weight: 0.2, type: ITEM_TYPE_DRUG },
   DRUG_MARIJUANA = { name: 'Marihuana', hash: 'p_amb_joint_01', weight: 0.1, type: ITEM_TYPE_MISC },
   MISC_RAW_PAPER = { name: 'RAW Papir za rolanje', hash: 'p_amb_joint_01', weight: 0.1, type: ITEM_TYPE_MISC },
   FOOD_CHEESEBURGER = { name: 'Cheeseburger', hash: 'prop_cs_burger_01', weight: 0.4, type: ITEM_TYPE_FOOD },
   DRINK_WATER = { name: 'Flasica vode', hash: 'ng_proc_beerbottle_01a', weight: 0.3, type: ITEM_TYPE_DRINK }
]; Object.freeze(INVENTORY_ITEMS);

global.ITEM_ENTITES = [
   ITEM_ENTITY_GROUND = -1, 
   ITEM_ENTITY_PLAYER = 0, 
   ITEM_ENTITY_VEHICLE = 1,
   ITEM_ENTITY_HOUSE = 2, 
   ITEM_ENTITY_WHEEL = 3,
   ITEM_ENTITY_LEFT_HAND = 4, 
   ITEM_ENTITY_RIGHT_HAND = 5
]; Object.freeze(ITEM_ENTITES);

const ITEM_OPEN_BEER_AMOUNT = 6;

