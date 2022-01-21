import { animationFlags } from '../../../enums/animations.flags';


export default (callback: Function) => {
   return [
      {
         name: 'Air Guitar',
         callback,
         data: ['anim@mp_player_intcelebrationfemale@air_guitar', 'air_guitar', animationFlags.REPEAT],
      },
      {
         name: 'Air Synth',
         callback,
         data: ['anim@mp_player_intcelebrationfemale@air_synth', 'air_synth', animationFlags.REPEAT],
      },
      {
         name: 'Argue 1',
         callback,
         data: ['misscarsteal4@actor', 'actor_berating_loop', animationFlags.REPEAT],
      },
      {
         name: 'Argue 2',
         callback,
         data: ['oddjobs@assassinate@vice@hooker', 'argue_a', animationFlags.REPEAT],
      },
      {
         name: 'Blow Kiss 1',
         callback,
         data: ['anim@mp_player_intcelebrationfemale@blow_kiss', 'blow_kiss', animationFlags.NORMAL],
      },
      {
         name: 'Blow Kiss 2',
         callback,
         data: ['anim@mp_player_intselfieblow_kiss', 'exit', animationFlags.NORMAL],
      },
      {
         name: 'Curtsy',
         callback,
         data: ['anim@mp_player_intcelebrationpaired@f_f_sarcastic', 'sarcastic_left', animationFlags.NORMAL],
      },
      {
         name: 'Bring It',
         callback,
         data: ['misscommon@response', 'bring_it_on', animationFlags.NORMAL],
      },
      {
         name: 'Come At Me',
         callback,
         data: ['mini@triathlon', 'want_some_of_this', animationFlags.NORMAL],
      },
      {
         name: 'Jazz Hands',
         callback,
         data: ['anim@mp_player_intcelebrationfemale@jazz_hands', 'jazz_hands', animationFlags.NORMAL],
      },
   ];
};