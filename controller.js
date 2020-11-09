function Controller(store, configs) {
		this._store = store;
		this._container = null;
		this._configs = configs;

	 Controller.prototype.init = function() {
		var formContainer = document.getElementById('form-rendering');
		var form = new FormView(configs);
		console.dir(form);
		formContainer.appendChild(form.getElement()); //
		this._container = document.getElementById('container');
		this._devicesContainer = document.getElementById('all-devices');
		this._container.addEventListener('deviceWasCreated', this.processAddDevice.bind(this));
		this._container.addEventListener('deviceWasDelete', this.processRemoveDevice.bind(this));
	}

	Controller.prototype.processAddDevice = function(event) {
		var id = Date.now();
		var device;
		var element;
		
		const { deviceType, deviceName } = event.detail;
		// console.dir(deviceType);
		switch(deviceType) {
			case 'lamp':
				device = new DeviceLamp(deviceName, id);
				console.dir(device);
				element = new LampView(device);
				console.dir(element);
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
		var isDeviceAdded = this._store.addDevice(device, element);
		if (isDeviceAdded) {
		this.addView(element);
	}
	}

	Controller.prototype.processRemoveDevice = function(event) {
		console.dir(event);
		var device = event.detail;
		var deviceToDelete = this._store.getDevice(device.id);
		console.dir(deviceToDelete);
		if (deviceToDelete) {
				var { model: model,
				view: view } = deviceToDelete;
				console.dir(model);
				console.dir(view);
				var container = this._devicesContainer.querySelector('#' + model.type + '-container');
				// console.dir(container);
				// console.dir(view.getElement());
				var isDeviceRemoved = this._store.removeDevice(device.id);
				console.dir(isDeviceRemoved);
				if (isDeviceRemoved) {
					container.removeChild(view.getElement());
					
				}
				
				// console.dir(view.element);
				
				console.dir(store);
			// catch (error) {
			// 	alert(error);
			// } finally {
			// 	console.log('Device removing procedure is completed');
			// }
		}
	}

	Controller.prototype.addView = function(element) {
		var holder;
		// console.dir(element.getType());
		var htmlId = element.getType() + '-container';
		holder = this._devicesContainer.querySelector('#' + htmlId);
		if (!holder) {
			var device = this._configs.devicesTypes.filter(function(item) {
				return item.type === element.getType();
			});
			
			var wrapper = document.createElement('div');
			console.dir(device);
			wrapper.innerHTML = '<h2>' + device[0].title + '</h2>\n' +
								'<div class="colm-cont" id="' + htmlId + '"></div>';
			holder = wrapper.querySelector('#' + htmlId);
			this._devicesContainer.appendChild(wrapper);
		}
		holder.appendChild(element.getElement());
	}
}