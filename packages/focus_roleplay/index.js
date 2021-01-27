global.conf = require("./core/configuration");
global.core = require("./core/main");
global.db = require("./core/database");
global.house = require("./houses/core");
global.account = require("./accounts/accounts");
global.biz = require("./bussineses/bizCore");

var dbStructure = require("./core/databaseStructure");
var playerEvents = require("./accounts/playerEvents");
var huntingAnimals = require("./hunting/animals");

core.terminal(3, `${conf.app} Started ! version ${conf.version}`);

biz.loadAll();

 //setInterval(() => { console.log(allBussineses)  }, 10000);

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

mp.events.addCommand("createbiz", (player, fullText, type, price) => {
    if (player.admin < 4) return player.outputChatBox("Nisi admin");
    biz.create(player, type, price);
});

mp.events.addCommand("deletebiz", (player, text) => {
    var bussines = biz.nearby(player);
    if (bussines) {
        player.outputChatBox(`Nearest biz ${bussines.id} !`);
        biz.delete(player, bussines);
    }
});

mp.events.addCommand("buy", (player, text) => {
     var bussines = biz.nearby(player);
     if (bussines) {
         player.outputChatBox(`Nearest biz ${bussines.id} !`);
         account.buyBiz(player, bussines);
     }
 });

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
    let weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
});

mp.events.addCommand("mod", (player, _, modType, modIndex) => {
    if (!player.vehicle)
        return player.outputChatBox(
            "You need to be in a vehicle to use this command."
        );
    player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
    player.outputChatBox(
        `Mod Type ${modType} with Mod Index ${modIndex} applied.`
    );
});
