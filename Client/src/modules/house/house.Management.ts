


mp.events.add(
   {
      'CLIENT::HOUSE:LOCK': () => mp.events.callRemote('SERVER::HOUSE:LOCK'),
   }
)