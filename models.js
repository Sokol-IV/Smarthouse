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