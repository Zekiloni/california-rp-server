

// const DOORS = [ 
//    POLICE_DOORS = [ 
//       { id: 1000, model: 320433149, position: new Vector3(434.7479, -983.2151, 30.83926), faction: FACTION_LSPD.ID },
//       { id: 1001, model: -1215222675, position: new Vector3(434.7479, -980.6184, 30.83926), faction: FACTION_LSPD.ID },
//       { id: 34, model: 33, position: 2 },
//       { id: 34, model: 33, position: 2 },
//       { id: 34, model: 33, position: 2 },
//       { id: 34, model: 33, position: 2 },
//    ]
// ];



// const Doors = [
//    { id: 1000, model: 320433149, position: new mp.Vector3(434.7479, -983.2151, 30.83926), faction: FACTION_LSPD.ID, locked: false }],
//    { id: 1001, model: -1215222675, position: new mp.Vector3(434.7479, -980.6184, 30.83926), faction: FACTION_LSPD.ID, locked: false },
// ]

const Doors = new Map([ 
   [1000, { model: 320433149, position: new mp.Vector3(434.7479, -983.2151, 30.83926), faction: FACTION_LSPD.ID, locked: true }], //Mission Row Police Station Main Enter Doors
   [1001, { model: -1215222675, position: new mp.Vector3(434.7479, -980.6184, 30.83926), faction: FACTION_LSPD.ID, locked: true }], //Mission Row Police Station Main Enter Doors
   [1013, { model: 1557126584, position: new mp.Vector3(450.1041, -985.7384, 30.8393), faction: FACTION_LSPD.ID, locked: true }],  // Mission Row Police Station Locker Rooms Door
   [1009, { model: -1320876379, position: new mp.Vector3(446.5728, -980.0106, 30.8393), faction: FACTION_LSPD.ID, locked: true }], // Mission Row Police Station Captan's Office Door
   [1017, { model: 185711165, position: new mp.Vector3(443.4078, -989.4454, 30.8393), faction: FACTION_LSPD.ID, locked: true }], // Mission Row Police Station Cell And Briefing Doors - RIGHT
   [1018, { model: 185711165, position: new mp.Vector3(446.0079, -989.4454, 30.8393), faction: FACTION_LSPD.ID, locked: true }], // Mission Row Police Station Cell And Briefing Doors - LEFT
   [1016, { model: -340230128, position: new mp.Vector3(464.3613, -984.678, 43.83443), faction: FACTION_LSPD.ID, locked: true }], // Mission Row Police Station Roof Door
   [1005, { model: 631614199, position: new mp.Vector3(461.8065, -994.4086, 25.06443), faction: FACTION_LSPD.ID, locked: true }],
   [1006, { model: 631614199, position: new mp.Vector3(461.8065, -997.6583, 25.06443), faction: FACTION_LSPD.ID, locked: true }],
   [1007, { model: 631614199, position: new mp.Vector3(461.8065, -1001.302, 25.06443), faction: FACTION_LSPD.ID, locked: true }],
   [1008, { model: 631614199, position: new mp.Vector3(464.5701, -992.6641, 25.06443), faction: FACTION_LSPD.ID, locked: true }]
])


module.exports = { 

   nearbyDoors: (player) => { 
      let nearDoor = [];
      Doors.forEach((door) => {
         let doorPosition = new mp.Vector3(door.position.x, door.position.y, door.position.z);
         if (player.dist(doorPosition) < 2.5) {
            nearDoor.push({door});
         }
      })
      if (nearDoor.length === 0) {
         return false;
      } else {
         return nearDoor;
      }
   },

   controlNearDoor: (player) => { 
      let nearbyDoors = doors.nearbyDoors(player), status;
      if (nearbyDoors) {  
         nearbyDoors.forEach((d) => { 
            d.door.locked ? (
               d.door.locked = false,
               status = false,
               player.call('client:syncDoorsState', [d.door.model, d.door.position.x, d.door.position.y, d.door.position.z, false])
            ) : (
               d.door.locked = true,
               status = true,
               player.call('client:syncDoorsState', [d.door.model, d.door.position.x, d.door.position.y, d.door.position.z, true])
            );
         })
         if (status == false) { 
            account.notification(player, MSG_DOORS_UNLOCKED, NOTIFY_SUCCESS, 4);
         } else if (status == true) { 
            account.notification(player, MSG_DOORS_LOCKED, NOTIFY_ERROR, 4);
         }
      } else return false;
   },
}
