const inputName = document.getElementById('device-name-input');
const inputType = document.getElementById('device-type-input');
const addSubmitBtn = document.getElementById('add-device-submit');
const errorsBox = document.getElementById('errors-box');
const devicesArray = [];
let id = 0;



addSubmitBtn.addEventListener('click', processAddSubmit);


function addDevice(name, type) {
	id++;
	const device = createDevice(name, type, id);
    devicesArray.push(device);
    console.dir(devicesArray);
}

function createDevice(name, type, id) {
	const device = {
        name: name,
        type: type,
        id: id
    };
    return device;
}

function processAddSubmit(event) {
    errorsBox.innerHTML = '';
    const deviceName = inputName.value.trim();
    const deviceType = inputType.value.trim();
    if (!deviceName || !deviceType) {
       errorsBox.innerHTML = '<p class="error-message">Поля ввода не должны быть пустыми</p>';
        return;
    }
    addDevice(deviceName, deviceType); 
    renderAllDevices();
    inputName.value = null;
    inputType.value = 'lamp';
}

function processDeviceCardsClick(event) {
    const dataSet = event.target.dataset;
    if (dataSet.switch) {
        const indicator = this.querySelector('.device-state');
        if (dataSet.switch === 'on') {
            indicator.classList.replace('state-off', 'state-on');
            indicator.textContent = 'Включено';
        }
        if (dataSet.switch === 'off') {
            indicator.classList.replace('state-on', 'state-off');
            indicator.textContent = 'Выключено';
        }
    }
    if (dataSet.brightness) {
        const indicatorTwo = this.querySelector('.device-ligth');
        console.dir(dataSet.brightness);
        if (dataSet.brightness === 'max') {
            indicatorTwo.textContent = 100;
        }
        if (dataSet.brightness === 'min') {
            indicatorTwo.textContent = 1;
        }
        if (dataSet.brightness === 'decrease') {
            const value = parseInt(indicatorTwo.textContent);
            if (isNaN(value)) {
                return;
            }
            if (value <= 0) {
                return;
            }
            indicatorTwo.textContent = value - 1;
        }
        if (dataSet.brightness === 'increase') {
            const valueTwo = parseInt(indicatorTwo.textContent);
            // if (isNaN(valueTwo)) {
            // 	return;
            // }
            // if (valueTwo >= 100) {
            // 	return;
            // }
            if (!isNaN(valueTwo) && valueTwo < 100) {
                indicatorTwo.textContent = valueTwo + 1;
            }
            // indicatorTwo.textContent = valueTwo + 1;
        }
        if (dataSet.brightness === 'custom-value') {
        	const inputValue = this.querySelector('.input-power');
        	const value = parseInt(inputValue.value);
            if (isNaN(value)) {
                return;
            }
            if (value < 0 || value > 100) {
                return;
            }
            indicatorTwo.textContent = value;
            inputValue.value = null;
        }
    }

}


function renderDevice(deviceModel) {
		const newDevice = document.createElement('div');
		newDevice.id = deviceModel.id;
		let type = '';
		switch(deviceModel.type) {
			case 'lamp':
				type = 'Светильник';
				break;
			case 'fridge':
				type = 'Холодильник';
				break;
			case 'tv':
				type = 'Телевизор';
				break;
			case 'heater':
				type = 'Обогреватель';
				break;
			default:
				type = '';
				break;
		}
		const newMarkUp =  `<p>
								<span>Название</span>
								<span>${deviceModel.name}</span>
							</p>
							<p>
								<span>Тип</span>
								<span>${type}</span>
							</p>`;
		newDevice.innerHTML = newMarkUp;
		return newDevice;
	}



function renderAllDevices() {
	const container = document.getElementById('lamps-container');
	container.innerHTML = '';
	for (let i = 0; i < devicesArray.length; i++) {
		const device = renderDeviceLamp(devicesArray[i]);
		device.addEventListener('click', processDeviceCardsClick);
        container.appendChild(device);
	}
}

const deviceModel = {
     name: 'lamp-name',
     type: 'lamp',
     id: 'id',
     state: false,
     settings: {
     	minBrightness: 1,
     	maxBrightness: 100,
 	},
     currentBrightness: 1,
     room: 'kitchen',

     switchOn() {
     	if (this.state === true) {
     		return;
     	}
     	this.state = true;
     	console.dir(this);
     },

     switchOff() {
     	if (this.state === false) {
     		return;
     	}
     	this.state = false;
     	console.dir(this);
    },

     setMinBrightness() {
     	this.currentBrightness = this.settings.minBrightness;
     	console.dir(this);
    },

     decreaseBrightness() {
 	    if (this.currentBrightness <= this.settings.minBrightness) {
 	         return;
 	     }
 	     // this.currentBrightness--;
 	    this.currentBrightness -= 1;
 	    console.dir(this);
 	},

 	setCustomValue(value) {
 		if (typeof value !== 'number') {
 			return;
 		}
 		if (value < this.settings.minBrightness || value > this.settings.maxBrightness) {
 			return;
 		}
      this.currentBrightness = value;
      console.dir(this);
 	}
 };


function renderDeviceLamp(deviceModel) {
	const newDeviceLamp = document.createElement('div');
	newDeviceLamp.classList.add('status-box');
	let type = '';
	switch(deviceModel.type) {
		case 'lamp':
			type = 'Светильник';
			break;
		case 'fridge':
			type = 'Холодильник';
			break;
		case 'tv':
			type = 'Телевизор';
			break;
		case 'heater':
			type = 'Обогреватель';
			break;
		default:
			type = '';
			break;
	}
	newDeviceLamp.innerHTML = '<div>'+
								'<p><span>Название:&nbsp;</span>'+
									'<span>' + deviceModel.name + '</span>'+
								'</p>'+
									'<p><span>Тип:&nbsp;</span>'+
										'<span>' + type + '</span>'+
									'</p>'+
							'</div>'+
							'<div>'+
	                            '<div class="status">'+
	                                '<p>Состояние</p>'+
	                                '<p class="device-state state-off">Выключено</p>'+
	                                '<button class="b-status" data-switch="on">Вкл</button>'+
	                                '<button class="b-status" data-switch="off">Выкл</button>'+
	                            '</div>'+
	                            '<div class="power">'+
	                                '<p class="m">'+
	                                    '<span>Текущая яркость:</span>'+
	                                    '<span class="device-ligth">0</span>'+
	                                '</p>'+
	                                '<div class="colm-cont">'+
	                                    '<div class="colm">'+
	                                        '<button data-brightness="max">max</button>'+
	                                        '<button data-brightness="min">min</button>'+
	                                    '</div>'+
	                                    '<div class="colm">'+
	                                        '<input class="input-power" type="number" name="">'+
	                                        '<button data-brightness="custom-value">Задать</button>'+
	                                    '</div>'+
	                                    '<div class="colm">'+
	                                        '<button data-brightness="increase">+</button>'+
	                                        '<button data-brightness="decrease">-</button>'+
	                                    '</div>'+
	                                '</div>'+
	                            '</div>'+
	                        '</div>';
    return newDeviceLamp;
}


