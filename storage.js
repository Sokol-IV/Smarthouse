class Storage {

    constructor() {

        // this._views = new Map();
        // this.state = configs.devicesTypes.reduce((prev, item) => {
        //     prev[item.type] = [];
        //     return prev;
        // }, {});
        console.dir(this);
        this._state = new Map();
        console.dir(this._state);
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
        // console.dir(id);
        if (
            !id ||
            !this._state.has(id)
        ) {
            return null;
        }
        return this._state.get(id);
        // console.dir(id);
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
        console.dir(model);
        console.dir(view);
        console.dir(model.id);
        console.dir(view.getId());
        if (
            !model ||
            !view ||
            !model.id ||
            !view.getId() ||
            model.id !== view.getId()
        ) {
            return;
        }
        this._state.set(model.id, { model, view })
    }

    removeDevice(id) {
        if (id && this._state.has(id)) {
            this._state.delete(id);
        }
        return this._state.has(id); 
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




