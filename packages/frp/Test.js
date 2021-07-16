



mp.events.addCommand("veh", (player, full, hash, color = "255,255,255", color2 = "0,0,0") => {
   if (player.vehicle) return;
   let c1 = color.split(','), c2 = color2.split(',');
   const veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
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
   veh.data.Windows = [false, false, false, false];
   //veh.data.Back = false;
   //veh.data.Trunk = false;
   //veh.data.Hood = false;
   player.outputChatBox(`Vehicle id ${JSON.stringify(veh.id)}!`);
});

mp.events.addCommand("testpos", (player, full, comp, draw, text, pal) => {
   console.log(frp.Main.IsAnyVehAtPos(player.position, 2));
});

mp.events.addCommand("prop", (player, full, comp, draw, text) => {
    player.setProp(parseInt(comp), parseInt(draw), parseInt(text));
});


mp.events.addCommand('interior', (player, full, x, y, z, ipl) => {

   player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
   if (ipl) player.call('client:request:ipl', [ipl]);

});


mp.events.addCommand("alpr", (player, fullText) => {
    player.call('client:vehicle.alpr');
});

mp.objects.new('prop_hanger_door_1', new mp.Vector3(-1570.9510498, -379.50936, 200.633560), {
   alpha: 255, dimension: 0
});

mp.events.addCommand("vozilaa", (player, fullText) => {
   player.call('CLIENT::VEHICLES:SCREENSHOT');
});



const Vozila = require('./data/Vehicles.json');
let Dealer = [];
const MAX = 25;
let counter = 0;

let stringo = []

// for (const i in Vozila) { 
//    const vozilo = Vozila[i];
//    if (vozilo.category == 'sports' || vozilo.category == 'off-road' || vozilo.category == 'motorcycles' || vozilo.category == 'vans' || vozilo.category == 'sedans') { 
//       stringo.push(i);
//    }
// }

// console.log(JSON.stringify(stringo))

for (let i in Vozila) { 
   if (counter > MAX) break;
   counter ++;
   Dealer.push(Vozila[i]);
}

mp.events.addCommand("animacija", (player, fullText, dict, anim, flag) => {
   player.playAnimation(dict, anim, 8, parseInt(flag));
});

mp.events.addCommand("scenario", (player, fullText, scenario) => {
    player.playScenario(scenario);
});


mp.events.addCommand("pedshot", (player, fullText) => {
   player.call('CLIENT:PLAYER.PEDSHOT');
});

mp.events.addCommand("jedem", (player, fullText, flag) => {
   player.playAnimation('switch@franklin@snacking', '001922_01_fras_v2_3_snacking_idle', 1, parseInt(flag));
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
        let object = mp.objects.new(model, player.position, {
            alpha: 255,
            dimension: player.dimension
        });

        console.log(object.position)
    }
    catch (e) {
        console.log(e);
    }
});
