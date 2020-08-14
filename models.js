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


class DeviceTv {
    constructor(name, id, room) {
        this.name = name;
        this.type = 'tv';
        this.id = id;
        this.isSwitchedOn: false;
        this.state = {
            volume: {
                min: 0,
                max: 100,
                current: 0
            },
            channel: {
                min: 1,
                max: 110,
                current: 1
            }
        };
        this.room = room || 'some room';
        console.dir(this);
    }

    switchOn() {
        if (this.isSwitchedOn === true) {
            return;
        }
        this.isSwitchedOn = true;
        console.dir(this);
     }

     switchOff() {
        if (this.isSwitchedOn === false) {
            return;
        }
        this.isSwitchedOn = false;
        console.dir(this);
    }

    setMin(settingName) {
        this.state[settingName].current = this.state[settingName].min;
    }


    setMax(settingName) {
        this.state[settingName].current = this.state[settingName].max;
    }

    decrease(settingName) {
        if (this.state[settingName].current <= this.state[settingName].min) {
             return;
         }
        this.state[settingName].current -= 1;
    }

    increase(settingName) {
        if (this.state[settingName].current >= this.state[settingName].max) {
             return;
         }
        this.state[settingName].current += 1;
    }

    setMinVolume() {
        this.setMin('volume');
    }

    setMinChannel() {
        this.setMin('channel');
    }

    setMaxVolume() {
        this.setMax('volume');
    }

    setMaxChannel() {
        this.setMax('channel');
    }

    decreaseVolume() {
        this.decrease('volume');
    }

    decreaseChannel() {
        this.decrease('channel');
    }

    increaseVolume() {
        this.increase('volume');
    }

    increaseChannel() {
        this.increase('channel');
    }

}