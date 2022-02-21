

let working: boolean = false;

let points = [];


const startMining = () => {
   working = !working;
   
   if (working) {
      mp.events.add('click', mine);
   } else { 
      mp.events.remove('click', mine);
   }

}


const mine = (x: number, y: number, upOrDown: string, leftOrRight: string, relativeX: number, relativeY: number, worldPosition: Vector3Mp, hitEntity: number) => {
   mp.gui.chat.push(JSON.stringify(hitEntity));
}




mp.events.add('CLIENT::MINER:TOGGLE', startMining);