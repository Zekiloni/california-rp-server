

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