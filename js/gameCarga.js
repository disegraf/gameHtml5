var dogsScale=0.5;
var Carga = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize: function Carga() {
		Phaser.Scene.call(this, {
			key: 'carga',
			active: true
		});
	},

	preload: function () {
		this.load.image('logo', 'img/logo-02.png');
		this.load.image('background', 'img/background-2.jpg');
		this.load.image('buttonFull', 'img/icon-fullscreen-2.png');
		this.load.image('guia', 'img/guia.png');
		this.load.image('plataforma', 'img/plataform.png');
		this.load.image('building', 'img/building.png');
		this.load.image('barra', 'img/bar.png');
		this.load.image('barraFill', 'img/bar-fill.png');
		this.load.image('partida', 'img/partida-render.png');
		this.load.image('llegada', 'img/llegada.png');
		
		//choose dogs
		this.load.image('bg-choose', 'img/background.jpg');
		this.load.image('choosePanel', 'img/chooseDogPanel.png');
		this.load.image('btnStart', 'img/start.png');

	
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		
			//if is mobile
			dogsScale=1.5;
			//dogs
			this.load.animation('jsonAnimDog1','img/dogs/dog_mobile_anim1.json');
			this.load.animation('jsonAnimDog2','img/dogs/dog_mobile_anim2.json');
			this.load.animation('jsonAnimDog3','img/dogs/dog_mobile_anim3.json');
			this.load.animation('jsonAnimDog4','img/dogs/dog_mobile_anim4.json');
			this.load.animation('jsonAnimDog5','img/dogs/dog_mobile_anim5.json');
			this.load.animation('jsonAnimDog6','img/dogs/dog_mobile_anim6.json');

			//dogs
			this.load.atlas('dog1','img/dogs/dog1-mobile.png','img/dogs/dog_mobile1.json');
			this.load.atlas('dog2','img/dogs/dog2-mobile.png','img/dogs/dog_mobile2.json');
			this.load.atlas('dog3','img/dogs/dog3-mobile.png','img/dogs/dog_mobile3.json');
			this.load.atlas('dog4','img/dogs/dog4-mobile.png','img/dogs/dog_mobile4.json');
			this.load.atlas('dog5','img/dogs/dog5-mobile.png','img/dogs/dog_mobile5.json');
			this.load.atlas('dog6','img/dogs/dog6-mobile.png','img/dogs/dog_mobile6.json');


		}else{

			//no mobile version
		
			this.load.atlas('dog1','img/dogs/dog1.png','img/dogs/dog_atlas1.json');
			this.load.atlas('dog2','img/dogs/dog2.png','img/dogs/dog_atlas2.json');
			this.load.atlas('dog3','img/dogs/dog3.png','img/dogs/dog_atlas3.json');
			this.load.atlas('dog4','img/dogs/dog4.png','img/dogs/dog_atlas4.json');
			this.load.atlas('dog5','img/dogs/dog5.png','img/dogs/dog_atlas5.json');
			this.load.atlas('dog6','img/dogs/dog6.png','img/dogs/dog_atlas6.json');


			this.load.animation('jsonAnimDog1','img/dogs/dog1_anim.json');
			this.load.animation('jsonAnimDog2','img/dogs/dog2_anim.json');
			this.load.animation('jsonAnimDog3','img/dogs/dog3_anim.json');
			this.load.animation('jsonAnimDog4','img/dogs/dog4_anim.json');
			this.load.animation('jsonAnimDog5','img/dogs/dog5_anim.json');
			this.load.animation('jsonAnimDog6','img/dogs/dog6_anim.json');

		}

		this.load.image('dogImage1', 'img/dogs/1.png');
		this.load.image('dogImage2', 'img/dogs/2.png');
		this.load.image('dogImage3', 'img/dogs/3.png');
		this.load.image('dogImage4', 'img/dogs/4.png');
		this.load.image('dogImage5', 'img/dogs/5.png');
		this.load.image('dogImage6', 'img/dogs/6.png');

		
		this.load.image('panelNumeros', 'img/rank_panel-2.png');
		this.load.atlas('numeros','img/numeros/numeros.png','img/numeros/numeros_atlas.json');
		//dogs
		
		this.load.image('panelGanador', 'img/panel-ganador.png');

		this.load.image('selector', 'img/selector.png');
		this.load.image('refresh', 'img/icon-refresh.png');

		canvasGame = $("#phaser-container canvas");
		/**********************************************/
		/*preload*/
		/**********************************************/
		var bg = this.add.graphics();
		bg.fillStyle(0x000000, 1);
		bg.fillRect(0, 0, canvasGame.width(), canvasGame.height());
		

		var textoCarga = this.add.text((50 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) + 30, 'cargando...').setOrigin(0.5);
		textoCarga.setFontSize(12);
		textoCarga.setFontFamily('Helvetica, Arial');

		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();

		this.load.on('progress', function (value) {
			console.log(value);

			progressBox.clear();
			progressBox.fillStyle(0x222222, 0.8);
			progressBox.fillRect((25 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) - 20, (50 * canvasGame.width() / 100), 20);

			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			var widthBar = (50 * canvasGame.width() / 100) - 8;
			progressBar.fillRect((25 * canvasGame.width() / 100) + 4, (50 * canvasGame.height() / 100) - 16, (widthBar * value), 12);

			textoCarga.setPosition((50 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) + 10);
			textoCarga.setText('cargando...' + parseInt(value * 100) + "%");
		});

		this.load.on('fileprogress', function (file) {
			//console.log(file.src);
		});

		this.load.on('complete', function () {
			console.log('complete');
			progressBar.destroy();
			progressBox.destroy();
			textoCarga.destroy();
		});

		/**********************************************/
		/*preload*/
		/**********************************************/




	},

	create: function () {

		/*centro del escenario*/
		var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.logo = this.add.image(0, 0, 'logo').setScale(1).setOrigin(0.5).setPosition(screenCenterX, screenCenterY);
		this.logo.alpha = 0;

		//agregando efecto de intro
		this.tweens.add({
			targets: this.logo,
			duration: 2500,
			alpha: 1,
			repeat: 0,
			yoyo: true,
			ease: 'Power1',
			onStart: () => console.log("iniciando Animacion"),
			onComplete: function () {
				//game.scene.start('juego');
				game.scene.start('chooseDog');
				game.scene.remove('carga');
				//game.scene.start('panelGanadorFinal');
			}
		});

		this.scale.on('resize', function (gameSize) {
			screenCenterX = canvasGame.width() / 2;
			screenCenterY = canvasGame.height() / 2;
			this.logo.setPosition(screenCenterX, screenCenterY);
		}, this);

	},
	update: function (time, delta) {


	}

});