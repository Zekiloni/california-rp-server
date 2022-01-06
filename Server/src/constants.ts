

export namespace Config {
   export const Database = { 
      User: 'root',
      Password: '',
      Host: 'localhost',
      Name: 'mn-rp'
   }

   export const Default = {
      Money: 3000,
      Spawn: new mp.Vector3(-1355.6395, -519.5300, 23.4648),
      Heading: 120
   };

   export const Settings = { 
      Creator: { 
         Position: new mp.Vector3(2.7733354, 525.318298, 170.617156),
         Heading: 0,
         Time: 20
      },
   
      Lobby: { 
         Position: new mp.Vector3(-1765.12, -1111.37, 24.83),
         LookAt: new mp.Vector3(-1690.09, -1081.34, 31.31),
         Time: 23
      },
   }
}


type MarkerColors = {
   [key: string]: RGBA
};

export const MarkerColors: MarkerColors = { 
   Business: [253, 201, 41, 185],
   Faction: [69, 222, 105, 113],
   Job: [254, 213, 46, 70],
   Houses: [199, 0, 0, 70],
   Garages : [255, 255, 255, 70]
};