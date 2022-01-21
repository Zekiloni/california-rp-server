import { animationFlags } from '../../../enums/animations.flags';


export default (callback: Function) => {
   return [
       {
           name: 'No',
           callback,
           data: ['anim@heists@ornate_bank@chat_manager', 'fail', animationFlags.NORMAL],
       },
       {
           name: 'No Way',
           callback,
           data: ['gestures@m@standing@casual', 'gesture_no_way', animationFlags.NORMAL],
       },
       {
           name: 'Okay',
           callback,
           data: ['anim@mp_player_intselfiedock', 'idle_a', animationFlags.NORMAL],
       },
       {
           name: 'Out of Breath',
           callback,
           data: ['re@construction', 'out_of_breath', animationFlags.NORMAL],
       },
       {
           name: 'Salute',
           callback,
           data: ['anim@mp_player_intincarsalutestd@ds@', 'idle_a', animationFlags.NORMAL],
       },
       {
           name: 'Salute 2',
           callback,
           data: ['anim@mp_player_intincarsalutestd@ps@', 'idle_a', animationFlags.NORMAL],
       },
       {
           name: 'Scared 1',
           callback,
           data: ['random@domestic', 'f_distressed_loop', animationFlags.NORMAL],
       },
       {
           name: 'Scared 2',
           callback,
           data: ['random@homelandsecurity', 'knees_loop_girl', animationFlags.NORMAL],
       },
       {
           name: 'Clap',
           callback,
           data: ['amb@world_human_cheering@male_a', 'base', animationFlags.NORMAL],
       },
       {
           name: 'Eat',
           callback,
           data: ['mp_player_inteat@burger', 'mp_player_int_eat_burger', animationFlags.NORMAL],
       },
   ];
};