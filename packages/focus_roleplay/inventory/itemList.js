 
global.ITEM_TYPES = [
   ITEM_TYPE_CONSUMABLE =  0,
   ITEM_TYPE_EQUIPABLE = 1,
   ITEM_TYPE_OPENABLE = 2,
   ITEM_TYPE_WEAPON = 3,
   ITEM_TYPE_AMMO = 4,
   ITEM_TYPE_MISC = 5 
]; Object.freeze(ITEM_TYPES);


global.INVENTORY_ITEMS = [
   CARBINE_RIFLE = { name: 'M4 Carbine Rifle', hash: 'w_ar_carbinerifle', weight: 1.2, type: ITEM_TYPE_WEAPON },
   COMBAT_PISTOL = { name: 'M4 Rifle', hash: 'w_ar_carbinerifle', weight: 1.2, type: ITEM_TYPE_WEAPON },
   DRUG_COCAINE = { name: 'Kokain', hash: 'bkr_prop_coke_mixtube_03', weight: 0.1, type: ITEM_TYPE_CONSUMABLE },
   DRUG_JOINT = { name: 'Dzoint', hash: 'p_amb_joint_01', weight: 0.2, type: ITEM_TYPE_CONSUMABLE }
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

