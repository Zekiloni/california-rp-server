import { Houses } from "./s.House";

export const HouseConfig = {
   UPDATE_DISTANCE: 25.0,
}


export class HouseManager extends Houses {
   static createHouse (player: PlayerMp, price: number, description: string | null) {
      Houses.create({});
   }

   static onHouseCreated (house: Houses) {
      
   }

   static onHouseDestroyed (house: Houses) {

   }
   
   static updateHouseInfo (house: Houses) {
      mp.players.forEachInRange(house.position, HouseConfig.UPDATE_DISTANCE, 
         (player: PlayerMp) => player.call('updateHouseInfo', [house])
      );
   }

   static onPlayerBuyHouse (player: PlayerMp, hId: number) {
      Houses.findOne({ where: { id: hId }, include: { all: true } }).then(house => {
         if (!house) {
            return;
         }

         house!.owner = player.character.id;
         player.character.giveMoney(player, -house.price);
      });
   }

	static onPlayerSellHouse (player: PlayerMp, hId: number) {
		Houses.findOne({ where: { id: hId }, include: { all: true } }).then(house => {
			if (!house) {
				return;
			}
		})
	}
}

mp.events.add(
	{
		'playerBuyHouse': HouseManager.onPlayerBuyHouse,
		'playerSellHouse': HouseManager.onPlayerSellHouse
	}
)