

import { AfterCreate, AfterDestroy, AutoIncrement, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { entityData, itemData, logType } from '../globals/enums';
import { Logger } from '../utils';
import { baseItem } from './item.model';



@Table
export default class Items extends Model { 

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column(DataType.STRING)
   name: string;

   @Column(DataType.INTEGER)
   entity: itemData.Entity;

   @Column(DataType.INTEGER)
   status: itemData.Status;

   @Column
   owner: number;

   @Default(1)
   @Column(DataType.INTEGER)
   quantity: number;
   
   @Default(0)
   @Column
   fingerprint: number; 

   @Column(DataType.JSON)
   position: Vector3Mp;

   @Column(DataType.JSON)
   rotation: Vector3Mp

   @Column
   dimension: number;

   @Default({})
   @Column(DataType.JSON)
   data: Object;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   object: ObjectMp;

   @AfterCreate
   static creating (Item: Items) { 
      Item.refreshItem();
   }


   @AfterDestroy
   static destroying (item: Items) { 
      if (item.object) item.object.destroy();
   }


   refreshItem () { 
      if (this.status == itemData.Status.GROUBD) {
         this.object = mp.objects.new(baseItem.list[this.name].model, this.position, { alpha: 255, rotation: this.rotation, dimension: this.dimension });
         this.object.setVariable(entityData.ITEM, this.name);
      } else { 
         if (this.object) { 
            this.object.destroy()
         }
      }
   }


   async dropItem () { 

   }

   async useItem (Player: PlayerMp) { 
      const Character = Player.Character;
      
      const rItem = baseItem.list[this.name];
   }


   static async getItems (entity: itemData.Entity, owner: number)  { 
      const items = await Items.findAll({where: { owner: owner, entity: entity }}).catch(e => Logger(logType.ERROR, 'Catching Items ' + e));
      return items;
   }


   static async giveItem (player: PlayerMp, target: PlayerMp, item: baseItem, quantity: number = 1) { 
      const alreadyItem = await Items.hasItem(itemData.Entity.PLAYER, target.Character.id, item.name);
      
      alreadyItem && item.isStackable() ? 
         alreadyItem.increment('quantity', { by: quantity }) : Items.create({ name: item.name, quantity: quantity, entity: itemData.Entity.PLAYER, owner: target.Character.id });
   }


   static async hasItem (entity: itemData.Entity, owner: number, itemName: string) {
      const has = await Items.findOne({ where: { entity: entity, owner: owner, name: itemName } });
      return has == null ? false : has;
   }

   
}



// frp.Items.afterCreate(async (Item, Options) => {
//    if (Item.Entity == ItemEntities.Player) { 
//       if (Item.Item == 'Phone' || Item.Item == 'Smartphone') { 
//          console.log('Kreiranje broja telefona');
//          let pNumber = frp.Main.GenerateNumber(6);

//          let Exist = await frp.Items.count({ where: { Number: pNumber } });
//          do {
//             console.log('Pokusajem opet');
//             pNumber = frp.Main.GenerateNumber(6);
//          } while (Exist != 0);
//          console.log(Exist)
//          console.log('kreirano sefe');
//          Item.Number = pNumber;
//          Item.Extra = { Wallpaper: 0, Brightness: 1.0, On: true };
//          await Item.save();
//       }
//    }
// });




// frp.Items.Inventory = async function (Player) {
//    let Inventory = [];
//    const Items = await frp.Items.findAll({ where: { Owner: Player.character } });
//    Items.forEach((Item) => {
//       Inventory.push({ id: Item.id, name: Item.Item, quantity: Item.Quantity, entity: Item.Entity, ammo: Item.Number, weight: ItemRegistry[Item.Item].weight, hash: ItemRegistry[Item.Item].hash });
//    });
//    return Inventory;
// };


// frp.Items.Trunk = async function (Vehicle) { 
//    let Trunk = [];
//    if (Vehicle.Database) { 
//       const Items = await frp.Items.findAll({ where: { Owner: Vehicle.Database, Entity: ItemEntities.Vehicle } });
//       Items.forEach((Item) => { 
//          Trunk.push({ id: Item.id, name: Item.Item, quantity: Item.Quantity, weight: ItemRegistry[Item.Item].weight, hash: ItemRegistry[Item.Item].hash });
//       });
//    } else { 
//       const Items = await frp.Items.findAll({ where: { Owner: Vehicle.id, Entity: ItemEntities.TemporaryVehicle } });
//       Items.forEach((Item) => { 
//          Trunk.push({ id: Item.id, name: Item.Item, quantity: Item.Quantity, weight: ItemRegistry[Item.Item].weight, hash: ItemRegistry[Item.Item].hash });
//       });
//    }
//    return Trunk;
// };


// frp.Items.Weapons = async function (player) { 
//    let PlayerWeapons = [];
//    const Weapons = await frp.Items.findAll({ where: { Owner: player.character, Entity: ItemEntities.Wheel } });
//    Weapons.forEach((Weapon) => { 
//       PlayerWeapons.push({ id: Weapon.id, name: Weapon.Item, ammo: Weapon.Number, weapon: ItemRegistry[Weapon.Item].weapon });
//    });
//    return PlayerWeapons;
// };




// frp.Items.prototype.Disarm = async function (player) { 
//    const Weapons = await frp.Items.findAll({ where: { Owner: player.character, Entity: ItemEntities.Wheel } });
//    Weapons.forEach(async (Weapon) => { 
//       const Hash = mp.joaat(ItemRegistry[Weapon.Item].weapon);
//       if (player.allWeapons[Hash]) {
//          const Ammo = player.allWeapons[Hash];
//          console.log('Weapon Hash je ' + Hash);
//          console.log('Weapon Ammo iz liste igracevih oruzija je ' + Ammo);   
//          Weapon.Number = Ammo;
//          await Weapon.save();  
//       }
//    });

//    this.Entity = ItemEntities.Player;
//    await this.save();

//    return frp.Items.Inventory(player);
// };


// frp.Items.prototype.Refresh = function () {
//    if (this.Entity == ItemEntities.Ground) {

//       const Position = new mp.Vector3(this.Position.x, this.Position.y, this.Position.z);
//       const Rotation = new mp.Vector3(this.Rotation.x, this.Rotation.y, this.Rotation.z);

//       this.GameObject = mp.objects.new(ItemRegistry[this.Item].hash, Position, {
//          rotation: Rotation,
//          alpha: 255,
//          dimension: this.Dimension
//       });

//       this.GameObject.setVariable('Item', this.Item);

//       this.GameObject.Item = this.id;

//    } else {
//       if (this.GameObject) {
//          this.GameObject.destroy();
//       }
//    }
// };



// frp.Items.prototype.Delete = async function () {
//    this.GameObject.destroy();
//    await this.destroy();
// };


// frp.Items.prototype.Drop = async function (player, place, quantity = 1) {
//    const Position = JSON.parse(place);
//    if (this.Quantity == quantity) {
//       this.Entity = ItemEntities.Ground;
//       this.Position = Position.position;
//       this.Rotation = Position.rotation;
//       this.Dimension = player.dimension;
//       this.Last_Owner = player.character;
//       this.Refresh();
//       await this.save();
//    } else {
//       this.increment('Quantity', { by: -quantity });
//       frp.Items.New(this.Item, quantity, ItemEntities.Ground, 0, Position.position, Position.rotation, player.dimension);
//    }

//    player.ProximityMessage(frp.Globals.distances.me, `* ${player.name} baca ${this.Item} na zemlju.`, frp.Globals.Colors.purple);

//    return frp.Items.Inventory(player);
// };


// frp.Items.prototype.Pickup = async function (player) {
//    // PROKS PORUKA: Podigao taj i taj predmet /me
//    this.Entity = ItemEntities.Player;
//    this.Owner = player.character;
//    this.Refresh();
//    await this.save();
// };


// frp.Items.prototype.Give = async function (player, target, quantity) {
//    if (player.dist(target.position) > 2.5) return; // PORUKA: Taj igrac se ne nalazi u vasoj blizini

//    const Has = await frp.Items.HasItem(target.character, this.Item);

//    console.log(this.Quantity + ' je kolicina itema, data kolicina je ' + quantity);
//    if (this.Quantity == quantity) {
//       this.Owner = target.character;
//       await this.save();
//       console.log('Item prepisan igracu.');
//    } else {
//       console.log('Nije data cela kolicina predmeta');
//       this.increment('Quantity', { by: -quantity });
//       console.log('Oduzeta je kolicina predmeta koju je igrac imao');
//       if (Has && ItemRegistry[Has.Item].type != ItemType.Weapon) {
//          console.log('Meta je imala vec predmet dodata je kolicina');
//          Has.increment('Quantity', { by: quantity });
//       } else {
//          console.log('Meta nije imala predmet, napravljen joj je');
//          frp.Items.New(this.Item, quantity, ItemEntities.Player, target.character);
//       }
//    }

//    player.ProximityMessage(frp.Globals.distances.me, `* ${player.name} daje ${this.Item} ${target.name}. (( Give ))`, frp.Globals.Colors.purple);

//    return frp.Items.Inventory(player);
// };


// frp.Items.Near = async function (player) {
//    return new Promise((resolve, reject) => { 
//       const Position = player.position;
//       mp.objects.forEachInRange(Position, 1.7, async (object) => {
//          if (object.dimension == player.dimension) {
//             if (object.Item) {
//                let Nearby = await frp.Items.findOne({ where: { id: object.Item }});
//                if (Nearby) { 
//                   resolve(Nearby);
//                } else { 
//                   reject(false);
//                }
//             }
//          }
//       });
//    })   
// };
 


// frp.Items.GetRandomByType = function (type) { 
//    let Items = [];
//    for (const i in ItemRegistry) { 
//       const Item = ItemRegistry[i];
//       if (Item.type == type) { 
//          Items.push(Item);
//       }
//    }
//    return Items[Math.floor(Math.random() * Items.length)];
// };


// frp.Items.prototype.Use = async function (player) {
//    return new Promise(async (resolve) => { 
//       const Item = ItemRegistry[this.Item];
      
//       let Decrement = false;

//       switch (Item.type) { 
//          case ItemType.Weapon: { 
//             this.Entity = ItemEntities.Wheel;
//             Item.use(player, this.Number);
//             await this.save();
//             Decrement = false;
//             break;
//          }

//          case ItemType.Equipable: {
//             await this.Equip(player);
//             Decrement = false;
//             break;
//          }

//          case ItemType.Food: { 
//             await this.Eat(player);
//             Decrement = true;
//             break;
//          }

//          case ItemType.Drink: { 
//             await this.Drink(player);
//             Decrement = true;
//             break;
//          }

//          default: {

//             if (Item.use == false) { 
//                return;
//             } else { 
//                Item.use(player);
//             }
//          }
//       }

//       if (Decrement) { 
//          if (this.Quantity > 1) { 
//             await this.increment('Quantity', { by: -1 });
//          } else { 
//             await this.destroy();
//          }
//       }

//       resolve(frp.Items.Inventory(player));
//    });
// };


// frp.Items.prototype.Equip = async function (player) { 

//    const Character = await player.Character();
//    const Item = ItemRegistry[this.Item];

//    const AlreadyEquiped = await frp.Items.IsEquiped(player, this.Item);
//    if (AlreadyEquiped) { 
//       AlreadyEquiped.Entity = ItemEntities.Player;
//       await AlreadyEquiped.save();
//    }

//    this.Entity = ItemEntities.Equiped;

//    if (Item.clothing) { 
//       player.setClothes(Item.component, parseInt(this.Extra.Drawable), parseInt(this.Extra.Texture), 2);

//       if (Item.component == Clothing.Components.Tops) { 
//          const BestOne = Torsos[Character.Gender][this.Extra.Drawable];
//          console
//          player.setClothes(Clothing.Components.Torso, BestOne, 0, 2);
//       }

//    } else { 
//       player.setProp(Item.component, parseInt(this.Extra.Drawable), parseInt(this.Extra.Texture));
//    }

//    await this.save();

// };



// frp.Items.prototype.Unequip = async function (player) {
//    return new Promise(async (resolve) => { 
//       const Character = await player.Character(), Item = ItemRegistry[this.Item];

//       this.Entity = ItemEntities.Player;
//       await this.save();

//       const Naked = Clothing.Naked[Character.Gender][Item.name]
//       Item.prop ? player.setProp(Item.component, 0, 255) : player.setClothes(Item.component, Naked, 0, 2);

//       if (Item.component == Clothing.Components.Tops) { 
//          const Best = Torsos[Character.Gender][Naked];
//          player.setClothes(Clothing.Components.Torso, Best, 0, 2);
//       }

//       const inventory = await frp.Items.Inventory(player);
//       resolve(inventory);
//    });
// };


// frp.Items.Equipment = async function (player, gender) { 

//    const Clothings = [
//       'Pants', 'Bag', 'Shoes', 'Accesories', 'Undershirt', 'Armour',
//       'Tops', 'Hat', 'Glasses', 'Ears', 'Mask',  'Watch',  'Bracelet'
//    ];

//    let items = {};

//    for (const clothing of Clothings) { 
//       const item = await frp.Items.HasItem(player.character, clothing);
//       if (item && item.Entity == ItemEntities.Equiped) { 
//          items[clothing] = item;
//       } else { 
//          items[clothing] = null;
//       }
//    }

//    for (const name in items) { 
//       const item = items[name];
//       const info = ItemRegistry[name];

//       if (item) { 
//          info.prop ? 
//             player.setProp(info.component, parseInt(item.Extra.Drawable), parseInt(item.Extra.Texture)) : player.setClothes(info.component, parseInt(item.Extra.Drawable), parseInt(item.Extra.Texture), 2);
//       } else { 
//          info.prop ? 
//             player.setProp(info.component, 0, 255) : player.setClothes(info.component, Clothing.Naked[gender][name], 0, 2);
//       }
//    }

//    let BestTorso = 0
//    if (items['Tops']) { 
//       BestTorso = Torsos[gender][items['Tops'].Extra.Drawable];
//    } else { 
//       BestTorso = Torsos[gender][Clothing.Naked[gender]['Tops']];
//    }

//    player.setClothes(Clothing.Components.Torso, BestTorso, 0, 2);
// };


// frp.Items.IsEquiped = async function (player, item) { 
//    const Equipped = await frp.Items.findOne({ where: { Entity: ItemEntities.Equiped, Owner: player.character, Item: item } });
//    return Equipped == null ? false : Equipped;
// };


// frp.Items.Clear = async function (player) {
//    const Items = await frp.Items.findAll({ where: { Owner: player.character } });
//    Items.forEach(async (Item) => {
//       await Item.destroy();
//    });
// };


// frp.Items.Weight = async function (player) {
//    const Inventory = await frp.Items.Inventory(player);
//    let Weight = 0;
   
//    Inventory.forEach((Item) => {
//       Weight += ItemRegistry[Item.Item].weight;
//    });

//    return Weight;
// };


// frp.Items.prototype.Eat = async function (player) { 
//    const Character = await player.Character();
//    const Item = ItemRegistry[this.Item];

//    const animation = Animations['eat'];
//    player.playAnimation(animation[0], animation[1], 1, 49);

//    if (player.getVariable('Attachment') != null) return;

//    Character.Attachment(player, Item.hash, 6286);

//    Character.increment('Hunger', { by: Item.Hunger });
// };

// frp.Items.prototype.Drink = async function (player) { 
//    const Character = await player.Character();
//    const Item = ItemRegistry[this.Item];

//    const animation = Animations['drink2'];
//    player.playAnimation(animation[0], animation[1], 1, 39);

//    Character.increment('Hunger', { by: Item.Hunger });
// };

// (async () => { 

//    await frp.Items.sync();

//    const Items = await frp.Items.findAll();
//    Items.forEach((Item) => {
//       Item.Refresh();
//    });


//    frp.Main.Terminal(3, Items.length + ' Items Loaded !');
// })();


