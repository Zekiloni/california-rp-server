// const { DataTypes, BOOLEAN } = require('sequelize');


// const { ItemEntities } = require('../classes/Items.Registry');
// const { VehicleEntities } = require('./Vehicle');

// let Appearance = require('./Appearance');
// const Enums = require('../data/Enums');


// frp.Characters = frp.Database.define('character', {
//       id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//       Account: { type: DataTypes.INTEGER, allowNull: false },
//       Name: { type: DataTypes.STRING, unique: true },
//       Gender: { type: DataTypes.TINYINT, defaultValue: 0 },
//       Birth: { type: DataTypes.DATEONLY },
//       Origin: { type: DataTypes.STRING, defaultValue: 'Los Santos' },

//       Faction: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Faction_Rank: { type: DataTypes.STRING, defaultValue: 'none' },
//       Faction_Perms: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Job: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Working_Hours: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Money: { type: DataTypes.INTEGER, defaultValue: 3000 },
//       Salary: { type: DataTypes.INTEGER, defaultValue: 0 },

//       Health: { type: DataTypes.INTEGER, defaultValue: 100 },
//       Armour: { type: DataTypes.INTEGER, defaultValue: 100 },
//       Hunger: { type: DataTypes.FLOAT, defaultValue: 100 },
//       Thirst: { type: DataTypes.FLOAT, defaultValue: 100 },
//       Wounded: { type: DataTypes.BOOLEAN, defaultValue: false },
//       Injuries: { 
//          type: DataTypes.TEXT, defaultValue: '[]',
//          get: function () { return JSON.parse(this.getDataValue('Injuries')); },
//          set: function (value) { this.setDataValue('Injuries', JSON.stringify(value)); }
//       },

//       Last_Position: {
//          type: DataTypes.TEXT, defaultValue: null,
//          get: function () { return JSON.parse(this.getDataValue('Last_Position')); },
//          set: function (value) { this.setDataValue('Last_Position', JSON.stringify(value)); }
//       },
//       Spawn_Point: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Inside: {
//          type: DataTypes.TEXT, defaultValue: null,
//          get: function () { return JSON.parse(this.getDataValue('Inside')); },
//          set: function (value) { this.setDataValue('Inside', JSON.stringify(value)); }
//       },

//       Muted: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Hours: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Minutes: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Mood: { type: DataTypes.STRING, defaultValue: 'normal' },
//       Walking_Style: { type: DataTypes.STRING, defaultValue: null },

//       Max_Houses: { type: DataTypes.INTEGER, defaultValue: frp.Settings.default.Max_Houses },
//       Max_Business: { type: DataTypes.INTEGER, defaultValue: frp.Settings.default.Max_Business },
//       Max_Vehicles: { type: DataTypes.INTEGER, defaultValue: frp.Settings.default.Max_Vehicles },

//       Frequency: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Licenses: {
//          type: DataTypes.TEXT, defaultValue: '[]',
//          get: function () { return JSON.parse(this.getDataValue('Licenses')); },
//          set: function (value) { this.setDataValue('Licenses', JSON.stringify(value)); }
//       },
//       Cuffed: { type: DataTypes.BOOLEAN, defaultValue: false },
//       Mask: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Masked: { type: DataTypes.BOOLEAN, defaultValue: false },
//       Rented_Vehicle: { 
//          type: DataTypes.VIRTUAL, defaultValue: null,
//          get () { return frp.GameObjects.TemporaryVehicles; },
//          set (x) { return frp.GameObjects.TemporaryVehicles; }
//       } 
//    }, {
//       // Options
//       timestamps: true,
//       underscrored: true,
//       createdAt: 'Register_Date',
//       updatedAt: 'Update_Date'
//    }
// );


// frp.Characters.prototype.Spawn = async function (player) {
//    let account = await player.Account();

//    try { 
//       await account.SetLogged(player, true, this.id);
//    } catch (e) { 
//       console.log(e);
//    }
//    player.character = this.id;
//    player.name = this.Name;
//    player.setVariable('spawned', true);

//    // Loading money & health
//    this.SetHealth(player, this.Health);
//    this.SetMoney(player, this.Money);

//    player.setVariable('Job', this.Job);

//    // Temporary Variables
//    player.setVariable('Duty', false);
//    player.setVariable('Job_Duty', false);
//    player.setVariable('Job_Vehicle', null);
//    player.setVariable('Working_Uniform', false);
//    player.setVariable('Admin_Duty', false);
//    player.setVariable('Attachment', null);
//    player.setVariable('Phone_Ringing', false);
//    player.setVariable('Freezed', false);
//    player.setVariable('Ragdoll', false);

