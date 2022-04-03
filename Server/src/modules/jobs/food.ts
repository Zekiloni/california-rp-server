import { Jobs, BaseItem } from '@models';


interface FoodOrder { 
   name: string
   phone?: number
   items: BaseItem[]
}


class FoodDelivery extends Jobs {

}