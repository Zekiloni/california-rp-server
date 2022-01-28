// import { Colors } from "../Global/Colors";
// import { Globals } from "../Global/Globals";
// import { Messages } from "../Global/Messages";
// import { Vehicles } from "../Models/Vehicles";
// import { Main } from "../Server/Main";
// import { Settings } from "../Server/Settings";





// const Department = { 
//    Position: new mp.Vector3(-761.8135, -1308.1590, 5.150),
//    Vehicle: { 
//       Position: new mp.Vector3(-759.0048, -1318.384, 4.3801),
//       Rotation: new mp.Vector3(-0.031622, 0.0304401, -43.57),
//       Models: ['asea', 'intruder'],
//       Color: 69
//    }
// };


// // const Route = require('../data/Driving.Route');
// // const Quiz = require('../data/Driving.Quiz');


// mp.events.add({
//    'server:vehicle.department.license:give': async (Player, Category, vehicle) => { 
//       Main.Sleep(4).then(async () => { 
//          frp.GameObjects.TemporaryVehicles[vehicle].destroy();

//          const Character = await Player.character();
//          Character.GiveLicense(Category);

//          Player.Notification(Messages.SUCCEFULLY_GET_LICENSE + Category + '.', NotifyType.SUCCESS, 6);

//       });
//    },

//    'server:vehicle.department:menu': async (player) => { 
//       const Character = await pplayer.character();
//       const Player = { Money: Character.Money, Licenses: Character.Licenses };
//       const Department = { Quiz: Quiz, Licenses: Settings.Licenses };
//       player.call('client:vehicle.department:menu', [Player, Department]);
//    }
// })

// mp.events.addProc({
//    'server:vehicle.department.driving:start': (player) => { 
//       let Model = Department.Vehicle.Models[Math.floor(Math.random() * Department.Vehicle.Models.length)];
//       const Vehicle = Vehicles.CreateTemporary(Model, Department.Vehicle.Position, Department.Vehicle.Rotation, [Department.Vehicle.Color, Department.Vehicle.Color], 'DMV' + Main.GenerateNumber(3));
//       player.SendMessage(Messages.DMV_INSTRUCTOR_GO_VEHICLE, Colors.white[0]);
   
//       return [Vehicle, Route];
//    }
// })


// export class DMV { 

//    static Colshape = mp.colshapes.newRectangle(Department.Position.x, Department.Position.y, Department.Position.z, 2.0, Settings.Default.dimension);
//    static Blip = mp.blips.new(530, new mp.Vector3(Department.Position.x, Department.Position.y, 0), {
//       name: 'Department of Motor Vehicles',
//       scale: 0.85,
//       color: 54,
//       alpha: 255,
//       shortRange: true,
//       dimension: Settings.Default.dimension,
//    });

//    static Working () { 

//       if (mp.world.time.hour < 6 || mp.world.time.hour > 20) { 
//          DMV.Colshape.OnPlayerEnter = (player) => { player.Notification(Messages.DMV_NOT_WORKING, Globals.Notification.Info, 5); };
//       }  else { 
//          DMV.Colshape.OnPlayerEnter = (player) => { player.Notification(Messages.DMV_USAGE, Globals.Notification.Info, 5); };
//       }

//       setTimeout(() => { DMV.Working(); }, 30 * 1000);
//    }
   
// };

// (async () => {

//    DMV.Working();

// })();
