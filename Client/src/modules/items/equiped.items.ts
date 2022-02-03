import controls from "../../enums/controls";


let antiSpam: boolean = false;


const takeControls = [
   controls.NUMBER_1, 
   controls.NUMBER_2, 
   controls.NUMBER_3, 
   controls.NUMBER_4
];


for (const i in takeControls) {
   const key = takeControls[i];
   mp.keys.bind(key, true, () => useEquipment(Number(i)));
};


function useEquipment (index: number) {

   if (!mp.players.local.getVariable('SPAWNED')) {
      return;
   }

   if (mp.players.local.isTypingInTextChat) {
      return;
   }

   if (antiSpam) {
      return;
   }
   
   antiSpam = true;
   setTimeout(() => { antiSpam = false; } , 2500);

   mp.events.callRemote('SERVER::USE:EQUIPED', index);   
}