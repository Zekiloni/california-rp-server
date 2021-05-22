module.exports = class Main {
    static Terminal(status, msg) {
        const colors = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[37m'];
        let time = this.DateTime();
        switch (status) {
            case 1: {
                return console.error(`${colors[0]}[ERROR - ${time}]${colors[3]} ${msg}`);
            }
            case 2: {
                return console.log(`${colors[1]}[INFO - ${time}]${colors[3]} ${msg}`);
            }
            case 3: {
                return console.log(`${colors[2]}[SUCCESS - ${time}]${colors[3]} ${msg}`);
            }
            case 4: {
                return console.log(`${colors[1]}[WARNING - ${time}]${colors[3]} ${msg}`);
            }
        }
    }
    static Logger(type, message, account = 0, character = 0, participant = 0) {
        frp.Logs.create({ Type: Types[type], Account: account, Character: character, Participant: participant, Message: message });
    }
    static HexToDecimal(hex) {
        return parseInt(hex.replace('#', ''), 16);
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
    static GenerateNumber(n) {
        let add = 1, max = 12 - add;
        if (n > max) {
            return GenerateNumber(max) + GenerateNumber(n - max);
        }
        max = Math.pow(10, n + add);
        let min = max / 10;
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        return ("" + number).substring(add);
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
};
