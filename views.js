function DeviceView(model) {
	console.dir(model);
		this._model = model;
    	this._element = null;
    	this._stateIndicator = null;
		this._DeleteSubmitBtn = null;
		console.dir(this);
}
	

	DeviceView.prototype.getId = function () {
		return this._model.id;
	}

	DeviceView.prototype.getType = function () {
		return this._model.type;
	}

	DeviceView.prototype.processSwitchOnClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOn();
		this.refreshStateDeviceView();
	}

	DeviceView.prototype.processSwitchOffClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOff();
		this.refreshStateDeviceView();
	}


	DeviceView.prototype.refreshStateDeviceView = function() {

		if (this._model.isSwitchedOn) {
			this._stateIndicator.classList.replace('state-off', 'state-on');
            this._stateIndicator.textContent = 'Включено';
        }
        if (!this._model.isSwitchedOn) {
            this._stateIndicator.classList.replace('state-on', 'state-off');
            this._stateIndicator.textContent = 'Выключено';
        }
    }

	DeviceView.prototype.processDeleteSubmitClick = function() {
		var deviceDataSet = {
			type: this._model.type,
			id: this._model.id
		};

		console.dir(deviceDataSet);

		var deviceEventDelete = new CustomEvent('deviceWasDelete', {
			bubbles: true,
			detail: deviceDataSet
		});
		console.dir(deviceEventDelete);
		
		this._element.dispatchEvent(deviceEventDelete);
	}



function FormView(configs) {

	this._element;
	this._inputName;
	this._inputType;
	this._addSubmitBtn;
	this._errorsBox;
	this._devicesTypes;
	this._uniqueTypes;

	
	this._devicesTypes = configs.devicesTypes;
	this._uniqueTypes = this._devicesTypes.reduce(function(previous, item) {
		previous.add(item.type);
		return previous;
    	}, new Set());
	}



 	FormView.prototype.getElement = function() {
    	if (this._element) {
			return this._element;
		}
		this.renderFormView();
		return this._element;
	}

	FormView.prototype.renderFormView = function() {
		var element = document.createElement('div');
		element.classList.add('device-form');
		element.innerHTML = '<div>'+
				'<div class=" new-device">'+
                	'<p>Добавить новое устройство</p>'+
                		'<div>'+
                    		'<label>Имя'+
                        		'<input type="text" id="device-name-input">'+
                    		'</label>'+
                		'</div>'+
                '<div>'+
                    '<label>Тип'+
                        '<select id="device-type-input">'+
                        '</select>'+
                    '</label>'+
                '</div>'+
                	'<div id="errors-box"></div>'+
                		'<div>'+
                    		'<button id="add-device-submit" data-submit>Добавить</button>'+
                		'</div>'+
            			'</div>'+
            '</div>';
            var select = element.querySelector('#device-type-input');
        	for (var i = 0; i < this._devicesTypes.length; i++) {
        	var {type, title} = this._devicesTypes[i];
        	var option = document.createElement('option');
        	option.setAttribute('value', type);
        	option.textContent = title;
        	select.appendChild(option);
        }

       	this._inputName = element.querySelector('#device-name-input');
       	this._inputName.addEventListener('focus', this.clearErrorBox.bind(this));
		this._inputType = element.querySelector('#device-type-input');
		this._inputType.addEventListener('focus', this.clearErrorBox.bind(this));
		this._addSubmitBtn = element.querySelector('#add-device-submit');
		this._addSubmitBtn.addEventListener('click', this.processAddSubmitClick.bind(this));
		this._errorsBox = element.querySelector('#errors-box');
        this._element = element;
}

	FormView.prototype.processAddSubmitClick = function() {
    	var deviceName = this._inputName.value.trim();
    	var deviceType = this._inputType.value.trim();
    
  				
	// console.dir(deviceType);


    if (!deviceName || !deviceType || !this._uniqueTypes.has(deviceType)) {
       this._errorsBox.innerHTML = '<p class="error-message">Поля ввода не должны быть пустыми</p>';
        return;
    }

    var deviceData = {
    	deviceName,
    	deviceType
    };
    console.dir(deviceData);

    var deviceEvent = new CustomEvent('deviceWasCreated', {
    	bubbles: true,
    	detail: deviceData
    });

    console.dir(deviceData);

    this._element.dispatchEvent(deviceEvent);
    this._inputName.value = null;
    this._inputType.value = 'lamp';
}


