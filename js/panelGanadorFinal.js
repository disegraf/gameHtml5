var panelGanadorFinal = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function juego() {
        Phaser.Scene.call(this, {
            key: 'panelGanadorFinal',
            active: false
        });
    },
    create: function () {

        console.log(`Winners dogs are ${perritos[0].id}, ${perritos[1].id} and ${perritos[2].id} `);

        let winnersDogs=[];
        winnersDogs[0]="dogImage"+(parseInt(perritos[0].id)+1);
        winnersDogs[1]="dogImage"+(parseInt(perritos[1].id)+1);
        winnersDogs[2]="dogImage"+(parseInt(perritos[2].id)+1);

        let bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.7);
        bg.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        this.panelGanadorFinal=this.add.image(-395, -280, 'panelGanador').setOrigin(0);
        this.containerPopUpGanadores=this.add.container(leftPer(50),topPer(50));
        this.containerPopUpGanadores.add(this.panelGanadorFinal);
        
        this.first=this.add.image(-315, -131, winnersDogs[0]).setOrigin(0).setScale(0.25);
        this.containerPopUpGanadores.add(this.first);

        this.second=this.add.image(44, -200, winnersDogs[1]).setOrigin(0).setScale(0.20);
        this.containerPopUpGanadores.add(this.second);

        this.third=this.add.image(30, 10, winnersDogs[2]).setOrigin(0).setScale(0.20);
        this.containerPopUpGanadores.add(this.third);

        this.btnRefresh=this.add.image(320, -195, 'refresh').setOrigin(0.5).setInteractive({
			useHandCursor: true
		});
        this.containerPopUpGanadores.add(this.btnRefresh);

        this.btnRefresh.on('pointerdown', function (pointer) {
            location.reload();
        }, this);

        //results 
        let textStatus="YOU LOSE";
        if(parseInt(selectedDog)==parseInt(perritos[0].id))
        {
            textStatus="YOU WIN";
        }
        console.log(`DOG WINNER: ${parseInt(perritos[0].id)} - DOG CHOOSED: ${parseInt(selectedDog)}`);
        //results        
        this.textStatusInGame = this.add.text(-160, 133, textStatus, {
            fontFamily: 'Arial',
            fontStyle: 'bold',
            fontSize: '50px',
            align: 'center',
            color: '#ffffff',
        });
        this.textStatusInGame.setOrigin(0.5);
        this.containerPopUpGanadores.add(this.textStatusInGame);

        this.scale.on('resize', function () {
           this.containerPopUpGanadores.setScale(canvasGame.width()/this.game.config.width);
           this.containerPopUpGanadores.setPosition(leftPer(50),topPer(50)); /**/
        }, this);

        this.scale.on('resize', function () {
            
           bg.clear();
           bg.fillStyle(0x000000, 0.7);
           bg.fillRect(0, 0, canvasGame.width(), canvasGame.height());
			
		}, this);

    }
});