


const Vehicles = [
"chimera","carbonrs","faggio2","youga","glendale","bf400","kalahari","trophytruck","coquette","boxville","elegy","speedo4","gburrito2","hexer","stafford","surano","cliffhanger","lynx","fusilade","khamelion","romero","fcr","lectro","comet5","bruiser","boxville5","drafter","surfer","cog552","ruston","speedo2","buffalo2","gargoyle","sovereign","alpha","sanchez","defiler","monster4","pariah","oppressor","intruder","burrito","cog55","rrocket","pony","sultan","sandking2","youga2","ninef","blista2","bobcatxl","specter2","verlierer2","sentinel3","hotring","superd","bfinjection","rumpo","technical2","marshall","caracara","hakuchou","bestiagts","technical3","warrener","paragon2","rumpo3","paradise","schafter4","sanctus","comet4","rancherxl","akuma","monster3","stratum","rapidgt","bison","streiter","enduro","dloader","washington","diablous2","thrust","issi7","ratbike","camper","specter","tropos","dune3","fugitive","gb200","schafter6","taco","daemon","futo","esskey","brutus3","menacer","oppressor2","insurgent2","carbonizzare","brutus","bagger","blazer","avarus","technical","rebel2","bruiser3","primo2","cognoscenti","comet3","feltzer2","stretch","insurgent3","asterope","surge","brutus2","premier","emperor","insurgent","neon","faggio","deathbike2","asea","seven70","gburrito","bruiser2","double","dune","neo","nightblade","blazer5","riata","raiden","manchez","schafter3","brawler","zr3803","stanier","ninef2","sanchez2","bodhi2","daemon2","deathbike3","kuruma","vindicator","caracara2","surfer2","jester","ingot","faggio3","blazer3","flashgt","schafter2","dubsta3","rebel","sandking","primo","minivan2","jester2","zr3802","furoregt","tampa2","comet2","banshee","zombiea","tailgater","locust","pcj","ruffian","bati2","schafter5","monster","dune4","speedo","omnis","fcr2","schwarzer","monster5","raptor","trophytruck2","nemesis","massacro2","wolfsbane","vortex","cognoscenti2","blista3","zombieb","elegy2","schlagen","paragon","blazer4","revolter","shotaro","penumbra","hellion","bifta","italigto","dune5","minivan","buffalo","rcbandito","hakuchou2","diablous","jester3","jugular","innovation","massacro","vader","kamacho","journey","limo2","bati","freecrawler","blazer2","deathbike","regina"
];

let Current = 0;
let Vehicle = null;

const Positions = {
   Vehicle: new mp.Vector3(-1573.966796875, -365.6707763671875, 202.30532836914062),
   Camera: new mp.Vector3(-1574.472412109375, -375.8471984863281, 203.66571044921875),
   CameraLook: new mp.Vector3(-1573.966796875, -365.6707763671875, 202.30532836914062)
}



mp.events.add({

   'CLIENT:PLAYER.PEDSHOT': () => { 
      let pedHeadShot;
      if (pedHeadShot == null) {
          pedHeadShot = mp.players.local.registerheadshot();
          mp.gui.chat.push(`pedHeadShot: ${pedHeadShot}`);
      }
      
      mp.events.add('render', () => {
          if (pedHeadShot == null) {
              pedHeadShot = mp.players.local.registerheadshot();
              mp.gui.chat.push(`pedHeadShot: ${pedHeadShot}`);
          }
          if (mp.game.ped.isPedheadshotValid(pedHeadShot) && mp.game.ped.isPedheadshotReady(pedHeadShot)) {
              const headshotTexture = mp.game.ped.getPedheadshotTxdString(pedHeadShot);
         
              mp.game.graphics.drawSprite(headshotTexture, headshotTexture, 0.5, 0.5, 0.1, 0.1, 0, 255, 255, 255, 100);
          }
      });
   },
   
   'CLIENT::VEHICLES:SCREENSHOT': async () => { 
      Player.position = new mp.Vector3(-1570.5236, -384.4845, 202.98943);
      mp.game.ui.displayRadar(false);
      Player.freezePosition(true);

      mp.game.wait(100);

      mp.gui.chat.push('slikanje pokrenuto');
      let Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true);
      Camera.setCoord(Positions.Camera.x, Positions.Camera.y, Positions.Camera.z);
      Camera.pointAtCoord(Positions.CameraLook.x, Positions.CameraLook.y, Positions.CameraLook.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      
      mp.game.wait(50);

      do {
         if (Vehicle) { 
            Vehicle.model = mp.game.joaat(Vehicles[Current]);
            Vehicle.setColours(132, 132);
            Vehicle.freezePosition(true);
            Vehicle.numberPlateType = 1;
         } else { 
            Vehicle = mp.vehicles.new(mp.game.joaat(Vehicles[Current]), Positions.Vehicle, {
               numberPlate: 'focus', heading: 138,
            });
            Vehicle.freezePosition(true);
            mp.game.wait(30);
            Vehicle.setColours(132, 132);
         }
         mp.game.wait(50);
         mp.gui.takeScreenshot(Vehicles[Current] + '.png', 1, 100, 0);
         mp.game.wait(40);
         Current ++;
      } while (Current != Vehicles.length -1);


      if (Camera) Camera.destroy();
      if (Vehicle) Vehicle.destroy();
      mp.gui.chat.push('slikanje zavrseno');
      Camera = null;
      Vehicle = null;
      Current = 0;
      Player.freezePosition(false);
      mp.game.ui.displayRadar(true);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);

   }
})