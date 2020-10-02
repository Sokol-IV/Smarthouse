const configs = {
    devicesTypes: [
        {
            type: 'lamp',
            title: 'Светильник'
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
    ]
};

const store = new Storage();
const controller = new Controller(store, configs);
controller.init();



