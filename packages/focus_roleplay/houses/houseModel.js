
module.exports = class HouseModel { 
     constructor(houseID, houseType, houseOwner, housePrice, houseDimension, housePos, houseIntPos, houseBlip, houseLabel, houseMarker) {
        this.id = houseID;
        this.type = houseType || 2; // 0 - Mala kuca 1 - Srednja 2 - Velika kuca 3 - Vila
        this.owner = houseOwner || -1;
        this.price = housePrice || -1;
        this.dimension = houseDimension || 0;
        this.entrance = housePos || 0;
        this.interior = houseIntPos || 0;
        this.blip = houseBlip || 0;
        this.label = houseLabel || 0;
        this.marker = houseMarker || 0;
 
        let pos = new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z);
        let text, blipColor;
        if (houseOwner == -1) { text = `Kuca je na prodaju. ~n~ ${this.price}$`; blipColor = 52; }  
        else { text = 'Kuca je u necijem vlasnistvu.'; blipColor = 49; }

        this.label = mp.labels.new(text, pos, { los: false, font: 0, drawDistance: 3 });
        this.blip = mp.blips.new(40, pos, { name: 'Kuca', color: blipColor, shortRange: true });
        this.marker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 0.99), 1.1,
        { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 150], visible: true, dimension: 0 });
        this.marker.house = this.id

        allHouses.push(this);
    }

    updateHouse () { 
        let string, blipC;
        if (this.owner == -1) { string = `Kuca je na prodaju. ~n~ ${this.price}$`; blipC = 52; }  
        else { string = 'Kuca je u necijem vlasnistvu.'; blipC = 49; }
        this.label.text = string;
        this.blip.color = blipC;
    }
    
    info () {
        return this;
    }
}
 
 