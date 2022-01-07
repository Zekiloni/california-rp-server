// import { Globals } from "../../Global/Globals";
// import Business from "../../models/Business";
// import { Admin } from "../admin";
// import { Commands } from "../commands";
// import { ExceptionType, Main } from "../Main";

// const BussinesTypes = require('../Businesses.json');

// Commands["createbiz"] = {
//    Admin: 6,
//    Desc: 'Kreiranje biznisa',
//    Params: ['tip', 'otvorenog tipa (0 / 1)', 'cena'],
//    Call: (Player: PlayerMp, Args: string[]) => {
//       try {
//          const [Type, WalkIn, Price] = Args;
//          Business.New(Player, parseInt(Type), parseInt(WalkIn) == 0 ? false : true, parseInt(Price));
//       } catch (Ex) {
//          Main.Exception(ExceptionType.Sequelize, __filename, `${Ex}`)
//       }

//    }
// };

// Commands["deletebiz"] = {
//    Admin: 6,
//    Desc: 'Brisanje biznisa',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       try {
//          const NearBiz = await Business.Nearest(Player);
//          if (NearBiz) {
//             Admin.AdminActionNotify(Player, `je uništio biznis ID: ` + NearBiz.id);
//             await NearBiz.destroy();
//          }
//       } catch (Ex) {
//          Main.Exception(ExceptionType.Sequelize, __filename, `${Ex}`);
//       }
//    }
// };

// Commands["editbiz"] = {
//    Admin: 6,
//    Desc: 'Podešavanje biznisa',
//    Params: ['opcija', 'vrednost'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       try {
//          const NearBiz = await Business.Nearest(Player);
//          if (NearBiz) {
//             const [Option, Value] = Args;
//             switch (Option.toUpperCase()) {
//                case 'PRICE':
//                   NearBiz.Price = Number(Value);
//                   break;
//                case 'NAME':
//                   NearBiz.Name = Value;
//                   break;
//                case 'SPRITE':
//                   NearBiz.Sprite = Number(Value);
//                   break;
//                case 'COLOR':
//                   NearBiz.Color = Number(Value);
//                   break;
//                case 'VPOINT':
//                   NearBiz.Vehicle_Point = Player.position;
//                   Player.Notification('Uredili ste mesto za vozila biznisu [' + NearBiz.id + '] ' + NearBiz.Name + '.', NotifyType.SUCCESS, 5);
//                   break;
//                default:
//                   break;
//             }
//             await NearBiz.save();
//             await NearBiz.Refresh();
//          }
//       } catch (Ex) {
//          Main.Exception(ExceptionType.Sequelize, __filename, `${Ex}`);
//       }
//    }
// };