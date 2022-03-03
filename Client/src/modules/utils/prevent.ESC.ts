



const disableESCMenu = (toggle: boolean) =>  {
   toggle ? mp.events.add(RageEnums.EventKey.RENDER, preventESC) : mp.events.remove(RageEnums.EventKey.RENDER, preventESC);
}


const preventESC = () => { 
   mp.game.controls.disableControlAction(
      RageEnums.InputGroup.MAX_INPUTGROUPS,
      RageEnums.Controls.INPUT_FRONTEND_PAUSE_ALTERNATE,
      true
   );
}

mp.events.add('CLIENT::PREVENT_ESC', disableESCMenu);