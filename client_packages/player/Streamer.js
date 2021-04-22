

const Player = mp.players.local;



mp.events.add({
   'entityStreamIn': (entity) => {

   }
});

// mp.events.addDataHandler({
//    'roadblock': (entity, value) => {
//       if (entity.type === 'object')  { 
//          entity.roadblock = value;
//       }
//    }
// });