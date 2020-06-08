let config =  {
  type: Phaser.AUTO,
  // parent: 'phaser-example',
  width: 1400,
  height: 540,
  physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 300}
        }
    },
  scene:[Story1, Stage1]
};
