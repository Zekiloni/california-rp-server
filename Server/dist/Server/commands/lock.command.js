"use strict";
module.exports = {
    commands: [
        {
            name: 'lock',
            desc: 'Zakljucati / otkljucati',
            call: async (Player) => {
                const Character = await Player.Character(), Nearest = await Player.Nearest();
                if (Nearest) {
                    switch (true) {
                        case Nearest instanceof frp.Business: {
                            console.log(Nearest);
                            break;
                        }
                        case Nearest instanceof frp.Houses: {
                            Nearest.Lock(Player);
                            break;
                        }
                        case Nearest.type == 'vehicle': {
                            const Status = Nearest.locked;
                            if (Nearest.Database) {
                                const Vehicle = await frp.Vehicles.findOne({ where: { id: Nearest.Database } });
                                Vehicle.Lock(Player);
                            }
                            else {
                                if (Nearest.getVariable('Job') && Nearest.getVariable('Job') == Character.Job) {
                                    Nearest.locked = !Nearest.locked;
                                }
                                else if (Nearest.Rent && Character.id == Nearest.Rent) {
                                    Nearest.locked = !Nearest.locked;
                                }
                                else {
                                    Player.Notification(frp.Globals.messages.YOU_DONT_HAVE_VEHICLE_KEYS, frp.Globals.Notification.Error, 6);
                                }
                            }
                            if (Nearest.locked != Status) {
                                let msg = Nearest.locked ? frp.Globals.messages.SUCCESSFULLY_LOCKED + frp.Globals.messages.VEHICLE : frp.Globals.messages.SUCCESSFULLY_UNLOCKED + frp.Globals.messages.VEHICLE;
                                Player.Notification(msg, frp.Globals.Notification.Succes, 4);
                            }
                            break;
                        }
                    }
                }
            }
        },
    ]
};
