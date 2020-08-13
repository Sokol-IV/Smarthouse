class DeviceLamp {

    constructor(name, id, room) {
        this.name = name;
        this.type = 'lamp';
        this.id = id;
        this.state = false;
        this.settings = {
            maxBrightness: 100,
            minBrightness: 0
        };
        this.currentBrightness = this.settings.minBrightness;
        this.room = room || 'some room';
        console.dir(this);
    }



    switchOn() {
        if (this.state === true) {
            return;
        }
        this.state = true;
        console.dir(this);
     }

     switchOff() {
        if (this.state === false) {
            return;
        }
        this.state = false;
        console.dir(this);
    }

     setMinBrightness() {
        this.currentBrightness = this.settings.minBrightness;
        console.dir(this);
    }

    setMaxBrightness() {
        this.currentBrightness = this.settings.maxBrightness;
        console.dir(this);
    }

     decreaseBrightness() {
        if (this.currentBrightness <= this.settings.minBrightness) {
             return;
         }
         // this.currentBrightness--;
        this.currentBrightness -= 1;
        console.dir(this);
    }

    increaseBrightness() {
        if (this.currentBrightness >= this.settings.maxBrightness) {
             return;
         }
         // this.currentBrightness--;
        this.currentBrightness += 1;
        console.dir(this);
    }

    setCustomBrightness(value) {
        if (typeof value !== 'number') {
            return;
        }
        if (value < this.settings.minBrightness || value > this.settings.maxBrightness) {
            return;
        }
      this.currentBrightness = value;
      console.dir(this);
    }

}

const lamp = new DeviceLamp('name', 'type');

console.dir(lamp); 

lamp.setMaxBrightness();
console.dir(lamp.currentBrightness);
lamp.increaseBrightness()
console.dir(lamp.currentBrightness);
lamp.decreaseBrightness();
console.dir(lamp.currentBrightness);
lamp.increaseBrightness()
console.dir(lamp.currentBrightness);
lamp.increaseBrightness()
console.dir(lamp.currentBrightness);



