function Device(name, type, id) {
        this.name = name;
        this.type = type;
        this.id = id;
        this.isSwitchedOn = false;
        this.state = {};
}



    Device.prototype.switchOn = function() {

            if (this.isSwitchedOn === true) {
                    return;
            }
            this.isSwitchedOn = true;
    }

    Device.prototype.switchOff = function() {

            if (this.isSwitchedOn === false) {
                    return;
            }
            this.isSwitchedOn = false;
    }


    Device.prototype.setMin = function(settingName) {
        this.state[settingName].current = this.state[settingName].min;
    };


    Device.prototype.setMax = function(settingName) {
        this.state[settingName].current = this.state[settingName].max;
    };

    Device.prototype.decrease = function(settingName) {
        if (this.state[settingName].current <= this.state[settingName].min) {
             return;
         }
        this.state[settingName].current -= 1;
    };

    Device.prototype.increase = function(settingName) {
        if (this.state[settingName].current >= this.state[settingName].max) {
             return;
         }
        this.state[settingName].current += 1;
    };

    Device.prototype.setCustomValue = function(settingName, value) {
        if (typeof value !== 'string') {
            return;
        }

        const parsedValue = +value;
        if (isNaN(parsedValue)) {
                return;
            }
        if (parsedValue > this.state[settingName].max || parsedValue < this.state[settingName].min) {
            return;
        }
        this.state[settingName].current = parsedValue;
    };


function DeviceLamp (name, id) {

    Device.apply(this, [name, 'lamp', id]);
    this.state = {
        brightness: {
            min: 0,
            max: 100,
            current: 0
        },
    }
}

    DeviceLamp.prototype = Object.create(Device.prototype);
    DeviceLamp.prototype.constructor = DeviceLamp;

    DeviceLamp.prototype.getCurrentBrightness = function() {
        return this.state.brightness.current;
    }
        
    
    DeviceLamp.prototype.setMinBrightness = function() {
        this.setMin('brightness');
    };

    DeviceLamp.prototype.setMaxBrightness = function() {
        this.setMax('brightness');
    };


    DeviceLamp.prototype.decreaseBrightness = function() {
        this.decrease('brightness');
    };

    DeviceLamp.prototype.increaseBrightness = function() {
        this.increase('brightness');
    };


    DeviceLamp.prototype.setCustomBrightness = function(value) {
        this.setCustomValue('brightness', value)
    };




function DeviceTv() {

    Device.apply(this, [name, 'tv', id]);
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
    }

    DeviceTv.prototype = Object.create(Device.prototype);
    DeviceTv.prototype.constructor = DeviceTv;

    DeviceTv.prototype.getCurrentChannel = function() {
        return this.state.channel.current;
    }

    DeviceTv.prototype.getCurrentVolume = function() {
        return this.state.volume.current;    }    

     

    DeviceTv.prototype.setMinVolume = function() {
        this.setMin('volume');
    }

    DeviceTv.prototype.setMaxVolume = function() {
        this.setMax('volume');
    }

    DeviceTv.prototype.setMinChannel = function() {
        this.setMin('channel');
    }

    DeviceTv.prototype.setMaxChannel = function() {
        this.setMax('channel');
    }

    DeviceTv.prototype.decreaseVolume = function() {
        this.decrease('volume');
    }

    DeviceTv.prototype.increaseVolume = function() {
        this.increase('volume');
    }

    DeviceTv.prototype.decreaseChannel = function() {
        this.decrease('channel');
    }

    DeviceTv.prototype.increaseChannel = function() {
        this.increase('channel');
    }


    DeviceTv.prototype.setCustomVolume = function(value) {
        this.setCustomValue('volume', value)
    }

    DeviceTv.prototype.setCustomChannel = function(value) {
        this.setCustomValue('channel', value)
    }



function DeviceHeater() {

    Device.apply(this, [name, 'heater', id]);
        this.state = {
            temperature: {
                min: 0,
                max: 100,
                current: 0
            },
        }
    }

    DeviceHeater.prototype = Object.create(Device.prototype);
    DeviceHeater.prototype.constructor = DeviceHeater;

    DeviceHeater.prototype.getCurrentTemperature = function() {
        return this.state.temperature.current;
    }

    

    DeviceHeater.prototype.setMinTemperature = function() {
        this.setMin('temperature');
    }

    DeviceHeater.prototype.setMaxTemperature = function() {
        this.setMax('temperature');
    }


    DeviceHeater.prototype.decreaseTemperature = function() {
        this.decrease('temperature');
    }

    DeviceHeater.prototype.increaseTemperature = function() {
        this.increase('temperature');
    }


    DeviceHeater.prototype.setCustomTemperature = function(value) {
        this.setCustomValue('temperature', value)
    }


function DeviceFridge() {

    Device.apply(this, [name, 'fridge', id]);
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

    DeviceFridge.prototype = Object.create(Device.prototype);
    DeviceFridge.prototype.constructor = DeviceFridge;


    DeviceFridge.prototype.getCurrentColdstore = function() {
        return this.state.coldstore.current;
    }

    DeviceFridge.prototype.getCurrentFreezer = function() {
       return this.state.freezer.current;   }    

   
    

    DeviceFridge.prototype.setMinColdstore = function() {
        this.setMin('coldstore');
    }

    DeviceFridge.prototype.setMaxColdstore = function() {
        this.setMax('coldstore');
    }

    DeviceFridge.prototype.setMinFreezer = function() {
        this.setMin('freezer');
    }

    DeviceFridge.prototype.setMaxFreezer = function() {
        this.setMax('freezer');
    }

    DeviceFridge.prototype.decreaseColdstore = function() {
        this.decrease('coldstore');
    }

    DeviceFridge.prototype.increaseColdstore = function() {
        this.increase('coldstore');
    }

    DeviceFridge.prototype.decreaseFreezer = function() {
        if (this.state.freezer.current >= this.state.freezer.min) {
             return;
         }
        this.state['freezer'].current += 1;
    }

    DeviceFridge.prototype.increaseFreezer = function() {
        if (this.state.freezer.current <= this.state.freezer.max) {
             return;
         }
        this.state['freezer'].current -= 1;
    }


    DeviceFridge.prototype.setCustomColdstore = function(value) {
        this.setCustomValue('coldstore', value)
    }

    DeviceFridge.prototype.setCustomFreezer = function(value) {
        this.setCustomValue('freezer', value)
    }






