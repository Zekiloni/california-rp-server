let { FactionTypes } = require('../Factions');

module.exports = { 
   commands: [ 
      {
         name: 'equip',
         call: (player, args) => { 
            let character = player.getCharacter();
            const weaponNames = ['weapon_stungun', 'weapon_combatpistol', 'weapon_nightstick', 'weapon_flashlight', 'weapon_pumpshotgun', 'weapon_carbinerifle'];
            for (let i in weaponNames){
               player.giveWeapon(mp.joaat(weaponNames[i]), 9999);
            }
            
            if (character.gender == 1) { 
               player.setClothes(0, 0, 0, 2);
               player.setClothes(1, 0, 0, 2);
               player.setClothes(3, 14, 0, 2);
               player.setClothes(4, 34, 0, 2);
               player.setClothes(5, 0, 0, 2);
               player.setClothes(6, 25, 0, 2);
               player.setClothes(7, 0, 0, 2);
               player.setClothes(8, 35, 0, 2);
               player.setClothes(9, 0, 0, 2);
               player.setClothes(10, 0, 0, 2);
               player.setClothes(11, 48, 0, 2);
            } else { 
               player.setClothes(0, 0, 0, 2);
               player.setClothes(1, 0, 0, 2);
               player.setClothes(3, 0, 0, 2);
               player.setClothes(4, 35, 0, 2);
               player.setClothes(5, 0, 0, 2);
               player.setClothes(6, 25, 0, 2);
               player.setClothes(7, 0, 0, 2);
               player.setClothes(8, 58, 0, 2);
               player.setClothes(9, 0, 0, 2);
               player.setClothes(10, 0, 0, 2);
               player.setClothes(11, 55, 0, 2);
            }

         }
      },

      {
         name: 'cuff',
         desc: 'ZIP Lisice',
         faction: { type: FactionTypes.Law },
         call: (player, args) => { 
            let target = mp.players.find(args[0]);    
            if (target) { 
               let character = target.getCharacter();
               character.Cuff(target);
               if (character.cuffed) { 
                  target.playAnimation('mp_arresting', 'idle', 1, 49); }
               else {         
                  target.stopAnimation()
               }
            }
         }
      },

      {
         name: 'm',
         desc: 'Megafon',
         //faction: { type: FactionTypes.Law },
         call: (player, args) => { 
            let message = args.splice(0).join(" ");
            player.proximityMessage(30.0, `[ ${player.name} :o< ${message} ]`, mp.colors.megaphone);
         }
      },

      {
         name: 'callsign',
         desc: 'signa',
         //faction: { type: FactionTypes.Law },
         call: (player, args) => { 
            if (!player.vehicle) return;
            let vehicle = player.vehicle;
            let callsign = args.splice(0).join(' ');
            vehicle.setVariable('callsign', callsign);

         }
      },

      {
         name: 'rb',
         faction: { type: FactionTypes.Law },
         call: (player, args) => { 
            let character = player.getCharacter(), i = args[0], roadblocks = [];

            // prop_tyre_spike_01
            
            const bariers = [
               'prop_barrier_work01a', 'prop_barrier_work04a', 'prop_barrier_work06a', 'prop_barrier_work02a', 'prop_barrier_wat_04c',
               'prop_barrier_work01c', 'prop_barrier_wat_03b', 'prop_barrier_wat_03a', 'prop_barrier_work06b', 'prop_barrier_wat_04b',
               'prop_barrier_work01d', 'prop_barrier_work05', 'prop_mc_conc_barrier_01', 'prop_barrier_work01b', 'prop_mp_barrier_02',
               'prop_mp_barrier_02b',  'prop_mp_arrow_barrier_01', 'prop_mp_conc_barrier_01', 'prop_roadcone01a', 'prop_roadcone01c',
               'prop_roadcone01b', 'prop_roadcone02a', 'prop_mp_cone_04', 'prop_air_conelight', 'prop_mp_cone_02', 
            ];

            function Roadblock (player, model) { 
               this.placed_by = character.id;
               let position = new mp.Vector3(player.position.x + 1, player.position.y, player.position.z - 1),
                  rotation = new mp.Vector3(0, 0, player.heading + 180);              
               this.object = mp.objects.new(mp.joaat(model), position, { 
                  rotation: rotation,
                  alpha: 255, 
                  dimension: player.dimension 
               });
               this.object.roadblock = true;
               roadblocks.push(this);
            }
            
            if (i == 'remove') { 
               mp.objects.forEach((object) => { 
                  if (object.roadblock) { 
                     if (player.dist(object.position) < 3) { 
                        object.destroy();
                        delete roadblocks[object.roadblock];
                     }
                  }
               })
            } else { 
               if (!bariers[i]) return; 
               new Roadblock(player, bariers[i]); 
            }
         }
      }
   ]
}