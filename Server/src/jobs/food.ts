import { Jobs, Items } from '@models';


interface FoodOrder { 
   name: string
   phone?: number
   items: Items[]
}


class FoodDelivery extends Jobs {

}