FormView.prototype.clearErrorBox = function() {
this._errorsBox.innerHTML = '';
}




function LampView(model) {
		DeviceView.apply(this, [model]);
       	this._input = null;
    	this._valueIndicator = null;
    }

    LampView.prototype = Object.create(DeviceView.prototype);
    LampView.prototype.constructor = LampView;

    
    LampView.prototype.getElement = function() {
    	if (this._element) {
			return this._element;
		}
		this.renderLampView();
		return this._element;
	}


	LampView.prototype.processSetMaxBrightnessClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxBrightness();
		this.refreshValueLampView();
	}

	LampView.prototype.processSetMinBrightnessClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinBrightness();
		this.refreshValueLampView();
	}

	LampView.prototype.processDecreaseBrightnessClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseBrightness();
		this.refreshValueLampView();
	}

	LampView.prototype.processIncreaseBrightnessClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseBrightness();
		this.refreshValueLampView();
	}

	LampView.prototype.processSetCustomBrightnessClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomBrightness(this._input.value);
		this.refreshValueLampView();
		this.clearInput();
	}

	LampView.prototype.renderLampView = function() {
		var element = document.createElement('div');
		element.classList.add('status-box');
		element.innerHTML = '<div>'+
							'<p><span>Название:&nbsp;</span>'+
								'<span>' + this._model.name + '</span>'+
							'</p>'+
								'<p><span>Тип:&nbsp;</span>'+
									'<span> Светильник </span>'+
								'</p>'+
						'</div>'+
						'<div>'+
                            '<div class="status">'+
                                '<p>Состояние</p>'+
                                '<p class="device-state state-off">Выключено</p>'+
                                '<button class="b-status" data-switch-on>Вкл</button>'+
                                '<button class="b-status" data-switch-off>Выкл</button>'+
                            '</div>'+
                            '<div class="power">'+
                                '<p class="m">'+
                                    '<span>Текущая яркость:</span>'+
                                    '<span class="device-ligth">0</span>'+
                                '</p>'+
                                '<div class="colm-cont">'+
                                    '<div class="colm">'+
                                        '<button data-brightness-max>max</button>'+
                                        '<button data-brightness-min>min</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<input class="input-power" type="number" name="">'+
                                        '<button data-brightness-customValue>Задать</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<button data-brightness-increase>+</button>'+
                                        '<button data-brightness-decrease>-</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            	'<div class="colm">'+
                                    '<button id="delete-device">Удалить устройство</button>'+
                                '</div>'+
                        '</div>';

      	element.querySelector('[data-switch-on]').addEventListener('click', this.processSwitchOnClick.bind(this));

		element.querySelector('[data-switch-off]').addEventListener('click', this.processSwitchOffClick.bind(this));

      	element.querySelector('[data-brightness-max]').addEventListener('click', this.processSetMaxBrightnessClick.bind(this));

      	element.querySelector('[data-brightness-min]').addEventListener('click', this.processSetMinBrightnessClick.bind(this));

      	element.querySelector('[data-brightness-decrease]').addEventListener('click', this.processDecreaseBrightnessClick.bind(this));

      	element.querySelector('[data-brightness-increase]').addEventListener('click', this.processIncreaseBrightnessClick.bind(this));

      	element.querySelector('[data-brightness-customValue]').addEventListener('click', this.processSetCustomBrightnessClick.bind(this));

      	this._element = element;
      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-ligth');
      	this._input = this._element.querySelector('input.input-power');

      	this._DeleteSubmitBtn = this._element.querySelector('#delete-device');
      // console.dir(this);
		this._DeleteSubmitBtn.addEventListener('click', this.processDeleteSubmitClick.bind(this));
		// console.dir(this);
		
	}

    LampView.prototype.refreshValueLampView = function() {
		this._valueIndicator.textContent = this._model.getCurrentBrightness();
    }

    LampView.prototype.clearInput = function() {
    	this._input.value = null;
    }


