
const player = mp.players.local;

mp.events.add('client:sendChatBubble', (radius, message, target) => {
   let position = new mp.Vector3(target.position.x, target.position.y, target.position.z)
   let rotation = new mp.Vector3(-180.0, 0.0, 0.0);
   let label = mp.labels.new(message, position,
   {
      los: false,
      font: 0,
      drawDistance: radius,
      dimension: target.dimension
   });
   let bone = mp.players.local.getBoneIndex = 24818;
   label.attachTo(target.handle, bone, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, true, false, false, false, 2, false);	

   setTimeout(() => { label.destroy() }, 4000);
});