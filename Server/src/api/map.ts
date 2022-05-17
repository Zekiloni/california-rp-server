import { api } from './index';
import { Houses, Busines } from '@models';


interface IMapPoints {
   houses: Vector3Mp[]
   busineses: { name: string, position: Vector3Mp }[]
}

api.get('/map', async (request, response) => {
   let points: IMapPoints = {
      houses: [],
      busineses: []
   }

   await Houses.findAll().then(houses => {
      houses.forEach(
         house => points.houses.push(house.position)
      );
   })

   await Busines.findAll().then(busineses => {
      busineses.forEach(
         busines => points.busineses.push({ name: busines.name, position: busines.position })
      );
   });

   response.json(points);
});