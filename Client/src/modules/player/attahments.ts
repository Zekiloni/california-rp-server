

interface Attachment { 
   [key: string]: {
      object: ObjectMp
      local?: boolean
   }
}

interface Attachments {
   [key: number]: Attachment
}


let attachments: Attachments = {};


function streamAttachments (entity: EntityMp) {
   if (entity.type != RageEnums.EntityType.PLAYER) {
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

   const eAttachments = entity.getVariable('ATTACHMENTS');
   
   for (const attachment of eAttachments) {
      removeAttachment(
         <PlayerMp>entity, attachment.name
      );
   }
}


function createAttachment (player: PlayerMp, name: string, model: string, bone: number | string, offset: Vector3Mp, rotation: Vector3Mp) {
   if (attachments[player.remoteId][name]) {
      return;
   }

   const object = mp.objects.new(mp.game.joaat(model), player.position, { dimension: player.dimension } );

   object.attachTo(player.handle,
      (typeof (bone) === 'string') ? player.getBoneIndexByName(bone) : player.getBoneIndex(bone),
      offset.x, offset.y, offset.z, 
      rotation.x, rotation.y, rotation.z, 
      false, false, false, false, 2, true
   );
   
   attachments[player.remoteId][name] = {
      object: object, local: false
   }
}


function removeAttachment (player: PlayerMp, name: string) {
   const attachment = attachments[player.remoteId][name];

   if (!attachment) {
      return;
   }

   if (mp.objects.exists(attachment.object)) {
      attachment.object.destroy();
   }

   delete attachments[player.remoteId][name];
};


mp.events.add(RageEnums.EventKey.ENTITY_STREAM_IN, streamAttachments);
mp.events.add(RageEnums.EventKey.ENTITY_STREAM_OUT, streamAttachments);