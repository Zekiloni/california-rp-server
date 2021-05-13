
const player = mp.players.local;

const InteractionObjects = [
   mp.joaat("prop_rub_binbag_sd_01"),
   mp.joaat("prop_cs_bin_03"),
   mp.joaat("prop_cs_bin_01_skinned"),
   mp.joaat("prop_cs_bin_02"),
   mp.joaat("prop_ld_rub_binbag_01"),
   mp.joaat("prop_cs_bin_01"),
   mp.joaat("prop_rub_binbag_sd_02"),
   mp.joaat("prop_ld_binbag_01"),
   mp.joaat("prop_fbibombbin"),
   mp.joaat("prop_cs_rub_binbag_01"),
   mp.joaat("prop_bin_07bprop_bin_beach_01d"),
   mp.joaat("prop_bin_beach_01d"),
   mp.joaat("prop_bin_01a"),
   mp.joaat("prop_recyclebin_04_a"),
   mp.joaat("prop_bin_beach_01a"),
   mp.joaat("prop_recyclebin_02_c"),
   mp.joaat("prop_bin_delpiero_b"),
   mp.joaat("zprop_bin_01a_old"),
   mp.joaat("prop_recyclebin_03_a"),
   mp.joaat("prop_bin_11a"),
   mp.joaat("prop_bin_06a"),
   mp.joaat("prop_bin_07d"),
   mp.joaat("prop_bin_11"),
   mp.joaat("bprop_bin_04a"),
   mp.joaat("prop_recyclebin_02b"),
   mp.joaat("prop_bin_delpiero"),
   mp.joaat("prop_bin_09a"),
   mp.joaat("prop_bin_08a"),
   mp.joaat("prop_recyclebin_04_b"),
   mp.joaat("prop_bin_02a"),
   mp.joaat("prop_bin_03a"),
   mp.joaat("prop_bin_08open"),
   mp.joaat("prop_bin_12a"),
   mp.joaat("prop_bin_05a"),
   mp.joaat("prop_bin_07a"),
   mp.joaat("prop_recyclebin_01a"),
   mp.joaat("v_serv_tc_bin2_"),
   mp.joaat("v_serv_tc_bin1_"),
   mp.joaat("prop_rub_binbag_03b"),
   mp.joaat("prop_rub_binbag_04"),
   mp.joaat("prop_rub_binbag_08"),
   mp.joaat("prop_rub_binbag_01"),
   mp.joaat("prop_rub_binbag_05"),
   mp.joaat("p_rub_binbag_test"),
   mp.joaat("prop_rub_binbag_06"),
   mp.joaat("prop_rub_binbag_03"),
   mp.joaat("prop_rub_binbag_01b"),
   mp.joaat("hei_prop_heist_binbag"),
   mp.joaat("ng_proc_binbag_01a"),
   mp.joaat("ng_proc_binbag_02a"),
   mp.joaat("p_binbag_01_s")
];



mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
   if (!selectorActive || upOrDown != 'down') return;
   const result = screen2dToWorld3d(x, y);
   
   for (let i in InteractionObjects) {
      let object = mp.game.object.getClosestObjectOfType(result.x, result.y, result.z, 3, i, false, true, true);
      if (InteractionObjects[object.model]) {
         mp.gui.chat.push(`Found ${object.model}`);
      }
      else {
         mp.gui.chat.push('Not found');
      }
   }
 });

function getCameraHitCoord () 
{
   const camera = mp.cameras.new("gameplay"); // gets the current gameplay camera

	let position = camera.getCoord();
	let direction = camera.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
	let hitData = mp.raycasting.testPointToPoint(position, farAway, player);
	
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}
