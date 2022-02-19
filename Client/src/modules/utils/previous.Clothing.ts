
export default function getPreviousClothing (player: PlayerMp) {
   let previous: { 
      clothing: { [key: number]: { texture: number, drawable: number } } 
      props: { [key: number]: { texture: number, drawable: number } } 
   } = {
      clothing: {},
      props: {}
   };
   
   for (let i = 1; i < 12; i ++) {
      if (i != 2) {
         previous.clothing[i] = {
            drawable: player.getDrawableVariation(i),
            texture: player.getTextureVariation(i),
         }
      }
   }

   for (let i = 0; i < 8; i ++) {
      previous.props[i] = {
         drawable: player.getPropIndex(i),
         texture: player.getPropTextureIndex(i),
      }
   }

   return previous;
}