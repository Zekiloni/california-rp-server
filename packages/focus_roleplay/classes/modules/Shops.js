


let MarketShop = [], WeaponShop = [];

const Multipliers = { 
   Shop: 3.75,
   Ammunation: 36.75
}

class MarketItem  {
   constructor (item, description, products) {
      this.item = item;
      this.description = description;
      this.products = products;
      this.hash = mp.ItemRegistry[item].hash;
      this.price = (this.products * Multipliers.Shop).toFixed(2);

      console.log(this.item + ' cena: ' + this.price)
      MarketShop.push(this);
   }
}


function constructShopMenu () { 
   setTimeout(() => {
      new MarketItem('Cheeseburger', '', 1.25);
      // new MarketItem('', '', 3);
      // new MarketItem('', '', 3);
      // new MarketItem('', '', 3);
      // new MarketItem('', '', 3);
      // new MarketItem('', '', 3);

   }, 1000);
}

class AmmunationItem { 
   constructor (item, description, products) {
      this.item = item;
      this.description = description;
      this.products = products;
      this.hash = mp.ItemRegistry[this.item].hash;
      this.price = (this.products * Multipliers.Ammunation).toFixed(2);

      console.log(this.item + ' cena: ' + this.price)
      WeaponShop.push(this);
   }
}

function constructWeaponMenu () { 
   setTimeout(() => {
      new AmmunationItem('Antique Cavalry Dagger','', 5)
      new AmmunationItem('Baseball Bat', '', 1.6)
      new AmmunationItem('Crowbar', '', 1.2)
      new AmmunationItem('Flashlight', '', 0.95)
      new AmmunationItem('Hammer', '', 1.75)
      new AmmunationItem('Hatchet', '', 3.18)
      new AmmunationItem('Brass Knuckles', '', 3)
      new AmmunationItem('Knife', '', 1.65)
      new AmmunationItem('Machete', '', 12.17)
      new AmmunationItem('Switchblade', '', 3.06)
      new AmmunationItem('Battle Axe', '', 1)
      new AmmunationItem('Pistol', '', 21.67)
      new AmmunationItem('Pistol Mk II', '', 25.06)
      new AmmunationItem('Combat Pistol', '', 23.40)
      new AmmunationItem('AP Pistol', '', 26.23)
      new AmmunationItem('Stun Gun', '', 11.78)
      new AmmunationItem('Pistol .50', '', 21.4)
      new AmmunationItem('SNS Pistol', '', 19.05)
      new AmmunationItem('SNS Pistol Mk II', '', 24.13)
      new AmmunationItem('Heavy Pistol', '', 23.66)
      new AmmunationItem('Vintage Pistol', '', 26.80)
      new AmmunationItem('Flare Gun', '', 6.12)
      new AmmunationItem('Heavy Revolver', '', 21.3)
      new AmmunationItem('Heavy Revolver Mk II', '', 23.46)
      new AmmunationItem('Navy Revolver', '', 21.07)
      new AmmunationItem('Micro SMG', '', 22.66)
      new AmmunationItem('SMG', '', 1)
      new AmmunationItem('SMG Mk II', '', 1)
      new AmmunationItem('Assault SMG', '', 1)
      new AmmunationItem('Combat PDW', '', 1)
      new AmmunationItem('Machine Pistol', '', 1)
      new AmmunationItem('Mini SMG', '', 1)
      new AmmunationItem('Pump Shotgun', '', 1)
      new AmmunationItem('Pump Shotgun Mk II', '', 1)
      new AmmunationItem('Sawed-Off Shotgun', '', 1)
      new AmmunationItem('Assault Shotgun', '', 1)
      new AmmunationItem('Bullpup Shotgun', '', 1)
      new AmmunationItem('Heavy Shotgun', '', 1)
      new AmmunationItem('Musket', '', 1)
      new AmmunationItem('Double Barrel Shotgun', '', 1)
      new AmmunationItem('Sweeper Shotgun', '', 1)
      new AmmunationItem('Combat Shotgun', '', 1)
      new AmmunationItem('Assault Rifle', '', 1)
      new AmmunationItem('Assault Rifle Mk II', '', 1)
      new AmmunationItem('Carbine Rifle', '', 1)
      new AmmunationItem('Carbine Rifle Mk II', '', 1)
      new AmmunationItem('Advanced Rifle', '', 1)
      new AmmunationItem('Special Carbine', '', 1)
      new AmmunationItem('Special Carbine Mk II', '', 1)
      new AmmunationItem('Bullpup Rifle', '', 1)
      new AmmunationItem('Bullpup Rifle Mk II', '', 1)
      new AmmunationItem('Compact Rifle', '', 1)
      new AmmunationItem('Military Rifle', '', 1)
      new AmmunationItem('MG', '', 1)
      new AmmunationItem('Combat MG', '', 1)
      new AmmunationItem('Combat MG Mk II', '', 1)
      new AmmunationItem('Gusenberg Sweeper', '', 1)
      new AmmunationItem('Sniper Rifle', '', 28)
      new AmmunationItem('Heavy Sniper', '', 1)
      new AmmunationItem('Heavy Sniper Mk II', '', 1)
      new AmmunationItem('Marksman Rifle', '', 1)
      new AmmunationItem('Marksman Rifle Mk II', '', 1)
      new AmmunationItem('Grenade', '', 1)
      new AmmunationItem('BZ Gas', '', 1)
      new AmmunationItem('Molotov Cocktail', '', 1)
      new AmmunationItem('Sticky Bomb', '', 1)
      new AmmunationItem('Proximity Mines', '', 1)
      new AmmunationItem('Pipe Bombs', '', 1)
      new AmmunationItem('Tear Gas', '', 1)
      new AmmunationItem('Flare', '', 1)
      new AmmunationItem('Jerry Can', '', 1)
      new AmmunationItem('Parachute', '', 1)
      new AmmunationItem('Fire Extinguisher', '', 1)

   }, 1000);
}

constructWeaponMenu();
constructShopMenu();


module.exports = { MarketShop, WeaponShop }
