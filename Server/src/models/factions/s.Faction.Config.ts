



export namespace FactionsConfig {
   export const enum PlayerFaction {
      NOT_IN_FACTION, IN_FACTION
   }


   interface FactionVehicle {
      name: string
      model: string
      livery?: number[]
   }


   /**
    * Here you define vehicles that can be spawned by leo. 
    * @const LeoVehicles
    */
   export const LeoVehicles: FactionVehicle[] = [
      { name: 'Police Cruiser', model: 'police', livery: [0, 1, 2, 3] }
   ];


   /**
    * Here you define vehicles that can be spawned by leo. 
    * @const FireMedicVehicles
    */
    export const FireMedicVehicles: FactionVehicle[] = [
      { name: 'Ambulance', model: 'ambulance' },
      { name: 'Firetruck', model: 'firetruk' },
      { name: 'Life Guard SUV', model: 'firetruk' }
   ];


   /**
    * Here you define vehicles that can be spawned by leo. 
    * @const GovVehicles
    */
   export const GovVehicles: FactionVehicle[] = [ 
   ];


   /**
    * Special vehicles like helicopters for police, and plane for fire dept. 
    * @const AirportVehicles
    */
   export const AirportVehicles: FactionVehicle[] = [

   ]
}