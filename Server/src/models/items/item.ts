

import { AfterCreate, AfterDestroy, AfterSave, AfterSync, AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, Default, ForeignKey, HasOne, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { ItemEnums, notifications } from '@enums';
import { shared_Data } from '@shared';
import { ItemExtra } from '@interfaces';
import { BaseItem, Logs, Characters, Vehicles, Houses, Busines, Phones } from '@models';
import { itemNames, Lang, none } from '@constants';
import { playerConfig } from '@configs';


@Table
export class Items extends Model { 
   static objects = new Map<number, ObjectMp>();

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column(DataType.STRING)
   name: string;

   @ForeignKey(() => Characters)
   @Column({ type: DataType.INTEGER, field: 'character_id' })
   characterID: number

   @ForeignKey(() => Vehicles)
   @Column({ type: DataType.INTEGER, field: 'vehicle_id' })
   vehicleID: number

   @BelongsTo(() => Characters)
   character: Characters | null

   @BelongsTo(() => Vehicles)
   vehicle: Vehicles | null

   @HasOne(() => Phones)
   phone: Phones | null

   @Default(false)
   @Column({ type: DataType.BOOLEAN, field: 'on_ground' })
   onGround: boolean;

   @Default(false)
   @Column(DataType.BOOLEAN)
   equiped: boolean;

   @Default(1)
   @Column(DataType.INTEGER({ length: 6 }))
   quantity: number

   @Default(ItemEnums.status.NONE)
   @Column(DataType.INTEGER)
   status: ItemEnums.status;
   
   @Default(none)
   @Column(DataType.INTEGER)
   fingerprint: number; 

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('position')); }
   })
   position: Vector3Mp;

   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('rotation')); }
   })   
   rotation: Vector3Mp

   @Column
   dimension: number;

   @Default({})
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('data')); }
   })   
   data: ItemExtra;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get object () { 
      return Items.objects.get(this.id)!;
   }

   set object (object: ObjectMp) { 
      Items.objects.set(this.id, object);
   }

   get isEquiped () {
      return this.equiped;
   }

   @AfterSync
   static async loading () {
      Items.findAll( { where: { onGround: true } } ).then(items => {
         items.forEach(item => {
            item.refresh();
         })
      });

      Logs.info(await Items.count() + ' items loaded !');
   }

   @AfterCreate
   static async creating (item: Items) { 
      item.refresh();
      
      const rItem = BaseItem.list[item.name];

      if (!rItem) {
         return;
      }

      switch (rItem.name) {
         case itemNames.HANDHELD_RADIO: {
            item.data = {
               power: true,
               frequency: '000',
               slot: 1
            }
            break;
         }
      }

      await item.save();
   }

   @AfterDestroy
   static destroying (item: Items) { 
      if (item.object) {
         item.object.destroy();
         Items.objects.delete(item.id);
      }
   }

   @AfterSave
   static saving (item: Items) {
      item.refresh();
   }

   refresh () {
      if (this.onGround) {
         this.object = mp.objects.new(BaseItem.list[this.name].model, this.position, { alpha: 255, rotation: this.rotation, dimension: this.dimension });
         this.object.setVariable(shared_Data.ITEM, { name: this.name, id: this.id });
      } else { 
         if (this.object) { 
            this.object.destroy();
            Items.objects.delete(this.id);
         }
      }
   }

   async pickupItem (player: PlayerMp) { 
      if (this.onGround) {
         this.onGround = false;
         this.character = player.character;
         player.setVariable('ANIMATION', { name: 'pickup_low', dictionary: 'random@domestic', flag: 0 } );
         await this.save();
      }
   }

   async dropItem (player: PlayerMp, position: Vector3Mp, rotation: Vector3Mp) {
      this.character = null;
      this.onGround = true;
      this.dimension = player.dimension;
      this.fingerprint = player.character.id;
      this.position = position;
      this.rotation = rotation;
      await this.save();
   }

   async equipItem (player: PlayerMp) {
      const rItem = BaseItem.list[this.name!];

      const equipment = await Items.findAll( { where: { equiped: true, owner: player.character.id, entity: ItemEnums.entity.PLAYER } });
      const equiped = equipment.filter(
         item => !BaseItem.list[item.name].type.includes(ItemEnums.type.CLOTHING) && !BaseItem.list[item.name].type.includes(ItemEnums.type.PROP)
      );
      
      if (equiped.length > playerConfig.max.EQUIPMENT) {
         player.notification(Lang.youReachedMaxEquipemnt + playerConfig.max.EQUIPMENT + '.', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (!rItem.isEquipable) {
         Logs.error('equipItem: isEquipable');
         return;
      }

      if (equiped.find(alreadyEquiped => alreadyEquiped.name == this.name)) {
         player.notification(Lang.youAlreadyEquiped + ' ' + this.name + '.', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      this.equiped = true;
      await this.save();
   }

   static hasItem (player: PlayerMp, itemName: string) {
      console.log('------------ hasItem -------------')
      console.log(player.character.items)
      // if (player.character.items) {
      //    return player.character.items.find(item => item.name == itemName);
      // } else {
      //    return null;
      // }
   }
   
   static async giveItem (player: PlayerMp, item: BaseItem, quantiy?: number) { 
      let hasItem = Items.hasItem(player, item.name);

      console.log(' ------------ giveitem ------------');
      console.log(player.character.items)

      // if (hasItem && item.isStackable) {
      //    hasItem.update('quantiy', { by: quantiy ? quantiy : 1 });
      // } else {
      //    Items.create({
      //      name: item.name, 
      //      character: player.character,
      //      characterID: player.character.id,
      //      quantiy: quantiy ? quantiy : 1
      //    }).then(item => player.character.items?.push(item));
      // }
   };

}