//    // this.SetWalkingStyle(player, this.Walking_Style);
//    // this.SetMood(player, this.Mood);
//    // this.Cuff(player, this.Cuffed);


//    player.setVariable('Injuries', this.Injuries);
//    player.RespawnTimer = null;
//    player.setVariable('Wounded', this.Wounded);
//    if (this.Wounded) { 
//       // ciba na pod...
//    }
   
//    player.setVariable('Bubble', null);
//    player.data.Seatbelt = false;

//    await player.call('client:player.interface:toggle');
//    await player.Notification(frp.Globals.messages.WELCOME, frp.Globals.Notification.Info, 4);

//    // Applying appearance & clothing
//    const Appearance = await frp.Appearances.findOne({ where: { Character: this.id } });
//    if (Appearance) Appearance.Apply(player, this.Gender);

//    frp.Items.Equipment(player, this.Gender);
   
//    // spawning player on desired point
//    switch (this.Spawn_Point) {
//       case 0: {
//          player.position = frp.Settings.default.spawn;
//          player.heading = frp.Settings.default.heading;
//          player.dimension = frp.Settings.default.dimension;
//          break;
//       }
//       case 1: {
//          const Position = this.Last_Position;
//          if (this.Last_Position) 
//             player.position = new mp.Vector3(Position.x, Position.y, Position.z);
//             player.dimension = frp.Settings.default.dimension; // promeniti posle na last dimension
//          break;
//       }
//       case 2: {
//          break;
//       }
//    }
// };



// frp.Characters.prototype.Attachment = async function (player, model, bone, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
//    if (model) { 
//       const Offset = { X: x, Y: y, Z: z, rX: rx, rY: ry, rZ: rz };
//       player.setVariable('Attachment', { Model: model, Bone: bone, Offset: Offset });
//    } else { 
//       player.setVariable('Attachment', null);
//    }
// };


// frp.Characters.prototype.SetHealth = async function (player, value) {
//    this.Health = value;
//    player.health = this.Health;
//    await this.save();
// };


// frp.Characters.prototype.SetSpawn = async function (point) {
//    this.Spawn_Point = point;
//    await this.save();
// };


// frp.Characters.prototype.QuitGame = function (player) { 

// };


// frp.Characters.prototype.Injury = async function (Player, Injury) {

//    Injuries = Player.getVariable('Injuries');

//    const AlreadyExist = Injuries.find(Element => Element.Weapon == Injury.Weapon && Element.Bone == Injury.Bone);
//    if (AlreadyExist) { 
//       if (AlreadyExist.Times) { 
//          AlreadyExist.Times ++;
//       } else { 
//          AlreadyExist.Times = 2;
//       }
//    } else { 
//       Injuries.push(Injury);
//    }

//    if (Injuries.length > 0) { 
//       const LastInjury = Injuries[Injuries.length - 1];

//       switch (LastInjury.Bone) { 
//          case Enums.Player.Body_Bones.Torso: { 
//             this.SetWalkingStyle(Player, Enums.Player.Walking_Styles['DeadlyWound']);
//             break;
//          } 

//          case Enums.Player.Body_Bones.Leg: { 
//             this.SetWalkingStyle(Player, Enums.Player.Walking_Styles['MediumWound']);
//          }

//          default: {
//             this.SetWalkingStyle(Player, 'Wounded');
//          }
//       }
//    }

//    this.Injuries = Injuries;
//    Player.setVariable('Injuries', Injuries);

//    await this.save();
//    return true;
  
// };


// frp.Characters.prototype.Wound = function (Player, Toggle, Position = null) { 
//    console.log('Wounded ' + Player.name);
//    return new Promise (async (resolve) => { 
//       if (Toggle) { 
//          let Start = new Date();
   
//          Player.spawn(Player.position);
//          //Player.health = frp.Settings.default.Wound.health;
//          Player.RespawnTimer = setTimeout(() => { this.Wound(Player, false); }, frp.Settings.default.Wound.Respawn_Time)
   
//          Injuries = Player.getVariable('Injuries');
   
//          const Content = { Text: frp.Globals.messages.PERSON_IS_INJURED + Injuries.length + frp.Globals.messages.TIMES, Color: frp.Globals.Colors.Injured };
   
//          Player.setVariable('Wounded', Content);
//          Player.setVariable('Injuries', Injuries);
//          Player.setVariable('Ragdoll', { Time: frp.Settings.default.Wound.Respawn_Time });
         
