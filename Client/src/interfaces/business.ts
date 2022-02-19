



export interface Business {
   id: number
   name: string
   type: number;
   locked: boolean
   walk_in: boolean
   price: number
   owner: number
   budget: number
   dimension: number
   ipl: string
   sprite: number
   sprite_color: number
   position: Vector3Mp
   vehicle_point: Vector3Mp
   interior_position: Vector3Mp
};


export interface DealershipTestDrve {
   previous: {
      position: Vector3Mp | null,
      dimension: number | null
   }
   active: boolean
   vehicle: VehicleMp | null
   timer: ReturnType<typeof setTimeout> | null
}


export interface CartItem {
   name: string
   quantity: number
   price: number
}
