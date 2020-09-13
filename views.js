class LampView {
    constructor(model) {
    	this._model = model;
    	this._element = null;     
    }

    get element() {
    	if (this._element) {
			return this._element;
		}
		this.renderLampView();
		return this._element;
	}
    	

	processLampPlateClick(event) {}

	renderLampView() { 
		this._element = document.createElement('div');
		this._element.classList.add('status-box');
		this._element.innerHTML = '<div>'+
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

	refreshLampView() {
	
	}


}

	