//          this.Injuries = Injuries;
//          this.Wounded = true;   
      
//          resolve(true);
//       }  else { 
//          if (Player) { 
//             if (Player.RespawnTimer) clearTimeout(Player.RespawnTimer);
   
//             Player.setVariable('Injuries', []);
//             Player.spawn(Position ? Position : Player.position);     
//             Player.setVariable('Wounded', false);
//          }
   
//          this.Injuries = [];
//          this.Wounded = false;     
//          resolve(false);
//          // await this.save();
//       }
//    });  
// };


// frp.Characters.prototype.SetArmour = async function (player, value) {
//    this.Armour = value;
//    player.armour = this.Armour;
//    await this.save();
// };


// frp.Characters.prototype.GiveMoney = async function (player, value) {
//    let Money = await this.increment('Money', { by: value });
//    await player.setVariable('Money', this.Money + value);
// };


// frp.Characters.prototype.SetMoney = async function (player, value) {
//    this.Money = value;
//    player.setVariable('Money', value);
//    await this.save();
// };


// frp.Characters.prototype.SetMood = function (player, mood) { 
//    this.Mood = mood;
//    player.setVariable('Mood', mood);
// };


// frp.Characters.prototype.SetWalkingStyle = async function (Player, Style) {
//    this.Walking_Style = Style;
//    Player.setVariable('Walking_Style', Style);
//    await this.save();
// };


// frp.Characters.prototype.Cuff = function (player, toggle) { 
//    if (toggle) {
//       this.Cuffed = toggle;
//    } else { 
//       this.Cuffed = !this.Cuffed;
//    }
//    player.setVariable('Cuffed', this.Cuffed);
//    return this.Cuffed;
// };


// frp.Characters.prototype.UnRentVehicle = function (player) {
//    if (this.Rented_Vehicle && this.Rented_Vehicle.Timer) {
//       clearTimeout(this.Rented_Vehicle.Timer);
//       this.Rented_Vehicle.destroy();
//    }
// }


// frp.Characters.prototype.ExtendRent = function (player, minutes) {
//    if (this.Rented_Vehicle && this.Rented_Vehicle.Timer) {
//       clearTimeout(this.Rented_Vehicle.Timer);
//       this.Rented_Vehicle.Timer = setTimeout(() => {
//          frp.Characters.prototype.UnRentVehicle(player);
//       }, 60000 * minutes);
//    }
// }


// frp.Characters.prototype.RentVehicle = function (player, model, business, minutes = 30) {
//    if (frp.Main.IsAnyVehAtPos(business.Vehicle_Point)) {
//       const Vehicle = mp.vehicles.new(model, business.Vehicle_Point,
//       {
//             heading: 180,
//             numberPlate: 'RENT',
//             alpha: 255,
//             color: 0,
//             locked: true,
//             engine: false,
//             dimension: player.dimension
//       });
//       this.Rented_Vehicle = Vehicle;
//       this.Rented_Vehicle.Timer = setTimeout(() => {
//          frp.Characters.prototype.UnRentVehicle(player);
//       }, 60000 * minutes);
//    } else { player.notification('Mesto za isporuku vozila je trenutno zauzeto.', NOTIFY_ERROR, 4); }
// };



// frp.Characters.prototype.SetAdmin = async function (level) { 
//    this.Admin = level;
//    await this.save();
// };


// frp.Characters.prototype.Buy = async function (Player, Nearest, action) { 

//    if (action) { 


//    } else { 

//       switch (true) { 
//          case Nearest instanceof frp.Business: {
//             Nearest.Menu(Player);
//             break;
//          }
   
//          case Nearest instanceof frp.Houses: { 
//             Nearest.Buy(Player);
//             break;
//          }
   
//          default: console.log('nidje');
//       }
//    }

// };


// frp.Characters.prototype.SetJob = async function (player, value) {
//    this.Job = value;
//    player.setVariable('Job', value);
//    await this.save();
// };


// frp.Characters.prototype.GiveLicense = async function (license) {
//    let Licenses = this.Licenses;
//    Licenses.push(license);
//    this.Licenses = Licenses;
//    await this.save();
// };


// frp.Characters.prototype.RemoveLicense = async function (license) {
//    let Licenses = this.Licenses;
//    let x = Licenses.find(name => name === license);
//    let i = Licenses.indexOf(x);
//    Licenses.splice(i, 1);
//    this.Licenses = Licenses;
//    await this.save();
// };


