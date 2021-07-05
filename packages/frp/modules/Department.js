





const Department = { 
   Position: new mp.Vector3(-761.8135, -1308.1590, 5.150),
   Vehicle: { 
      Position: new mp.Vector3(-759.0048, -1318.384, 4.3801),
      Rotation: new mp.Vector3(-0.031622, 0.0304401, -43.57),
      Models: ['asea', 'intruder'],
      Color: 69
   }
};


const DrivingRoute = require('../data/Driving.Route');


mp.events.addProc({
   'client:vehicle.department.driving:start': (player) => { 
      let Model = Department.Vehicle.Models[Math.floor(Math.random() * Department.Vehicle.Models.length)];
      const Vehicle = frp.Vehicles.CreateTemporary(Model, Department.Vehicle.Position, Department.Vehicle.Rotation, [Department.Vehicle.Color, Department.Vehicle.Color], 'DMV' + frp.Main.GenerateNumber(3));
      player.SendMessage(frp.Globals.messages.DMV_INSTRUCTOR_GO_VEHICLE, frp.Globals.Colors.white[0]);
   
      return [Vehicle.id, DrivingRoute];
   }
})


class DMV { 

   static Colshape = mp.colshapes.newRectangle(Department.Position.x, Department.Position.y, Department.Position.z, 2.0, 2.0, frp.Settings.default.dimension);
   static Blip = mp.blips.new(530, new mp.Vector3(Department.Position.x, Department.Position.y, 0), {
      name: 'Department of Motor Vehicles',
      scale: 0.85,
      color: 54,
      alpha: 255,
      shortRange: true,
      dimension: frp.Settings.default.dimension,
   });

   static Working () { 

      if (mp.world.time.hour < 6 || mp.world.time.hour > 20) { 
         DMV.Colshape.OnPlayerEnter = (player) => { player.Notification(frp.Globals.messages.DMV_NOT_WORKING, frp.Globals.Notification.Info, 5); };
      }  else { 
         DMV.Colshape.OnPlayerEnter = (player) => { player.Notification(frp.Globals.messages.DMV_USAGE, frp.Globals.Notification.Info, 5); };
      }

      setTimeout(() => { DMV.Working(); }, 30 * 1000);
   }
   
};

DMV.Working();