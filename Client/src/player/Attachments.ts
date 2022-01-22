


const Bones: any = {
   'RIGHT_HAND': 6286,
   'LEFT_HAND': 36029
}

mp.events.addDataHandler({
   'Attachments': (Entity: EntityMp, Value: any) => {
       if (Entity.type === 'player') Attach(Entity, Value);
   }
});

mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'player') { 
         if (entity.getVariable('Attachments')) {
            let attachments = entity.getVariable('Attachments');
            attachments.forEach((attachment: any) => { 
               Attach (entity, attachment);
            })
         }
      }
   }
});


function Attach (Entity: EntityMp, Attachment: any) { 
   let boneIndex = (<PlayerMp>Entity).getBoneIndex(Bones[Attachment.bone]);
   mp.gui.chat.push('Model ' + JSON.stringify(Attachment.model));
   mp.gui.chat.push('Bone ' + JSON.stringify(Attachment.bone));
   mp.gui.chat.push('Bone Index ' + JSON.stringify(boneIndex));

   mp.gui.chat.push(JSON.stringify(Attachment));
}

export {};