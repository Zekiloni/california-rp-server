




const Configuration =  {
   License: 'Taxi',
   DefaultFare: 0.7,
   Vehicle: { 
      Model: 'taxi',
      Color: [88, 88],
      Positions: [
         { Position: new mp.Vector3(920.609863, -163.3442077, 74.42937), Rotation: new mp.Vector3(-1.9573456, -0.5723061, 97.04087066) },
         { Position: new mp.Vector3(918.337158, -167.2393188, 74.21603), Rotation: new mp.Vector3(-4.0547914, -1.2288916, 101.0878448) },
         { Position: new mp.Vector3(916.711303, -170.3766021, 74.06708), Rotation: new mp.Vector3(-3.8634297, 0.08858079, 102.3866882) },
         { Position: new mp.Vector3(911.359313, -163.7295837, 73.95264), Rotation: new mp.Vector3(-1.9030433, 5.18613767, -163.941101) }
      ]
   }
};


frp.Taxi = class Taxi { 

   static Drivers = {};

   constructor (player, vehicle) { 
      this.Player = player;
      this.Vehicle = vehicle;
      this.Taximeter = Configuration.DefaultFare;
      this.Customers = [];

      Taxi.Drivers[player.character] = this;
   }


   static async Start (Player, haveVehicle) { 

      const Character = await Player.Character();

      // if (!Character.HasLicense(Configuration.License)) // UKLJUCITI KASNIJE

      let Vehicle = null;

      if (haveVehicle = null) { 
         let AvailablePosition = null;

         for (const Position of Configuration.Vehicle.Positions) { 
            if (frp.Main.IsAnyVehAtPos(Position.Position, 1.5).length == 0) {
               AvailablePosition = Position;
               break;
            }
         }

         if (AvailablePosition == null) return Player.Notification(frp.Globals.messages.THERE_IS_NO_PLACE_FOR_VEHICLE, frp.Globals.Notification.Error, 5);

         Vehicle = frp.Vehicles.CreateTemporary(
            Configuration.Vehicle.Model, 
            AvailablePosition, Configuration.Vehicle.Rotation, 
            Configuration.Vehicle.Color, 'TX' + frp.Main.GenerateNumber(4)
         );

         Player.setVariable('Job_Vehicle', Vehicle.id);
      } else { 

         if (Vehicle.numberPlate.includes('TX')) { 

         } else { 
            /// PORUKA: Nemate dozvolu za taksi
         }

      }

      Player.setVariable('Job_Duty', true);

      const Shift = new Taxi(Player, Vehicle);
      mp.events.add('playerEnterVehicle', Shift.EnterVehicle);
      mp.events.add('playerExitVehicle', Shift.ExitVehicle);

   }

   static async Stop (Player) { 

      if (Player.getVariable('Job_Duty')) return Player.Notification(frp.Globals.messages.JOB_NOT_STARTED, frp.Globals.Notification.Error, 5);

      const Character = await Player.Character();

      const vID = Player.getVariable('Job_Vehicle');
      if (vID) { 
         const Vehicle = frp.GameObjects.TemporaryVehicles[vID];
         if (Vehicle) Vehicle.destroy();
      }

      Player.setVariable('Job_Duty', false);

      const Shift = Taxi.Drivers[Character.id];
      mp.events.remove('playerEnterVehicle', Shift.EnterVehicle);
      mp.events.remove('playerExitVehicle', Shift.ExitVehicle);

   };
};


frp.Taxi.prototype.EnterVehicle = function (Player, Vehicle, Seat) { 
   if (this.Vehicle == Vehicle && this.Player != Player) { 
      this.Customers.push(Player);
   }
};


frp.Taxi.prototype.ExitVehicle = function (Player, Vehicle) { 
   if (this.Vehicle == Vehicle && this.Player != Player) { 
      const Customer = this.Customers.find((Target => Target === Player));
      this.Customers.splice(this.Customers.indexOf(Customer));
   }
};