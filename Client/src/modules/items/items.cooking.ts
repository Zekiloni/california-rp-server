import { entityType } from "../../enums/entity";


const objects = [
   1903501406, 519797612, 286252949
];

mp.events.add('entityStreamIn', (entity: EntityMp) => { 
   //mp.gui.chat.push('entity type ' + JSON.stringify(entity.type))
   if (entity.type == entityType.OBJECT)  {
      //mp.gui.chat.push('adada')
      if (entity.getVariable('ITEM') && objects.includes(entity.model)) {
         mp.gui.chat.push('rostilj')
      }
   }
})