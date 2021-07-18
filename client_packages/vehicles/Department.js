


const Player = mp.players.local;
let browser = null, opened = false;

const Instructor = mp.peds.new(
   mp.game.joaat('a_m_y_bevhills_01'), 
   new mp.Vector3(-761.8135, -1308.1590, 5.150),
   -36,
   0
);

Instructor.freezePosition(true);
Instructor.setInvincible(true);


let Test = {
   Category: null,
   Route: null,
   Vehicle: null,
   Progress: null,
   Speedlimit: null,
   Warns: null,
   Point: null
};


mp.events.add({
   'client:vehicle.department:menu' (player, department) { 
      if (Test.Route != null) return;
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://vehicles/vehicles-interfaces/department.html');
         browser.execute('department.Player = ' + JSON.stringify(player));
         browser.execute('department.Quiz.Questions = ' + JSON.stringify(department.Quiz));
         browser.execute('department.Licenses = ' + JSON.stringify(department.Licenses));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:vehicle.department.driving:start': (category) => { 
      DrivingTest(category);
   },

   'playerEnterVehicle': (vehicle, seat) => { 
      if (vehicle == Test.Vehicle && seat == -1) { 
         StartRoute();
      }
   }
})


async function DrivingTest (category) { 
   const [Vehicle, Route] = await mp.events.callRemoteProc('server:vehicle.department.driving:start', category);
   Test.Vehicle = mp.vehicles.atRemoteId(Vehicle);
   Test.Route = Route;
   Test.Warns = 0;

   Instructor.freezePosition(false);
   mp.game.wait(5);
   Instructor.taskEnterVehicle(Test.Vehicle.handle, 5000, 0, 1, 1, 0);
};


function Check () { 

   const Time = mp.game.invoke('0x25223CA6B4D20B7F');

   if (Time < 6 || Time > 20) { 
      Instructor.setAlpha(0, false);
      Instructor.setCollision(false, false);
   } else { 
      Instructor.setAlpha(255, false);
      Instructor.setCollision(true, true);
   }
   setTimeout(() => { Check(); }, 30 * 1000);
}

Check();

async function StartRoute () { 

   const Point = Player.CreateInteractionSpot('Polaganje', new mp.Vector3(Test.Route[0].position.x, Test.Route[0].position.y, Test.Route[0].position.z));
   Test.Point = Point;

   mp.events.add('playerEnterCheckpoint', NextPoint);
}

function NextPoint (point) { 
   if (Player.vehicle && Player.vehicle == Test.Vehicle && Test.Point.checkpoint == point) { 

      Test.Point.checkpoint.destroy();
      Test.Point.blip.destroy();

      mp.game.wait(50);

      if (Test.Progress == Test.Route.length - 1) {
         mp.events.remove('playerEnterCheckpoint', NextPoint);
         mp.gui.chat.push(JSON.stringify(Test.Vehicle.remoteId));
         Test.Route = null, Test.Progress = null;

         mp.events.add('playerLeaveVehicle', (vehicle, seat) => { 
            if (vehicle == Test.Vehicle) { 
               Instructor.taskGoStraightToCoord(-761.8135, -1308.1590, 5.150, 1, 5000, -36, 2);
               mp.events.callRemote('server:vehicle.department.license:give', Test.Category, Test.Vehicle.remoteId);
            }
         });
         // izbrisati vozilo
         return;
      };

      Test.Progress ++;

      const Position = new mp.Vector3(Test.Route[Test.Progress].position.x, Test.Route[Test.Progress].position.y, Test.Route[Test.Progress].position.z - 0.5);
      const Point = Player.CreateInteractionSpot('Polaganje', Position);
      Test.Point = Point;
   }
};