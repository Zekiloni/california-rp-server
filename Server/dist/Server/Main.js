"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.LogType = void 0;
const Globals_1 = require("../Global/Globals");
const Settings_1 = require("./Settings");
var LogType;
(function (LogType) {
    LogType[LogType["Error"] = 0] = "Error";
    LogType[LogType["Succes"] = 1] = "Succes";
    LogType[LogType["Info"] = 2] = "Info";
})(LogType = exports.LogType || (exports.LogType = {}));
class Main {
    static Terminal(Status, Message) {
        const Colors = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[37m'];
        console.log(Colors[Status] + this.DateTime() + Colors[0] + ' | ' + Message);
    }
    static Size(object) {
        let size = 0;
        for (let key in object) {
            if (object.hasOwnProperty(key))
                size++;
        }
        return size;
    }
    ;
    static HexToDecimal(Hex) {
        return parseInt(Hex.replace('#', ''), 16);
    }
    static RandomRGB() {
        return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
    }
    static DateTime() {
        let now = new Date(), time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()].join('-');
        return date + ' ' + time;
    }
    static Between(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    static ValidateIP(ip) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) ? true : false;
    }
    static CountDigits(n) {
        let count = 0;
        if (n >= 1)
            ++count;
        while (n / 10 >= 1) {
            n /= 10;
            ++count;
        }
        return count;
    }
    static IsAnyVehAtPos(position, radius = 2) {
        let Vehicles = [];
        mp.vehicles.forEachInRange(position, radius, (Vehicle) => {
            if (Vehicle)
                Vehicles.push(Vehicle);
        });
        return Vehicles;
    }
    static GenerateString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = ' ';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    static Dollars(i) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(i);
    }
    static Sleep(Seconds) {
        return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
    }
    static InfoColshape(Position, Name, Info, Radius, Color, Dimension = Settings_1.Settings.Default.dimension, Blip = false, Sprite = 4) {
        const Colshape = mp.colshapes.newRectangle(Position.x, Position.y, Radius, 2.0, 0);
        if (Info)
            Colshape.OnPlayerEnter = (Player) => { Player.Notification(Info, Globals_1.Globals.Notification.Info, 5); };
        mp.markers.new(27, new mp.Vector3(Position.x, Position.y, Position.z - 0.985), Radius, {
            color: Color, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: Dimension
        });
        mp.labels.new(Name, Position, { los: true, font: 0, drawDistance: Radius, dimension: Dimension });
        if (Blip)
            mp.blips.new(Blip, new mp.Vector3(Position.x, Position.y, 0), { shortRange: true, scale: 0.85, name: Name, dimension: Dimension });
    }
}
exports.Main = Main;
;
