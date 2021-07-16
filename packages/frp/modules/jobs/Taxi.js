




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
   },
   FareInterval: 30 * 1000
};


frp.Taxi = class Taxi { 

   static Drivers = {};

   constructor (player, vehicle) { 
      this.Driver = player;
      this.Vehicle = vehicle;
      this.Fare = Configuration.DefaultFare;
      this.Taximeter = null;
      this.Customers = [];

      Taxi.Drivers[player.character] = this;
   }

   static async Start (Player, haveVehicle) { 

      const Character = await Player.Character();

      // if (!Character.HasLicense(Configuration.License)) // UKLJUCITI KASNIJE

      let Vehicle = null;

      if (haveVehicle == null) { 
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
            AvailablePosition.Position, AvailablePosition.Rotation, 
            Configuration.Vehicle.Color, 'TX' + frp.Main.GenerateNumber(4)
         );

         Vehicle.setVariable('Job', frp.Globals.Jobs.Taxi);
         Vehicle.setVariable('Taximeter', null);

         Player.Instructions('Vaše vozilo sa oznakom '+ Vehicle.numberPlate + ' se nalazi na parkingu iza.', 5);

         Player.setVariable('Job_Vehicle', Vehicle.id);
      } else { 

         Vehicle = Player.vehicle;

         if (!Vehicle.numberPlate.includes('TX')) return Player.Notification(frp.Globals.messages.NO_TX_IN_NUMBERPLATE, frp.Globals.Notification.Error, 5);

         
      }

      Player.setVariable('Job_Duty', true);

      const Shift = new Taxi(Player, Vehicle);

      Shift.EnterVehicle = (Player, Vehicle, Seat) => { 
         if (Shift.Vehicle == Vehicle && Shift.Driver != Player && Seat != 0) { 
            Player.SendMessage(
               frp.Globals.messages.YOU_ENTERED_TAXI_VEHICLE + Vehicle.numberPlate + frp.Globals.messages.PRICE_PER_MINUTE + frp.Main.Dollars(Shift.Fare) + '.', frp.Globals.Colors.white[2]);
            Shift.Customers.push(Player);
         }
      };
      
      
      Shift.ExitVehicle = (Player, Vehicle) => { 
         if (Shift.Vehicle == Vehicle && Shift.Driver != Player) { 
            const Customer = Shift.Customers.find((Target => Target === Player));
            Shift.Customers.splice(Shift.Customers.indexOf(Customer));
         }
      };

      mp.events.add('playerEnterVehicle', Shift.EnterVehicle);
      mp.events.add('playerExitVehicle', Shift.ExitVehicle);
    
   }

   static async Stop (Player) { 

      if (!Player.getVariable('Job_Duty')) return Player.Notification(frp.Globals.messages.JOB_NOT_STARTED, frp.Globals.Notification.Error, 5);

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


   static Fare (Player, Price) { 

      if (!Player.getVariable('Job_Duty')) return Player.Notification(frp.Globals.messages.JOB_NOT_STARTED, frp.Globals.Notification.Error, 5);

      const Shift = Taxi.Drivers[Player.character];

      if (Shift) { 

         const Max = frp.Settings.default.Taximeter + 5, Min = frp.Settings.default.Taximeter;

         if (Price > Max || Price < Min) return Player.Notification(frp.Globals.messages.TAXIMETRE_PRICE_RANGE + Min + ' - ' + Max + '.', frp.Globals.Notification.Error, 6);

         Shift.Fare = Price;

         Player.Notification(frp.Globals.messages.TAXIMETRE_SETTED_ON + frp.Main.Dollars(Price) + '.', frp.Globals.Notification.Error, 6);

      }

   };
};


frp.Taxi.prototype.StartFare = function () {

   this.Vehicle.setVariable('Taximeter', 0);

   this.Taximeter = setInterval(() => {
      
      let Current = this.Vehicle.getVariable('Taximeter');
      Current ++;
      this.Vehicle.setVariable('Taximeter', Current * this.Fare);

   }, Configuration.FareInterval);

};

frp.Taxi.prototype.StopFare = function () { 
   clearInterval(this.Taximeter);
   this.Taximeter = null;
};

frp.Taxi.prototype.ResetFare = function () { 

   this.Taximeter = null;
   this.Vehicle.setVariable('Taximeter', null);

};



