
import weaponData from '../configs/weapon.data.json';
import { itemNames } from '@constants';
import { ItemEnums } from '@enums';
import { BaseItem, Items, Logs } from '@models';


mp.events.addProc(
   {
      'SERVER::PLAYER:ITEMS:GET': getPlayerItems,
      'SERVER::ITEM:INFO': getItemInfo,      
      'SERVER::ITEM:DROP': onItemDrop,
      'SERVER::ITEM:PICKUP': onItemPickup,
      'SERVER::ITEM:EQUIP': onItemEquip,
      'SERVER::ITEM:USE': onItemUse,
      'SERVER::ITEM:UNEQUIP': onItemUnequip
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
   return Items.getEntityItems(ItemEnums.entity.PLAYER, player.character!.id);
};


async function getItemInfo (player: PlayerMp, itemName: string) { 
   const item = BaseItem.list[itemName];
   return { info: item, actions: item.availableActions() };
};


function onItemEquip (player:  PlayerMp, itemId: number) {
   return Items.findOne( { where: { id: itemId } } ).then(async item => {

      if (!item) {
         Logs.error('equipItem: itemNotFound');
         return;
      }

      await item.equipItem(player);

      const inventory = await Items.getEntityItems(ItemEnums.entity.PLAYER, player.character.id);
      return inventory;
   });
}


function onItemUnequip (player: PlayerMp, itemId: number) {
   return Items.findOne( { where: { id: itemId } } ).then(async item => {

      if (!item) {
         Logs.error('equipItem: onItemUnequip');
         return;
      }

      await item.unequip(player);

      const inventory = await Items.getEntityItems(ItemEnums.entity.PLAYER, player.character.id);
      return inventory;
   });
}


function onItemUse (player: PlayerMp, itemId: number)  { 
   return Items.findOne({ where: { id: itemId } }).then(async item => { 
      const rItem = BaseItem.list[item?.name!];

      await rItem?.use!(player, item);

      const inventory = await Items.getEntityItems(ItemEnums.entity.PLAYER, player.character.id);
      return inventory;
   })
};


function useEquiped (player: PlayerMp, index: number) {
   if (player.weapon) {
      player.removeAllWeapons();
   }
     
   Items.findAll( { where: { owner: player.character.id, equiped: true } } ).then(attachments => { 
      const equipment = attachments.filter(
         attachment => !BaseItem.list[attachment.name].type.includes(ItemEnums.type.CLOTHING) && !BaseItem.list[attachment.name].type.includes(ItemEnums.type.PROP)
      );
      
      const item = equipment[index];

      if (!item) {
         return;
      }
   
      const rItem = BaseItem.list[item.name];

      rItem.use!(player, item);
   })
};



async function onItemDrop (player: PlayerMp, itemId: number, positionString: string) { 
   return Items.findOne({ where: { id: itemId } }).then(async item => { 
      const groundPosition = JSON.parse(positionString);
      const { position, rotation } = groundPosition;

      await item?.dropItem(player, new mp.Vector3(position.x, position.y, position.z), new mp.Vector3(rotation.x, rotation.y, rotation.z));

      const inventory = await Items.getEntityItems(ItemEnums.entity.PLAYER, player.character.id);
      return inventory;
   });
};


async function onItemPickup (player: PlayerMp, itemId: number) { 
   return Items.findOne( { where: { id: itemId } } ).then(async item => {
      await item?.pickupItem(player);      

      const inventory = await Items.getEntityItems(ItemEnums.entity.PLAYER, player.character.id);
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

   const weaponItem = await Items.findOne(
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

   const item = await Items.hasEquiped(player, itemNames.HANDHELD_RADIO);
   
   let newData = item?.data;
   
   newData = {
      power: newInfo.power,
      frequency: newInfo.frequency,
      slot: newInfo.slot
   };

   item!.data = newData;
   await item!.save();

}