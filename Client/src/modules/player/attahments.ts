import { waitForEntity } from "../../utils";


interface Attachment { 
   playerID: number
   name: string
   object: ObjectMp
   local?: boolean
}

let attachments: Attachment[] = [];


function streamAttachments (entity: EntityMp) {
   if (entity.type != RageEnums.EntityType.PLAYER) {
      return;
   }

   if (!entity.hasVariable('ATTACHMENTS')) {
      return;
   }
   
   const eAttachments = entity.getVariable('ATTACHMENTS');
   
   for (const attachment of eAttachments) {
      createAttachment(
         <PlayerMp>entity, attachment.name, attachment.model, attachment.bone, attachment.offset, attachment.rotation
      );
   }
};

function streamOutAttachments (entity: EntityMp) {
   if (entity.type != RageEnums.EntityType.PLAYER) {
      return;
   }

   if (!entity.hasVariable('ATTACHMENTS')) {
      return;
   }

   const eAttachments = entity.getVariable('ATTACHMENTS');
   
   for (const attachment of eAttachments) {
      removeAttachment(
         <PlayerMp>entity, attachment.name
      );
   }
}


export function createAttachment (player: PlayerMp, name: string, model: string, bone: number | string, offset: Vector3Mp, rotation: Vector3Mp) {
   if (attachments[player.remoteId] && attachments.find(attachment => attachment.name == name && attachment.playerID == player.remoteId)) {
      return;
   }

   const object = mp.objects.new(mp.game.joaat(model), player.position, { dimension: player.dimension } );

   waitForEntity(object)?.then(() => {
      object.attachTo(player.handle,
         (typeof (bone) === 'string') ? player.getBoneIndexByName(bone) : player.getBoneIndex(bone),
         offset.x, offset.y, offset.z, 
         rotation.x, rotation.y, rotation.z, 
         false, false, false, false, 2, true
      );
      
   })
   
   attachments.push({
      playerID: player.id,
      name: name,
      object: object,
      local: false
   })
}


export function removeAttachment (player: PlayerMp, name: string) {
   const attachment = attachments.find(attachment => attachment.playerID == player.remoteId && attachment.name == name);

   if (!attachment) {
      return;
   }

   if (mp.objects.exists(attachment.object)) {
      attachment.object.destroy();
   }

   const index = attachments.indexOf(attachment);
   attachments.splice(index, 1);
};


mp.events.add(RageEnums.EventKey.ENTITY_STREAM_IN, streamAttachments);
mp.events.add(RageEnums.EventKey.ENTITY_STREAM_OUT, streamAttachments);