// frp.Characters.prototype.HasLicense = function (i) { 
//    return this.Licenses.includes(name => name === i);
// };


// frp.Characters.prototype.Payment = async function (Amount) { 
//    this.increment('Salary', { by: Amount });
// };


// frp.Characters.prototype.Properties = async function () {
//    const Houses = await frp.Houses.findAll({ where: { Owner: this.id } });
//    const Businesses = await frp.Business.findAll({ where: { Owner: this.id } });
//    const Vehicles = await frp.Business.findAll({ where: { Entity: VehicleEntities.Player, Owner: this.id } });
//    return { Vehicles: Vehicles, Houses: Houses, Businesses: Businesses };
// };


// frp.Characters.prototype.Appearance = async function () { 
//    const appearance = await frp.Appearances.findOne({ where: { Character: this.id }});
//    return appearance ? appearance : null;
// };


// frp.Characters.prototype.Uniform = function (Player, Uniform) { 
//    if (Uniform) { 
//       for (const Component of Uniform) { 
//          Player.setClothes(Component.Index, Component.Drawable, 0, 2);
//          Player.setVariable('Working_Uniform', true);
//       }
//    } else { 
//       frp.Items.Equipment(Player, this.Gender);
//       Player.setVariable('Working_Uniform', false);
//    }
// };


// frp.Characters.afterCreate(async (Character, Options) => {
//    const Appearance = await frp.Appearances.findOne({ where: { Character: Character.id }});
//    if (Appearance) { 
//       Appearance.destroy();
//    }
// });


// frp.Characters.New = async function (player, Character) { 
//    // const Bank = await frp.Bank.New(player);

//    const Created = await frp.Characters.create({
//       Account: player.account, Name: Character.First_Name + ' ' + Character.Last_Name,
//       Birth: Character.Birth, Origin: Character.Origin, Gender: Character.Gender, 
//       Armour: 0, Health: 100
//    });

//    const Appearance = await frp.Appearances.create({
//       Character: Created.id, Blend_Data: Character.Blend, Overlays: Character.Overlays, 
//       Overlays_Colors: Character.Overlays_Colors, Hair: Character.Hair, Beard: Character.Beard, 
//       Eyes: Character.Eyes, Face_Features: Character.Face
//    });

//    player.character = Created.id;

//    Character.Clothing.forEach(async (Clothing) => { 
//       const [item, value] = Clothing;
//       const Cloth = await frp.Items.New(item, 1, ItemEntities.Player, Created.id, null, null, 0, 0, { Drawable: value, Texture: 0 });
//       Cloth.Equip(player);
//    })

//    if (Created) return Created;

// };


// mp.Player.prototype.Notification = function (message, type, time = 4) {
//    this.call('client:player.interface:notification', [message, type, time]);
// };


// mp.Player.prototype.Instructions = function (content, time) {
//    this.call('client:player.interface:instructions', [content, time]);
// };


// mp.Player.prototype.Character = async function () {
//    if (this.character) { 
//       const character = await frp.Characters.findOne({ where: { id: this.character } });
//       return character ? character : null;
//    }
// };


// mp.Player.prototype.Account = async function () {
//    const account = await frp.Accounts.findOne({ where: { id: this.account } });
//    return account ? account : null;
// };


// mp.Player.prototype.SendMessage = function (message, color) {
//    this.outputChatBox('!{' + color + '}' + message);
// };


// mp.Player.prototype.IsNear = function (target) {
//    return this.dist(target.position) < 3.0 ? true : false;
// };


// mp.Player.prototype.NearbyPlayers = function (radius) {
//    let near = [];
//    mp.players.forEachInRange(this.position, radius, (player) => {
//       near.push(player);
//    });
//    return near;
// };


// mp.Player.prototype.Nearest = async function () { 

//    const Businesses = await frp.Business.findAll();
//    for (const Business of Businesses) { 
//       const Position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
//       if (this.dist(Position) < 2.0) return Business;
//    }

//    const Houses = await frp.Houses.findAll();
//    for (const House of Houses) { 
//       const Position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
//       if (this.dist(Position) < 2.0) return House;
//    }

//    const Vehicles = await mp.vehicles.toArray();
//    for (const Vehicle of Vehicles) { 
//       if (this.dist(Vehicle.position) < 2.25) return Vehicle;
//    }

// };



// mp.Player.prototype.ProximityMessage = function (radius, message, colors) {
//    mp.players.forEachInRange(this.position, radius, (target) => {
//       const distanceGap = radius / 5;
//       const distance = target.dist(this.position)
//       let color = null;

