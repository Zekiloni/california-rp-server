import controls from '../../enums/controls';
import { entityType } from '../../enums/entity';


interface offer {
   title: string
   description: string
   offerer: PlayerMp
   respond (player: PlayerMp, respond: boolean): void;
   faction?: number
}


let offer: offer | null = null;


const offerHandler = (entity: EntityMp, value: offer | null, oldValue: offer | null) => {
   if (entity.type == entityType.PLAYER && entity.remoteId == mp.players.local.remoteId) {
      offer = value;
      mp.gui.chat.push(' Offer ? ' + JSON.stringify(value ? 'yes' : 'no'));
      if (offer) {
         // show...
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