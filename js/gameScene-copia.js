var iconFullscreen;
var detectExitFullScreen = false;
var gameScale;
var containerDogs;
var plataforma;
var cantPerritos=6;

var juego = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function juego() {
		Phaser.Scene.call(this, {
			key: 'juego',
			active: false
		});
	},
	preload: function () {
		this.load.image('background', 'img/background-2.jpg');
		this.load.image('buttonFull', 'img/icon-fullscreen-2.png');
		this.load.image('guia', 'img/guia.png');
		this.load.image('plataforma', 'img/plataform.png');
		this.load.image('building', 'img/building.png');
		//dog1
		this.load.json('jsonAnimDog1','img/dog1/dog1_anim.json');
		this.load.atlas('dog1'/*<-el nombre debe ser el key del archivo jason "key": "firstanimation" o sino no funciona*/,'img/dog1/dog1.png','img/dog1/dog1_atlas.json');
		//dog1
	},

	create: function () {

		canvasGame = $("#phaser-container canvas");
		bg = this.add.image(0, 0, 'background').setOrigin(0.5);
		
		
		building = this.add.tileSprite(0, -180, 2962, 264, 'building').setOrigin(0);
		var container2 = this.add.container(0, topPer(50));
		container2.add([ building]);
		
		plataforma = this.add.tileSprite(0, leftPer(50), 1200, 634, 'plataforma').setOrigin(0);
		var container = this.add.container(0, 0);//dentro de container no trabajar porcentajes
		
		
		//dog1
		var dog1C = this.add.sprite(600,40,'dog1');
		var guia = this.add.sprite(0,0,'guia').setOrigin(0); 
		var animacionDog1=this.cache.json.get('jsonAnimDog1');
		this.anims.fromJSON(animacionDog1);
		dog1C.anims.play('run');
		
		container.add([ guia,dog1C ]);
		
		let timeLine = this.tweens.timeline({
			targets: dog1C,
			ease: 'Power1',
			loop: -1,
			tweens:[
				{
					x:300,
					duration: 3000,
					ease: 'Linear',
					yoyo: true
				},
				{
					x:900,
					duration: 3000,
					ease: 'Linear',
					yoyo: true
				}
			]
		});/**/
        
		//dog1
		

		iconFullscreen = this.add.image(0, 0, 'buttonFull').setOrigin(0).setInteractive({
			useHandCursor: true
		});
		iconFullscreen.on('pointerdown', function (pointer) {
			fullscreen();
		});
		

		//fullscreen
		gameScale = this.game.scale;
		function fullscreen() {
			if (this.game.scale.isFullscreen) {
				this.game.scale.stopFullscreen();
				$("#phaser-container").css({
					"height": "100%",
					"width": "100%"
				});
			} else {
				this.game.scale.startFullscreen();

				$("#phaser-container").css({
					"height": screen.height + "px",
					"width": screen.width + "px"
				});
			}
		}
		
		//ajuste de pantalla
		this.cameras.main.fadeIn(1000);
		this.game.scale.on('enterfullscreen', function () {
			detectExitFullScreen = true;
		});
		
		ajustePantalla();
		this.scale.on('resize', function (gameSize) {
			ajustePantalla();
			
			backgroundCover(bg);
			iconFullscreen.setPosition((leftPer(100)-35),(topPer(0)+10));
			//responsiveImage(container,0,9,0,0);
			//dog1.setPosition(leftPer(50),topPer(50));
			//responsiveImage(dog1C,0.5,2,50,50);
			container.setPosition(0,topPer(50));
			container.setScale(canvasGame.width()/this.game.config.width);
			container2.setPosition(0,topPer(50));
			container2.setScale(canvasGame.width()/this.game.config.width);
			plataforma.setPosition(0,topPer(50));
			plataforma.setScale(canvasGame.width()/this.game.config.width);
			
		}, this);
		//ajuste de pantalla
	},
	update: function (time, delta) {
		
		//ajuste para los botones interactivos
		this.game.scale.resize(canvasGame.width(), canvasGame.height());
		plataforma.tilePositionX +=4;
		building.tilePositionX +=0.1;
	}
});