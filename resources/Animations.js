const Animations = {
   /// Sitting
   'sit':['switch@michael@sitting','idle','sitting'],
   'sit2':['amb@world_human_stupor@male@base','base','sitting'],
   'sit3':['timetable@michael@on_sofaidle_a','sit_sofa_a','sitting'],
   'sidesit':['amb@world_human_picnic@female@base','base','sitting'],
   'desksit1':['timetable@amanda@ig_12','amanda_idle_a','sitting'],
   'desksit2':['switch@michael@around_the_table_selfish','around_the_table_selfish_exit_loop_jimmy','sitting'],
   'toiletsit':['anim@heists@heist_safehouse_intro@phone_couch@male','phone_couch_male_idle','sitting'],
   'weepingsit':['timetable@tracy@ig_1@base','base','sitting'],
   'sitchair':['safe@franklin@ig_13','blunt_base','sitting'],
   'sitchair2':['timetable@denice@ig_4','base','sitting'],

   /// Laying
   'liedown1':['amb@world_human_sit_ups@male@enter','enter','laying'],
   'liedown5':['amb@world_human_sunbathe@male@back@enter','enter','laying'],
   'layleft':['amb@world_human_bum_slumped@male@laying_on_left_side@base','base','laying'],
   'layright':['amb@world_human_bum_slumped@male@laying_on_right_side@base','base','laying'],
   'laydead':['misssolomon_5@end','dead_black_ops','laying'],
   'laycouch':['amb@prop_human_seat_sunlounger@female@base','base','laying'],
   'sunbatheback':['amb@world_human_sunbathe@female@back@base','base','laying'],
   'wakeup':['safe@trevor@ig_8','ig_8_wake_up_front_player', 'laying'],


   /// Standing
   'bumsign1':['amb@world_human_bum_freeway@male@idle_a','idle_a','standing'],
   'bumsign2':['amb@world_human_bum_freeway@male@idle_a','idle_b','standing'],
   'bumsign3':['amb@world_human_bum_freeway@male@idle_a','idle_c','standing'],
   'bumcart':['amb@prop_human_bum_shopping_cart@male@idle_a','idle_a','standing'],
   'bumcart1':['amb@prop_human_bum_shopping_cart@male@idle_a','idle_b','standing'],


   // Food
   'walkdrink':['amb@code_human_wander_drinking@male@idle_a','idle_c','food'],
   'walkdrink2':['amb@code_human_wander_drinking@male@idle_a','idle_a','food'],
   'walkeat1':['amb@code_human_wander_eating_donut@male@idle_a','idle_c','food'],
   'walkeat2':['amb@code_human_wander_eating_donut@male@idle_a','idle_b','food'],
   'walkeat3':['amb@code_human_wander_eating_donut@male@idle_a','idle_a','food'],
   'eat': ['amb@medic@standing@timeofdeath@idle_a', 'idle_a', 'food'],
   'eat2': ['mp_player_inteat@burger', 'mp_player_int_eat_burger', 'food'],
   'coffee1':['amb@world_human_aa_coffee@idle_a','idle_a','food'],
   'drink':['amb@world_human_drinking@beer@male@idle_a', 'idle_a', 'food'],
   'drink2':['amb@code_human_wander_drinking@beer@male@idle_a', 'idle_a', 'food'],
   


   // Expressions
   'finger':['mp_player_intfinger','mp_player_int_finger','expressions'],
   'fuck':['anim@mp_player_intupperfinger','enter_fp','expressions'],
   'crackhands':['anim@mp_player_intupperknuckle_crunch','idle_a','expressions'],


   /// Working
   'jackhammer':['amb@world_human_const_drill@male@drill@base','base','working'],
   'hammer':['amb@world_human_hammering@male@base','base','working'],
   'mechanic':['amb@world_human_vehicle_mechanic@male@base','base','working'],


   /// Phone
   'phone1':['amb@world_human_mobile_film_shocking@female@idle_a','idle_a','phone'],
   'takepic':['cellphone@self','selfie_in','phone'],
   'texting':['amb@code_human_wander_texting@female@base','static','phone'],

   // Ground
   'sitground':['rcm_barry3','barry_3_sit_loop','ground'],
   'sitground2':['amb@world_human_picnic@male@base','base','ground'],

   // Leaning
   'lean':['amb@world_human_leaning@male@wall@back@hands_together@idle_a','idle_a','leaning'],
   'leanfoot':['amb@world_human_leaning@male@wall@back@foot_up@idle_a','idle_a','leaning'],
   'leancar':['switch@michael@sitting_on_car_bonnet','sitting_on_car_bonnet_loop','leaning'],
   'leanrail':['missstrip_club_lean','player_lean_rail_loop','leaning'],
   'leanrailsmoking':['missfbi3_sniping','smoke_b','leaning'],
   'sidelean':['mp_cop_tutdealer_leaning@base','base','leaning'],
   'sidelean1':['mp_cop_tutdealer_leaning@idle_a','idle_b','leaning'],
   'sidelean2':['mp_cop_tutdealer_leaning@idle_b','idle_d','leaning'],

   /// Surrender
   'handsup':['missfbi5ig_20b','hands_up_scientist','surrender'],
   'handsup2':['missminuteman_1ig_2','handsup_base','surrender'],
   'handsupknees':['busted','idle_b','surrender'],
   'handsupknees2':['random@arrests','kneeling_arrest_idle','surrender'],
   'cowerhide':['amb@code_human_cower@female@base','base','surrender'],
   'cowerlook1':['amb@code_human_cower@female@idle_a','idle_a','surrender'],


   /// Social
   'point':['oddjobs@suicide','bystander_pointinto','social'],
   'pushups':['amb@world_human_push_ups@male@idle_a','idle_d','social'],
   'crunches':['amb@world_human_sit_ups@male@base','base','social'],
   'chinups':['amb@prop_human_muscle_chin_ups@male@base','base','social'],
   'guitar':['amb@world_human_musician@guitar@male@idle_a','idle_b','social'],
   'drums':['amb@world_human_musician@bongos@male@idle_a','idle_a','social'],
   'yoga1':['amb@world_human_yoga@female@base','base_b','social'],
   'beltgrab':['amb@world_human_cop_idles@male@base','base','social'],
   'hangout':['amb@world_human_hang_out_street@male_b@idle_a','idle_b','social'],
   'partydance':['amb@world_human_partying@female@partying_beer@base','base','dancing'],
   'guitar1':['amb@world_human_musician@guitar@male@idle_a','idle_b','social'],


   /// Adult
   'fuckyou':['anim@mp_player_intupperdock','exit_fp','adult'],
   'twerk':['switch@trevor@mocks_lapdance','001443_01_trvs_28_idle_stripper','adult'],
   'stripdance11':['switch@trevor@mocks_lapdance','001443_01_trvs_28_exit_stripper','adult'],
   'stripperidle1':['mini@strip_club@idles@stripper','stripper_idle_01','adult'],
   'stripdance1':['mini@strip_club@lap_dance@ld_girl_a_song_a_p1','ld_girl_a_song_a_p1_f','adult'],
   'stripdance2':['mini@strip_club@lap_dance@ld_girl_a_song_a_p2','ld_girl_a_song_a_p2_f','adult'],
   'stripdance3':['mini@strip_club@lap_dance@ld_girl_a_song_a_p3','ld_girl_a_song_a_p3_f','adult'],


   /// Items

   'smoke1':['amb@world_human_aa_smoke@male@idle_a','idle_a','expressions'],
   'smoke2':['amb@world_human_leaning@female@smoke@idle_a','idle_a','expressions'],

   // Gestures
   'bringiton':['gestures@m@car@std@casual@ps','gesture_bring_it_on','expressions'],
   'damn':['gestures@m@car@std@casual@ps','gesture_damn','expressions'],
   'shakehead':['gestures@m@car@std@casual@ps','gesture_displeased','expressions'],


   // Fighting
   'hitfall1':['melee@knife@streamed_core_fps','victim_knife_front_takedown','fighting'],
   'hitfall2':['melee@knife@streamed_core_fps','victim_knife_front_takedown_variation_a','fighting'],
   'lowkick':['melee@knife@streamed_variations','ground_attack_on_spot_var_a','fighting'],
   'meleehitground':['melee@large_wpn@streamed_core','ground_attack_on_spot','fighting'],
   'middlekick':['melee@small_wpn@streamed_core','low_attack_0','fighting'],
   'shoved':['melee@small_wpn@streamed_core_fps','non_melee_damage_front','fighting'],

};

module.exports = Animations;
