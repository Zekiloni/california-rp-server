'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Globals_1 = require("../Global/Globals");
const Messages_1 = require("../Global/Messages");
const Account_1 = __importDefault(require("../Models/Account"));
const Ban_1 = __importDefault(require("../Models/Ban"));
const Character_1 = __importDefault(require("../Models/Character"));
const Settings_1 = require("../Server/Settings");
mp.events.add({
    'playerJoin': async (Player) => {
        const Banned = await Ban_1.default.Check(Player);
        if (Banned)
            Player.kick('Bannedovan');
    },
    'SERVER::CHARACTER:PLAY': async (Player, CHARACTER_ID) => {
        const Selected = await Character_1.default.findOne({ where: { id: CHARACTER_ID } });
        Selected?.Spawn(Player);
    }
});
mp.events.addProc({
    'SERVER::PLAYER:LOBY': (Player) => {
        Player.dimension = Player.id;
        return Settings_1.Settings.Lobby;
    },
    'SERVER::AUTHORIZATION:VERIFY': async (Player, Username, Password) => {
        return new Promise((resolve) => {
            Account_1.default.findOne({ where: { Username: Username } }).then((Account) => {
                if (Account) {
                    const Logged = Account.Login(Password);
                    if (Logged) {
                        Character_1.default.findAll({ where: { Account: Account.id } }).then((Characters) => {
                            Account.Logged(Player, true);
                            console.log(Characters);
                            resolve({ Account: Account, Characters: Characters });
                        });
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
    'server:player.character:delete': async (Player, Char_ID) => {
        Character_1.default.findOne({ where: { id: Char_ID } }).then((Character) => {
            return Character?.destroy();
        });
    }
});
