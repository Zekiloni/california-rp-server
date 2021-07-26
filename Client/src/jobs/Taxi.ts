

const Player = mp.players.local;


mp.events.add({
   'playerEnterVehicle': (Vehicle: VehicleMp, Seat: number) => { 
      if (Vehicle.getVariable('Job') == 7) { 
         if (Seat == -1) return;
         const DriverHandle = Vehicle.getPedInSeat(-1);

         if (DriverHandle) {
            const Driver = mp.players.atHandle(DriverHandle);
            mp.gui.chat.push(JSON.stringify(Driver?.id))
         }
      }
   },

   'playerLeaveVehicle': (Vehicle: VehicleMp, Seat: number) => { 
      if (Seat == -1) return;
   }
})
