 

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

const itemEntities = [ 
   { ITEM_ENTITY_GROUND: -1 , name: 'Pod' },
   { ITEM_ENTITY_PLAYER: 0, name: 'Igrac' },
   { ITEM_ENTITY_VEHICLE: 1, name: 'Vozilo' },
   { ITEM_ENTITY_HOUSE: 2, name: 'Kuca' },
   { ITEM_ENTITY_WHEEL: 3, name: 'Wheel' },
   { ITEM_ENTITY_LEFT_HAND: 4, name: 'Leva ruka' },
   { ITEM_ENTITY_RIGHT_HAND: 5, name: 'Desna ruka' },
]

const ITEM_OPEN_BEER_AMOUNT = 6;

module.exports = { allItems, itemTypes, ITEM_OPEN_BEER_AMOUNT, itemEntities};
