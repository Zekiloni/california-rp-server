import { Colors } from "../../Global/Colors";
import { EntityData } from "../../Global/EntityData";
import { Globals } from "../../Global/Globals";
import { KickEx } from "../../Global/Utils";
import Accounts from "../../models/account.model";
import Characters from "../../models/character.model";
import { Admin, Administrators } from "../../Player/Admin";
import { Commands } from "../commands";
import { Main } from "../Main";

const fs = require("fs");
const savedPosition = 'saved_position.txt';


// Commands["adminhelp"] = {
//    Desc: 'Admin pomoc',
//    Admin: 1,
//    Call: (Player: PlayerMp, Args: string[]) => {
//       let AllowedCommands = [];
//       for (const i in Commands) {
//          const Command = Commands[i];
//          if (Command) {
//             if (Command.Admin > 0 && Command.Admin <= Player.Account.Administrator) {
//                AllowedCommands.push(Command);
//             }
//          }

//       }
//    }
// };

Commands["createaccount"] = {
   Desc: 'Kreiranje korisničkog računa',
   Admin: 5,
   Params: ['ime', 'e-mail', 'šifra'],
   Call: (Player: PlayerMp, Args: string[]) => {
      try {
         const [Username, Email, Password] = Args;
         Accounts.create({ UserName: Username, Email: Email, Password: Password });
         Admin.AdminActionNotify(Player, 'je napravio novi nalog. UserName: ' + Username);
      } catch (Ex) {
         Main.Terminal(1, JSON.stringify(Ex));
      }

   }
};

Commands["coord"] = {
   Desc: 'Teleportovanje do komandi',
   Admin: 3,
   Params: ['x', 'y', 'z'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const [x, y, z] = Args;
      Player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
      Admin.AdminActionNotify(Player, `se teleportovao na koordinate. ${x} ${y} ${z}`);
   }
};

Commands["a"] = {
   Desc: 'Admin čet',
   Admin: 1,
   Params: ['poruka'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const Message = Args[0].toLowerCase();
      Admin.Chat(Player, Message);
   }
};

Commands["ao"] = {
   Desc: 'Globalno server obaveštenje',
   Admin: 3,
   Params: ['poruka'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const Message = Args[0];
      Admin.Broadcast(Player, Message);
   }
};

Commands["tpm"] = {
   Desc: 'Teleport do waypointa sa mape',
   Admin: 3,
   Call: (Player: PlayerMp, Args: string[]) => {
      Player.callProc('CLIENT::ADMINI:TP:WAYPOINT').then(Waypoint => {
         Player.position = new mp.Vector3(Waypoint.x, Waypoint.y, Waypoint.z);
         Admin.AdminActionNotify(Player, `se teleportovao na waypoint. ${Waypoint.x} ${Waypoint.y} ${Waypoint.z}`);
      }).catch(() => {
         Player.Notification('Nema markera', NotifyType.ERROR, 4);
      });
   }
};

Commands["slap"] = {
   Desc: 'Upozorenje/skretanje pažnje igraču na određenu stvar',
   Admin: 2,
   Params: ['igrač', 'razlog'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const [Target, Reason] = Args;
      const TargetPlayer = mp.players.find(Target);
      if (Target) {
         TargetPlayer.position = new mp.Vector3(TargetPlayer.position.x, TargetPlayer.position.y, TargetPlayer.position.z + 2);
         Admin.AdminActionNotify(Player, `je ošamario igrača ${TargetPlayer.name}. Razlog: ${Reason}.`);
         TargetPlayer.SendMessage('[OOC] Admin vas je ošamario. Razlog: ' + Reason, Colors.info);
      }
   }
};

Commands["ar"] = {
   Desc: 'Prihvatite report sa liste',
   Admin: 2,
   Params: ['broj'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const ReportNumber = Args[0];
   }
};

