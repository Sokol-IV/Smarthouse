class DeviceView {
	constructor(model) {
		this._model = model;
    	this._element = null; 
    	this._input = null;
    	this._inputTwo = null; 
    	this._stateIndicator = null;
    	this._valueIndicator = null;
	}


	processSwitchOnClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOn();
		this.refreshStateDeviceView();
	}

	processSwitchOffClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOff();
		this.refreshStateDeviceView();
	}

	

	refreshStateDeviceView() {
		
		if (this._model.isSwitchedOn) {
			this._stateIndicator.classList.replace('state-off', 'state-on');
            this._stateIndicator.textContent = 'Включено';
        }
        if (!this._model.isSwitchedOn) {
            this._stateIndicator.classList.replace('state-on', 'state-off');
            this._stateIndicator.textContent = 'Выключено';
        }
    }
}


class HeaterView extends DeviceView {
	constructor(name, id) {
		super(name);
    }

	get element() {
    	if (this._element) {
			return this._element;
		}
		this.renderHeaterView();
		return this._element;
	}

	processSetMaxTemperatureClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxTemperature();
		this.refreshValueHeaterView();
	}

	processSetMinTemperatureClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinTemperature();
		this.refreshValueHeaterView();
	}

	processDecreaseTemperatureClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseTemperature();
		this.refreshValueHeaterView();
	}

	processIncreaseTemperatureClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseTemperature();
		this.refreshValueHeaterView();
	}

	processSetCustomTemperatureClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomTemperature(this._input.value);
		this.refreshValueHeaterView();
		this.clearInput();
	}

	renderHeaterView() { 
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
                        '</div>';

      	element.querySelector('[data-switch-on]').addEventListener('click', (event) => {
      		this.processSwitchOnClick(event);
      	}); 

		element.querySelector('[data-switch-off]').addEventListener('click', (event) => {
      		this.processSwitchOffClick(event);
      	});

      	element.querySelector('[data-temperature-max]').addEventListener('click', (event) => {
      		this.processSetMaxTemperatureClick(event);
      	});

      	element.querySelector('[data-temperature-min]').addEventListener('click', (event) => {
      		this.processSetMinTemperatureClick(event);
      	});

      	element.querySelector('[data-temperature-decrease]').addEventListener('click', (event) => {
      		this.processDecreaseTemperatureClick(event);
      	});

      	element.querySelector('[data-temperature-increase]').addEventListener('click', (event) => {
      		this.processIncreaseTemperatureClick(event);
      	});

      	element.querySelector('[data-temperature-customValue]').addEventListener('click', (event) => {
      		this.processSetCustomTemperatureClick(event);
      	}); 

      	this._element = element;  
      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-temp'); 
      	this._input = this._element.querySelector('input.input-power');
	}

	refreshValueHeaterView() {
		this._valueIndicator.textContent = this._model.currentTemperature;
		console.dir(this._model.currentTemperature);
        
    }

    clearInput() {
    	this._input.value = null;
    }
}




class LampView {
    constructor(model) {
    	this._model = model;
    	this._element = null; 
    	this._input = null;
    	this._stateIndicator = null;
    	this._valueIndicator = null;    
    }

    get element() {
    	if (this._element) {
			return this._element;
		}
		this.renderLampView();
		return this._element;
	}
    	

	processSwitchOnClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOn();
		this.refreshStateLampView();
	}

	processSwitchOffClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOff();
		this.refreshStateLampView();
	}

	processSetMaxBrightnessClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxBrightness();
		this.refreshValueLampView();
	}

	processSetMinBrightnessClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinBrightness();
		this.refreshValueLampView();
	}

	processDecreaseBrightnessClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseBrightness();
		this.refreshValueLampView();
	}

	processIncreaseBrightnessClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseBrightness();
		this.refreshValueLampView();
	}

	processSetCustomBrightnessClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomBrightness(this._input.value);
		this.refreshValueLampView();
		this.clearInput();
	}

	renderLampView() { 
		const element = document.createElement('div');
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
                        '</div>';

      	element.querySelector('[data-switch-on]').addEventListener('click', (event) => {
      		this.processSwitchOnClick(event);
      	}); 

		element.querySelector('[data-switch-off]').addEventListener('click', (event) => {
      		this.processSwitchOffClick(event);
      	});

      	element.querySelector('[data-brightness-max]').addEventListener('click', (event) => {
      		this.processSetMaxBrightnessClick(event);
      	});

      	element.querySelector('[data-brightness-min]').addEventListener('click', (event) => {
      		this.processSetMinBrightnessClick(event);
      	});

      	element.querySelector('[data-brightness-decrease]').addEventListener('click', (event) => {
      		this.processDecreaseBrightnessClick(event);
      	});

      	element.querySelector('[data-brightness-increase]').addEventListener('click', (event) => {
      		this.processIncreaseBrightnessClick(event);
      	});

      	element.querySelector('[data-brightness-customValue]').addEventListener('click', (event) => {
      		this.processSetCustomBrightnessClick(event);
      	}); 

      	this._element = element;  
      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-ligth'); 
      	this._input = this._element.querySelector('input.input-power');
	}

	refreshStateLampView() {
		
		if (this._model.isSwitchedOn) {
			this._stateIndicator.classList.replace('state-off', 'state-on');
            this._stateIndicator.textContent = 'Включено';
        }
        if (!this._model.isSwitchedOn) {
            this._stateIndicator.classList.replace('state-on', 'state-off');
            this._stateIndicator.textContent = 'Выключено';
        }
    }

    refreshValueLampView() {
		this._valueIndicator.textContent = this._model.currentBrightness;
        
    }

    clearInput() {
    	this._input.value = null;
    }
}
 





