
import weaponData from '../configs/weapon.data.json';
import { itemNames } from '@constants';
import { itemEnums } from '@enums';
import { items, inventories, logs } from '@models';
import { itemExtra } from '@interfaces';


mp.events.addProc(
   {
      'SERVER::PLAYER:ITEMS:GET': getPlayerItems,
      'SERVER::ITEM:INFO': getItemInfo,      
      'SERVER::ITEM:DROP': onItemDrop,
      'SERVER::ITEM:PICKUP': onItemPickup,
      'SERVER::ITEM:EQUIP': onItemEquip,
      'SERVER::ITEM:USE': onItemUse,
   }
);


mp.events.add(
   {
      'SERVER::ITEM:WEAPON:SHOT': onWeaponShot,
      'SERVER::ITEMS:RADIO:UPDATE': updateHandheldRadio,
      'SERVER::USE:EQUIPED': useEquiped,
   }
)


function getPlayerItems (player: PlayerMp) { 
   return inventories.getEntityItems(itemEnums.entity.PLAYER, player.character!.id);
};


async function getItemInfo (player: PlayerMp, itemName: string) { 
   const item = items.list[itemName];
   return { info: item, actions: item.availableActions() };
};


function onItemEquip (player:  PlayerMp, itemId: number) {
   inventories.findOne( { where: { id: itemId } } ).then(async item => {

      if (!item) {
         logs.error('equipItem: itemNotFound');
         return;
      }

      await item.equipItem(player);

      const inventory = await inventories.getEntityItems(itemEnums.entity.PLAYER, player.character.id);
      return inventory;
   });
}


async function onItemUse (player: PlayerMp, itemId: number): Promise < inventories[] >  { 
   return new Promise((resolve) => { 
      inventories.findOne({ where: { id: itemId } }).then(async item => { 
         const rItem = items.list[item?.name!];

         await rItem?.use!(player, item);

         const inventory = await inventories.getEntityItems(itemEnums.entity.PLAYER, player.character.id);
         resolve(inventory!)
      })
   });
};


function useEquiped (player: PlayerMp, index: number) {

   if (player.weapon) {
      player.removeAllWeapons();
   }

   const item = player.character.equiped[index];
   
   if (!item) {
      return;
   }

   const rItem = items.list[item.name];

   rItem.use!(player, item);
};


async function onItemDrop (player: PlayerMp, itemId: number, positionString: string) { 
   inventories.findOne({ where: { id: itemId } }).then(async item => { 
      const groundPosition = JSON.parse(positionString);
      const { position, rotation } = groundPosition;

      await item?.dropItem(player, new mp.Vector3(position.x, position.y, position.z), new mp.Vector3(rotation.x, rotation.y, rotation.z));
         
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

   //@ts-ignore
   const weapon = weaponData[player.weapon.toString()];

   const weaponItem = await inventories.findOne(
      { 
         where: { 
            owner: player.character.id, 
            name: weapon?.Name, 
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


async function updateHandheldRadio (player: PlayerMp, newInfo: any) {

   newInfo = JSON.parse(newInfo);

   console.log(newInfo)

   const item = player.character.equiped.find(item => item.name == itemNames.HANDHELD_RADIO);
   const index = player.character.equiped.indexOf(item!);
   
   let newData = item?.data;
   
   newData = {
      power: newInfo.power,
      frequency: newInfo.frequency,
      slot: newInfo.slot
   };

   item!.data = newData;
   await item!.save();

   player.character.equiped[index] = item!;

}