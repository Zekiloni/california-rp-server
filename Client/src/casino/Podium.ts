let rot = 0;

mp.game.entity.createModelHideExcludingScriptObjects(1100.0177001953125, 220.02122497558594, -49.989967346191406, 10.0, 2733879850, true);

let podium = mp.objects.new(2733879850, new mp.Vector3(1100.0177001953125, 220.02122497558594, -49.989967346191406));

let veh = mp.vehicles.new(mp.game.joaat("neon"), new mp.Vector3(1100.0177001953125, 220.02122497558594, -49.789967346191406),
{
	color: [[255, 0, 0],[255,0,0]],
	locked: true
});

veh.doNotChangeAlpha = true;
veh.freezePosition(true);

let rotatePodiumColshape = mp.colshapes.newSphere(1100.0177001953125, 220.02122497558594, -49.989967346191406, 50.0);

mp.events.add("playerEnterColshape", (shape) => {

	if(shape == rotatePodiumColshape)
	{
		mp.events.add("render", Rotate);
	}
});

mp.events.add("playerExitColshape", (shape) => {

	if(shape == rotatePodiumColshape)
	{
		mp.events.remove("render", Rotate);
	}
});

function Rotate()
{
	rot += 0.05;
	if(rot >= 360) rot = 0;
	podium.rotation = new mp.Vector3(0, 0, rot);
	veh.setHeading(rot);
}