class TvView {
    constructor(model) {
    	this._model = model;
    	this._element = null; 
    	this._input = null;
    	this._inputTwo = null;
    	this._stateIndicator = null;
    	this._valueIndicator = null;    
    }

    get element() {
    	if (this._element) {
		return this._element;
		}
		this.renderTvView();
		return this._element;
	}
    	

	processSwitchOnClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOn();
		this.refreshStateTvView();
	}

	processSwitchOffClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.switchOff();
		this.refreshStateTvView();
	}

	processSetMaxChannelClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxChannel();
		this.refreshValueChannelView();
	}

	processSetMinChannelClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinChannel();
		this.refreshValueChannelView();
	}

	processDecreaseChannelClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseChannel();
		this.refreshValueChannelView();
	}

	processIncreaseChannelClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseChannel();
		this.refreshValueChannelView();
	}

	processSetCustomChanelClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomChannel(this._input.value);
		this.refreshValueChannelView();
		this.clearInputChannel();
	}

	processSetMaxVolumeClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxVolume();
		this.refreshValueVolumeView();
	}

	processSetMinVolumeClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinVolume();
		this.refreshValueVolumeView();
	}

	processDecreaseVolumeClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseVolume();
		this.refreshValueVolumeView();
	}

	processIncreaseVolumeClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseVolume();
		this.refreshValueVolumeView();
	}

	processSetCustomVolumeClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomVolume(this._inputTwo.value);
		this.refreshValueVolumeView();
		this.clearInputVolume();
	}

	renderTvView() {
		const elementTv = document.createElement('div');
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
                        '</div>';
      	elementTv.querySelector('[data-switch-on]').addEventListener('click', (event) => {
      		this.processSwitchOnClick(event);
      	}); 

		elementTv.querySelector('[data-switch-off]').addEventListener('click', (event) => {
      		this.processSwitchOffClick(event);
      	});

      	elementTv.querySelector('[data-channel-max]').addEventListener('click', (event) => {
      		this.processSetMaxChannelClick(event);
      	});

      	elementTv.querySelector('[data-channel-min]').addEventListener('click', (event) => {
      		this.processSetMinChannelClick(event);
      	});

      	elementTv.querySelector('[data-channel-decrease]').addEventListener('click', (event) => {
      		this.processDecreaseChannelClick(event);
      	});

      	elementTv.querySelector('[data-channel-increase]').addEventListener('click', (event) => {
      		this.processIncreaseChannelClick(event);
      	});

      	elementTv.querySelector('[data-channel-customValue]').addEventListener('click', (event) => {
      		this.processSetCustomChanelClick(event);
      	}); 

      	elementTv.querySelector('[data-volume-max]').addEventListener('click', (event) => {
      		this.processSetMaxVolumeClick(event);
      	});

      	elementTv.querySelector('[data-volume-min]').addEventListener('click', (event) => {
      		this.processSetMinVolumeClick(event);
      	});

      	elementTv.querySelector('[data-volume-decrease]').addEventListener('click', (event) => {
      		this.processDecreaseVolumeClick(event);
      	});

      	elementTv.querySelector('[data-volume-increase]').addEventListener('click', (event) => {
      		this.processIncreaseVolumeClick(event);
      	});

      	elementTv.querySelector('[data-volume-customValue]').addEventListener('click', (event) => {
      		this.processSetCustomVolumeClick(event);
      	}); 

      	this._element = elementTv; 

      	
      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-channel');
      	this._valueIndicatorTwo = this._element.querySelector('.device-volume'); 
      	this._input = this._element.getElementsByTagName('input')[0];
      	this._inputTwo = this._element.getElementsByTagName('input')[1];  
	}

	refreshStateTvView() {
		
		if (this._model.isSwitchedOn) {
			this._stateIndicator.classList.replace('state-off', 'state-on');
            this._stateIndicator.textContent = 'Включено';
        }
        if (!this._model.isSwitchedOn) {
            this._stateIndicator.classList.replace('state-on', 'state-off');
            this._stateIndicator.textContent = 'Выключено';
        }
    }

    refreshValueChannelView() {
		this._valueIndicator.textContent = this._model.currentChannel;
    }

    refreshValueVolumeView() {
		this._valueIndicatorTwo.textContent = this._model.currentVolume;
    }

    clearInputChannel() {
    	this._input.value = null;
    }

    clearInputVolume() {
    	this._inputTwo.value = null;
    }

}

	