function TvView (model) {
    DeviceView.apply(this, [model]);
    	this._input = null;
    	this._inputTwo = null;
    	this._valueIndicator = null;
    	this._valueIndicatorTwo = null;
    }

    TvView.prototype = Object.create(DeviceView.prototype);
    TvView.prototype.constructor = TvView;

    TvView.prototype.getElement = function() {
    	if (this._element) {
		return this._element;
		}
		this.renderTvView();
		return this._element;
	}

	TvView.prototype.processSetMaxChannelClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxChannel();
		this.refreshValueChannelView();
	}

	TvView.prototype.processSetMinChannelClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinChannel();
		this.refreshValueChannelView();
	}

	TvView.prototype.processDecreaseChannelClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseChannel();
		this.refreshValueChannelView();
	}

	TvView.prototype.processIncreaseChannelClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseChannel();
		this.refreshValueChannelView();
	}

	TvView.prototype.processSetCustomChanelClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomChannel(this._input.value);
		this.refreshValueChannelView();
		this.clearInputChannel();
	}

	TvView.prototype.processSetMaxVolumeClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxVolume();
		this.refreshValueVolumeView();
	}

	TvView.prototype.processSetMinVolumeClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinVolume();
		this.refreshValueVolumeView();
	}

	TvView.prototype.processDecreaseVolumeClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseVolume();
		this.refreshValueVolumeView();
	}

	TvView.prototype.processIncreaseVolumeClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseVolume();
		this.refreshValueVolumeView();
	}

	TvView.prototype.processSetCustomVolumeClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomVolume(this._inputTwo.value);
		this.refreshValueVolumeView();
		this.clearInputVolume();
	}

	TvView.prototype.renderTvView = function() {
		var elementTv = document.createElement('div');
		elementTv.classList.add('status-box');
		elementTv.innerHTML = '<div>'+
							'<p><span>Название:&nbsp;</span>'+
								'<span>' + this._model.name + '</span>'+
							'</p>'+
								'<p><span>Тип:&nbsp;</span>'+
									'<span> Телевизор </span>'+
								'</p>'+
						'</div>'+
						'<div>'+
                            '<div class="status">'+
                                '<p>Состояние</p>'+
                                '<p class="device-state state-off">Выключено</p>'+
                                '<button class="b-status" data-switch-on>Вкл</button>'+
                                '<button class="b-status" data-switch-off>Выкл</button>'+
                            '</div>'+
                            '<div class="power">'+
                                '<p class="m">'+
                                    '<span>Каналы:</span>'+
                                    '<span class="device-channel">0</span>'+
                                '</p>'+
                                '<div class="colm-cont">'+
                                    '<div class="colm">'+
                                        '<button data-channel-max>max</button>'+
                                        '<button data-channel-min>min</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<input class="input-power" type="number" name="inputChannel">'+
                                        '<button data-channel-customValue>Задать</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<button data-channel-increase>+</button>'+
                                        '<button data-channel-decrease>-</button>'+
                                    '</div>'+
                                '</div>'+
                                '</div>'+
                                '<div class="power">'+
                                '<p class="m">'+
                                    '<span>Громкость:</span>'+
                                    '<span class="device-volume">0</span>'+
                                '</p>'+
                                '<div class="colm-cont">'+
                                    '<div class="colm">'+
                                        '<button data-volume-max>max</button>'+
                                        '<button data-volume-min>min</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<input class="input-power" type="number" name="inputVolume">'+
                                        '<button data-volume-customValue>Задать</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<button data-volume-increase>+</button>'+
                                        '<button data-volume-decrease>-</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="colm">'+
                                    '<button id="delete-device">Удалить устройство</button>'+
                                '</div>'+
                        '</div>';
      	elementTv.querySelector('[data-switch-on]').addEventListener('click', this.processSwitchOnClick.bind(this));

		elementTv.querySelector('[data-switch-off]').addEventListener('click', this.processSwitchOffClick.bind(this));

      	elementTv.querySelector('[data-channel-max]').addEventListener('click', this.processSetMaxChannelClick.bind(this));

      	elementTv.querySelector('[data-channel-min]').addEventListener('click', this.processSetMinChannelClick.bind(this));

      	elementTv.querySelector('[data-channel-decrease]').addEventListener('click', this.processDecreaseChannelClick.bind(this));

      	elementTv.querySelector('[data-channel-increase]').addEventListener('click', this.processIncreaseChannelClick.bind(this));

      	elementTv.querySelector('[data-channel-customValue]').addEventListener('click', this.processSetCustomChanelClick.bind(this));

      	elementTv.querySelector('[data-volume-max]').addEventListener('click', this.processSetMaxVolumeClick.bind(this));

      	elementTv.querySelector('[data-volume-min]').addEventListener('click', this.processSetMinVolumeClick.bind(this));

      	elementTv.querySelector('[data-volume-decrease]').addEventListener('click', this.processDecreaseVolumeClick.bind(this));

      	elementTv.querySelector('[data-volume-increase]').addEventListener('click', this.processIncreaseVolumeClick.bind(this));

      	elementTv.querySelector('[data-volume-customValue]').addEventListener('click', this.processSetCustomVolumeClick.bind(this));

      	this._element = elementTv;


      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-channel');
      	this._valueIndicatorTwo = this._element.querySelector('.device-volume');
      	this._input = this._element.getElementsByTagName('input')[0];
      	this._inputTwo = this._element.getElementsByTagName('input')[1];

      	this._DeleteSubmitBtn = this._element.querySelector('#delete-device');
console.dir(this);
		this._DeleteSubmitBtn.addEventListener('click', this.processDeleteSubmitClick.bind(this));
		console.dir(this);
	}



    TvView.prototype.refreshValueChannelView = function() {
		this._valueIndicator.textContent = this._model.getCurrentChannel();
    }

    TvView.prototype.refreshValueVolumeView = function() {
		this._valueIndicatorTwo.textContent = this._model.getCurrentVolume();
    }

    TvView.prototype.clearInputChannel = function() {
    	this._input.value = null;
    }

    TvView.prototype.clearInputVolume = function() {
    	this._inputTwo.value = null;
    }


