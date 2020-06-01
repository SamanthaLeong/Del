
class Stage1 extends Phaser.Scene {
  constructor () {
    super('Stage1');
  }

  preload () {
    //LOAD TILEMAP
    this.load.image('tilemap', 'assets/tilemap.png');
  //  LOAD THE BOOKS
    this.load.spritesheet('book1', 'assets/book1.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('book2', 'assets/book2.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('book3', 'assets/book3.png',
    {
      frameWidth: 50,
      frameHeight: 50
    });
    this.load.spritesheet('book4', 'assets/book4.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('book5', 'assets/book5.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('book6', 'assets/book6.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('book7', 'assets/book7.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('book8', 'assets/book8.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('ladder', 'assets/ladder.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('fire', 'assets/fire.png',
    {
      frameWidth: 192,
      frameHeight: 192
    });
    this.load.spritesheet('light', 'assets/light.png',
    {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet('laser', 'assets/laser.png',
    {
      frameWidth: 71,
      frameHeight: 200
    });
    //LOAD DEL
    this.load.spritesheet('Del', 'assets/Del_placeholder.png',
    {
      frameWidth: 128,
      frameHeight: 128
    });
  }

  create () {
  //TILEMAP
    this.map = this.make.tilemap({data: maps[0], tileWidth: 100, tileHeight:20});
    this.tiles = this.map.addTilesetImage("tilemap", null, 100, 20, 0, 0);
    this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);

  //WHICH TILE ARE COLLIDABLE
  //  this.map.setCollision([2]);
  //SIMPLE COLLISION WITH THE COLLIDABLE TILES
  //  this.physics.add.collider(this.player, this.layer);
  //  tilemap.setCollisionByProperty({ collides: true });

//ADD DEL AND PROPERTIES
    this.player = this.physics.add.sprite(200,100, 'Del');
    this.player.body.setAllowGravity(true);
    this.player.setCollideWorldBounds(true);
  //  this.player.setOnCollideWith(book3,
    //  this.player.setVelocityX(0));
    this.player.data = {};
    this.player.setSize(40,75,true);
  //TILEMAP collisions
    this.map.setCollision([0]);
    this.physics.add.collider(this.player, this.layer);


//DEL ANIMATIONS
    this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('Del', {start:8, end:16 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key:'right',
      frames: this.anims.generateFrameNumbers('Del', {start:20, end:27 }),
      frameRate: 7,
      repeat: -1
    });
    this.anims.create({
      key:'notpressed',
      frames: this.anims.generateFrameNumbers('Del', {start:0, end:0 }),
    });
    this.anims.create({
      key:'up',
      frames: this.anims.generateFrameNumbers('Del', {start:0, end:0 }),
    });
    this.anims.create({
      key:'jumpleft',
      frames: this.anims.generateFrameNumbers('Del', {start:8, end:16 }),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key:'jumpright',
      frames: this.anims.generateFrameNumbers('Del', {start:20, end:27 }),
      frameRate: 2,
      repeat: -1
    });
//CREATE BOOK

    this.book4 = this.physics.add.sprite(380, 110, 'book4');
    this.book4.setSize(19, 50)
    this.book4.setOffset(38, 49)
    this.book4.body.setAllowGravity(false);
    this.book4.body.setCollideWorldBounds(true);
    this.book4.body.moves = false;
    this.physics.add.collider(this.book4, this.layer);
    this.pickedUp = 0;

    this.book6 = this.physics.add.sprite(450, 110, 'book6');
    this.book6.setSize(40, 15)
    this.book6.setOffset(5, 35)
    this.book6.body.setAllowGravity(false);
    this.book6.body.setCollideWorldBounds(true);
    this.book6.body.moves = false;

    this.book3 = this.physics.add.sprite(950, 135, 'book3');
    this.book3.setSize(40, 15)
    this.book3.setOffset(5, 35)
    this.book3.body.setAllowGravity(false);
    this.book3.body.setCollideWorldBounds(true);
    this.book3.body.moves = false;
    // this.book3.setFrictionX(1);


    //this.physics.add.overlap(this.player, [this.book3], this.player.setVelocityX(0), null, this);
//  Body.setOnCollideWith
      //this.sprite.setAllowGravity(false);
    // // book4.setSize(100,100, true);
    // this.physics.add.collider(this.player, book4);
    // this.physics.add.overlap(this.player, this.book3, collectBook3, null, this);
    this.physics.add.collider(this.player, this.book4, collidePlayer, null, this);
    this.physics.add.collider(this.player, this.book3, collectBook3, null, this);

    this.physics.add.collider(this.player, this.book6, collidePlayer, null, this);

    this.touchingBook = 0;
    this.bookCollected = 0;

//CREATE LADDERS
    this.add.sprite(150, 210, 'ladder');
    this.add.sprite(150, 260, 'ladder');
    this.add.sprite(150, 310, 'ladder');

    this.add.sprite(750, 210, 'ladder');
    this.add.sprite(750, 260, 'ladder');
    this.add.sprite(750, 310, 'ladder');

    this.add.sprite(450, 390, 'ladder');
    this.add.sprite(450, 440, 'ladder');
    this.add.sprite(450, 490, 'ladder');
    this.physics.add.overlap(this.player, this.ladder, climbing, null, this);


    this.climb = 0;
//LIGHT AND fire
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

    this.physics.add.collider(this.laser1, this.book3, coverLaser1, null, this);
    this.physics.add.collider(this.laser2, this.book3, coverLaser2, null, this);
    this.physics.add.collider(this.player, this.laser1, collideLaser1, null, this);
    this.physics.add.collider(this.player, this.laser2, collideLaser2, null, this);


    // laser.animations.add('laserOn');
    // laser.animations.play('run', 10, true);

    this.anims.create({
    //Laser ANIMATIONS
      key:'laserOn',
      frames: this.anims.generateFrameNumbers('laser', {start:0, end:8 }),
      frameRate: 7,
      repeat: 0
    });
    this.anims.create({
      key:'laserOff',
      frames: this.anims.generateFrameNumbers('laser', {start:0, end:0 }),
    });
    this.laser1.play('laserOn');
    this.laser2.play('laserOn');


//TURN ON THE CURSOR
    this.cursors = this.input.keyboard.createCursorKeys();

  }
  update(){
    if (this.touchingBook == 1 && this.cursors.up.isDown)
    {
      this.player.setVelocityY(-200);
      this.player.anims.play('up',true);
    }
    if (this.climb == 1 && this.cursors.up.isDown)
    {
      this.player.setVelocityY(-200);
      this.player.anims.play('up',true);
    }
    if (this.pickedUp == 1)
    {
      this.book3.setX(this.player.x);
      this.book3.setY(this.player.y - 70);
      this.bookUp = 1;

    }
    if (this.cursors.down.isDown && this.bookUp == 1)
    {
      this.book3.setX(this.player.x-50);
      this.book3.setY(this.player.y+20);
      this.pickedUp = 0;
      console.log("picked up");
    }
    // if (this.cursors.space.isDown)
    // {
    //   this.book3.setX(this.player.x);
    //   this.book3.setY(this.player.y - 60);
    //   this.bookCollected = 1;
    //
    // }
    // if (this.bookCollected = 1)
    // {
    //   this.book3.setX(this.player.x);
    //   this.book3.setY(this.player.y - 60);
    // }

    // this.physics.world.overlapTiles(this.player, this.shelf, this.hitShelf, null, this);
    if (this.cursors.left.isDown)
    {
      if (this.map.setCollision([0]))
      {
        this.player.setVelocityX(-80);
        this.player.anims.play('left', true);
      }
      else
      {
        this.player.setVelocityX(-80);
        this.player.anims.play('left', true);
      }

    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(80);
      this.player.anims.play('right',true);
    }
    else if (this.cursors.up.isDown && this.player.body.onFloor())
    {
    //  this.cursors = nothing;
      this.player.setVelocityY(-200);
      this.player.anims.play('up',true);
    //  this.cursors = this.input.keyboard.createCursorKeys();

    }
    else if(this.cursors.up.isDown && this.climb == 1)
    {
      this.player.setVelocityY(-200);
      this.player.anims.play('up',true);
    }
    else if (this.cursors.left.isDown && this.cursors.up.isDown)
    {

      this.player.setVelocityY(-800);
      this.player.setVelocityX(-80);
      this.player.anims.play('jumpleft',true);


    }
    else if (this.cursors.up.isDown && this.cursors.right.isDown && this.player.body.onFloor())
    {

      this.player.setVelocityY(-800);
      this.player.setVelocityX(80);
      this.player.anims.play('jumpright',true);

    }
    else
    {
      this.player.setVelocityX(0);
      this.player.anims.play('notpressed',true);
    }

    // if (touching book3 && this.cursors.space.isDown)
    // {
        //book3.setX(player.x);
        //book3.setY(player.y + 20);
    //   book3 ontop of player's head
    // }
  }



};
function collectBook3(player, book3)
{
  this.player.setVelocityX(0);
  this.touchingBook = 1
   if (this.cursors.space.isDown)
   {

     // this.book3.setX(this.player.x - 30);
     // this.book3.setY(this.player.y);
     // console.log(this.book3.y);
     // console.log(this.player.y);

     this.pickedUp = 1;

   }
   if (this.touchingBook = 1)
   {
     this.book3.body.moves = false;

   }
   else
   {
     this.book3.body.moves = false;

   }
}
function collidePlayer()
{
  this.player.setVelocityX(0);
  this.touchingBook = 1
}

function coverLaser1()
{
  this.laser1.play('laserOff');
  this.laser1.destroy()

}
function coverLaser2()
{
  this.laser2.play('laserOff');
  this.laser2.destroy()

}
function collideLaser1()
{
  this.player.setVelocityX(0);
}
function collideLaser2()
{
  this.player.setVelocityX(0);
}
function climbing()
{
  this.climb = 1
}
// function pickedUp()
// {
//   this.pickedUp = 1
//   console.log("picked up");
// }
