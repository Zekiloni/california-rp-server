

class Main {
    static IsAnyVehicleAtPoint(position, range = 2.5, dimension = 0) {
        mp.vehicles.forEachInRange(position, range, (vehicle) => {
            if (vehicle && vehicle.dimension == dimension) {
                return vehicle;
            }
            else {
                false;
            }
            ;
        });
    }
}

