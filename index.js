// const inputName = document.getElementById('device-name-input');
// const inputType = document.getElementById('device-type-input');
// const addSubmitBtn = document.getElementById('add-device-submit');
// const errorsBox = document.getElementById('errors-box');
// const devicesArray = [];
const configs = {
    devicesTypes: [
        {
            type: 'lamp',
            title: 'Лампы'
        },
        {
            type: 'fridge',
            title: 'Холодильник'
        },
        {
            type: 'heater',
            title: 'Обогреватель'
        },
        {
            type: 'tv',
            title: 'Телевизор'
        },
        {
            type: 'mwo',
            title: 'СВЧ'
        }
        
    ]
};
let id = 0;
let stor = new Storage();
const container = document.getElementById('container');
const form = new FormView(configs);

container.appendChild(form.element);



// addSubmitBtn.addEventListener('click', processAddSubmit);


// function addDevice(name, type) {
// 	id++;
//     let device;
//     switch(type) {
//         case 'lamp':
//             device = new DeviceLamp(name, id);
//             break;
//         case 'fridge':
//             device = new DeviceFridge(name, id);
//             break;
//         case 'tv':
//             device = new DeviceTv(name, id);
//             break;
//         case 'heater':
//             device = new DeviceHeater(name, id);
//             break;
//         default:
//             return;
//     }
	

//     stor.addDevice(device);
//     console.dir(stor);
//     const lampPlate = new LampView(device);
//     const tvPlate = new TvView(device);
//     const heaterPlate = new HeaterView(device);
//     const fridgePlate = new FridgeView(device);
//     console.dir(lampPlate.element);
//     console.dir(lampPlate);
//     console.dir(tvPlate);
//     console.dir(heaterPlate);
//     console.dir(fridgePlate);
//     document.getElementById('lamps-container').appendChild(lampPlate.element);
//     document.getElementById('lamps-container').appendChild(tvPlate.element);
//     document.getElementById('lamps-container').appendChild(heaterPlate.element);
//     document.getElementById('lamps-container').appendChild(fridgePlate.element);
//     document.getElementById('container').appendChild(form.element);
// }




// function processAddSubmit(event) {
//     errorsBox.innerHTML = '';
//     const deviceName = inputName.value.trim();
//     const deviceType = inputType.value.trim();
//     if (!deviceName || !deviceType) {
//        errorsBox.innerHTML = '<p class="error-message">Поля ввода не должны быть пустыми</p>';
//         return;
//     }
//     addDevice(deviceName, deviceType); 
//     // renderAllDevices();
//     inputName.value = null;
//     inputType.value = 'lamp';
// }








// function renderAllDevices() {
// 	const container = document.getElementById('lamps-container');
// 	container.innerHTML = '';
// 	for (let i = 0; i < devicesArray.length; i++) {
// 		const device = renderDeviceLamp(devicesArray[i]);
// 		device.addEventListener('click', processDeviceCardsClick);
//         container.appendChild(device);
// 	}
// }




