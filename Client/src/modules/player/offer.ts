import { Browser } from '../../browser';
import controls from '../../enums/controls';


interface Offer {
   title: string
   description: string
   offerer: PlayerMp
   respond (player: PlayerMp, respond: boolean): void;
   faction?: number
}


let offer: Offer | null = null;


const offerHandler = (entity: EntityMp, value: Offer | null, oldValue: Offer | null) => {
   if (entity.type == RageEnums.EntityType.PLAYER && entity.remoteId == mp.players.local.remoteId) {
      offer = value;

      Browser.call('BROWSER::OFFER', offer);
      if (offer) {      
         mp.keys.bind(controls.KEY_Y, true, acceptOffer);
         mp.keys.bind(controls.KEY_N, true, declineOffer);
      } else { 
         mp.keys.unbind(controls.KEY_Y, true, acceptOffer);
         mp.keys.unbind(controls.KEY_N, true, declineOffer);
      }
   }
}


const acceptOffer = () => {
   if (!offer) { 
      return;
   }

   if (mp.players.local.isTypingInTextChat) {
      return;
   }

   mp.events.callRemote('SERVER::OFFER:RESPONSE', true);
};


const declineOffer = () => {
   if (!offer) {
      return;
   }

   if (mp.players.local.isTypingInTextChat) {
      return;
   }

   mp.events.callRemote('SERVER::OFFER:RESPONSE', false);
}



mp.events.addDataHandler('OFFER', offerHandler);