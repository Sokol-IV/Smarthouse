class Storage {
	
}




class Device {
	constructor(name, id, room) {
        this.name = name;
        this.type = type;
        this.id = id;
        this.isSwitchedOn = false;
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