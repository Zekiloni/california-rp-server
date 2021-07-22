"use strict";
const Player = mp.players.local;
let Vehicles = { Front: null, Back: null }, browser = null, opened = false;
mp.events.add({
    'client:vehicle.alpr': () => {
        opened = true;
        FMarker = mp.markers.new(1, ForwardVehicle.position, 10, {
            direction: ForwardVehicle.position,
            rotation: ForwardVehicle.position,
            color: 0,
            visible: true,
            dimension: Player.dimension
        });
        BMarker = mp.markers.new(1, BackwardVehicle, 10, {
            direction: BackwardVehicle.position,
            rotation: BackwardVehicle.position,
            color: 0,
            visible: true,
            dimension: Player.dimension
        });
    },
    'render': () => {
        if (opened && Player.vehicle) {
            ALPR();
        }
    },
});
/* function GetVehicleInfrontOfEntity(entity)
    local coords = GetOffsetFromEntityInWorldCoords(entity,0.0,1.0,0.3)
    local coords2 = GetOffsetFromEntityInWorldCoords(entity, 0.0, ScanningDistance,0.0)
    local rayhandle = CastRayPointToPoint(coords, coords2, 10, entity, 0)
    local _, _, _, _, entityHit = GetRaycastResult(rayhandle)
    if entityHit>0 and IsEntityAVehicle(entityHit) then
        return entityHit
    else
        return nil
    end
end*/
function ALPR() {
    let FMarker = null, BMarker = null;
    const Vehicle = Player.vehicle;
    const ForwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, 10, 0.0), BackwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, -10, 0.0);
    /*
    const ForwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, ForwardPosition),
          BackwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, BackwardPosition);*/
    const ForwardVehicle = mp.raycasting.testCapsule(Vehicle.position, ForwardPosition, 2, Player, 2), BackwardVehicle = mp.raycasting.testCapsule(Vehicle.position, BackwardPosition, 2, Player, 2);
    // Returna: object: position (Entity Coordinates) , surfaceNormal, material (Entity Model) , entity (Handle)
    if (ForwardVehicle && ForwardVehicle.entity.type == 'vehicle') {
        Vehicles.Front = ForwardVehicle.entity;
        const Speed = Math.round(Vehicles.Front.getSpeed() * 3.6);
        mp.gui.chat.push(JSON.stringify(Speed));
    }
    if (BackwardVehicle && BackwardVehicle.entity.type == 'vehicle') {
        Vehicles.Back = BackwardVehicle.entity;
        const Speed = Math.round(Vehicles.Back.getSpeed() * 3.6);
        mp.gui.chat.push(JSON.stringify(Speed));
    }
    if (FMarker != null) {
        FMarker.position = ForwardVehicle.entity.position;
    }
    if (BMarker != null) {
        BMarker.position = BackwardVehicle.entity.position;
    }
}
/*  let

         mp.vehicles.forEachInRange(ForwardPosition, 5,
            (vehicle) => {
               DetectedVehicles.push(vehicle);
               break;
            }
         );
         mp.vehicles.forEachInRange(BackwardPosition, 5,
            (vehicle) => {
               DetectedVehicles.push(vehicle);
               break;
            }
         );
*/
