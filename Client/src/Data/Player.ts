


export enum Clothing_Components { 
   Head, Mask, HairStyle, Torso, Legs, Bag, Shoes, Accessorie, Undershirt, Armour, Decal, Top
}

type Torsos = {
   [key: string]: number[]
}

export const Player_Models = [mp.game.joaat('mp_m_freemode_01'), mp.game.joaat('mp_f_freemode_01')];


export const Genders: { [key: string]: string } = { 
   0x705E61F2: '0',
   0x9C9EFFD8: '1'
}