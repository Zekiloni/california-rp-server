'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Globals_1 = require("../Global/Globals");
const Messages_1 = require("../Global/Messages");
const Account_model_1 = __importDefault(require("../Models/Account.model"));
const Ban_1 = __importDefault(require("../Models/Ban"));
const Character_1 = __importDefault(require("../Models/Character"));
const Appearance_1 = __importDefault(require("../Models/Appearance"));
const Settings_1 = require("../Server/Settings");
mp.events.add({
    'playerJoin': async (Player) => {
        const Banned = await Ban_1.default.Check(Player);
        if (Banned)
            Player.kick('Bannedovan');
    },
    'SERVER::CHARACTER:PLAY': async (Player, CHARACTER_ID) => {
        console.log('Selected character is ' + CHARACTER_ID);
        const Selected = await Character_1.default.findOne({ where: { id: CHARACTER_ID } });
        console.log(Selected);
        Selected?.Spawn(Player);
    }
});
mp.events.addProc({
    'SERVER::PLAYER:LOBY': (Player) => {
        Player.dimension = Player.id;
        return Settings_1.Settings.Lobby;
    },
    'SERVER::CREATOR:INFO': (Player) => {
        return Settings_1.Settings.Creator;
    },
    'SERVER::AUTHORIZATION:VERIFY': async (Player, Username, Password) => {
        return new Promise((resolve) => {
            Account_model_1.default.findOne({ where: { Username: Username }, include: [Character_1.default] }).then((Account) => {
                if (Account) {
                    const Logged = Account.Login(Password);
                    if (Logged) {
                        Account.Logged(Player, true);
                        console.log(Account.Characters);
                        resolve({ Account: Account, Characters: Account.Characters });
                    }
                    else {
                        Player.Notification(Messages_1.Messages.INCCORRECT_PASSWORD, Globals_1.Globals.Notification.Error, 5);
                    }
                }
                else {
                    Player.Notification(Messages_1.Messages.USER_DOESNT_EXIST, Globals_1.Globals.Notification.Error, 5);
                }
            });
        });
    },
    'SERVER::CREATOR:FINISH': async (Player, Char_Info, Char_Appearance) => {
        console.log('Usao');
        const Character = JSON.parse(Char_Info);
        const Appearance = JSON.parse(Char_Appearance);
        const Exist = await Character_1.default.findOne({ where: { Name: Character.First_Name + ' ' + Character.Last_Name } });
        if (Exist)
            return Player.Notification(Messages_1.Messages.CHARACTER_ALREADY_EXIST, Globals_1.Globals.Notification.Error, 5);
        Character_1.default.create({
            Name: Character.First_Name + ' ' + Character.Last_Name, Account_id: Player.Account.id,
            Origin: Character.Origin, Birth: Character.Birth, Gender: Character.Gender
        });
        // <3
        Appearance_1.default.create({
            Face: Appearance.Face, Blend_Data: Appearance.Blend_Data, Overlays: Appearance.Overlays,
            Overlays_Toggle: Appearance.Overlays_Toggle, Hair: Appearance.Hair, Beard: Appearance.Beard,
            Eyes: Appearance.Eyes
        });
        Player.Notification(Messages_1.Messages.CHARACTER_CREATED, Globals_1.Globals.Notification.Succes, 4);
    },
    'server:player.character:delete': async (Player, Char_ID) => {
        Character_1.default.findOne({ where: { id: Char_ID } }).then((Character) => {
            return Character?.destroy();
        });
    }
});