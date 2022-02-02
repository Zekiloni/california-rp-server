
import { itemEnums } from '@enums';
import { items, inventories } from '@models';


mp.events.addProc(
   {

      'SERVER::PLAYER:ITEMS:GET': getPlayerItems,
      'SERVER::ITEM:INFO': getItemInfo,      
      'SERVER::ITEM:USE': onItemUse,
      'SERVER::ITEM:DROP': onItemDrop,
      'SERVER::ITEM:PICKUP': onItemPickup
   }
);

mp.events.add(
   {
      'SERVER::ITEM:WEAPON:SHOT': onWeaponShot
   }
)


function getPlayerItems (player: PlayerMp) { 
   return inventories.getEntityItems(itemEnums.entity.PLAYER, player.character!.id);
};


async function getItemInfo (player: PlayerMp, itemName: string) { 
   const item = items.list[itemName];
   return { info: item, actions: item.availableActions() };
};


async function onItemUse (player: PlayerMp, itemId: number): Promise < inventories[] >  { 
   return new Promise((resolve) => { 
      inventories.findOne({ where: { id: itemId } }).then(async item => { 
         const baseItem = items.list[item?.name!];

         if (baseItem.isEquipable() && item && !item?.equiped) {
            
            if (player.character.equiped.length > 5) {
               // PORUKA: // nema mesta
               return;
            }

            item.equiped = true;
            player.character.equiped.push(item);
            
         }

         await baseItem?.use!(player, item);

         const inventory = await inventories.getEntityItems(itemEnums.entity.PLAYER, player.character.id);
         resolve(inventory!)
      })
   });
};


async function onItemDrop (player: PlayerMp, itemId: number, positionString: string) { 
   inventories.findOne({ where: { id: itemId } }).then(async item => { 
      const groundPosition = JSON.parse(positionString);
      const { position, rotation } = groundPosition;

      await item?.dropItem(player, new mp.Vector3(position.x, position.y, position.z), new mp.Vector3(rotation.x, rotation.y, rotation.z))
         
      const inventory = await inventories.getEntityItems(itemEnums.entity.PLAYER, player.character.id);
      return inventory;
   });
};


async function onItemPickup (player: PlayerMp, itemId: number) { 
   return inventories.findOne( { where: { id: itemId } } ).then(async item => {
      await item?.pickupItem(player);      

      const inventory = await inventories.getEntityItems(itemEnums.entity.PLAYER, player.character.id);
      return inventory;  
   })
};


async function onWeaponShot (player: PlayerMp) {
   if (!player.weapon) { 
      // no weapon in hand
      return;
   }

   const weapon = await player.call('CLIENT::WEAPON:NAME', [player.weapon]);

   const weaponItem = await inventories.findOne(
      { 
         where: { 
            owner: player.character.id, 
            name: weapon!, 
            equiped: true
         } 
      }
   );
   
   if (!weaponItem) { 
      return;
   }

   let data = weaponItem.data;
   if (data.ammo! > 0) {
      data.ammo! --;
   }

   weaponItem.data = data;

   await weaponItem.save();
}