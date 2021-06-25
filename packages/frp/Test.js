


mp.events.addCommand("veh", (player, full, hash, color = "255,255,255", color2 = "0,0,0") => {
    let c1 = color.split(','), c2 = color2.split(',');
    var veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
    veh.setMod(38, 3);
    veh.setColorRGB(parseInt(c1[0]), parseInt(c1[1]), parseInt(c1[2]), parseInt(c2[0]), parseInt(c2[1]), parseInt(c2[2]));
    veh.alpha = 255;
    veh.dimension = player.dimension;
    veh.numberPlateType = 1;
    veh.numberPlate = 'focus rp beta';
    veh.engine = false;
    player.putIntoVehicle(veh, 0);
    veh.data.Mileage = 0.0;
    veh.data.Fuel = 100;
});

mp.events.addCommand("clot", (player, full, comp, draw, text, pal) => {
    player.setClothes(parseInt(comp), parseInt(draw), parseInt(text), parseInt(pal));
});

mp.events.addCommand("prop", (player, full, comp, draw, text) => {
    player.setProp(parseInt(comp), parseInt(draw), parseInt(text));
});


mp.events.addCommand("alpr", (player, fullText) => {
    player.call('client:vehicle.alpr');
});



mp.events.addCommand("vozilaa", (player, fullText) => {
   player.call('CLIENT::VEHICLES:SCREENSHOT');
});



const Vozila = require('./data/Vehicles.json');
let Dealer = [];
const MAX = 25;
let counter = 0;

for (let i in Vozila) { 
   if (counter > MAX) break;
   counter ++;
   Dealer.push(Vozila[i]);
}

mp.events.addCommand("kupiauto", (player, fullText, dict, anim) => {
   console.log('Pozvao komandu')
   player.call('client:vehicle.dealership', [Dealer]);
});

mp.events.addCommand("scenario", (player, fullText, scenario) => {
    player.playScenario(scenario);
});


mp.events.addCommand("pedshot", (player, fullText) => {
   player.call('CLIENT:PLAYER.PEDSHOT');
});


mp.events.add('posalji_odecu', (player, odeca) => { 
   odeca = JSON.parse(odeca);
   console.log(odeca);
});

mp.events.addCommand("odecalista", (player, fullText) => {
   player.call('odeca_lista');
});


let auto = mp.vehicles.new(mp.joaat("turismor"), new mp.Vector3(-421.88, 1136.86, 326), {
   numberPlate: "ADMIN",
   color: [[255, 0, 0], [255, 0, 0]]
});


mp.events.addCommand("cobject", (player, fullText, model) => {
    let position = new mp.Vector3(player.position.x, player.position.z + 10, player.position.y);
    try {
        mp.objects.new(model, player.position, {
            alpha: 255,
            dimension: player.dimension
        });
    }
    catch (e) {
        console.log(e);
    }
});
