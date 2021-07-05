


const Player = mp.players.local;


let Instructor = mp.peds.new(
   mp.game.joaat('a_m_y_bevhills_01'), 
   new mp.Vector3(-761.8135, -1308.1590, 5.150),
   -36,
   0
);

Instructor.freezePosition(true);
Instructor.setInvincible(true);


let Test = {
   Route: null,
   Vehicle: null,
   Progress: null,
   Speedlimit: null,
   Warns: null
};


mp.events.add('zapocniSkoluAuto', () => { 
   StartDrivingTest();
})

async function StartDrivingTest () { 
   const [Vehicle, Route] = await mp.events.callRemoteProc('client:vehicle.department.driving:start');
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