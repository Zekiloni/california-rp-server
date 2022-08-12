import { PropertyObjects } from "..";
import { Properties } from "./s.Property";
import { PropertyConfig } from "./s.Property.Config";


export class PropertyManager extends Properties {
   /**
    * Create property of desired price and type
    *
    * @static
    * @param {PlayerMp} player
    * @param {number} price
    * @param {(string | null)} description
    * @param {keyof typeof  PropertyConfig.PropertyType} type
    * @memberof PropertyManager
    */
   static createProperty (player: PlayerMp, price: number, description: string | null, type: keyof typeof  PropertyConfig.PropertyType) {
      Properties.create({});
   }

   static destroyProperty (player: PlayerMp, propertyId: number) {
      Properties.findOne({ where: { id: propertyId }, include: { all: true } }).then(property => {
         if (!property) {
            return;
         }

         // Todo: Log Destroyed Property ID: propertyId by player.account.username;
         property.destroy();
      })
   }

   /**
    * Destroying all property objects (interior + exterior)
    * @static
    * @param {PlayerMp} player
    * @param {number} propertyId
    * @memberof PropertyManager
    */
   static destroyPropertyObjects (player: PlayerMp, propertyId: number) {
      Properties.findOne({ where: { id: propertyId }, include: [PropertyObjects] }).then(property => {
         if (!property) {
            return;
         }

         property.objects.forEach(object => {
            if (object) {
               object.destroy();
            }
         })
      })
   }

   static updateHouseInfo (house: Properties) {
      mp.players.forEachInRange(house.position, PropertyConfig.PropertyConstants.UPDATE_DISTANCE, 
         (player: PlayerMp) => player.call('updateHouseInfo', [house])
      );
   }

   static playerBuyProperty (player: PlayerMp, hId: number) {
      Properties.findOne({ where: { id: hId }, include: { all: true } }).then(house => {
         if (!house) {
            return;
         }

         house!.owner = player.character.id;
         player.character.giveMoney(player, -house.price);
      });
   }

	static playerSellProperty (player: PlayerMp, hId: number) {
		Properties.findOne({ where: { id: hId }, include: { all: true } }).then(house => {
			if (!house) {
				return;
			}
		})
	}
}

mp.events.add(
	{
		'playerBuyProperty': PropertyManager.playerBuyProperty,
		'playerSellProperty': PropertyManager.playerBuyProperty
	}
)