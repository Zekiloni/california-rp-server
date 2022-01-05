

export namespace Config {
   export const Database = { 
      User: 'root',
      Password: '',
      Host: 'localhost',
      Name: 'mn-rp'
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