import { Busines } from '@models';


interface ClothingCart {
   item: string
   texture: number
   drawable: number
};

function buyClothing (player: PlayerMp, businesID: number, cart: string) {
   Busines.findOne({ where: { id: businesID } }).then(busines => {
      if (!busines)
         return;
      
      const items: ClothingCart[] = JSON.parse(cart);

      items.forEach(item => console.log(item));

      
   });

}