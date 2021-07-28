

export const Messages = {
   WEBSITE: 'www.focus-rp.com',
   USERNAME: 'Korisničko ime',
   PASSWORD: 'Korisnička Šifra',
   NOT_DONATOR: 'Potreban vam je donator level.',
   CREATE_CHARACTER: 'Kreiraj Karaktera',
   E_MAIL: 'E-Adresa',
   REGISTER_DATE: 'Datum Registracije',
   LAST_LOGIN: 'Zadnja Prijava',
   WARNS: 'Upozorenja',
   DONATOR: 'Donator',
   ORIGIN: 'Poreklo',
   GENDER: 'Pol',
   CASH: 'Novac',
   BIRTH: 'Datum Rodjenja',
   BANK: 'Banka',
   IDENTITY: 'Identitet',
   BLENDINGS: 'Genetika',
   FACE_SHAPE: 'Konture Lica',
   HAIR: 'Maljavost',
   FIRST_NAME: 'Ime',
   START_GAME_NEW_CHARACTER: 'Započni igru sa novim karakterom',
   HEAD_OVERLAYS: 'Detalji',
   LAST_NAME: 'Prezime',
   CLOTHING: 'Odeća',
   BLEND_DATA: ['Oblik glave majke', 'Oblik glave oca', 'Boja kože majke', 'Boja kože oca', 'Miks oblika glave', 'Miks boje kože'],
   CREATOR_VIEW: {
      Title: 'Pregled Karaktera',
      Content: 'Držeći <b> Desni Klik Miša </b> i pomeranjem možete rotirati karaktera i ugao kamere. Pomeranjem <b> Točka na mišu </b> možete zumirati i odzumirati.'
   },
   DETAILS_HELP: {
      Title: 'Detalji Karaktera',
      Content: 'Detalje karaktera morate prvo uključiti na kutiji koja se nalazi pored imena komponente da bi aktivirali sam detalj.'
   },
   IDENTITY_RULES: { 
      Title: 'Pravopis i provera unosa',
      Content: 'Morate ispuniti sva polja. Pri unosu imena, prezimena i porekla morate poštovati pravopis i koristiti veliko početno slovo.'
   },
   YEAR_RULES: {
      Title: 'Datum Rodjenja',
      Content: 'Vaš karakter ne sme biti mladji od 18 ili stariji od 80 godina, tj. polje za datum rodjenja, godina mora biti izmedju 1941 - 2001. '
   },
   CLOTHING_RULES: { 
      Title: 'Odeća',
      Content: 'Pri kreiranju karaktera morate imati odeću na sebi.'
   },
   FACE_FEATURES: [
      'Nos širina', 'Nos visina', 'Nos dužina', 'Nos - širina mosta', 'Nos - pozicija', 'Nos - pomak mosta nosa', 'Obrve visina', 'Obrve širina', 'Jagodična kost visina', 
      'Jagodična kost širina', 'Obrazi širina', 'Oči', 'Usne', 'Dužina vilice', 'Visina vilice', 'Dužina brade', 'Pozicija brade', 'Širina brade', 'Oblik brade',  'Širina vrata' 
   ],
}


export const Blend_Data = { 
   Maximums: [45, 45, 45, 45, 1, 1], 
   Minimums: [0, 0, 0, 0, -1, -1],
   Step: [1, 1, 1, 1, 0.1, 0.1]
}

export const Face_Features = { 
   Min: -1, Max: 1, Interval: 0.1
}

export const Hair_Styles = {
   0: 75, 1: 79
};

export const Head_Overlays = { 
   Names: ['Mrlje', 'Obrve', 'Starost, pore', 'Ten', 'Oštećenja od sunca', 'Karmin', 'Pege', 'Dlake na grudima'],
   Indexes: [0, 2, 3, 6, 7, 8, 9, 10],
   Maximums: [23, 33, 14, 11, 10, 9, 17, 16]
}

export const Hair_Colors = [
   '#0c0c0c', '#1d1a17', '#281d18', '#3d1f15', '#682e19', '#954b29', '#a35234', '#9b5f3d', '#b57e54', '#c19167', '#af7f53', '#be9560', '#d0ac75', '#b37f43', '#dbac68', '#e4ba7e', '#bd895a', '#83422c', '#8e3a28', '#8a241c',
   '#962b20', '#a7271d', '#c4351f', '#d8421f', '#c35731', '#d24b21', '#816755', '#917660', '#a88c74', '#d0b69e', '#513442', '#744557', '#a94663', '#cb1e8e', '#f63f78', '#ed9393', '#0b917e', '#248081', '#1b4d6b', '#578d4b',
   '#235433', '#155146', '#889e2e', '#71881b', '#468f21', '#cc953d', '#ebb010', '#ec971a', '#e76816', '#e64810', '#ec4d0e', '#c22313', '#e43315', '#ae1b18', '#6d0c0e', '#281914', '#3d241a', '#4c281a', '#5d3929', '#69402b',
   '#291b16', '#0e0e10', '#e6bb84', '#d8ac74'
];


export const Notification = { 
   Succes: 0, Error: 1, Info: 2
}


export const Clothing_Components = { 
   Names: ['Gornjak', 'Majca', 'Donji deo', 'Obuća'],
   Maximums: {
      0: [361, 183, 137, 101],
      1: [380, 221, 144, 105]
   },
   Components: [11, 8, 4, 6]
}

export const Genders = ['Muško', 'Žensko'];

export const Groups:string[] = ['Korisnik', 'Helper', 'Junior Admin', 'Admin', 'Senior Admin', 'General Admin', 'Lead Admin', 'Leadership', ]
