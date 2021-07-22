"use strict";
class Enums {
}
Enums.Player = {
    Facial_Moods: [
        { name: 'Normalna', AnimName: 'normal' },
        { name: 'Zamišljena', AnimName: 'mood_aiming_1' },
        { name: 'Ljutita', AnimName: 'mood_angry_1' },
        { name: 'Pijana', AnimName: 'mood_drunk_1' },
        { name: 'Srećna', AnimName: 'mood_happy_1' },
        { name: 'Povredjena', AnimName: 'mood_injured_1' },
        { name: 'Stresirana', AnimName: 'mood_stressed_1' },
        { name: 'Uvređena', AnimName: 'mood_sulk_1' }
    ],
    Body_Bones: {
        Head: 20,
        R_Foot: 2,
        L_Foot: 6,
        Torso: 8,
        Leg: 4,
        Neck: 18
    },
    Walking_Styles: {
        'Normal': null,
        'Brave': 'move_m@brave',
        'Confident': 'move_m@confident',
        'Drunk': 'move_m@drunk@verydrunk',
        'Fat': 'move_m@fat@a',
        'Gangster': 'move_m@shadyped@a',
        'Hurry': 'move_m@hurry@a',
        'DeadlyWound': 'move_m@injured',
        'HeavyWound': 'move_m@drunk@verydrunk',
        'MediumWound': 'move_m@drunk@moderatedrunk',
        'Wounded': 'move_injured_generic',
        'LegsDamage': 'move_m@drunk@verydrunk',
        'Injured_Ground': 'move_injured_ground',
        'Strafed': 'move_strafe@injured',
        'Intimidated': 'move_m@intimidation@1h',
        'Quick': 'move_m@quick',
        'Sad': 'move_m@sad@a',
        'Tough': 'move_m@tool_belt@a',
    }
};
module.exports = Enums;
