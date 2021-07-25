"use strict";
// let Terminal = require('../modules/jobs/Jetsam');
// let Transit = require('../modules/jobs/Transit');
// let Miner = require('../modules/jobs/Miner');
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const Colors_1 = require("../Global/Colors");
const Globals_1 = require("../Global/Globals");
const Messages_1 = require("../Global/Messages");
const Settings_1 = require("../Server/Settings");
require('../modules/jobs/Sanitation');
require('../modules/jobs/Food');
require('../modules/jobs/Taxi');
const List = {
    1: {
        id: 1, name: 'Jetsam Terminal', description: 'Forklift Driver',
        point: new mp.Vector3(816.988, -2977.546, 6.020), blip: 569, sprite: 78,
    },
    2: {
        id: 2, name: 'Los Santos Mine', description: 'Miner',
        point: new mp.Vector3(2706.490, 2777.513, 37.878), blip: 527, sprite: 44,
    },
    3: {
        id: 3, name: 'Los Santos Transit', description: 'Bus Driver',
        point: new mp.Vector3(435.0450, -646.1735, 28.7349), blip: 513, sprite: 66,
    },
    4: {
        id: 4, name: 'Deptartment of Sanitation', description: 'Garbage man.',
        point: new mp.Vector3(-321.5518, -1545.599, 31.020), blip: 318, sprite: 52,
    },
    5: {
        id: 5, name: 'Department of Power & Water', description: 'Electrician / Plumber',
        point: new mp.Vector3(678.4655, 73.924, 83.1535), blip: 398, sprite: 3
    },
    6: {
        id: 6, name: 'The 69th Street Diner', description: 'Food Delivery',
        point: new mp.Vector3(146.37088, -1522.3398, 29.1416), blip: 103, sprite: 60
    },
    7: {
        id: 7, name: 'Downtown Cab Co.', description: 'Taxi Driver',
        point: new mp.Vector3(895.3234, -179.3222, 74.700), blip: 198, sprite: 81
    }
};
mp.events.add({
    'server:job:accept': async (player, i) => {
        const Job = Jobs.Job[i];
        Job.Take(player);
    }
});
class Jobs {
    constructor(Id, JobName, Descr, Pos, Blip) {
        this.ID = Id;
        this.Name = JobName;
        this.Description = Descr;
        this.Position = Pos;
        this.Blip = mp.blips.new(Blip[0], this.Position, { name: this.Name, color: Blip[1], shortRange: true, scale: 0.8 });
        this.Colshape = mp.colshapes.newRectangle(this.Position.x, this.Position.y, 2.0, 2.0, 0),
            this.Marker = mp.markers.new(1, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.5, {
                color: Colors_1.MarkerColors.Job,
                rotation: new mp.Vector3(0, 0, 90),
                visible: true,
                dimension: Settings_1.Settings.Default.dimension
            });
        this.Colshape.OnPlayerEnter = async (player) => {
            const Character = await player.Character();
            if (Character.Job != Globals_1.Globals.Jobs.Unemployed)
                return;
            player.Notification(this.Name + ', ' + this.Description + '.<br>' + '/takejob', Globals_1.Globals.Notification.Info, 5);
        };
        Jobs.Job[this.ID] = this;
    }
    static Init() {
        for (const i in List) {
            const Job = List[i];
            new Jobs(Job.id, Job.name, Job.description, Job.point, [Job.blip, Job.sprite]);
        }
    }
    static Nearest(Player) {
        for (const i in Jobs.Job) {
            const Job = Jobs.Job[i];
            if (Player.dist(Job.Position) < 3)
                return Job;
        }
    }
    async Take(Player) {
        const Character = await Player.Character();
        Player.Notification(Messages_1.Messages.SUCCESFULLY_JOB + this.Description, Globals_1.Globals.Notification.Succes, 5);
        Character.SetJob(Player, this.ID);
    }
    async Quit(Player) {
        const Character = await Player.Character();
        if (Character.Job == Globals_1.Globals.Jobs.Unemployed)
            return Player.Notification(Messages_1.Messages.UNEMPLOYED, Globals_1.Globals.Notification.Error, 5);
    }
}
exports.Jobs = Jobs;
Jobs.Job = [];
;
(async () => {
    Jobs.Init();
})();
