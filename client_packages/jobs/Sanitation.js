

const Player = mp.players.local;

const Max = 25, TrashAttachment = { Model: 628215202, Bone: 6286, Offset: { X: 0, Y: 0, Z: 0, rX: 0, rY: 0, rZ: 0} };
let Picked = false, Truck = undefined, Visited = [];

const InteractionObjects = [
   mp.game.joaat("prop_rub_binbag_sd_01"),
   mp.game.joaat("prop_cs_bin_03"),
   mp.game.joaat("prop_cs_bin_01_skinned"),
   mp.game.joaat("prop_cs_bin_02"),
   mp.game.joaat("prop_ld_rub_binbag_01"),
   mp.game.joaat("prop_cs_bin_01"),
   mp.game.joaat("prop_rub_binbag_sd_02"),
   mp.game.joaat("prop_ld_binbag_01"),
   mp.game.joaat("prop_fbibombbin"),
   mp.game.joaat("prop_cs_rub_binbag_01"),
   mp.game.joaat("prop_bin_07bprop_bin_beach_01d"),
   mp.game.joaat("prop_bin_beach_01d"),
   mp.game.joaat("prop_bin_01a"),
   mp.game.joaat("prop_recyclebin_04_a"),
   mp.game.joaat("prop_bin_beach_01a"),
   mp.game.joaat("prop_recyclebin_02_c"),
   mp.game.joaat("prop_bin_delpiero_b"),
   mp.game.joaat("zprop_bin_01a_old"),
   mp.game.joaat("prop_recyclebin_03_a"),
   mp.game.joaat("prop_bin_11a"),
   mp.game.joaat("prop_bin_06a"),
   mp.game.joaat("prop_bin_07d"),
   mp.game.joaat("prop_bin_11"),
   mp.game.joaat("bprop_bin_04a"),
   mp.game.joaat("prop_recyclebin_02b"),
   mp.game.joaat("prop_bin_delpiero"),
   mp.game.joaat("prop_bin_09a"),
   mp.game.joaat("prop_bin_08a"),
   mp.game.joaat("prop_recyclebin_04_b"),
   mp.game.joaat("prop_bin_02a"),
   mp.game.joaat("prop_bin_03a"),
   mp.game.joaat("prop_bin_08open"),
   mp.game.joaat("prop_bin_12a"),
   mp.game.joaat("prop_bin_05a"),
   mp.game.joaat("prop_bin_07a"),
   mp.game.joaat("prop_recyclebin_01a"),
   mp.game.joaat("v_serv_tc_bin2_"),
   mp.game.joaat("v_serv_tc_bin1_"),
   mp.game.joaat("prop_rub_binbag_03b"),
   mp.game.joaat("prop_rub_binbag_04"),
   mp.game.joaat("prop_rub_binbag_08"),
   mp.game.joaat("prop_rub_binbag_01"),
   mp.game.joaat("prop_rub_binbag_05"),
   mp.game.joaat("p_rub_binbag_test"),
   mp.game.joaat("prop_rub_binbag_06"),
   mp.game.joaat("prop_rub_binbag_03"),
   mp.game.joaat("prop_rub_binbag_01b"),
   mp.game.joaat("hei_prop_heist_binbag"),
   mp.game.joaat("ng_proc_binbag_01a"),
   mp.game.joaat("ng_proc_binbag_02a"),
   mp.game.joaat("p_binbag_01_s"),
   mp.game.joaat('prop_forsale_lrg_04')
];
  

mp.keys.bind(0x59, false, function() {
   if (player.logged && player.spawned) { 
      if (player.vehicle || player.cuffed || mp.players.local.isTypingInTextChat) return;
      
      if (!Picked) {
         if (Visited.length < Max) {
            let position = player.position;
            for (let i in InteractionObjects) {
               let model = InteractionObjects[i];
               let object = mp.game.object.getClosestObjectOfType(position.x, position.y, position.z, 1, model, false, true, true);
               if (object && model) {
                  // Napraviti proveru da li je kanta, kontejner ili kesa
                  // Uzima smece sa poda animacija 
                  // dict: pickup_object , pickup_low, 
                  mp.gui.chat.push('Trash Found. Total: ' + Visited.length);
                  Interact();
                  Visited.push(object);
                  break;
               }
               else return;
            }
         }
         else {
            // Deponija
         }
      } else {
         const Truck = player.getVariable('Job_Veh');
         if (Truck) {
            const PosBehind = Truck.getOffsetFromInWorldCoords(0.0, -3.8, 0.0);
            if (Utils.Distance(player.position, PosBehind) <= 0.5) {
               player.heading = Truck.heading;
               // Baca smece u kamion animacija
               // anim@heists@narcotics@trash throw_ranged_a_bin_bag
            }
         }
      }
   }
});

function Interact () {
   Picked = !Picked;
   Picked ? mp.events.callRemote('server:player.attachment', TrashAttachment) : mp.events.callRemote('server:player.attachment', false);
}