//       switch (true) {
//          case (distance < distanceGap): color = colors[0]; break;
//          case (distance < distanceGap * 2): color = colors[1]; break;
//          case (distance < distanceGap * 3): color = colors[2]; break;
//          case (distance < distanceGap * 4): color = colors[3]; break;
//          default: color = colors[0]; break;
//       }
      
//       target.outputChatBox('!{' + color + '}' + message);
//    });
// };


// mp.Player.prototype.VehicleMessage = function (message, colors) {
//    const Radius = 8;
//    mp.players.forEachInRange(this.position, Radius, (target) => {
//       if (this.vehicle == target.vehicle) { 
//          const distanceGap = Radius / 5;
//          const distance = target.dist(this.position)
//          let color = null;
   
//          switch (true) {
//             case (distance < distanceGap): color = colors[0]; break;
//             case (distance < distanceGap * 2): color = colors[1]; break;
//             case (distance < distanceGap * 3): color = colors[2]; break;
//             case (distance < distanceGap * 4): color = colors[3]; break;
//             default: color = colors[0]; break;
//          }
         
//          target.outputChatBox('!{' + color + '}' + message);
//       }
//    });
// };


// mp.Player.prototype.message = function (color, message) {
//    this.outputChatBox(`!{${color}}${message}`);
// };


// mp.Player.prototype.Bubble = function (Content, Color) { 
//    Player.setVariable('Bubble', { Content: Content, Color: Color });
//    Player.BubbleExpire = setTimeout(() => {
//       if (Player) Player.setVariable('Bubble', null);
//    }, 4000);
// };

// mp.events.add({
//    'playerChat': async (Player, Content) => {
//       if (Player.data.logged && Player.data.spawned) {

//          if (Player.getVariable('Muted')) return;

//          const Character = await Player.Character();

//          const Name = Player.getVariable('Masked') ? Character.Stranger : Player.name;

//          if (Player.vehicle) { 

//             const vClass = await Player.callProc('client:player.vehicle:class');
//             if (vClass == 14 || vClass == 13 || vClass == 8) { 
//                Player.ProximityMessage(frp.Globals.distances.ic, Name + frp.Globals.messages.PERSON_SAYS + Content, frp.Globals.Colors.white);
//             } else { 

//                const Seat = Player.seat;
//                let Windows = Player.vehicle.getVariable('Windows');

//                if (Windows[Seat]) { 
//                   Player.ProximityMessage(frp.Globals.distances.vehicle, Name + frp.Globals.messages.PERSON_SAYS + Content, frp.Globals.Colors.white);

//                } else { 
//                   Player.VehicleMessage(Name + frp.Globals.messages.PERSON_SAYS_IN_VEHICLE + Content, frp.Globals.Colors.vehicle);
//                }
//             }

//          } else { 
//             Player.ProximityMessage(frp.Globals.distances.ic, Name + frp.Globals.messages.PERSON_SAYS + Content, frp.Globals.Colors.white);
//          }

//       }
//    }
// });


// mp.players.find = (playerName) => {
//    let foundPlayer = null;
//    if (playerName == parseInt(playerName)) {
//       foundPlayer = mp.players.at(playerName);
//    }
//    if (!foundPlayer) {
//       mp.players.forEach((target) => {
//          if (target.name === playerName) {
//             foundPlayer = target;
//          }
//          else if (target.name.includes(playerName)) {
//             foundPlayer = target;
//          }
//       });
//    }
//    return foundPlayer;
// };



// (async () => {
//    frp.Characters.sync({ force: true });

//    // await frp.Characters.create({ Name: 'Zachary Parker', Account: 1 });
//    // await frp.Characters.create({ Name: 'Tester 1', Account: 2 });
//    // await frp.Characters.create({ Name: 'Tester Dva', Account: 3 });
//    // await frp.Characters.create({ Name: 'Tester Tri', Account: 4 });
//    // await frp.Characters.create({ Name: 'Tester Cetri', Account: 5 });
//    // await frp.Characters.create({ Name: 'Tester Pet', Account: 6 });
//    // await frp.Characters.create({ Name: 'Tester Sest', Account: 7 });
//    // await frp.Characters.create({ Name: 'Tester Sedam', Account: 8 });
//    // await frp.Characters.create({ Name: 'Tester Osam', Account: 9 });
//    // await frp.Characters.create({ Name: 'Tester Devet', Account: 10 });
//    // await frp.Characters.create({ Name: 'Tester Deset', Account: 11 });

// })();