Commands["spec"] = {
   Desc: 'Specanje igrača',
   Admin: 2,
   Params: ['igrač'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const Target = parseInt(Args[0]);
      const TargetPlayer = mp.players.at(Target);

      if (Target && TargetPlayer) {
         // DODATI SPEC EVENT
         //TargetPlayer.call('SPEC_EVENT', [TargetPlayer]);
      }
   }
};


Commands["rtc"] = {
   Desc: 'Specanje igrača',
   Admin: 2,
   Params: ['id vozila'],
   Call: (Player: PlayerMp, Args: string[]) => {
      if (Player.vehicle) {
         // provera da li je vlasničko vozilo 
      } else {
         const Target = parseInt(Args[0]);
         const TargetVehicle = mp.vehicles.at(Target);

         if (Target && TargetVehicle) {
            // const SpawnData = {
            //    X: 1,
            //    Y: 1,
            //    Z: 1,
            //    Heading: 30
            // };
            // Napraviti da kada se spawna vozilo seta mu se spawn data
            const SpawnData = TargetVehicle.data.VEHICLE_SPAWN_DATA;
            TargetVehicle.destroy();
            TargetVehicle.spawn(new mp.Vector3(SpawnData.X, SpawnData.Y, SpawnData.Z), SpawnData.Heading);
            Admin.AdminActionNotify(Player, `je respawnovao vozilo ID: ` + TargetVehicle.id);
         }
      }

   }
};

