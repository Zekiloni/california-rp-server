

const CHAT_COLORS = { 
   'FADE_!': -1, 
   'FADE_2': 0, 
   'ITEM_ENTITY_VEHICLE': 1, 
   'ITEM_ENTITY_HOUSE': 2, 
   'ITEM_ENTITY_WHEEL':3, 
   'ITEM_ENTITY_LEFT_HAND': 4, 
   'ITEM_ENTITY_RIGHT_HAND': 5 
}; Object.freeze(CHAT_COLORS)

const CHAT_RADIUS = { 
   'OOC!': -1, 
   'IC': 0,
   'LOW': 3,
   'SHOUT': 4 
}; Object.freeze(CHAT_COLORS)

module.exports = { CHAT_COLORS, CHAT_RADIUS };