"use strict";
const Player = mp.players.local, MAX = 25;
let DeliveredMails = 0;
mp.events.add({
    'client:job.postal:start': (deliverPos) => {
        HouseInteraction(deliverPos);
    },
});
function HouseInteraction(position) {
    const { Checkpoint, Blip } = Player.CreateInteractionSpot(`Mail Deliver No${DeliveredMails}`, deliverPos);
    mp.events.add('playerEnterCheckpoint', OnPlayerDeliverMail);
    function OnPlayerDeliverMail(point) {
        if (DeliveredMails == MAX) {
            //mp.events.callRemote('server:job:finish', 6); // jobId
        }
        if (point == Checkpoint) {
            DeliveredMails++;
            Checkpoint.destroy();
            Blip.destroy();
            mp.events.remove('playerEnterCheckpoint', OnPlayerDeliverMail);
        }
    }
}
function BehindTruckInteraction() {
    const Truck = player.getVariable('Job_Veh');
    if (Truck) {
        const PosBehind = Truck.getOffsetFromInWorldCoords(0.0, -3.8, 0.0);
        const { Checkpoint, Blip } = Player.CreateInteractionSpot('GoPostal Van', PosBehind);
        mp.events.add('playerEnterCheckpoint', OnPlayerTakeMail);
        function OnPlayerTakeMail(point) {
            if (point == Checkpoint) {
                if (Utils.Distance(Player.position, PosBehind) <= 0.5) {
                    Player.heading = Truck.heading;
                    Checkpoint.destroy();
                    Blip.destroy();
                    mp.events.remove('playerEnterCheckpoint', OnPlayerTakeMail);
                    // Uzima postu iz kamiona
                    // NACI ANIMACIJU
                    // Dobija objekat paketa ili pisma u ruci ( random )
                }
            }
        }
    }
}
