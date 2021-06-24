

// UTILs
let Utils = require('./Utils');

// PLAYER CORE
let Authentication = require('./player/Authorization');
let CharacterCreator = require('./player/Creator');
let Interface = require('./player/Interface');
let PlayerCore = require('./player/Core');
let PlayersOnline = require('./player/Onlines');
let NameTags = require('./player/Nametags');
let Attachments = require('./player/Attachments');
let Documents = require('./player/documents/Documents');
let Inventory = require('./player/inventory/Items');
let Banking = require('./player/Banking');

require('./Slikanje');

// ADMIN
let AdminStuffs = require('./player/Admin');
let AntiCheat = require('./Anticheat');

// GAME CORE 
let Chat = require('./chat/Chat');
let CayoPerico = require('./cayo-perico/heistisland');
//let ChatBubble = require('./player/ChatBubble');

// SYNCHRONIZATION & STREAMER
let Streamer = require('./player/Streamer');
let DamageSync = require('./player/DamageSync');

// VEHICLES
let Vehicles = require('./vehicles/Vehicles')
let DepartmentOfVehicles = require('./vehicles-department/DMV'); 

// HOUSES
let Houses = require('./houses/Houses');

// INTERACTIONS
let Interactions = require('./player/Interactions/Interactions');
let Animations = require('./player/Interactions/Animations');
let Crouching = require('./player/Interactions/Crouching');
let FingerPointing = require('./player/Interactions/FingerPointing');

// FACTIONS
let Police = require('./factions/police/Police');

// BUSINESS
let Business = require('./business/Business');
let Markets = require('./business/Market');
let Clothing = require('./business/Clothing');
let Dealeships = require('./vehicles/Dealerships');

// JOBS
let Jobs = require('./jobs/Jobs');
let Jetsam = require('./jobs/Jetsam');
let Transit = require('./jobs/Transit');
let Sanitation = require('./jobs/Sanitation');
let Mining = require('./jobs/Miner');

// DIAMOND CASINO
// let Roulette = require('./casino/Roulette');
// let Slots = require('./casino/Slots');

// let casino = require('./casino/CasinoSlots');
// let fuel = require('./fuel');


// var charClohing = require('./clothing/clothing');
// // var interactionsMenu = require('./interactions-menu/interactions')
// var jobs = require('./jobs/jobs');
// var furniture = require('./furniture/furniture');
// var syncObjects = require('./syncObjects');







