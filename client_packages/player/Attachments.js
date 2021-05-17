

const Player = mp.players.local;

const bones = {
   'RIGHT_HAND': 6286,
   'LEFT_HAND': 36029
}

mp.events.addDataHandler({
   'Attachments': (entity, value) => {
       if (entity.type === 'player') Attach(entity, value);
   }
});

mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'player') { 
         if (entity.getVariable('Attachments')) {
            let attachments = entity.getVariable('Attachments');
            attachments.forEach((attachment) => { 
               Attach (entity, attachment);
            })
         }
      }
   }
});


function Attach (entity, attachment) { 
   let boneIndex = entity.getBoneIndex(bones[attachment.bone]);
   mp.gui.chat.push('Model ' + JSON.stringify(attachment.model));
   mp.gui.chat.push('Bone ' + JSON.stringify(attachment.bone));
   mp.gui.chat.push('Bone Index ' + JSON.stringify(boneIndex));

   mp.gui.chat.push(JSON.stringify(attachment));
}