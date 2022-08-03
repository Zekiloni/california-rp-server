
interface IWeaponComponents {
   [key: string]: string[]
}

export function getWeaponComponents (player: PlayerMp, weaponHash: number) {
   let playerWeaponComponents: IWeaponComponents = player.getVariable('weaponComponents');
   return playerWeaponComponents.hasOwnProperty(weaponHash);
}

export function hasWeaponComponent (player: PlayerMp, weaponHash: number, componentHash: number) {
}

export function addWeaponComponent (player: PlayerMp, weaponHash: number, componentHash: number) { 

}

export function removeWeaponComponent (player: PlayerMp, weaponHash: number, componentHash: number) {

}

function updatePlayerWeaponComponent (player: PlayerMp, weaponHash: number, componentHash: number, removeComponent: boolean) {

}


function currentWeaponComponents (entity: EntityMp, value: any) {
   if (entity.type == RageEnums.EntityType.PLAYER && entity.handle !== 0) {
      
      let playerWeaponComponent = entity.getVariable('weaponComponents');
   }
}


mp.events.add('updatePlayerWeaponComponents', updatePlayerWeaponComponent);
mp.events.addDataHandler('weaponComponents', currentWeaponComponents);