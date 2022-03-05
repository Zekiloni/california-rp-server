


const moodStream = (entity: EntityMp) => {
   if (entity.type != RageEnums.EntityType.PLAYER) {
      return;
   }

   const hasMood = entity.hasVariable('FACIAL_MOOD');

   if (!hasMood) {
      return;
   }

   const mood: string = entity.getVariable('FACIAL_MOOD');
   moodHandler(entity, mood);
}


const moodHandler = (entity: EntityMp, mood: string, oldMood?: string) => {
   if (entity.type != RageEnums.EntityType.PLAYER) {
      return;
   }

   const _player = <PlayerMp>entity;

   if (mood != 'normal') {
      _player.setFacialIdleAnimOverride(mood, '');
   } else if (mood == 'normal' && mood != oldMood) {
      _player.clearFacialIdleAnimOverride();

   }
};


mp.events.add(RageEnums.EventKey.ENTITY_STREAM_IN, moodStream);
mp.events.addDataHandler('FACIAL_MOOD', moodHandler);