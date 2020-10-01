var detectExitFullScreen = false;
var gameScale;
var iconFullscreen;

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
       
       this.panelChoose = this.add.image(0, 0, 'choosePanel').setOrigin(0);




        iconFullscreen = this.add.image((leftPer(100)-35),(topPer(0)+10), 'buttonFull').setOrigin(0).setInteractive({
            useHandCursor: true
        });
        iconFullscreen.on('pointerdown', function (pointer) {
           fullscreen();

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
			iconFullscreen.setPosition((leftPer(100)-35),(topPer(0)+10));
			
		}, this);
		//ajuste de pantalla
    },
	update: function (time, delta) {
		tiempo += delta;
		//ajuste para los botones interactivos
		this.game.scale.resize(canvasGame.width(), canvasGame.height());
		/****************ajuste para el fullscreen****************************/
		if(this.game.scale.isFullscreen)
		{
			$("#phaser-container").css({
					"height": screen.height + "px",
					"width": screen.width + "px"
			});
		}
		/****************ajuste para el fullscreen****************************/
	}
});