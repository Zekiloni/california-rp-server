

mp.events.add({
    'CLIENT::PED:SMART:FLEE:FROM:PED': (Ped: PedMp, FleeingPed: PedMp) => { // 
        mp.game.invoke('0x22B0D0E37CCB840D', [Ped, FleeingPed.handle, 75, 5000, false, false]); // TASK_SMART_FLEE_PED ( Ped ped, Ped fleeTarget, float distance, Any fleeTime, BOOL p4, BOOL p5 )
    },

    'CLIENT::PED:SMART:FLEE:COORD': (Ped: PedMp, TargetDest: Vector3Mp) => { //  Ped ped, float x, float y, float z, float distance, int time, BOOL p6, BOOL p7 )  //0x94587F17E9C365D5
        mp.game.invoke('0x94587F17E9C365D5', [Ped, TargetDest.x, TargetDest.y, TargetDest.z, 25, 5000, false, false]);
    },

    'CLIENT::TASK:WANDER:IN:AREA': (Ped: PedMp, TargetArea: Vector3Mp) => { // TASK_WANDER_IN_AREA ( Ped ped, float x, float y, float z, float radius, float minimalLength, float timeBetweenWalks )  //0xE054346CA3A0F315
        mp.game.invoke('0xE054346CA3A0F315', [Ped, TargetArea.x, TargetArea.y, TargetArea.z, 25, 0, 0]); 
    }
});


