import { getStreetZone } from "../../utils";


const CPostalConfig = {
   sprite: 525,
   blipColor: 79,
   maximumShiftPoints: 15
}

// BOX OBJECT: bkr_prop_fakeid_boxpassport_01a

let deliveredPoints: PostalPoint[] = [];


interface PostalPoint {
   id: number
   position: Vector3Mp
};


function createPostalPoint (houseID: number, position: Vector3Mp) {
   if (houseID && position) {
      const { x, y, z } = position;

      const checkpoint = mp.checkpoints.new(48, new mp.Vector3(x, y, z - 2), 2, {
         direction: new mp.Vector3(0, 0, 0),
         color: [ 230, 50, 50, 185 ],
         visible: true,
         dimension: mp.players.local.dimension
      });
   
      const blip = mp.blips.new(CPostalConfig.sprite, position, {
         color: CPostalConfig.blipColor, alpha: 250, shortRange: false
      });
      
      function enterPostalPoint (eCp: CheckpointMp) {
         if (eCp.id == checkpoint.id && !mp.players.local.vehicle) {
            mp.gui.chat.push(`DEBBUG: Enter Postal point, house id ${houseID}.`);
            
            checkpoint.destroy();
            blip.destroy();

            mp.events.remove(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, enterPostalPoint);
            
            if (deliveredPoints.length ==  CPostalConfig.maximumShiftPoints) {
               stopPostalDelivery(true);
            } else {
               const { street } = getStreetZone(mp.players.local.position);
               mp.events.callRemote('SERVER::POSTAL_NEXT', street, houseID);
            }
         }
      }

      mp.events.add(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, enterPostalPoint);

   }
}

function stopPostalDelivery (withMaxPoints?: boolean) {
   deliveredPoints = [];
   // create blip for returning vehicle

}


mp.events.add('CLIENT::POSTAL_POINT', createPostalPoint);
mp.events.add('CLIENT::POSTAL_STOP', stopPostalDelivery)

