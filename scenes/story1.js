class Story1 extends Phaser.Scene {
  constructor (){
    super('Story1');
  }
  preload () {
      //LOAD TILEMAP
      this.load.image('tilemap', 'assets/tilemap.png');

      this.load.spritesheet('Del', 'assets/Del_placeholder.png',
      {
        frameWidth: 128,
        frameHeight: 128
      });
      this.load.spritesheet('ladder', 'assets/ladder.png',
      {
        frameWidth: 100,
        frameHeight: 100
      });
      this.load.spritesheet('book3', 'assets/book3.png',
      {
        frameWidth: 50,
        frameHeight: 50
      });
      this.load.spritesheet('laser', 'assets/laser.png',
      {
        frameWidth: 71,
        frameHeight: 200
      });
  }

  create () {

    this.map = this.make.tilemap({data: maps[0], tileWidth: 100, tileHeight:20});
    this.tiles = this.map.addTilesetImage("tilemap", null, 100, 20, 0, 0);
    this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);



    this.add.sprite(150, 210, 'ladder');
    this.add.sprite(150, 260, 'ladder');
    this.add.sprite(150, 310, 'ladder');

    this.add.sprite(750, 210, 'ladder');
    this.add.sprite(750, 260, 'ladder');
    this.add.sprite(750, 310, 'ladder');

    this.add.sprite(450, 390, 'ladder');
    this.add.sprite(450, 440, 'ladder');
    this.add.sprite(450, 490, 'ladder');

    var rect = new Phaser.Geom.Rectangle(30, 480, 1200, 60);

    var graphics = this.add.graphics({ fillStyle: { color: 0xd6d6d6 } });

    graphics.fillRectShape(rect);

    this.book3 = this.physics.add.sprite(950, 135, 'book3');
    this.book3.setSize(40, 15)
    this.book3.setOffset(5, 35)
    this.book3.body.setAllowGravity(false);
    this.book3.body.setCollideWorldBounds(true);
    this.book3.body.moves = false;

    this.laser1 = this.physics.add.sprite(370, 250, 'laser');
    this.laser1.setSize(15, 130);
    this.laser1.setOffset(30,60);
    this.laser1.body.setAllowGravity(false);
    this.laser1.body.moves = false;

    this.laser2 = this.physics. add.sprite(540, 250, 'laser');
    this.laser2.setSize(15, 130);
    this.laser2.setOffset(30,60);
    this.laser2.body.setAllowGravity(false);
    this.laser2.body.moves = false;

    this.anims.create({
    //Laser ANIMATIONS
      key:'laserOn',
      frames: this.anims.generateFrameNumbers('laser', {start:0, end:8 }),
      frameRate: 7,
      repeat: 0
    });
    this.laser1.play('laserOn');
    this.laser2.play('laserOn');

    this.player = this.physics.add.sprite(200,100, 'Del');
    this.player.body.setAllowGravity(false);
    this.playerDialogue = this.add.text(40, 500, "Hi, I'm Del and I need to get that golden book.",
    {fontSize: '32px', fill: '#000'});
    var tween = this.tweens.add({
        targets: this.player,
        y: 60,
        delay: 1000,
        duration: 2000,
        yoyo: true,
        repeat: 1,
        onStart: function (){
            this.playerDialogue.setText("Pick up the book by pressing the space bar.")
        },
        onStartScope: this,
        onYoyo: function() {
            this.playerDialogue.setText("Put the book down by pressing the down arrow")
        },
        onYoyoScope: this,
        onRepeat: function(){
            this.playerDialogue.setText("Use the book to cover the blue lasers so you can pass")
        },
        onRepeatScope:this,
        onComplete: function(){
            this.scene.start('Stage1')
        },
        onCompleteScope: this,

    }, this);

    // this.scene.start('Stage1')

  }

  update(){

  }
};
