class Controller {

	constructor(store, configs) {
		this._store = store;
		this._container = null;
		this._configs = configs;
	}

	init() {
		const formContainer = document.getElementById('form-rendering');
		const form = new FormView(configs);
		formContainer.appendChild(form.element);
		this._container = document.getElementById('container');
		this._devicesContainer = document.getElementById('all-devices');
		this._container.addEventListener('deviceWasCreated', this.processAddDevice.bind(this));
		this._container.addEventListener('deviceWasDelete', this.processRemoveDevice.bind(this));
	}

	processAddDevice(event) {
		const id = Date.now();
		let device;
		let element;
		
		const { deviceType, deviceName } = event.detail;
		console.dir(deviceType);
		switch(deviceType) {
			case 'lamp':
				device = new DeviceLamp(deviceName, id);
				console.dir(device);
				element = new LampView(device);
				break;
			case 'fridge':
				device = new DeviceFridge(deviceName, id);
				element = new FridgeView(device);
				break;
			case 'tv':
				device = new DeviceTv(deviceName, id);
				element = new TvView(device);
				break;
			case 'heater':
				device = new DeviceHeater(deviceName, id);
				element = new HeaterView(device);
				break;
			default:
				return;
		}
		this._store.addDevice(device, element);
		this.addView(element);
	}

	processRemoveDevice(event) {
		const device = {...event.detail};
		const deviceToDelete = this._store.getDevice(device.id);
		if (deviceToDelete) {
			try {
				const { model, view } = deviceToDelete;
				const container = this._devicesContainer.querySelector('#' + model.type + '-container');
				container.removeChild(view.element);
				this._store.removeDevice(device.id);
			} catch (error) {
				alert(error);
			} finally {
				console.log('Device removing procedure is completed');
			}
		}
	}

	addView(element) {
		let holder;
		const htmlId = element.type + '-container';
		holder = this._devicesContainer.querySelector('#' + htmlId);
		if (!holder) {
			const device = this._configs.devicesTypes.filter((item) => {
				return item.type === element.type;
			});
			const wrapper = document.createElement('div');
			wrapper.innerHTML = 	'<h2>' + device[0].title + '</h2>\n' +
								'<div class="colm-cont" id="' + htmlId + '"></div>';
			holder = wrapper.querySelector('#' + htmlId);
			this._devicesContainer.appendChild(wrapper);
		}
		holder.appendChild(element.element);
	}
}