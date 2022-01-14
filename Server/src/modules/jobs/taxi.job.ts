
// import { Globals } from "../Global/Globals";
// import { Messages } from "../Global/Messages";
// import { Vehicles } from "../../models/vehicle.model";
// import { Settings } from "../../Server/Settings";
// import { NotifyType } from "@Shared/enums";

import { jobDescriptions, jobNames } from '../../globals/constants';
import { job } from '../../globals/enums';
import Jobs from '../../models/job.model';


const taxiJob = new Jobs(
   job.TAXI_DRIVER, 
   jobNames.TAXI, 
   jobDescriptions.TAXI,
   new mp.Vector3(895.1914, -179.3781, 74.7003), 724, 81
);

taxiJob.vehiclePoint = [
   { position: new mp.Vector3(904.9328, -189.1005, 73.4358), rotation: new mp.Vector3(-0.7688, -1.9679, 56.8145) },
   { position: new mp.Vector3(899.4365, -180.4577, 73.4450), rotation: new mp.Vector3(2.4084, 1.1656, -122.1921) },
   { position: new mp.Vector3(908.6395, -183.2149, 73.7698), rotation: new mp.Vector3(-0.1393, -1.0507, 57.1918) }
];




// const Configuration =  {
//    License: 'Taxi',
//    DefaultFare: 0.7,
//    Vehicle: { 
//       Model: 'taxi',
//       Color: [88, 88],
//       Positions: [
//          { Position: new mp.Vector3(920.609863, -163.3442077, 74.42937), Rotation: new mp.Vector3(-1.9573456, -0.5723061, 97.04087066) },
//          { Position: new mp.Vector3(918.337158, -167.2393188, 74.21603), Rotation: new mp.Vector3(-4.0547914, -1.2288916, 101.0878448) },
//          { Position: new mp.Vector3(916.711303, -170.3766021, 74.06708), Rotation: new mp.Vector3(-3.8634297, 0.08858079, 102.3866882) },
//          { Position: new mp.Vector3(911.359313, -163.7295837, 73.95264), Rotation: new mp.Vector3(-1.9030433, 5.18613767, -163.941101) }
//       ]
//    },
//    FareInterval: 30 * 1000
// };


// export class Taxi { 
//    Driver: PlayerMp;
//    Vehicle: VehicleMp;
//    Fare: number;
//    Taximeter: any;
//    Customers: PlayerMp[] // SqlIdevi? Ili PlayerMp[]??

//    static Drivers: Taxi[] = [];

//    constructor (Player: PlayerMp, vehicle: VehicleMp) { 
//       this.Driver = Player;
//       this.Vehicle = vehicle;
//       this.Fare = Configuration.DefaultFare;
//       this.Taximeter = null;
//       this.Customers = [];

//       Taxi.Drivers[Player.Character.id] = this;
//    }

//    static async Start (Player: PlayerMp, haveVehicle: boolean) { 

//       // if (!Character.HasLicense(Configuration.License)) // UKLJUCITI KASNIJE

//       let Vehicle = null;

//       if (haveVehicle == null) { 
//          let AvailablePosition = null;

//          for (const Position of Configuration.Vehicle.Positions) { 
//             if (Main.IsAnyVehAtPos(Position.Position, 1.5).length == 0) {
//                AvailablePosition = Position;
//                break;
//             }
//          }

//          if (AvailablePosition == null) return Player.Notification(Messages.THERE_IS_NO_PLACE_FOR_VEHICLE, NotifyType.ERROR, 5);

//          Vehicle = Vehicles.CreateTemporary(
//             Configuration.Vehicle.Model, 
//             AvailablePosition.Position, AvailablePosition.Rotation, 
//             Configuration.Vehicle.Color, 'TX' + Main.GenerateNumber(100, 999)
//          );

//          (await Vehicle).setVariable('Job', Globals.Jobs.Taxi);
//          (await Vehicle).setVariable('Taximeter', null);

//          // ToDo Player.Instructions('Vaše vozilo sa oznakom '+ (await Vehicle).numberPlate + ' se nalazi na parkingu iza.', 5);

