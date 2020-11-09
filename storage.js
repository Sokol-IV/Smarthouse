function Storage() {
        this._state = {};
	}
	
    Storage.prototype.getDevice = function(id) {
        if (
            !id ||
            !this._state[id]
        ) {
            return null;
        }
        return this._state[id];
    }
   
    Storage.prototype.addDevice = function(model, view) {
        if (
            !model ||
            !view ||
            !model.id ||
            !view.getId() ||
            model.id !== view.getId()
        ) {
            return false;
        }
        this._state[model.id] = { 
            model:model, 
            view: view
            };
        return !!this._state[model.id];
    }

    Storage.prototype.removeDevice = function(id) {
        if (id && this._state[id]) {
            delete this._state[id];
            return typeof this._state[id] === 'undefined';
        }
        return false; 
    }
