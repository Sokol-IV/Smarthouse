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
        if (typeof value !== 'string') {
            return;
        }
        // const parsedValue = parseInt(value);

        const parsedValue = +value;
        console.dir(parsedValue);
        console.dir(value);

        if (isNaN(parsedValue)) {
                return;
            }
        if (parsedValue > this.state[settingName].max || parsedValue < this.state[settingName].min) {
            return;
        }
        this.state[settingName].current = parsedValue;
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


    get currentBrightness() {
        return this.state.brightness.current;
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

    get currentChannel() {
        return this.state.channel.current;
    }

     get currentVolume() {
        return this.state.volume.current;
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

    setCustomChannel(value) {
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

    get currentTemperature() {
        return this.state.temperature.current;
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
    }

    get currentColdstore() {
        return this.state.coldstore.current;
    }

    get currentFreezer() {
        return this.state.freezer.current;
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
        if (this.state.freezer.current >= this.state.freezer.min) {
             return;
         }
        this.state['freezer'].current += 1;
    }

    increaseFreezer() {
        if (this.state.freezer.current <= this.state.freezer.max) {
             return;
         }
        this.state['freezer'].current -= 1;
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







    