//          Player.setVariable('Job_Vehicle', (await Vehicle).id);
//       } else { 

//          Vehicle = Player.vehicle;

//          if (!Vehicle.numberPlate.includes('TX')) return Player.Notification(Messages.NO_TX_IN_NUMBERPLATE, NotifyType.ERROR, 5);

         
//       }

//       Player.setVariable('Job_Duty', true);

//       //const Shift = new Taxi(Player, Vehicle);

//     //   Shift.EnterVehicle = (Player: PlayerMp, Vehicle: VehicleMp, Seat: number) => { 
//     //      if (Shift.Vehicle == Vehicle && Shift.Driver != Player && Seat != 0) { 
//     //         Player.SendMessage(
//     //            Messages.YOU_ENTERED_TAXI_VEHICLE + Vehicle.numberPlate + Messages.PRICE_PER_MINUTE + Main.Dollars(Shift.Fare) + '.', Globals.Colors.white[2]);
//     //         Shift.Customers.push(Player);
//     //      }
//     //   };
      
      
//     //   Shift.ExitVehicle = (Player: PlayerMp, Vehicle: VehicleMp) => { 
//     //      if (Shift.Vehicle == Vehicle && Shift.Driver != Player) { 
//     //         const Customer = Shift.Customers.find((Target => Target === Player));
//     //         if (!Customer) return Main.Exception(ExceptionType.Null, '[Taxi.ts]', `[Shift.ExitVehicle] charID: ${Player.CHARACTER_ID} `)
//     //         Shift.Customers.splice(Shift.Customers.indexOf(Customer));
//     //      }
//     //   };

//     //   mp.events.add('playerEnterVehicle', Shift.EnterVehicle);
//     //   mp.events.add('playerExitVehicle', Shift.ExitVehicle);
    
//    }

//    static async Stop (Player: PlayerMp) { 

//       if (!Player.getVariable('Job_Duty')) return Player.Notification(Messages.JOB_NOT_STARTED, NotifyType.ERROR, 5);

//       const Character = Player.Character;

//       const vID = Player.getVariable('Job_Vehicle');
//       if (vID) { 
//          // ToDo const Vehicle = TemporaryVehicles[vID];
//          //if (Vehicle) Vehicle.destroy();
//       }

//       Player.setVariable('Job_Duty', false);

//       const Shift = Taxi.Drivers[Character.id];
//     //   mp.events.remove('playerEnterVehicle', Shift.EnterVehicle);
//     //   mp.events.remove('playerExitVehicle', Shift.ExitVehicle);

//    };


//    static Fare (Player: PlayerMp, Price: number) { 

//       if (!Player.getVariable('Job_Duty')) return Player.Notification(Messages.JOB_NOT_STARTED, NotifyType.ERROR, 5);

//       const Shift = Taxi.Drivers[Player.Character.id];

//       if (Shift) { 

//          const Max = Settings.Default.Taximeter + 5, Min = Settings.Default.Taximeter;

//          if (Price > Max || Price < Min) return Player.Notification(Messages.TAXIMETRE_PRICE_RANGE + Min + ' - ' + Max + '.', NotifyType.ERROR, 6);

//          Shift.Fare = Price;

//          Player.Notification(Messages.TAXIMETRE_SETTED_ON + Main.Dollars(Price) + '.', NotifyType.ERROR, 6);

//       }

//    };

//    async StartFare () {
//       this.Vehicle.setVariable('Taximeter', 0);

//       this.Taximeter = setInterval(() => {
         
//          let Current = this.Vehicle.getVariable('Taximeter');
//          Current ++;
//          this.Vehicle.setVariable('Taximeter', Current * this.Fare);
   
//       }, Configuration.FareInterval);
//    };

//    async StopFare () {
//       if (this.Taximeter) {
//          clearInterval(this.Taximeter);
//          this.Taximeter = null;
//       }
//    }

//    async ResetFare () {
//       this.Taximeter = null;
//       this.Vehicle.setVariable('Taximeter', -1);
//    }
// };





