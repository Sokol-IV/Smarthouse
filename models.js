class Device {
    constructor(name, type, id) {
        this.name = name;
        this.type = type;
        this.id = id;
        this.isSwitchedOn = false;
        // this.room = room || 'some room';
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
        console.dir(this.state[settingName].current);
        this.state[settingName].current = this.state[settingName].min;
        console.dir(this.state[settingName].current);
    }


    setMax(settingName) {
        console.dir(this.state[settingName].current);
        this.state[settingName].current = this.state[settingName].max;
        console.dir(this.state[settingName].current);
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

    setCustomValue(settingName, value) {
        if (typeof value !== 'number') {
            return;
        }
        if (value > this.state[settingName].max || value < this.state[settingName].min) {
            return;
        }
        this.state[settingName].current = value;
        console.dir(this.state[settingName].current);
    }
}

class DeviceLamp extends Device {

    constructor(name, id) {
        super(name, 'lamp', id);
        this.state = {
            brightness: {
                min: 0,
                max: 100,
                current: 0
            },
        }
    }



    

    setMinBrightness() {
        this.setMin('brightness');
    }

    setMaxBrightness() {
        this.setMax('brightness');
    }

   
    decreaseBrightness() {
        this.decrease('brightness');
    }

    increaseBrightness() {
        this.increase('brightness');
    }

        
    setCustomBrightness(value) {
        this.setCustomValue('brightness', value)
    }

}


class DeviceTv extends Device {

    constructor(name, id) {
        super(name, 'tv', id);
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
        // console.dir(this);
    }

    

    setMinVolume() {
        this.setMin('volume');
    }

    setMaxVolume() {
        this.setMax('volume');
    }

    setMinChannel() {
        this.setMin('channel');
    }

    setMaxChannel() {
        this.setMax('channel');
    }

    decreaseVolume() {
        this.decrease('volume');
    }

    increaseVolume() {
        this.increase('volume');
    }

    decreaseChannel() {
        this.decrease('channel');
    }

    increaseChannel() {
        this.increase('channel');
    }

    
    setCustomVolume(value) {
        this.setCustomValue('volume', value)
    }

    setCustomChanel(value) {
        this.setCustomValue('channel', value)
    }

}

class DeviceHeater extends Device {

    constructor(name, id) {
        super(name, 'heater', id);
        this.state = {
            temperature: {
                min: 0,
                max: 100,
                current: 0
            },
        }
    }



    setMinTemperature() {
        this.setMin('temperature');
    }

    setMaxTemperature() {
        this.setMax('temperature');
    }

   
    decreaseTemperature() {
        this.decrease('temperature');
    }

    increaseTemperature() {
        this.increase('temperature');
    }

        
    setCustomTemperature(value) {
        this.setCustomValue('temperature', value)
    }

}


class DeviceFridge extends Device {

    constructor(name, id) {
        super(name, 'fridge', id);
        this.state = {
            coldstore: {
                min: 2,
                max: 6,
                current: 0
            },
            freezer: {
                min: -18,
                max: -24,
                current: 0
            }
        };
        // console.dir(this);
    }

    

    setMinColdstore() {
        this.setMin('coldstore');
    }

    setMaxColdstore() {
        this.setMax('coldstore');
    }

    setMinFreezer() {
        this.setMin('freezer');
    }

    setMaxFreezer() {
        this.setMax('freezer');
    }

    decreaseColdstore() {
        this.decrease('coldstore');
    }

    increaseColdstore() {
        this.increase('coldstore');
    }

    decreaseFreezer() {
        this.decrease('channel');
    }

    increaseFreezer() {
        this.increase('freezer');
    }

    
    setCustomColdstore(value) {
        this.setCustomValue('coldstore', value)
    }

    setCustomFreezer(value) {
        this.setCustomValue('freezer', value)
    }

}
// const deviceMain = new Device('name', 'type', 'id', 'room');
// console.dir(deviceMain);
// const lamp = new DeviceLamp('name', 'id', 'room');
// console.dir(lamp);
// lamp.setMinBrightness();
// lamp.setMaxBrightness();
// // tv.setCustomValue('volume', 22);
// // tv.setCustomValue('channel', 58);
// lamp.setCustomBrightness(33);

// const tv = new DeviceTv('name', 'id', 'room');
// console.dir(tv);
// tv.setMinVolume();
// tv.setMaxVolume();
// tv.setMinChannel();
// tv.setMaxChannel();
// // tv.setCustomValue('volume', 22);
// // tv.setCustomValue('channel', 58);
// tv.setCustomVolume(2);
// tv.setCustomChanel(55);







    