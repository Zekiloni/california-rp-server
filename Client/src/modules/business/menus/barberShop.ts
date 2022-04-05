import { Browser } from "../../../browser";


interface PlayerPreviousStyle {
   hair: {
      style: number
      color: number
      highlight: number
   }

   beard: {
      style: number
      color?: number
      opacity?: number
   }
}

let isBarberActive: boolean = false;
let previousStyle: PlayerPreviousStyle | null = null;
let barberCamera: CameraMp | null = null;



const openBarberShop = (info: string) => {
   isBarberActive = !isBarberActive;

   Browser.call(
      isBarberActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'barberShop'
   );
   
   if (isBarberActive) {
      const { position } = mp.players.local;

      barberCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      barberCamera.setActive(true);
      
      barberCamera.pointAtPedBone(mp.players.local.handle, 31086, 0, 0, 0, true);
      const { x, y, z } = new mp.Vector3(position.x + mp.players.local.getForwardX() * 2, position.y + mp.players.local.getForwardY() * 2, position.z + 0.5);
      barberCamera.setCoord(x, y, z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);

      
      previousStyle = {
         hair: {
            style: mp.players.local.getDrawableVariation(RageEnums.Clothes.HAIR_STYLE,),
            color: mp.players.local.hairColour,
            highlight: mp.players.local.hairHighlightColour
         },
         beard: {
            style: mp.players.local.getHeadOverlayValue(1)
         }
      }

   } else {
      if (barberCamera) {
         barberCamera.destroy();
         mp.game.cam.renderScriptCams(false, false, 0, false, false);   
      }
   }
}


const previewHair = (style: number, color: number, highlight: number) => {
   mp.players.local.setComponentVariation(RageEnums.Clothes.HAIR_STYLE, style, color, highlight);
}


mp.events.add('CLIENT::BARBER:MENU', openBarberShop);
mp.events.add('CLIENT::BARBER:HAIR_PREVIEW', previewHair);


