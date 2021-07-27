"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Globals_1 = require("../Global/Globals");
const Messages_1 = require("../Global/Messages");
const Settings_1 = require("../Server/Settings");
const Account_1 = __importDefault(require("./Account"));
let Characters = class Characters extends sequelize_typescript_1.Model {
    async Spawn(Player) {
        try {
            console.log('Spawn', 0.5);
            Player.Account.Last_Character = this.id;
            console.log('Spawn', 0);
            Player.Character = this;
            Player.name = this.Name;
            Player.setVariable('Spawned', true);
            // Loading money & health
            this.SetHealth(Player, this.Health);
            this.SetMoney(Player, this.Money);
            Player.setVariable('Job', this.Job);
            console.log('Spawn', 1);
            // Temporary Variables
            Player.setVariable('Duty', false);
            Player.setVariable('Job_Duty', false);
            Player.setVariable('Job_Vehicle', null);
            Player.setVariable('Working_Uniform', false);
            Player.setVariable('Admin_Duty', false);
            Player.setVariable('Attachment', null);
            Player.setVariable('Phone_Ringing', false);
            Player.setVariable('Freezed', false);
            Player.setVariable('Ragdoll', false);
            console.log('Spawn', 2);
            // this.SetWalkingStyle(player, this.Walking_Style);
            // this.SetMood(player, this.Mood);
            // this.Cuff(player, this.Cuffed);
            Player.setVariable('Injuries', this.Injuries);
            Player.RespawnTimer = null;
            Player.setVariable('Wounded', this.Wounded);
            if (this.Wounded) {
                // ciba na pod...
            }
            Player.setVariable('Bubble', null);
            Player.setVariable('Seatbelt', false);
            Player.Notification(Messages_1.Messages.WELCOME, Globals_1.Globals.Notification.Info, 4);
            // Applying appearance & clothing
            // const Appearance = await Appearances.findOne({ where: { Character: this.id } });
            // if (Appearance) Appearance.Apply(Player, this.Gender);
            // frp.Items.Equipment(Player, this.Gender);
            console.log('Spawn', 3);
            // spawning player on desired point
            switch (this.Spawn_Point) {
                case 0: {
                    console.log('Spawn', 4);
                    Player.position = Settings_1.Settings.Default.spawn;
                    Player.heading = Settings_1.Settings.Default.heading;
                    Player.dimension = Settings_1.Settings.Default.dimension;
                    break;
                }
                case 1: {
                    Player.position = this.Last_Position;
                    Player.dimension = Settings_1.Settings.Default.dimension;
                    break;
                }
                case 2: {
                    break;
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    SetHealth(Player, value) {
        Player.health = value;
        this.Health = value;
    }
    SetMoney(Player, value) {
        Player.setVariable('Money', value);
        this.Money = value;
    }
    async GiveMoney(Player, value) {
        let Money = await this.increment('Money', { by: value });
        if (Money) {
            Player.setVariable('Money', this.Money + value);
        }
    }
    ;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Account_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Account_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Account_1.default),
    __metadata("design:type", Account_1.default)
], Characters.prototype, "Account", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Length({ min: 6, max: 48 }),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Characters.prototype, "Name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Gender", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Characters.prototype, "Birth", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Characters.prototype, "Origin", void 0);
__decorate([
    sequelize_typescript_1.Default(Settings_1.Settings.Default.Money),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Money", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Salary", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Bank", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Paycheck", void 0);
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.Default(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Stranger_ID", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Faction", void 0);
__decorate([
    sequelize_typescript_1.Default('none'),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Characters.prototype, "Faction_Rank", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Faction_Permissions", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Job", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Working_Hours", void 0);
__decorate([
    sequelize_typescript_1.Default(100),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Health", void 0);
__decorate([
    sequelize_typescript_1.Default(100),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Hunger", void 0);
__decorate([
    sequelize_typescript_1.Default(100),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Thirst", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Characters.prototype, "Wounded", void 0);
__decorate([
    sequelize_typescript_1.Default('[]'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Array)
], Characters.prototype, "Injuries", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Characters.prototype, "Last_Position", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Spawn_Point", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Object)
], Characters.prototype, "Inside", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Muted", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Hours", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Minutes", void 0);
__decorate([
    sequelize_typescript_1.Default('normal'),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Characters.prototype, "Walking_Style", void 0);
__decorate([
    sequelize_typescript_1.Default('normal'),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Characters.prototype, "Facial_Mood", void 0);
__decorate([
    sequelize_typescript_1.Default(Settings_1.Settings.Limitations.Max_Houses),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Max_Houses", void 0);
__decorate([
    sequelize_typescript_1.Default(Settings_1.Settings.Limitations.Max_Business),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Max_Business", void 0);
__decorate([
    sequelize_typescript_1.Default(Settings_1.Settings.Limitations.Max_Vehicles),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Characters.prototype, "Max_Vehicles", void 0);
__decorate([
    sequelize_typescript_1.Default([]),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Array)
], Characters.prototype, "Licenses", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Characters.prototype, "Cuffed", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Characters.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Characters.prototype, "Updated_At", void 0);
Characters = __decorate([
    sequelize_typescript_1.Table
], Characters);
exports.default = Characters;
// const { ItemEntities } = require('../classes/Items.Registry');
// const { VehicleEntities } = require('./Vehicle');
// let Appearance = require('./Appearance');
// const Enums = require('../data/Enums');
// frp.Characters.prototype.Spawn = async function (player) {
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
