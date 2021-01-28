 

const itemTypes = {
   ITEM_TYPE_CONSUMABLE: 0,
   ITEM_TYPE_EQUIPABLE: 1,
   ITEM_TYPE_OPENABLE: 2,
   ITEM_TYPE_WEAPON: 3,
   ITEM_TYPE_AMMO: 4,
   ITEM_TYPE_MISC: 5
}

const allItems = [ 
   { name: 'M4 Carbien Rifle', hash: 'w_ar_carbinerifle' }
]

const ITEM_ENTITY_GROUND = -1,
   ITEM_ENTITY_PLAYER = 0,
   ITEM_ENTITY_VEHICLE = 1,
   ITEM_ENTITY_HOUSE = 2,
   ITEM_ENTITY_WHEEL = 3,
   ITEM_ENTITY_LEFT_HAND = 4,
   ITEM_ENTITY_RIGHT_HAND = 5;

const ITEM_OPEN_BEER_AMOUNT = 6;

module.exports = { allItems, itemTypes, 
                  ITEM_OPEN_BEER_AMOUNT, ITEM_ENTITY_GROUND, 
                  ITEM_ENTITY_PLAYER, ITEM_ENTITY_VEHICLE, 
                  ITEM_ENTITY_HOUSE, ITEM_ENTITY_WHEEL, 
                  ITEM_ENTITY_LEFT_HAND, ITEM_ENTITY_RIGHT_HAND};
