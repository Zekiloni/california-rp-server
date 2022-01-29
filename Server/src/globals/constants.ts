


export const Ranks:string[] = [
   'Player', 
   'Helper', 
   'Junior Admin', 
   'Admin',
   'Senior Admin', 
   'General Admin', 
   'Lead Admin', 
   'Community Owner'
];


export const Colors = {
   White: ['F8F8F8', 'DEDEDE', 'BDBDBD', 'A3A2A2', '909090'],
   Low: ['BDBDBD', 'DEDEDE', 'A3A2A2', '909090', '909090'],
   Vehicle: ['DEDEDE', 'BDBDBD', 'A3A2A2', '909090', '909090'],
   Purple: ['cf9ae1', 'b380c4', '9565a5', '7f508f', '673e74'],
   OOC: ['b0c4c3', '9cb2b1', '8da1a0', '819493', '778a89'],
   FACTION: '59DC90',
   RADIO: 'FFFF99',
   PM: { From: 'FCBD00', To: 'FFD500' },
   Grey: 'E8E8E8',
   Tomato: 'FF6347',
   Megaphone: ['F4D31C', 'F4D31C', 'F4D31C', 'F4D31C', 'F4D31C'],
   Admin: 'F82234',
   Broadcast: 'F71326',
   Info: 'E48857',
   Success: '6BD56B',
   Error: 'FF6347',
   Help: 'DACA5D',
   server: '0792E5',
   property: '1ABC4F',
   whitesmoke: 'CECECE',
   Business: [255, 255, 255, 1],
   Bubble: [179, 128, 196, 255],
   Injured: [255, 99, 71, 255],
};

export const defaultSpawn = {
   name: 'Uobičajena pozicija',
   description: 'Uobičajena (default) pozicija gde se stvarate pri registraciji.'
}

export const markerColors: markerColors = { 
   JOBS: [253, 208, 48, 255],
   HOUSES: [0, 212, 116, 255],
   BANKS: [36, 156, 36, 175],

   FACTION: [69, 222, 105, 113],
   GARAGE : [255, 255, 255, 70]
};


export const jobNames = {
   TAXI: 'Downtown Cab Co.'
};

export const jobDescriptions = {
   TAXI: 'Vozać taksi vozila'
}

export const numberPlatePrefix = { 
   POLICE: 'LSPD',
   TAXI: 'TX',
   LSS: 'LSS',
   LST: 'LST'
}
