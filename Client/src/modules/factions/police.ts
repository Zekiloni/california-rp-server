import { Browser } from '../../browser';






class ALPR { 
   toggle: Boolean = false;

   constructor () { 
      mp.events.add(RageEnums.EventKey.PLAYER_LEAVE_VEHICLE, (vehicle: VehicleMp, seat: number) => { 
         if (this.toggle) { 
            this.setToggle(false);
         }
      });

      mp.keys.bind(0x28, true, () => {
         this.setToggle(!this.toggle);
      });
   }

   getInfo () {
      if (mp.players.local.vehicle) { 
         const playerVehicle = mp.players.local.vehicle;
         
         const startForwardPosition = mp.players.local.vehicle.getOffsetFromInWorldCoords(0, 2.5, 0);
         const startBehindPosition = mp.players.local.vehicle.getOffsetFromInWorldCoords(0, -2.5, 0);

         const forwardPosition = playerVehicle.getOffsetFromInWorldCoords(0, 25, 0.15);
         const behindPosition = playerVehicle.getOffsetFromInWorldCoords(0, -25, 0.15);


         const forward = mp.raycasting.testPointToPoint(startForwardPosition, forwardPosition);
         const behind = mp.raycasting.testPointToPoint(startBehindPosition, behindPosition);

         if (forward && forward.entity && forward.entity.type == 'vehicle') { 
            mp.game.graphics.drawLine(startForwardPosition.x, startForwardPosition.y, startForwardPosition.z + 0.5, forwardPosition.x, forwardPosition.y, forwardPosition.z, 255, 255, 255, 255);
   
            Browser.call(
               'BROWSER::ALPR', 
               'forward', 
               mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(forward.entity.model)), 
               (forward.entity.getSpeed() + 3.6),
               (<VehicleMp>forward.entity).getNumberPlateText()
            );
            
         } else { 

         }

         // if (behindVehicle.entity && behindVehicle.entity.type == 'vehicle') { 
         //    mp.game.graphics.drawLine(position.x, position.y, position.z + 0.5, behindPosition.x, behindPosition.y, behindPosition.z, 255, 255, 255, 255);

         // }

      }
   }

   setToggle (toggle: boolean) { 
      this.toggle = toggle;
      
      if (this.toggle) { 
         Browser.call('BROWSER::SHOW', 'ALPR');
         mp.events.add('render', this.getInfo);
      } else { 
         Browser.call('BROWSER::HIDE', 'ALPR');
         mp.events.remove('render', this.getInfo);
      }
   }
}

new ALPR();