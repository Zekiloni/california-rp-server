'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Messages_1 = require("../Globals/Messages");
const Account_1 = __importDefault(require("../Models/Account"));
const Ban_1 = __importDefault(require("../Models/Ban"));
const Character_1 = __importDefault(require("../Models/Character"));
const Character_2 = __importDefault(require("../Models/Character"));
mp.events.add({
    'playerJoin': async (Player) => {
        const Banned = await Ban_1.default.Check(Player);
        if (Banned)
            Player.kick('Bannedovan');
    },
    'playerReady': (Player) => {
        Player.dimension = Player.id + 1;
    },
    'server:player.character:select': async (Player, CHARACTER_ID) => {
        const Selected = await Character_2.default.findOne({ where: { id: CHARACTER_ID } });
        Selected?.Spawn(Player);
    }
});
mp.events.addProc({
    'SERVER::AUTHORIZATION:VERIFY': async (Player, Username, Password) => {
        console.log('Verify');
        return new Promise((resolve, reject) => {
            Account_1.default.findOne({ where: { Username: Username } }).then((Account) => {
                if (Account) {
                    const Logged = Account.Login(Password);
                    if (Logged) {
                        console.log('logged');
                        Character_1.default.findAll({ where: { Account: Account.id } }).then((Characters) => {
                            Player.ACCOUNT_ID = Account.id;
                            resolve();
                            // resolve({ Account: Account, Characters: Characters });
                        });
                    }
                    else {
                        reject(Messages_1.Messages.INCCORRECT_PASSWORD);
                    }
                }
                else {
                    reject(Messages_1.Messages.USER_DOESNT_EXIST);
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
