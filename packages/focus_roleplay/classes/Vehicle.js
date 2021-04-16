


class Vehicle { 
    constructor(params) {
        if ((params.id && params.model && params.position) != null) {
          this.id = params.id;
          this.model = params.model;
          this.position = params.position;
          this.heading = params.heading || 0;
          this.owner = params.owner || -1;
          this.plate = params.plate || '';
          this.color = params.color || [0, 0, 0];
          this.alpha = params.alpha || 255;
          this.fuel = params.fuel || 100;
          this.locked = params.locked || false;
          this.engine = params.engine || false;
          this.dimension = params.dimension || 0;
          this.visible = params.visible || true;
          this.km = params.km || 0;
          this.dirt = params.dirt || 0; // Dirt ide od 0 do 15
          if (!this._visible) this._alpha = 0;
          this.vehicle = mp.vehicles.new(mp.joaat(this.model), this.position,
          {
            heading: this.heading,
            numberPlate: this.plate,
            alpha: this.alpha,
            color: this.color,
            locked: this.locked,
            engine: this.engine,
            dimension: this.dimension,
          });
          // Napraviti Set i sync dirt funkciju
        }
    }
}

module.exports = Vehicle;