function HeaterView(model) {
	DeviceView.apply(this, [model]);
	this._input = null;
	this._valueIndicator = null;
}

	HeaterView.prototype = Object.create(DeviceView.prototype);
    HeaterView.prototype.constructor = HeaterView;

	HeaterView.prototype.getElement = function() {
    	if (this._element) {
			return this._element;
		}
		this.renderHeaterView();
		return this._element;
	}

	HeaterView.prototype.processSetMaxTemperatureClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxTemperature();
		this.refreshValueHeaterView();
	}

	HeaterView.prototype.processSetMinTemperatureClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinTemperature();
		this.refreshValueHeaterView();
	}

	HeaterView.prototype.processDecreaseTemperatureClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseTemperature();
		this.refreshValueHeaterView();
	}

	HeaterView.prototype.processIncreaseTemperatureClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseTemperature();
		this.refreshValueHeaterView();
	}

	HeaterView.prototype.processSetCustomTemperatureClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomTemperature(this._input.value);
		this.refreshValueHeaterView();
		this.clearInput();
	}

	HeaterView.prototype.renderHeaterView = function() {
		const element = document.createElement('div');
		element.classList.add('status-box');
		element.innerHTML = '<div>'+
							'<p><span>Название:&nbsp;</span>'+
								'<span>' + this._model.name + '</span>'+
							'</p>'+
								'<p><span>Тип:&nbsp;</span>'+
									'<span> Обогреватель </span>'+
								'</p>'+
						'</div>'+
						'<div>'+
                            '<div class="status">'+
                                '<p>Состояние</p>'+
                                '<p class="device-state state-off">Выключено</p>'+
                                '<button class="b-status" data-switch-on>Вкл</button>'+
                                '<button class="b-status" data-switch-off>Выкл</button>'+
                            '</div>'+
                            '<div class="power">'+
                                '<p class="m">'+
                                    '<span>Температура:</span>'+
                                    '<span class="device-temp">0</span>'+
                                '</p>'+
                                '<div class="colm-cont">'+
                                    '<div class="colm">'+
                                        '<button data-temperature-max>max</button>'+
                                        '<button data-temperature-min>min</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<input class="input-power" type="number" name="">'+
                                        '<button data-temperature-customValue>Задать</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<button data-temperature-increase>+</button>'+
                                        '<button data-temperature-decrease>-</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
							'<div class="colm">'+
								'<button id="delete-device">Удалить устройство</button>'+
							'</div>'+
                        '</div>';

      	element.querySelector('[data-switch-on]').addEventListener('click', this.processSwitchOnClick.bind(this));

		element.querySelector('[data-switch-off]').addEventListener('click', this.processSwitchOffClick.bind(this));

      	element.querySelector('[data-temperature-max]').addEventListener('click', this.processSetMaxTemperatureClick.bind(this));

      	element.querySelector('[data-temperature-min]').addEventListener('click', this.processSetMinTemperatureClick.bind(this));

      	element.querySelector('[data-temperature-decrease]').addEventListener('click', this.processDecreaseTemperatureClick.bind(this));

      	element.querySelector('[data-temperature-increase]').addEventListener('click', this.processIncreaseTemperatureClick.bind(this));

      	element.querySelector('[data-temperature-customValue]').addEventListener('click', this.processSetCustomTemperatureClick.bind(this));

      	this._element = element;
      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-temp');
      	this._input = this._element.querySelector('input.input-power');
		this._DeleteSubmitBtn = this._element.querySelector('#delete-device');
		this._DeleteSubmitBtn.addEventListener('click', this.processDeleteSubmitClick.bind(this));
	}

	HeaterView.prototype.refreshValueHeaterView = function() {
		this._valueIndicator.textContent = this._model.getCurrentTemperature();
    }


    HeaterView.prototype.clearInput = function() {
    	this._input.value = null;
    }


