
module.exports = class HouseModel { 
     constructor(houseID, houseType, houseOwner, housePrice, houseDimension, housePos, houseIntPos, houseBlip, houseLabel) {
        this.id = houseID;
        this.type = houseType || 2; // 0 - Mala kuca 1 - Srednja 2 - Velika kuca 3 - Vila
        this.owner = houseOwner || -1;
        this.price = housePrice || -1;
        this.dimension = houseDimension || 0;
        this.entrance = housePos || 0;
        this.interior = houseIntPos || 0;
        this.blip = houseBlip || 0;
        this.label = houseLabel || 0;
 
        let pos = new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z);
        let text, blipColor;
        if (houseOwner == -1) { text = '~w~Kuca je na prodaju.'; blipColor = 52; }  
        else { text = '~m~Kuca je u necijem vlasnistvu.'; blipColor = 49; }

        this.label = mp.labels.new(text, pos,
        {
            los: false,
            font: 0,
            drawDistance: 3
        });
        this.blip = mp.blips.new(40, pos,
        {
            name: 'Kuca',
            color: blipColor, 
            shortRange: true,
        });

        console.log(this)
        allHouses.push(this);
    }

    info () {
        return this;
    }
}
 
 