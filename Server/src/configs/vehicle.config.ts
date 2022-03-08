


export namespace VehicleConfig {

   export enum type { 
      OWNED, FACTION, BUSINES, JOB, DMV, ADMIN
   }

   export enum FuelType {
      NONE, DIESEL, PETROL, HIBRYD, ELECTRIC
   }

   export enum category {
      COMPACTS,
      SEDANS,
      SUVS,
      COUPES,
      MUSCLE,
      SPORTS_CLASSICS,
      SPORTS,
      SUPER,
      MOTORCYCLES,
      OFF_ROAD,
      INDUSTRIAL,
      UTILITY,
      VANS,
      CYCLES,
      BOATS,
      HELICOPTERS,
      PLANES,
      SERVICE,
      EMERGENCY,
      MILITARY,
      COMMERCIAL,
      TRAINS,
      OPEN_WHEELS
   }


   export const models = {       
      // BOATS 
      "dinghy": { price: 45000, fuel: FuelType.PETROL, reservoir: 30, trunk: 30 },
      "dinghy2": { price: 60000, fuel: FuelType.PETROL, reservoir: 30, trunk: 30 },
      "jetmax": { price: 350000, fuel: FuelType.PETROL, reservoir: 90, trunk: 50 },
      "marquis": { price: 450000, fuel: FuelType.PETROL, reservoir: 200, trunk: 120 },
      "seashark": { price: 21000, fuel: FuelType.PETROL, reservoir: 20, trunk: 10 },
      "seashark3": { price: 21000, fuel: FuelType.PETROL, reservoir: 20, trunk: 10 },
      "speeder": { price: 360000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "speeder2": { price: 360000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "squalo": { price: 75000, fuel: FuelType.PETROL, reservoir: 80, trunk: 30 },
      "toro2": { price: 400000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "tropic": { price: 170000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "tug": { price: 120000, fuel: FuelType.PETROL, reservoir: 200, trunk: 100 },


      // Commercials,
      "benson": { price: 135000, fuel: FuelType.DIESEL, reservoir: 100, trunk: 90 },
      "hauler": { price: 96000, fuel: FuelType.DIESEL, reservoir: 100, trunk: 10 },
      "mule": { price: 102000, fuel: FuelType.DIESEL, reservoir: 90, trunk: 70 },
      "mule3": { price: 104500, fuel: FuelType.DIESEL, reservoir: 90, trunk: 70 },
      "packer": { price: 116000, fuel: FuelType.PETROL, reservoir: 120, trunk: 20 },
      "phantom": { price: 129100, fuel: FuelType.PETROL, reservoir: 120, trunk: 20 },
      "pounder": { price: 151000, fuel: FuelType.PETROL, reservoir: 100, trunk: 90 },

      // COMPACTS
      "asbo": { price: 26000, fuel: FuelType.DIESEL, reservoir: 45, trunk: 30 },
      "blista": { price: 40000, fuel: FuelType.DIESEL, reservoir: 45, trunk: 30 },
      "brioso": { price: 46700, fuel: FuelType.DIESEL, reservoir: 45, trunk: 30 },
      "club": { price: 67700, fuel: FuelType.DIESEL, reservoir: 45, trunk: 30 },
      "dilettante": { price: 360e00, fuel: FuelType.ELECTRIC, reservoir: 60, trunk: 30 },
      "kanjo": { price: 65200, fuel: FuelType.DIESEL, reservoir: 55, trunk: 30 },
      "issi2": { price: 42500, fuel: FuelType.DIESEL, reservoir: 48, trunk: 30 },
      "panto": { price: 42500, fuel: FuelType.ELECTRIC, reservoir: 45, trunk: 10 },
      "prairie": { price: 52900, fuel: FuelType.PETROL, reservoir: 55, trunk: 40 },
      "rhapsody": { price: 30000, fuel: FuelType.DIESEL, reservoir: 48, trunk: 30 },

      // COUPES
      "cogcabrio": { price: 300100, fuel: FuelType.PETROL, reservoir: 65, trunk: 40 },
      "exemplar": { price: 185000, fuel: FuelType.PETROL, reservoir: 60, trunk: 40 },
      "f620": { price: 235000, fuel: FuelType.PETROL, reservoir: 60, trunk: 40 },
      "felon": { price: 155500, fuel: FuelType.PETROL, reservoir: 60, trunk: 40 },
      "felon2": { price: 195000, fuel: FuelType.PETROL, reservoir: 60, trunk: 40 },
      "jacka1": { price: 102000, fuel: FuelType.DIESEL, reservoir: 58, trunk: 40 },
      "oracle2": { price: 195000, fuel: FuelType.PETROL, reservoir: 65, trunk: 50 },
      "sentinel": { price: 95000, fuel: FuelType.PETROL, reservoir: 70, trunk: 50 },
      "sentinel2": { price: 111500, fuel: FuelType.PETROL, reservoir: 70, trunk: 50 },
      "windsor": { price: 350500, fuel: FuelType.PETROL, reservoir: 75, trunk: 50 },
      "windsor2": { price: 362000, fuel: FuelType.PETROL, reservoir: 75, trunk: 50 },
      "zion": { price: 105000, fuel: FuelType.PETROL, reservoir: 70, trunk: 50 },
      "zion2": { price: 117000, fuel: FuelType.PETROL, reservoir: 70, trunk: 50 },
      "previon": { price: 114000, fuel: FuelType.PETROL, reservoir: 67, trunk: 50 },

      // CYCLES
      "bmx": { price: 1500, fuel: FuelType.NONE, reservoir: 0, trunk: 10 },
      "cruiser": { price: 1900, fuel: FuelType.NONE, reservoir: 0, trunk: 10 },
      "scorcher": { price: 3000, fuel: FuelType.NONE, reservoir: 0, trunk: 10 },
      "tribike": { price: 3800, fuel: FuelType.NONE, reservoir: 0, trunk: 10 },
      "tribike2": { price: 3800, fuel: FuelType.NONE, reservoir: 0, trunk: 10 },
      "tribike3": { price: 3800, fuel: FuelType.NONE, reservoir: 0, trunk: 10 },


      // HELICOPTERS,
      "buzzard2": { price: 660000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "maverick": { price: 760000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "frogger": { price: 810000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "supervolito": { price: 1090000, fuel: FuelType.PETROL, reservoir: 120, trunk: 50 },
      "supervolito2": { price: 1200000, fuel: FuelType.PETROL, reservoir: 120, trunk: 50 },
      "swift": { price: 1020000, fuel: FuelType.PETROL, reservoir: 120, trunk: 50 },
      "swift2": { price: 2000000, fuel: FuelType.PETROL, reservoir: 100, trunk: 50 },
      "volatus": { price: 1800000, fuel: FuelType.PETROL, reservoir: 120, trunk: 50 },

      // Motorcycles,
      "faggio": { price: 8000, fuel: FuelType.PETROL, reservoir: 15, trunk: 20 },
      "faggio2": { price: 6000, fuel: FuelType.PETROL, reservoir: 15, trunk: 20 },
      "faggio3": { price: 8200, fuel: FuelType.PETROL, reservoir: 15, trunk: 20 },
      "akuma": { price: 75000, fuel: FuelType.PETROL, reservoir: 22, trunk: 20 },
      "bati": { price: 114000, fuel: FuelType.PETROL, reservoir: 22, trunk: 20 },
      "bf400": { price: 34000, fuel: FuelType.PETROL, reservoir: 18, trunk: 20 },
      "carbonrs": { price: 62000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "diablous": { price: 51000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "diablous2": { price: 59000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "double": { price: 63000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "enduro": { price: 23000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "esskey": { price: 41000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "fcr": { price: 69000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "hakuchou": { price: 95000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "manchez": { price: 28500, fuel: FuelType.PETROL, reservoir: 16, trunk: 20 },
      "nemesis": { price: 42500, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "nightblade": { price: 62500, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "pcj": { price: 32500, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "stryder": { price: 74500, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "ruffian": { price: 48000, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "sanchez2": { price: 28000, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "thrust": { price: 80000, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "vader": { price: 42000, fuel: FuelType.PETROL, reservoir: 17, trunk: 20 },
      "vindicator": { price: 85000, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "avarus": { price: 62500, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "bagger": { price: 42000, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "chimera": { price: 75000, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "cliffhanger": { price: 90000, fuel: FuelType.PETROL, reservoir: 19, trunk: 20 },
      "daemon": { price: 50000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "daemon2": { price: 52500, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "hexer": { price: 31000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "ratbike": { price: 11000, fuel: FuelType.PETROL, reservoir: 14, trunk: 20 },
      "sovereign": { price: 66000, fuel: FuelType.PETROL, reservoir: 18, trunk: 20 },
      "wolfsbane": { price: 50000, fuel: FuelType.PETROL, reservoir: 18, trunk: 20 },
      "zombiea": { price: 35000, fuel: FuelType.PETROL, reservoir: 18, trunk: 20 },
      "zombieb": { price: 32000, fuel: FuelType.PETROL, reservoir: 18, trunk: 20 },

      // Muscle,

      "blade": { price: 60000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "buccaneer": { price: 57000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "chino": { price: 41000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "chino2": { price: 49800, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "clique": { price: 85000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "deviant": { price: 230000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "dominator": { price: 125000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "dominator3": { price: 246000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "dukes": { price: 90000, fuel: FuelType.PETROL, reservoir: 70, trunk: 50 },
      "faction": { price: 25000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "faction2": { price: 34000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "ellie": { price: 155000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "gauntlet": { price: 91000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "gauntlet3": { price: 101000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "gauntlet4": { price: 155000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "hermes": { price: 100000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "impaler": { price: 121000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "lurcher": { price: 49000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "moonbeam": { price: 50000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "moonbeam2": { price: 55000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "nightshade": { price: 121000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "phoenix": { price: 91000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "picador": { price: 25000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 70 },
      "ratloader2": { price: 37000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 70 },
      "ruiner": { price: 55000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "ruiner2": { price: 78000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "sabregt": { price: 68000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "sabregt2": { price: 85000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "slamvan": { price: 37000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 70 },
      "slamvan2": { price: 41000, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "slamvan3": { price: 53500, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "stalion": { price: 55500, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "tampa": { price: 40000, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "tampa3": { price: 51000, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "tulip": { price: 52000, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "vamos": { price: 48000, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "vigero": { price: 40000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "virgo": { price: 39000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "virgo2": { price: 49000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "virgo3": { price: 41000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "voodoo": { price: 30000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "yosemite": { price: 28500, fuel: FuelType.PETROL, reservoir: 55, trunk: 70 },
      "dominator7": { price: 190500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },

      // OFF ROAD,
      "bifta": { price: 37500, fuel: FuelType.PETROL, reservoir: 40, trunk: 40 },
      "blazer": { price: 11500, fuel: FuelType.PETROL, reservoir: 25, trunk: 10 },
      "blazer2": { price: 11500, fuel: FuelType.PETROL, reservoir: 25, trunk: 10 },
      "blazer4": { price: 34000, fuel: FuelType.PETROL, reservoir: 25, trunk: 10 },
      "bodhi2": { price: 34000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "caracara2": { price: 114500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "dubsta3": { price: 344100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "dune": { price: 37500, fuel: FuelType.PETROL, reservoir: 40, trunk: 20 },
      "hellion": { price: 85000, fuel: FuelType.PETROL, reservoir: 40, trunk: 20 },
      "kalahari": { price: 37500, fuel: FuelType.PETROL, reservoir: 40, trunk: 20 },
      "outlaw": { price: 77500, fuel: FuelType.PETROL, reservoir: 40, trunk: 50 },
      "rebel": { price: 42500, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "rebel2": { price: 44500, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "sandiking2": { price: 70000, fuel: FuelType.PETROL, reservoir: 40, trunk: 50 },
      "verus": { price: 24500, fuel: FuelType.PETROL, reservoir: 25, trunk: 10 },


      // PLANES,
      "cuban800": { price: 4200000, fuel: FuelType.PETROL, reservoir: 200, trunk: 70 },
      "dodo": { price: 400000, fuel: FuelType.PETROL, reservoir: 200, trunk: 70 },
      "duster": { price: 300000, fuel: FuelType.PETROL, reservoir: 200, trunk: 70 },
      "mammatus": { price: 320000, fuel: FuelType.PETROL, reservoir: 200, trunk: 70 },
      "nimbus": { price: 950000, fuel: FuelType.PETROL, reservoir: 300, trunk: 70 },
      "velum": { price: 490000, fuel: FuelType.PETROL, reservoir: 200, trunk: 70 },
      "velum2": { price: 500000, fuel: FuelType.PETROL, reservoir: 200, trunk: 70 },
      "vestra": { price: 800000, fuel: FuelType.PETROL, reservoir: 300, trunk: 70 },
      "luxor": { price: 1900000, fuel: FuelType.PETROL, reservoir: 300, trunk: 70 },


      // SUVs,
      "baller": { price: 50000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "baller2": { price: 101000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "baller3": { price: 125000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "baller4": { price: 135000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "fq2": { price: 90000, fuel: FuelType.PETROL, reservoir: 55, trunk: 60 },
      "cavalcade": { price: 44000, fuel: FuelType.PETROL, reservoir: 55, trunk: 60 },
      "cavalcade2": { price: 80500, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "contender": { price: 270100, fuel: FuelType.PETROL, reservoir: 70, trunk: 80 },
      "dubsta": { price: 10500, fuel: FuelType.PETROL, reservoir: 70, trunk: 70 },
      "dubsta2": { price: 15100, fuel: FuelType.PETROL, reservoir: 70, trunk: 70 },
      "granger": { price: 78000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "gresley": { price: 80000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "habanero": { price: 49000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "huntley": { price: 190000, fuel: FuelType.PETROL, reservoir: 70, trunk: 70 },
      "landstaker": { price: 70000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "landstaker2": { price: 110000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "mesa": { price: 66000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "novak": { price: 200000, fuel: FuelType.PETROL, reservoir: 65, trunk: 60 },
      "patriot": { price: 120000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "rebla": { price: 222500, fuel: FuelType.PETROL, reservoir: 65, trunk: 60 },
      "rocoto": { price: 105000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "seminole": { price: 35000, fuel: FuelType.PETROL, reservoir: 65, trunk: 70 },
      "seminole2": { price: 30000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "serrano": { price: 90500, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "toros": { price: 310000, fuel: FuelType.PETROL, reservoir: 85, trunk: 70 },
      "xls": { price: 120000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },


      // SEDANS,
      "regina": { price: 25000, fuel: FuelType.DIESEL, reservoir: 75, trunk: 80 },
      "asea": { price: 20000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 80 },
      "asterope": { price: 27500, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "cog55": { price: 118500, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "emperor": { price: 25000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 80 },
      "fugitive": { price: 58000, fuel: FuelType.PETROL, reservoir: 55, trunk: 60 },
      "glendale": { price: 25000, fuel: FuelType.PETROL, reservoir: 55, trunk: 80 },
      "ingot": { price: 42000, fuel: FuelType.PETROL, reservoir: 55, trunk: 80 },
      "intrunder": { price: 60000, fuel: FuelType.PETROL, reservoir: 55, trunk: 60 },
      "premier": { price: 55000, fuel: FuelType.PETROL, reservoir: 55, trunk: 60 },
      "primo": { price: 34000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "remero": { price: 35000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 120 },
      "stanier": { price: 37000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "stratum": { price: 61000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "stretch": { price: 215000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "superd": { price: 350000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "surge": { price: 54000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "tailgater": { price: 75000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "warrener": { price: 55000, fuel: FuelType.DIESEL, reservoir: 55, trunk: 60 },
      "washington": { price: 82700, fuel: FuelType.PETROL, reservoir: 55, trunk: 60 },
      "tailgater2": { price: 110000, fuel: FuelType.PETROL, reservoir: 55, trunk: 60 },

      // Service,
      "bus": { price: 114000, fuel: FuelType.PETROL, reservoir: 90, trunk: 60 },
      "coach": { price: 114000, fuel: FuelType.PETROL, reservoir: 90, trunk: 60 },
      "rentalbus": { price: 60000, fuel: FuelType.PETROL, reservoir: 90, trunk: 60 },
      "taxi": { price: 36000, fuel: FuelType.PETROL, reservoir: 90, trunk: 60 },

      // UTILITY,
      "caddy": { price: 11500, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "caddy2": { price: 8000, fuel: FuelType.PETROL, reservoir: 20, trunk: 20 },
      "forklift": { price: 8000, fuel: FuelType.PETROL, reservoir: 20, trunk: 10 },
      "sadler": { price: 39500, fuel: FuelType.PETROL, reservoir: 70, trunk: 60 },
      "scrap": { price: 40500, fuel: FuelType.PETROL, reservoir: 70, trunk: 100 },
      "towtruck": { price: 40000, fuel: FuelType.PETROL, reservoir: 70, trunk: 70 },
      "towtruck2": { price: 32500, fuel: FuelType.PETROL, reservoir: 90, trunk: 70 },
      "utillitruck2": { price: 89400, fuel: FuelType.PETROL, reservoir: 90, trunk: 70 },
      "utillitruck3": { price: 70500, fuel: FuelType.PETROL, reservoir: 90, trunk: 70 },
      "slamtruck": { price: 70500, fuel: FuelType.PETROL, reservoir: 90, trunk: 70 },

      // SPORTS,

      "alpha": { price: 120000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "banshee": { price: 290000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "bestiagts": { price: 402000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "blista2": { price: 32000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "buffalo": { price: 70000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "carbonizzare": { price: 312000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "comet2": { price: 212000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "comet3": { price: 270000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "comet5": { price: 300000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "coquette": { price: 250000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "coquette4": { price: 410000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "drafter": { price: 340000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "elegy": { price: 310000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "elegy2": { price: 205000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "feltzer2": { price: 180000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "flashgt": { price: 222000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "furoregt": { price: 310000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "fusilade": { price: 78000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "futo": { price: 60000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "komoda": { price: 155000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "imorgon": { price: 380000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "issi7": { price: 45000, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "italigto": { price: 41000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "jugular": { price: 38000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "jester": { price: 33000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "jester3": { price: 24000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "khamelion": { price: 21000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "huruma": { price: 15000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "lynx": { price: 22800, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "massacro": { price: 30800, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "neon": { price: 550000, fuel: FuelType.ELECTRIC, reservoir: 60, trunk: 50 },
      "ninef": { price: 27000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "ninef2": { price: 29000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "paragon": { price: 48000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "pariah": { price: 710000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "penumbra": { price: 45000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "penumbra2": { price: 200000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "raiden": { price: 400000, fuel: FuelType.ELECTRIC, reservoir: 60, trunk: 50 },
      "rapidgt": { price: 215500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "rapidgt2": { price: 245500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "revolter": { price: 210500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "schafter2": { price: 190500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "schafter4": { price: 250500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "schlagen": { price: 350100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "schwarzer": { price: 155500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "sentinel3": { price: 108500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "seven70": { price: 310500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "specter": { price: 310100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "streiter": { price: 108100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "sugoi": { price: 108100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "sultan": { price: 70100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "sultan2": { price: 12500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "surano": { price: 29500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "vstr": { price: 108500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "zr380": { price: 205500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "z350": { price: 105500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "italirsx": { price: 350100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "calico": { price: 220100, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "futo2": { price: 62500, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "euros": { price: 190000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "jester4": { price: 222222, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "remus": { price: 109000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "comet6": { price: 310000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "growler": { price: 314000, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "vectre": { price: 180500, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "cypher": { price: 192222, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "sultan3": { price: 12900, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "rt3000": { price: 12000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },

      // SPORTS CLASSIC,

      "cheetah2": { price: 60000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "coquette2": { price: 235000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "gt500": { price: 400000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "infernus2": { price: 320000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "manana": { price: 35000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "manana2": { price: 42000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "nebula": { price: 102500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "peyote": { price: 102500, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "peyote3": { price: 112200, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "rapidgt3": { price: 195500, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "retinue": { price: 122500, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "sevestra": { price: 185500, fuel: FuelType.PETROL, reservoir: 55, trunk: 50 },
      "tornado": { price: 42500, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "tornado2": { price: 45500, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "tornado5": { price: 48500, fuel: FuelType.PETROL, reservoir: 50, trunk: 50 },
      "z190": { price: 240500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "zion3": { price: 90000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "cheburek": { price: 92000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },

      //SUPER,

      "adder": { price: 780000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "banshee2": { price: 380000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "bullet": { price: 600000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "entity2": { price: 800000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "entityxf": { price: 650000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "furia": { price: 800000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "gp1": { price: 550000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "infernus": { price: 410500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "nero": { price: 810000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "nero2": { price: 900000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "osiris": { price: 550000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "reaper": { price: 600500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "sc1": { price: 550000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "sultanrs": { price: 333000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "t20": { price: 550000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "taipan": { price: 750000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "tempesta": { price: 550000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "thrax": { price: 990500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "turismor": { price: 550000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "tyrant": { price: 725000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "vacca": { price: 550000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "visione": { price: 945500, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "voltic": { price: 850000, fuel: FuelType.ELECTRIC, reservoir: 60, trunk: 50 },
      "xa21": { price: 540000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },
      "zentorno": { price: 495000, fuel: FuelType.PETROL, reservoir: 60, trunk: 50 },

      // VANS,

      "bisong": { price: 61000, fuel: FuelType.PETROL, reservoir: 70, trunk: 80 },
      "bison2": { price: 65000, fuel: FuelType.PETROL, reservoir: 70, trunk: 80 },
      "bison3": { price: 69000, fuel: FuelType.PETROL, reservoir: 70, trunk: 80 },
      "bobcatxl": { price: 61000, fuel: FuelType.PETROL, reservoir: 70, trunk: 80 },
      "boxville": { price: 67000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "boxville2": { price: 67500, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "boxville3": { price: 67500, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "boxville4": { price: 67500, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "burrito": { price: 77500, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "burrito2": { price: 78000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "burrito3": { price: 78500, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "burrito4": { price: 77500, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "camper": { price: 55500, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "gburrito": { price: 111000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "gburrito2": { price: 111000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "journey": { price: 25000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "minivan": { price: 30000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "paradise": { price: 57000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "pony": { price: 60000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "pony2": { price: 65000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "rumpo": { price: 55000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "rumpo3": { price: 55000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "speedo": { price: 66000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 },
      "speedo4": { price: 64000, fuel: FuelType.PETROL, reservoir: 70, trunk: 120 }
   }
}