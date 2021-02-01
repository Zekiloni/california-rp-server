
global.conf = require('./core/configuration');
global.core = require('./core/main');
// global.notice = require('./core/notice');
global.db = require('./core/database');
global.account = require('./player/playerCore');
global.veh = require('./vehicles/vehicleCore')
global.biz = require('./business/bizCore');
global.house = require('./houses/core');
global.inv = require('./inventory/inventoryCore');
global.radio = require('./player/radioCore');
global.fac = require('./factions/factionsCore');

var dbStructure = require('./core/databaseStructure');
var globals = require('./core/globals')
var playerEvents = require('./player/playerEvents');
var huntingAnimals = require('./hunting/animals');
var playerCommands = require('./player/playerCommands')
var adminCommands = require('./player/adminCommands')


core.terminal(3, `${conf.app} Started ! version ${conf.version}`);
biz.loadAll();
inv.loadItems();
fac.initFactions();
setInterval(() => { core.checkEverything()  }, 65000);
    
//console.log(items)
//console.log(FACTIONS[0].GARAGE_POINT)
//console.log(items.itemsEntities.ITEM_ENTITY_WHEEL)

// setInterval(() => { inv.playerInventory(-1)  }, 3000);

/* ZAVRSENE STVARI
    player.call("client:showClothing"); // CHAR CLOTHING !
    player.call("client:showCustomization"); // CHAR CUSTOMIZATION
    core.createLog(type, account, player, target, message, data); // LOGS
    account.save(player) // SAVING ACCOUNT

*/

/* EVENTI
    mp.events.callRemote('eventName', args); // poziva iz clienta SERVER EVENT
    player.call('eventName', [arg1, arg2]); poziva iz servera CLIENT EVENT
    mp.trigger('eventName', args); // poziva iz cefa CLIENT EVENT
    mp.events.call('eventName', args); // poziva lokalni event
*/

mp.events.addCommand("tp", (player) => {
    mp.events.call("server:spawnAnimals", player, 15);
    player.position = new mp.Vector3(-1800.14, -794.12, 8.6);
    player.giveWeapon([3220176749, 2210333304], 1000); // Assault Rifle, Carbine Rifle
});

mp.events.addCommand("clothing", (player) => {
    player.call("client:showClothing");
});

mp.events.addCommand("customization", (player) => {
    player.call("client:showCustomization");
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

mp.events.addCommand("veh", (player, full, hash, r, g, b, r2, g2, b2) => {
    var veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
    veh.dimension = player.dimension;
    veh.numberPlateType = 1;
    veh.numberPlate = "SUPPORT";
    veh.engine = true;
    veh.dead = false;
    player.putIntoVehicle(veh, 0);
});

mp.events.addCommand("save", (player, full) => {
    // account.save(player);
    core.savePlayers()
});

mp.events.addCommand("buy", (player, text) => {
     var bussines = biz.nearby(player);
     if (bussines) {
         player.outputChatBox(`Nearest biz ${bussines.id} !`);
         account.buyBiz(player, bussines);
    }
});