Commands["save"] = {
   Admin: 7,
   Desc: 'Sačuvajte trenutnu poziciju',
   Params: ['ime'],
   Call: (Player: PlayerMp, Args: string[]) => {
      let Name = Args.slice(0).join(' '), Pos = (Player.vehicle) ? Player.vehicle.position : Player.position;
      const rot = Player.vehicle ? Player.vehicle.rotation : new mp.Vector3(0, 0, Player.heading);
      fs.appendFile(savedPosition, `Position: ${Pos.x}, ${Pos.y}, ${Pos.z} | ${(Player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot.z}`} | ${(Player.vehicle) ? "InCar" : "OnFoot"} - ${name}\r\n`, (err: any) => {
         if (err) {
            Main.Terminal(3, 'Greska u cuvanju pozicije. Igrac: ' + Player.name + ' Pozicija: ' + Pos)
         }
         else {
            Player.SendMessage(`Trenutna pozicija: ${Name} { X: ${Player.position.x}, Y: ${Player.position.y}, Z: ${Player.position.z} }.`, Colors.info);
         }
      });
   }
};

Commands["kick"] = {
   Admin: 2,
   Desc: 'Izbacite igrača sa servera.',
   Params: ['igrač', 'razlog'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]);
      const Reason = Args[1];

      if (TargetPlayer) {
         TargetPlayer.SendMessage('[OOC] Admin vas je ošamario. Razlog: ' + Reason, Colors.info);
         Admin.AdminActionNotify(Player, `je kikovao igrača ${TargetPlayer.name}. Razlog: ${Reason}.`);
         KickEx(Player, Reason);
      }
   }
};

Commands["settime"] = {
   Admin: 7,
   Desc: 'Podesite sat na serveru.',
   Params: ['sat', 'minut', 'sekund'],
   Call: (Player: PlayerMp, Args: string[]) => {
      const Hr = parseInt(Args[0]), Min = parseInt(Args[1]), Sec = parseInt(Args[2]);
      if (Min && Hr && Sec)
         mp.world.time.set(Hr, Min, Sec);
      else { Player.notify('Wrong time format. HR/MIN/SEC') }
   }
};

Commands["weather"] = {
   Admin: 2,
   Desc: 'Podesite vreme na serveru',
   Params: ['broj/ime vremena'],
   Call: (Player, Args: string[]) => {
      const Weathers = ['EXTRASUNNY', 'CLEAR', 'CLOUDS', 'SMOG', 'FOGGY', 'OVERCAST', 'RAIN', 'THUNDER', 'CLEARING', 'NEUTRAL', 'SNOW', 'BLIZZARD', 'SNOWLIGHT', 'XMAS', 'HALLOWEEN'];
      const InputNumber = parseInt(Args[0]);

      if (InputNumber && InputNumber! > Weathers.length) {
         mp.world.weather = Weathers[InputNumber];
      } else {
         mp.world.weather = Args[0];
      }
   }
};

Commands["sethp"] = {
   Admin: 3,
   Desc: '',
   Params: ['igrač', 'hp'],
   Call: async (Player, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Health = parseInt(Args[1]);
      if (TargetPlayer && Health) {
         // Helth varijabla i setanje helti
         Admin.AdminActionNotify(Player, `je namestio helte igraču ${TargetPlayer.name} na ${Health}.`);
      }
   }
};

Commands["setarmor"] = {
   Admin: 3,
   Desc: '',
   Params: ['igrač', 'armor'],
   Call: async (Player, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Health = parseInt(Args[1]);
      if (TargetPlayer && Health) {
         // Helth varijabla i setanje helti
         Admin.AdminActionNotify(Player, `je namestio armor igraču ${TargetPlayer.name} na ${Health}.`);
      }
   }
};

Commands["setvw"] = {
   Admin: 5,
   Desc: '',
   Params: ['igrač', 'dimenzija'],
   Call: async (Player, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Dimension = parseInt(Args[1]);
      if (TargetPlayer && Dimension) {
         TargetPlayer.dimension = Dimension;
         Admin.AdminActionNotify(Player, `je namestio dimenziju igraču ${TargetPlayer.name} na ${Dimension}.`);
      }
   }
};

Commands["setskin"] = {
   Admin: 6,
   Desc: '',
   Params: ['igrač', 'model'],
   Call: async (Player, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), PedModel = mp.joaat(Args[1]);
      if (TargetPlayer && PedModel) {
         TargetPlayer.model = PedModel;
         Admin.AdminActionNotify(Player, `je promenio skin igraču ${TargetPlayer.name} na ${Args[1]}.`);
      }
   }
};

Commands["setmoney"] = {
   Admin: 7,
   Params: ['igrac', 'vrednost'],
   Desc: 'Postavite novac u džepu igraču na određenu vrednost',
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Value = parseInt(Args[1]);

      if (TargetPlayer && Value) {
         const Character = await Characters.findOne({ where: { id: Player.Character.id } });
         if (Character) {
            Character.Money = Value;
            Character.save();
            TargetPlayer.SendMessage('[OOC] Admin Vam je postavio novac u džepu na ' + Value, Colors.tomato);
            Admin.AdminActionNotify(Player, `je postavio novac u džepu igraču ${TargetPlayer.name} na ${Value}$.`);
         }
      }
   }
};

Commands["givemoney"] = {
   Admin: 7,
   Desc: 'Dodajte novac igraču u džep',
   Params: ['igrac', 'vrednost'],
   Call: async (Player, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Value = parseInt(Args[1]);

      if (TargetPlayer && Value) {
         Player.Character.GiveMoney(Player, Value);
         TargetPlayer.SendMessage('[OOC] Admin Vam je dao novac.' + Value + '$', Colors.tomato);
      }
   }
};




Commands["happyhours"] = {
   Desc: 'Aktiviranje / deaktiviranje duplog XP-a',
   Admin: 6,
   Call: async (Player, Args: string[]) => {
      // HappyHours
      mp.players.broadcast('Srećni sati su uključeni.');
   }
};

Commands["ban"] = {
   Desc: 'Banovanje korisničkog naloga.',
   Admin: 5,
   Params: ['Celo ime jednog od karaktera', 'vreme(dani)', 'razlog'],
   Call: async (Player, Args: string[]) => {

   }
};

Commands["unban"] = {
   Desc: 'Ukidanje bana korisničkog naloga.',
   Admin: 5,
   Params: ['Celo ime jednog od karaktera', 'razlog'],
   Call: async (Player, Args: string[]) => {

   }
};

Commands["acclock"] = {
   Desc: 'Zaključavanje korisničkog naloga.',
   Admin: 5,
   Params: ['Celo ime jednog od karaktera', 'razlog'],
   Call: async (Player, Args: string[]) => {

   }
};

Commands["accunlock"] = {
   Desc: 'Zaključavanje korisničkog naloga.',
   Admin: 5,
   Params: ['Celo ime jednog od karaktera', 'razlog'],
   Call: async (Player, _: string[]) => {

   }
};

Commands["warn"] = {
   Desc: 'Upozoravanje igrača i dodavanje warning poena.',
   Admin: 3,
   Params: ['Celo ime jednog od karaktera', 'razlog'],
   Call: async (Player, _: string[]) => {

   }
};

Commands["fly"] = {
   Desc: 'Uključi/isključi admin letenje',
   Admin: 5,
   Call: async (Player, _: string[]) => {
      Player.call('CLIENT::ADMIN:FLY');
   }
};

Commands["goto"] = {
   Desc: 'Teleport do igraca.',
   Admin: 2,
   Params: ['igrač'],
   Call: (Player, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]);
      if (TargetPlayer && TargetPlayer.id != Player.id) {
         if (Player.vehicle) {
            const Seat = Player.seat, Vehicle = Player.vehicle;
            Vehicle.position = new mp.Vector3(TargetPlayer.position.x + 2, TargetPlayer.position.y, TargetPlayer.position.z);
            Vehicle.dimension = TargetPlayer.dimension;
            Player.putIntoVehicle(Vehicle, Seat);
         } else {
            Player.position = TargetPlayer.position;
            Player.dimension = TargetPlayer.dimension;
         }
         TargetPlayer.SendMessage('Admin ' + Player.name + ' se teleportovao do vas !', Colors.tomato);
         Player.SendMessage('Teleportovali ste se do ' + TargetPlayer.name + ' !', Colors.tomato);
      }
   }
};

Commands["gethere"] = {
   Desc: 'Uključi/isključi admin letenje',
   Admin: 3,
   Params: ['igrač'],
   Call: async (Player, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]);
      if (TargetPlayer) {
         if (TargetPlayer.vehicle) {
            const Seat = TargetPlayer.seat, Vehicle = TargetPlayer.vehicle;
            Vehicle.position = new mp.Vector3(Player.position.x + 2, Player.position.y, Player.position.z);
            Vehicle.dimension = Player.dimension;
            Player.putIntoVehicle(Vehicle, Seat);
         } else {
            TargetPlayer.position = Player.position;
            TargetPlayer.dimension = Player.dimension;
         }
         TargetPlayer.SendMessage('Admin ' + Player.name + ' vas je teleportovao do sebe !', Colors.tomato);
         Player.SendMessage('Teleportovali ste ' + TargetPlayer.name + ' do sebe !', Colors.tomato);
         Admin.AdminActionNotify(Player, `je teleportovao igrača ${TargetPlayer.name} do sebe.`);
      }
   }
};

Commands["revive"] = {
   Admin: 4,
   Desc: '',
   Params: ['igrač', 'razlog'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Reason = Args[1];
      if (TargetPlayer && Reason) {
         Player.Character.Wounded = false;
         Player.Character.Health = 100;
         TargetPlayer.spawn(Player.Character.Last_Position);
         Admin.AdminActionNotify(Player, `je oživeo igrača ${TargetPlayer.name}. Razlog: ${Reason}.`);
      }
   }
};

Commands["givegun"] = {
   Admin: 6,
   Desc: 'Davanje oružja',
   Params: ['igrač', 'oružje', 'municija'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), GunName = Args[1], Ammo = parseInt(Args[2]);
      if (TargetPlayer && GunName.length > 0 && Ammo > 0) {
         TargetPlayer.giveWeapon(mp.joaat(GunName), Ammo);
         TargetPlayer.SendMessage('[OOC] Admin Vam je dao oružje ' + GunName + `(${Ammo})`, Colors.info);
         Admin.AdminActionNotify(Player, `je dao oružje ${GunName}(${Ammo}) igraču ${TargetPlayer.name}.`);
      }
   }
};

Commands["makeadmin"] = {
   Admin: 6,
   Desc: '',
   Params: ['igrač', 'level'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), AdminLevel = parseInt(Args[1]);
      if (TargetPlayer) {
         if (AdminLevel > 0) {
            Player.Account.Administrator = AdminLevel;
            Admin.AdminActionNotify(Player, `je postavio ${Administrators[AdminLevel]}-a igraču ${TargetPlayer.name}.`);
         } else {
            Player.Account.Administrator = 0;
            Admin.AdminActionNotify(Player, `je skinuo ${Administrators[AdminLevel]}-a igraču ${TargetPlayer.name}.`);
         }
         Player.Account.save();
      }
   }
};

Commands["makeleader"] = {
   Admin: 5,
   Desc: 'Postavljanje/skidanje lidera.',
   Params: ['igrač', 'level'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), PedModel = mp.joaat(Args[1]);
      if (TargetPlayer && PedModel) {
         TargetPlayer.model = PedModel;
         Admin.AdminActionNotify(Player, `je promenio skin igraču ${TargetPlayer.name} na ${Args[1]}.`);
      }
   }
};

Commands["freeze"] = {
   Admin: 3,
   Desc: 'Zaledite igrača u mestu..',
   Params: ['igrač', 'razlog'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Reason = Args[1];
      if (TargetPlayer && Reason.length > 0) {
         TargetPlayer.call('CLIENT::FREEZE');
         TargetPlayer.SendMessage('[OOC] Admin Vas je zaledio. Razlog: ' + Reason, Colors.info);
         Admin.AdminActionNotify(Player, `je zaledio igraca ${TargetPlayer.name}. Razlog: ${Args[1]}.`);
      }
   }
};

Commands["unfreeze"] = {
   Admin: 3,
   Desc: 'Odledite igrača',
   Params: ['igrač'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]);
      if (TargetPlayer) {
         TargetPlayer.call('CLIENT::UNFREEZE');
         TargetPlayer.SendMessage('[OOC] Admin Vas je odledio.', Colors.info);
         Admin.AdminActionNotify(Player, `je odledio igrača ${TargetPlayer.name}.`);
      }
   }
};

Commands["disarm"] = {
   Admin: 4,
   Desc: 'Oduzmite oružje igraču iz ruku.',
   Params: ['igrač', 'razlog'],
   Call: async (Player: PlayerMp, Args: string[]) => {
      const TargetPlayer = mp.players.find(Args[0]), Reason = Args[0];
      if (TargetPlayer) {
         TargetPlayer.removeAllWeapons();
         TargetPlayer.SendMessage('[OOC] Admin Vam je oduzeo oružje iz ruke.', Colors.info);
         Admin.AdminActionNotify(Player, `je oduzeo oružje iz ruke igraču ${TargetPlayer.name}. Razlog: ${Reason}`);
      }
   }
};

Commands["lr"] = {
   Admin: 2,
   Desc: 'Lista svih reportova.',
   Call: async (Player: PlayerMp, Args: string[]) => {

   }
};

Commands["fixveh"] = {
   Admin: 3,
   Desc: 'Popravite svoje vozilo.',
   Call: async (Player: PlayerMp, Args: string[]) => {
      if (Player.vehicle) {
         Player.vehicle.repair();
         Player.SendMessage('Popravili ste vozilo.', Colors.info);
      }
   }
};





// module.exports = {
//    commands: [


//       {
//          Name: 'destroyveh',
//          Admin: 4,
//          Call: (Player) => {
//             let Vehicle = null;

//             if (Player.vehicle) Vehicle = Player.vehicle;
//             else Vehicle = frp.Vehicles.Nearest(Player.position, 3.2);

//             if (Vehicle) {
//                if (Vehicle.Database) {

//                } else {
//                   Vehicle.destroy();
//                }
//             }
//          }
//       },

//       {
//          Name: 'givemoney',

//       },
//    ]
// };
