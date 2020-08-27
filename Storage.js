class Storage {
    constructor() {
        this.state = {
            lamp: [],
            tv: [],
            fridge: [],
            heater: []
        }
    }

    addDevice(device) {
        const type = device.type;
        const devices = this.state[type];
        if (devices && Array.isArray(devices)) {
            devices.push(device);
        }
    }

    removeDevice(device) {
    	console.dir(device);
    	delete device.id;
    	const type = device.type;
    	// if (device.type || device.id) {
    	// 	return;
    	// }
        const devices = this.state[type];
    	if (devices && Array.isArray(devices)) {
    	    this.state[type] = devices.filter(item => item.id !== device.id);
        }
    }
}


let stor = new Storage();
console.dir(stor);
const lamp1 = new DeviceLamp('lamp1', '5', 'room');
const lamp2 = new DeviceLamp('lamp2', '66', 'room');
stor.addDevice(lamp1);
stor.addDevice(lamp2);
const tv1 = new DeviceTv('tv1', '10', 'room');
stor.addDevice(tv1);
console.dir(stor);
stor.removeDevice(lamp1);



