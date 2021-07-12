


const Configuration = { 
   Vehicle: { 
      Model: 'trash',
      Color: [0, 1],
      Rotation: new mp.Vector3(0.40419924, -0.0993861, 0.172935),
      Positions: [
         new mp.Vector3(-324.516815, -1528.6829833, 27.2547607),
         new mp.Vector3(-327.613861, -1528.9587402, 27.2523937),
         new mp.Vector3(-330.622131, -1529.1475830, 27.2533740),
         new mp.Vector3(-333.527557, -1528.8128662, 27.2691841)
      ]
   },

   Depony: { 
      Position: new mp.Vector3(-435.5779, -1704.9042, 18.96115)
   },

   Uniform: [
      { Index: 3, Drawable: 63 },
      { Index: 8, Drawable: 59 },
      { Index: 11, Drawable: 71 },
      { Index: 4, Drawable: 36 },
      { Index: 6, Drawable: 27 }
   ]
};


frp.Sanitation = class Sanitation {

   static async Stop (Player) { 

      if (Player.getVariable('Job_Duty') == false) return;

      if (Player.getVariable('Job_Vehicle')) { 
         const Vehicle = mp.vehicles.at(Player.getVariable('Job_Vehicle'));

         if (Vehicle.dist(frp.Jobs.Job[frp.Globals.Jobs.Sanitation].position) > 25) return Player.Notification(frp.Globals.messages.JOB_VEHICLE_RETURN_BACK, frp.Globals.Notification.Error, 5);

         Player.setVariable('Job_Vehicle', null);
         Vehicle.destroy();
      }

      const Points = await Player.callProc('client:job.garbage.trash:get');
      console.log('Number ' + Points);

      const Character = await Player.Character();
      Character.Uniform(Player, false);

      Player.setVariable('Job_Duty', false);
   }


   static async Start (Player) { 

      if (Player.getVariable('Job_Duty')) return Player.Notification(frp.Globals.messages.JOB_ALREADY_STARTED, frp.Globals.Notification.Error, 5);

      let AvailablePosition = null;

      for (const Position of Configuration.Vehicle.Positions) { 
         if (frp.Main.IsAnyVehAtPos(Position, 1.5).length == 0) {
            AvailablePosition = Position;
            break;
         }
      }

      if (AvailablePosition == null) return Player.Notification(frp.Globals.messages.THERE_IS_NO_PLACE_FOR_VEHICLE, frp.Globals.Notification.Error, 5);

      const Vehicle = frp.Vehicles.CreateTemporary(
         Configuration.Vehicle.Model, 
         AvailablePosition, Configuration.Vehicle.Rotation, 
         Configuration.Vehicle.Color, 'FO0' + frp.Main.GenerateNumber(3)
      );

      Vehicle.Job = frp.Globals.Jobs.Sanitation;

      Player.setVariable('Job_Vehicle', Vehicle.id);
      Player.setVariable('Job_Duty', true);

      Player.Notification(frp.Globals.messages.GARBAGE_JOB_STARTED, frp.Globals.Notification.Info, 12);
     
      const Character = await Player.Character();
      Character.Uniform(Player, Configuration.Uniform);
   }

};


mp.events.add({
   'server:job.garbage:finish': (Player) => { 
      Player.Notification(frp.Globals.messages.GARBAGE_HOW_TO_STOP, frp.Globals.Notification.Info, 12);
   }
})

