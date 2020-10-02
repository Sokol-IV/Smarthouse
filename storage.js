class Storage {

    constructor() {

        // this._views = new Map();
        // this.state = configs.devicesTypes.reduce((prev, item) => {
        //     prev[item.type] = [];
        //     return prev;
        // }, {});
        this._state = new Map();
	}

	// getDeviceView(deviceData) {
    //     if (
    //         this.state[deviceData.type] &&
    //         this.state[deviceData.type].filter(item => item.id === deviceData.id).length &&
    //         this._views.has(deviceData.id)
    //     ) {
    //         return this._views.get(deviceData.id)
    //     }
    //     return null;
    // }

    getDevice(id) {
        if (
            !id ||
            !this._state.has(id)
        ) {
            return null;
        }
        return this._state.get(id);;
    }

    // addDevice(device) {
    //     const type = device.type;
    //     const devices = this.state[type];
    //     if (devices && Array.isArray(devices)) {
    //         devices.push(device);
    //     }
    // }
    //
    // addView(deviceView) {
    //     const id = deviceView.id;
    //     if (id) {
    //         this._views.set(id, deviceView);
    //     }
    // }


    addDevice(model, view) {
        if (
            !model ||
            !view ||
            !model.id ||
            !view.id ||
            model.id !== view.id
        ) {
            return;
        }
        this._state.set(model.id, { model, view })
    }

    removeDevice(device) {
        const id = device.id;
        if (id && this._state.has(id)) {
            this._state.delete(id);
        }
    }

    // removeDevice(device) {
    // 	const type = device.type;
    // 	if (!device.type || !device.id) {
    // 		return;
    // 	}
    //     const devices = this.state[type];
    // 	if (devices && Array.isArray(devices)) {
    // 	    this.state[type] = devices.filter(item => item.id !== device.id);
    //     }
    // }
    //
    // removeView(device) {
    //     const id = device.id;
    //     if (id && this._views.has(id)) {
    //         this._views.delete(id);
    //     }
    // }
}




