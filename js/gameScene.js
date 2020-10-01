var iconFullscreen;
var detectExitFullScreen = false;
var gameScale;
var cantPerritos=6;
var inicioJuego=false;
var delayJuego=3000;
var tiempo=0;
var perritos= [];
var gameEnd=false;
var posicionesPuestoNumero=[1013,832,652,471,291,110];
var dogs=[];
var numeros=[];
let selector;

var juego = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function juego() {
		Phaser.Scene.call(this, {
			key: 'juego',
			active: false
		});
	},
	preload: function () {

	},

	create: function () {

		

		canvasGame = $("#phaser-container canvas");
		bg = this.add.image(0, 0, 'background').setOrigin(0.5);
		
		
		building = this.add.tileSprite(0, -180, 2962, 264, 'building').setOrigin(0);
		var container2 = this.add.container(0, topPer(50));
		container2.add([ building]);
		
		
		this.plataforma = this.add.tileSprite(0, leftPer(50), 1200, 634, 'plataforma').setOrigin(0);
		this.partida= this.add.tileSprite(0, -170, 193, 385, 'partida').setOrigin(0);
		this.animacionPartida=this.tweens.add({
					targets: this.partida,
					x: -200,
					ease: 'linear',
					duration: 1000,
					delay:delayJuego
		});

		var container = this.add.container(0, 0);//dentro de container no trabajar porcentajes
		var guia = this.add.sprite(0,0,'guia').setOrigin(0); //guia para ver tamaños
		container.add(this.partida);

		this.llegada=this.add.image(1500, -206, 'llegada').setOrigin(0);//700
		var conLlegada=this.llegada;
		this.tweens.add({
			targets: conLlegada,
			x: -200,
			ease: 'Linear',
			duration: 2000,
			onComplete:  function(){
			},
			delay: 22000
		});
		container.add(this.llegada);

		var containerBar=this.add.container(0, 0);
		var barra = this.add.tileSprite(24, 25, 1152, 40, 'barra').setOrigin(0);
		var barraFill = this.add.tileSprite(36, 0, 1129, 90, 'barraFill').setOrigin(0).setScale(0, 1);
		containerBar.add([ barra, barraFill]);
		var tweenBarra=this.tweens.add({
					targets: barraFill,
					scaleX: 1,
					ease: 'Sine.easeIn',
					duration: 23000,
					onComplete:  function(){
						terminarJuego();
						gameEnd=true;
						adjustFinalPositions();
					}
		});
		
		
		//perritos
		
		this.animacionDogs=[];
		this.animat=[];
		
		var espacioEntrePerritos=25;
		var tiempoCorrida=12000;
		
		let perrosGanadores = [0, 1, 2, 3, 4, 5];
		perrosGanadores = perrosGanadores.sort(() => Math.random() - 0.5);
		//console.info(perrosGanadores);
		
		let posicionPerritos= [];
				
		
		//agregando animaciones iniciales
		for(i=0; i<cantPerritos; i++)
		{
			dogs[i]= this.add.sprite( Phaser.Math.Between(-350, -150) , (50+(i*espacioEntrePerritos)) ,`dog${i+1}` ).play(`run${i+1}`);//.play(`run${i+1}`)
			dogs[i].setScale(dogsScale);
			//this.dogs[i].anims.play('run');
			dogs[i].anims.msPerFrame = 15+i;
			container.add(dogs[i]);
			var tiempoInicial=Phaser.Math.Between(1000, tiempoCorrida/2);
			
			
			//agregando animaciones
			if(perrosGanadores[1]==i)
			{
			   this.tweens.timeline({
				targets: dogs[i],
				ease: 'Power1',
				yoyo: false,	
				loop: 0,				
				tweens:[
					{
						x:500,
						duration: delayJuego,
						onComplete: () => inicioJuego=true,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					}
					,
					{
						x:700,
						duration: 8000,
					}
				]
				});
			}else if(perrosGanadores[2]==i)
			{
				this.tweens.timeline({
				targets: dogs[i],
				ease: 'Power1',
				yoyo: false,	
				loop: 0,
				tweens:[
					{
						x:500,
						duration: delayJuego,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					}
					,
					{
						x:650,
						duration: 7000,
					}
				]
				});
			}else if(perrosGanadores[3]==i)
			{
				this.tweens.timeline({
				targets: dogs[i],
				ease: 'Power1',
				yoyo: false,	
				loop: 0,
				tweens:[
					{
						x:500,
						duration: delayJuego,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					}
					,
					{
						x:600,
						duration: 8000,
					}
				]
				});
			}else{
				this.tweens.timeline({
				targets: dogs[i],
				ease: 'Power1',
				yoyo: false,	
				loop: 0,
				tweens:[
					{
						x:500,
						duration: delayJuego,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					},
					{
						x:Phaser.Math.Between(200, 300),
						duration: (9000),
					}
				]
				});
			}
			//agregando animaciones
			
		}
		container.add(guia);
		
		//perritos
		
		//panel numeros
		var containerNumeros=this.add.container(0, 900);
		this.panelNumero= this.add.image(0, -180, 'panelNumeros').setOrigin(0);
		containerNumeros.add(this.panelNumero);
		//panel numeros

		
		///agregando numeros
		
		
		this.tweenNumeros=[];
		for(let i=0;i<6;i++)
		{
			numeros[i]=this.add.image(0, -90, 'numeros', 'num'+(i+1)).setOrigin(0);
			containerNumeros.add(numeros[i]);
			this.tweenNumeros[i]=this.tweens.add({
					targets: numeros[i],
					x: posicionesPuestoNumero[5],
					ease: 'Sine.easeIn',
					duration: 20000
			});/**/
		}
		
		//containerNumeros.add([ this.panelNumero,this.numeroUno,this.numeroDos,this.numeroTres,this.numeroCuatro,this.numeroCinco,this.numeroSeis ]);
		///agregando numeros
		
		selector=this.add.image(0, 0, 'selector').setOrigin(0.5);
		containerNumeros.add(selector);
		
		
		function terminarJuego()
		{
			//this.scene.scene.pause('juego');
			takeShoot();
		}
		
		function adjustFinalPositions()
		{
			console.info(perritos);
			console.info(posicionesPuestoNumero);
			console.info(numeros);
			for(let i = 0 ; i<6; i++)
			{
				numeros[perritos[i].id].x=posicionesPuestoNumero[i];
			}
			
		}
		
		var textureManager = this.textures;
		var imagenCapture=this;
		var camara=this.cameras.main;
		var escena=this.scene;
		var tweenShoot=this.tweens;
		
		function takeShoot()
		{
			$("#phaser-container").addClass("grayScale");
			
		 	this.game.renderer.snapshotArea(0,0, canvasGame.width(), canvasGame.height(), function (image)
			{
				camara.flash(1000);
				camara.on('cameraflashcomplete', function () {
					console.log("camara flash terminado");
					$("#phaser-container").removeClass("grayScale");
				});
				if (textureManager.exists('area'))
				{
					textureManager.remove('area');
				}
				textureManager.addImage('area', image);
				var imageGen=imagenCapture.add.image(canvasGame.width()/2,canvasGame.height()/2, 'area').setOrigin(0.5);
				
				tweenShoot.add({
					targets: imageGen,
					scaleX: 0,
					scaleY: 0,
					x:canvasGame.width()/2,
					y:canvasGame.height()/2,
					ease: 'Sine.easeIn',
					duration: 3000,
					delay:3000,
					onComplete:  function(){
						$("#phaser-container").removeClass("grayScale");
						
						game.scene.start('panelGanadorFinal');
						
						//game.scene.remove('juego');
						
					}
				});

			});
		}
		
		//this.tweens.timeScale = 0.01;
		
		


		iconFullscreen = this.add.image(0, 0, 'buttonFull').setOrigin(0).setInteractive({
			useHandCursor: true
		});
		iconFullscreen.on('pointerdown', function (pointer) {
			fullscreen();
			
		},this);

		

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
			
			backgroundCover(bg);
			iconFullscreen.setPosition((leftPer(100)-35),(topPer(0)+10));
			//responsiveImage(container,0,9,0,0);
			//dog1.setPosition(leftPer(50),topPer(50));
			//responsiveImage(dog1C,0.5,2,50,50);
			container.setPosition(0,topPer(40));
			container.setScale(canvasGame.width()/this.game.config.width);
			container2.setPosition(0,topPer(40));
			container2.setScale(canvasGame.width()/this.game.config.width);
			this.plataforma.setPosition(0,topPer(40));
			this.plataforma.setScale(canvasGame.width()/this.game.config.width);
			/*this.partida.setPosition(0,topPer(30));
			this.partida.setScale(canvasGame.width()/this.game.config.width);*/
			containerNumeros.setPosition(0,topPer(100));
			containerNumeros.setScale(canvasGame.width()/this.game.config.width);
			containerBar.setScale(canvasGame.width()/this.game.config.width);
			
		}, this);
		//ajuste de pantalla

		
		
	},
	calculatePositions: function ()
	{
		//perritos
		perritos= [];
		for(let i = 0 ; i<dogs.length; i++)
		{
			perritos.push({ 'id': i , 'posicion': dogs[i].x});
		}
		perritos=perritos.sort(function (x, y) {
			return y.posicion - x.posicion;
		});
			//console.info(perritos);
			//console.table(perritos);
		//perritos
		//actualizando animacion de posiciones
		for(let i = 0 ; i<6; i++)
		{
			this.tweenNumeros[perritos[i].id].updateTo('x', posicionesPuestoNumero[i], true);
			//this.numeros[perritos[i].id].x=this.posicionesPuestoNumero[i];
		}
		//actualizando animacion de posiciones
	},
	update: function (time, delta) {
		tiempo += delta;
		//ajuste para los botones interactivos
		this.game.scale.resize(canvasGame.width(), canvasGame.height());
		if(tiempo>=delayJuego && inicioJuego )
		{
			this.plataforma.tilePositionX +=10;
			building.tilePositionX +=0.2;
		}

		if(!gameEnd)this.calculatePositions();

		selector.y=-95;
		selector.x=numeros[selectedDog].x + 28;
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