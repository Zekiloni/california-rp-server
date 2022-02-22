


export default function clickEntity (position: Vector3Mp, ignored: EntityMp): RaycastResult {
   const camera = mp.cameras.new('gameplay');
   const cameraPosition = camera.getCoord()

   return mp.raycasting.testPointToPoint(cameraPosition, position, ignored.handle);
}