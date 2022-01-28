// import { Globals } from "../../Global/Globals";
// import { Messages } from "../../Global/Messages";
// import House from "../../models/house.model";
// import { Admin } from "../admin";
// import { Commands } from "../commands";

// Commands["createhouse"] = {
//    Admin: 6,
//    description: 'Kreira kuću',
//    params: ['tip', 'cena'],
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const [Type, Price] = Args;
//       // const NewHouse = House.create({ Type: Type, Price: Number(Price), Position: Player.position, Dimension: Player.dimension, 
         
//       // });
//       Admin.AdminActionNotify(Player, 'je kreirao kuću ID: ');
//    }
// };

// Commands["deletehouse"] = {
//    Admin: 6,
//    description: 'Briše kuću',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const NearHouse = await House.Nearest(Player);
//       if (NearHouse) {
//          NearHouse.destroy();
//          Admin.AdminActionNotify(Player, 'je obrisao kuću ID: ' + NearHouse.ID);
//       }
//    }
// };

// Commands["house"] = {
//    description: 'Upravljanje kućom',
//    Call: async (Player: PlayerMp, Args: string[]) => {
//       const HasHouse = await House.findOne({ where: { owner: Player.character.id }});
//       if (HasHouse) {
//          Player.call('CLIENT::HOUSE:MANAGER');
//       } else Player.Notification(Messages.YOU_DONT_OWN_A_HOUSE, notifyType.ERROR, 5);
      
//    }
// };
