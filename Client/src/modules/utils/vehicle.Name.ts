

export const vehicleName = (model: string) => {
   const hash = mp.game.joaat(model);
   return mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(hash));
}

mp.events.addProc('CLIENT::VEHICLE_NAME', vehicleName);