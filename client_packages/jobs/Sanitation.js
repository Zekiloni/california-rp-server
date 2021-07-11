

const Player = mp.players.local;

const Max = 25;
const Depony = new mp.Vector3(-435.5779, -1704.9042, 18.06115);

let Visited = [], Picked = false;


const GarbageObjects = [
   'prop_dumpster_01a',
   'prop_dumpster_02b',
   'prop_dumpster_4a',
   'prop_rub_binbag_sd_01',
   'prop_cs_bin_03',
   'prop_cs_bin_01_skinned',
   'prop_cs_bin_02',
   'prop_ld_rub_binbag_01',
   'prop_cs_bin_01',
   'prop_rub_binbag_sd_02',
   'prop_ld_binbag_01',
   'prop_fbibombbin',
   'prop_cs_rub_binbag_01',
   'prop_bin_07bprop_bin_beach_01d',
   'prop_bin_beach_01d',
   'prop_bin_01a',
   'prop_recyclebin_04_a',
   'prop_bin_beach_01a',
   'prop_recyclebin_02_c',
   'prop_bin_delpiero_b',
   'zprop_bin_01a_old',
   'prop_recyclebin_03_a',
   'prop_bin_11a',
   'prop_bin_06a',
   'prop_bin_07d',
   'prop_bin_11',
   'bprop_bin_04a',
   'prop_recyclebin_02b',
   'prop_bin_delpiero',
   'prop_bin_09a',
   'prop_bin_08a',
   'prop_recyclebin_04_b',
   'prop_bin_02a',
   'prop_bin_03a',
   'prop_bin_08open',
   'prop_bin_12a',
   'prop_bin_05a',
   'prop_bin_07a',
   'prop_recyclebin_01a',
   'v_serv_tc_bin2_',
   'v_serv_tc_bin1_',
   'prop_rub_binbag_03b',
   'prop_rub_binbag_04',
   'prop_rub_binbag_08',
   'prop_rub_binbag_01',
   'prop_rub_binbag_05',
   'p_rub_binbag_test',
   'prop_rub_binbag_06',
   'prop_rub_binbag_03',
   'prop_rub_binbag_01b',
   'hei_prop_heist_binbag',
   'ng_proc_binbag_01a',
   'ng_proc_binbag_02a',
   'p_binbag_01_s',
   'prop_forsale_lrg_04'
];
  

mp.keys.bind(0x59, false, async function () {
   if (Player.logged && Player.spawned && Player.getVariable('Job') == 4 && Player.getVariable('Job_Duty') == true) { 
      if (Player.vehicle || Player.Cuffed || Player.isTypingInTextChat) return;
      
      if (Visited.length == Max) return;

      if (Visited.length == Max - 1) { 
         const {checkpoint, blip} = Player.CreateInteractionSpot('Depony', Depony);

         mp.events.add('playerEnterCheckpoint', PlayerEnterDepony);

         function PlayerEnterDepony (point) { 
            if (point == checkpoint) { 

               let Truck = mp.vehicles.atRemoteId(Player.getVariable('Job_Vehicle'));
               if (Player.vehicle == Truck) { 


                  Truck.setDoorOpen(5, false, false);
                  Player.freezePosition(true);
                  Truck.freezePosition(true);

                  setTimeout(() => {
                     Player.freezePosition(false);
                     Truck.freezePosition(false);
                     Truck.setDoorShut(5, false);
                     mp.events.callRemote('server:job.garbage:finish');
                  }, 15000);

                  checkpoint.destroy();
                  blip.destroy();
                  mp.events.remove('playerEnterCheckpoint', PlayerEnterDepony);
               }
            }
         }
      }

      const Garbage = await ClosestGarbage();
      if (Garbage) { 
         const aPicked = AlreadyPicked();
         if (aPicked) return mp.gui.chat.push('to je vec pokupljeno');

         Picked = true;
         mp.events.callRemote('server:character.attachment', 'prop_cs_street_binbag_01', 6286)
         Visited.push(Player.position);

         const Truck = mp.vehicles.atRemoteId(Player.getVariable('Job_Vehicle'));

         if (Truck) { 
            const BehindOffset = Truck.getOffsetFromInWorldCoords(0.0, -5.15, 0.0);
            const [colshape, marker] = LittleMarker(BehindOffset);
   
            mp.events.add('playerEnterColshape', BehindGarbageTruck);
   
            function BehindGarbageTruck (shape) { 
               if (shape == colshape) {        
                  
                  if (Player.vehicle) return;

                  Player.heading = Truck.heading;
                  Picked = false;
   
                  mp.events.callRemote('server:character.attachment', false);
   
                  colshape.destroy();
                  marker.destroy();
      
                  mp.events.remove('playerEnterColshape', BehindGarbageTruck);
               }
            } 
         }
      };
   }
});



function ClosestGarbage () { 
   const Position = Player.position;
      return new Promise((resolve) => { 
         for (const Garbage of GarbageObjects) { 
         const object = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 1.8, mp.game.joaat(Garbage), false, true, true);
         if (object) {
            resolve({ Object: Garbage, Position: Position });
            break;
         }
      }
   });
};


function AlreadyPicked () { 
   if (Visited.length > 0) { 
      for (const Position of Visited) { 
         const Distance = mp.game.gameplay.getDistanceBetweenCoords(Player.position.x, Player.position.y, Player.position.z, Position.x, Position.y, Position.z, true);
         if (Distance < 3.5) { 
            return true;
         }
      }
   }
};


function LittleMarker (position) { 
   const Marker = mp.markers.new(0, new mp.Vector3(position.x, position.y, position.z - 0.35), 0.4, { rotation: new mp.Vector3(0, 0, 0), color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
   const Colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 0.75, Player.dimension);
   return [Colshape, Marker]
};


mp.events.addProc('client:job.garbage.trash:get', () => {
   return Visited.length;
});





