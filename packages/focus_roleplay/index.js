
let globals = require('./core/globals');
let settings = require('./core/settings');

global.db = require('./core/database');
global.config = require('./core/configuration');
global.core = require('./core/main');

let DatabaseStructure = require('./core/databaseStructure');
let Authentication = require('./classes/Authentication');
let inventorySystem = require('./classes/Inventory');
let Savings = require('./classes/Savings')

global.account = require('./player/player.Core');
global.business = require('./business/bizCore');
global.houses = require('./houses/houses.Core');
global.jobs = require('./jobs/jobs.Core');
global.inventory = require('./inventory/inventory.Core');
global.radio = require('./player/radio.Core');
global.factions = require('./factions/factions.Core');
global.doors = require('./core/doors');
global.plants = require("./core/plants");

var playerEvents = require('./player/player.Events');
var huntingAnimals = require('./hunting/animals');
var playerCommands = require('./player/player.Commands');
var adminCommands = require('./player/admin.Commands');
var playerAnimations = require('./player/animations');
var realTimeWeather = require('./core/weather');
var dealershipVehicles = require('./vehicles/vehicles.List');
var vehiclesSystem = require('./vehicles/vehicles.Core');
var furnitureShop = require('./business/furnitureShop');

core.terminal(3, `${config.app} Started ! version ${config.version}`);
business.loadAll();
setInterval(() => { core.onMinuteSpent()  }, 60000);

// mp.Player.prototype.funkcija = () => {  }


//jobs.createBusRoute('Morningwood')
//console.log(items)
//console.log(FACTIONS[0].GARAGE_POINT)
//console.log(items.itemsEntities.ITEM_ENTITY_WHEEL)

// setInterval(() => { inventory.playerInventory(-1)  }, 3000);
// setTimeout(() => { 
//     let re = inventoryItems.find( ({ id }) => id === 11 );
//     console.log(re)  
// }, 2000);


/* ZAVRSENE STVARI
    player.call("client:showClothing"); // CHAR CLOTHING !
    player.call("client:showCustomization"); // CHAR CUSTOMIZATION
    core.createLog(type, account, player, target, message, data); // LOGS
    account.save(player) // SAVING ACCOUNT

*/

/*  URADITI
    /breaklock
    INTERAKCIONI MENI (animacije, facijalne ekspresije [zavrsiti], raspolozenja, stilovi hodanja)

*/

/* EVENTI
    mp.events.callRemote('eventName', args); // poziva iz clienta SERVER EVENT
    player.call('eventName', [arg1, arg2]); poziva iz servera CLIENT EVENT
    mp.trigger('eventName', args); // poziva iz cefa CLIENT EVENT
    mp.events.call('eventName', args); // poziva lokalni event
*/

var color = [[033, 343, 535], [3434, 577, 565]]

mp.events.addCommand("tp", (player) => {
    mp.events.call("server:spawnAnimals", player, 15);
    player.position = new mp.Vector3(-1800.14, -794.12, 8.6);
    player.giveWeapon([3220176749, 2210333304], 1000); // Assault Rifle, Carbine Rifle
});


mp.events.addCommand("peds", (player) => {
    const playerPos = player.position;
    let peds = mp.game.ped.getClosestPed(
        playerPos.x,
        playerPos.y,
        playerPos.z,
        15,
        true,
        false,
        MpPed,
        false,
        false,
        -1
    );
    console.log(peds);
});

mp.events.addCommand('eating', (player, full) => { 
    //player.position = new mp.Vector3(2962.40, 2746.20, 42.39);
})

mp.events.addCommand("veh", (player, full, hash, r, g, b, r2, g2, b2) => {
    var veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
    veh.dimension = player.dimension;
    veh.numberPlateType = 1;
    veh.numberPlate = "SUPPORT";
    veh.engine = true;
    veh.dead = false; 
    player.putIntoVehicle(veh, 0);
});

mp.events.addCommand("clot", (player, full, comp, draw, text, pal) => {
    player.setClothes(parseInt(comp), parseInt(draw), parseInt(text), parseInt(pal));
});

mp.events.addCommand("prop", (player, full, comp, draw, text) => {
    player.setProp(parseInt(comp), parseInt(draw), parseInt(text));
});


mp.events.addCommand("pickup", (player) => { 
    var pickUpObject = inventory.nearItem(player);
    inventory.pickUpItem(player, pickUpObject);
})

mp.events.addCommand("drop", (player, fullText, itemid) => { 
    inventory.dropItem(player, itemid);
})

mp.events.addCommand("dzok", (player, fullText, dict, anim) => { 
    player.playAnimation(dict, anim, 5, 0)
})

mp.events.addCommand("kupiauto", (player, fullText, dict, anim) => { 
    player.call('client:showVehicleDealership', [OFFROADS])
})

mp.events.addCommand("cobject", (player, fullText, model) => { 
    let position = new mp.Vector3(player.position.x, player.position.z + 10, player.position.y)
    try { 
        mp.objects.new(model, player.position,
            {
                alpha: 255,
                dimension: player.dimension
            });
    } catch(e) { console.log(e) }

})



