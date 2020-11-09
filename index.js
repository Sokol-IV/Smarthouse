var configs = {
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

var store = new Storage();
var controller = new Controller(store, configs);
controller.init();
