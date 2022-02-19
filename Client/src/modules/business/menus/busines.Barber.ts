import { Browser } from "../../../browser";
import { clothingComponents } from "../../../enums/clothing";


let active: boolean = false;
let previousHair: { style: number, color: number } | null;
let camera: CameraMp | null = null;


const openBarberShop = (info: string) => {
   active = !active;

   Browser.call(
      active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'barberShop'
   );
   
   if (active) {
      camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      camera.setActive(true);
   
      const { position } = mp.players.local;
      camera.pointAtPedBone(mp.players.local.handle, 31086, 0, 0, 0, true);
      const cameraPosition = new mp.Vector3(position.x + mp.players.local.getForwardX() * 2, position.y + mp.players.local.getForwardY() * 2, position.z + 0.5);
      camera.setCoord(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
   } else {
      if (camera) {
         camera.destroy();
         mp.game.cam.renderScriptCams(false, false, 0, false, false);   
      }
   }
}


const previewHair = (style: number, color: number, highlight: number) => {
   mp.players.local.setComponentVariation(clothingComponents.HAIR_STYLE, style, color, highlight);

}


mp.events.add('CLIENT::BARBER:MENU', openBarberShop);
mp.events.add('CLIENT::BARBER:HAIR_PREVIEW', previewHair);