class FridgeView extends DeviceView {
    constructor(name, id) {
    	super(name);
    	// this._inputTwo = null;  
    }

    get element() {
    	if (this._element) {
		return this._element;
		}
		this.renderFridgeView();
		return this._element;
	}
    	

	processSetMaxColdstoreClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxColdstore();
		this.refreshValueColdstoreView();
	}

	processSetMinColdstoreClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinColdstore();
		this.refreshValueColdstoreView();
	}

	processDecreaseColdstoreClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseColdstore();
		this.refreshValueColdstoreView();
	}

	processIncreaseColdstoreClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseColdstore();
		this.refreshValueColdstoreView();
	}

	processSetCustomColdstoreClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomColdstore(this._input.value);
		this.refreshValueColdstoreView();
		this.clearInputColdstore();
	}

	processSetMaxFreezerClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMaxFreezer();
		this.refreshValueFreezerView();
	}

	processSetMinFreezerClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setMinFreezer();
		this.refreshValueFreezerView();
	}

	processDecreaseFreezerClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.decreaseFreezer();
		this.refreshValueFreezerView();
	}

	processIncreaseFreezerClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.increaseFreezer();
		this.refreshValueFreezerView();
	}

	processSetCustomFreezerClick(event) {
		event.preventDefault();
		event.stopPropagation();
		this._model.setCustomFreezer(this._inputTwo.value);
		this.refreshValueFreezerView();
		this.clearInputFreezer();
	}

	renderFridgeView() {
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
                        '</div>';
      	elementTv.querySelector('[data-switch-on]').addEventListener('click', (event) => {
      		this.processSwitchOnClick(event);
      	}); 

		elementTv.querySelector('[data-switch-off]').addEventListener('click', (event) => {
      		this.processSwitchOffClick(event);
      	});

      	elementTv.querySelector('[data-coldstore-max]').addEventListener('click', (event) => {
      		this.processSetMaxColdstoreClick(event);
      	});

      	elementTv.querySelector('[data-coldstore-min]').addEventListener('click', (event) => {
      		this.processSetMinColdstoreClick(event);
      	});

      	elementTv.querySelector('[data-coldstore-decrease]').addEventListener('click', (event) => {
      		this.processDecreaseColdstoreClick(event);
      	});

      	elementTv.querySelector('[data-coldstore-increase]').addEventListener('click', (event) => {
      		this.processIncreaseColdstoreClick(event);
      	});

      	elementTv.querySelector('[data-coldstore-customValue]').addEventListener('click', (event) => {
      		this.processSetCustomColdstoreClick(event);
      	}); 

      	elementTv.querySelector('[data-freezer-max]').addEventListener('click', (event) => {
      		this.processSetMaxFreezerClick(event);
      	});

      	elementTv.querySelector('[data-freezer-min]').addEventListener('click', (event) => {
      		this.processSetMinFreezerClick(event);
      	});

      	elementTv.querySelector('[data-freezer-decrease]').addEventListener('click', (event) => {
      		this.processDecreaseFreezerClick(event);
      	});

      	elementTv.querySelector('[data-freezer-increase]').addEventListener('click', (event) => {
      		this.processIncreaseFreezerClick(event);
      	});

      	elementTv.querySelector('[data-freezer-customValue]').addEventListener('click', (event) => {
      		this.processSetCustomFreezerClick(event);
      	}); 

      	this._element = elementTv; 

      	
      	this._stateIndicator = this._element.querySelector('.device-state');
      	this._valueIndicator = this._element.querySelector('.device-coldstore');
      	this._valueIndicatorTwo = this._element.querySelector('.device-freezer'); 
      	this._input = this._element.getElementsByTagName('input')[0];
      	this._inputTwo = this._element.getElementsByTagName('input')[1];  
	}

	

    refreshValueColdstoreView() {
		this._valueIndicator.textContent = this._model.currentColdstore;
    }

    refreshValueFreezerView() {
		this._valueIndicatorTwo.textContent = this._model.currentFreezer;
		console.dir(this._model.currentFreezer);
    }

    clearInputColdstore() {
    	this._input.value = null;
    }

    clearInputFreezer() {
    	this._inputTwo.value = null;
    }

}



	

