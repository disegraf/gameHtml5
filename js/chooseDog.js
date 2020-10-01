var detectExitFullScreen = false;
var gameScale;
var iconFullscreen;
var selectedDog=-1;

var panelChooseDog = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function panelChooseDog() {
		Phaser.Scene.call(this, {
			key: 'chooseDog',
			active: false
		});
	},
	create: function () {

		canvasGame = $("#phaser-container canvas");
		this.bgChooseDog = this.add.image(leftPer(50), topPer(50), 'bg-choose').setOrigin(0.5);

		this.container = this.add.container(0, topPer(50));
		this.guia = this.add.sprite(0,0,'guia').setOrigin(0);
		this.container.add(this.guia);

		this.panelChoose = this.add.image(147, -280, 'choosePanel').setOrigin(0);
		this.container.add(this.panelChoose);

		this.btnStart = this.add.image( 600, 310, 'btnStart').setOrigin(0.5).setAlpha(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.btnStart);

		this.imageDogs=[];

		this.imageDogs[0]=this.add.sprite(325,-197,`dogImage1`).setScale(0.185).setOrigin(0).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageDogs[0]);

		this.imageDogs[1]=this.add.sprite(640,-197,`dogImage2`).setScale(0.185).setOrigin(0).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageDogs[1]);

		this.imageDogs[2]=this.add.sprite(325,-40,`dogImage3`).setScale(0.185).setOrigin(0).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageDogs[2]);

		this.imageDogs[3]=this.add.sprite(640,-40,`dogImage4`).setScale(0.185).setOrigin(0).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageDogs[3]);

		this.imageDogs[4]=this.add.sprite(325, 118,`dogImage5`).setScale(0.185).setOrigin(0).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageDogs[4]);

		this.imageDogs[5]=this.add.sprite(640, 118,`dogImage6`).setScale(0.185).setOrigin(0).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageDogs[5]);


		for(let i=0 ;i<this.imageDogs.length;i++)
		{
			this.imageDogs[i].on('pointerdown', function (pointer) {
				desactivateRestDogs(this.imageDogs);
				this.imageDogs[i].setAlpha(1);
				this.btnStart.setAlpha(1);
				selectedDog=i;
			}, this);

			this.imageDogs[i].on('pointerover', function (pointer) {
				this.imageDogs[i].setAlpha(1);
			}, this);

			this.imageDogs[i].on('pointerout', function (pointer) {
				if(selectedDog!=i && selectedDog!=-1 ) this.imageDogs[i].setAlpha(0.25);
			}, this);
		}

		function desactivateRestDogs(array)
		{
			for(let i=0 ;i<array.length;i++)
			{
				array[i].setAlpha(0.25);
			}
		}


		iconFullscreen = this.add.image((leftPer(100) - 35), (topPer(0) + 10), 'buttonFull').setOrigin(0).setInteractive({
			useHandCursor: true
		});
		iconFullscreen.on('pointerdown', function (pointer) {
			fullscreen();

		}, this);

		this.btnStart.on('pointerdown', function (pointer) {
			if( selectedDog!=-1 )
			{
				game.scene.start('juego');
				game.scene.remove('chooseDog');
			}
		}, this);

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

			backgroundCover(this.bgChooseDog);
			iconFullscreen.setPosition((leftPer(100) - 35), (topPer(0) + 10));

			this.container.setPosition(0, topPer(40));
			this.container.setScale(canvasGame.width() / this.game.config.width);

		}, this);
		//ajuste de pantalla
	},
	update: function (time, delta) {
		tiempo += delta;
		//ajuste para los botones interactivos
		this.game.scale.resize(canvasGame.width(), canvasGame.height());
		/****************ajuste para el fullscreen****************************/
		if (this.game.scale.isFullscreen) {
			$("#phaser-container").css({
				"height": screen.height + "px",
				"width": screen.width + "px"
			});
		}
		/****************ajuste para el fullscreen****************************/
	}
});