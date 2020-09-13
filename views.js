class LampView {
    constructor(model) {
    	this._model = model;
    	this.element = null;     
    	}

    	

    	processLampPlateClick(event) {}

    	renderLampView(model) { 

    		// const element = document.getElementById('id');
    		if (this.element) {
    			return;
    		}

    		if (!this.element) {
    		
    		this.element = document.createElement('div');
			this.element.classList.add('status-box');
			
			this.element.innerHTML = '<div>'+
								'<p><span>Название:&nbsp;</span>'+
									'<span>' + this._model.name + '</span>'+
								'</p>'+
									'<p><span>Тип:&nbsp;</span>'+
										'<span>' + 'lamp' + '</span>'+
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
	                }
    return this.element;
    	}

    	refreshLampView() {
    	
    	}


	}

	const lampPlate = new LampView('name', 'type');
	lampPlate.renderLampView();
	console.dir(lampPlate);