function FridgeView(model) {
   DeviceView.apply(this, [model]);
		this._input = null;
		this._inputTwo = null;
		this._valueIndicator = null;
		this._valueIndicatorTwo = null;
    }

	FridgeView.prototype = Object.create(DeviceView.prototype);
    FridgeView.prototype.constructor = FridgeView;

    FridgeView.prototype.getElement = function() {
    	if (this._element) {
		return this._element;
		}
		this.renderFridgeView();
		return this._element;
	}

	FridgeView.prototype.processSetMaxColdstoreClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxColdstore();
		this.refreshValueColdstoreView();
	}

	FridgeView.prototype.processSetMinColdstoreClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinColdstore();
		this.refreshValueColdstoreView();
	}

	FridgeView.prototype.processDecreaseColdstoreClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseColdstore();
		this.refreshValueColdstoreView();
	}

	FridgeView.prototype.processIncreaseColdstoreClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseColdstore();
		this.refreshValueColdstoreView();
	}

	FridgeView.prototype.processSetCustomColdstoreClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomColdstore(this._input.value);
		this.refreshValueColdstoreView();
		this.clearInputColdstore();
	}

	FridgeView.prototype.processSetMaxFreezerClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxFreezer();
		this.refreshValueFreezerView();
	}

	FridgeView.prototype.processSetMinFreezerClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinFreezer();
		this.refreshValueFreezerView();
	}

	FridgeView.prototype.processDecreaseFreezerClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseFreezer();
		this.refreshValueFreezerView();
	}

	FridgeView.prototype.processIncreaseFreezerClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseFreezer();
		this.refreshValueFreezerView();
	}

	FridgeView.prototype.processSetCustomFreezerClick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomFreezer(this._inputTwo.value);
		this.refreshValueFreezerView();
		this.clearInputFreezer();
	}

	FridgeView.prototype.renderFridgeView = function() {
		const elementTv = document.createElement('div');
		elementTv.classList.add('status-box');
		elementTv.innerHTML = '<div>'+
							'<p><span>Название:&nbsp;</span>'+
								'<span>' + this._model.name + '</span>'+
							'</p>'+
								'<p><span>Тип:&nbsp;</span>'+
									'<span> Холодильник </span>'+
								'</p>'+
						'</div>'+
						'<div>'+
                            '<div class="status">'+
                                '<p>Состояние</p>'+
                                '<p class="device-state state-off">Выключено</p>'+
                                '<button class="b-status" data-switch-on>Вкл</button>'+
                                '<button class="b-status" data-switch-off>Выкл</button>'+
                            '</div>'+
                            '<div class="power">'+
                                '<p class="m">'+
                                    '<span>Холодильная камера:</span>'+
                                    '<span class="device-coldstore">0</span>'+
                                '</p>'+
                                '<div class="colm-cont">'+
                                    '<div class="colm">'+
                                        '<button data-coldstore-max>max</button>'+
                                        '<button data-coldstore-min>min</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<input class="input-power" type="number" name="inputColdstore">'+
                                        '<button data-coldstore-customValue>Задать</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<button data-coldstore-increase>+</button>'+
                                        '<button data-coldstore-decrease>-</button>'+
                                    '</div>'+
                                '</div>'+
                                '</div>'+
                                '<div class="power">'+
                                '<p class="m">'+
                                    '<span>Морозильная камера:</span>'+
                                    '<span class="device-freezer">0</span>'+
                                '</p>'+
                                '<div class="colm-cont">'+
                                    '<div class="colm">'+
                                        '<button data-freezer-max>max</button>'+
                                        '<button data-freezer-min>min</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<input class="input-power" type="number" name="inputFreezer">'+
                                        '<button data-freezer-customValue>Задать</button>'+
                                    '</div>'+
                                    '<div class="colm">'+
                                        '<button data-freezer-increase>+</button>'+
                                        '<button data-freezer-decrease>-</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
							'<div class="colm">'+
								'<button id="delete-device">Удалить устройство</button>'+
							'</div>'+
                        '</div>';
      	elementTv.querySelector('[data-switch-on]').addEventListener('click', this.processSwitchOnClick.bind(this));

		elementTv.querySelector('[data-switch-off]').addEventListener('click', this.processSwitchOffClick.bind(this));

      	elementTv.querySelector('[data-coldstore-max]').addEventListener('click', this.processSetMaxColdstoreClick.bind(this));

      	elementTv.querySelector('[data-coldstore-min]').addEventListener('click', this.processSetMinColdstoreClick.bind(this));

      	elementTv.querySelector('[data-coldstore-decrease]').addEventListener('click', this.processDecreaseColdstoreClick.bind(this));

      	elementTv.querySelector('[data-coldstore-increase]').addEventListener('click', this.processIncreaseColdstoreClick.bind(this));
	
      	elementTv.querySelector('[data-coldstore-customValue]').addEventListener('click', this.processSetCustomColdstoreClick.bind(this));

      	elementTv.querySelector('[data-freezer-max]').addEventListener('click',	this.processSetMaxFreezerClick.bind(this));
	
      	elementTv.querySelector('[data-freezer-min]').addEventListener('click', this.processSetMinFreezerClick.bind(this));

      	elementTv.querySelector('[data-freezer-decrease]').addEventListener('click', this.processDecreaseFreezerClick.bind(this));
	
      	elementTv.querySelector('[data-freezer-increase]').addEventListener('click', this.processIncreaseFreezerClick.bind(this));

      	elementTv.querySelector('[data-freezer-customValue]').addEventListener('click', this.processSetCustomFreezerClick.bind(this));

      	this._element = elementTv;


      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-coldstore');
      	this._valueIndicatorTwo = this._element.querySelector('.device-freezer');
      	this._input = this._element.getElementsByTagName('input')[0];
      	this._inputTwo = this._element.getElementsByTagName('input')[1];
		this._DeleteSubmitBtn = this._element.querySelector('#delete-device');
		this._DeleteSubmitBtn.addEventListener('click', this.processDeleteSubmitClick.bind(this));
	}


    FridgeView.prototype.refreshValueColdstoreView = function() {
		this._valueIndicator.textContent = this._model.getCurrentColdstore();
    }

    FridgeView.prototype.refreshValueFreezerView = function() {
		this._valueIndicatorTwo.textContent = this._model.getCurrentFreezer();
    }

    FridgeView.prototype.clearInputColdstore = function() {
    	this._input.value = null;
    }

    FridgeView.prototype.clearInputFreezer = function() {
    	this._inputTwo.value = null;
    }