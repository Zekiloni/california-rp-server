import { Jobs, Items } from 'src/vehicles';


interface FoodOrder { 
   name: string
   phone?: number
   items: Items[]
}


class FoodDelivery extends Jobs {

}